<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$action = $_GET['action'] ?? '';
$cacheDir = __DIR__ . '/cache';

function fetchUrl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_REFERER, 'https://aniwave.by/');
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $output = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($httpCode >= 200 && $httpCode < 400) {
        return $output;
    }
    return false;
}

if ($action === 'list') {
    $listFile = __DIR__ . '/anime_list.json';
    if (file_exists($listFile)) {
        echo file_get_contents($listFile);
        exit;
    }
    echo json_encode(['error' => 'List not found']);
    exit;
}

if ($action === 'episodes') {
    $slug = preg_replace('/[^a-zA-Z0-9_\-\%]/', '', $_GET['slug'] ?? '');
    if (empty($slug)) {
        echo json_encode(['error' => 'Missing slug']);
        exit;
    }

    $cacheFile = $cacheDir . '/episodes_' . md5($slug) . '.json';
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 86400)) {
        echo file_get_contents($cacheFile);
        exit;
    }

    $targetUrl = "https://aniwave.by/anime/{$slug}/";
    $html = fetchUrl($targetUrl);
    if (!$html) {
        echo json_encode(['error' => 'Failed to fetch anime series from upstream']);
        exit;
    }

    // Extract title
    $seriesTitle = '';
    if (preg_match('/<h1[^>]*class="entry-title"[^>]*>(.*?)<\/h1>/si', $html, $m)) {
        $seriesTitle = trim(strip_tags($m[1]));
    } elseif (preg_match('/<title>(.*?)<\/title>/si', $html, $m)) {
        $seriesTitle = trim(explode(' - ', $m[1])[0]);
    }

    // Extract episodes from list items
    $episodes = [];
    if (preg_match_all('/<li>\s*<a href="([^"]+)"[^>]*>.*?<div class="epl-num">([^<]+)<\/div>.*?<div class="epl-title">([^<]+)<\/div>/s', $html, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
            $epUrl = trim($match[1]);
            $num = trim($match[2]);
            $title = trim($match[3]);
            if (empty($title)) {
                $title = "Episode " . $num;
            }

            $episodes[] = [
                'num' => is_numeric($num) ? (int)$num : $num,
                'title' => html_entity_decode($title, ENT_QUOTES | ENT_HTML5),
                'url' => $epUrl
            ];
        }
    }

    // Reverse episodes so Episode 1 is first if they are in descending order
    if (count($episodes) > 1 && isset($episodes[0]['num'], $episodes[count($episodes)-1]['num'])) {
        if ($episodes[0]['num'] > $episodes[count($episodes)-1]['num']) {
            $episodes = array_reverse($episodes);
        }
    }

    $result = [
        'slug' => $slug,
        'title' => html_entity_decode($seriesTitle, ENT_QUOTES | ENT_HTML5),
        'episodes' => $episodes
    ];

    file_put_contents($cacheFile, json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode($result);
    exit;
}

if ($action === 'stream') {
    $epUrl = $_GET['ep_url'] ?? '';
    if (empty($epUrl) || !filter_var($epUrl, FILTER_VALIDATE_URL)) {
        echo json_encode(['error' => 'Invalid or missing ep_url']);
        exit;
    }

    $cacheFile = $cacheDir . '/stream_' . md5($epUrl) . '.json';
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 18000)) { // 5 hour cache
        echo file_get_contents($cacheFile);
        exit;
    }

    $html = fetchUrl($epUrl);
    if (!$html) {
        echo json_encode(['error' => 'Failed to fetch episode page']);
        exit;
    }

    $embedSrc = '';
    if (preg_match('/<div class="player-embed"[^>]*id="pembed"[^>]*>\s*<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
        $embedSrc = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
    } elseif (preg_match('/<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
        $embedSrc = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
    }

    if (empty($embedSrc)) {
        echo json_encode(['error' => 'Could not extract stream iframe']);
        exit;
    }

    $sourceType = 'embed';
    if (strpos($embedSrc, 'source=blogger') !== false || strpos($embedSrc, 'googlevideo.com') !== false) {
        $sourceType = 'google';
    } elseif (strpos($embedSrc, 'megavid') !== false) {
        $sourceType = 'megavid';
    } elseif (strpos($embedSrc, 'megaplay') !== false) {
        $sourceType = 'megaplay';
    }

    $result = [
        'ep_url' => $epUrl,
        'embed_url' => $embedSrc,
        'source_type' => $sourceType
    ];

    file_put_contents($cacheFile, json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode($result);
    exit;
}

if ($action === 'player') {
    $epUrl = $_GET['ep_url'] ?? '';
    if (empty($epUrl) || !filter_var($epUrl, FILTER_VALIDATE_URL)) {
        header('HTTP/1.1 400 Bad Request');
        echo 'Invalid ep_url';
        exit;
    }

    $html = fetchUrl($epUrl);
    if (!$html) {
        header('HTTP/1.1 502 Bad Gateway');
        echo 'Failed to fetch episode page';
        exit;
    }

    $playerUrl = '';
    if (preg_match('/<div class="player-embed"[^>]*id="pembed"[^>]*>\s*<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
        $playerUrl = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
    } elseif (preg_match('/<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
        $playerUrl = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
    }

    if (empty($playerUrl)) {
        header('HTTP/1.1 404 Not Found');
        echo 'Player iframe not found';
        exit;
    }

    // Fetch the actual player embed HTML with upstream referer
    $ch = curl_init($playerUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_REFERER, $epUrl);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $playerHtml = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 400 && !empty($playerHtml)) {
        header('Content-Type: text/html; charset=utf-8');
        header('X-Frame-Options: ALLOWALL');
        echo $playerHtml;
        exit;
    }

    header('HTTP/1.1 502 Bad Gateway');
    echo 'Failed to load player backend';
    exit;
}

echo json_encode(['error' => 'Unknown action']);
