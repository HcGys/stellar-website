function createVoiceDom(c){let o="";for(let n=0;n<c.length;++n){let e=c[n];e.currentTime;var r=Math.floor(e.duration/10)+2,i=r+2,s=e.parentElement;let t=s.querySelector(".pause-btn"),a=s.querySelector(".play-btn");s.querySelector(".voice-seconds").innerHTML=Math.floor(r/10)+'"',t.addEventListener("click",()=>{e.pause(),t.style.display="none",a.style.display="block",e.currentTime=0}),a.addEventListener("click",()=>{e.play(),t.style.display="block",a.style.display="none"});var d=document.createElement("div");d.className="voice-wave voice-wave-"+(n+1);for(let e=0;e<i;e++){var v=document.createElement("span");v.className="voice-wave-item",d.append(v)}s.insertBefore(d,s.querySelector(".voice-metas"));let l="";for(let e=0;e<i;++e)l+=`
            .voice-wave-${n+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--chat-voice-block);
            }
            `;o+=l}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(e)}