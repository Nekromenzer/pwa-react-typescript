console.log("Service Worker Loaded");

const cacheData = "appV1";

// install the cache
this.addEventListener("install", (event) => {
  event.waitUntil(
    // open the cache
    caches.open(cacheData).then((cache) => {
      // add all the files to the cache
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
  // only load from cache if offline
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      })
    );
  }
});
