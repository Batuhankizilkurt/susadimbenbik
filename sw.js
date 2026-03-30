let timer = null;

self.addEventListener('message', event => {
    if (event.data.type === 'START_TIMER') {
        const interval = event.data.interval;
        
        if (timer) clearInterval(timer);
        
        // Sistemi uyanık tutmak için "Self-Wakeup" mantığı
        timer = setInterval(() => {
            self.registration.showNotification('BİK Pro 💧', {
                body: 'Su içme vaktin geldi! Hadi bir bardak daha... 🌸',
                icon: 'https://via.placeholder.com/192/ff6b81/ffffff?text=BIK',
                badge: 'https://via.placeholder.com/128/ff6b81/ffffff?text=BIK',
                vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40],
                tag: 'su-hatirlatici',
                renotify: true,
                requireInteraction: true // Ekran kilidinde daha görünür kalması için
            });
        }, interval);
    }

    if (event.data.type === 'STOP_TIMER') {
        if (timer) clearInterval(timer);
        timer = null;
    }
});

// Service Worker'ın kilitli ekranda ölmesini engellemek için aktif tutma
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});
