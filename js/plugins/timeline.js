const StellarTimeline={reactions:{"+1":"👍","-1":"👎",laugh:"😀",hooray:"🎉",confused:"😕",heart:"💖",rocket:"🚀",eyes:"👀"},color_index:0,Prism:"",dynamicColor:e=>{let i="",s="",n=StellarTimeline.color_index-e.length;e.forEach((e,t)=>{var{r:e,g:r,b:l}=util.hexToRgba(e),e=util.rgbToHsl(e,r,l)["h"],r=`hsl(${e}deg, 55%, 75%)`,l=`hsl(${e}deg, 50%, 40%)`,a=`hsl(${e}deg, 40%, 26%)`,e=`hsl(${e}deg, 60%, 60%)`;i+=`--timeline-label-bg-${n+t}: ${r};--timeline-label-text-color-${n+t}: ${l};`,s+=`--timeline-label-bg-${n+t}: ${a};--timeline-label-text-color-${n+t}: ${e};`});var e=`:root {${i}}@media (prefers-color-scheme: dark) {:root:not([color-scheme]) {${s}}}[color-scheme='dark']{${s}}`,t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e,document.getElementsByTagName("head").item(0).appendChild(t)},requestAPI:(i,s,n)=>{let o=5;!function a(){new Promise((t,e)=>{let r=0,l=setTimeout(()=>{0===r&&(r=2,l=null,e("请求超时"),0==o)&&n()},5e3);fetch(i).then(function(e){if(2!==r&&(clearTimeout(l),t(e),l=null,r=1),e.ok)return e.json();throw new Error("Network response was not ok.")}).then(function(e){o=0,s(e)}).catch(function(e){0<o?(--o,setTimeout(()=>{a()},5e3)):n()})})}()},layoutDiv:r=>{const p=$(r.el)[0];$(p).append('<div class="loading-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></div>'),StellarTimeline.requestAPI(r.api,function(e){$(p).find(".loading-wrap").remove();const n=new URL(r.api).search;var e=e.content||e,o=[],t=p.getAttribute("user"),c=(t&&0<t.length&&(o=t.split(",")),[]),t=p.getAttribute("hide"),d=(t&&0<t.length&&(c=t.split(",")),[]),m=!1;e.forEach((e,t)=>{if(!(e.user&&e.user.login&&0<o.length)||o.includes(e.user.login)){var r='<div class="timenode" index="'+t+'">',l=(r+='<div class="header">',o.length||!e.user||c.includes("user")||(r=(r=(r+='<a class="user-info" href="'+e.user.html_url+'" target="_blank" rel="external nofollow noopener noreferrer">')+'<img src="'+e.user.avatar_url+'">')+"<span>"+e.user.login+"</span></a>"),new Date(e.created_at)),r=(r+="<p>"+l.toLocaleString()+"</p>")+"</div>"+'<div class="body">';if(c.includes("title")||(r=(r=(r+='<p class="title">')+'<a href="'+e.html_url+'" target="_blank" rel="external nofollow noopener noreferrer">')+(e.title||e.name||e.tag_name)+"</a></p>"),r+=marked.parse(e.body||""),!c.includes("footer")){if(r=r+'<div class="footer">'+'<div class="flex left">',e.labels?e.labels.forEach((e,t)=>{n&&n.includes(encodeURI(e.name))||(r=(r+='<div class="item label '+e.name+`" style="background:var(--timeline-label-bg-${StellarTimeline.color_index});">`)+`<span style="color: var(--timeline-label-text-color-${StellarTimeline.color_index})">`+e.name+"</span></div>",StellarTimeline.color_index++,d.push(e.color))}):e.zipball_url&&(r=(r+='<a class="item download" href="'+e.zipball_url+'" target="_blank" rel="external nofollow noopener noreferrer">')+"<span>📦 "+e.tag_name+".zip</span></a>"),r=r+"</div>"+'<div class="flex right">',e.reactions&&0<e.reactions.total_count)for(var a of Object.keys(StellarTimeline.reactions))0<e.reactions[a]&&(r=(r+='<div class="item reaction '+a+'">')+"<span>"+StellarTimeline.reactions[a]+" "+e.reactions[a]+"</span></div>");r=(r=null!=e.comments?(r+='<a class="item comments last" href="'+e.html_url+'#issuecomment-new" target="_blank" rel="external nofollow noopener noreferrer">')+'<span><svg t="1666270368054" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2528" width="200" height="200"><path d="M952 64H72C32.3 64 0 96.3 0 136v508c0 39.7 32.3 72 72 72h261l128 128c14 14 32.5 21.1 50.9 21.1s36.9-7 50.9-21.1l128-128h261c39.7 0 72-32.3 72-72V136c0.2-39.7-32.1-72-71.8-72zM222 462c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z m290-7.7c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.2 72-72 72z m290 8c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.2 72-72 72z" p-id="2529"></path></svg> '+(e.comments||0)+"</span></a>":r)+"</div>"+"</div>"}r=r+"</div>"+"</div>",$(p).append(r);for(var i=$(p).find("pre"),t=0;t<i.length;++t){var s=i[t].querySelector("code");!i[t].classList.length&&s&&i[t].classList.add("timeline-pre-has-code"),s&&(i[t].classList.add(s.classList[0]),m=m||!0)}}}),d&&StellarTimeline.dynamicColor(d),m&&(Prism?(Prism.highlightAllUnder($(p)[0]),Prism.plugins.toolbar||(async()=>{await stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.prism_js.replace("prism.min.js","plugins/toolbar/prism-toolbar.min.js")),await stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.prism_js.replace("prism.min.js","plugins/show-language/prism-show-language.min.js"))})()):(async()=>{window.Prism=window.Prism||{},window.Prism.manual=!0,await stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.prism_js),await stellar.loadScript(stellar.GLOBAL_CONFIG.config.cdn.prism_autoloader_js),Prism.plugins.autoloader.languages_path=stellar.GLOBAL_CONFIG.config.cdn.prism_js.replace("prism.min.js","components/"),Prism.highlightAllUnder($(p)[0])})())},function(){$(p).find(".loading-wrap svg").remove(),$(p).find(".loading-wrap").append('<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>'),$(p).find(".loading-wrap").addClass("error")})}};function renderTimeline(){for(var e=document.getElementsByClassName("stellar-timeline-api"),t=0;t<e.length;t++){var r,l=e[t],a=l.getAttribute("api");null!=a&&((r=new Object).el=l,r.api=a,StellarTimeline.layoutDiv(r))}}$(function(){renderTimeline()});