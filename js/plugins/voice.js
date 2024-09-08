function createVoiceDom(a){for(let s=0;s<a.length;++s){let o=a[s];o.loop=!1;o.currentTime;let i=o.parentElement,e=i.querySelector(".pause-btn"),t=i.querySelector(".play-btn"),r=i.querySelector(".voice-seconds");o.addEventListener("ended",()=>{o.pause(),e.style.display="none",t.style.display="flex",o.currentTime=0}),i.addEventListener("click",()=>{"flex"===e.style.display?(o.pause(),e.style.display="none",t.style.display="flex",o.currentTime=0):(o.play(),e.style.display="flex",t.style.display="none")}),o.addEventListener("durationchange",()=>{var e=o.duration,e=Math.floor(e),t=e+2,a=(r.innerHTML=e+'"',document.createElement("div"));a.className="voice-wave voice-wave-"+(s+1);for(let e=0;e<t;e++){var n=document.createElement("span");n.className="voice-wave-item",a.append(n)}i.insertBefore(a,i.querySelector(".voice-metas"));let l=`
            .voice-wave.voice-wave-${s+1}::before {
                position: absolute;
                top: -10%;
                left: 0;
                height: 120%;
                width: 1px;
                background: var(--text-p1);
                content: "";
                display: none;
            }
            `;for(let e=0;e<t;++e)l+=`
                .voice-wave-${s+1} span.voice-wave-item:nth-child(${e+1}) {
                    height: ${10*(Math.floor(8*Math.random())+3)}%;
                    margin-left: ${0==e?0:2}px;
                }
                `;e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=l,document.getElementsByTagName("head").item(0).appendChild(e)})}}