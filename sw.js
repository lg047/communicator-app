const CACHE_NAME = "tototype-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./app_icon_1024.png",
  "./chime.wav",
  "./jp.png",
  "./jp.wav",
  "./pipi.wav",
  "./pipi_new.png",
  "./pipi_new1.png",
  "./preview.png",
  "./tototype_icon_new.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
