function createVoiceDom(r){for(let s=0;s<r.length;++s){let e=r[s];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),n=t.querySelector(".play-btn"),i=t.querySelector(".voice-seconds"),l;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{l=createCssStyle(e,t,i,s)}):l=createCssStyle(e,t,i,s),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0,l.classList.remove("active")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0,l.classList.remove("active")):(e.play(),a.style.display="flex",n.style.display="none",l.classList.add("active"))})}}function createCssStyle(e,t,a,n){var e=e.duration,i=Math.floor(e),l=25<i+2?25:i+2,s=(a.innerHTML=`${99<i?"..":i}"`,25<i+2&&(t.style.width="100%"),document.createElement("div"));s.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<l;e++){var r=document.createElement("span");r.className="voice-wave-item",s.append(r)}t.insertBefore(s,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${n+1}::before {
        transition: left ${e}s linear;
        -moz-transition: left ${e}s linear;
        -webkit-transition: left ${e}s linear;
        -o-transition: left ${e}s linear;
    }
    `;for(let e=0;e<l;++e)o+=`
        .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(a),s}