<?php
// camera.php - Link-X Camera Data Receiver

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['image']) || empty($data['image'])) {
    http_response_code(400);
    exit('No image data');
}

// Decode base64
$imageData = base64_decode($data['image']);

if ($imageData === false) {
    http_response_code(400);
    exit('Invalid base64');
}

// Simpan sebagai PNG
$filePath = 'captured.png';
$bytes = file_put_contents($filePath, $imageData);

if ($bytes === false || $bytes < 512) {
    http_response_code(500);
    exit('Save failed or file too small');
}

// Buat file log agar Python tahu data siap
file_put_contents('Log.log', 'Received');

echo 'OK';
exit;
?>