let timerId = null;

// Bildirim gönderme fonksiyonu
const sendWaterNotification = () => {
    self.registration.showNotification('BİK Pro 💧', {
        body: 'su içme vaktiii! Hadi bir bardak tazelen.',
        icon: 'https://via.placeholder.com/128/ff6b81/ffffff?text=BIK',
        badge: 'https://via.placeholder.com/128/ff6b81/ffffff?text=BIK',
        vibrate: [300, 100, 300],
        tag: 'su-bildirim',
        renotify: true
    });
};

self.addEventListener('message', event => {
    if (event.data.type === 'START_TIMER') {
        const interval = event.data.interval;
        if (timerId) clearInterval(timerId);
        
        // İlk bildirimi hemen değil, belirlenen süre sonra atar
        timerId = setInterval(sendWaterNotification, interval);
        console.log("Zamanlayıcı başlatıldı: " + interval + "ms");
    } 
    
    if (event.data.type === 'STOP_TIMER') {
        clearInterval(timerId);
        console.log("Zamanlayıcı durduruldu.");
    }
});

// Service Worker'ın uykudan uyanmasını sağlar
self.addEventListener('push', event => {
    sendWaterNotification();
});