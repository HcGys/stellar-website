console.log("\n%c Stellar v"+stellar.GLOBAL_CONFIG.version+" %c\n"+stellar.GLOBAL_CONFIG.github+"\n","color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px","margin-top:8px");let messageCopyrightShow=0;const util={diffDate:(e,t=!1)=>{var l,o,r,a=new Date,e=new Date(e),a=a.getTime()-e.getTime(),e=864e5;let s;return s=t?(t=a/e,o=a/36e5,r=a/6e4,12<(l=a/2592e6)?null:1<=l?parseInt(l)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.month:1<=t?parseInt(t)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.day:1<=o?parseInt(o)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.hour:1<=r?parseInt(r)+" "+stellar.GLOBAL_CONFIG.config.date_suffix.min:stellar.GLOBAL_CONFIG.config.date_suffix.just):parseInt(a/e)},toggle:e=>{e=document.getElementById(e);e&&e.classList.toggle("display")},messageCopyright:()=>{stellar.GLOBAL_CONFIG.plugins.message.enable&&stellar.GLOBAL_CONFIG.plugins.message.copyright.enable&&messageCopyrightShow<1&&(messageCopyrightShow++,hud.message(stellar.GLOBAL_CONFIG.plugins.message.copyright.title,stellar.GLOBAL_CONFIG.plugins.message.copyright.message,{icon:stellar.GLOBAL_CONFIG.plugins.message.copyright.icon,transitionIn:"flipInX",transitionOut:"flipOutX",displayMode:1}))},writeClipText:async t=>{try{return await navigator.clipboard.writeText(t),await Promise.resolve()}catch(e){var l=document.createElement("textarea");l.setAttribute("readonly","readonly"),document.body.appendChild(l),l.innerHTML=t,l.select();try{var o=document.execCommand("copy");return document.body.removeChild(l),o&&"unsuccessful"!==o?Promise.resolve():Promise.reject("未经用户许可!")}catch(e){return document.body.removeChild(l),Promise.reject("当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作!")}}},animateIn:(e,t)=>{e.style.display="block",e.style.animation=t},animateOut:(t,e)=>{t.addEventListener("animationend",function e(){t.style.display="",t.style.animation="",t.removeEventListener("animationend",e)}),t.style.animation=e},animateDelayedElements:(e,l,o)=>{document.querySelectorAll(e).forEach((e,t)=>{e.querySelectorAll(l).forEach((e,t)=>{e.style.animationDelay=o+.2*t+"s"})})},hexToRgba:e=>{let t=!1,l=e.slice(e.startsWith("#")?1:0);return 3===l.length?l=[...l].map(e=>e+e).join(""):8===l.length&&(t=!0),{r:(l=parseInt(l,16))>>>(t?24:16),g:(l&(t?16711680:65280))>>>(t?16:8),b:(l&(t?65280:255))>>>(t?8:0),a:t?255&l:1}},rgbToHsl:(e,t,l)=>{e/=255,t/=255,l/=255;var o=Math.max(e,t,l),r=o-Math.min(e,t,l),l=r?o===e?(t-l)/r:o===t?2+(l-e)/r:4+(e-t)/r:0;return{h:60*l<0?60*l+360:60*l,s:r=100*(r?o<=.5?r/(2*o-r):r/(2-(2*o-r)):0),l:100*(2*o-r)/2}}},hud={message:(e,t,l={},o=null)=>{function r(e,t,l,o){var{icon:l,time:r,position:a,transitionIn:s,transitionOut:n,messageColor:i,titleColor:d,backgroundColor:c,zindex:m,displayMode:u}=l;iziToast.show({layout:"2",icon:"Fontawesome",closeOnEscape:"true",displayMode:u||"replace",transitionIn:s||stellar.GLOBAL_CONFIG.plugins.message.transitionIn,transitionOut:n||stellar.GLOBAL_CONFIG.plugins.message.transitionOut,messageColor:i||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:d||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:c||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:m||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:l||stellar.GLOBAL_CONFIG.plugins.message.icon.default,timeout:r||stellar.GLOBAL_CONFIG.plugins.message.time.default,position:a||stellar.GLOBAL_CONFIG.plugins.message.position,title:e,message:t,onClosed:()=>{o&&o()}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{r(e,t,l,o)})):r(e,t,l,o)},question:(e,t,l={},o=null,r=null,a=null)=>{function s(e,t,l,o,r,a){const{icon:s,time:n,transitionOut:i,messageColor:d,titleColor:c,backgroundColor:m,zindex:u}=l;iziToast.question({id:"question",icon:"Fontawesome",close:!1,overlay:!0,displayMode:"once",position:"center",messageColor:d||stellar.GLOBAL_CONFIG.plugins.message.messageColor,titleColor:c||stellar.GLOBAL_CONFIG.plugins.message.titleColor,backgroundColor:m||stellar.GLOBAL_CONFIG.plugins.message.backgroundColor,zindex:u||stellar.GLOBAL_CONFIG.plugins.message.zindex,icon:s||stellar.GLOBAL_CONFIG.plugins.message.icon.quection,timeout:n||stellar.GLOBAL_CONFIG.plugins.message.time.quection,title:e,message:t,buttons:[["<button><b>是</b></button>",(e,t)=>{e.hide({transitionOut:i||"fadeOut"},t,"button"),o&&o(e,t)}],["<button><b>否</b></button>",(e,t)=>{e.hide({transitionOut:i||"fadeOut"},t,"button"),r&&r(e,t)}]],onClosed:(e,t,l)=>{a&&a(e,t,l)}})}"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{s(e,t,l,o,r,a)})):s(e,t,l,o,r,a)},hideMessage:(e=null)=>{const t=document.querySelector(".iziToast");function l(e){iziToast.hide({},t),e&&e()}t?"undefined"==typeof iziToast?(stellar.loadCSS(stellar.GLOBAL_CONFIG.config.cdn.izitoast_css),stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.izitoast_js,()=>{l(e)})):l(e):e&&e()}},StellarApp=(()=>{const t={init:()=>{stellar.dom.header&&(scrollCorrection=stellar.dom.header.clientHeight+16),window.onresize=()=>{document.documentElement.clientWidth<500?stellar.isMobile=1:stellar.isMobile=0,stellar.isMobile!=stellar.isMobileOld&&(t.setGlobalHeaderMenuEvent(),t.setHeader(),t.setHeaderSearch())},stellar.scroll.push(t.scrollEventCallBack,"scrollEventCallBack")},event:()=>{stellar.dom.$(document.getElementById("scroll-down"))?.on("click",function(){t.scrolltoElement(stellar.dom.bodyAnchor)});var e=document.querySelector(".l_left");e&&!e.querySelectorAll("widget").length&&document.querySelector(".l_main").classList.add("no_sidebar"),document.body.oncopy=function(){util.messageCopyright()}},setRelativeDate:e=>{e.forEach(e=>{var t=e.getAttribute("datetime"),t=util.diffDate(t,!0);t&&(e.innerText=t)})},registerTabsTag:()=>{document.querySelectorAll(".tabs .nav-tabs .tab").forEach(o=>{o.addEventListener("click",e=>{if(e.preventDefault(),e.stopPropagation(),!o.classList.contains("active")){var l=o.parentNode.children;let t;for(let e=0;e<l.length;++e)l[e].classList.contains("active")?(t=document.getElementById(l[e].querySelector("a").classList[0].replace("#","")),l[e].classList.remove("active")):l[e]===o&&o.classList.add("active");e=document.getElementById(o.querySelector("a").classList[0].replace("#",""));e.classList.add("active"),t.classList.remove("active"),e.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))},setIsMobile:()=>{document.documentElement.clientWidth<500?(stellar.isMobile=1,stellar.isMobileOld=1):(stellar.isMobile=0,stellar.isMobileOld=0)},setHeader:()=>{pdata.ispage&&(stellar.dom.wrapper?.find(".nav-sub .title")?.html(document.title.split(" - ")[0]),stellar.dom.comment=stellar.dom.$(document.getElementById("s-comment")),stellar.dom.commentTarget=stellar.dom.$(document.querySelector(".l_main div#comments")),stellar.dom.commentTarget&&stellar.dom.comment?stellar.dom.comment.click(e=>{e.preventDefault(),e.stopPropagation(),t.scrolltoElement(stellar.dom.commentTarget),e.stopImmediatePropagation()}):stellar.dom.comment&&(stellar.dom.comment.style.display="none"),stellar.isMobile)&&(stellar.dom.toc=stellar.dom.$(document.getElementById("s-toc")),stellar.dom.tocTarget=stellar.dom.$(document.querySelector(".l_left .widget-wrapper.toc")),stellar.dom.tocTarget&&stellar.dom.toc?(stellar.dom.toc.click(e=>{e.stopPropagation(),stellar.dom.tocTarget.toggleClass("active"),stellar.dom.toc.toggleClass("active");var e=document.querySelector("widget.toc>.widget-body"),t=stellar.dom.tocTarget.querySelector(".toc-item.active-current>.toc-link"),l=e.clientHeight/2,o=!0;l<t.offsetTop?e.scrollTo({top:t.offsetTop-l,behavior:"smooth"}):o&&e.scrollTo({top:0,behavior:"smooth"})}),stellar.dom.$(document).click(function(e){e.stopPropagation(),stellar.dom.tocTarget&&stellar.dom.tocTarget.removeClass("active"),stellar.dom.toc?.removeClass("active")})):stellar.dom.toc&&(stellar.dom.toc.style.display="none"))},setHeaderMenuSelection:()=>{stellar.dom.headerMenu=stellar.dom.$(document.querySelectorAll("#l_header .navigation,#l_cover .navigation,#l_side .navigation")),stellar.dom.headerMenu.forEach(e=>{var t=stellar.dom.$(e).find("li a.active"),t=(t&&t.removeClass("active"),stellar.dom.$(e).find("div a.active"));t&&t.removeClass("active")});var t=location.pathname.replace(/\/|%|\./g,""),e=(t=0==t.length?"home":t).match(/page\d{0,}$/g),e=(e&&(e=e[0],t=t.split(e)[0]),t.match(/index.html/));e&&(e=e[0],t=t.split(e)[0]),(t=t.replace(/(\[|\]|~|#|@)/g,"\\$1"))&&stellar.dom.headerMenu&&stellar.dom.headerMenu.forEach(e=>{e=e.querySelector("[active-action=action-"+t+"]");e&&stellar.dom.$(e).addClass("active")})},nextSiteMenu:()=>{var t=document.querySelector(".widget.nextsite");if(t){var l=t.querySelector("li.menu-item-active");l&&l.removeClass(".menu-item-active");let e=location.pathname.replace(/\/|%|\./g,"");l=(e=0==e.length?"home":e).match(/page\d{0,}$/g),l=(l&&(l=l[0],e=e.split(l)[0]),e.match(/index.html/)),l=(l&&(l=l[0],e=e.split(l)[0]),e=e.replace(/(\[|\]|~|#|@)/g,"\\$1"),t.querySelector("[active-action=action-"+e+"]"));l?.parentElement&&stellar.dom.$(l.parentElement).addClass("menu-item-active")}},setGlobalHeaderMenuEvent:()=>{stellar.isMobile?document.querySelectorAll("#l_header .m-phone li").forEach(function(e){e.querySelector(".list-v")&&stellar.dom.$(e).click(function(e){e.stopPropagation(),e.currentTarget.parentElement.childNodes.forEach(function(e){"[object HTMLLIElement]"==Object.prototype.toString.call(e)&&e.childNodes.forEach(function(e){"[object HTMLUListElement]"==Object.prototype.toString.call(e)&&stellar.dom.$(e).hide()})});var t=e.currentTarget.children;for(let e=0;e<t.length;e++){var l=t[e];"menu"===stellar.dom.$(l).title?stellar.dom.$(l).display="flex":stellar.dom.$(l).show()}dark_header_icon()},0)}):document.querySelectorAll("#wrapper .m-pc li > a[href]").forEach(function(e){stellar.dom.$(e.parentElement).click(function(e){e.stopPropagation(),e.target.origin==e.target.baseURI&&document.querySelectorAll("#wrapper .m-pc .list-v").forEach(function(e){stellar.dom.$(e).hide()})},0)}),t.setPageHeaderMenuEvent()},setPageHeaderMenuEvent:()=>{stellar.isMobile&&stellar.dom.$(document).click(function(e){stellar.dom.mPhoneList.forEach(function(e){stellar.dom.$(e).hide()})})},setHeaderSearch:()=>{stellar.isMobile&&stellar.dom.switcher&&(stellar.dom.switcher.click(function(e){e.stopPropagation(),stellar.dom.header.toggleClass("z_search-open"),stellar.dom.switcher.toggleClass("active")}),stellar.dom.$(document).click(function(e){stellar.dom.header.removeClass("z_search-open"),stellar.dom.switcher.removeClass("active")}),stellar.dom.search.click(function(e){e.stopPropagation()}))},scrollEventCallBack:()=>{var e=stellar.dom.bodyAnchor.offsetTop-scrollCorrection,t=stellar.scroll.getScrollTop();stellar.dom.topBtn&&(t>stellar.dom.bodyAnchor.offsetTop?(stellar.dom.topBtn.addClass("show"),0<stellar.scroll.del?stellar.dom.topBtn.removeClass("hl"):stellar.dom.topBtn.addClass("hl")):stellar.dom.topBtn.removeClass("show").removeClass("hl")),stellar.dom.header&&(-1<t-e?stellar.dom.header.addClass("show"):stellar.dom.header.removeClass("show")),pdata.ispage&&stellar.dom.wrapper&&(0<stellar.scroll.del&&100<t?stellar.dom.wrapper.addClass("sub"):stellar.scroll.del<0&&stellar.dom.wrapper.removeClass("sub")),stellar.isMobile&&(pdata.ispage&&stellar.dom.tocTarget&&stellar.dom.toc&&(stellar.dom.tocTarget.removeClass("active"),stellar.dom.toc.removeClass("active")),stellar.dom.mPhoneList)&&stellar.dom.mPhoneList.forEach(function(e){stellar.dom.$(e).hide()})},scrolltoElement:(e,t=scrollCorrection)=>{stellar.scroll.to(e,{top:e.getBoundingClientRect().top+document.documentElement.scrollTop-t})},setScrollAnchor:()=>{stellar.dom.topBtn&&stellar.dom.bodyAnchor&&stellar.dom.topBtn.click(e=>{e.preventDefault(),e.stopPropagation(),t.scrolltoElement(stellar.dom.bodyAnchor),e.stopImmediatePropagation()})}};return{init_layout:()=>{t.init(),t.event(),t.setIsMobile(),t.setRelativeDate(document.querySelectorAll("#post-meta time")),t.registerTabsTag(),t.setHeader(),t.setHeaderMenuSelection(),t.setGlobalHeaderMenuEvent(),t.setHeaderSearch(),t.setScrollAnchor(),t.nextSiteMenu()},scrolltoElement:t.scrolltoElement}})(),highlightKeyWords=(Object.freeze(StellarApp),(()=>{let d={markNum:0,markNextId:-1,startFromURL:()=>{var e=decodeURI(new URL(location.href).searchParams.get("keyword")),e=e?e.split(" "):[],t=document.querySelector(".l_main");1==e.length&&"null"==e[0]||(d.start(e,t),d.scrollToFirstHighlightKeywordMark())},scrollToFirstHighlightKeywordMark:()=>{d.scrollToNextHighlightKeywordMark("0")||stellar.requestAnimationFrame(d.scrollToFirstHighlightKeywordMark)},scrollToNextHighlightKeywordMark:e=>{var e=e||(d.markNextId+1)%d.markNum;d.markNextId=parseInt(e);let t=document.getElementById("keyword-mark-"+d.markNextId);return t||(d.markNextId=(d.markNextId+1)%d.markNum,t=document.getElementById("keyword-mark-"+d.markNextId)),t&&(e=stellar.dom.header?stellar.dom.header.offsetHeight:0,stellar.scroll.to(t,{addTop:-e-10,behavior:"instant"})),t},scrollToPrevHighlightKeywordMark:e=>{var e=e||(d.markNextId-1+d.markNum)%d.markNum;d.markNextId=parseInt(e);let t=document.getElementById("keyword-mark-"+d.markNextId);return t||(d.markNextId=(d.markNextId-1+d.markNum)%d.markNum,t=document.getElementById("keyword-mark-"+d.markNextId)),t&&(e=stellar.dom.header?stellar.dom.header.offsetHeight:0,stellar.scroll.to(t,{addTop:-e-5,behavior:"instant"})),t},start:(l,e)=>{if(d.markNum=0,l.length&&e&&(1!=l.length||"null"!=l[0])){console.log(l);for(var t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null),o=[];t.nextNode();)t.currentNode.parentNode.matches("button, select, textarea")||o.push(t.currentNode);o.forEach(e=>{var[t]=d.getIndexByWord(l,e.nodeValue);t.length&&(t=d.mergeIntoSlice(0,e.nodeValue.length,t),d.highlightText(e,t,"keyword"),d.highlightStyle())})}},getIndexByWord:(e,r,a=!1)=>{const s=[],n=new Set;return e.forEach(t=>{var e=document.createElement("div"),l=(e.innerText=t,(t=e.innerHTML).length);if(0!==l){let e=0;var o;for(a||(r=r.toLowerCase(),t=t.toLowerCase());-1<(o=r.indexOf(t,e));)s.push({position:o,word:t}),n.add(t),e=o+l}}),s.sort((e,t)=>e.position!==t.position?e.position-t.position:t.word.length-e.word.length),[s,n]},mergeIntoSlice:(e,t,l)=>{var o;let{position:r,word:a}=l[0];for(var s=[],n=new Set;r+a.length<=t&&0!==l.length;){n.add(a),s.push({position:r,length:a.length});var i=r+a.length;for(l.shift();0!==l.length&&(o=l[0],r=o.position,a=o.word,i>r);)l.shift()}return{hits:s,start:e,end:t,count:n.size}},highlightText:(t,e,l)=>{var o=t.nodeValue;let r=e.start;var a,s,n=[];for({position:a,length:s}of e.hits){var i=document.createTextNode(o.substring(r,a));r=a+s;let e=document.createElement("mark");e.className=l,(e=d.highlightStyle(e)).appendChild(document.createTextNode(o.substr(a,s))),n.push(i,e)}t.nodeValue=o.substring(r,e.end),n.forEach(e=>{t.parentNode.insertBefore(e,t)})},highlightStyle:e=>{if(e)return e.id="keyword-mark-"+d.markNum,d.markNum++,e.style.background="var(--theme-color-opa)",e.style["border-bottom"]="1px dashed var(--theme-color)",e.style.color="var(--theme-color)",e.style["border-radius"]="4px",e.style["font-weight"]="bold",e},cleanHighlightStyle:()=>{document.querySelectorAll(".keyword").forEach(e=>{e.style.background="transparent",e.style["border-bottom"]=null,e.style.color=null,e.style["border-radius"]=null,e.style["font-weight"]=null})}};return{start:(e,t)=>{d.start(e,t)},startFromURL:()=>{d.startFromURL()},scrollToNextHighlightKeywordMark:e=>{d.scrollToNextHighlightKeywordMark(e)},scrollToPrevHighlightKeywordMark:e=>{d.scrollToPrevHighlightKeywordMark(e)},cleanHighlightStyle:()=>{d.cleanHighlightStyle()}}})()),DOMController=(Object.freeze(highlightKeyWords),{visible:(e,t=!0)=>{e&&(e.style.display=!0===t?"block":"none")},remove:e=>{document.querySelectorAll(e).forEach(e=>{e.remove()})},removeList:e=>{e.forEach(e=>{DOMController.remove(e)})},setAttribute:(e,t,l)=>{document.querySelectorAll(e).forEach(e=>{e.setAttribute(t,l)})},setAttributeList:e=>{e.forEach(e=>{DOMController.setAttribute(e[0],e[1],e[2])})},setStyle:(e,t,l)=>{document.querySelectorAll(e).forEach(e=>{e.style[t]=l})},setStyleList:e=>{e.forEach(e=>{DOMController.setStyle(e[0],e[1],e[2])})},fadeIn:e=>{if(e)return e.style.visibility="visible",e.style.opacity=1,e.style.display="block",e.style.transition="all 0.5s linear",e},fadeOut:e=>{if(e)return e.style.visibility="hidden",e.style.opacity=0,e.style.display="none",e.style.transition="all 0.5s linear",e},fadeToggle:e=>{if(e)return e="hidden"==e.style.visibility?DOMController.fadeIn(e):DOMController.fadeOut(e)},fadeToggleList:e=>{e.forEach(e=>{DOMController.fadeToggle(e)})},hasClass:(e,t)=>{if(e)return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},addClass:(e,t)=>{if(e)return e.classList.add(t),e},removeClass:(e,t)=>{if(e)return e.classList.remove(t),e},toggleClass:(e,t)=>{if(e)return DOMController.hasClass(e,t)?DOMController.removeClass(e,t):DOMController.addClass(e,t),e},toggleClassList:e=>{e.forEach(e=>{DOMController.toggleClass(e[0],e[1])})}});Object.freeze(DOMController),stellar.requestAnimationFrame(()=>{StellarApp.init_layout(),highlightKeyWords.startFromURL()});