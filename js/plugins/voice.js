function createVoiceDom(n){let o="";for(let r=0;r<n.length;++r){let e=n[r];e.loop=!1;e.currentTime;var i=Math.floor(e.duration/10)+2,c=i+2,s=e.parentElement;let t=s.querySelector(".pause-btn"),a=s.querySelector(".play-btn");s.querySelector(".voice-seconds").innerHTML=i+'"',s.addEventListener("click",()=>{"flex"===t.style.display?(e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0):(e.play(),t.style.display="flex",a.style.display="none")});var d=document.createElement("div");d.className="voice-wave voice-wave-"+(r+1);for(let e=0;e<c;e++){var p=document.createElement("span");p.className="voice-wave-item",d.append(p)}s.insertBefore(d,s.querySelector(".voice-metas"));let l="";for(let e=0;e<c;++e)l+=`
            .voice-wave-${r+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--text-p1);
                width: 3px;
                margin-left: ${0==e?0:2}px;
                border-radius: 2px;
            }
            `;o+=l}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(e)}