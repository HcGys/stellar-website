const RightMenus={defaultEvent:["copyText","copyLink","copyPaste","copyAll","copyCut","copyImg","printMode","readMode","prev","next","toFullscreen","toOrign"],defaultGroup:["navigation","inputBox","seletctText","elementCheck","elementImage","articlePage","prevNext","elementFullscreen"],messageRightMenu:stellar.GLOBAL_CONFIG.plugins.message.enable&&stellar.GLOBAL_CONFIG.plugins.message.rightmenu.enable,corsAnywhere:stellar.GLOBAL_CONFIG.rightmenu.options.corsAnywhere,urlRegx:/^((https|http)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,imgRegx:/\.(jpe?g|png|webp|svg|gif|jifi)(-|_|!|\?|\/)?.*$/,initialMenu:()=>{RightMenus.fun.init()},readClipboard:async()=>{let e;switch((await navigator.permissions.query({name:"clipboard-read"})).state){case"granted":case"prompt":e=await navigator.clipboard.readText();break;default:window.clipboardRead=!1}return e},writeClipText:async e=>{try{return await navigator.clipboard.writeText(e),await Promise.resolve()}catch(e){return Promise.reject(e)}},writeClipImg:async(e,n,i)=>{const r=new Image;r.crossOrigin="Anonymous",r.addEventListener("load",()=>{var e=document.createElement("canvas"),t=e.getContext("2d");e.width=r.width,e.height=r.height,t.drawImage(r,0,0),e.toBlob(e=>{navigator.clipboard.write([new ClipboardItem({"image/png":e})]).then(e=>{n(e)}).catch(e=>{i(e)})},"image/png")},!1),r.src=e+"?(lll￢ω￢)~~"},insertAtCaret:(e,t)=>{var n,i=e.selectionStart,r=e.selectionEnd;document.selection?(e.focus(),document.selection.createRange().text=t,e.focus()):i||"0"==i?(n=e.scrollTop,e.value=e.value.substring(0,i)+t+e.value.substring(r,e.value.length),e.focus(),e.selectionStart=i+t.length,e.selectionEnd=i+t.length,e.scrollTop=n):(e.value+=t,e.focus())}};RightMenus.fun=(()=>{const s=stellar.GLOBAL_CONFIG.rightmenu,c={},d=document.getElementById("rightmenu-wrapper"),u=document.getElementById("rightmenu-content"),n=document.querySelectorAll("#rightmenu-content li.menuLoad-Content"),i=document.querySelectorAll("#rightmenu-content li, #rightmenu-content hr, #menuMusic"),t=document.getElementById("read_bkg"),r=document.getElementById("menuMusic"),e=document.querySelector("#menuMusic .backward"),o=document.querySelector("#menuMusic .toggle"),a=document.querySelector("#menuMusic .forward"),l=document.querySelector("article.md-text.sa-load-hidden, article.md-text.blur"),m=document.querySelector("body");let g={mouseEvent:null,isInputBox:!1,selectText:"",inputValue:"",isLink:!1,linkUrl:"",isMediaLink:!1,mediaLinkUrl:"",isImage:!1,isArticle:!1,isWiki:!1,FS:{isAccess:!1,target:null,oldTarget:null,eventFunc:null,callback:null,nextCallback:null},pathName:"",isReadClipboard:!0,isShowMusic:!1,statusCheck:!1};const p=Object.assign({},g);return c.initEvent=()=>{c.elementAppend(),c.contextmenu(),c.mobileMenu(),c.menuEvent()},c.elementAppend=()=>{t&&t.parentNode.removeChild(t);var e=document.createElement("div");e.className="common_read_bkg common_read_hide",e.id="read_bkg",window.document.body.appendChild(e)},c.menuPosition=e=>{try{var t=e.clientX,n=e.clientY,i=document.documentElement.clientWidth||document.body.clientWidth,r=document.documentElement.clientHeight||document.body.clientHeight,o=(d.style.display="block",c.menuControl(e),u.offsetWidth),a=u.offsetHeight,l=i<t+o?t-o+10:t,s=r<n+a?n-a+10:n,s=r<n+a&&s<a&&n<a?s+(r-a-s-10):s;d.style.left=l+"px",d.style.top=s+"px",stellar.GLOBAL_CONFIG.plugins.message.rightmenu.notice&&c.menuNotic()}catch(e){return console.error(e),c.hideMenu(),!0}return!1},c.menuControl=e=>{c.globalDataSet(e),r&&(r.style.display=g.isShowMusic?"block":"none"),n.forEach(e=>{e.style.display="none";var t=e.firstElementChild.nodeName;const n=e.firstElementChild.getAttribute("data-group");var i,r,o,a,l=e.firstElementChild.getAttribute("data-event");if(g.statusCheck||g.isArticle||g.isWiki)switch(n){case"inputBox":g.isInputBox&&(e.style.display="block","copyCut"!==l||g.selectText||(e.style.display="none"),"copyAll"!==l||g.inputValue||(e.style.display="none"),"copyPaste"!==l||g.isReadClipboard||(e.style.display="none"));break;case"seletctText":g.selectText&&(e.style.display="block");break;case"elementCheck":(g.isLink||g.isMediaLink)&&(e.style.display="block");break;case"elementImage":g.isImage&&(e.style.display="block");break;case"articlePage":g.isArticle&&(e.style.display="block");break;case"prevNext":(g.isArticle||g.isWiki)&&(i=document.querySelector("#read-next .body #prev.active"),r=document.querySelector("#read-next .body #next.active"),a=document.querySelector(".menuLoad-Content #prev"),o=document.querySelector(".menuLoad-Content #next"),a.parentElement.style.display=i?"block":"none",o.parentElement.style.display=r?"block":"none");break;case"elementFullscreen":g.FS.isAccess&&(a=document.querySelector(".menuLoad-Content #fullscreen"),document.querySelector(".menuLoad-Content #no-fullscreen").parentElement.style.display=g.FS.target.parentElement.classList.contains("fullscreen")?"block":"none",a.parentElement.style.display=g.FS.target.parentElement.classList.contains("fullscreen")?"none":"block");break;default:e.style.display="A"!==t||(g.isArticle||g.isWiki)&&!g.statusCheck&&s.options.articleShowLink?"block":"none"}else"A"!==t&&!RightMenus.defaultGroup.every(e=>n!==e)||(e.style.display="block")}),stellar.mouseEvent=e,stellar.rightmenu.method.handle.start();let t={item:null,hide:!0};i.forEach(e=>{"HR"===e.nodeName?(e.style.display="block",t.item?(!t.hide&&"hr"!==t.item.nextElementSibling.nodeName||(t.item.style.display="none"),t.item=e,t.hide=!0):t.item=e):"block"===e.style.display&&t.hide&&(t.hide=!1)}),t.item&&t.hide&&(t.item.style.display="none")},c.globalDataSet=e=>{(g=Object.assign({},p)).mouseEvent=e,g.selectText=window.getSelection().toString(),"input"!==e.target.tagName.toLowerCase()&&"textarea"!==e.target.tagName.toLowerCase()||(g.isInputBox=!0,g.inputValue=e.target.value),g.isInputBox&&!1===window.clipboardRead&&(g.isReadClipboard=!1),e.target.href&&RightMenus.urlRegx.test(e.target.href)&&(g.isLink=!0,g.linkUrl=e.target.href),e.target.currentSrc&&RightMenus.urlRegx.test(e.target.currentSrc)&&(g.isMediaLink=!0,g.mediaLinkUrl=e.target.currentSrc),g.isMediaLink&&RightMenus.imgRegx.test(g.mediaLinkUrl)&&(g.isImage=!0),document.querySelector("article.post")&&(g.isArticle=!0,g.pathName=window.location.pathname),document.querySelector("article.wiki")&&(g.isWiki=!0);var n=c.findParent(e.target,"fullscreen-access","body-wrapper");g.FS.target=n,g.FS.eventFunc=null,g.FS.nextCallback=null,n?(g.FS.isAccess=!0,n.classList.contains("mermaid")?g.FS.eventFunc=e=>{var t=g.FS.target.cloneNode(!0);e.appendChild(t),t.removeAttribute("data-processed"),t.innerHTML=t.getAttribute("data-original-code"),mermaid.run({suppressErrors:!0,nodes:[t]})}:n.classList.contains("echarts-box")&&(g.FS.eventFunc=e=>{var t=document.createElement("div"),e=(t.classList.add("echarts-box","fullscreen-access"),t.innerHTML='<div id="echarts_copy" class="echarts" style="width: 100%; height: 100%;" ></div></div>',e.appendChild(t),t.firstElementChild);echarts_contents.echarts_copy=echarts_contents[n.firstElementChild.id],echarts_render_obverser.observe(e)},g.FS.nextCallback=e=>{echarts.getInstanceByDom(e.firstElementChild).dispose(),e.firstElementChild.classList.remove("drew")})):g.FS.isAccess=!1,stellar.GLOBAL_CONFIG.plugins.aplayer?.enable&&"undefined"!=typeof RightMenuAplayer&&void 0!==RightMenuAplayer.APlayer.player&&(s.options.musicAlwaysShow||"play"===RightMenuAplayer.APlayer.status||"undefined"===RightMenuAplayer.APlayer.status)&&(g.isShowMusic=!0),(g.selectText||g.isInputBox||g.isLink||g.isMediaLink)&&(g.statusCheck=!0)},c.contextmenu=()=>{window.document.oncontextmenu=e=>e.ctrlKey?(c.hideMenu(),!0):(stellar.dom.mask.style.display="block",c.menuPosition(e)),d.oncontextmenu=e=>(e.stopPropagation(),e.preventDefault(),!1),window.removeEventListener("blur",c.hideMenu),window.addEventListener("blur",c.hideMenu),document.body.removeEventListener("click",c.hideMenu),document.body.addEventListener("click",c.hideMenu)},c.mobileMenu=()=>{if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){var t=document.documentElement;{var n=c.contextmenu;let e=0;t.ontouchstart=()=>{e=0,e=setTimeout(()=>{n(),e=0},380)},t.ontouchmove=()=>{clearTimeout(e),e=0},t.ontouchend=()=>{e&&clearTimeout(e)}}}},c.menuEvent=()=>{n.forEach(e=>{let t=e.firstElementChild.getAttribute("data-event");const n=e.firstElementChild.getAttribute("id"),i=e.firstElementChild.getAttribute("data-group");"A"!==e.firstElementChild.nodeName&&e.addEventListener("click",()=>{try{RightMenus.defaultEvent.every(e=>t!==e)?"seletctText"===i?RightMenusFunction[n](g.selectText):"elementCheck"===i?RightMenusFunction[n](g.isLink?g.linkUrl:g.mediaLinkUrl):"elementImage"===i?RightMenusFunction[n](g.mediaLinkUrl):RightMenusFunction[n]():c[t]()}catch(e){"rightMenus"===stellar.GLOBAL_CONFIG.debug&&console.error({id:n,error:e,globalData:g,groupName:i,eventName:t}),RightMenus.messageRightMenu&&hud.message("错误提示",e,{icon:s.options.iconPrefix+" fa-exclamation-square red",time:"15000"})}})}),a&&o&&a&&(e.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerBackward()},o.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerToggle()},a.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerForward()})},c.hideMenu=()=>{d.style.display=null,d.style.left=null,d.style.top=null,stellar.dom.mask.style.display="none"},c.menuNotic=()=>{var e="true"===localStorage.getItem("NoticeRightMenu");RightMenus.messageRightMenu&&!e&&hud.message("右键菜单","唤醒原系统菜单请使用：<kbd>Ctrl</kbd> + <kbd>右键</kbd>",{icon:s.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3},()=>{localStorage.setItem("NoticeRightMenu","true")})},c.copyText=()=>{util.writeClipText(g.selectText).then(()=>{RightMenus.messageRightMenu&&util.messageCopyright()}).catch(e=>{RightMenus.messageRightMenu&&hud.message("系统提示",e,{icon:s.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3})})},c.copyLink=()=>{util.writeClipText(g.linkUrl||g.mediaLinkUrl).then(()=>{RightMenus.messageRightMenu&&util.messageCopyright()}).catch(e=>{RightMenus.messageRightMenu&&hud.message("系统提示",e,{icon:s.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3})})},c.copyAll=()=>{g.mouseEvent.target.select()},c.copyPaste=async()=>{var e=await RightMenus.readClipboard()||"";RightMenus.messageRightMenu&&!1===window.clipboardRead?hud.message("系统提示","未授予剪切板读取权限！"):RightMenus.messageRightMenu&&""===e?hud.message("系统提示","仅支持复制文本内容！"):RightMenus.insertAtCaret(g.mouseEvent.target,e)},c.copyCut=()=>{var e=g.mouseEvent.target.selectionStart,t=g.mouseEvent.target.selectionEnd,n=g.inputValue;c.copyText(g.selectText),g.mouseEvent.target.value=n.substring(0,e)+n.substring(t,n.length),g.mouseEvent.target.selectionStart=e,g.mouseEvent.target.selectionEnd=e,g.mouseEvent.target.focus()},c.copyImg=()=>{stellar.GLOBAL_CONFIG.plugins.message.rightmenu.notice&&hud.message("系统提示","复制中，请等待。",{icon:s.options.iconPrefix+" fa-images"}),RightMenus.writeClipImg(g.mediaLinkUrl,e=>{RightMenus.messageRightMenu&&(stellarApp.hideMessage(),hud.message("系统提示","图片复制成功！",{icon:s.options.iconPrefix+" fa-images"}))},e=>{console.error(e),RightMenus.messageRightMenu&&(stellarApp.hideMessage(),hud.message("系统提示","复制失败："+e,{icon:s.options.iconPrefix+" fa-exclamation-square red",time:9e3}))})},c.printMode=()=>{window.location.pathname===g.pathName&&(RightMenus.messageRightMenu?stellarApp.question("",'是否打印当前页面？<br><em style="font-size: 80%">建议打印时勾选背景图形</em><br>',{time:9e3},()=>{c.printHtml()}):c.printHtml())},c.printHtml=()=>{stellar.isReadModel&&c.readMode(),DOMController.setAttribute("details","open","true"),DOMController.removeList([".cus-article-bkg",".iziToast-overlay",".iziToast-wrapper","#read-next","footer","#l_header","#l_cover",".l_left","#comments","#s-top","#BKG","#rightmenu-wrapper",".nav-tabs",".parallax-mirror",".new-meta-item.share",".new-meta-box","button.btn-copy","iframe"]),DOMController.setStyleList([["body","backgroundColor","unset"],[".l_main, .copyright.license","width","100%"],[".post","boxShadow","none"],[".post","background","none"],[".post","padding","0"],["h1","textAlign","center"],["h1","fontWeight","600"],["h1","fontSize","2rem"],["h1","marginBottom","20px"],[".tab-pane","display","block"],[".tab-content","borderTop","none"],[".highlight>table pre","whiteSpace","pre-wrap"],[".highlight>table pre","wordBreak","break-all"],[".fancybox img","height","auto"],[".fancybox img","weight","auto"],[".copyright.license","margin","0"],[".copyright.license","padding","1.25em 20px"],["figure.highlight, .copyright.license","display","inline-block"]]),setTimeout(()=>{window.print(),document.body.innerHTML="",window.location.reload()},50)},c.readMode=()=>{DOMController.setStyle("#l_header","opacity",0),DOMController.fadeToggleList([document.querySelector("#l_cover"),document.querySelector("footer"),document.querySelector("#s-top"),document.querySelector(".article-meta#bottom"),document.querySelector("#read-next"),document.querySelector(".l_left"),document.querySelector("#comments")]),DOMController.toggleClassList([[document.querySelector(".l_main"),"common_read"],[document.querySelector(".l_main"),"common_read_main"],[document.querySelector("#l_body"),"common_read"],[document.querySelector("#safearea"),"common_read"],[document.querySelector("#read_bkg"),"common_read_hide"],[document.querySelector("h1"),"common_read_h1"],[document.querySelector(".post"),"post_read"],[document.querySelector("#l_cover"),"read_cover"],[document.querySelector(".widget.toc-wrapper"),"post_read"]]),DOMController.setStyle(".copyright.license","margin","15px 0"),stellar.isReadModel=void 0===stellar.isReadModel||!stellar.isReadModel,stellar.isReadModel?(RightMenus.messageRightMenu&&hud.message("系统提示","阅读模式已开启，您可以点击屏幕空白处退出。",{backgroundColor:"var(--block)",icon:s.options.iconPrefix+" fa-book-reader PETERRIVE",displayMode:1,time:5e3}),document.querySelector("#l_body").removeEventListener("click",c.readMode),document.querySelector("#l_body").addEventListener("click",e=>{DOMController.hasClass(e.target,"common_read")&&c.readMode()})):(document.querySelector("#l_body").removeEventListener("click",c.readMode),document.querySelector(".post").removeEventListener("click",c.readMode),DOMController.setStyle("#read-next","display","flex"),DOMController.setStyle(".copyright.license","margin","15px -40px"),DOMController.setStyle("#l_header","opacity","unset"))},c.prev=()=>{var e=document.querySelector("#read-next .body #prev.active");e&&(window.location.href=e.href)},c.next=()=>{var e=document.querySelector("#read-next .body #next.active");e&&(window.location.href=e.href)},c.findParent=(e,t,n)=>{for(;!e.classList.contains(t);){if(!e.parentElement||e.classList.contains(n))return null;e=e.parentElement}return e},c.toFullscreen=()=>{var o=g.FS.target;l?stellar.requestAnimationFrame(()=>{var e=g.FS.oldTarget,t=g.FS.eventFunc,n=g.FS.callback,i=g.FS.nextCallback,r=(document.querySelector(".fullscreen")?.remove(),document.createElement("div"));r.classList.add("fullscreen"),t?t(r):(t=o.cloneNode(!0),r.appendChild(t)),m.appendChild(r),m.setAttribute("style","overflow:hidden;"),util.animateIn(r,"slide-in .5s"),n&&n(e),g.FS.callback=i}):stellar.requestAnimationFrame(()=>{o.classList.toggle("fullscreen")})},c.toOrign=()=>{var e=g.FS.target;l?stellar.requestAnimationFrame(()=>{m.removeAttribute("style"),util.animateOut(e.parentElement,"slide-out .5s"),g.FS.oldTarget=e}):stellar.requestAnimationFrame(()=>{e.classList.toggle("fullscreen")})},{init:c.initEvent,hideMenu:c.hideMenu,readMode:c.readMode}})(),Object.freeze(RightMenus),stellar.requestAnimationFrame(()=>{"loading"!==document.readyState?RightMenus.initialMenu():document.addEventListener("DOMContentLoaded",function(){RightMenus.initialMenu()})});