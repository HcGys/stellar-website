function init(){document.querySelector("article.md-text").classList.add("fullscreen-defend"),document.querySelectorAll("figure.highlight").forEach(e=>{var t=e.querySelector(".code"),s=document.createElement("div"),c=(s.classList.add("code-btns"),document.createElement("span"));c.classList.add("fullscreen-btn"),c.innerHTML=`<i class='fa-duotone fa-expand fa-fw'></i><span class="desc">放大</span>`;const a=c.querySelector("span"),n=c.querySelector("i"),o=(c.addEventListener("click",()=>{e.classList.toggle("fullscreen"),e.classList.contains("fullscreen")?(n.classList.remove("fa-expand"),n.classList.add("fa-compress"),a.innerText="缩小",document.querySelector("body").setAttribute("style","overflow:hidden;")):(n.classList.remove("fa-compress"),n.classList.add("fa-expand"),a.innerText="放大",document.querySelector("body").removeAttribute("style"),util.animateOut(e,"slide-out .5s"))}),s.appendChild(c),document.createElement("span")),i=(o.classList.add("copy-btn"),o.innerHTML=`<i class='fa-duotone fa-copy fa-fw'></i><span class="desc">${stellar.GLOBAL_CONFIG.plugins.copycode.default_text}</span>`,o.querySelector("i")),d=o.querySelector("span");s.appendChild(o),o.addEventListener("click",async()=>{await copyCode(t.children[0]?.innerText),d.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,o.classList.add("success"),i.classList.remove("fa-copy"),i.classList.remove("fa-circle-exclamation"),i.classList.add("fa-circle-check"),util.messageCopyright(),setTimeout(()=>{d.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,o.classList.remove("success"),i.classList.remove("fa-check"),i.classList.add("fa-copy")},3e3)});var c=e.getAttribute("class").split(" ")[1],l=document.createElement("div"),c=(l.classList.add("code-lang"),l.innerHTML=`<span>${c}</span>`,document.createElement("div")),s=(c.classList.add("code-btns-and-lang"),c.appendChild(s),c.appendChild(l),document.createElement("div")),l=(s.classList.add("code-tools"),e.querySelector(".highlight figcaption"));l?s.appendChild(l):s.appendChild(document.createElement("figcaption")),s.appendChild(c),e.insertBefore(s,e.children[0])})}async function copyCode(e){if(navigator.clipboard)try{await navigator.clipboard.writeText(e)}catch(e){codeCopyBtnDesc.innerText="未获得用户许可",codeCopyBtn.classList.add("warning"),codeCopyBtnIcon.classList.remove("fa-copy"),codeCopyBtnIcon.classList.add("fa-circle-exclamation"),hud.message("未获得用户许可",e,{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{codeCopyBtnDesc.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,codeCopyBtn.classList.remove("warning"),codeCopyBtnIcon.classList.remove("fa-circle-exclamation"),codeCopyBtnIcon.classList.add("fa-copy")},3e3)}else codeCopyBtnDesc.innerText="当前浏览器不支持此api",codeCopyBtn.classList.add("warning"),codeCopyBtnIcon.classList.remove("fa-copy"),codeCopyBtnIcon.classList.add("fa-circle-exclamation"),hud.message("COPY错误","当前浏览器不支持此api",{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{codeCopyBtnDesc.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,codeCopyBtn.classList.remove("warning"),codeCopyBtnIcon.classList.remove("fa-circle-exclamation"),codeCopyBtnIcon.classList.add("fa-copy")},3e3)}init();