function createVoiceDom(r){for(let l=0;l<r.length;++l){let e=r[l];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),s=t.querySelector(".play-btn"),n=t.querySelector(".voice-seconds"),i;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{i=createCssStyle(e,t,n,l)}):i=createCssStyle(e,t,n,l),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",s.style.display="flex",e.currentTime=0,i.classList.remove("active"),i.classList.add("back")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",s.style.display="flex",e.currentTime=0,i.classList.remove("active"),i.classList.add("back")):(e.play(),a.style.display="flex",s.style.display="none",i.classList.add("active"),i.classList.remove("back"))})}}function createCssStyle(e,t,a,s){var e=e.duration,n=Math.floor(e),i=25<n+2?25:n+2,a=(a.innerHTML=`${99<n?"..":n}"`,2*(2*i-1)),l=(25<n+2&&(t.style.width="100%"),document.createElement("div")),n=document.createElement("div");n.className="play-line",l.append(n),l.className="voice-wave voice-wave-"+(s+1);for(let e=0;e<i;e++){var r=document.createElement("span");r.className="voice-wave-item",l.append(r)}t.insertBefore(l,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${s+1}>.play-line {
        transition: transform ${e}s linear;
        -moz-transition: transform ${e}s linear;
        -webkit-transition: transform ${e}s linear;
        -o-transition: transform ${e}s linear;
    }
    .voice-wave.voice-wave-${s+1}>.play-line.active {
        transform: translateX(${a}px);
    }
    `;for(let e=0;e<i;++e)o+=`
        .voice-wave-${s+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(n),l}