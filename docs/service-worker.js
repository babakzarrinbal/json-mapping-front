importScripts("/json-mapping-front/precache-manifest.e5e116df72b80255f3478278751a3cf7.js", "/json-mapping-front/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/json-mapping-front/workbox-v3.6.3"});
workbox.setConfig({ modulePathPrefix: "/aknoon/workbox-v4.3.1", debug: false });
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  "/aknoon/workbox-v4.3.1/workbox-sw.js",
  "/aknoon/service-worker.js",
  ...self.__precacheManifest.map(i => i.url)
]);

workbox.routing.registerRoute(
  /\.[png|jpg|svg|js|css]$/,
  new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(/\.[html|json]$/, new workbox.strategies.NetworkFirst());

self.addEventListener("push", function(event) {
  let data, title, options;
  try {
    data = event.data.json();
    title = data.title || "Notification";
    options = {
      body: data.body || "Notificatioin",
      icon: data.icon || "img/icons/logo.png",
      badge: data.badge || "img/icons/logo.png",
      data
    };

    if (data.tag) options.tag = data.tag;
  }catch(e){
    data = event.data.text();
    title = data || "Notification";
    options = {
      body: data || "Notificatioin",
      icon:  "img/icons/logo.png",
      badge: "img/icons/logo.png",
      data
    };

  }

  const notificationPromise = self.registration.showNotification(
    title,
    options
  );
  event.waitUntil(notificationPromise);
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  console.log(event.notification.data);
  // event.waitUntil(
  //   clients.openWindow(
  //     "http://localhost:5000/#/" + (event.notification.data || {}).gotourl || ""
  //   )
  // );
});

