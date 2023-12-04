const rematrix=(()=>{let l={format:t=>{if(t&&t.constructor===Array){var e,r=t.filter(t=>"number"==typeof t).filter(t=>!isNaN(t));if(6===t.length&&6===r.length)return(e=identity())[0]=r[0],e[1]=r[1],e[4]=r[2],e[5]=r[3],e[12]=r[4],e[13]=r[5],e;if(16===t.length&&16===r.length)return t}throw new TypeError("Expected a `number[]` with length 6 or 16.")},identity:()=>{var e=[];for(let t=0;t<16;t++)t%5==0?e.push(1):e.push(0);return e},fromString:t=>{if("string"==typeof t){var e=t.match(/matrix(3d)?\(([^)]+)\)/);if(e)return e=e[2].split(",").map(parseFloat),l.format(e);if("none"===t||""===t)return l.identity()}throw new TypeError("Expected a string containing `matrix()` or `matrix3d()")},multiply:(t,e)=>{var r=l.format(t),a=l.format(e),i=[];for(let e=0;e<4;e++){var n=[r[e],r[e+4],r[e+8],r[e+12]];for(let t=0;t<4;t++){var o=4*t,s=[a[o],a[1+o],a[2+o],a[3+o]];i[e+o]=n[0]*s[0]+n[1]*s[1]+n[2]*s[2]+n[3]*s[3]}}return i},rotateX:t=>{var t=Math.PI/180*t,e=l.identity();return e[5]=e[10]=Math.cos(t),e[6]=e[9]=Math.sin(t),e[9]*=-1,e},rotateY:t=>{var t=Math.PI/180*t,e=l.identity();return e[0]=e[10]=Math.cos(t),e[2]=e[8]=Math.sin(t),e[2]*=-1,e},rotateZ:t=>{var t=Math.PI/180*t,e=l.identity();return e[0]=e[5]=Math.cos(t),e[1]=e[4]=Math.sin(t),e[4]*=-1,e},scale:(t,e)=>{var r=l.identity();return r[0]=t,r[5]="number"==typeof e?e:t,r},translateX:t=>{var e=l.identity();return e[12]=t,e},translateY:t=>{var e=l.identity();return e[13]=t,e}};return{fromString:t=>l.fromString(t),multiply:(t,e)=>l.multiply(t,e),rotateX:t=>l.rotateX(t),rotateY:t=>l.rotateY(t),rotateZ:t=>l.rotateZ(t),scale:(t,e)=>l.scale(t,e),translateX:t=>l.translateX(t),translateY:t=>l.translateY(t)}})(),scrollanimate=(Object.freeze(rematrix),(()=>{let m={},y={init:t=>{m.opacity=t.opacity||0,m.distance=t.distance||"0",m.duration=t.duration||600,m.interval=t.interval||0,m.delay=t.delay||0,m.scale=t.scale||1,m.easing=t.easing||"ease-out",m.origin=t.origin||"bottom",m.rotate=t.rotate||{x:0,y:0,z:0}}};return y.getPrefixedCssProp=(()=>{let r={};const a=document.documentElement.style;function t(t,e=a){if(t&&"string"==typeof t){if(r[t])return r[t];if("string"==typeof e[t])return r[t]=t;if("string"==typeof e["-webkit-"+t])return r[t]="-webkit-"+t;throw new RangeError(`Unable to find "${t}" style property.`)}throw new TypeError("Expected a string.")}return t.clearCache=()=>r={},t})(),y.style=e=>{var r=window.getComputedStyle(e),t={},a=(e.getAttribute("style")||"").match(/[\w-]+\s*:\s*[^;]+\s*/gi)||[],a=(t.computed=a?a.map(t=>t.trim()).join("; ")+";":"",t.generated=a.some(t=>t.match(/visibility\s?:\s?visible/i))?t.computed:[...a,"visibility: visible"].map(t=>t.trim()).join("; ")+";",parseFloat(r.opacity)),i=isNaN(parseFloat(m.opacity))?parseFloat(r.opacity):parseFloat(m.opacity),a={computed:a!==i?`opacity: ${a};`:"",generated:a!==i?`opacity: ${i};`:""},i=[];if(parseFloat(m.distance)){var n="top"===m.origin||"bottom"===m.origin?"Y":"X";let t=m.distance;var[o,s]=(t="top"!==m.origin&&"left"!==m.origin?t:/^-/.test(t)?t.substr(1):"-"+t).match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g),l=parseFloat(o);switch(s){case"em":t=parseInt(r.fontSize)*l;break;case"px":t=l;break;case"%":t="Y"==n?e.getBoundingClientRect().height*l/100:e.getBoundingClientRect().width*l/100;break;default:throw new RangeError("Unrecognized or missing distance unit.")}i.push("Y"==n?rematrix.translateY(t):rematrix.translateX(t))}m.rotate.x&&i.push(rematrix.rotateX(m.rotate.x)),m.rotate.y&&i.push(rematrix.rotateY(m.rotate.y)),m.rotate.z&&i.push(rematrix.rotateZ(m.rotate.z)),1!==m.scale&&(0===m.scale?i.push(rematrix.scale(2e-4)):i.push(rematrix.scale(m.scale)));var o={},i=(i.length?(o.property=y.getPrefixedCssProp("transform"),o.computed={raw:r[o.property],matrix:rematrix.fromString(r[o.property])},i.unshift(o.computed.matrix),s=i.reduce(rematrix.multiply),o.generated={initial:`${o.property}: matrix3d(${s.join(", ")});`,final:`${o.property}: matrix3d(${o.computed.matrix.join(", ")});`}):o.generated={initial:"",final:""},{}),p=(a.generated||o.generated.initial?(i.property=y.getPrefixedCssProp("transition"),i.computed=r[i.property],i.fragments=[],{delay:s,duration:p,easing:d}=m,a.generated&&i.fragments.push({delayed:`opacity ${p/1e3}s ${d} ${s/1e3}s`,instant:`opacity ${p/1e3}s ${d} 0s`}),o.generated.initial&&i.fragments.push({delayed:o.property+` ${p/1e3}s ${d} ${s/1e3}s`,instant:o.property+` ${p/1e3}s ${d} 0s`}),i.computed&&!i.computed.match(/all 0s|none 0s/)&&i.fragments.unshift({delayed:i.computed,instant:i.computed}),s=i.fragments.reduce((t,e,r)=>(t.delayed+=0===r?e.delayed:", "+e.delayed,t.instant+=0===r?e.instant:", "+e.instant,t),{delayed:"",instant:""}),i.generated={delayed:`${i.property}: ${s.delayed};`,instant:`${i.property}: ${s.instant};`}):i.generated={delayed:"",instant:""},[t.generated]),d=(p.push(a.generated),p.push(o.generated.initial),[t.generated,a.computed,o.generated.final]);return m.delay?d.push(i.generated.delayed):d.push(i.generated.instant),{before:p.filter(t=>""!==t).join(" "),after:d.filter(t=>""!==t).join(" ")}},y.applyStyle=(r,t)=>{t.split(";").forEach(t=>{var[t,...e]=t.split(":");t&&e&&(r.style[t.trim()]=e.join(":"))})},y.bindEleFirstLoadAnimate=(t,a)=>{new IntersectionObserver((t,r)=>{stellar.requestAnimationFrame(()=>{t.forEach((t,e)=>{t.isIntersecting&&(setTimeout(()=>{y.applyStyle(t.target,a)},Math.max(m.interval,16)*e),r.unobserve(t.target))})})}).observe(t)},{init:(t,e={})=>{y.init(e),document.querySelectorAll(t).sort((t,e)=>e.offsetTop-t.offsetTop).forEach(t=>{var{before:e,after:r}=y.style(t);y.applyStyle(t,e),y.bindEleFirstLoadAnimate(t,r)})}}})());Object.freeze(scrollanimate);