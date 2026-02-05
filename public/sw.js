// Ramadan Bot Service Worker
const CACHE_NAME = 'ramadan-bot-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icon.png',
  '/logo.png',
  '/ramadan-background.png'
];

// Install event - Cache assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.log('[ServiceWorker] Cache add error:', err);
        // Don't fail install if some assets can't be cached
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extension requests
  if (request.url.includes('chrome-extension://')) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Don't cache if not a success response
        if (!response || response.status !== 200 || response.type === 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache successful responses
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Network request failed, try to return from cache
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }

          // Return a basic offline page if available
          if (request.mode === 'navigate') {
            return caches.match('/');
          }

          return null;
        });
      })
  );
});

// Background sync for future use
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reflections') {
    event.waitUntil(
      Promise.resolve() // Implement sync logic here
    );
  }
});
