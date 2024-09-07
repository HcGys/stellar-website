function createVoiceDom(n){let i="";for(let r=0;r<n.length;++r){let e=n[r];e.currentTime;var o=Math.floor(e.duration/10)+2,c=o+2,s=e.parentElement;let t=s.querySelector(".pause-btn"),a=s.querySelector(".play-btn");s.querySelector(".voice-seconds").innerHTML=o+'"',s.addEventListener("click",()=>{"flex"===t.style.display?(e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0):(e.play(),t.style.display="flex",a.style.display="none")});var d=document.createElement("div");d.className="voice-wave voice-wave-"+(r+1);for(let e=0;e<c;e++){var m=document.createElement("span");m.className="voice-wave-item",d.append(m)}s.insertBefore(d,s.querySelector(".voice-metas"));let l="";for(let e=0;e<c;++e)l+=`
            .voice-wave-${r+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--text-p1);
                width: 3px;
                margin-left: ${0==e?0:2}px;
                border-radius: 2px;
            }
            `;i+=l}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=i,document.getElementsByTagName("head").item(0).appendChild(e)}