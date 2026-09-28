<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$roomFile = __DIR__ . '/room_state.json';

function generateRandomFishObstacles() {
    $obsTypes = ['urchin', 'spire', 'vent'];
    $obstacles = [];
    $numObs = rand(8, 10);
    for ($i = 0; $i < $numObs; $i++) {
        $attempts = 0;
        $x = 0; $z = 0;
        while ($attempts < 40) {
            // Random x between -60 and +65 across the 180-unit stage
            $x = round(rand(-60, 65) + (mt_rand(0, 99) / 100.0), 1);
            // Random z across entire track width (-27 to +27)
            $z = round(rand(-27, 27) + (mt_rand(0, 99) / 100.0), 1);
            $tooClose = false;
            foreach ($obstacles as $o) {
                $dx = abs($o['x'] - $x);
                $dz = abs($o['z'] - $z);
                if ($dx < 12.0 && $dz < 5.0) {
                    $tooClose = true;
                    break;
                }
            }
            if (!$tooClose) break;
            $attempts++;
        }
        $type = $obsTypes[array_rand($obsTypes)];
        $y = ($type === 'urchin') ? round(rand(-20, 20) / 10.0, 1) : 0.0;
        $obstacles[] = [
            'id' => $i,
            'type' => $type,
            'x' => $x,
            'z' => $z,
            'y' => $y
        ];
    }
    return $obstacles;
}

function generateRandomFishOdds() {
    $multipliers = [2.5, 3.0, 3.5, 4.0, 5.0, 6.0, 7.5, 8.0, 10.0, 12.0];
    $odds = [];
    for ($i = 1; $i <= 8; $i++) {
        $odds[$i] = $multipliers[array_rand($multipliers)];
    }
    return $odds;
}

function advanceFishGameState(&$room, $nowFloat) {
    $changed = false;
    if (!isset($room['game']) || !is_array($room['game'])) {
        $room['game'] = [
            'round_id' => 1,
            'phase' => 'betting',
            'phase_start_time' => $nowFloat,
            'phase_duration' => 30.0,
            'winner_id' => null,
            'obstacles' => generateRandomFishObstacles(),
            'odds' => generateRandomFishOdds()
        ];
        return true;
    }

    $game = &$room['game'];
    $elapsed = $nowFloat - floatval($game['phase_start_time'] ?? $nowFloat);

    // If server was idle for more than 5 minutes, reset cleanly to a fresh betting round
    if ($elapsed > 300 || $elapsed < -1.0) {
        $game['phase'] = 'betting';
        $game['phase_start_time'] = $nowFloat;
        $game['phase_duration'] = 30.0;
        $game['winner_id'] = null;
        $game['obstacles'] = generateRandomFishObstacles();
        $game['odds'] = generateRandomFishOdds();
        return true;
    }

    // Step through any completed phases
    $maxSteps = 5;
    while ($elapsed >= floatval($game['phase_duration']) && $maxSteps-- > 0) {
        $currentPhase = $game['phase'];
        $dur = floatval($game['phase_duration']);

        if ($currentPhase === 'betting') {
            $game['phase'] = 'racing';
            $game['phase_start_time'] += $dur;
            $game['phase_duration'] = 30.0;
            $game['winner_id'] = rand(1, 8);
            $changed = true;
        } else if ($currentPhase === 'racing') {
            $game['phase'] = 'payout';
            $game['phase_start_time'] += $dur;
            $game['phase_duration'] = 12.0;
            $changed = true;
        } else if ($currentPhase === 'payout') {
            $game['phase'] = 'betting';
            $game['phase_start_time'] += $dur;
            $game['phase_duration'] = 30.0;
            $game['round_id'] = intval($game['round_id'] ?? 1) + 1;
            $game['winner_id'] = null;
            $game['obstacles'] = generateRandomFishObstacles();
            $game['odds'] = generateRandomFishOdds();
            for ($s = 0; $s < 4; $s++) {
                if (isset($room['seats'][$s]) && $room['seats'][$s] !== null) {
                    $room['seats'][$s]['bets'] = [];
                }
            }
            $changed = true;
        }
        $elapsed = $nowFloat - floatval($game['phase_start_time']);
    }

    if ($elapsed >= floatval($game['phase_duration'])) {
        $game['phase_start_time'] = $nowFloat;
    }

    return $changed;
}

