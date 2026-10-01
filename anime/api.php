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

function parseEpisodeServers($html) {
    $servers = [];
    $parts = explode('<div class="server-group">', $html);
    for ($i = 1; $i < count($parts); $i++) {
        $part = $parts[$i];
        $groupLabel = 'SUB';
        if (preg_match('/<label[^>]*>(.*?)<\/label>/si', $part, $lm)) {
            $rawLabel = strtoupper(trim(strip_tags($lm[1])));
            if (strpos($rawLabel, 'DUB') !== false) {
                $groupLabel = 'DUB';
            } elseif (strpos($rawLabel, 'SUB') !== false) {
                $groupLabel = 'SUB';
            }
        }
        if (preg_match_all('/<button[^>]*class="server-button[^"]*"[^>]*onclick="loadMi\(\{\s*value:\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]\s*\}\);?\"[^>]*>(.*?)<\/button>/si', $part, $bm, PREG_SET_ORDER)) {
            foreach ($bm as $btn) {
                $b64 = $btn[1];
                $name = trim(strip_tags($btn[2]));
                if (stripos($name, 'Recheck') !== false) continue;
                $decoded = base64_decode($b64);
                if (preg_match('/src=[\x27\x22]([^\x27\x22]+)[\x27\x22]/i', $decoded, $sm)) {
                    $playerUrl = html_entity_decode($sm[1], ENT_QUOTES | ENT_HTML5);
                    $type = (strpos($playerUrl, 'source=blogger') !== false || strpos($playerUrl, 'google') !== false) ? 'blogger' : 'embed';
                    $servers[] = [
                        'name' => $name . ' (' . $groupLabel . ')',
                        'raw_name' => $name,
                        'group' => $groupLabel,
                        'player_url' => $playerUrl,
                        'type' => $type
                    ];
                }
            }
        }
    }

    if (empty($servers)) {
        $embedSrc = '';
        if (preg_match('/<div class="player-embed"[^>]*id="pembed"[^>]*>\s*<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
            $embedSrc = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
        } elseif (preg_match('/<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
            $embedSrc = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
        }
        if (!empty($embedSrc)) {
            $type = (strpos($embedSrc, 'source=blogger') !== false || strpos($embedSrc, 'google') !== false) ? 'blogger' : 'embed';
            $servers[] = [
                'name' => 'Default (SUB)',
                'raw_name' => 'Default',
                'group' => 'SUB',
                'player_url' => $embedSrc,
                'type' => $type
            ];
        }
    }

    return $servers;
}

if ($action === 'servers') {
    $epUrl = $_GET['ep_url'] ?? '';
    if (empty($epUrl) || !filter_var($epUrl, FILTER_VALIDATE_URL)) {
        echo json_encode(['error' => 'Invalid or missing ep_url']);
        exit;
    }

    $cacheFile = $cacheDir . '/servers_' . md5($epUrl) . '.json';
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 18000)) {
        echo file_get_contents($cacheFile);
        exit;
    }

    $html = fetchUrl($epUrl);
    if (!$html) {
        echo json_encode(['error' => 'Failed to fetch episode page']);
        exit;
    }

    $servers = parseEpisodeServers($html);
    $result = [
        'ep_url' => $epUrl,
        'servers' => $servers
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
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 18000)) {
        echo file_get_contents($cacheFile);
        exit;
    }

    $html = fetchUrl($epUrl);
    if (!$html) {
        echo json_encode(['error' => 'Failed to fetch episode page']);
        exit;
    }

    $servers = parseEpisodeServers($html);
    $selectedServer = null;
    foreach ($servers as $s) {
        if ($s['type'] === 'embed') {
            $selectedServer = $s;
            break;
        }
    }
    if (!$selectedServer && !empty($servers)) {
        $selectedServer = $servers[0];
    }

    $embedSrc = $selectedServer ? $selectedServer['player_url'] : '';
    if (empty($embedSrc)) {
        if (preg_match('/<div class="player-embed"[^>]*id="pembed"[^>]*>\s*<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
            $embedSrc = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
        } elseif (preg_match('/<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
            $embedSrc = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
        }
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
        'source_type' => $sourceType,
        'servers' => $servers
    ];

    file_put_contents($cacheFile, json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode($result);
    exit;
}

if ($action === 'player') {
    $epUrl = $_GET['ep_url'] ?? '';
    $serverUrl = $_GET['server_url'] ?? '';

    if (empty($epUrl) || !filter_var($epUrl, FILTER_VALIDATE_URL)) {
        header('HTTP/1.1 400 Bad Request');
        echo 'Invalid ep_url';
        exit;
    }

    $targetPlayerUrl = '';
    if (!empty($serverUrl) && filter_var($serverUrl, FILTER_VALIDATE_URL)) {
        $targetPlayerUrl = $serverUrl;
    } else {
        $html = fetchUrl($epUrl);
        if (!$html) {
            header('HTTP/1.1 502 Bad Gateway');
            echo 'Failed to fetch episode page';
            exit;
        }

        $servers = parseEpisodeServers($html);
        foreach ($servers as $s) {
            if ($s['type'] === 'embed') {
                $targetPlayerUrl = $s['player_url'];
                break;
            }
        }
        if (empty($targetPlayerUrl) && !empty($servers)) {
            $targetPlayerUrl = $servers[0]['player_url'];
        }
        if (empty($targetPlayerUrl)) {
            if (preg_match('/<div class="player-embed"[^>]*id="pembed"[^>]*>\s*<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
                $targetPlayerUrl = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
            } elseif (preg_match('/<iframe[^>]+src="([^"]+)"/si', $html, $m)) {
                $targetPlayerUrl = html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5);
            }
        }
    }

    if (empty($targetPlayerUrl)) {
        header('HTTP/1.1 404 Not Found');
        echo 'Player iframe not found';
        exit;
    }

    // Fetch the actual player embed HTML with upstream referer
    $ch = curl_init($targetPlayerUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_REFERER, $epUrl);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $playerHtml = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 400 && !empty($playerHtml)) {
        // If playerHtml contains an inner iframe (e.g. megaplay/megavid), unwrap cleanly
        if (preg_match('/<iframe[^>]+src=[\x27\x22]([^\x27\x22]+)[\x27\x22]/si', $playerHtml, $im)) {
            $innerSrc = html_entity_decode($im[1], ENT_QUOTES | ENT_HTML5);
            if (strpos($innerSrc, '//') === 0) {
                $innerSrc = 'https:' . $innerSrc;
            }
            header('Content-Type: text/html; charset=utf-8');
            header('X-Frame-Options: ALLOWALL');
            echo '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><style>html,body{width:100%;height:100%;margin:0;padding:0;background:#000;overflow:hidden;}iframe{width:100%;height:100%;border:0;display:block;}</style></head><body><iframe src="' . htmlspecialchars($innerSrc, ENT_QUOTES) . '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups allow-forms" loading="eager"></iframe></body></html>';
            exit;
        }

        header('Content-Type: text/html; charset=utf-8');
        header('X-Frame-Options: ALLOWALL');
        echo $playerHtml;
        exit;
    }

    header('HTTP/1.1 502 Bad Gateway');
    echo 'Failed to load player backend';
    exit;
}

if ($action === 'image') {
    $imgUrl = $_GET['url'] ?? '';
    if (empty($imgUrl) || !filter_var($imgUrl, FILTER_VALIDATE_URL) || strpos($imgUrl, 'aniwave.by') === false) {
        header('HTTP/1.1 400 Bad Request');
        echo 'Invalid image url';
        exit;
    }

    $cacheFile = $cacheDir . '/img_' . md5($imgUrl) . '.jpg';
    if (file_exists($cacheFile) && filesize($cacheFile) > 0) {
        header('Content-Type: image/jpeg');
        header('Cache-Control: public, max-age=604800');
        readfile($cacheFile);
        exit;
    }

    $ch = curl_init($imgUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_REFERER, 'https://aniwave.by/');
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $data = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: 'image/jpeg';
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 400 && !empty($data)) {
        file_put_contents($cacheFile, $data);
        header('Content-Type: ' . $contentType);
        header('Cache-Control: public, max-age=604800');
        echo $data;
        exit;
    }

    header('HTTP/1.1 502 Bad Gateway');
    echo 'Failed to fetch image';
    exit;
}

echo json_encode(['error' => 'Unknown action']);
