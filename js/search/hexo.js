let SearchService=(()=>{const d={queryText:null,data:null};return d.template=`<div id="u-search">
  <div class="modal">
    <header class="modal-header" class="clearfix">
      <form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm">
        <input type="text" id="u-search-modal-input" class="u-search-input" />
        <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit">
          <span class="fa-solid fa-search"></span>
        </button>
      </form>
      <a id="u-search-btn-close" class="btn-close"> <span class="fa-solid fa-times"></span> </a>
    </header>
    <main class="modal-body">
      <ul class="modal-results"></ul>
    </main>
  </div>
  <div id="modal-overlay" class="modal-overlay"></div>
</div>
`,d.init=()=>{var e=document.createElement("div");e.innerHTML+=d.template,document.body.append(e),document.querySelectorAll(".u-search-form").forEach(e=>{e.addEventListener("submit",d.onSubmit,!1)}),document.querySelector("#u-search-modal-input").addEventListener("input",d.onSubmit),document.querySelector("#u-search-btn-close").addEventListener("click",d.close,!1),document.querySelector("#modal-overlay").addEventListener("click",d.close,!1)},d.onSubmit=e=>{e.preventDefault();var t=e.target.querySelector(".u-search-input");d.queryText=(t||e.target).value,d.queryText&&d.search()},d.search=async()=>{document.querySelectorAll(".u-search-input").forEach(e=>{e.value=d.queryText}),document.querySelector("#u-search").style.display="block",d.data||(d.data=await d.fetchData());let e="";""===(e=(e+=d.buildResultList(d.data.pages))+d.buildResultList(d.data.posts))&&(e=`<div id="resule-hits-empty"><i class="fa-solid fa-box-open"></i><p>${stellar.GLOBAL_CONFIG.languages.search.hits_empty.replace(/\$\{query}/,d.queryText)}</p></div>`),document.querySelector("#u-search .modal-results").innerHTML=e,window.pjax&&pjax.refresh(document.querySelector("#u-search")),document.addEventListener("keydown",function e(t){"Escape"===t.code&&(d.close(),document.removeEventListener("keydown",e))})},d.close=()=>{document.querySelector("#u-search").style.display="none"},d.fetchData=()=>fetch(stellar.GLOBAL_CONFIG.search.dataPath).then(e=>e.text()).then(e=>{return JSON.parse(e)}),d.buildResultList=e=>{let t="";return e.forEach(e=>{e.text&&(e.text=e.text.replace(/12345\d*/g,"")),!e.title&&e.text&&(e.title=e.text.trim().slice(0,15)),d.contentSearch(e)&&(t+=d.buildResult(e.permalink,e.title,e.digest))}),t},d.contentSearch=r=>{let a=r.title.trim().toLowerCase(),s=r.text.trim().toLowerCase(),l=d.queryText.trim().toLowerCase().split(/[-\s]+/),i=!1,n,c=-1,u=-1;return a&&s&&l.forEach((t,e)=>{if(n=a.indexOf(t),c=s.indexOf(t),n<0&&c<0?i=!1:(i=!0,c<0&&(c=0),0===e&&(u=c)),i){s=r.text.trim();let e=0;if(0<=u){t=Math.max(u-40,0),e=0===t?Math.min(200,s.length):Math.min(u+120,s.length);let a=s.substring(t,e);l.forEach(function(e){var t=new RegExp(e,"gi");a=a.replace(t,"<b mark>"+e+"</b>")}),r.digest=a+"......"}else e=Math.min(200,s.length),r.digest=s.trim().substring(0,e)}}),i},d.buildResult=(e,t,a)=>{e=d.getUrlRelativePath(e);let r="";return r=(r+="<li>")+("<a class='result' href='"+e+"?keyword="+d.queryText+"'>")+("<span class='title'>"+t+"</span>"),""!==a&&(r+="<span class='digest'>"+a+"</span>"),r=r+"</a>"+"</li>"},d.getUrlRelativePath=function(e){var e=e.split("//"),t=e[1].indexOf("/");let a=e[1].substring(t);return a=-1!=a.indexOf("?")?a.split("?")[0]:a},{init:()=>{d.init()},setQueryText:e=>{d.queryText=e},search:()=>{d.search()}}})();Object.freeze(SearchService),SearchService.init(),document.addEventListener("pjax:success",SearchService.init),document.addEventListener("pjax:send",function(){document.querySelector("#u-search").style.display="none"});