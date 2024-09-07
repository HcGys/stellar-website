function createVoiceDom(r){let c="";for(let a=0;a<r.length;++a){let e=r[a];e.currentTime;var o=Math.floor(e.duration/10)+2,n=o+2,i=e.parentElement,l=i.querySelector(".pause-btn"),d=i.querySelector(".play-btn"),s=(i.querySelector(".voice-seconds").innerHTML=Math.floor(o/10)+'"',l.addEventListener("click",()=>{e.pause()}),d.addEventListener("click",()=>{e.play()}),document.createElement("div"));s.className="voice-wave-"+a;for(let e=0;e<n;e++){var v=document.createElement("span");v.className="voice-wave-item",s.append(v)}i.insertBefore(s,i.querySelector(".voice-metas"));let t=`
            .voice-wave-${a+1} {
                width: 3px;
                border-radius: 3px;
            }
        `;for(let e=0;e<n;++e)t+=`
            .voice-wavei-${a+1} span.voice-wave-item:nth-child(${e+1}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--chat-voice-block);
            }
            `;c+=t}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=c,document.getElementsByTagName("head").item(0).appendChild(e)}