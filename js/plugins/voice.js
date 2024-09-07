function createVoiceDom(r){let c="";for(let a=0;a<r.length;++a){let e=r[a];e.currentTime;var n=e.duration,o=n+2,i=e.parentElement,l=i.querySelector(".pause-btn"),d=i.querySelector(".play-btn"),s=(i.querySelector(".voice-seconds").innerHTML=Math.floor(n/10)+'"',l.addEventListener("click",()=>{e.pause()}),d.addEventListener("click",()=>{e.play()}),document.createElement("div"));s.className="voice-wave-"+a;for(let e=0;e<o;e++){var v=document.createElement("span");v.className="voice-wave-item",s.append(v)}s.insertBefore(i.querySelector(".voice-metas"));let t=`
            .voice-wave-${a} {
                width: 3px;
                border-radius: 3px;
            }
        `;for(let e=0;e<o;++e)t+=`
            .voice-wavei-${a} span.voice-wave-item:nth-child(${e}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--chat-voice-block);
            }
            `;c+=t}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=c,document.getElementsByTagName("head").item(0).appendChild(e)}