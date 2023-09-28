console.log("\n%c Stellar v"+stellar.GLOBAL_CONFIG.version+" %c\n"+stellar.GLOBAL_CONFIG.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{var s,l,r,a=new Date,e=new Date(e),a=a.getTime()-e.getTime(),e=864e5;let i;return i=t?(t=a/e,l=a/36e5,r=a/6e4,12<(s=a/2592e6)?null:1<=s?parseInt(s)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.day:1<=l?parseInt(l)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.hour:1<=r?parseInt(r)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.min:stellar.GLOBAL_CONFIG.config.date_suffix.just):parseInt(a/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")},resetAnchor:(e,t,s=!1)=>{const l=document.getElementById(e.getAttribute("href")?decodeURI(e.getAttribute("href")).replace("#",""):e.getAttribute("toc-action").split("toc-")[1]);e.getAttribute("href")&&(e.setAttribute(t+"-action",t+"-"+decodeURI(e.getAttribute("href")).replace("#","")),e.removeAttribute("href")),l&&l.id&&e.addEventListener("click",e=>{e.preventDefault(),stellar.scroll.to(l,{addTop:5,observer:s}),history.pushState(null,document.title,"#"+l.id)})},browser:{browserVersion:()=>{var e=null,t=navigator.userAgent;return e=/MSIE (\d+\.\d+);/.test(t)||/Firefox\/([\d.]+)/.test(t)||/Chrome\/([\d.]+)/.test(t)||/Version\/([\d.]+).*Safari/.test(t)||/Opera\/([\d.]+)/.test(t)?parseFloat(RegExp.$1):e},browserEngine:()=>{var e=null,t=navigator.userAgent;return/Trident\/([\d.]+)/.test(t)?e="Trident":/Gecko\/([\d.]+)/.test(t)?e="Gecko":/AppleWebKit\/([\d.]+)/.test(t)?e="Webkit":/Presto\/([\d.]+)/.test(t)&&(e="Presto"),e}},messageCopyright:()=>{stellar.GLOBAL_CONFIG.plugins.message.enable&&stellar.GLOBAL_CONFIG.plugins.message.copyright.enable&&hud.message(stellar.GLOBAL_CONFIG.plugins.message.copyright.title,stellar.GLOBAL_CONFIG.plugins.message.copyright.message,{icon:stellar.GLOBAL_CONFIG.plugins.message.copyright.icon,transitionIn:"flipInX",transitionOut:"flipOutX",displayMode:1})},utilWriteClipText:l=>navigator.clipboard.writeText(l).then(()=>Promise.resolve()).catch(e=>{var t=document.createElement("textarea");t.setAttribute("readonly","readonly"),document.body.appendChild(t),t.innerHTML=l,t.select();try{var s=document.execCommand("copy");return document.body.removeChild(t),s&&"unsuccessful"!==s?Promise.resolve():Promise.reject("复制文本失败!")}catch(e){return document.body.removeChild(t),Promise.reject("当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作!")}})},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var s=document.createElement("div");s.classList.add("toast"),s.innerHTML=e,document.body.appendChild(s),setTimeout(function(){s.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",s.style.opacity="0",setTimeout(function(){document.body.removeChild(s)},500)},t)},message:(e,t,s={},l=null)=>{function r(e,t,s,l){var{icon:s,time:r,position:a,transitionIn:i,transitionOut:o,messageColor:n,titleColor:c,backgroundColor:d,zindex:u,displayMode:g}=s;iziToast.show({layout:"2",icon:"Fontawesome",closeOnEscape:"true",displayMode:g||"replace",transitionIn:i||stellar.GLOBAL_CONFIG.plugins.message.transitionIn,transitionOut:o||stellar.GLOBAL_CONFIG.plugins.message.transitionOut,messageColor:n||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:c||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:d||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:u||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:s||stellar.GLOBAL_CONFIG.plugins.message.icon.default,timeout:r||stellar.GLOBAL_CONFIG.plugins.message.time.default,position:a||stellar.GLOBAL_CONFIG.plugins.message.position,title:e,message:t,onClosed:()=>{l&&l()}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{r(e,t,s,l)})):r(e,t,s,l)},question:(e,t,s={},l=null,r=null,a=null)=>{function i(e,t,s,l,r,a){const{icon:i,time:o,transitionOut:n,messageColor:c,titleColor:d,backgroundColor:u,zindex:g}=s;iziToast.question({id:"question",icon:"Fontawesome",close:!1,overlay:!0,displayMode:"once",position:"center",messageColor:c||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:d||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:u||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:g||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:i||stellar.GLOBAL_CONFIG.plugins.message.icon.quection,timeout:o||stellar.GLOBAL_CONFIG.plugins.message.time.quection,title:e,message:t,buttons:[["<button><b>是</b></button>",(e,t)=>{e.hide({transitionOut:n||"fadeOut"},t,"button"),l&&l(e,t)}],["<button><b>否</b></button>",(e,t)=>{e.hide({transitionOut:n||"fadeOut"},t,"button"),r&&r(e,t)}]],onClosed:(e,t,s)=>{a&&a(e,t,s)}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{i(e,t,s,l,r,a)})):i(e,t,s,l,r,a)},hideMessage:(e=null)=>{const t=document.querySelector(".iziToast");function s(e){iziToast.hide({},t),e&&e()}t?"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{s(e)})):s(e):e&&e()}},browserEngine=util.browser.browserEngine(),pageLayout=stellar.dom.l_left.getAttribute("layout"),sidebar={toggle:()=>{stellar.dom.l_body&&(stellar.dom.l_body.classList.add("mobile"),stellar.dom.l_body.classList.toggle("sidebar"),stellar.dom.mask.style.display="none"===stellar.dom.mask.style.display?"flex":"none",stellar.dom.mask.classList.toggle("active"))}};function markNodePos(e){document.querySelectorAll(".folders").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||(mPos&&(e.classList.contains("intab")?e.classList.remove("intab"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("infolder")||e.classList.add("infolder"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})}),document.querySelectorAll(".folding").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&folders.querySelector("#"+mPos)||(mPos&&(e.classList.contains("intab")?e.classList.remove("intab"):e.classList.contains("infolder")&&e.classList.remove("infolder")),e.classList.contains("infolding")||e.classList.add("infolding"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})}),document.querySelectorAll(".tabs").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||(mPos&&(e.classList.contains("infolder")?e.classList.remove("infolder"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("intab")||e.classList.add("intab"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})})}function diagramRenderMark(t,s){s.querySelectorAll(".tab-pane").forEach(e=>{e.classList.contains("active")?e.querySelectorAll(t+"."+e.parentNode.parentNode.id).forEach(e=>{".echarts"===t&&e.classList.add("active"),".echarts"===t&&s===document||e.classList.add("wait-drew")}):e.querySelectorAll(t+".wait-drew").forEach(e=>{".echarts"===t&&e.classList.remove("active"),".echarts"===t&&s===document||e.classList.remove("wait-drew")})}),s.querySelectorAll(".folders").forEach(e=>{e.querySelectorAll(t+".wait-drew").forEach(e=>{".echarts"===t&&e.classList.remove("active"),".echarts"===t&&s===document||e.classList.remove("wait-drew")})}),s.querySelectorAll(".folding").forEach(e=>{e.open?e.querySelectorAll(t+"."+e.id).forEach(e=>{".echarts"===t&&e.classList.add("active"),".echarts"===t&&s===document||e.classList.add("wait-drew")}):e.querySelectorAll(t+".wait-drew").forEach(e=>{".echarts"===t&&e.classList.remove("active"),".echarts"===t&&s===document||e.classList.remove("wait-drew")})})}const init={toc:()=>{stellar.jQuery(()=>{var n=[];$("article.md-text :header").each(function(e,t){n.push(t)}),$(document,window).scroll(function(e){var t,s,l,r,a=$(this).scrollTop(),i=null;for(t in n){var o=$(n[t]);o.offset().top>a+32||(!i||o.offset().top>=i.offset().top)&&(i=o)}i&&($("#data-toc a.toc-link").removeClass("active"),"#undefined"!=(r="#"+i.attr("id"))?0<(s=$('#data-toc a.toc-link[href="'+encodeURI(r)+'"]')).length&&(s.addClass("active"),s=document.querySelector(".widgets"),l=(r=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(r)+'"]')).getBoundingClientRect().bottom-s.getBoundingClientRect().bottom+100,(r=r.getBoundingClientRect().top-s.getBoundingClientRect().top-64)<0?s.scrollBy(0,r):0<l&&s.scrollBy(0,l)):$("#data-toc a.toc-link:first").addClass("active"))})})},anchor:()=>{"wiki"==pageLayout&&document.querySelector(".l_cover")&&util.resetAnchor(document.querySelector("a.start"),"wiki",!0)},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){stellar.dom.l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},firefoxConfig:()=>{document.querySelectorAll(".folder details").forEach(r=>{r.addEventListener("toggle",e=>{if(r.open){if(stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((t=r.nextSibling.querySelector(".mermaid."+r.parentNode.id))&&!t.classList.contains("drew")&&r.nextSibling.querySelectorAll(".mermaid."+r.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",r.nextSibling),s=r.nextSibling.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:s}),s.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var t=r.nextSibling.querySelector(".echarts."+r.parentNode.id),s=(t&&!t.classList.contains("drew")&&r.nextSibling.querySelectorAll(".echarts."+r.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),t&&r.nextSibling.querySelectorAll(".echarts."+r.parentNode.id).forEach(e=>{e.classList.add("active")}),diagramRenderMark(".echarts",r.nextSibling),r.nextSibling.querySelectorAll(".echarts.wait-drew")),l=0;l<s.length;++l)echarts.getInstanceByDom(s[l]).resize(),s[l].classList.add("drew"),s[l].classList.remove("wait-drew")}else stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&r.nextSibling.querySelectorAll(".echarts.active").forEach(e=>{e.classList.remove("active")})})}),document.querySelectorAll(".folding details").forEach(r=>{r.addEventListener("toggle",e=>{if(r.open){if(stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((t=r.nextSibling.querySelector(".mermaid."+r.id))&&!t.classList.contains("drew")&&r.nextSibling.querySelectorAll(".mermaid."+r.id).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",r.nextSibling),s=r.nextSibling.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:s}),s.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var t=r.nextSibling.querySelector(".echarts."+r.id),s=(t&&!t.classList.contains("drew")&&r.nextSibling.querySelectorAll(".echarts."+r.id).forEach(e=>{e.classList.add("wait-drew")}),t&&r.nextSibling.querySelectorAll(".echarts."+r.id).forEach(e=>{e.classList.add("active")}),diagramRenderMark(".echarts",r.nextSibling),r.nextSibling.querySelectorAll(".echarts.wait-drew")),l=0;l<s.length;++l)echarts.getInstanceByDom(s[l]).resize(),s[l].classList.add("drew"),s[l].classList.remove("wait-drew")}else stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&r.nextSibling.querySelectorAll(".echarts.active").forEach(e=>{e.classList.remove("active")})})})},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(a=>{a.addEventListener("click",e=>{if(e.preventDefault(),!a.classList.contains("active")){[...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)});const l=document.getElementById(a.querySelector("a").getAttribute("href").replace("#","")),r=l.parentNode.parentNode.id;if([...l.parentNode.children].forEach(t=>{t.classList.toggle("active",t===l),stellar.GLOBAL_CONFIG.plugins.echarts&&t.querySelectorAll(".echarts."+r).forEach(e=>{e.classList.toggle("active",t===l)})}),stellar.GLOBAL_CONFIG.plugins.copycode&&(e=l.querySelector(".copy-btn"))&&!e.classList.contains("drew")&&l.querySelectorAll(".code").forEach(e=>{var t=window.getComputedStyle(e,"::before").width.split("px")[0],s=window.getComputedStyle(e,"::before").padding.split(" ").pop().split("px")[0],e=e.querySelector(".copy-btn");e.style.right=Number(t)+2*Number(s)+"px",e.classList.add("drew")}),stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((e=l.querySelector(".mermaid."+r))&&!e.classList.contains("drew")&&l.querySelectorAll(".mermaid."+r).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",l),e=l.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:e}),e.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var e=l.querySelector(".echarts."+r),t=(e&&!e.classList.contains("drew")&&l.querySelectorAll(".echarts."+r).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".echarts",l),l.querySelectorAll(".echarts.wait-drew")),s=0;s<t.length;++s)echarts.getInstanceByDom(t[s]).resize(),t[s].classList.add("drew"),t[s].classList.remove("wait-drew");l.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.anchor(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.firefoxConfig(),init.registerTabsTag(),document.body.oncopy=function(){util.messageCopyright()},stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid){markNodePos(".mermaid"),diagramRenderMark(".mermaid",document);for(var firstRender=[],merNodes=document.querySelectorAll(".mermaid"),i=0;i<merNodes.length;++i){var mCode=merNodes[i].innerHTML;merNodes[i].innerHTML=mCode.split("&#13;").join("\n"),merNodes[i].classList.contains("infolder")||merNodes[i].classList.contains("infolding")||merNodes[i].classList.contains("intab")&&!merNodes[i].classList.contains("wait-drew")||(firstRender.push(merNodes[i]),merNodes[i].classList.contains("wait-drew")&&(merNodes[i].classList.remove("wait-drew"),merNodes[i].classList.add("drew")))}mermaid.run({suppressErrors:!0,nodes:firstRender})}if(stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&(markNodePos(".echarts"),diagramRenderMark(".echarts",document),window.addEventListener("resize",function(){for(var e=document.querySelectorAll(".echarts"),t=0;t<e.length;++t)(e[t].classList.contains("infolder")||e[t].classList.contains("infolding"))&&(e[t].classList.contains("active")?echarts.getInstanceByDom(e[t]).resize():e[t].classList.remove("drew")),!e[t].classList.contains("intab")||e[t].classList.contains("active")?echarts.getInstanceByDom(e[t]).resize():e[t].classList.contains("intab")&&!e[t].classList.contains("active")&&e[t].classList.remove("drew")})),stellar.GLOBAL_CONFIG.plugins.scrollreveal&&stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.GLOBAL_CONFIG.plugins.scrollreveal.distance,duration:stellar.GLOBAL_CONFIG.plugins.scrollreveal.duration,interval:stellar.GLOBAL_CONFIG.plugins.scrollreveal.interval,scale:stellar.GLOBAL_CONFIG.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.GLOBAL_CONFIG.plugins.lazyload&&(stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.GLOBAL_CONFIG.plugins.stellar)for(let t of Object.keys(stellar.GLOBAL_CONFIG.plugins.stellar)){let e=stellar.GLOBAL_CONFIG.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const pb=document.getElementsByClassName("stellar-"+t+"-api");null!=pb&&0<pb.length&&stellar.jQuery(()=>{stellar.loadScript(e,{defer:!0}),"timeline"==t&&stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.marked)})}}if(stellar.GLOBAL_CONFIG.plugins.swiper){const qb=document.getElementById("swiper-api");null!=qb&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.plugins.swiper.css),stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.swiper.js,{defer:!0}).then(function(){var e=qb.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}if(stellar.GLOBAL_CONFIG.plugins.preload&&("instant_page"==stellar.GLOBAL_CONFIG.plugins.preload.service?stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.GLOBAL_CONFIG.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.preload.flying_pages,{defer:!0}))),stellar.GLOBAL_CONFIG.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.GLOBAL_CONFIG.plugins.fancybox.selector&&(e+=", "+stellar.GLOBAL_CONFIG.plugins.fancybox.selector),0!==document.querySelectorAll(e).length&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.plugins.fancybox.css),stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,s){return s.$trigger.alt||null}})}))}stellar.GLOBAL_CONFIG.search.service&&"local_search"==stellar.GLOBAL_CONFIG.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,s=$("input#search-input");0!=s.length&&(e=document.querySelector("div#search-result"),s.focus(function(){var e=stellar.GLOBAL_CONFIG.search.config?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.GLOBAL_CONFIG.config.root+e,s.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),s.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.GLOBAL_CONFIG.plugins.heti&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.plugins.heti.css),stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.GLOBAL_CONFIG.plugins.heti.enable=!1})),stellar.GLOBAL_CONFIG.plugins.copycode&&stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.copycode.js,{defer:!0});const DOMController={visible:(e,t=!0)=>{e&&(e.style.display=!0===t?"block":"none")},remove:e=>{document.querySelectorAll(e).forEach(e=>{e.remove()})},removeList:e=>{e.forEach(e=>{DOMController.remove(e)})},setAttribute:(e,t,s)=>{document.querySelectorAll(e).forEach(e=>{e.setAttribute(t,s)})},setAttributeList:e=>{e.forEach(e=>{DOMController.setAttribute(e[0],e[1],e[2])})},setStyle:(e,t,s)=>{document.querySelectorAll(e).forEach(e=>{e.style[t]=s})},setStyleList:e=>{e.forEach(e=>{DOMController.setStyle(e[0],e[1],e[2])})},fadeIn:e=>{if(e)return e.style.visibility="visible",e.style.opacity=1,e.style.display="block",e.style.transition="all 0.5s linear",e},fadeOut:e=>{if(e)return e.style.visibility="hidden",e.style.opacity=0,e.style.display="none",e.style.transition="all 0.5s linear",e},fadeToggle:e=>{if(e)return e="hidden"==e.style.visibility?DOMController.fadeIn(e):DOMController.fadeOut(e)},fadeToggleList:e=>{e.forEach(e=>{DOMController.fadeToggle(e)})},hasClass:(e,t)=>{if(e)return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},addClass:(e,t)=>{if(e)return e.classList.add(t),e},removeClass:(e,t)=>{if(e)return e.classList.remove(t),e},toggleClass:(e,t)=>{if(e)return DOMController.hasClass(e,t)?DOMController.removeClass(e,t):DOMController.addClass(e,t),e},toggleClassList:e=>{e.forEach(e=>{DOMController.toggleClass(e[0],e[1])})}};Object.freeze(DOMController);