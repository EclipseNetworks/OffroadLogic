const CACHE_NAME = 'offroad-logic-v2';

// List every file you want available without Wi-Fi
const ASSETS = [
  '/',
  '/index.html',
  '/old-index.html',
  '/drive-modes.html',
  '/driveline.html',
  '/terrain-dynamics.html',
  '/test.html',
  '/xclipsehub.png',
  '/xclipsenetworks-removebg-preview.png',
  '/xclipsenetworks.png',
  // Keep the Emerald-tech styling active
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Offroad Logic: Caching all drive modes and dynamics...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve from cache first, then network
      return response || fetch(event.request);
    })
  );
});