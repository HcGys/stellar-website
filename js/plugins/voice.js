function createVoiceDom(n){let o="";for(let l=0;l<n.length;++l){let e=n[l];e.currentTime;var i=Math.floor(e.duration/10)+2,c=i+2,s=e.parentElement;let t=s.querySelector(".pause-btn"),a=s.querySelector(".play-btn");s.querySelector(".voice-seconds").innerHTML=Math.floor(i/10)+'"',t.addEventListener("click",()=>{e.pause(),t.style.display="none",a.style.display="flex",e.currentTime=0}),a.addEventListener("click",()=>{e.play(),t.style.display="flex",a.style.display="none"});var d=document.createElement("div");d.className="voice-wave voice-wave-"+(l+1);for(let e=0;e<c;e++){var m=document.createElement("span");m.className="voice-wave-item",d.append(m)}s.insertBefore(d,s.querySelector(".voice-metas"));let r="";for(let e=0;e<c;++e)r+=`
            .voice-wave-${l+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--text-p2);
                width: 3px;
                margin-left: ${0==e?0:2}px;
                border-radius: 2px;
            }
            `;o+=r}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=o,document.getElementsByTagName("head").item(0).appendChild(e)}