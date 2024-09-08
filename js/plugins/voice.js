function createVoiceDom(o){for(let i=0;i<o.length;++i){let e=o[i];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),n=t.querySelector(".play-btn"),l=t.querySelector(".voice-seconds");e.addEventListener("ended",()=>{e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0):(e.play(),a.style.display="flex",n.style.display="none")}),isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{createCssStyle(e,t,l,i)}):createCssStyle(e,t,l,i)}}function createCssStyle(e,t,a,n){var e=e.duration,e=Math.floor(e),l=25<e+2?25:e+2,i=(a.innerHTML=`${99<e?"..":e}"`,document.createElement("div"));i.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<l;e++){var o=document.createElement("span");o.className="voice-wave-item",i.append(o)}t.insertBefore(i,t.querySelector(".voice-metas"));let r=`
    .voice-wave.voice-wave-${n+1}::before {
        position: absolute;
        top: -10%;
        left: 0;
        height: 120%;
        width: 1px;
        background: var(--text-p1);
        content: "";
    }
    `;for(let e=0;e<l;++e)r+=`
        .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=r,document.getElementsByTagName("head").item(0).appendChild(a)}