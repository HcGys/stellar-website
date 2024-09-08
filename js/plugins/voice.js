function createVoiceDom(s){for(let l=0;l<s.length;++l){let e=s[l];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),n=t.querySelector(".play-btn"),i=t.querySelector(".voice-seconds");e.addEventListener("ended",()=>{e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0,t.classList.remove("active")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0,t.classList.remove("active")):(e.play(),a.style.display="flex",n.style.display="none",t.classList.add("active"))}),isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{createCssStyle(e,t,i,l)}):createCssStyle(e,t,i,l)}}function createCssStyle(e,t,a,n){var e=e.duration,i=Math.floor(e),l=25<i+2?25:i+2,s=(a.innerHTML=`${99<i?"..":i}"`,25<i+2&&(t.style.width="100%"),document.createElement("div"));s.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<l;e++){var o=document.createElement("span");o.className="voice-wave-item",s.append(o)}t.insertBefore(s,t.querySelector(".voice-metas"));let r=`
    .voice-wave.voice-wave-${n+1}::before {
        position: absolute;
        top: -10%;
        left: 0;
        height: 120%;
        width: 1px;
        background: var(--text-p2);
        content: "";
        display: "none";
        transition: all ${e} ease-out
        -moz-transition: all ${e} ease-out
        -webkit-transition: all ${e} ease-out
        -o-transition: all ${e} ease-out
    }
    `;for(let e=0;e<l;++e)r+=`
        .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=r,document.getElementsByTagName("head").item(0).appendChild(a)}