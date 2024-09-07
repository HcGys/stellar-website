function createVoiceDom(c){let n="";for(let a=0;a<c.length;++a){let e=c[a];e.currentTime;var r=e.duration,i=r+2,o=e.parentElement,l=o.querySelector(".pause-btn"),d=o.querySelector(".play-btn"),v=(o.querySelector(".voice-seconds").innerHTML=""+r,l.addEventListener("click",()=>{e.pause()}),d.addEventListener("click",()=>{e.play()}),document.createElement("div"));v.className="voice-wave-"+a;for(let e=0;e<i;e++){var m=document.createElement("span");m.className="voice-wave-item",v.append(m)}let t=`
            .voice-wave-${a} {
                width: 3px;
                border-radius: 3px;
            }
        `;for(let e=0;e<i;++e)t+=`
            .voice-wavei-${a} span.voice-wave-item:nth-child(${e}) {
                height: ${10*(Math.floor(8*Math.random())+3)}%;
                background: var(--chat-voice-block);
            }
            `;n+=t}var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=n,document.getElementsByTagName("head").item(0).appendChild(e)}