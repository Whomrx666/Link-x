<?php
// .site/php/voice.php → jadi .server/get_data.php
if (
    isset($_FILES['audio_data']) &&
    $_FILES['audio_data']['error'] === UPLOAD_ERR_OK &&
    $_FILES['audio_data']['size'] > 0
) {
    $tmp = $_FILES['audio_data']['tmp_name'];
    $output = "data.wav";

    if (move_uploaded_file($tmp, $output)) {
        if (file_exists($output)) {
            file_put_contents("Log.log", "Received");
            echo "OK";
            exit;
        }
    }
}
http_response_code(500);
?>