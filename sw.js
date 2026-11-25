// Funcionamiento sin conexión. Versión: hsk1-422c3c47de
const V = "hsk1-422c3c47de", FONTS = "hsk1-fonts";
const ASSETS = ["./","index.html","manifest.webmanifest","app.js","words.js","chars.js","lessons.js","exambank.js","strokes.js","hanzi-writer.min.js","apple-touch-icon.png","icon-192.png","icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || (req.mode === "navigate" ? caches.match("./") : null)).then(r => r || fetch(req)));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(FONTS).then(c => c.match(req).then(hit => { const net = fetch(req).then(res => { c.put(req, res.clone()); return res; }).catch(() => hit); return hit || net; })));
  }
});
