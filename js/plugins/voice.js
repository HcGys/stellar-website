function createVoiceDom(o){let r="";for(let n=0;n<o.length;++n){let e=o[n];e.loop=!1;e.currentTime;var i=Math.floor(e.duration/10),s=i+2,c=e.parentElement;let t=c.querySelector(".pause-btn"),a=c.querySelector(".play-btn");c.querySelector(".voice-seconds").innerHTML=i+'"',e.addEventListener("ended",()=>{e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0}),c.addEventListener("click",()=>{"flex"===t.style.display?(e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0):(e.play(),t.style.display="flex",a.style.display="none")});var d=document.createElement("div");d.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<s;e++){var p=document.createElement("span");p.className="voice-wave-item",d.append(p)}c.insertBefore(d,c.querySelector(".voice-metas"));let l=`
        .voice-wave.voice-wave-${n+1}::before {
            position: absolute;
            top: -10%;
            left: 0;
            height: 120%;
            width: 1px;
            background: var(--text-p1);
            content: "";
            display: none;
        }
        `;for(let e=0;e<s;++e)l+=`
            .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--text-p4);
                width: 3px;
                margin-left: ${0==e?0:2}px;
                border-radius: 2px;
            }
            `;r+=l}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=r,document.getElementsByTagName("head").item(0).appendChild(e)}