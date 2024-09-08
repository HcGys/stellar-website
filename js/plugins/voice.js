function createVoiceDom(s){for(let r=0;r<s.length;++r){let e=s[r];e.loop=!1;e.currentTime;let t=e.parentElement,n=t.querySelector(".pause-btn"),a=t.querySelector(".play-btn"),l=t.querySelector(".voice-seconds"),i;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{i=createCssStyle(e,t,l,r)}):i=createCssStyle(e,t,l,r),e.addEventListener("ended",()=>{e.pause(),n.style.display="none",a.style.display="flex",e.currentTime=0}),t.addEventListener("click",()=>{"flex"===n.style.display?(e.pause(),n.style.display="none",a.style.display="flex",e.currentTime=0):(e.play(),n.style.display="flex",a.style.display="none")})}}function createCssStyle(e,t,n,a){var e=e.duration,l=Math.floor(e),i=25<l+2?25:l+2,r=(n.innerHTML=`${99<l?"..":l}"`,25<l+2&&(t.style.width="100%"),document.createElement("div"));r.className="voice-wave voice-wave-"+(a+1);for(let e=0;e<i;e++){var s=document.createElement("span");s.className="voice-wave-item",r.append(s)}t.insertBefore(r,t.querySelector(".voice-metas"));let o=`
    .voice-wave.voice-wave-${a+1}::before {
        transition: left ${e}s linear;
        -moz-transition: left ${e}s linear;
        -webkit-transition: left ${e}s linear;
        -o-transition: left ${e}s linear;
    }
    `;for(let e=0;e<i;++e)o+=`
        .voice-wave-${a+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(n),r}