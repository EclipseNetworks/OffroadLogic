const CACHE_NAME = 'offroad-logic-v3';

const ASSETS = [
  './',
  './index.html',
  './home.html',
  './driveline.html',
  './Drive Modes.html', // Fixed: Matches your uploaded filename
  './Terrain Dynamics.html', // Fixed: Matches your uploaded filename
  './test.html',
  './old-index.html',
  './xclipsehub.png',
  './xclipsehub2.png',
  './xclipsenetworks-removebg-preview.png',
  './xclipsenetworks.png',
  // Essential External Styles
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Map through assets so one failure doesn't stop the whole installation
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('Skipped file:', url));
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});