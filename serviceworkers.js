var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/fallback.json',
'/css/bootstrap.css',
'/js/jquery.min.js',
'/js/main.js',
'/gambar/header.jpeg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('in install serviceworker.... cache opened!');

        // daftar url yang ada di url tocahce
        return cache.addAll(urlsToCache);
      })
    );
});


self.addEventListener('fetch', function(event) {

  var request = event.request

  var url = new URL(request.url)

  // pisahkan API dan internal


  if(origin.url === location.origin){
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // Cache hit - return response
          return response || fetch(event.request)
      })
      )
  }else{

    event.respondWith(
      caches.open('produk-cache').then(function(cache){
        return fetch(request).then(function(liveRespon){
          cache.put(request,liveRespon.clone())
          return liveRespon
        }).catch(function(){
          return caches.match(request).then(function(response){
            if(response) return response
              return caches.match('/fallback.json')
          })
        })
      })
      )

  }

});

self.addEventListener('activate', function(event) {

  // list chace yang akan disimpan
  // var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName!=CACHE_NAME
        }).map(function(cacheName){
          return caches.delete()
        })
        );
    })
    );
});