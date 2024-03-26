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
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // If request is not cached, fetch it from the network
      return fetch(event.request)
        .then((networkResponse) => {
          // Cache the fetched response
          if (event.request.method === "GET") {
            const clonedResponse = networkResponse.clone();
            caches.open(cacheData).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If fetching from network fails and there's no cached response, respond with a custom offline message
          return new Response(
            "You are offline. Please check your internet connection.",
            {
              status: 503,
              statusText: "Offline",
            }
          );
        });
    })
  );
});
