function init(){var e=document.querySelector("article.md-text");const o=e.classList.contains("reveal")||e.classList.contains("blur"),d=document.querySelector("body");document.querySelectorAll("figure.highlight").forEach(i=>{var e=i.querySelector(".code"),s=document.createElement("div"),t=(s.classList.add("code-btns"),document.createElement("div"));if(t.classList.add("btn"),t.classList.add("fullscreen-btn"),t.innerHTML=`<i class='fa-duotone fa-expand fa-fw'></i><span class="desc">放大</span>`,!o){const codeFullscreenBtnDesc=t.querySelector("span"),codeFullscreenBtnIcon=t.querySelector("i")}t.addEventListener("click",()=>{if(o){document.querySelector(".fullscreen")?.remove();let e=i.cloneNode(!0),s=(e.classList.add("fullscreen"),e.querySelector(".copy-btn")),t=s.querySelector("i"),c=s.querySelector("span");s.addEventListener("click",async()=>{await copyCode(e.querySelector(".code").children[0]?.innerText),c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,s.classList.add("success"),t.classList.remove("fa-copy"),t.classList.remove("fa-circle-exclamation"),t.classList.add("fa-circle-check"),util.messageCopyright(),setTimeout(()=>{c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("success"),t.classList.remove("fa-check"),t.classList.add("fa-copy")},3e3)});var a=e.querySelector(".fullscreen-btn"),l=a.querySelector("i"),n=a.querySelector("span");a.addEventListener("click",()=>{d.removeAttribute("style"),util.animateOut(e,"slide-out .5s")}),l.classList.remove("fa-expand"),l.classList.add("fa-compress"),n.innerText="缩小",d.appendChild(e),d.setAttribute("style","overflow:hidden;"),util.animateIn(e,"slide-in .5s")}else stellar.requestAnimationFrame(()=>{i.classList.toggle("fullscreen"),i.classList.contains("fullscreen")?(codeFullscreenBtnIcon.classList.remove("fa-expand"),codeFullscreenBtnIcon.classList.add("fa-compress"),codeFullscreenBtnDesc.innerText="缩小",d.setAttribute("style","overflow:hidden;")):(codeFullscreenBtnIcon.classList.remove("fa-compress"),codeFullscreenBtnIcon.classList.add("fa-expand"),codeFullscreenBtnDesc.innerText="放大",d.removeAttribute("style"),util.animateOut(i,"slide-out .5s"))})}),s.appendChild(t);var t=document.createElement("div"),c=(t.classList.add("btn"),t.classList.add("copy-btn"),t.innerHTML=`<i class='fa-duotone fa-copy fa-fw'></i><span class="desc">${stellar.GLOBAL_CONFIG.plugins.copycode.default_text}</span>`,t.querySelector("i")),a=t.querySelector("span"),t=(s.appendChild(t),copyCode(t,e,c,a),i.getAttribute("class").split(" ")[1]),e=document.createElement("div"),c=(e.classList.add("code-lang"),e.innerHTML=`<span>${t}</span>`,document.createElement("div")),a=(c.classList.add("code-btns-and-lang"),c.appendChild(s),c.appendChild(e),document.createElement("div")),t=(a.classList.add("code-tools"),i.querySelector(".highlight figcaption"));t?a.appendChild(t):((s=document.createElement("figcaption")).innerHTML=`<span>${stellar.GLOBAL_CONFIG.config.default.codeblock_figtext}</span>`,a.appendChild(s)),a.appendChild(c),i.insertBefore(a,i.children[0])})}function copyCode(s,t,c,a){s.onclick=e=>{e.stopPropagation(),t.focus();e=new Range,e.selectNodeContents(t),document.getSelection().removeAllRanges(),document.getSelection().addRange(e),e=document.getSelection().toString();util.writeClipText(e).then(()=>{util.messageCopyright(),a.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,s.classList.add("success"),c.classList.remove("fa-copy"),c.classList.remove("fa-circle-exclamation"),c.classList.add("fa-circle-check"),setTimeout(()=>{a.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("success"),c.classList.remove("fa-check"),c.classList.add("fa-copy")},3e3)}).catch(e=>{a.innerText=e,s.classList.add("warning"),c.classList.remove("fa-copy"),c.classList.add("fa-circle-exclamation"),hud.message("COPY错误",e,{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{a.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("warning"),c.classList.remove("fa-circle-exclamation"),c.classList.add("fa-copy")},3e3)})}}function copyLineCode(){document.querySelectorAll("button.copy-btn").forEach(t=>{t.onclick=e=>{e.stopPropagation();e=t.previousSibling.value;const s=t.firstChild;util.writeClipText(e).then(()=>{util.messageCopyright(),t.classList.add("success"),s.classList.remove("fa-calendar-lines"),s.classList.remove("fa-calendar-xmark"),s.classList.add("fa-calendar-check"),setTimeout(()=>{t.classList.remove("success"),s.classList.remove("fa-calendar-check"),s.classList.add("fa-calendar-lines")},3e3)}).catch(e=>{t.classList.add("warning"),s.classList.remove("fa-calendar-lines"),s.classList.add("fa-calendar-xmark"),hud.message("COPY错误",e,{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{t.classList.remove("warning"),s.classList.remove("fa-calendar-xmark"),s.classList.add("fa-calendar-lines")},3e3)})}})}init(),copyLineCode();