// Minimal service worker for installability and basic offline caching
// Note: In dev (Vite), SW scope may differ; installability works best in production build.

const CACHE_NAME = 'isoworld-m0-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
  // Built assets (JS/CSS) are hashed; this minimal list is enough for install signal
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  )
})
