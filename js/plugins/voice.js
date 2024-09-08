function createVoiceDom(l){for(let o=0;o<l.length;++o){let e=l[o];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),s=t.querySelector(".play-btn"),i=t.querySelector(".voice-seconds"),n;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{n=createCssStyle(e,t,i,o)}):n=createCssStyle(e,t,i,o),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",s.style.display="flex",e.currentTime=0,n.classList.remove("active")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",s.style.display="flex",e.currentTime=0,n.classList.remove("active")):(e.play(),a.style.display="flex",s.style.display="none",n.classList.add("active"))})}}function createCssStyle(e,t,a,s){var e=e.duration,i=Math.floor(e),n=25<i+2?25:i+2,o=(a.innerHTML=`${99<i?"..":i}"`,25<i+2&&(t.style.width="100%"),document.createElement("div"));o.className="voice-wave voice-wave-"+(s+1);for(let e=0;e<n;e++){var l=document.createElement("span");l.className="voice-wave-item",o.append(l)}t.insertBefore(o,t.querySelector(".voice-metas"));let r=`
    .voice-wave.voice-wave-${s+1}::before {
        position: absolute;
        top: -10%;
        left: 0;
        height: 120%;
        width: 1px;
        background: var(--text-p2);
        content: "";
        opacity: 0;
        transition: left ${e}s ease-out;
        -moz-transition: left ${e}s ease-out;
        -webkit-transition: left ${e}s ease-out;
        -o-transition: left ${e}s ease-out;
    }
    `;for(let e=0;e<n;++e)r+=`
        .voice-wave-${s+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=r,document.getElementsByTagName("head").item(0).appendChild(a),o}