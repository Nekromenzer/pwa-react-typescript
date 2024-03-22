console.log("Service Worker Loaded");

const cacheData = "appV1";

// install the cache
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "static/js/src_pages_Home_tsx.chunk.js",
        "/",
        "/index.html",
      ]);
    })
  );
});

// refetch the cache
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        return resp;
      }
    })
  );
});
