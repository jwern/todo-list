(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var c=n.getElementsByTagName("script");c.length&&(t=c[c.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.p;const t=document.querySelectorAll(".project-task"),n=document.querySelectorAll(".details-complete");function c(){let e=this.closest(".project-task");e.classList.toggle("checkedoff"),e.classList.contains("checkedoff")?this.innerText="Finished!":this.innerText="Mark as finished"}t.forEach((function(e){e.addEventListener("click",(function(e){e.stopPropagation(),function(e){let t=e.querySelector(".project-task-details");null!=t&&t.classList.toggle("hidden")}(e.target)}))})),n.forEach((function(e){e.addEventListener("click",c)})),document.querySelector(".projects-list").append(function(){let e=document.createElement("div");e.classList.add("project");let t=function(e){let t=document.createElement("div");t.classList.add("project-heading");let n=document.createElement("h2");n.classList.add("project-title"),n.innerText="Default Project";let c=document.createElement("div");return c.classList.add("divider"),t.append(n),t.append(c),t}(),n=function(){let e=document.createElement("ul");return e.classList.add("project-items"),e}(),c=function(){let e=document.createElement("div");e.classList.add("add-new-task");let t=document.createElement("div");return t.classList.add("new-task-button"),t.innerText="+ add task",e.append(t),e}();return e.append(t),e.append(n),e.append(c),e}())})();