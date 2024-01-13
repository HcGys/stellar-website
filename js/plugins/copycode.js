function init(){var e=document.querySelector(".l_main article.md-text");const o=e&&(e.classList.contains("sa-load-hidden")||e.classList.contains("blur")),d=document.querySelector("body");document.querySelectorAll("figure.highlight").forEach(i=>{var e=i.querySelector(".code"),s=document.createElement("div"),t=(s.classList.add("code-btns"),document.createElement("div"));if(t.classList.add("btn"),t.classList.add("fullscreen-btn"),t.innerHTML=`<i class='fa-duotone fa-expand fa-fw'></i><span class="desc">放大</span>`,!o){const codeFullscreenBtnDesc=t.querySelector("span"),codeFullscreenBtnIcon=t.querySelector("i")}t.addEventListener("click",()=>{if(o){document.querySelector(".fullscreen")?.remove();let e=i.cloneNode(!0),s=(e.classList.add("fullscreen"),e.querySelector(".copy-btn")),t=s.querySelector("i"),a=s.querySelector("span");s.addEventListener("click",async()=>{await copyCode(e.querySelector(".code").children[0]?.innerText),a.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,s.classList.add("success"),t.classList.remove("fa-copy"),t.classList.remove("fa-circle-exclamation"),t.classList.add("fa-circle-check"),util.messageCopyright(),setTimeout(()=>{a.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("success"),t.classList.remove("fa-check"),t.classList.add("fa-copy")},2e3)});var c=e.querySelector(".fullscreen-btn"),l=c.querySelector("i"),n=c.querySelector("span");c.addEventListener("click",()=>{d.removeAttribute("style"),util.animateOut(e,"slide-out .5s")}),l.classList.remove("fa-expand"),l.classList.add("fa-compress"),n.innerText="缩小",d.appendChild(e),d.setAttribute("style","overflow:hidden;"),util.animateIn(e,"slide-in .5s")}else stellar.requestAnimationFrame(()=>{i.classList.toggle("fullscreen"),i.classList.contains("fullscreen")?(codeFullscreenBtnIcon.classList.remove("fa-expand"),codeFullscreenBtnIcon.classList.add("fa-compress"),codeFullscreenBtnDesc.innerText="缩小",d.setAttribute("style","overflow:hidden;")):(codeFullscreenBtnIcon.classList.remove("fa-compress"),codeFullscreenBtnIcon.classList.add("fa-expand"),codeFullscreenBtnDesc.innerText="放大",d.removeAttribute("style"),util.animateOut(i,"slide-out .5s"))})}),s.appendChild(t);var t=document.createElement("div"),a=(t.classList.add("btn"),t.classList.add("copy-btn"),t.innerHTML=`<i class='fa-duotone fa-copy fa-fw'></i><span class="desc">${stellar.GLOBAL_CONFIG.plugins.copycode.default_text}</span>`,t.querySelector("i")),c=t.querySelector("span"),t=(s.appendChild(t),copyCode(t,e,a,c),i.querySelector(".highlight figcaption")),a=(t&&(e=t.querySelector("a"))&&(e.classList.add("btn"),e.classList.add("code-link-btn"),e.innerHTML=`<i class='fa-duotone fa-code-branch fa-fw'></i><span class="desc">${e.innerText}</span>`,s.appendChild(e)),i.getAttribute("class").split(" ")[1]),c=document.createElement("div"),e=(c.classList.add("code-lang"),c.innerHTML=`<span>${a}</span>`,document.createElement("div")),a=(e.classList.add("code-btns-and-lang"),e.appendChild(s),e.appendChild(c),document.createElement("div"));a.classList.add("code-tools"),t?a.appendChild(t):((s=document.createElement("figcaption")).innerHTML=`<span>${stellar.GLOBAL_CONFIG.config.default.codeblock_figtext}</span>`,a.appendChild(s)),a.appendChild(e),i.insertBefore(a,i.children[0])})}function copyCode(s,t,a,c){s.onclick=e=>{e.stopPropagation(),t.focus();e=new Range,e.selectNodeContents(t),document.getSelection().removeAllRanges(),document.getSelection().addRange(e),e=document.getSelection().toString();util.writeClipText(e).then(()=>{util.messageCopyright(),c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.success_text,s.classList.add("success"),a.classList.remove("fa-copy"),a.classList.remove("fa-circle-exclamation"),a.classList.add("fa-circle-check"),setTimeout(()=>{c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("success"),a.classList.remove("fa-check"),a.classList.add("fa-copy")},2e3)}).catch(e=>{c.innerText=e,s.classList.add("warning"),a.classList.remove("fa-copy"),a.classList.add("fa-circle-exclamation"),hud.message("COPY错误",e,{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{c.innerText=stellar.GLOBAL_CONFIG.plugins.copycode.default_text,s.classList.remove("warning"),a.classList.remove("fa-circle-exclamation"),a.classList.add("fa-copy")},2e3)})}}function copyLineCode(){document.querySelectorAll("button.copy-btn").forEach(a=>{a.onclick=e=>{e.stopPropagation();const s=a.firstChild;var e=a.previousSibling,t=e.value;e.focus(),e.select(),util.writeClipText(t).then(()=>{util.messageCopyright(),a.classList.add("success"),s.classList.remove("fa-calendar-lines"),s.classList.remove("fa-calendar-xmark"),s.classList.add("fa-calendar-check"),setTimeout(()=>{a.classList.remove("success"),s.classList.remove("fa-calendar-check"),s.classList.add("fa-calendar-lines")},2e3)}).catch(e=>{a.classList.add("warning"),s.classList.remove("fa-calendar-lines"),s.classList.add("fa-calendar-xmark"),hud.message("COPY错误",e,{icon:"fa-duotone fa-exclamation-square red",displayMode:1,time:9e3}),setTimeout(()=>{a.classList.remove("warning"),s.classList.remove("fa-calendar-xmark"),s.classList.add("fa-calendar-lines")},2e3)})}})}init(),copyLineCode();