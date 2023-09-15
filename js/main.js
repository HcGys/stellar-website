console.log("\n%c Stellar v"+stellar.GLOBAL_CONFIG.version+" %c\n"+stellar.GLOBAL_CONFIG.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{var s,r,a,l=new Date,e=new Date(e),l=l.getTime()-e.getTime(),e=864e5;let i;return i=t?(t=l/e,r=l/36e5,a=l/6e4,12<(s=l/2592e6)?null:1<=s?parseInt(s)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.day:1<=r?parseInt(r)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.hour:1<=a?parseInt(a)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.min:stellar.GLOBAL_CONFIG.config.date_suffix.just):parseInt(l/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")},resetAnchor:(e,t,s=!1)=>{const r=document.getElementById(e.getAttribute("href")?decodeURI(e.getAttribute("href")).replace("#",""):e.getAttribute("toc-action").split("toc-")[1]);e.getAttribute("href")&&(e.setAttribute(t+"-action",t+"-"+decodeURI(e.getAttribute("href")).replace("#","")),e.removeAttribute("href")),r&&r.id&&e.addEventListener("click",e=>{e.preventDefault(),stellar.scroll.to(r,{addTop:5,observer:s}),history.pushState(null,document.title,"#"+r.id)})},browser:{browserVersion:()=>{var e=null,t=navigator.userAgent;return e=/MSIE (\d+\.\d+);/.test(t)||/Firefox\/([\d.]+)/.test(t)||/Chrome\/([\d.]+)/.test(t)||/Version\/([\d.]+).*Safari/.test(t)||/Opera\/([\d.]+)/.test(t)?parseFloat(RegExp.$1):e},browserEngine:()=>{var e=null,t=navigator.userAgent;return/Trident\/([\d.]+)/.test(t)?e="Trident":/Gecko\/([\d.]+)/.test(t)?e="Gecko":/AppleWebKit\/([\d.]+)/.test(t)?e="Webkit":/Presto\/([\d.]+)/.test(t)&&(e="Presto"),e}},messageCopyright:()=>{stellar.GLOBAL_CONFIG.plugins.message.enable&&stellar.GLOBAL_CONFIG.plugins.message.copyright.enable&&hud.message(stellar.GLOBAL_CONFIG.plugins.message.copyright.title,stellar.GLOBAL_CONFIG.plugins.message.copyright.message,{icon:stellar.GLOBAL_CONFIG.plugins.message.copyright.icon,transitionIn:"flipInX",transitionOut:"flipOutX",displayMode:1})}},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var s=document.createElement("div");s.classList.add("toast"),s.innerHTML=e,document.body.appendChild(s),setTimeout(function(){s.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",s.style.opacity="0",setTimeout(function(){document.body.removeChild(s)},500)},t)},message:(e,t,s={},r=null)=>{function a(e,t,s,r){var{icon:s,time:a,position:l,transitionIn:i,transitionOut:o,messageColor:n,titleColor:c,backgroundColor:d,zindex:u,displayMode:L}=s;iziToast.show({layout:"2",icon:"Fontawesome",closeOnEscape:"true",displayMode:L||"replace",transitionIn:i||stellar.GLOBAL_CONFIG.plugins.message.transitionIn,transitionOut:o||stellar.GLOBAL_CONFIG.plugins.message.transitionOut,messageColor:n||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:c||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:d||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:u||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:s||stellar.GLOBAL_CONFIG.plugins.message.icon.default,timeout:a||stellar.GLOBAL_CONFIG.plugins.message.time.default,position:l||stellar.GLOBAL_CONFIG.plugins.message.position,title:e,message:t,onClosed:()=>{r&&r()}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js).then(a(e,t,s,r))):a(e,t,s,r)},question:(e,t,s={},r=null,a=null,l=null)=>{"undefined"==typeof iziToast&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,{defer:!0}));{var i=r,o=a,n=l;const{icon:c,time:d,transitionOut:u,messageColor:L,titleColor:g,backgroundColor:m,zindex:p}=s;iziToast.question({id:"question",icon:"Fontawesome",close:!1,overlay:!0,displayMode:"once",position:"center",messageColor:L||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:g||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:m||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:p||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:c||stellar.GLOBAL_CONFIG.plugins.message.icon.quection,timeout:d||stellar.GLOBAL_CONFIG.plugins.message.time.quection,title:e,message:t,buttons:[["<button><b>是</b></button>",(e,t)=>{e.hide({transitionOut:u||"fadeOut"},t,"button"),i&&i(e,t)}],["<button><b>否</b></button>",(e,t)=>{e.hide({transitionOut:u||"fadeOut"},t,"button"),o&&o(e,t)}]],onClosed:(e,t,s)=>{n&&n(e,t,s)}})}},hideMessage:(e=null)=>{const t=document.querySelector(".iziToast");var s;t?("undefined"==typeof iziToast&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,{defer:!0})),s=e,iziToast.hide({},t),s&&s()):e&&e()}},browserEngine=util.browser.browserEngine(),pageLayout=stellar.dom.l_left.getAttribute("layout"),sidebar={toggle:()=>{stellar.dom.l_body&&(stellar.dom.l_body.classList.add("mobile"),stellar.dom.l_body.classList.toggle("sidebar"))}};function markNodePos(e){"Gecko"===browserEngine&&(document.querySelectorAll(".folders").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||(mPos&&(e.classList.contains("intab")?e.classList.remove("intab"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("infolder")||e.classList.add("infolder"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})}),document.querySelectorAll(".folding").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&folders.querySelector("#"+mPos)||(mPos&&(e.classList.contains("intab")?e.classList.remove("intab"):e.classList.contains("infolder")&&e.classList.remove("infolder")),e.classList.contains("infolding")||e.classList.add("infolding"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})})),document.querySelectorAll(".tabs").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||("Gecko"===browserEngine&&mPos&&(e.classList.contains("infolder")?e.classList.remove("infolder"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("intab")||e.classList.add("intab"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})})}function diagramRenderMark(t,s){s.querySelectorAll(".tab-pane").forEach(e=>{e.classList.contains("active")?e.querySelectorAll(t+"."+e.parentNode.parentNode.id).forEach(e=>{".echarts"===t&&e.classList.add("active"),".echarts"===t&&s===document||e.classList.add("wait-drew")}):e.querySelectorAll(t+".wait-drew").forEach(e=>{".echarts"===t&&e.classList.remove("active"),".echarts"===t&&s===document||e.classList.remove("wait-drew")})}),"Gecko"===browserEngine&&(s.querySelectorAll(".folders").forEach(e=>{e.querySelectorAll(t+".wait-drew").forEach(e=>{".echarts"===t&&e.classList.remove("active"),".echarts"===t&&s===document||e.classList.remove("wait-drew")})}),s.querySelectorAll(".folding").forEach(e=>{e.open?e.querySelectorAll(t+"."+e.id).forEach(e=>{".echarts"===t&&e.classList.add("active"),".echarts"===t&&s===document||e.classList.add("wait-drew")}):e.querySelectorAll(t+".wait-drew").forEach(e=>{".echarts"===t&&e.classList.remove("active"),".echarts"===t&&s===document||e.classList.remove("wait-drew")})}))}const init={toc:()=>{stellar.jQuery(()=>{var n=[];$("article.md-text :header").each(function(e,t){n.push(t)}),$(document,window).scroll(function(e){var t,s,r,a,l=$(this).scrollTop(),i=null;for(t in n){var o=$(n[t]);o.offset().top>l+32||(!i||o.offset().top>=i.offset().top)&&(i=o)}i&&($("#data-toc a.toc-link").removeClass("active"),"#undefined"!=(a="#"+i.attr("id"))?0<(s=$('#data-toc a.toc-link[href="'+encodeURI(a)+'"]')).length&&(s.addClass("active"),s=document.querySelector(".widgets"),r=(a=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(a)+'"]')).getBoundingClientRect().bottom-s.getBoundingClientRect().bottom+100,(a=a.getBoundingClientRect().top-s.getBoundingClientRect().top-64)<0?s.scrollBy(0,a):0<r&&s.scrollBy(0,r)):$("#data-toc a.toc-link:first").addClass("active"))})})},anchor:()=>{"wiki"==pageLayout&&document.querySelector(".l_cover")&&util.resetAnchor(document.querySelector("a.start"),"wiki",!0)},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){stellar.dom.l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},firefoxConfig:()=>{"Gecko"===browserEngine&&(document.querySelectorAll(".folder").forEach(a=>{a.addEventListener("toggle",e=>{if(a.open){if(stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((t=a.querySelector(".mermaid."+a.parentNode.id))&&!t.classList.contains("drew")&&a.querySelectorAll(".mermaid."+a.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",a),s=a.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:s}),s.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var t=a.querySelector(".echarts."+a.parentNode.id),s=(t&&!t.classList.contains("drew")&&a.querySelectorAll(".echarts."+a.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),t&&a.querySelectorAll(".echarts."+a.parentNode.id).forEach(e=>{e.classList.add("active")}),diagramRenderMark(".echarts",a),a.querySelectorAll(".echarts.wait-drew")),r=0;r<s.length;++r)echarts.getInstanceByDom(s[r]).resize(),s[r].classList.add("drew"),s[r].classList.remove("wait-drew")}else stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&a.querySelectorAll(".echarts.active").forEach(e=>{e.classList.remove("active")})})}),document.querySelectorAll(".folding").forEach(a=>{a.addEventListener("toggle",e=>{if(a.open){if(stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((t=a.querySelector(".mermaid."+a.id))&&!t.classList.contains("drew")&&a.querySelectorAll(".mermaid."+a.id).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",a),s=a.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:s}),s.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var t=a.querySelector(".echarts."+a.id),s=(t&&!t.classList.contains("drew")&&a.querySelectorAll(".echarts."+a.id).forEach(e=>{e.classList.add("wait-drew")}),t&&a.querySelectorAll(".echarts."+a.id).forEach(e=>{e.classList.add("active")}),diagramRenderMark(".echarts",a),a.querySelectorAll(".echarts.wait-drew")),r=0;r<s.length;++r)echarts.getInstanceByDom(s[r]).resize(),s[r].classList.add("drew"),s[r].classList.remove("wait-drew")}else stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&a.querySelectorAll(".echarts.active").forEach(e=>{e.classList.remove("active")})})}))},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(l=>{l.addEventListener("click",e=>{if(e.preventDefault(),!l.classList.contains("active")){[...l.parentNode.children].forEach(e=>{e.classList.toggle("active",e===l)});const r=document.getElementById(l.querySelector("a").getAttribute("href").replace("#","")),a=r.parentNode.parentNode.id;if([...r.parentNode.children].forEach(t=>{t.classList.toggle("active",t===r),stellar.GLOBAL_CONFIG.plugins.echarts&&t.querySelectorAll(".echarts."+a).forEach(e=>{e.classList.toggle("active",t===r)})}),stellar.GLOBAL_CONFIG.plugins.copycode&&(e=r.querySelector(".copy-btn"))&&!e.classList.contains("drew")&&r.querySelectorAll(".code").forEach(e=>{var t=window.getComputedStyle(e,"::before").width.split("px")[0],s=window.getComputedStyle(e,"::before").padding.split(" ").pop().split("px")[0],e=e.querySelector(".copy-btn");e.style.right=Number(t)+2*Number(s)+"px",e.classList.add("drew")}),stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((e=r.querySelector(".mermaid."+a))&&!e.classList.contains("drew")&&r.querySelectorAll(".mermaid."+a).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",r),e=r.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:e}),e.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var e=r.querySelector(".echarts."+a),t=(e&&!e.classList.contains("drew")&&r.querySelectorAll(".echarts."+a).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".echarts",r),r.querySelectorAll(".echarts.wait-drew")),s=0;s<t.length;++s)echarts.getInstanceByDom(t[s]).resize(),t[s].classList.add("drew"),t[s].classList.remove("wait-drew");r.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.anchor(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.firefoxConfig(),init.registerTabsTag(),document.body.oncopy=function(){util.messageCopyright()},stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid){markNodePos(".mermaid"),diagramRenderMark(".mermaid",document);for(var firstRender=[],merNodes=document.querySelectorAll(".mermaid"),i=0;i<merNodes.length;++i){var mCode=merNodes[i].innerHTML;merNodes[i].innerHTML=mCode.split("&#13;").join("\n"),"Gecko"===browserEngine&&(merNodes[i].classList.contains("infolder")||merNodes[i].classList.contains("infolding"))||merNodes[i].classList.contains("intab")&&!merNodes[i].classList.contains("wait-drew")||(firstRender.push(merNodes[i]),merNodes[i].classList.contains("wait-drew")&&(merNodes[i].classList.remove("wait-drew"),merNodes[i].classList.add("drew")))}mermaid.run({suppressErrors:!0,nodes:firstRender})}if(stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&(markNodePos(".echarts"),diagramRenderMark(".echarts",document),window.addEventListener("resize",function(){for(var e=document.querySelectorAll(".echarts"),t=0;t<e.length;++t)"Gecko"===browserEngine&&(e[t].classList.contains("infolder")||e[t].classList.contains("infolding"))&&(e[t].classList.contains("active")?echarts.getInstanceByDom(e[t]).resize():e[t].classList.remove("drew")),!e[t].classList.contains("intab")||e[t].classList.contains("active")?echarts.getInstanceByDom(e[t]).resize():e[t].classList.contains("intab")&&!e[t].classList.contains("active")&&e[t].classList.remove("drew")})),stellar.GLOBAL_CONFIG.plugins.scrollreveal&&stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.GLOBAL_CONFIG.plugins.scrollreveal.distance,duration:stellar.GLOBAL_CONFIG.plugins.scrollreveal.duration,interval:stellar.GLOBAL_CONFIG.plugins.scrollreveal.interval,scale:stellar.GLOBAL_CONFIG.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.GLOBAL_CONFIG.plugins.lazyload&&(stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.GLOBAL_CONFIG.plugins.stellar)for(let t of Object.keys(stellar.GLOBAL_CONFIG.plugins.stellar)){let e=stellar.GLOBAL_CONFIG.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const lb=document.getElementsByClassName("stellar-"+t+"-api");null!=lb&&0<lb.length&&stellar.jQuery(()=>{stellar.loadScript(e,{defer:!0}),"timeline"==t&&stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.marked)})}}if(stellar.GLOBAL_CONFIG.plugins.swiper){const mb=document.getElementById("swiper-api");null!=mb&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.plugins.swiper.css),stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.swiper.js,{defer:!0}).then(function(){var e=mb.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}if(stellar.GLOBAL_CONFIG.plugins.preload&&("instant_page"==stellar.GLOBAL_CONFIG.plugins.preload.service?stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.GLOBAL_CONFIG.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.preload.flying_pages,{defer:!0}))),stellar.GLOBAL_CONFIG.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.GLOBAL_CONFIG.plugins.fancybox.selector&&(e+=", "+stellar.GLOBAL_CONFIG.plugins.fancybox.selector),0!==document.querySelectorAll(e).length&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.plugins.fancybox.css),stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,s){return s.$trigger.alt||null}})}))}stellar.GLOBAL_CONFIG.search.service&&"local_search"==stellar.GLOBAL_CONFIG.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,s=$("input#search-input");0!=s.length&&(e=document.querySelector("div#search-result"),s.focus(function(){var e=stellar.GLOBAL_CONFIG.search.config?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.GLOBAL_CONFIG.config.root+e,s.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),s.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.GLOBAL_CONFIG.plugins.heti&&(stellar.loadCSS(stellar.GLOBAL_CONFIG.plugins.heti.css),stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.GLOBAL_CONFIG.plugins.heti.enable=!1})),stellar.GLOBAL_CONFIG.plugins.copycode&&stellar.loadScript(stellar.GLOBAL_CONFIG.plugins.copycode.js,{defer:!0});