function createVoiceDom(o){for(let r=0;r<o.length;++r){let e=o[r];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),n=t.querySelector(".play-btn"),s=t.querySelector(".voice-seconds"),i,l=(isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{i=createCssStyle(e,t,s,r)}):i=createCssStyle(e,t,s,r),i.querySelector(".play-line"));e.addEventListener("ended",()=>{e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0,l.classList.remove("active"),l.classList.add("back")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",n.style.display="flex",e.currentTime=0,l.classList.remove("active"),l.classList.add("back")):(e.play(),a.style.display="flex",n.style.display="none",l.classList.add("active"),l.classList.remove("back"))})}}function createCssStyle(e,t,a,n){var e=e.duration,s=Math.floor(e),i=25<s+2?25:s+2,a=(a.innerHTML=`${99<s?"..":s}"`,2*(2*i-1)),l=(25<s+2&&(t.style.width="100%"),document.createElement("div")),s=document.createElement("div");s.className="play-line",l.append(s),l.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<i;e++){var r=document.createElement("span");r.className="voice-wave-item",l.append(r)}t.insertBefore(l,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${n+1}>.play-line {
        transition: transform ${e}s linear;
        -moz-transition: transform ${e}s linear;
        -webkit-transition: transform ${e}s linear;
        -o-transition: transform ${e}s linear;
    }
    .voice-wave.voice-wave-${n+1}>.play-line.active {
        transform: translateX(${a}px);
    }
    `;for(let e=0;e<i;++e)o+=`
        .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;s=document.createElement("style");return s.setAttribute("type","text/css"),s.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(s),l}