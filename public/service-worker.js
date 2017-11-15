const cacheName = 'v1';
const urls = [
  '/',
  '/styles.css',
  '/app.bundle.js',
  '/tilemaps/lisbon.json',
  '/img/tileset1.2.png',
  '/img/characters.png',
  '/img/artwork/side-characters.png'
];

addEventListener('install', (event) => {
  event.waitUntil(async function () {
    const cache = await caches.open(cacheName);
    await cache.addAll(urls);
  }());
});

addEventListener('fetch', (event) => {
  event.respondWith(async function () {
    return fetch(event.request)
      .catch(() => caches.match(event.request));
  }());
});
