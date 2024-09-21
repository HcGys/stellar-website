function fillRoundRect(e,t,a,n,l,i,r){if(n<2*i||l<2*i)return!1;e.save(),e.translate(t,a),drawRoundRectPath(e,n,l,i),e.fillStyle=r||"#000",e.fill(),e.restore()}function strokeRoundRect(e,t,a,n,l,i,r,o){if(n<2*i||l<2*i)return!1;e.save(),e.translate(t,a),drawRoundRectPath(e,n,l,i),e.lineWidth=r||2,e.strokeStyle=o||"#000",e.stroke(),e.restore()}function drawRoundRectPath(e,t,a,n){e.beginPath(0),e.arc(t-n,a-n,n,0,Math.PI/2),e.lineTo(n,a),e.arc(n,a-n,n,Math.PI/2,Math.PI),e.lineTo(0,n),e.arc(n,n,n,Math.PI,3*Math.PI/2),e.lineTo(t-n,0),e.arc(t-n,n,n,3*Math.PI/2,2*Math.PI),e.lineTo(t,a-n),e.closePath()}function fillRoundRectPro(e,t,a,n,l,i,r,o,c,s){if(n<i+r||n<c+o||l<i+c||l<r+o)return!1;e.save(),e.translate(t,a),drawRoundRectPathPro(e,n,l,i,r,o,c),e.fillStyle=s||"#000",e.fill(),e.restore()}function drawRoundRectPathPro(e,t,a,n,l,i,r){e.beginPath(0),e.arc(t-i,a-i,i,0,Math.PI/2),e.lineTo(r,a),e.arc(r,a-r,r,Math.PI/2,Math.PI),e.lineTo(0,n),e.arc(n,n,n,Math.PI,3*Math.PI/2),e.lineTo(t-l,0),e.arc(t-l,l,l,3*Math.PI/2,2*Math.PI),e.lineTo(t,a-i),e.closePath()}function drawWave(t,a,n,l,i){for(let e=0;e<n.length;++e)fillRoundRect(t,4*e,(a-n[e])/2,2,n[e],l,i)}function drawWaveWhenPlaying(t,a,n,l,i,r,o){for(let e=0;e<l.length;++e)4*e+2<=n?fillRoundRect(t,4*e,(a-l[e])/2,2,l[e],i,r):4*e>=n?fillRoundRect(t,4*e,(a-l[e])/2,2,l[e],i,o):1<=n-4*e?(fillRoundRect(t,4*e,(a-l[e])/2,2,l[e],i,o),fillRoundRectPro(t,4*e,(a-l[e])/2,n-4*e,l[e],i,0,0,i,r)):(fillRoundRect(t,4*e,(a-l[e])/2,2,l[e],i,r),fillRoundRectPro(t,4*e,(a-l[e])/2,2-n+4*e,l[e],0,i,i,0,o))}function drawPlayLine(e,t,a,n){fillRoundRect(e,a,0,1,t,.1,n)}function createVoiceDom(a){for(let t=0;t<a.length;++t){let e=a[t];e.loop=!1;e.currentTime;isNaN(e.duration)||e.duration===1/0?e.addEventListener("durationchange",()=>{createWaveDom(e)}):createWaveDom(e)}}function createWaveDom(o){var c=o.parentElement;let s=c.querySelector("canvas");if(s.getContext("2d")){var d=o.duration,d=Math.floor(d),h=25<d+2?25:d+2;let e=c.querySelector(".pause-btn"),t=c.querySelector(".play-btn"),a=(c.querySelector(".voice-seconds").innerHTML=`${99<d?"..":d}"`,window.devicePixelRatio),n=(s.width=2*(2*h-1)*a,s.height=23*a,s.style.width=2*(2*h-1)+"px",s.style.height="23px",[]);for(let e=0;e<h;++e){var u=(Math.floor(51*Math.random())+30)/100*s.height*.8;n.push(u)}var v=s.getContext("2d");v.scale(a,1);let l="#333",i="#999",r=("dark"===stellar.dark.mode&&(l="#ccc",i="#707070"),!1);drawWave(v,s.height,n,1,l),o.addEventListener("timeupdate",()=>{0<o.currentTime&&(i="dark"===stellar.dark.mode?(l="#ccc","#707070"):(l="#333","#999"),v.clearRect(0,0,s.width,s.height),drawWaveWhenPlaying(v,s.height,o.currentTime/o.duration*s.width/a,n,1,l,i),drawPlayLine(v,s.height,o.currentTime/o.duration/a*s.width,l))}),o.addEventListener("ended",()=>{o.pause(),e.style.display="none",t.style.display="flex",o.currentTime=0,v.clearRect(0,0,s.width,s.height),drawWave(v,s.height,n,1,l),r=!1}),c.addEventListener("click",()=>{r="flex"===e.style.display?(o.pause(),e.style.display="none",!(t.style.display="flex")):(o.play(),e.style.display="flex",t.style.display="none",!0)}),stellar.dark.push(function(){r||(i="dark"===stellar.dark.mode?(l="#ccc","#707070"):(l="#333","#999"),0<o.currentTime?(drawWaveWhenPlaying(v,s.height,o.currentTime/o.duration*s.width,n,1,l,i),drawPlayLine(v,s.height,o.currentTime/o.duration*s.width,l)):drawWave(v,s.height,n,1,l))})}else console.log("浏览器不支持canvas")}function createCssStyle(e,t){var a=e.duration,n=Math.floor(a),l=25<n+2?25:n+2,i=e.parentElement;let r=i.querySelector(".pause-btn"),o=i.querySelector(".play-btn");i.querySelector(".voice-seconds").innerHTML=`${99<n?"..":n}"`;var c=2*(2*l-1),s=(25<n+2&&(i.style.width="100%"),document.createElement("div"));let d=document.createElement("div");d.className="play-line",s.append(d),s.className="voice-wave voice-wave-"+(t+1);for(let e=0;e<l;e++){var h=document.createElement("span");h.className="voice-wave-item",s.append(h)}i.insertBefore(s,i.querySelector(".voice-metas")),e.addEventListener("ended",()=>{e.pause(),r.style.display="none",o.style.display="flex",e.currentTime=0,d.classList.remove("active"),d.classList.add("back")}),i.addEventListener("click",()=>{"flex"===r.style.display?(e.pause(),r.style.display="none",o.style.display="flex",e.currentTime=0,d.classList.remove("active"),d.classList.add("back")):(e.play(),r.style.display="flex",o.style.display="none",d.classList.add("active"),d.classList.remove("back"))});let u=`
    .voice-wave.voice-wave-${t+1}>.play-line {
        transition: transform ${a}s linear;
        -moz-transition: transform ${a}s linear;
        -webkit-transition: transform ${a}s linear;
        -o-transition: transform ${a}s linear;
    }
    .voice-wave.voice-wave-${t+1}>.play-line.active {
        transform: translateX(${c}px);
    }
    `;for(let e=0;e<l;++e)u+=`
        .voice-wave-${t+1} span.voice-wave-item:nth-child(${e+1}) {
            height: ${10*(Math.floor(8*Math.random())+3)}%;
            margin-left: ${0==e?0:2}px;
        }
        `;n=document.createElement("style");n.setAttribute("type","text/css"),n.innerHTML=u,document.getElementsByTagName("head").item(0).appendChild(n)}