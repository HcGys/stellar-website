const RightMenus={defaultEvent:["copyText","copyLink","copyPaste","copyAll","copyCut","copyImg","printMode","readMode","prev","next"],defaultGroup:["navigation","inputBox","seletctText","elementCheck","elementImage","articlePage","prevNext"],messageRightMenu:stellar.GLOBAL_CONFIG.plugins.message.enable&&stellar.GLOBAL_CONFIG.plugins.message.rightmenu.enable,corsAnywhere:stellar.GLOBAL_CONFIG.rightmenu.options.corsAnywhere,urlRegx:/^((https|http)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,imgRegx:/\.(jpe?g|png|webp|svg|gif|jifi)(-|_|!|\?|\/)?.*$/,initialMenu:()=>{RightMenus.fun.init(),RightMenus.fun.hideMenu()},readClipboard:async()=>{let e;switch((await navigator.permissions.query({name:"clipboard-read"})).state){case"granted":case"prompt":e=await navigator.clipboard.readText();break;default:window.clipboardRead=!1}return e},writeClipText:e=>navigator.clipboard.writeText(e).then(()=>Promise.resolve()).catch(e=>Promise.reject(e)),writeClipImg:async(e,n,i)=>{const o=new Image;o.crossOrigin="Anonymous",o.addEventListener("load",()=>{var e=document.createElement("canvas"),t=e.getContext("2d");e.width=o.width,e.height=o.height,t.drawImage(o,0,0),e.toBlob(e=>{navigator.clipboard.write([new ClipboardItem({"image/png":e})]).then(e=>{n(e)}).catch(e=>{i(e)})},"image/png")},!1),o.src=e+"?(lll￢ω￢)~~"},insertAtCaret:(e,t)=>{var n,i=e.selectionStart,o=e.selectionEnd;document.selection?(e.focus(),document.selection.createRange().text=t,e.focus()):i||"0"==i?(n=e.scrollTop,e.value=e.value.substring(0,i)+t+e.value.substring(o,e.value.length),e.focus(),e.selectionStart=i+t.length,e.selectionEnd=i+t.length,e.scrollTop=n):(e.value+=t,e.focus())}};RightMenus.fun=(()=>{const s=stellar.GLOBAL_CONFIG.rightmenu,c={},d=document.getElementById("rightmenu-wrapper"),u=document.getElementById("rightmenu-content"),n=document.querySelectorAll("#rightmenu-content li.menuLoad-Content"),i=document.querySelectorAll("#rightmenu-content li, #rightmenu-content hr, #menuMusic"),t=document.getElementById("read_bkg"),o=document.getElementById("menuMusic"),e=document.querySelector("#menuMusic .backward"),r=document.querySelector("#menuMusic .toggle"),a=document.querySelector("#menuMusic .forward");let m={mouseEvent:null,isInputBox:!1,selectText:"",inputValue:"",isLink:!1,linkUrl:"",isMediaLink:!1,mediaLinkUrl:"",isImage:!1,isArticle:!1,isWiki:!1,pathName:"",isReadClipboard:!0,isShowMusic:!1,statusCheck:!1};const l=Object.assign({},m);return c.initEvent=()=>{c.elementAppend(),c.setMask(),c.contextmenu(),c.mobileMenu(),c.menuEvent()},c.elementAppend=()=>{t&&t.parentNode.removeChild(t);var e=document.createElement("div");e.className="common_read_bkg common_read_hide",e.id="read_bkg",window.document.body.appendChild(e)},c.menuPosition=e=>{try{var t=e.clientX,n=e.clientY,i=document.documentElement.clientWidth||document.body.clientWidth,o=document.documentElement.clientHeight||document.body.clientHeight,r=(d.style.display="block",c.menuControl(e),u.offsetWidth),a=u.offsetHeight,l=i<t+r?t-r+10:t,s=o<n+a?n-a+10:n,s=o<n+a&&s<a&&n<a?s+(o-a-s-10):s;d.style.left=l+"px",d.style.top=s+"px",stellar.GLOBAL_CONFIG.plugins.message.rightmenu.notice&&c.menuNotic()}catch(e){return console.error(e),c.hideMenu(),!0}return!1},c.menuControl=e=>{c.globalDataSet(e),o&&(o.style.display=m.isShowMusic?"block":"none"),n.forEach(e=>{e.style.display="none";var t=e.firstElementChild.nodeName;const n=e.firstElementChild.getAttribute("data-group");var i,o,r,a,l=e.firstElementChild.getAttribute("data-event");if(m.statusCheck||m.isArticle||m.isWiki)switch(n){case"inputBox":m.isInputBox&&(e.style.display="block","copyCut"!==l||m.selectText||(e.style.display="none"),"copyAll"!==l||m.inputValue||(e.style.display="none"),"copyPaste"!==l||m.isReadClipboard||(e.style.display="none"));break;case"seletctText":m.selectText&&(e.style.display="block");break;case"elementCheck":(m.isLink||m.isMediaLink)&&(e.style.display="block");break;case"elementImage":m.isImage&&(e.style.display="block");break;case"articlePage":m.isArticle&&(e.style.display="block");break;case"prevNext":(m.isArticle||m.isWiki)&&(i=document.querySelector("#read-next .body #prev a"),o=document.querySelector("#read-next .body #next a"),r=document.querySelector(".menuLoad-Content #prev"),a=document.querySelector(".menuLoad-Content #next"),r.parentElement.style.display=i?"block":"none",a.parentElement.style.display=o?"block":"none");break;default:e.style.display="A"!==t||(m.isArticle||m.isWiki)&&!m.statusCheck&&s.options.articleShowLink?"block":"none"}else"A"!==t&&!RightMenus.defaultGroup.every(e=>n!==e)||(e.style.display="block")}),stellar.mouseEvent=e,stellar.rightmenu.method.handle.start();let t={item:null,hide:!0};i.forEach(e=>{"HR"===e.nodeName?(e.style.display="block",t.item?(!t.hide&&"hr"!==t.item.nextElementSibling.nodeName||(t.item.style.display="none"),t.item=e,t.hide=!0):t.item=e):"block"===e.style.display&&t.hide&&(t.hide=!1)}),t.item&&t.hide&&(t.item.style.display="none")},c.globalDataSet=e=>{(m=Object.assign({},l)).mouseEvent=e,m.selectText=window.getSelection().toString(),"input"!==e.target.tagName.toLowerCase()&&"textarea"!==e.target.tagName.toLowerCase()||(m.isInputBox=!0,m.inputValue=e.target.value),m.isInputBox&&!1===window.clipboardRead&&(m.isReadClipboard=!1),e.target.href&&RightMenus.urlRegx.test(e.target.href)&&(m.isLink=!0,m.linkUrl=e.target.href),e.target.currentSrc&&RightMenus.urlRegx.test(e.target.currentSrc)&&(m.isMediaLink=!0,m.mediaLinkUrl=e.target.currentSrc),m.isMediaLink&&RightMenus.imgRegx.test(m.mediaLinkUrl)&&(m.isImage=!0),document.querySelector("article.post")&&(m.isArticle=!0,m.pathName=window.location.pathname),document.querySelector("article.wiki")&&(m.isWiki=!0),stellar.GLOBAL_CONFIG.plugins.aplayer?.enable&&"undefined"!=typeof RightMenuAplayer&&void 0!==RightMenuAplayer.APlayer.player&&(s.options.musicAlwaysShow||"play"===RightMenuAplayer.APlayer.status||"undefined"===RightMenuAplayer.APlayer.status)&&(m.isShowMusic=!0),(m.selectText||m.isInputBox||m.isLink||m.isMediaLink)&&(m.statusCheck=!0)},c.contextmenu=()=>{window.document.oncontextmenu=e=>e.ctrlKey?(c.hideMenu(),!0):(document.querySelector(".rmMask").style.display="flex",c.menuPosition(e)),d.oncontextmenu=e=>(e.stopPropagation(),e.preventDefault(),!1),window.removeEventListener("blur",c.hideMenu),window.addEventListener("blur",c.hideMenu),document.body.removeEventListener("click",c.hideMenu),document.body.addEventListener("click",c.hideMenu)},c.mobileMenu=()=>{if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){var t=document.documentElement;{var n=c.contextmenu;let e=0;t.ontouchstart=()=>{e=0,e=setTimeout(()=>{n(),e=0},380)},t.ontouchmove=()=>{clearTimeout(e),e=0},t.ontouchend=()=>{e&&clearTimeout(e)}}}},c.setMask=()=>{(mask=document.createElement("div")).className="rmMask",mask.style.width=window.innerWidth+"px",mask.style.height=window.innerHeight+"px",mask.style.background="#fff",mask.style.opacity=".0",mask.style.position="fixed",mask.style.top="0",mask.style.left="0",mask.style.zIndex=998,mask.style.display="none",document.body.appendChild(mask),document.getElementById("rightmenu-wrapper").style.zIndex=19198,window.onresize(()=>{mask.style.width=window.innerWidth+"px",mask.style.height=window.innerHeight+"px"})},c.menuEvent=()=>{n.forEach(e=>{let t=e.firstElementChild.getAttribute("data-event");const n=e.firstElementChild.getAttribute("id"),i=e.firstElementChild.getAttribute("data-group");"A"!==e.firstElementChild.nodeName&&e.addEventListener("click",()=>{try{RightMenus.defaultEvent.every(e=>t!==e)?"seletctText"===i?RightMenusFunction[n](m.selectText):"elementCheck"===i?RightMenusFunction[n](m.isLink?m.linkUrl:m.mediaLinkUrl):"elementImage"===i?RightMenusFunction[n](m.mediaLinkUrl):RightMenusFunction[n]():c[t]()}catch(e){"rightMenus"===stellar.GLOBAL_CONFIG.debug&&console.error({id:n,error:e,globalData:m,groupName:i,eventName:t}),RightMenus.messageRightMenu&&hud.message("错误提示",e,{icon:s.options.iconPrefix+" fa-exclamation-square red",time:"15000"})}})}),a&&r&&a&&(e.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerBackward()},r.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerToggle()},a.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerForward()})},c.hideMenu=()=>{d.style.display=null,d.style.left=null,d.style.top=null,document.querySelector(".rmMask").style.display="none"},c.menuNotic=()=>{var e="true"===localStorage.getItem("NoticeRightMenu");RightMenus.messageRightMenu&&!e&&hud.message("右键菜单","唤醒原系统菜单请使用：<kbd>Ctrl</kbd> + <kbd>右键</kbd>",{icon:s.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3},()=>{localStorage.setItem("NoticeRightMenu","true")})},c.copyText=()=>{util.utilWriteClipText(m.selectText).then(()=>{RightMenus.messageRightMenu&&util.messageCopyright()}).catch(e=>{RightMenus.messageRightMenu&&hud.message("系统提示",e,{icon:s.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3})})},c.copyLink=()=>{util.utilWriteClipText(m.linkUrl||m.mediaLinkUrl).then(()=>{RightMenus.messageRightMenu&&util.messageCopyright()}).catch(e=>{RightMenus.messageRightMenu&&hud.message("系统提示",e,{icon:s.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3})})},c.copyAll=()=>{m.mouseEvent.target.select()},c.copyPaste=async()=>{var e=await RightMenus.readClipboard()||"";RightMenus.messageRightMenu&&!1===window.clipboardRead?hud.message("系统提示","未授予剪切板读取权限！"):RightMenus.messageRightMenu&&""===e?hud.message("系统提示","仅支持复制文本内容！"):RightMenus.insertAtCaret(m.mouseEvent.target,e)},c.copyCut=()=>{var e=m.mouseEvent.target.selectionStart,t=m.mouseEvent.target.selectionEnd,n=m.inputValue;c.copyText(m.selectText),m.mouseEvent.target.value=n.substring(0,e)+n.substring(t,n.length),m.mouseEvent.target.selectionStart=e,m.mouseEvent.target.selectionEnd=e,m.mouseEvent.target.focus()},c.copyImg=()=>{stellar.GLOBAL_CONFIG.plugins.message.rightmenu.notice&&hud.message("系统提示","复制中，请等待。",{icon:s.options.iconPrefix+" fa-images"}),RightMenus.writeClipImg(m.mediaLinkUrl,e=>{RightMenus.messageRightMenu&&(stellarApp.hideMessage(),hud.message("系统提示","图片复制成功！",{icon:s.options.iconPrefix+" fa-images"}))},e=>{console.error(e),RightMenus.messageRightMenu&&(stellarApp.hideMessage(),hud.message("系统提示","复制失败："+e,{icon:s.options.iconPrefix+" fa-exclamation-square red",time:9e3}))})},c.printMode=()=>{window.location.pathname===m.pathName&&(RightMenus.messageRightMenu?stellarApp.question("",'是否打印当前页面？<br><em style="font-size: 80%">建议打印时勾选背景图形</em><br>',{time:9e3},()=>{c.printHtml()}):c.printHtml())},c.printHtml=()=>{stellar.isReadModel&&c.readMode(),DOMController.setAttribute("details","open","true"),DOMController.removeList([".cus-article-bkg",".iziToast-overlay",".iziToast-wrapper",".prev-next","footer","#l_header","#l_cover","#l_side","#comments","#s-top","#BKG","#rightmenu-wrapper",".nav-tabs",".parallax-mirror",".new-meta-item.share",".new-meta-box","button.btn-copy","iframe"]),DOMController.setStyleList([["body","backgroundColor","unset"],["#l_main, .copyright.license","width","100%"],["#post","boxShadow","none"],["#post","background","none"],["#post","padding","0"],["h1","textAlign","center"],["h1","fontWeight","600"],["h1","fontSize","2rem"],["h1","marginBottom","20px"],[".tab-pane","display","block"],[".tab-content","borderTop","none"],[".highlight>table pre","whiteSpace","pre-wrap"],[".highlight>table pre","wordBreak","break-all"],[".fancybox img","height","auto"],[".fancybox img","weight","auto"],[".copyright.license","margin","0"],[".copyright.license","padding","1.25em 20px"],["figure.highlight, .copyright.license","display","inline-block"]]),setTimeout(()=>{window.print(),document.body.innerHTML="",window.location.reload()},50)},c.readMode=()=>{"function"==typeof ScrollReveal&&ScrollReveal().clean("#comments"),DOMController.setStyle("#l_header","opacity",0),DOMController.fadeToggleList([document.querySelector("#l_cover"),document.querySelector("footer"),document.querySelector("#s-top"),document.querySelector(".article-meta#bottom"),document.querySelector(".prev-next"),document.querySelector("#l_side"),document.querySelector("#comments")]),DOMController.toggleClassList([[document.querySelector("#l_main"),"common_read"],[document.querySelector("#l_main"),"common_read_main"],[document.querySelector("#l_body"),"common_read"],[document.querySelector("#safearea"),"common_read"],[document.querySelector("#pjax-container"),"common_read"],[document.querySelector("#read_bkg"),"common_read_hide"],[document.querySelector("h1"),"common_read_h1"],[document.querySelector("#post"),"post_read"],[document.querySelector("#l_cover"),"read_cover"],[document.querySelector(".widget.toc-wrapper"),"post_read"]]),DOMController.setStyle(".copyright.license","margin","15px 0"),stellar.isReadModel=void 0===stellar.isReadModel||!stellar.isReadModel,stellar.isReadModel?(RightMenus.messageRightMenu&&hud.message("系统提示","阅读模式已开启，您可以点击屏幕空白处退出。",{backgroundColor:"var(--color-read-post)",icon:s.options.iconPrefix+" fa-book-reader",displayMode:1,time:5e3}),document.querySelector("#l_body").removeEventListener("click",c.readMode),document.querySelector("#l_body").addEventListener("click",e=>{DOMController.hasClass(e.target,"common_read")&&c.readMode()})):(document.querySelector("#l_body").removeEventListener("click",c.readMode),document.querySelector("#post").removeEventListener("click",c.readMode),DOMController.setStyle(".prev-next","display","flex"),DOMController.setStyle(".copyright.license","margin","15px -40px"),DOMController.setStyle("#l_header","opacity","unset"))},c.prev=()=>{var e=document.querySelector("#read-next .body #prev a");e&&("undefined"!=typeof pjax?pjax.loadUrl(e.href):window.location.href=e.href)},c.next=()=>{var e=document.querySelector("#read-next .body #next a");e&&("undefined"!=typeof pjax?pjax.loadUrl(e.href):window.location.href=e.href)},{init:c.initEvent,hideMenu:c.hideMenu,readMode:c.readMode}})(),Object.freeze(RightMenus),stellar.requestAnimationFrame(()=>{"loading"!==document.readyState?RightMenus.initialMenu():document.addEventListener("DOMContentLoaded",function(){RightMenus.initialMenu()})});