function createVoiceDom(r){let i="";for(let n=0;n<r.length;++n){let e=r[n];e.loop=!1;e.currentTime;var o=Math.floor(e.duration/10),s=o+2,c=e.parentElement;let t=c.querySelector(".pause-btn"),a=c.querySelector(".play-btn");c.querySelector(".voice-seconds").innerHTML=o+'"',e.addEventListener("ended",()=>{e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0}),c.addEventListener("click",()=>{"flex"===t.style.display?(e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0):(e.play(),t.style.display="flex",a.style.display="none")});var d=document.createElement("div");d.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<s;e++){var p=document.createElement("span");p.className="voice-wave-item",d.append(p)}c.insertBefore(d,c.querySelector(".voice-metas"));let l="";for(let e=0;e<s;++e)l+=`
            .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--text-p1);
                width: 3px;
                margin-left: ${0==e?0:2}px;
                border-radius: 2px;
            }
            `;i+=l}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=i,document.getElementsByTagName("head").item(0).appendChild(e)}