function createVoiceDom(r){for(let n=0;n<r.length;++n){let e=r[n];e.loop=!1;e.currentTime;let t=e.parentElement,a=t.querySelector(".pause-btn"),s=t.querySelector(".play-btn"),i=t.querySelector(".voice-seconds"),l;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{l=createCssStyle(e,t,i,n)}):l=createCssStyle(e,t,i,n),e.addEventListener("ended",()=>{e.pause(),a.style.display="none",s.style.display="flex",e.currentTime=0,l.classList.remove("active"),l.classList.add("back")}),t.addEventListener("click",()=>{"flex"===a.style.display?(e.pause(),a.style.display="none",s.style.display="flex",e.currentTime=0,l.classList.remove("active"),l.classList.add("back")):(e.play(),a.style.display="flex",s.style.display="none",l.classList.add("active"),l.classList.remove("back"))})}}function createCssStyle(e,t,a,s){var e=e.duration,i=Math.floor(e),l=25<i+2?25:i+2,n=(a.innerHTML=`${99<i?"..":i}"`,25<i+2&&(t.style.width="100%"),document.createElement("div"));n.className="voice-wave voice-wave-"+(s+1);for(let e=0;e<l;e++){var r=document.createElement("span");r.className="voice-wave-item",n.append(r)}t.insertBefore(n,t.querySelector(".voice-metas"));let c=`
    .voice-wave.voice-wave-${s+1}::before {
        transition: left ${e}s linear;
        -moz-transition: left ${e}s linear;
        -webkit-transition: left ${e}s linear;
        -o-transition: left ${e}s linear;
    }
    `;for(let e=0;e<l;++e)c+=`
        .voice-wave-${s+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;a=document.createElement("style");return a.setAttribute("type","text/css"),a.innerHTML=c,document.getElementsByTagName("head").item(0).appendChild(a),n}