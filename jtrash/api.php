<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/data/ledger.json';

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

function getLedger($dataFile) {
    if (!file_exists($dataFile)) {
        $init = [
            'accounts' => [],
            'transactions' => []
        ];
        file_put_contents($dataFile, json_encode($init, JSON_PRETTY_PRINT));
        return $init;
    }
    $content = file_get_contents($dataFile);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        return ['accounts' => [], 'transactions' => []];
    }
    return $data;
}

function saveLedger($dataFile, $data) {
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

function formatTransactionsForRef($transactions, $ref) {
    $out = [];
    foreach ($transactions as $tx) {
        if ($tx['from_ref'] === $ref) {
            $t = $tx;
            $t['type'] = 'expense';
            $t['icon'] = '💸';
            $t['title'] = 'Express Send to ' . $tx['to_name'];
            $t['recipient'] = $tx['to_name'] . ' (' . $tx['to_ref'] . ')';
            $t['sender'] = $tx['from_name'] . ' (' . $tx['from_ref'] . ')';
            $out[] = $t;
        } else if ($tx['to_ref'] === $ref) {
            $t = $tx;
            $t['type'] = 'income';
            $t['icon'] = '🎁';
            $t['title'] = 'Received from ' . $tx['from_name'];
            $t['recipient'] = $tx['to_name'] . ' (' . $tx['to_ref'] . ')';
            $t['sender'] = $tx['from_name'] . ' (' . $tx['from_ref'] . ')';
            $out[] = $t;
        }
    }
    return array_slice(array_reverse($out), 0, 30);
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

if ($action === 'get_account') {
    $ref = normalizeRef($_GET['ref'] ?? '');
    if (!$ref) {
        echo json_encode(['error' => 'Reference number required']);
        exit;
    }
    $ledger = getLedger($dataFile);
    if (!isset($ledger['accounts'][$ref])) {
        echo json_encode(['found' => false]);
        exit;
    }
    $acc = $ledger['accounts'][$ref];
    $acc['transactions'] = formatTransactionsForRef($ledger['transactions'], $ref);
    echo json_encode(['found' => true, 'account' => $acc]);
    exit;
}

if ($action === 'register_or_sync') {
    $ref = normalizeRef($input['ref'] ?? '');
    $name = trim($input['name'] ?? 'Lucky Spinner');
    $syncLocalChanges = !empty($input['sync_local_changes']);

    if (!$ref) {
        echo json_encode(['error' => 'Reference number required']);
        exit;
    }

    $ledger = getLedger($dataFile);
    if (!isset($ledger['accounts'][$ref])) {
        $wallet = isset($input['wallet']) ? floatval($input['wallet']) : 50000.0;
        $slot = isset($input['slot']) ? intval($input['slot']) : 10000;
        $jsave = isset($input['jsave']) ? floatval($input['jsave']) : 15000.0;
        
        $ledger['accounts'][$ref] = [
            'ref' => $ref,
            'name' => $name,
            'wallet' => $wallet,
            'slot' => $slot,
            'jsave' => $jsave,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
    } else {
        if ($name && $name !== 'Lucky Spinner') {
            $ledger['accounts'][$ref]['name'] = $name;
        }
        if ($syncLocalChanges) {
            if (isset($input['wallet'])) $ledger['accounts'][$ref]['wallet'] = floatval($input['wallet']);
            if (isset($input['slot'])) $ledger['accounts'][$ref]['slot'] = intval($input['slot']);
            if (isset($input['jsave'])) $ledger['accounts'][$ref]['jsave'] = floatval($input['jsave']);
        }
        $ledger['accounts'][$ref]['updated_at'] = date('Y-m-d H:i:s');
    }

    saveLedger($dataFile, $ledger);

    $acc = $ledger['accounts'][$ref];
    $acc['transactions'] = formatTransactionsForRef($ledger['transactions'], $ref);

    echo json_encode(['success' => true, 'account' => $acc]);
    exit;
}

if ($action === 'sync_balances' || $action === 'sync_balance') {
    $ref = normalizeRef($input['ref'] ?? '');
    if (!$ref) {
        echo json_encode(['error' => 'Reference number required']);
        exit;
    }
    $ledger = getLedger($dataFile);
    if (isset($ledger['accounts'][$ref])) {
        if (isset($input['wallet'])) $ledger['accounts'][$ref]['wallet'] = floatval($input['wallet']);
        if (isset($input['slot'])) $ledger['accounts'][$ref]['slot'] = intval($input['slot']);
        if (isset($input['jsave'])) $ledger['accounts'][$ref]['jsave'] = floatval($input['jsave']);
        if (!empty($input['name'])) $ledger['accounts'][$ref]['name'] = trim($input['name']);
        $ledger['accounts'][$ref]['updated_at'] = date('Y-m-d H:i:s');
        saveLedger($dataFile, $ledger);
        echo json_encode(['success' => true, 'account' => $ledger['accounts'][$ref]]);
    } else {
        echo json_encode(['error' => 'Account not found']);
    }
    exit;
}

if ($action === 'lookup') {
    $ref = normalizeRef($_GET['ref'] ?? '');
    $ledger = getLedger($dataFile);
    if ($ref && isset($ledger['accounts'][$ref])) {
        echo json_encode([
            'found' => true,
            'ref' => $ref,
            'name' => $ledger['accounts'][$ref]['name']
        ]);
    } else {
        echo json_encode(['found' => false, 'ref' => $ref]);
    }
    exit;
}

if ($action === 'send_money') {
    $fromRef = normalizeRef($input['from_ref'] ?? '');
    $toRef = normalizeRef($input['to_ref'] ?? '');
    $amount = floatval($input['amount'] ?? 0);
    $note = trim($input['note'] ?? 'Express Trash Transfer');

    if (!$fromRef || !$toRef || $amount <= 0) {
        echo json_encode(['error' => 'Invalid parameters (amount must be greater than 0)']);
        exit;
    }

    if ($fromRef === $toRef) {
        echo json_encode(['error' => 'Cannot transfer to your own reference number']);
        exit;
    }

    $ledger = getLedger($dataFile);

    // Ensure sender exists
    if (!isset($ledger['accounts'][$fromRef])) {
        echo json_encode(['error' => 'Sender account not found. Please refresh the page.']);
        exit;
    }

    $sender = &$ledger['accounts'][$fromRef];
    if ($sender['wallet'] < $amount) {
        echo json_encode(['error' => 'Insufficient wallet balance']);
        exit;
    }

    // Ensure recipient exists or auto-register them
    if (!isset($ledger['accounts'][$toRef])) {
        $ledger['accounts'][$toRef] = [
            'ref' => $toRef,
            'name' => 'User ' . substr(str_replace('-', '', $toRef), -4),
            'wallet' => 50000.0,
            'slot' => 10000,
            'jsave' => 15000.0,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
    }

    $recipient = &$ledger['accounts'][$toRef];

    // Deduct & Credit
    $sender['wallet'] -= $amount;
    $recipient['wallet'] += $amount;
    $sender['updated_at'] = date('Y-m-d H:i:s');
    $recipient['updated_at'] = date('Y-m-d H:i:s');

    $txId = 'TRASH-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

    $tx = [
        'id' => $txId,
        'from_ref' => $fromRef,
        'to_ref' => $toRef,
        'from_name' => $sender['name'],
        'to_name' => $recipient['name'],
        'amount' => $amount,
        'note' => $note,
        'date' => date('M j, Y h:i A'),
        'status' => 'Completed'
    ];

    $ledger['transactions'][] = $tx;

    saveLedger($dataFile, $ledger);

    echo json_encode([
        'success' => true,
        'tx' => $tx,
        'new_wallet' => $sender['wallet'],
        'sender_name' => $sender['name'],
        'recipient_name' => $recipient['name'],
        'recipient_ref' => $toRef
    ]);
    exit;
}

echo json_encode(['status' => 'JTrash API v1.1 online']);
