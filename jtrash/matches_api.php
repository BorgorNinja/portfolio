<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/data/matches.json';
$ledgerFile = __DIR__ . '/data/ledger.json';

function normalizeRef($ref) {
    $ref = trim($ref ?? '');
    $digits = preg_replace('/\D/', '', $ref);
    if (strlen($digits) === 11 && substr($digits, 0, 2) === '09') {
        return substr($digits, 0, 4) . '-' . substr($digits, 4, 3) . '-' . substr($digits, 7, 4);
    }
    if (strlen($digits) === 10 && substr($digits, 0, 1) === '9') {
        $digits = '0' . $digits;
        return substr($digits, 0, 4) . '-' . substr($digits, 4, 3) . '-' . substr($digits, 7, 4);
    }
    return $ref;
}

function getMatchesData($dataFile) {
    if (!file_exists($dataFile)) {
        $init = ['matches' => []];
        file_put_contents($dataFile, json_encode($init, JSON_PRETTY_PRINT));
        return $init;
    }
    $content = file_get_contents($dataFile);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        return ['matches' => []];
    }
    return $data;
}

function saveMatchesData($dataFile, $data) {
    $fp = fopen($dataFile, 'c+');
    if ($fp && flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }
    if ($fp) fclose($fp);
    return file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

function getLedger($ledgerFile) {
    if (!file_exists($ledgerFile)) {
        return ['accounts' => [], 'transactions' => []];
    }
    $content = file_get_contents($ledgerFile);
    $data = json_decode($content, true);
    return is_array($data) ? $data : ['accounts' => [], 'transactions' => []];
}

function saveLedger($ledgerFile, $data) {
    $fp = fopen($ledgerFile, 'c+');
    if ($fp && flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }
    if ($fp) fclose($fp);
    return file_put_contents($ledgerFile, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

if ($action === 'create_match') {
    $game = trim($input['game'] ?? 'pinball');
    $hostRef = normalizeRef($input['host_ref'] ?? '');
    $hostName = trim($input['host_name'] ?? 'Host Player');
    $guestRef = normalizeRef($input['guest_ref'] ?? '');
    $wager = max(0, floatval($input['wager'] ?? 0));

    if (!$hostRef) {
        echo json_encode(['error' => 'Host reference number required']);
        exit;
    }
    if (!$guestRef) {
        echo json_encode(['error' => 'Opponent reference number required']);
        exit;
    }
    if ($hostRef === $guestRef) {
        echo json_encode(['error' => 'You cannot challenge your own reference number']);
        exit;
    }

    $ledger = getLedger($ledgerFile);
    if ($wager > 0) {
        if (!isset($ledger['accounts'][$hostRef]) || $ledger['accounts'][$hostRef]['wallet'] < $wager) {
            echo json_encode(['error' => 'Insufficient wallet balance for this wager']);
            exit;
        }
    }

    $guestName = 'Friend (' . substr(str_replace('-', '', $guestRef), -4) . ')';
    if (isset($ledger['accounts'][$guestRef])) {
        $guestName = $ledger['accounts'][$guestRef]['name'];
    }

    $prefix = $game === 'pool' ? 'POOL' : 'PIN';
    $matchId = 'M-' . $prefix . '-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 7));

    $match = [
        'id' => $matchId,
        'game' => $game,
        'title' => ($game === 'pool' ? '8-Ball Billiards Match' : 'Cyber Pinball Score Battle'),
        'host_ref' => $hostRef,
        'host_name' => $hostName,
        'guest_ref' => $guestRef,
        'guest_name' => $guestName,
        'wager' => $wager,
        'status' => 'pending', // pending, active, completed, declined
        'scores' => [
            $hostRef => 0,
            $guestRef => 0
        ],
        'current_turn' => $hostRef,
        'game_state' => $input['initial_state'] ?? null,
        'winner_ref' => null,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ];

    $matchesData = getMatchesData($dataFile);
    $matchesData['matches'][$matchId] = $match;
    saveMatchesData($dataFile, $matchesData);

    echo json_encode(['success' => true, 'match' => $match]);
    exit;
}

if ($action === 'list_matches') {
    $ref = normalizeRef($_GET['ref'] ?? '');
    if (!$ref) {
        echo json_encode(['matches' => []]);
        exit;
    }

    $matchesData = getMatchesData($dataFile);
    $userMatches = [];
    foreach ($matchesData['matches'] as $m) {
        if ($m['host_ref'] === $ref || $m['guest_ref'] === $ref) {
            $userMatches[] = $m;
        }
    }

    usort($userMatches, function($a, $b) {
        return strtotime($b['updated_at']) - strtotime($a['updated_at']);
    });

    echo json_encode([
        'success' => true,
        'matches' => array_slice($userMatches, 0, 20)
    ]);
    exit;
}

if ($action === 'get_match') {
    $matchId = trim($_GET['id'] ?? '');
    $matchesData = getMatchesData($dataFile);
    if (!isset($matchesData['matches'][$matchId])) {
        echo json_encode(['found' => false, 'error' => 'Match not found']);
        exit;
    }
    echo json_encode(['found' => true, 'match' => $matchesData['matches'][$matchId]]);
    exit;
}

if ($action === 'accept_match') {
    $matchId = trim($input['match_id'] ?? '');
    $guestRef = normalizeRef($input['guest_ref'] ?? '');

    $matchesData = getMatchesData($dataFile);
    if (!isset($matchesData['matches'][$matchId])) {
        echo json_encode(['error' => 'Match not found']);
        exit;
    }

    $match = &$matchesData['matches'][$matchId];
    if ($match['guest_ref'] !== $guestRef) {
        echo json_encode(['error' => 'You are not the designated recipient of this invite']);
        exit;
    }

    if (!empty($input['guest_name'])) {
        $match['guest_name'] = trim($input['guest_name']);
    }

    $match['status'] = 'active';
    $match['updated_at'] = date('Y-m-d H:i:s');
    saveMatchesData($dataFile, $matchesData);

    echo json_encode(['success' => true, 'match' => $match]);
    exit;
}

if ($action === 'update_match') {
    $matchId = trim($input['match_id'] ?? '');
    $playerRef = normalizeRef($input['player_ref'] ?? '');

    $matchesData = getMatchesData($dataFile);
    if (!isset($matchesData['matches'][$matchId])) {
        echo json_encode(['error' => 'Match not found']);
        exit;
    }

    $match = &$matchesData['matches'][$matchId];

    if (isset($input['score'])) {
        $match['scores'][$playerRef] = intval($input['score']);
    }

    if (isset($input['game_state'])) {
        $match['game_state'] = $input['game_state'];
    }

    if (isset($input['current_turn'])) {
        $match['current_turn'] = normalizeRef($input['current_turn']);
    }

    if (isset($input['status'])) {
        $match['status'] = trim($input['status']);
    }

    // Winner declaration & wager settlement
    if (!empty($input['winner_ref']) && $match['status'] !== 'completed') {
        $winnerRef = normalizeRef($input['winner_ref']);
        $match['winner_ref'] = $winnerRef;
        $match['status'] = 'completed';

        $wager = floatval($match['wager']);
        if ($wager > 0) {
            $loserRef = ($winnerRef === $match['host_ref']) ? $match['guest_ref'] : $match['host_ref'];
            $ledger = getLedger($ledgerFile);

            if (isset($ledger['accounts'][$loserRef]) && isset($ledger['accounts'][$winnerRef])) {
                $actualWager = min($ledger['accounts'][$loserRef]['wallet'], $wager);
                if ($actualWager > 0) {
                    $ledger['accounts'][$loserRef]['wallet'] -= $actualWager;
                    $ledger['accounts'][$winnerRef]['wallet'] += $actualWager;
                    $ledger['transactions'][] = [
                        'id' => 'MATCH-PAY-' . strtoupper(substr(md5(uniqid()), 0, 6)),
                        'from_ref' => $loserRef,
                        'to_ref' => $winnerRef,
                        'from_name' => $ledger['accounts'][$loserRef]['name'],
                        'to_name' => $ledger['accounts'][$winnerRef]['name'],
                        'amount' => $actualWager,
                        'note' => ucfirst($match['game']) . ' Match Prize (' . $match['id'] . ')',
                        'date' => date('M j, Y h:i A'),
                        'status' => 'Completed'
                    ];
                    saveLedger($ledgerFile, $ledger);
                }
            }
        }
    }

    $match['updated_at'] = date('Y-m-d H:i:s');
    saveMatchesData($dataFile, $matchesData);

    echo json_encode(['success' => true, 'match' => $match]);
    exit;
}

echo json_encode(['status' => 'Arcade Matches API online']);
