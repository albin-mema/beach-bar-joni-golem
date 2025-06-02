// Service Worker for Bar Joni Website
// Provides offline caching and performance improvements

const CACHE_NAME = 'bar-joni-v2';
const BASE_URL = '/beach-bar-joni-golem/';

// Critical resources to cache immediately
// Only includes the 4 gallery images that actually exist
const CRITICAL_RESOURCES = [
  `${BASE_URL}`,
  `${BASE_URL}index.html`,
  `${BASE_URL}beach_bar.webp`,
  `${BASE_URL}beach_bar.jpeg`,
  `${BASE_URL}beach_bar_1.webp`,
  `${BASE_URL}beach_bar_1.jpeg`,
  `${BASE_URL}beach_bar_2.webp`,
  `${BASE_URL}beach_bar_2.jpeg`,
  `${BASE_URL}drinks.webp`,
  `${BASE_URL}drinks.jpeg`,
  `${BASE_URL}_astro/index.css`,
  `${BASE_URL}_astro/page.js`
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.log('Cache install failed:', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Return offline page for HTML requests
            if (event.request.destination === 'document') {
              return caches.match(`${BASE_URL}index.html`);
            }
          });
      })
  );
});

// Background sync for analytics (if supported)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background tasks here
      console.log('Background sync triggered')
    );
  }
});

// Push notification handler (for future use)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: `${BASE_URL}favicon-32x32.png`,
      badge: `${BASE_URL}favicon-16x16.png`,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(`${BASE_URL}`)
  );
});
