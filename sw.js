let timer = null;

self.addEventListener('message', event => {
    if (event.data.type === 'START_TIMER') {
        const interval = event.data.interval;
        if (timer) clearInterval(timer);
        
        // Sistemi uyanık tutmak için zorlayıcı döngü
        timer = setInterval(() => {
            const options = {
                body: 'Su içme vaktin geldi Lordum! 💧🌸',
                icon: 'https://via.placeholder.com/192/ff6b81/ffffff?text=BIK',
                badge: 'https://via.placeholder.com/128/ff6b81/ffffff?text=BIK',
                vibrate: [500, 100, 500, 100, 500],
                tag: 'su-hatirlatici',
                renotify: true,
                requireInteraction: true // Kullanıcı bakana kadar kilit ekranında baskın kalır
            };

            self.registration.showNotification('BİK Pro 🌸', options);
        }, interval);
    }
    
    if (event.data.type === 'STOP_TIMER') {
        if (timer) clearInterval(timer);
        timer = null;
    }
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(clients.claim()));
