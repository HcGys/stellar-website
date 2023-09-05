console.log("\n%c Stellar v"+stellar.version+" %c\n"+stellar.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{var s,r,l,a=new Date,e=new Date(e),a=a.getTime()-e.getTime(),e=864e5;let i;return i=t?(t=a/e,r=a/36e5,l=a/6e4,12<(s=a/2592e6)?null:1<=s?parseInt(s)+" "+stellar.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.config.date_suffix.day:1<=r?parseInt(r)+" "+stellar.config.date_suffix.hour:1<=l?parseInt(l)+" "+stellar.config.date_suffix.min:stellar.config.date_suffix.just):parseInt(a/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")},browser:{browserVersion:()=>{var e=null,t=navigator.userAgent;return e=/MSIE (\d+\.\d+);/.test(t)||/Firefox\/([\d.]+)/.test(t)||/Chrome\/([\d.]+)/.test(t)||/Version\/([\d.]+).*Safari/.test(t)||/Opera\/([\d.]+)/.test(t)?parseFloat(RegExp.$1):e},browserEngine:()=>{var e=null,t=navigator.userAgent;return/Trident\/([\d.]+)/.test(t)?e="Trident":/Gecko\/([\d.]+)/.test(t)?e="Gecko":/AppleWebKit\/([\d.]+)/.test(t)?e="Webkit":/Presto\/([\d.]+)/.test(t)&&(e="Presto"),e}},markNodePos:e=>{document.querySelectorAll(".folders").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||(mPos&&(e.classList.contains("intab")?e.classList.remove("intab"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("infolder")||e.classList.add("infolder"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})}),document.querySelectorAll(".folding").forEach(t=>{t.querySelectorAll(e).forEach(e=>{(mPos=e.getAttribute("pos"))&&folders.querySelector("#"+mPos)||(mPos&&(e.classList.contains("intab")?e.classList.remove("intab"):e.classList.contains("infolder")&&e.classList.remove("infolder")),e.classList.contains("infolding")||e.classList.add("infolding"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})})}},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var s=document.createElement("div");s.classList.add("toast"),s.innerHTML=e,document.body.appendChild(s),setTimeout(function(){s.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",s.style.opacity="0",setTimeout(function(){document.body.removeChild(s)},500)},t)}},l_body=document.querySelector(".l_body"),browserEngine=util.browser.browserEngine(),sidebar={toggle:()=>{l_body&&(l_body.classList.add("mobile"),l_body.classList.toggle("sidebar"))}},init={toc:()=>{stellar.jQuery(()=>{var n=[];$("article.md-text :header").each(function(e,t){n.push(t)}),$(document,window).scroll(function(e){var t,s,r,l,a=$(this).scrollTop(),i=null;for(t in n){var o=$(n[t]);o.offset().top>a+32||(!i||o.offset().top>=i.offset().top)&&(i=o)}i&&($("#data-toc a.toc-link").removeClass("active"),"#undefined"!=(l="#"+i.attr("id"))?0<(s=$('#data-toc a.toc-link[href="'+encodeURI(l)+'"]')).length&&(s.addClass("active"),s=document.querySelector(".widgets"),r=(l=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(l)+'"]')).getBoundingClientRect().bottom-s.getBoundingClientRect().bottom+100,(l=l.getBoundingClientRect().top-s.getBoundingClientRect().top-64)<0?s.scrollBy(0,l):0<r&&s.scrollBy(0,r)):$("#data-toc a.toc-link:first").addClass("active"))})})},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},firefoxConfig:()=>{"Gecko"===browserEngine&&(stellar.plugins.mermaid&&window.mermaid&&util.markNodePos(".mermaid"),stellar.plugins.echarts&&window.echarts&&util.markNodePos(".echarts"),document.querySelectorAll(".folder").forEach(r=>{r.addEventListener("toggle",e=>{var t,s;r.open?(stellar.plugins.mermaid&&window.mermaid&&(t=r.querySelector(".mermaid."+r.parentNode.id))&&!t.classList.contains("drew")&&(t=r.querySelectorAll(".mermaid."+r.parentNode.id),mermaid.run({suppressErrors:!0,nodes:t}),t.forEach(e=>{e.classList.add("drew")})),stellar.plugins.echarts&&window.echarts&&(s=r.querySelector(".echarts."+r.parentNode.id))&&!s.classList.contains("drew")&&r.querySelectorAll(".echarts."+r.parentNode.id).forEach(e=>{echarts.getInstanceByDom(e).resize(),e.classList.add("drew"),e.classList.add("active")})):stellar.plugins.echarts&&window.echarts&&(s=r.querySelector(".echarts."+r.parentNode.id))&&r.querySelectorAll(".echarts."+r.parentNode.id).forEach(e=>{e.classList.remove("active")})})}),document.querySelectorAll(".folding").forEach(r=>{r.addEventListener("toggle",e=>{var t,s;r.open?(stellar.plugins.mermaid&&window.mermaid&&(t=r.querySelector(".mermaid."+r.id))&&!t.classList.contains("drew")&&(t=r.querySelectorAll(".mermaid."+r.id),mermaid.run({suppressErrors:!0,nodes:t}),t.forEach(e=>{e.classList.add("drew")})),stellar.plugins.echarts&&window.echarts&&(s=r.querySelector(".echarts."+r.id))&&!s.classList.contains("drew")&&r.querySelectorAll(".echarts."+r.id).forEach(e=>{echarts.getInstanceByDom(e).resize(),e.classList.add("drew"),e.classList.add("active")})):stellar.plugins.echarts&&window.echarts&&(s=r.querySelector(".echarts."+r.id))&&r.querySelectorAll(".echarts."+r.id).forEach(e=>{e.classList.remove("active")})})}))},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(a=>{a.addEventListener("click",e=>{if(e.preventDefault(),!a.classList.contains("active")){[...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)});const r=document.getElementById(a.querySelector("a").getAttribute("href").replace("#","")),l=r.parentNode.parentNode.id;if([...r.parentNode.children].forEach(t=>{t.classList.toggle("active",t===r),stellar.plugins.echarts&&t.querySelectorAll(".echarts."+l).forEach(e=>{e.classList.toggle("active",t===r)})}),stellar.plugins.copycode&&(e=r.querySelector(".copy-btn"))&&!e.classList.contains("drew")&&r.querySelectorAll(".code").forEach(e=>{var t=window.getComputedStyle(e,"::before").width.split("px")[0],s=window.getComputedStyle(e,"::before").padding.split(" ").pop().split("px")[0],e=e.querySelector(".copy-btn");e.style.right=Number(t)+2*Number(s)+"px",e.classList.add("drew")}),stellar.plugins.mermaid&&window.mermaid&&(e=r.querySelector(".mermaid."+l))&&!e.classList.contains("drew")&&(e=r.querySelectorAll(".mermaid."+l),mermaid.run({suppressErrors:!0,nodes:e}),e.forEach(e=>{e.classList.add("drew")})),stellar.plugins.echarts&&window.echarts){e=r.querySelector(".echarts."+l);if(e&&!e.classList.contains("drew")){for(var t=r.querySelectorAll(".echarts."+l),s=0;s<t.length;++s)echarts.getInstanceByDom(t[s]).resize();t.forEach(function(e){e.classList.add("drew")})}}r.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.toc(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.firefoxConfig(),init.registerTabsTag(),stellar.plugins.mermaid&&window.mermaid){for(var tabsNodes=document.querySelectorAll(".tabs").forEach(t=>{t.querySelectorAll(".mermaid").forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||(mPos&&(e.classList.contains("infolder")?e.classList.remove("infolder"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("intab")||e.classList.add("intab"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})}),firstRender=((tabPanes=document.querySelectorAll(".tab-pane")).forEach(e=>{e.classList.contains("active")&&e.querySelectorAll(".mermaid."+e.parentNode.parentNode.id).forEach(e=>{e.classList.add("drew")})}),[]),merNodes=document.querySelectorAll(".mermaid"),i=0;i<merNodes.length;++i){var mCode=merNodes[i].innerHTML;merNodes[i].innerHTML=mCode.split("&#13;").join("\n"),"Gecko"===browserEngine&&(merNodes[i].classList.contains("infolder")||merNodes[i].classList.contains("infolding"))||merNodes[i].classList.contains("intab")&&!merNodes[i].classList.contains("drew")||firstRender.push(merNodes[i])}mermaid.run({suppressErrors:!0,nodes:firstRender})}var tabPanes;if(stellar.plugins.echarts&&window.echarts&&(tabsNodes=document.querySelectorAll(".tabs").forEach(t=>{t.querySelectorAll(".echarts").forEach(e=>{(mPos=e.getAttribute("pos"))&&t.querySelector("#"+mPos)||(mPos&&(e.classList.contains("infolder")?e.classList.remove("infolder"):e.classList.contains("infolding")&&e.classList.remove("infolding")),e.classList.contains("intab")||e.classList.add("intab"),mPos&&e.classList.remove(mPos),e.classList.add(t.id),e.setAttribute("pos",t.id))})}),(tabPanes=document.querySelectorAll(".tab-pane")).forEach(e=>{e.classList.contains("active")&&e.querySelectorAll(".echarts."+e.parentNode.parentNode.id).forEach(e=>{e.classList.add("active"),e.classList.add("drew")})}),window.addEventListener("resize",function(){for(var e=document.querySelectorAll(".echarts"),t=0;t<e.length;++t)"Gecko"===browserEngine&&(e[t].classList.contains("infolder")||e[t].classList.contains("infolding"))&&(e[t].classList.contains("active")?echarts.getInstanceByDom(e[t]).resize():e[t].classList.remove("drew")),!e[t].classList.contains("intab")||e[t].classList.contains("active")?echarts.getInstanceByDom(e[t]).resize():e[t].classList.contains("intab")&&!e[t].classList.contains("active")&&e[t].classList.remove("drew")})),stellar.plugins.scrollreveal&&stellar.loadScript(stellar.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.plugins.scrollreveal.distance,duration:stellar.plugins.scrollreveal.duration,interval:stellar.plugins.scrollreveal.interval,scale:stellar.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.plugins.lazyload&&(stellar.loadScript(stellar.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.plugins.stellar)for(let t of Object.keys(stellar.plugins.stellar)){let e=stellar.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const _a=document.getElementsByClassName("stellar-"+t+"-api");null!=_a&&0<_a.length&&stellar.jQuery(()=>{stellar.loadScript(e,{defer:!0}),"timeline"==t&&stellar.loadScript(stellar.plugins.marked)})}}if(stellar.plugins.swiper){const a0=document.getElementById("swiper-api");null!=a0&&(stellar.loadCSS(stellar.plugins.swiper.css),stellar.loadScript(stellar.plugins.swiper.js,{defer:!0}).then(function(){var e=a0.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}if(stellar.plugins.preload&&("instant_page"==stellar.plugins.preload.service?stellar.loadScript(stellar.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.plugins.preload.flying_pages,{defer:!0}))),stellar.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.plugins.fancybox.selector&&(e+=", "+stellar.plugins.fancybox.selector),0!==document.querySelectorAll(e).length&&(stellar.loadCSS(stellar.plugins.fancybox.css),stellar.loadScript(stellar.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,s){return s.$trigger.alt||null}})}))}stellar.search.service&&"local_search"==stellar.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,s=$("input#search-input");0!=s.length&&(e=document.querySelector("div#search-result"),s.focus(function(){var e=stellar.search[stellar.search.service]?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.config.root+e,s.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),s.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.plugins.heti&&(stellar.loadCSS(stellar.plugins.heti.css),stellar.loadScript(stellar.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.plugins.heti.enable=!1})),stellar.plugins.copycode&&stellar.loadScript(stellar.plugins.copycode.js,{defer:!0});