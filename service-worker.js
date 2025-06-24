// Define the cache name
const CACHE_NAME = 'object-recognizer-cache-v1';

// List the files to cache
const urlsToCache = [
  './', // Caches the index.html
  './index.html',
  './manifest.json',
  // You would list your icon files here, e.g.:
  // './icons/icon-72x72.png',
  // './icons/icon-96x96.png',
  // etc.
  'https://cdn.tailwindcss.com' // Cache Tailwind CSS
];

// Install event: caches the listed files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached content if available, otherwise fetches from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: cleans up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
