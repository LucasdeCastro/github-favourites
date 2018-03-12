// Set this to true for production
const doCache = true;

// Name our cache
const CACHE_NAME = "GITHUB-API-CACHE-V1";
const baseCache = ["/", "index.html", "/dist/app.bundle.js"];

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener("install", function(event) {
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
          });
      })
    );
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener("fetch", function(e) {
  if (doCache) {
    const gitRepoApi = "https://api.github.com/search/repositories";
    const gitAvatar = "githubusercontent.com";
    const url = e.request.url;

    // Check if this is data or app shell request
    if (url.indexOf(gitRepoApi) > -1 || url.indexOf(gitAvatar) > -1) {
      e.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return cache.match(url).then(function(cached) {
            if (cached) return cached;

            return fetch(e.request).then(function(response) {
              cache.put(url, response.clone());
              return response;
            });
          });
        })
      );
    } else {
      e.respondWith(
        caches.match(e.request).then(function(response) {
          if (response) return response;

          return fetch(e.request).then(function(response) {
            if (response.ok) {
              return caches.open(CACHE_NAME).then(function(cache) {
                cache.put(e.request.url, response.clone());
                return response;
              });
            } else {
              return response;
            }
          });
        })
      );
    }
  }
});
