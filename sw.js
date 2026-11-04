/* Guarda a casca do aplicativo para abrir mesmo sem internet.
   Os dados do caderno não passam por aqui: vêm sempre do banco. */
const VERSAO = 'okhema-v2';
const CASCA = ['./', 'index.html', 'supabase.js', 'config.js', 'arithmos.js', 'manifest.webmanifest',
  'icones/icone-192.png', 'icones/icone-512.png', 'icones/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCA)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  /* fontes do Google: usa a cópia guardada e renova em segundo plano */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSAO).then(async c => {
      const guardada = await c.match(req);
      const rede = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => guardada);
      return guardada || rede;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  /* páginas e arquivos do próprio app: rede primeiro (para receber atualizações), cópia se estiver sem internet */
  e.respondWith(fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(VERSAO).then(ca => ca.put(req, c)); }
    return r;
  }).catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined))));
});
