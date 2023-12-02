function init(){var e=document.querySelector("article.md-text");const i=e.classList.contains("reveal")||e.classList.contains("blur"),d=document.querySelector("body");document.querySelectorAll("figure.highlight").forEach(l=>{var e=l.querySelector(".code"),s=document.createElement("div"),t=(s.classList.add("code-btns"),document.createElement("div"));if(t.classList.add("btn"),t.classList.add("fullscreen-btn"),t.innerHTML=`<i class='fa-duotone fa-expand fa-fw'></i><span class="desc">放大</span>`,!i){const codeFullscreenBtnDesc=t.querySelector("span"),codeFullscreenBtnIcon=t.querySelector("i")}t.addEventListener("click",()=>{if(i){document.querySelector(".fullscreen")?.remove();let e=l.cloneNode(!0),s=(e.classList.add("fullscreen"),e.querySelector(".copy-btn")),t=s.querySelector("i"),c=s.querySelector("span");s.addEventListener("click",async()=>{await copyCode(e.querySelector(".code").children[0]?.innerText),c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,s.classList.add("success"),t.classList.remove("fa-copy"),t.classList.remove("fa-circle-exclamation"),t.classList.add("fa-circle-check"),util.messageCopyright(),setTimeout(()=>{c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("success"),t.classList.remove("fa-check"),t.classList.add("fa-copy")},3e3)});var a=e.querySelector(".fullscreen-btn"),n=a.querySelector("i"),o=a.querySelector("span");a.addEventListener("click",()=>{d.removeAttribute("style"),util.animateOut(e,"slide-out .5s")}),n.classList.remove("fa-expand"),n.classList.add("fa-compress"),o.innerText="缩小",d.appendChild(e),d.setAttribute("style","overflow:hidden;"),util.animateIn(e,"slide-in .5s")}else stellar.requestAnimationFrame(()=>{l.classList.toggle("fullscreen"),l.classList.contains("fullscreen")?(codeFullscreenBtnIcon.classList.remove("fa-expand"),codeFullscreenBtnIcon.classList.add("fa-compress"),codeFullscreenBtnDesc.innerText="缩小",d.setAttribute("style","overflow:hidden;")):(codeFullscreenBtnIcon.classList.remove("fa-compress"),codeFullscreenBtnIcon.classList.add("fa-expand"),codeFullscreenBtnDesc.innerText="放大",d.removeAttribute("style"),util.animateOut(l,"slide-out .5s"))})}),s.appendChild(t);const c=document.createElement("div"),a=(c.classList.add("btn"),c.classList.add("copy-btn"),c.innerHTML=`<i class='fa-duotone fa-copy fa-fw'></i><span class="desc">${stellar.GLOBAL_CONFIG.plugins.copycode.default_text}</span>`,c.querySelector("i")),n=c.querySelector("span");s.appendChild(c),c.addEventListener("click",async()=>{await copyCode(e.children[0]?.innerText),n.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,c.classList.add("success"),a.classList.remove("fa-copy"),a.classList.remove("fa-circle-exclamation"),a.classList.add("fa-circle-check"),util.messageCopyright(),setTimeout(()=>{n.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,c.classList.remove("success"),a.classList.remove("fa-check"),a.classList.add("fa-copy")},3e3)});var t=l.getAttribute("class").split(" ")[1],o=document.createElement("div"),t=(o.classList.add("code-lang"),o.innerHTML=`<span>${t}</span>`,document.createElement("div")),s=(t.classList.add("code-btns-and-lang"),t.appendChild(s),t.appendChild(o),document.createElement("div")),o=(s.classList.add("code-tools"),l.querySelector(".highlight figcaption"));o?s.appendChild(o):((o=document.createElement("figcaption")).innerHTML=`<span>${stellar.GLOBAL_CONFIG.config.default.codeblock_figtext}</span>`,s.appendChild(o)),s.appendChild(t),l.insertBefore(s,l.children[0])})}async function copyCode(e){if(navigator.clipboard)try{await navigator.clipboard.writeText(e)}catch(e){codeCopyBtnDesc.innerText="未获得用户许可",codeCopyBtn.classList.add("warning"),codeCopyBtnIcon.classList.remove("fa-copy"),codeCopyBtnIcon.classList.add("fa-circle-exclamation"),hud.message("未获得用户许可",e,{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{codeCopyBtnDesc.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,codeCopyBtn.classList.remove("warning"),codeCopyBtnIcon.classList.remove("fa-circle-exclamation"),codeCopyBtnIcon.classList.add("fa-copy")},3e3)}else codeCopyBtnDesc.innerText="当前浏览器不支持此api",codeCopyBtn.classList.add("warning"),codeCopyBtnIcon.classList.remove("fa-copy"),codeCopyBtnIcon.classList.add("fa-circle-exclamation"),hud.message("COPY错误","当前浏览器不支持此api",{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{codeCopyBtnDesc.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,codeCopyBtn.classList.remove("warning"),codeCopyBtnIcon.classList.remove("fa-circle-exclamation"),codeCopyBtnIcon.classList.add("fa-copy")},3e3)}init();