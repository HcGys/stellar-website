function createVoiceDom(a){for(let t=0;t<a.length;++t){let e=a[t];e.loop=!1;e.currentTime;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{createCssStyle(e,t)}):createCssStyle(e,t)}}function createCssStyle(e,t){var a=e.duration,s=Math.floor(a),n=25<s+2?25:s+2,i=e.parentElement;let l=i.querySelector(".pause-btn"),r=i.querySelector(".play-btn");i.querySelector(".voice-seconds").innerHTML=`${99<s?"..":s}"`;var o=2*(2*n-1),c=(25<s+2&&(i.style.width="100%"),document.createElement("div"));let d=document.createElement("div");d.className="play-line",c.append(d),c.className="voice-wave voice-wave-"+(t+1);for(let e=0;e<n;e++){var v=document.createElement("span");v.className="voice-wave-item",c.append(v)}i.insertBefore(c,i.querySelector(".voice-metas")),e.addEventListener("ended",()=>{e.pause(),l.style.display="none",r.style.display="flex",e.currentTime=0,d.classList.remove("active"),d.classList.add("back")}),i.addEventListener("click",()=>{"flex"===l.style.display?(e.pause(),l.style.display="none",r.style.display="flex",e.currentTime=0,d.classList.remove("active"),d.classList.add("back")):(e.play(),l.style.display="flex",r.style.display="none",d.classList.add("active"),d.classList.remove("back"))});let m=`
    .voice-wave.voice-wave-${t+1}>.play-line {
        transition: transform ${a}s linear;
        -moz-transition: transform ${a}s linear;
        -webkit-transition: transform ${a}s linear;
        -o-transition: transform ${a}s linear;
    }
    .voice-wave.voice-wave-${t+1}>.play-line.active {
        transform: translateX(${o}px);
    }
    `;for(let e=0;e<n;++e)m+=`
        .voice-wave-${t+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;s=document.createElement("style");return s.setAttribute("type","text/css"),s.innerHTML=m,document.getElementsByTagName("head").item(0).appendChild(s),c}