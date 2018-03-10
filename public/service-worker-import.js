// Set this to true for production
const doCache = false;

// Name our cache
const CACHE_NAME = "GITHUB-API-CACHE-V1";
const baseCache = ["/", "index.html", "/dist/app.bundle.js"];

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  console.log("[ServiceWorker] activate");
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log("Deleting cache: " + key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener("install", function(event) {
  console.log("[ServiceWorker] install");
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        fetch("asset-manifest.json")
          .then(response => {
            try {
              const json = response.json ? response.json() : {};
              return json;
            } catch (e) {
              return Promise.resolve({});
            }
          })
          .then(assets => {
            const urlsToCache = baseCache.concat(Object.values(assets));
            cache.addAll(urlsToCache);
            console.log("cached", urlsToCache);
          });
      })
    );
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener("fetch", function(event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        console.log("[ServiceWorker] fetch", event.request.url);
        if (response) {
          console.log("return cache");
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(function(response) {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
});
