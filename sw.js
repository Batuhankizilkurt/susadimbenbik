let timer = null;
let lastInterval = null;

self.addEventListener('message', event => {
    if (event.data.type === 'START_TIMER') {
        const interval = event.data.interval;
        lastInterval = interval;
        
        if (timer) clearInterval(timer);
        
        // Zamanlayıcıyı başlat
        timer = setInterval(() => {
            showWaterNotification();
        }, interval);

        console.log("Zamanlayıcı aktif: " + interval + "ms");
    }

    if (event.data.type === 'STOP_TIMER') {
        if (timer) clearInterval(timer);
        timer = null;
    }
});

// Bildirim gönderme fonksiyonu
function showWaterNotification() {
    const options = {
        body: 'Su içme vaktin geldi! Hadi bir bardak daha... 💧',
        icon: 'https://via.placeholder.com/192/ff6b81/ffffff?text=BIK',
        badge: 'https://via.placeholder.com/128/ff6b81/ffffff?text=BIK',
        vibrate: [200, 100, 200, 100, 200],
        tag: 'su-hatirlatici',
        renotify: true, // Aynı bildirim gelse bile tekrar titret
        requireInteraction: true // Kullanıcı kapatana kadar ekranda kalmaya çalışır
    };

    self.registration.showNotification('BİK Pro 🌸', options);
}

// KRİTİK: Service Worker'ın uykuda ölmesini engellemek için
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// Tarayıcı bu dosyayı durdurmaya çalışırsa kendini yenilemesi için küçük bir hile
self.addEventListener('push', event => {
    showWaterNotification();
});
