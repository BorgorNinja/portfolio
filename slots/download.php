<?php
$token = $_GET['token'] ?? '';
$token = preg_replace('/[^a-zA-Z0-9]/', '', $token);

$tokens_file = __DIR__ . '/wallpapers/tokens.json';

function show_error($title, $msg, $code = 403) {
    http_response_code($code);
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title><?= htmlspecialchars($title) ?> — Borgor Slots</title>
      <style>
        body {
          background: #090a12;
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
        }
        .error-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(239, 68, 68, 0.4);
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.2);
          border-radius: 16px;
          padding: 32px 24px;
          max-width: 480px;
          text-align: center;
        }
        .icon { font-size: 3rem; margin-bottom: 12px; }
        h1 { font-size: 1.4rem; color: #ef4444; margin: 0 0 10px 0; }
        p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; margin: 0 0 20px 0; }
        a {
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #451a03;
          text-decoration: none;
          font-weight: 800;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="error-card">
        <div class="icon">🔒</div>
        <h1><?= htmlspecialchars($title) ?></h1>
        <p><?= htmlspecialchars($msg) ?></p>
        <a href="/slots/">← Return to Borgor Slots Arena</a>
      </div>
    </body>
    </html>
    <?php
    exit;
}

if (empty($token) || !file_exists($tokens_file)) {
    show_error("Invalid Download Token", "No valid authentication token was provided in the request.", 400);
}

$client_ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$client_ua_hash = md5($_SERVER['HTTP_USER_AGENT'] ?? 'none');
$now = time();

$fp = fopen($tokens_file, 'c+');
if (!$fp || !flock($fp, LOCK_EX)) {
    show_error("Server Busy", "Temporary lock collision. Please try again.", 500);
}

$raw = stream_get_contents($fp);
$tokens = json_decode($raw, true) ?: [];

if (!isset($tokens[$token])) {
    flock($fp, LOCK_UN);
    fclose($fp);
    show_error("Link Expired or Invalid", "This download link is temporary (60s lifetime) and has expired or does not exist.", 410);
}

$data = $tokens[$token];

// Check expiration
if ($data['expires_at'] < $now) {
    unset($tokens[$token]);
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($tokens, JSON_PRETTY_PRINT));
    flock($fp, LOCK_UN);
    fclose($fp);
    show_error("Download Link Expired", "This download token was temporary and expired after 60 seconds. Please re-open the in-game Souvenir Shop to generate a fresh link.", 410);
}

// User-specific validation: IP & User-Agent lock
if ($data['ip'] !== $client_ip || $data['ua_hash'] !== $client_ua_hash) {
    flock($fp, LOCK_UN);
    fclose($fp);
    show_error("Device Mismatch (Link Sharing Blocked)", "This download link is cryptographically tied to the original purchasing device and cannot be shared with other users.", 403);
}

// Single-use validation
if (!empty($data['downloaded'])) {
    unset($tokens[$token]);
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($tokens, JSON_PRETTY_PRINT));
    flock($fp, LOCK_UN);
    fclose($fp);
    show_error("Link Already Consumed", "This single-use download token has already been used.", 410);
}

// Consume token immediately
$tokens[$token]['downloaded'] = true;
unset($tokens[$token]); // Remove immediately so it cannot be reused
ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($tokens, JSON_PRETTY_PRINT));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

$theme = preg_replace('/[^a-z0-9_-]/', '', $data['theme']);
$file_path = __DIR__ . "/wallpapers/wallpaper_{$theme}.png";

if (!file_exists($file_path)) {
    show_error("Wallpaper Not Found", "The requested 4K wallpaper file is currently unavailable.", 404);
}

// Stream the 4K PNG file
$filename = "Borgor_Casino_4K_" . strtoupper($theme) . "_Wallpaper.png";
header('Content-Description: File Transfer');
header('Content-Type: image/png');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Expires: 0');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0, no-cache, no-store');
header('Pragma: public');
header('Content-Length: ' . filesize($file_path));

readfile($file_path);
exit;
