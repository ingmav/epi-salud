(self.webpackChunkbase_platform=self.webpackChunkbase_platform||[]).push([[76],{9667:(h,v,i)=>{"use strict";i.d(v,{K:()=>m});var f=i(5312),c=i(6354),d=i(4438),p=i(1626);let m=(()=>{class s{constructor(o){this.http=o,this.url_tema=`${f.c.base_url}/tema`,this.url_tema_plataforma=`${f.c.base_url}/tema-plataforma`,this.url_slides=`${f.c.base_url}/slides`}obtenerTemas(o){return this.http.get(this.url_tema,{params:o}).pipe((0,c.T)(r=>r))}obtenerSlides(){return this.http.get(this.url_slides,{}).pipe((0,c.T)(o=>o))}obtenerTemasPlataforma(){return this.http.get(this.url_tema_plataforma,{}).pipe((0,c.T)(o=>o))}guardarTema(o){return this.http.post(this.url_tema,{params:o}).pipe((0,c.T)(r=>r))}eliminarTema(o){return this.http.delete(this.url_tema+"/"+o,{}).pipe((0,c.T)(r=>r))}static#t=this.\u0275fac=function(r){return new(r||s)(d.KVO(p.Qq))};static#e=this.\u0275prov=d.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})()},2578:function(h,v){var i,c;void 0!==(c="function"==typeof(i=function(){"use strict";function p(t,e,u){var n=new XMLHttpRequest;n.open("GET",t),n.responseType="blob",n.onload=function(){r(n.response,e,u)},n.onerror=function(){console.error("could not download file")},n.send()}function m(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch{}return 200<=e.status&&299>=e.status}function s(t){try{t.dispatchEvent(new MouseEvent("click"))}catch{var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var l="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,o=l.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=l.saveAs||("object"!=typeof window||window!==l?function(){}:"download"in HTMLAnchorElement.prototype&&!o?function(t,e,u){var n=l.URL||l.webkitURL,a=document.createElement("a");a.download=e=e||t.name||"download",a.rel="noopener","string"==typeof t?(a.href=t,a.origin===location.origin?s(a):m(a.href)?p(t,e,u):s(a,a.target="_blank")):(a.href=n.createObjectURL(t),setTimeout(function(){n.revokeObjectURL(a.href)},4e4),setTimeout(function(){s(a)},0))}:"msSaveOrOpenBlob"in navigator?function(t,e,u){if(e=e||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function d(t,e){return typeof e>"u"?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}(t,u),e);else if(m(t))p(t,e,u);else{var n=document.createElement("a");n.href=t,n.target="_blank",setTimeout(function(){s(n)})}}:function(t,e,u,n){if((n=n||open("","_blank"))&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof t)return p(t,e,u);var a="application/octet-stream"===t.type,b=/constructor/i.test(l.HTMLElement)||l.safari,A=/CriOS\/[\d]+/.test(navigator.userAgent);if((A||a&&b||o)&&typeof FileReader<"u"){var E=new FileReader;E.onloadend=function(){var _=E.result;_=A?_:_.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=_:location=_,n=null},E.readAsDataURL(t)}else{var T=l.URL||l.webkitURL,w=T.createObjectURL(t);n?n.location=w:location.href=w,n=null,setTimeout(function(){T.revokeObjectURL(w)},4e4)}});l.saveAs=r.saveAs=r,h.exports=r})?i.apply(v,[]):i)&&(h.exports=c)}}]);