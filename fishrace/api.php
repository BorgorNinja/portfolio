<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$roomFile = __DIR__ . '/room_state.json';

function getRoomState($file) {
    if (!file_exists($file)) {
        return [
            'seats' => [
                0 => null,
                1 => null,
                2 => null,
                3 => null
            ],
            'updated_at' => time()
        ];
    }
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    if (!is_array($data) || !isset($data['seats'])) {
        return [
            'seats' => [
                0 => null,
                1 => null,
                2 => null,
                3 => null
            ],
            'updated_at' => time()
        ];
    }
    return $data;
}

function saveRoomState($file, $data) {
    $fp = fopen($file, 'c+');
    if ($fp && flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }
    if ($fp) fclose($fp);
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

$now = time();
$room = getRoomState($roomFile);

// Expire inactive seats (no heartbeat in 15 seconds)
$changed = false;
for ($i = 0; $i < 4; $i++) {
    if (isset($room['seats'][$i]) && $room['seats'][$i] !== null) {
        $lastSeen = $room['seats'][$i]['last_seen'] ?? 0;
        if (($now - $lastSeen) > 15) {
            $room['seats'][$i] = null;
            $changed = true;
        }
    }
}

if ($action === 'join_or_heartbeat') {
    $ref = trim($input['ref'] ?? '');
    $name = trim($input['name'] ?? 'Guest');
    $avatar = trim($input['avatar'] ?? '🐟');
    $seatReq = isset($input['seat']) ? intval($input['seat']) : -1;
    $bets = is_array($input['bets'] ?? null) ? $input['bets'] : [];
    $balance = floatval($input['balance'] ?? 0);

    if (empty($ref)) {
        echo json_encode(['error' => 'User ref required', 'seats' => $room['seats']]);
        exit;
    }

    // Find any seat currently registered to this user ref
    $currentSeat = -1;
    for ($i = 0; $i < 4; $i++) {
        if (isset($room['seats'][$i]) && $room['seats'][$i] !== null && ($room['seats'][$i]['ref'] ?? '') === $ref) {
            $currentSeat = $i;
            break;
        }
    }

    $assignedSeat = -1;

    if ($seatReq === -1) {
        // User wants to be a spectator or stay a spectator.
        // If they previously had a seat, free it up immediately!
        if ($currentSeat !== -1) {
            $room['seats'][$currentSeat] = null;
            $changed = true;
        }
        $assignedSeat = -1;
    } else if ($seatReq >= 0 && $seatReq < 4) {
        // User wants a specific seat ($seatReq).
        $targetSeatOccupant = $room['seats'][$seatReq] ?? null;
        if ($targetSeatOccupant !== null && ($targetSeatOccupant['ref'] ?? '') !== $ref) {
            // Target seat is occupied by another user! Cannot take it.
            $assignedSeat = $currentSeat; // Remain in existing seat if any, else -1
        } else {
            // Target seat is empty or already held by this user.
            // If switching from another seat, clear the old seat!
            if ($currentSeat !== -1 && $currentSeat !== $seatReq) {
                $room['seats'][$currentSeat] = null;
                $changed = true;
            }
            $assignedSeat = $seatReq;
            $room['seats'][$assignedSeat] = [
                'ref' => $ref,
                'name' => $name,
                'avatar' => $avatar,
                'bets' => $bets,
                'balance' => $balance,
                'last_seen' => $now
            ];
            $changed = true;
        }
    }

    if ($changed) {
        $room['updated_at'] = $now;
        saveRoomState($roomFile, $room);
    }

    echo json_encode([
        'success' => true,
        'assigned_seat' => $assignedSeat,
        'seats' => $room['seats']
    ]);
    exit;
}

if ($action === 'leave') {
    $ref = trim($input['ref'] ?? '');
    if ($ref) {
        for ($i = 0; $i < 4; $i++) {
            if (isset($room['seats'][$i]) && $room['seats'][$i] !== null && $room['seats'][$i]['ref'] === $ref) {
                $room['seats'][$i] = null;
                $changed = true;
            }
        }
        if ($changed) {
            $room['updated_at'] = $now;
            saveRoomState($roomFile, $room);
        }
    }
    echo json_encode(['success' => true, 'seats' => $room['seats']]);
    exit;
}

if ($action === 'get_room') {
    if ($changed) {
        $room['updated_at'] = $now;
        saveRoomState($roomFile, $room);
    }
    echo json_encode(['success' => true, 'seats' => $room['seats']]);
    exit;
}

echo json_encode(['status' => 'Fish Race Room API Online', 'seats' => $room['seats']]);
