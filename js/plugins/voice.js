function createVoiceDom(r){for(let l=0;l<r.length;++l){let e=r[l];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),i=t.querySelector(".play-btn"),s=t.querySelector(".voice-seconds"),n;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{n=createCssStyle(e,t,s,l)}):n=createCssStyle(e,t,s,l),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",i.style.display="flex",e.currentTime=0,n.classList.remove("active"),n.classList.add("back")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",i.style.display="flex",e.currentTime=0,n.classList.remove("active"),n.classList.add("back")):(e.play(),a.style.display="flex",i.style.display="none",n.classList.add("active"),n.classList.remove("back"))})}}function createCssStyle(e,t,a,i){var e=e.duration,s=Math.floor(e),n=25<s+2?25:s+2,l=(a.innerHTML=`${99<s?"..":s}"`,25<s+2&&(t.style.width="100%"),document.createElement("div"));l.className="voice-wave voice-wave-"+(i+1);for(let e=0;e<n;e++){var r=document.createElement("span");r.className="voice-wave-item",l.append(r)}t.insertBefore(l,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${i+1}::before {
        transition: left ${e}s linear !important;
        -moz-transition: left ${e}s linear !important;
        -webkit-transition: left ${e}s linear !important;
        -o-transition: left ${e}s linear !important;
    }
    `;for(let e=0;e<n;++e)o+=`
        .voice-wave-${i+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(a),l}