function getRoomState($file, $nowFloat) {
    $default = [
        'seats' => [
            0 => null,
            1 => null,
            2 => null,
            3 => null
        ],
        'game' => [
            'round_id' => 1,
            'phase' => 'betting',
            'phase_start_time' => $nowFloat,
            'phase_duration' => 30.0,
            'winner_id' => null,
            'obstacles' => generateRandomFishObstacles(),
            'odds' => generateRandomFishOdds()
        ],
        'updated_at' => intval($nowFloat)
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
$room = getRoomState($roomFile, $nowFloat);

// Advance server-side game state clock
$gameChanged = advanceFishGameState($room, $nowFloat);

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

$timeLeft = max(0.0, round(floatval($room['game']['phase_duration']) - ($nowFloat - floatval($room['game']['phase_start_time'])), 1));
$elapsed = max(0.0, round($nowFloat - floatval($room['game']['phase_start_time']), 1));

$responseGame = [
    'round_id' => intval($room['game']['round_id'] ?? 1),
    'phase' => $room['game']['phase'] ?? 'betting',
    'phase_start_time' => floatval($room['game']['phase_start_time'] ?? $nowFloat),
    'time_left' => $timeLeft,
    'elapsed' => $elapsed,
    'duration' => floatval($room['game']['phase_duration'] ?? 30.0),
    'winner_id' => $room['game']['winner_id'] ?? null,
    'obstacles' => $room['game']['obstacles'] ?? [],
    'odds' => $room['game']['odds'] ?? [],
    'server_time' => $nowFloat
];

if ($action === 'join_or_heartbeat') {
    $ref = trim($input['ref'] ?? '');
    $name = trim($input['name'] ?? 'Guest');
    $avatar = trim($input['avatar'] ?? '🐟');
    $seatReq = isset($input['seat']) ? intval($input['seat']) : -1;
    $bets = is_array($input['bets'] ?? null) ? $input['bets'] : [];
    $balance = floatval($input['balance'] ?? 0);

    if (empty($ref)) {
        echo json_encode(['error' => 'User ref required', 'seats' => $room['seats'], 'game' => $responseGame]);
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
        if ($currentSeat !== -1) {
            $room['seats'][$currentSeat] = null;
            $seatsChanged = true;
        }
        $assignedSeat = -1;
    } else if ($seatReq >= 0 && $seatReq < 4) {
        $targetSeatOccupant = $room['seats'][$seatReq] ?? null;
        if ($targetSeatOccupant !== null && ($targetSeatOccupant['ref'] ?? '') !== $ref) {
            $assignedSeat = $currentSeat;
        } else {
            if ($currentSeat !== -1 && $currentSeat !== $seatReq) {
                $room['seats'][$currentSeat] = null;
                $seatsChanged = true;
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
            $seatsChanged = true;
        }
    }

    if ($gameChanged || $seatsChanged) {
        $room['updated_at'] = $now;
        saveRoomState($roomFile, $room);
    }

    echo json_encode([
        'success' => true,
        'assigned_seat' => $assignedSeat,
        'seats' => $room['seats'],
        'game' => $responseGame
    ]);
    exit;
}

if ($action === 'leave') {
    $ref = trim($input['ref'] ?? '');
    if ($ref) {
        for ($i = 0; $i < 4; $i++) {
            if (isset($room['seats'][$i]) && $room['seats'][$i] !== null && $room['seats'][$i]['ref'] === $ref) {
                $room['seats'][$i] = null;
                $seatsChanged = true;
            }
        }
    }
    if ($gameChanged || $seatsChanged) {
        $room['updated_at'] = $now;
        saveRoomState($roomFile, $room);
    }
    echo json_encode(['success' => true, 'seats' => $room['seats'], 'game' => $responseGame]);
    exit;
}

if ($action === 'get_room') {
    if ($gameChanged || $seatsChanged) {
        $room['updated_at'] = $now;
        saveRoomState($roomFile, $room);
    }
    echo json_encode(['success' => true, 'seats' => $room['seats'], 'game' => $responseGame]);
    exit;
}

if ($gameChanged || $seatsChanged) {
    $room['updated_at'] = $now;
    saveRoomState($roomFile, $room);
}

echo json_encode(['status' => 'Fish Race Room API Online', 'seats' => $room['seats'], 'game' => $responseGame]);
