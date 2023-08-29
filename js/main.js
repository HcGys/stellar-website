console.log("\n%c Stellar v"+stellar.version+" %c\n"+stellar.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{var l,s,a,r=new Date,e=new Date(e),r=r.getTime()-e.getTime(),e=864e5;let i;return i=t?(t=r/e,s=r/36e5,a=r/6e4,12<(l=r/2592e6)?null:1<=l?parseInt(l)+" "+stellar.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.config.date_suffix.day:1<=s?parseInt(s)+" "+stellar.config.date_suffix.hour:1<=a?parseInt(a)+" "+stellar.config.date_suffix.min:stellar.config.date_suffix.just):parseInt(r/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")}},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var l=document.createElement("div");l.classList.add("toast"),l.innerHTML=e,document.body.appendChild(l),setTimeout(function(){l.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",l.style.opacity="0",setTimeout(function(){document.body.removeChild(l)},500)},t)}},l_body=document.querySelector(".l_body"),sidebar={toggle:()=>{l_body&&(l_body.classList.add("mobile"),l_body.classList.toggle("sidebar"))}},init={toc:()=>{stellar.jQuery(()=>{var o=[];$("article.md-text :header").each(function(e,t){o.push(t)}),$(document,window).scroll(function(e){var t,l,s,a,r=$(this).scrollTop(),i=null;for(t in o){var n=$(o[t]);n.offset().top>r+32||(!i||n.offset().top>=i.offset().top)&&(i=n)}i&&($("#data-toc a.toc-link").removeClass("active"),"#undefined"!=(a="#"+i.attr("id"))?0<(l=$('#data-toc a.toc-link[href="'+encodeURI(a)+'"]')).length&&(l.addClass("active"),l=document.querySelector(".widgets"),s=(a=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(a)+'"]')).getBoundingClientRect().bottom-l.getBoundingClientRect().bottom+100,(a=a.getBoundingClientRect().top-l.getBoundingClientRect().top-64)<0?l.scrollBy(0,a):0<s&&l.scrollBy(0,s)):$("#data-toc a.toc-link:first").addClass("active"))})})},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(a=>{var l,e;a.addEventListener("click",e=>{if(e.preventDefault(),!a.classList.contains("active")){[...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)});const s=document.getElementById(a.querySelector("a").getAttribute("href").replace("#",""));if([...s.parentNode.children].forEach(t=>{t.classList.toggle("active",t===s),stellar.plugins.echarts&&t.querySelectorAll(".echarts-box").forEach(e=>{e.firstChild.classList.toggle("active",t===s)})}),stellar.plugins.copycode&&(e=s.querySelector(".copy-btn"))&&!e.classList.contains("drew")&&s.querySelectorAll(".code").forEach(e=>{var t=window.getComputedStyle(e,"::before").width.split("px")[0],l=window.getComputedStyle(e,"::before").padding.split(" ").pop().split("px")[0],e=e.querySelector(".copy-btn");e.style.right=Number(t)+2*Number(l)+"px",e.classList.add("drew")}),stellar.plugins.mermaid&&window.mermaid&&(e=s.querySelector(".mermaid"))&&!e.classList.contains("drew")&&(e=s.querySelectorAll(".mermaid"),mermaid.run({suppressErrors:!0,nodes:e}),e.forEach(e=>{e.classList.add("drew")})),stellar.plugins.echarts&&window.echarts){e=s.querySelector(".echarts-box");if(e&&!e.firstChild.classList.contains("drew")){for(var t=s.querySelectorAll(".echarts-box"),l=0;l<t.length;++l)echarts.getInstanceByDom(t[l].firstChild).resize();t.forEach(function(e){e.firstChild.classList.add("drew")})}}s.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}}),stellar.plugins.mermaid&&window.mermaid&&(e=a.parentNode.nextSibling.querySelectorAll(".tab-pane"),l=[],e.forEach(t=>{t.querySelectorAll(".mermaid").forEach(e=>{e.classList.add("intab"),t.classList.contains("active")&&(e.classList.add("drew"),l.push(e))})})),stellar.plugins.echarts&&window.echarts&&(e=a.parentNode.nextSibling.querySelectorAll(".tab-pane")).forEach(t=>{t.querySelectorAll(".echarts-box").forEach(e=>{e.firstChild.classList.add("intab"),t.classList.contains("active")&&(e.firstChild.classList.add("active"),e.firstChild.classList.add("drew"))})})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.toc(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.registerTabsTag(),stellar.plugins.mermaid&&window.mermaid){for(var first_render=[],memad=document.querySelectorAll(".mermaid"),i=0;i<memad.length;++i)memad[i].classList.contains("intab")&&!memad[i].classList.contains("drew")||first_render.push(memad[i]);mermaid.run({suppressErrors:!0,nodes:first_render})}if(stellar.plugins.echarts&&window.echarts&&window.addEventListener("resize",function(){for(var e=document.querySelectorAll(".echarts-box"),t=0;t<e.length;++t)e[t].firstChild.classList.contains("intab")&&!e[t].firstChild.classList.contains("active")||echarts.getInstanceByDom(e[t].firstChild).resize(),e[t].firstChild.classList.contains("intab")&&!e[t].firstChild.classList.contains("active")&&e[t].firstChild.classList.remove("drew")}),stellar.plugins.scrollreveal&&stellar.loadScript(stellar.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.plugins.scrollreveal.distance,duration:stellar.plugins.scrollreveal.duration,interval:stellar.plugins.scrollreveal.interval,scale:stellar.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.plugins.lazyload&&(stellar.loadScript(stellar.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.plugins.stellar)for(let t of Object.keys(stellar.plugins.stellar)){let e=stellar.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const wa=document.getElementsByClassName("stellar-"+t+"-api");null!=wa&&0<wa.length&&stellar.jQuery(()=>{stellar.loadScript(e,{defer:!0}),"timeline"==t&&stellar.loadScript(stellar.plugins.marked)})}}if(stellar.plugins.swiper){const xa=document.getElementById("swiper-api");null!=xa&&(stellar.loadCSS(stellar.plugins.swiper.css),stellar.loadScript(stellar.plugins.swiper.js,{defer:!0}).then(function(){var e=xa.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}if(stellar.plugins.preload&&("instant_page"==stellar.plugins.preload.service?stellar.loadScript(stellar.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.plugins.preload.flying_pages,{defer:!0}))),stellar.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.plugins.fancybox.selector&&(e+=", "+stellar.plugins.fancybox.selector),0!==document.querySelectorAll(e).length&&(stellar.loadCSS(stellar.plugins.fancybox.css),stellar.loadScript(stellar.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,l){return l.$trigger.alt||null}})}))}stellar.search.service&&"local_search"==stellar.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,l=$("input#search-input");0!=l.length&&(e=document.querySelector("div#search-result"),l.focus(function(){var e=stellar.search[stellar.search.service]?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.config.root+e,l.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),l.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.plugins.heti&&(stellar.loadCSS(stellar.plugins.heti.css),stellar.loadScript(stellar.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.plugins.heti.enable=!1})),stellar.plugins.copycode&&stellar.loadScript(stellar.plugins.copycode.js,{defer:!0});