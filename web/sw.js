const V='resume-v4',ASSETS=['./','index.html','css/style.css','js/data.js','js/render.js','js/app.js','manifest.webmanifest','img/hero.webp','img/logo.webp','img/icon-192.png','fonts/vazir/Vazir.woff2','fonts/vazir/Vazir-Light.woff2','fonts/vazir/Vazir-Medium.woff2','fonts/vazir/Vazir-Bold.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res}).catch(()=>hit||caches.match('index.html'));
    return hit||net;
  }));
});
