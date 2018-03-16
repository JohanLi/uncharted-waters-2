const cacheName = 'v1';
const urls = [
  '/',
  '/styles.css',
  '/app.bundle.js',
  '/data/buildings.json',
  '/data/ports.json',
  '/img/tileset0.2.png',
  '/img/tileset2.2.png',
  '/img/characters.png',
  '/img/artwork/side-characters.png',
  '/img/cursor/up.png',
  '/img/cursor/down.png',
  '/img/cursor/left.png',
  '/img/cursor/right.png',
  '/img/cursor/normal.png',
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
