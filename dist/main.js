(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var i=n.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.p;const e={type:"text",name:"name",placeholder:"Task Name"},n={type:"date",name:"due",placeholder:"Due Date"},i={type:"text",name:"description",placeholder:"Task Description"},r={type:"text",name:"priority",placeholder:"Task Priority"},s={type:"submit",value:"Add Task"},a={type:"submit",value:"Cancel"};class c{constructor(t,e){this.name=t.name,this.due=t.due,this.description=t.description,this.priority=t.priority,this.id=e}}class o{constructor(t){this.name=t,this.tasks=[],this.id=o.assignId()}addTask(t){let e=this.tasks.length+1,n=new c(t,e);this.tasks.push(n)}removeTask(t){let e=this.tasks.indexOf(this.tasks.find((e=>e.id==t)));this.tasks.splice(e,1)}static assignId(){return l++}}let d=[],l=1;function p(t){return d.find((e=>e.id==t.getAttribute("data-id")))}function u(t){let e=v("li","project-task");e.setAttribute("data-id",t.id),e.innerText=t.name;let n=function(t){let e=v("ul","project-task-details");e.classList.add("hidden");let n=function(){let t=v("li","details-complete");return t.classList.add("button"),t.innerText="Mark as finished",t.addEventListener("click",f),t}(),i=function(){let t=v("li","details-delete");return t.classList.add("button"),t.innerText="Delete task",t.addEventListener("click",m),t}();e.append(n),e.append(i);for(let n in t)if("name"!=n&&"id"!=n){let i=v("li","details"),r=n[0].toUpperCase().concat(n.slice(1));i.innerText=`${r}: ${t[n]}`,e.append(i)}return e}(t);return e.append(n),e.addEventListener("click",(function(t){t.stopPropagation(),function(t){let e=t.querySelector(".project-task-details");null!=e&&e.classList.toggle("hidden")}(t.target)})),e}function f(){let t=this.closest(".project-task");t.classList.toggle("checkedoff"),t.classList.contains("checkedoff")?this.innerText="Finished!":this.innerText="Mark as finished"}function m(){let t=this.closest(".project-task"),e=t.closest(".project-items");confirm("Delete this task?")&&(function(t){let e=p(t.closest(".project")),n=t.getAttribute("data-id");e.removeTask(n)}(t),e.removeChild(t))}function h(){let t=this.closest(".project"),c=t.querySelector(".project-items"),o=function(){let t=v("form","task-form"),c=[k(e),k(n),k(i),k(r),k(s),k(a)];for(let e of c)t.append(e);return t}();c.append(o),o.addEventListener("submit",(e=>{if(e.preventDefault(),"Cancel"===e.submitter.value)c.removeChild(o);else{let n=Object.fromEntries(new FormData(e.target).entries()),i=function(t,e){let n=p(t);return n.addTask(e),n.tasks.slice(-1)[0]}(t,n);!function(t,e){let n=u(e);t.append(n)}(c,i),c.removeChild(o)}}))}function k(t){let e=document.createElement("input");for(let n in t)e.setAttribute(n,t[n]);return e}function v(t,e){let n=document.createElement(t);return n.classList.add(e),n}function g(t){let e=new o(t);var n;n=e,document.querySelector(".projects-list").append(function(t){let e=v("div","project");e.setAttribute("data-id",t.id);let n=function(t){let e=v("div","project-heading"),n=v("h2","project-title");n.innerText=t;let i=v("div","divider");return e.append(n),e.append(i),e}(t.name),i=v("ul","project-items"),r=function(){let t=v("div","add-new-task"),e=v("div","new-task-button");return e.innerText="+ add task",e.addEventListener("click",h),t.append(e),t}();return e.append(n),e.append(i),e.append(r),e}(n)),function(t){d.push(t)}(e)}document.getElementById("create-project-form").addEventListener("submit",(t=>{t.preventDefault();let e=Object.fromEntries(new FormData(t.target).entries());e.name?g(e.name):g("Unnamed Project"),t.target.reset()}))})();