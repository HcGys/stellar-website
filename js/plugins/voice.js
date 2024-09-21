function createVoiceDom(a){for(let t=0;t<a.length;++t){let e=a[t];e.loop=!1;e.currentTime;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{createWave(e,voiceDom,voiceSecondsSpan,t)}):createWave(e,voiceDom,voiceSecondsSpan,t)}}function createWave(e,t,a,i){var n=e.duration,s=Math.floor(n),l=25<s+2?25:s+2,o=(a.innerHTML=`${99<s?"..":s}"`,2*(2*l-1)),r=(25<s+2&&(t.style.width="100%"),document.createElement("div"));let c=document.createElement("div");c.className="play-line",r.append(c),r.className="voice-wave voice-wave-"+(i+1);for(let e=0;e<l;e++){var d=document.createElement("span");d.className="voice-wave-item",r.append(d)}t.insertBefore(r,t.querySelector(".voice-metas"));let v=t.querySelector(".pause-btn"),m=t.querySelector(".play-btn"),a=t.querySelector(".voice-seconds"),p=(e.addEventListener("ended",()=>{e.pause(),v.style.display="none",m.style.display="flex",e.currentTime=0,c.classList.remove("active"),c.classList.add("back")}),t.addEventListener("click",()=>{"flex"===v.style.display?(e.pause(),v.style.display="none",m.style.display="flex",e.currentTime=0,c.classList.remove("active"),c.classList.add("back")):(e.play(),v.style.display="flex",m.style.display="none",c.classList.add("active"),c.classList.remove("back"))}),`
    .voice-wave.voice-wave-${i+1}>.play-line {
        transition: transform ${n}s linear;
        -moz-transition: transform ${n}s linear;
        -webkit-transition: transform ${n}s linear;
        -o-transition: transform ${n}s linear;
    }
    .voice-wave.voice-wave-${i+1}>.play-line.active {
        transform: translateX(${o}px);
    }
    `);for(let e=0;e<l;++e)p+=`
        .voice-wave-${i+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;s=document.createElement("style");s.setAttribute("type","text/css"),s.innerHTML=p,document.getElementsByTagName("head").item(0).appendChild(s)}