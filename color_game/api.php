<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$roomFile = __DIR__ . '/room_state.json';

function getRoomState($file, $now) {
    $default = [
        'seats' => [
            0 => null,
            1 => null,
            2 => null,
            3 => null
        ],
        'last_roll' => null,
        'updated_at' => $now
    ];

    if (!file_exists($file)) {
        return $default;
    }
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    if (!is_array($data) || !isset($data['seats'])) {
        return $default;
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

$nowFloat = microtime(true);
$now = intval($nowFloat);
$room = getRoomState($roomFile, $now);

// Expire inactive seats (no heartbeat in 15 seconds)
$seatsChanged = false;
for ($i = 0; $i < 4; $i++) {
    if (isset($room['seats'][$i]) && $room['seats'][$i] !== null) {
        $lastSeen = $room['seats'][$i]['last_seen'] ?? 0;
        if (($now - $lastSeen) > 15) {
            $room['seats'][$i] = null;
            $seatsChanged = true;
        }
    }
}

if ($action === 'join_or_heartbeat') {
    $ref = trim($input['ref'] ?? '');
    $name = trim($input['name'] ?? 'Player');
    $avatar = trim($input['avatar'] ?? '👤');
    $seatReq = isset($input['seat']) ? intval($input['seat']) : -1;
    $bets = is_array($input['bets'] ?? null) ? $input['bets'] : [];
    $balance = floatval($input['balance'] ?? 0);

    if (empty($ref)) {
        echo json_encode(['error' => 'User ref required', 'seats' => $room['seats']]);
        exit;
    }

    $currentSeat = -1;
    for ($i = 0; $i < 4; $i++) {
        if (isset($room['seats'][$i]) && $room['seats'][$i] !== null && ($room['seats'][$i]['ref'] ?? '') === $ref) {
            $currentSeat = $i;
            break;
        }
    }

    $assignedSeat = -1;

    if ($seatReq === -1) {
        // Stand up
        if ($currentSeat !== -1) {
            $room['seats'][$currentSeat] = null;
            $seatsChanged = true;
        }
        $assignedSeat = -1;
    } else if ($seatReq >= 0 && $seatReq < 4) {
        // Wants specific seat
        if ($currentSeat !== -1 && $currentSeat !== $seatReq) {
            $room['seats'][$currentSeat] = null;
            $seatsChanged = true;
        }

        $targetOccupant = $room['seats'][$seatReq] ?? null;
        if ($targetOccupant === null || ($targetOccupant['ref'] ?? '') === $ref) {
            $room['seats'][$seatReq] = [
                'ref' => $ref,
                'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
                'avatar' => $avatar,
                'seat' => $seatReq,
                'bets' => $bets,
                'balance' => $balance,
                'last_seen' => $now
            ];
            $assignedSeat = $seatReq;
            $seatsChanged = true;
        } else {
            // Seat taken, stay in current seat if had one
            $assignedSeat = $currentSeat;
            if ($currentSeat !== -1 && isset($room['seats'][$currentSeat])) {
                $room['seats'][$currentSeat]['bets'] = $bets;
                $room['seats'][$currentSeat]['balance'] = $balance;
                $room['seats'][$currentSeat]['last_seen'] = $now;
                $seatsChanged = true;
            }
        }
    }

    $room['updated_at'] = $now;
    if ($seatsChanged) {
        saveRoomState($roomFile, $room);
    }

    echo json_encode([
        'status' => 'ok',
        'assigned_seat' => $assignedSeat,
        'seats' => $room['seats'],
        'last_roll' => $room['last_roll'] ?? null,
        'server_time' => $nowFloat
    ]);
    exit;
}

if ($action === 'broadcast_roll') {
    $winningColors = $input['winning_colors'] ?? [];
    $puller = $input['puller_name'] ?? 'Player';
    $rollId = intval($input['roll_id'] ?? 0);

    $room['last_roll'] = [
        'roll_id' => $rollId > 0 ? $rollId : time(),
        'winning_colors' => $winningColors,
        'puller_name' => $puller,
        'time' => $nowFloat
    ];
    // Reset bets on server
    for ($s = 0; $s < 4; $s++) {
        if (isset($room['seats'][$s]) && $room['seats'][$s] !== null) {
            $room['seats'][$s]['bets'] = [];
        }
    }
    saveRoomState($roomFile, $room);
    echo json_encode(['status' => 'ok', 'last_roll' => $room['last_roll'], 'seats' => $room['seats']]);
    exit;
}

// Default GET state
if ($seatsChanged) {
    saveRoomState($roomFile, $room);
}
echo json_encode(['status' => 'ok', 'seats' => $room['seats'], 'last_roll' => $room['last_roll'] ?? null, 'server_time' => $nowFloat]);
