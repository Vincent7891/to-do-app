(()=>{"use strict";class e{constructor(e){this.title=e,this.toDoStorage=[]}}const t=new class{constructor(){this.projectStore=[]}addProject(e){this.projectStore.push(e)}};function o(){const e=document.getElementById("project-display");t.projectStore.forEach(((t,o)=>{const n=document.createElement("div"),c=document.createElement("button");n.id=`user-project-${o+1}`,n.textContent=t.title,c.id=`remove-project-${o+1}`,c.className="remove-project-button",c.textContent="X",n.appendChild(c),e.appendChild(n)}))}document.getElementById("project-form").addEventListener("submit",(n=>{n.preventDefault();const c=document.getElementById("project-name-dialogue").value,d=new e(c);t.addProject(d),o(),console.log(t,"is the storage left")})),o(),function(){const e=document.getElementById("add-project-button"),t=document.getElementById("dialog"),o=document.getElementById("close-dialog-button"),n=document.getElementById("submit-project-button");e.addEventListener("click",(()=>{t.showModal()})),o.addEventListener("click",(()=>{t.close()})),n.addEventListener("click",(()=>{t.close()}))}(),document.querySelectorAll(".remove-project-button").forEach(((e,o)=>{e.addEventListener("click",(function(){!function(e){t.projectStore.splice(e,1)}(o),function(e){const t=document.getElementById(`remove-project-${e}`);if(t){const e=t.parentNode;e&&e.remove()}}(o)}))}))})();