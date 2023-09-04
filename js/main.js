console.log("\n%c Stellar v"+stellar.version+" %c\n"+stellar.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px"),stellar.loadScript("/js/plugins/device.js",{defer:!0});const util={diffDate:(e,t=!1)=>{var s,l,a,r=new Date,e=new Date(e),r=r.getTime()-e.getTime(),e=864e5;let i;return i=t?(t=r/e,l=r/36e5,a=r/6e4,12<(s=r/2592e6)?null:1<=s?parseInt(s)+" "+stellar.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.config.date_suffix.day:1<=l?parseInt(l)+" "+stellar.config.date_suffix.hour:1<=a?parseInt(a)+" "+stellar.config.date_suffix.min:stellar.config.date_suffix.just):parseInt(r/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")}},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var s=document.createElement("div");s.classList.add("toast"),s.innerHTML=e,document.body.appendChild(s),setTimeout(function(){s.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",s.style.opacity="0",setTimeout(function(){document.body.removeChild(s)},500)},t)}},l_body=document.querySelector(".l_body"),sidebar={toggle:()=>{l_body&&(l_body.classList.add("mobile"),l_body.classList.toggle("sidebar"))}},init={toc:()=>{stellar.jQuery(()=>{var o=[];$("article.md-text :header").each(function(e,t){o.push(t)}),$(document,window).scroll(function(e){var t,s,l,a,r=$(this).scrollTop(),i=null;for(t in o){var n=$(o[t]);n.offset().top>r+32||(!i||n.offset().top>=i.offset().top)&&(i=n)}i&&($("#data-toc a.toc-link").removeClass("active"),"#undefined"!=(a="#"+i.attr("id"))?0<(s=$('#data-toc a.toc-link[href="'+encodeURI(a)+'"]')).length&&(s.addClass("active"),s=document.querySelector(".widgets"),l=(a=document.querySelector('#data-toc a.toc-link[href="'+encodeURI(a)+'"]')).getBoundingClientRect().bottom-s.getBoundingClientRect().bottom+100,(a=a.getBoundingClientRect().top-s.getBoundingClientRect().top-64)<0?s.scrollBy(0,a):0<l&&s.scrollBy(0,l)):$("#data-toc a.toc-link:first").addClass("active"))})})},sidebar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){l_body.classList.remove("sidebar")})})},relativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},registerTabsTag:function(){document.querySelectorAll(".tabs .nav-tabs .tab").forEach(a=>{a.addEventListener("click",e=>{if(e.preventDefault(),!a.classList.contains("active")){[...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)});const l=document.getElementById(a.querySelector("a").getAttribute("href").replace("#",""));if([...l.parentNode.children].forEach(t=>{t.classList.toggle("active",t===l),stellar.plugins.echarts&&t.querySelectorAll(".echarts."+l.parentNode.id).forEach(e=>{e.classList.toggle("active",t===l)})}),stellar.plugins.copycode&&(e=l.querySelector(".copy-btn"))&&!e.classList.contains("drew")&&l.querySelectorAll(".code").forEach(e=>{var t=window.getComputedStyle(e,"::before").width.split("px")[0],s=window.getComputedStyle(e,"::before").padding.split(" ").pop().split("px")[0],e=e.querySelector(".copy-btn");e.style.right=Number(t)+2*Number(s)+"px",e.classList.add("drew")}),stellar.plugins.mermaid&&window.mermaid&&(e=l.querySelector(".mermaid."+l.parentNode.id))&&!e.classList.contains("drew")&&(e=l.querySelectorAll(".mermaid."+l.parentNode.id),mermaid.run({suppressErrors:!0,nodes:e}),e.forEach(e=>{e.classList.add("drew")})),stellar.plugins.echarts&&window.echarts){e=l.querySelector(".echarts."+l.parentNode.id);if(e&&!e.classList.contains("drew")){for(var t=l.querySelectorAll(".echarts."+l.parentNode.id),s=0;s<t.length;++s)echarts.getInstanceByDom(t[s]).resize();t.forEach(function(e){e.classList.add("drew")})}}l.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))}};if(init.toc(),init.sidebar(),init.relativeDate(document.querySelectorAll("#post-meta time")),init.registerTabsTag(),stellar.plugins.mermaid&&window.mermaid){for(var tabsNodes=document.querySelectorAll(".tabs").forEach(t=>{t.querySelectorAll(".mermaid").forEach(e=>{e.classList.contains("infolder")?e.classList.remove("infolder"):e.classList.contains("infolding")&&e.classList.remove("infolding"),e.classList.contains("intab")||e.classList.add("intab"),e.pos&&e.classList.remove(e.pos),e.classList.add(t.id),e.setAttribute("pos",t.id)})}),firstRender=((tabPanes=document.querySelectorAll(".tab-pane")).forEach(t=>{t.querySelectorAll(".mermaid."+t.parentNode.id).forEach(e=>{t.classList.contains("active")&&e.classList.add("drew")})}),[]),merNodes=document.querySelectorAll(".mermaid"),i=0;i<merNodes.length;++i){var mCode=merNodes[i].innerHTML;merNodes[i].innerHTML=mCode.split("&#13;").join("\n"),"Gecko"===browserEngine&&(merNodes[i].classList.contains("infolder")||merNodes[i].classList.contains("infolding"))||merNodes[i].classList.contains("intab")&&!merNodes[i].classList.contains("drew")||firstRender.push(merNodes[i])}mermaid.run({suppressErrors:!0,nodes:firstRender})}var tabPanes;if(stellar.plugins.echarts&&window.echarts&&(tabsNodes=document.querySelectorAll(".tabs").forEach(t=>{t.querySelectorAll(".echarts").forEach(e=>{e.classList.contains("infolder")?e.classList.remove("infolder"):e.classList.contains("infolding")&&e.classList.remove("infolding"),e.classList.contains("intab")||e.classList.add("intab"),e.pos&&e.classList.remove(e.pos),e.classList.add(t.id),e.setAttribute("pos",t.id)})}),(tabPanes=document.querySelectorAll(".tab-pane")).forEach(t=>{t.querySelectorAll(".echarts."+t.parentNode.id).forEach(e=>{t.classList.contains("active")&&(e.classList.add("active"),e.classList.add("drew"))})}),window.addEventListener("resize",function(){for(var e=document.querySelectorAll(".echarts"),t=0;t<e.length;++t)"Gecko"===browserEngine&&(e[t].classList.contains("infolder")||e[t].classList.contains("infolding"))||(e[t].classList.contains("intab")&&!e[t].classList.contains("active")||echarts.getInstanceByDom(e[t]).resize(),e[t].classList.contains("intab")&&!e[t].classList.contains("active")&&e[t].classList.remove("drew"))})),stellar.plugins.scrollreveal&&stellar.loadScript(stellar.plugins.scrollreveal.js).then(function(){ScrollReveal().reveal("body .reveal",{distance:stellar.plugins.scrollreveal.distance,duration:stellar.plugins.scrollreveal.duration,interval:stellar.plugins.scrollreveal.interval,scale:stellar.plugins.scrollreveal.scale,easing:"ease-out"})}),stellar.plugins.lazyload&&(stellar.loadScript(stellar.plugins.lazyload.js,{defer:!0}),window.lazyLoadOptions={elements_selector:".lazy"},window.addEventListener("LazyLoad::Initialized",function(e){window.lazyLoadInstance=e.detail.instance},!1),document.addEventListener("DOMContentLoaded",function(){window.lazyLoadInstance?.update()})),stellar.plugins.stellar)for(let t of Object.keys(stellar.plugins.stellar)){let e=stellar.plugins.stellar[t];if("linkcard"==t)stellar.loadScript(e,{defer:!0}).then(function(){setCardLink(document.querySelectorAll("a.link-card[cardlink]"))});else{const ya=document.getElementsByClassName("stellar-"+t+"-api");null!=ya&&0<ya.length&&stellar.jQuery(()=>{stellar.loadScript(e,{defer:!0}),"timeline"==t&&stellar.loadScript(stellar.plugins.marked)})}}if(stellar.plugins.swiper){const za=document.getElementById("swiper-api");null!=za&&(stellar.loadCSS(stellar.plugins.swiper.css),stellar.loadScript(stellar.plugins.swiper.js,{defer:!0}).then(function(){var e=za.getAttribute("effect")||"";new Swiper(".swiper#swiper-api",{slidesPerView:"auto",spaceBetween:8,centeredSlides:!0,effect:e,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}if(stellar.plugins.preload&&("instant_page"==stellar.plugins.preload.service?stellar.loadScript(stellar.plugins.preload.instant_page,{defer:!0,type:"module",integrity:"sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1"}):"flying_pages"==stellar.plugins.preload.service&&(window.FPConfig={delay:0,ignoreKeywords:[],maxRPS:5,hoverDelay:25},stellar.loadScript(stellar.plugins.preload.flying_pages,{defer:!0}))),stellar.plugins.fancybox){let e="img[fancybox]:not(.error)";stellar.plugins.fancybox.selector&&(e+=", "+stellar.plugins.fancybox.selector),0!==document.querySelectorAll(e).length&&(stellar.loadCSS(stellar.plugins.fancybox.css),stellar.loadScript(stellar.plugins.fancybox.js,{defer:!0}).then(function(){Fancybox.bind(e,{groupAll:!0,hideScrollbar:!1,Thumbs:{autoStart:!1},caption:function(e,t,s){return s.$trigger.alt||null}})}))}stellar.search.service&&"local_search"==stellar.search.service&&stellar.jQuery(()=>{stellar.loadScript("/js/search/local-search.js",{defer:!0}).then(function(){var e,s=$("input#search-input");0!=s.length&&(e=document.querySelector("div#search-result"),s.focus(function(){var e=stellar.search[stellar.search.service]?.path||"/search.json",t=(e.startsWith("/")&&(e=e.substring(1)),e=stellar.config.root+e,s.attr("data-filter")||"");searchFunc(e,t,"search-input","search-result")}),s.keydown(function(e){13==e.which&&e.preventDefault()}),new MutationObserver(function(e,t){1==e.length&&(e[0].addedNodes.length?$(".search-wrapper").removeClass("noresult"):e[0].removedNodes.length&&$(".search-wrapper").addClass("noresult"))}).observe(e,{childList:!0}))})}),stellar.plugins.heti&&(stellar.loadCSS(stellar.plugins.heti.css),stellar.loadScript(stellar.plugins.heti.js,{defer:!0}).then(function(){var e=new Heti(".heti");!function(){var e;for(e of document.querySelectorAll(this.rootSelector))this.spacingElement(e)}.bind(e)(),stellar.plugins.heti.enable=!1})),stellar.plugins.copycode&&stellar.loadScript(stellar.plugins.copycode.js,{defer:!0});