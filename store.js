self.addEventListener('fetch', event => {

     event.respondWith(
          (async () => {

               const cache = await caches.open(MAIN_CACHE);
               const versionCache = await caches.open(VERSION_CACHE);
               var url = new URL(event.request.url);
               var filename = url.pathname.split('/').pop();
               url.search = '';

               // This can be removed after editing TWF is finished
                    if (navigator.onLine) {

                         if (filename === 'variables.js') {
                              if (updateVar) {
                                   const headResponse = await fetch(url, { method: 'HEAD' });
                                   const newETag = headResponse.headers.get('ETag');
                                   let cachedResponse = await cache.match(url);
                                   if (cachedResponse) {
                                        const oldETag = cachedResponse.headers.get('ETag');
                                        if (newETag && oldETag && newETag !== oldETag) {
                                             const newResponse = await fetchOnlineUpdate(url, filename);
                                             if (newResponse.ok) { await cache.put(url, newResponse); };
                                        };
                                        updateVar = false;
                                   };
                              };
                         };

                         if (filename === 'TWFVerses.json') {
                              if (update) {
                                   const headResponse = await fetch(url, { method: 'HEAD' });
                                   const newETag = headResponse.headers.get('ETag');
                                   let cachedResponse = await versionCache.match(url);
                                   if (cachedResponse) {
                                        const oldETag = cachedResponse.headers.get('ETag');
                                        if (newETag && oldETag && newETag !== oldETag) {
                                             const newResponse = await fetchOnlineUpdate(url, filename);
                                             if (newResponse.ok) { await versionCache.put(url, newResponse); };
                                        };
                                        update = false;
                                   };
                              };
                         };
                    };
               // End This can be removed after editing TWF is finished

               if (filename.endsWith('.json') && filename !== 'manifest.json') {

                    const cachedResponse = await versionCache.match(url);
                    if (cachedResponse) { return cachedResponse };

                    const response = await fetchOnline(url, filename);
                    if (!response.ok) { return response; };
                    await versionCache.put(url, response.clone());
                    return response;
               } else {

                    const cachedResponse = await cache.match(url);
                    if (cachedResponse) { return cachedResponse };

                    const response = await fetchOnline(url, filename);
                    if (!response.ok) { return response; };
                    await cache.put(url, response.clone());
                    return response;
               };
          })()
     );
});