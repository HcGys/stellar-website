function createVoiceDom(r){for(let s=0;s<r.length;++s){let e=r[s];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),i=t.querySelector(".play-btn"),n=t.querySelector(".voice-seconds"),l;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{l=createCssStyle(e,t,n,s)}):l=createCssStyle(e,t,n,s),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",i.style.display="flex",e.currentTime=0,l.classList.remove("active")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",i.style.display="flex",e.currentTime=0,l.classList.remove("active")):(e.play(),a.style.display="flex",i.style.display="none",l.classList.add("active"))})}}function createCssStyle(e,t,a,i){var e=e.duration,n=Math.floor(e),l=25<n+2?25:n+2,s=(a.innerHTML=`${99<n?"..":n}"`,25<n+2&&(t.style.width="100%"),document.createElement("div"));s.className="voice-wave voice-wave-"+(i+1);for(let e=0;e<l;e++){var r=document.createElement("span");r.className="voice-wave-item",s.append(r)}t.insertBefore(s,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${i+1}::before {
        position: absolute;
        top: -10%;
        left: 0;
        height: 120%;
        width: 1px;
        background: var(--text-p2);
        content: "";
        opacity: 0;
        transition: left ${e}s linear;
        -moz-transition: left ${e}s linear;
        -webkit-transition: left ${e}s linear;
        -o-transition: left ${e}s linear;
    }
    `;for(let e=0;e<l;++e)o+=`
        .voice-wave-${i+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(a),s}