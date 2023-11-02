console.log("\n%c Stellar v"+stellar.GLOBAL_CONFIG.version+" %c\n"+stellar.GLOBAL_CONFIG.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");const util={diffDate:(e,t=!1)=>{var l,r,o,a=new Date,e=new Date(e),a=a.getTime()-e.getTime(),e=864e5;let s;return s=t?(t=a/e,r=a/36e5,o=a/6e4,12<(l=a/2592e6)?null:1<=l?parseInt(l)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.day:1<=r?parseInt(r)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.hour:1<=o?parseInt(o)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.min:stellar.GLOBAL_CONFIG.config.date_suffix.just):parseInt(a/e)},copy:(e,t)=>{e=document.getElementById(e);e&&(e.select(),document.execCommand("Copy"),t)&&0<t.length&&hud.toast(t)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")},messageCopyright:()=>{stellar.GLOBAL_CONFIG.plugins.message.enable&&stellar.GLOBAL_CONFIG.plugins.message.copyright.enable&&hud.message(stellar.GLOBAL_CONFIG.plugins.message.copyright.title,stellar.GLOBAL_CONFIG.plugins.message.copyright.message,{icon:stellar.GLOBAL_CONFIG.plugins.message.copyright.icon,transitionIn:"flipInX",transitionOut:"flipOutX",displayMode:1})},utilWriteClipText:r=>navigator.clipboard.writeText(r).then(()=>Promise.resolve()).catch(e=>{var t=document.createElement("textarea");t.setAttribute("readonly","readonly"),document.body.appendChild(t),t.innerHTML=r,t.select();try{var l=document.execCommand("copy");return document.body.removeChild(t),l&&"unsuccessful"!==l?Promise.resolve():Promise.reject("复制文本失败!")}catch(e){return document.body.removeChild(t),Promise.reject("当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作!")}})},hud={toast:(e,t)=>{t=isNaN(t)?2e3:t;var l=document.createElement("div");l.classList.add("toast"),l.innerHTML=e,document.body.appendChild(l),setTimeout(function(){l.style.webkitTransition="-webkit-transform 0.5s ease-in, opacity 0.5s ease-in",l.style.opacity="0",setTimeout(function(){document.body.removeChild(l)},500)},t)},message:(e,t,l={},r=null)=>{function o(e,t,l,r){var{icon:l,time:o,position:a,transitionIn:s,transitionOut:i,messageColor:n,titleColor:d,backgroundColor:c,zindex:m,displayMode:u}=l;iziToast.show({layout:"2",icon:"Fontawesome",closeOnEscape:"true",displayMode:u||"replace",transitionIn:s||stellar.GLOBAL_CONFIG.plugins.message.transitionIn,transitionOut:i||stellar.GLOBAL_CONFIG.plugins.message.transitionOut,messageColor:n||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:d||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:c||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:m||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:l||stellar.GLOBAL_CONFIG.plugins.message.icon.default,timeout:o||stellar.GLOBAL_CONFIG.plugins.message.time.default,position:a||stellar.GLOBAL_CONFIG.plugins.message.position,title:e,message:t,onClosed:()=>{r&&r()}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{o(e,t,l,r)})):o(e,t,l,r)},question:(e,t,l={},r=null,o=null,a=null)=>{function s(e,t,l,r,o,a){const{icon:s,time:i,transitionOut:n,messageColor:d,titleColor:c,backgroundColor:m,zindex:u}=l;iziToast.question({id:"question",icon:"Fontawesome",close:!1,overlay:!0,displayMode:"once",position:"center",messageColor:d||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:c||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:m||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:u||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:s||stellar.GLOBAL_CONFIG.plugins.message.icon.quection,timeout:i||stellar.GLOBAL_CONFIG.plugins.message.time.quection,title:e,message:t,buttons:[["<button><b>是</b></button>",(e,t)=>{e.hide({transitionOut:n||"fadeOut"},t,"button"),r&&r(e,t)}],["<button><b>否</b></button>",(e,t)=>{e.hide({transitionOut:n||"fadeOut"},t,"button"),o&&o(e,t)}]],onClosed:(e,t,l)=>{a&&a(e,t,l)}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{s(e,t,l,r,o,a)})):s(e,t,l,r,o,a)},hideMessage:(e=null)=>{const t=document.querySelector(".iziToast");function l(e){iziToast.hide({},t),e&&e()}t?"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{l(e)})):l(e):e&&e()}},sidebar={toggle:()=>{stellar.dom.l_body&&(stellar.dom.l_body.classList.add("mobile"),stellar.dom.l_body.classList.toggle("sidebar"),stellar.dom.mask.style.display="none"===stellar.dom.mask.style.display?"flex":"none",stellar.dom.mask.classList.toggle("active"))}},StellarApp=(()=>{const t={init:()=>{stellar.dom.header&&(scrollCorrection=stellar.dom.header.clientHeight+16),window.onresize=()=>{document.documentElement.clientWidth<500?stellar.isMobile=1:stellar.isMobile=0,stellar.isMobile!=stellar.isMobileOld&&(t.setGlobalHeaderMenuEvent(),t.setHeader(),t.setHeaderSearch())},stellar.scroll.push(t.scrollEventCallBack,"scrollEventCallBack")},event:()=>{stellar.dom.$(document.getElementById("scroll-down"))?.on("click",function(){t.scrolltoElement(stellar.dom.bodyAnchor)}),stellar.dom.$(document.getElementById("start-wrap"))?.on("click",function(){t.scrolltoElement(stellar.dom.bodyAnchor)});var e=document.querySelector(".l_left");e&&!e.querySelectorAll("widget").length&&document.querySelector(".l_main").classList.add("no_sidebar"),document.body.oncopy=function(){util.messageCopyright()}},setSideBar:()=>{stellar.jQuery(()=>{$("#data-toc a.toc-link").click(function(e){stellar.dom.l_body.classList.remove("sidebar")})})},setRelativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},firefoxConfig:()=>{document.querySelectorAll(".folder details").forEach(o=>{o.addEventListener("toggle",e=>{if(o.open){if(stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((t=o.nextSibling.querySelector(".mermaid."+o.parentNode.parentNode.id))&&!t.classList.contains("drew")&&o.nextSibling.querySelectorAll(".mermaid."+o.parentNode.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",o.nextSibling),l=o.nextSibling.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:l}),l.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var t=o.nextSibling.querySelector(".echarts."+o.parentNode.parentNode.id),l=(t&&!t.classList.contains("drew")&&o.nextSibling.querySelectorAll(".echarts."+o.parentNode.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),t&&o.nextSibling.querySelectorAll(".echarts."+o.parentNode.parentNode.id).forEach(e=>{e.classList.add("active")}),diagramRenderMark(".echarts",o.nextSibling),o.nextSibling.querySelectorAll(".echarts.wait-drew")),r=0;r<l.length;++r)echarts.getInstanceByDom(l[r]).resize(),l[r].classList.add("drew"),l[r].classList.remove("wait-drew")}else stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&o.nextSibling.querySelectorAll(".echarts.active").forEach(e=>{e.classList.remove("active")})})}),document.querySelectorAll(".folding details").forEach(o=>{o.addEventListener("toggle",e=>{if(o.open){if(stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((t=o.nextSibling.querySelector(".mermaid."+o.parentNode.id))&&!t.classList.contains("drew")&&o.nextSibling.querySelectorAll(".mermaid."+o.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",o.nextSibling),l=o.nextSibling.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:l}),l.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var t=o.nextSibling.querySelector(".echarts."+o.parentNode.id),l=(t&&!t.classList.contains("drew")&&o.nextSibling.querySelectorAll(".echarts."+o.parentNode.id).forEach(e=>{e.classList.add("wait-drew")}),t&&o.nextSibling.querySelectorAll(".echarts."+o.parentNode.id).forEach(e=>{e.classList.add("active")}),diagramRenderMark(".echarts",o.nextSibling),o.nextSibling.querySelectorAll(".echarts.wait-drew")),r=0;r<l.length;++r)echarts.getInstanceByDom(l[r]).resize(),l[r].classList.add("drew"),l[r].classList.remove("wait-drew")}else stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts&&o.nextSibling.querySelectorAll(".echarts.active").forEach(e=>{e.classList.remove("active")})})})},registerTabsTag:()=>{document.querySelectorAll(".tabs .nav-tabs .tab").forEach(a=>{a.addEventListener("click",e=>{if(e.preventDefault(),e.stopPropagation(),!a.classList.contains("active")){[...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)});const r=document.getElementById(a.querySelector("a").classList[0].replace("#","")),o=r.parentNode.parentNode.id;if([...r.parentNode.children].forEach(t=>{t.classList.toggle("active",t===r),stellar.GLOBAL_CONFIG.plugins.echarts&&t.querySelectorAll(".echarts."+o).forEach(e=>{e.classList.toggle("active",t===r)})}),stellar.GLOBAL_CONFIG.plugins.copycode&&(e=r.querySelector(".copy-btn"))&&!e.classList.contains("drew")&&r.querySelectorAll(".code").forEach(e=>{var t=window.getComputedStyle(e,"::before").width.split("px")[0],l=window.getComputedStyle(e,"::before").padding.split(" ").pop().split("px")[0],e=e.querySelector(".copy-btn");e.style.right=Number(t)+2*Number(l)+"px",e.classList.add("drew")}),stellar.GLOBAL_CONFIG.plugins.mermaid&&window.mermaid&&((e=r.querySelector(".mermaid."+o))&&!e.classList.contains("drew")&&r.querySelectorAll(".mermaid."+o).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".mermaid",r),e=r.querySelectorAll(".mermaid.wait-drew"),mermaid.run({suppressErrors:!0,nodes:e}),e.forEach(e=>{e.classList.remove("wait-drew"),e.classList.add("drew")})),stellar.GLOBAL_CONFIG.plugins.echarts&&window.echarts)for(var e=r.querySelector(".echarts."+o),t=(e&&!e.classList.contains("drew")&&r.querySelectorAll(".echarts."+o).forEach(e=>{e.classList.add("wait-drew")}),diagramRenderMark(".echarts",r),r.querySelectorAll(".echarts.wait-drew")),l=0;l<t.length;++l)echarts.getInstanceByDom(t[l]).resize(),t[l].classList.add("drew"),t[l].classList.remove("wait-drew");r.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))},restData:()=>{scrollCorrection=stellar.dom.header?stellar.dom.header.clientHeight+16:80},setIsMobile:()=>{document.documentElement.clientWidth<500?(stellar.isMobile=1,stellar.isMobileOld=1):(stellar.isMobile=0,stellar.isMobileOld=0)},setHeader:()=>{pdata.ispage&&(stellar.dom.wrapper?.find(".nav-sub .title")?.html(document.title.split(" - ")[0]),stellar.dom.comment=stellar.dom.$(document.getElementById("s-comment")),stellar.dom.commentTarget=stellar.dom.$(document.querySelector(".l_main div#comments")),stellar.dom.commentTarget&&stellar.dom.comment?stellar.dom.comment.click(e=>{e.preventDefault(),e.stopPropagation(),t.scrolltoElement(stellar.dom.commentTarget),e.stopImmediatePropagation()}):stellar.dom.comment&&(stellar.dom.comment.style.display="none"),stellar.isMobile)&&(stellar.dom.toc=stellar.dom.$(document.getElementById("s-toc")),stellar.dom.tocTarget=stellar.dom.$(document.querySelector(".l_left .widget-wrapper.toc")),stellar.dom.tocTarget&&stellar.dom.toc?(stellar.dom.toc.click(e=>{e.stopPropagation(),stellar.dom.tocTarget.toggleClass("active"),stellar.dom.toc.toggleClass("active")}),stellar.dom.$(document).click(function(e){e.stopPropagation(),stellar.dom.tocTarget&&stellar.dom.tocTarget.removeClass("active"),stellar.dom.toc?.removeClass("active")})):stellar.dom.toc&&(stellar.dom.toc.style.display="none"))},setHeaderMenuSelection:()=>{stellar.dom.headerMenu=stellar.dom.$(document.querySelectorAll("#l_header .navigation,#l_cover .navigation,#l_side .navigation")),stellar.dom.headerMenu.forEach(e=>{var t=stellar.dom.$(e).find("li a.active"),t=(t&&t.removeClass("active"),stellar.dom.$(e).find("div a.active"));t&&t.removeClass("active")});var t=location.pathname.replace(/\/|%|\./g,""),e=(t=0==t.length?"home":t).match(/page\d{0,}$/g),e=(e&&(e=e[0],t=t.split(e)[0]),t.match(/index.html/));e&&(e=e[0],t=t.split(e)[0]),(t=t.replace(/(\[|\]|~|#|@)/g,"\\$1"))&&stellar.dom.headerMenu&&stellar.dom.headerMenu.forEach(e=>{e=e.querySelector("[active-action=action-"+t+"]");e&&stellar.dom.$(e).addClass("active")})},nextSiteMenu:()=>{var t=document.querySelector(".widget.nextsite");if(t){var l=t.querySelector("li.menu-item-active");l&&l.removeClass(".menu-item-active");let e=location.pathname.replace(/\/|%|\./g,"");l=(e=0==e.length?"home":e).match(/page\d{0,}$/g),l=(l&&(l=l[0],e=e.split(l)[0]),e.match(/index.html/)),l=(l&&(l=l[0],e=e.split(l)[0]),e=e.replace(/(\[|\]|~|#|@)/g,"\\$1"),t.querySelector("[active-action=action-"+e+"]"));l?.parentElement&&stellar.dom.$(l.parentElement).addClass("menu-item-active")}},setGlobalHeaderMenuEvent:()=>{stellar.isMobile?document.querySelectorAll("#l_header .m-phone li").forEach(function(e){e.querySelector(".list-v")&&stellar.dom.$(e).click(function(e){e.stopPropagation(),e.currentTarget.parentElement.childNodes.forEach(function(e){"[object HTMLLIElement]"==Object.prototype.toString.call(e)&&e.childNodes.forEach(function(e){"[object HTMLUListElement]"==Object.prototype.toString.call(e)&&stellar.dom.$(e).hide()})});var t=e.currentTarget.children;for(let e=0;e<t.length;e++){var l=t[e];"menu"===stellar.dom.$(l).title?stellar.dom.$(l).display="flex":stellar.dom.$(l).show()}dark_header_icon()},0)}):document.querySelectorAll("#wrapper .m-pc li > a[href]").forEach(function(e){stellar.dom.$(e.parentElement).click(function(e){e.stopPropagation(),e.target.origin==e.target.baseURI&&document.querySelectorAll("#wrapper .m-pc .list-v").forEach(function(e){stellar.dom.$(e).hide()})},0)}),t.setPageHeaderMenuEvent()},setPageHeaderMenuEvent:()=>{stellar.isMobile&&stellar.dom.$(document).click(function(e){stellar.dom.mPhoneList.forEach(function(e){stellar.dom.$(e).hide()})})},setHeaderSearch:()=>{stellar.isMobile&&stellar.dom.switcher&&(stellar.dom.switcher.click(function(e){e.stopPropagation(),stellar.dom.header.toggleClass("z_search-open"),stellar.dom.switcher.toggleClass("active")},!1),stellar.dom.$(document).click(function(e){stellar.dom.header.removeClass("z_search-open"),stellar.dom.switcher.removeClass("active")},!1),stellar.dom.search.click(function(e){e.stopPropagation()},!1))},scrollEventCallBack:()=>{var e=stellar.dom.bodyAnchor.offsetTop-scrollCorrection,t=stellar.scroll.getScrollTop();stellar.dom.topBtn&&(t>stellar.dom.bodyAnchor.offsetTop?(stellar.dom.topBtn.addClass("show"),0<stellar.scroll.del?stellar.dom.topBtn.removeClass("hl"):stellar.dom.topBtn.addClass("hl")):stellar.dom.topBtn.removeClass("show").removeClass("hl")),stellar.dom.header&&(-1<t-e?stellar.dom.header.addClass("show"):stellar.dom.header.removeClass("show")),pdata.ispage&&stellar.dom.wrapper&&(0<stellar.scroll.del&&100<t?stellar.dom.wrapper.addClass("sub"):stellar.scroll.del<0&&stellar.dom.wrapper.removeClass("sub")),stellar.isMobile&&(pdata.ispage&&stellar.dom.tocTarget&&stellar.dom.toc&&(stellar.dom.tocTarget.removeClass("active"),stellar.dom.toc.removeClass("active")),stellar.dom.mPhoneList)&&stellar.dom.mPhoneList.forEach(function(e){stellar.dom.$(e).hide()})},scrolltoElement:(e,t=scrollCorrection)=>{stellar.scroll.to(e,{top:e.getBoundingClientRect().top+document.documentElement.scrollTop-t})},setScrollAnchor:()=>{stellar.dom.topBtn&&stellar.dom.bodyAnchor&&stellar.dom.topBtn.click(e=>{e.preventDefault(),e.stopPropagation(),t.scrolltoElement(stellar.dom.bodyAnchor),e.stopImmediatePropagation()})}};return{init_volantis_layout:()=>{t.init(),t.event(),t.setIsMobile(),t.setRelativeDate(document.querySelectorAll("#post-meta time")),t.firefoxConfig(),t.registerTabsTag(),t.setHeader(),t.setHeaderMenuSelection(),t.setGlobalHeaderMenuEvent(),t.setHeaderSearch(),t.setScrollAnchor(),t.nextSiteMenu()},pjaxReload:()=>{t.event(),t.restData(),t.registerTabsTag(),t.setHeader(),t.setHeaderMenuSelection(),t.setPageHeaderMenuEvent(),t.setScrollAnchor(),t.nextSiteMenu(),document.querySelector("#l_header .nav-main")?.querySelectorAll(".list-v:not(.menu-phone)")?.forEach(function(e){e.removeAttribute("style")}),document.querySelector("#l_header .menu-phone.list-v")?.removeAttribute("style"),messageCopyrightShow=0},init_default_layout:()=>{stellar.dom.$(document.getElementById("start-wrap"))?.on("click",function(){stellar.scroll.to(stellar.dom.l_body,{top:stellar.dom.l_body.getBoundingClientRect().top+document.documentElement.scrollTop})}),t.setSideBar(),t.setRelativeDate(document.querySelectorAll("#post-meta time")),t.firefoxConfig(),t.registerTabsTag()},scrolltoElement:t.scrolltoElement}})(),highlightKeyWords=(Object.freeze(StellarApp),(()=>{let d={markNum:0,markNextId:-1,startFromURL:()=>{var e=decodeURI(new URL(location.href).searchParams.get("keyword")),e=e?e.split(" "):[],t=document.querySelector(".l_main");1==e.length&&"null"==e[0]||(d.start(e,t),d.scrollToFirstHighlightKeywordMark())},scrollToFirstHighlightKeywordMark:()=>{d.scrollToNextHighlightKeywordMark("0")||stellar.requestAnimationFrame(d.scrollToFirstHighlightKeywordMark)},scrollToNextHighlightKeywordMark:e=>{var e=e||(d.markNextId+1)%d.markNum;d.markNextId=parseInt(e);let t=document.getElementById("keyword-mark-"+d.markNextId);return t||(d.markNextId=(d.markNextId+1)%d.markNum,t=document.getElementById("keyword-mark-"+d.markNextId)),t&&(e=stellar.dom.header?stellar.dom.header.offsetHeight:0,stellar.scroll.to(t,{addTop:-e-10,behavior:"instant"})),t},scrollToPrevHighlightKeywordMark:e=>{var e=e||(d.markNextId-1+d.markNum)%d.markNum;d.markNextId=parseInt(e);let t=document.getElementById("keyword-mark-"+d.markNextId);return t||(d.markNextId=(d.markNextId-1+d.markNum)%d.markNum,t=document.getElementById("keyword-mark-"+d.markNextId)),t&&(e=stellar.dom.header?stellar.dom.header.offsetHeight:0,stellar.scroll.to(t,{addTop:-e-5,behavior:"instant"})),t},start:(l,e)=>{if(d.markNum=0,l.length&&e&&(1!=l.length||"null"!=l[0])){console.log(l);for(var t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null),r=[];t.nextNode();)t.currentNode.parentNode.matches("button, select, textarea")||r.push(t.currentNode);r.forEach(e=>{var[t]=d.getIndexByWord(l,e.nodeValue);t.length&&(t=d.mergeIntoSlice(0,e.nodeValue.length,t),d.highlightText(e,t,"keyword"),d.highlightStyle())})}},getIndexByWord:(e,o,a=!1)=>{const s=[],i=new Set;return e.forEach(t=>{var e=document.createElement("div"),l=(e.innerText=t,(t=e.innerHTML).length);if(0!==l){let e=0;var r;for(a||(o=o.toLowerCase(),t=t.toLowerCase());-1<(r=o.indexOf(t,e));)s.push({position:r,word:t}),i.add(t),e=r+l}}),s.sort((e,t)=>e.position!==t.position?e.position-t.position:t.word.length-e.word.length),[s,i]},mergeIntoSlice:(e,t,l)=>{var r;let{position:o,word:a}=l[0];for(var s=[],i=new Set;o+a.length<=t&&0!==l.length;){i.add(a),s.push({position:o,length:a.length});var n=o+a.length;for(l.shift();0!==l.length&&(r=l[0],o=r.position,a=r.word,n>o);)l.shift()}return{hits:s,start:e,end:t,count:i.size}},highlightText:(t,e,l)=>{var r=t.nodeValue;let o=e.start;var a,s,i=[];for({position:a,length:s}of e.hits){var n=document.createTextNode(r.substring(o,a));o=a+s;let e=document.createElement("mark");e.className=l,(e=d.highlightStyle(e)).appendChild(document.createTextNode(r.substr(a,s))),i.push(n,e)}t.nodeValue=r.substring(o,e.end),i.forEach(e=>{t.parentNode.insertBefore(e,t)})},highlightStyle:e=>{if(e)return e.id="keyword-mark-"+d.markNum,d.markNum++,e.style.background="#ff0",e.style["border-bottom"]="1px dashed #ff2a2a",e.style.color="#ff2a2a",e.style["font-weight"]="bold",e},cleanHighlightStyle:()=>{document.querySelectorAll(".keyword").forEach(e=>{e.style.background="transparent",e.style["border-bottom"]=null,e.style.color=null,e.style["font-weight"]=null})}};return{start:(e,t)=>{d.start(e,t)},startFromURL:()=>{d.startFromURL()},scrollToNextHighlightKeywordMark:e=>{d.scrollToNextHighlightKeywordMark(e)},scrollToPrevHighlightKeywordMark:e=>{d.scrollToPrevHighlightKeywordMark(e)},cleanHighlightStyle:()=>{d.cleanHighlightStyle()}}})()),DOMController=(Object.freeze(highlightKeyWords),{visible:(e,t=!0)=>{e&&(e.style.display=!0===t?"block":"none")},remove:e=>{document.querySelectorAll(e).forEach(e=>{e.remove()})},removeList:e=>{e.forEach(e=>{DOMController.remove(e)})},setAttribute:(e,t,l)=>{document.querySelectorAll(e).forEach(e=>{e.setAttribute(t,l)})},setAttributeList:e=>{e.forEach(e=>{DOMController.setAttribute(e[0],e[1],e[2])})},setStyle:(e,t,l)=>{document.querySelectorAll(e).forEach(e=>{e.style[t]=l})},setStyleList:e=>{e.forEach(e=>{DOMController.setStyle(e[0],e[1],e[2])})},fadeIn:e=>{if(e)return e.style.visibility="visible",e.style.opacity=1,e.style.display="block",e.style.transition="all 0.5s linear",e},fadeOut:e=>{if(e)return e.style.visibility="hidden",e.style.opacity=0,e.style.display="none",e.style.transition="all 0.5s linear",e},fadeToggle:e=>{if(e)return e="hidden"==e.style.visibility?DOMController.fadeIn(e):DOMController.fadeOut(e)},fadeToggleList:e=>{e.forEach(e=>{DOMController.fadeToggle(e)})},hasClass:(e,t)=>{if(e)return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},addClass:(e,t)=>{if(e)return e.classList.add(t),e},removeClass:(e,t)=>{if(e)return e.classList.remove(t),e},toggleClass:(e,t)=>{if(e)return DOMController.hasClass(e,t)?DOMController.removeClass(e,t):DOMController.addClass(e,t),e},toggleClassList:e=>{e.forEach(e=>{DOMController.toggleClass(e[0],e[1])})}});Object.freeze(DOMController),stellar.requestAnimationFrame(()=>{"default"===stellar.GLOBAL_CONFIG.config.layout?StellarApp.init_default_layout():"volantis"===stellar.GLOBAL_CONFIG.config.layout&&(StellarApp.init_volantis_layout(),highlightKeyWords.startFromURL(),stellar.pjax.push(()=>{StellarApp.pjaxReload(),highlightKeyWords.startFromURL()},"main.js"),stellar.pjax.send(()=>{stellar.dom.switcher?.removeClass("active"),stellar.dom.header?.removeClass("z_search-open"),stellar.dom.wrapper?.removeClass("sub"),stellar.EventListener?.remove()},"main.js"))});