const GitHubInfo={requestAPI:(r,u,a)=>{let l=5;!function i(){new Promise((e,t)=>{let n=0,o=setTimeout(()=>{0===n&&(n=2,o=null,t("请求超时"),0==l)&&a()},5e3);fetch(r).then(function(t){if(2!==n&&(clearTimeout(o),e(t),o=null,n=1),t.ok)return t.json();throw new Error("Network response was not ok.")}).then(function(t){l=0,u(t)}).catch(function(t){0<l?(--l,setTimeout(()=>{i()},5e3)):a()})})}()},layout:t=>{const i=$(t.el)[0];function r(t){for(var e of Object.keys(t))$(i).find("[type=text]#"+e).text(t[e]),$(i).find("[type=link]#"+e).attr("href",t[e]),$(i).find("[type=img]#"+e).attr("src",t[e])}GitHubInfo.requestAPI(t.api,function(t){var e,n,o=i.getAttribute("index");null!=o?(e=t.content||t)&&e.length>o&&((n=e[o])["latest-tag-name"]=n.name,r(e[o])):r(t)},function(){})}};function renderGithubInfo(){for(var t=document.getElementsByClassName("stellar-ghinfo-api"),e=0;e<t.length;e++){var n,o=t[e],i=o.getAttribute("api");null!=i&&((n=new Object).el=o,n.api=i,n.class=o.getAttribute("class"),GitHubInfo.layout(n))}}$(renderGithubInfo),document.addEventListener("pjax:complete",function(){renderGithubInfo()});