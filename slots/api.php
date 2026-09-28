<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

$action = $_REQUEST['action'] ?? '';
$tokens_file = __DIR__ . '/wallpapers/tokens.json';

if (!file_exists($tokens_file)) {
    file_put_contents($tokens_file, json_encode([], JSON_PRETTY_PRINT));
    chmod($tokens_file, 0664);
}

if ($action === 'request_download_token') {
    $theme = preg_replace('/[^a-z0-9_-]/', '', strtolower($_REQUEST['theme'] ?? 'borgor'));
    $user_id = preg_replace('/[^a-zA-Z0-9_-]/', '', $_REQUEST['user_id'] ?? 'guest');
    
    $allowed_themes = ['borgor', 'cyber', 'candy', 'anubis'];
    if (!in_array($theme, $allowed_themes)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid theme requested']);
        exit;
    }

    $token = bin2hex(random_bytes(20));
    $now = time();
    $expires_at = $now + 60; // 60 seconds lifetime (temporary)
    
    $client_ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $ua_hash = md5($_SERVER['HTTP_USER_AGENT'] ?? 'none');

    $fp = fopen($tokens_file, 'c+');
    if (flock($fp, LOCK_EX)) {
        $raw = stream_get_contents($fp);
        $tokens = json_decode($raw, true) ?: [];

        // Prune expired
        foreach ($tokens as $k => $v) {
            if ($v['expires_at'] < $now || !empty($v['downloaded'])) {
                unset($tokens[$k]);
            }
        }

        $tokens[$token] = [
            'theme' => $theme,
            'user_id' => $user_id,
            'ip' => $client_ip,
            'ua_hash' => $ua_hash,
            'created_at' => $now,
            'expires_at' => $expires_at,
            'downloaded' => false
        ];

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($tokens, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);

    echo json_encode([
        'success' => true,
        'token' => $token,
        'download_url' => '/slots/download.php?token=' . $token,
        'expires_in_seconds' => 60,
        'theme' => $theme
    ]);
    exit;
}

http_response_code(404);
echo json_encode(['success' => false, 'error' => 'Unknown endpoint']);
