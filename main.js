(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var r=t.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var c=r.getElementsByTagName("script");c.length&&(e=c[c.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.p;const e=document.querySelectorAll(".project-task"),r=document.querySelectorAll(".details-complete");function c(){let t=this.closest(".project-task");t.classList.toggle("checkedoff"),t.classList.contains("checkedoff")?this.innerText="Finished!":this.innerText="Mark as finished"}e.forEach((function(t){t.addEventListener("click",(function(t){t.stopPropagation(),function(t){let e=t.querySelector(".project-task-details");null!=e&&e.classList.toggle("hidden")}(t.target)}))})),r.forEach((function(t){t.addEventListener("click",c)}))})();