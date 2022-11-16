self.addEventListener("install", (e) => {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();
  e.waitUntil(
    (async () => {
      const cache = await caches.open("static");
      await cache.addAll([]);
    })()
  );
});


// fetch event
self.addEventListener('fetch', evt => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        cacheRes =>
          cacheRes ||
          fetch(evt.request).then(fetchRes =>
            caches.open(dynamicNames).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicNames, 75);
              return fetchRes;
            })
          )
      )
      .catch(() => caches.match('/fallback'))
  );
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

