function createVoiceDom(r){for(let n=0;n<r.length;++n){let e=r[n];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),i=t.querySelector(".play-btn"),s=t.querySelector(".voice-seconds"),l;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{l=createCssStyle(e,t,s,n)}):l=createCssStyle(e,t,s,n),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",i.style.display="flex",e.currentTime=0,l.classList.remove("active"),l.classList.add("hide-before")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",i.style.display="flex",e.currentTime=0,l.classList.remove("active"),l.classList.add("hide-before")):(e.play(),a.style.display="flex",i.style.display="none",l.classList.remove("hide-before"),l.classList.add("active"))})}}function createCssStyle(e,t,a,i){var e=e.duration,s=Math.floor(e),l=25<s+2?25:s+2,n=(a.innerHTML=`${99<s?"..":s}"`,25<s+2&&(t.style.width="100%"),document.createElement("div"));n.className="voice-wave voice-wave-"+(i+1);for(let e=0;e<l;e++){var r=document.createElement("span");r.className="voice-wave-item",n.append(r)}t.insertBefore(n,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${i+1}::before {
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
        `;a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(a),n}