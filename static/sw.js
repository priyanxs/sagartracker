// Service Worker for SagarTracker & Apertu PWA
const CACHE_NAME = 'apertu-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let network requests pass through with standard cache fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
