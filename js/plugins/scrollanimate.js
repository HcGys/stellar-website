const rematrix=(()=>{let l={format:t=>{if(t&&t.constructor===Array){var e,r=t.filter(t=>"number"==typeof t).filter(t=>!isNaN(t));if(6===t.length&&6===r.length)return(e=l.identity())[0]=r[0],e[1]=r[1],e[4]=r[2],e[5]=r[3],e[12]=r[4],e[13]=r[5],e;if(16===t.length&&16===r.length)return t}throw new TypeError("Expected a `number[]` with length 6 or 16.")},identity:()=>{var e=[];for(let t=0;t<16;t++)t%5==0?e.push(1):e.push(0);return e},fromString:t=>{if("string"==typeof t){var e=t.match(/matrix(3d)?\(([^)]+)\)/);if(e)return e=e[2].split(",").map(parseFloat),l.format(e);if("none"===t||""===t)return l.identity()}throw new TypeError("Expected a string containing `matrix()` or `matrix3d()")},multiply:(t,e)=>{var r=l.format(t),a=l.format(e),i=[];for(let e=0;e<4;e++){var n=[r[e],r[e+4],r[e+8],r[e+12]];for(let t=0;t<4;t++){var s=4*t,o=[a[s],a[1+s],a[2+s],a[3+s]];i[e+s]=n[0]*o[0]+n[1]*o[1]+n[2]*o[2]+n[3]*o[3]}}return i},rotateX:t=>{var t=Math.PI/180*t,e=l.identity();return e[5]=e[10]=Math.cos(t),e[6]=e[9]=Math.sin(t),e[9]*=-1,e},rotateY:t=>{var t=Math.PI/180*t,e=l.identity();return e[0]=e[10]=Math.cos(t),e[2]=e[8]=Math.sin(t),e[2]*=-1,e},rotateZ:t=>{var t=Math.PI/180*t,e=l.identity();return e[0]=e[5]=Math.cos(t),e[1]=e[4]=Math.sin(t),e[4]*=-1,e},scale:(t,e)=>{var r=l.identity();return r[0]=t,r[5]="number"==typeof e?e:t,r},translateX:t=>{var e=l.identity();return e[12]=t,e},translateY:t=>{var e=l.identity();return e[13]=t,e}};return{fromString:t=>l.fromString(t),multiply:(t,e)=>l.multiply(t,e),rotateX:t=>l.rotateX(t),rotateY:t=>l.rotateY(t),rotateZ:t=>l.rotateZ(t),scale:(t,e)=>l.scale(t,e),translateX:t=>l.translateX(t),translateY:t=>l.translateY(t)}})(),scrollanimate=(Object.freeze(rematrix),(()=>{let n={},s=new IntersectionObserver((t,r)=>{stellar.requestAnimationFrame(()=>{t.filter(t=>t.isIntersecting).sort((t,e)=>t.intersectionRect.y!==e.intersectionRect.y?t.intersectionRect.y-e.intersectionRect.y:t.intersectionRect.x-e.intersectionRect.x).forEach((t,e)=>{r.unobserve(t.target),setTimeout(()=>{g.applyStyle(t.target,n[t.target.getAttribute("sa-group-id")].elements[t.target.getAttribute("sa-id")].after)},Math.max(n[t.target.getAttribute("sa-group-id")].config.interval,16)*(e+1)),t.target.setAttribute("sa-status","true")})})}),g={};return g.getPrefixedCssProp=(()=>{let r={};const a=document.documentElement.style;function t(t,e=a){if(t&&"string"==typeof t){if(r[t])return r[t];if("string"==typeof e[t])return r[t]=t;if("string"==typeof e["-webkit-"+t])return r[t]="-webkit-"+t;throw new RangeError(`Unable to find "${t}" style property.`)}throw new TypeError("Expected a string.")}return t.clearCache=()=>r={},t})(),g.style=(e,r)=>{var a=window.getComputedStyle(r),t={},i=(r.getAttribute("style")||"").match(/[\w-]+\s*:\s*[^;]+\s*/gi)||[],i=(t.computed=i?i.map(t=>t.trim()).join("; ")+";":"",t.generated=i.some(t=>t.match(/visibility\s?:\s?visible/i))?t.computed:[...i,"visibility: visible"].map(t=>t.trim()).join("; ")+";",parseFloat(a.opacity)),n=isNaN(parseFloat(e.opacity))?parseFloat(a.opacity):parseFloat(e.opacity),i={computed:i!==n?`opacity: ${i};`:"",generated:i!==n?`opacity: ${n};`:""},n=[];if(parseFloat(e.distance)){var s="top"===e.origin||"bottom"===e.origin?"Y":"X";let t=e.distance;var[o,l]=(t="top"!==e.origin&&"left"!==e.origin?t:/^-/.test(t)?t.substr(1):"-"+t).match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g),p=parseFloat(o);switch(l){case"em":t=parseInt(a.fontSize)*p;break;case"px":t=p;break;case"%":t="Y"==s?r.getBoundingClientRect().height*p/100:r.getBoundingClientRect().width*p/100;break;default:throw new RangeError("Unrecognized or missing distance unit.")}n.push("Y"==s?rematrix.translateY(t):rematrix.translateX(t))}e.rotate.x&&n.push(rematrix.rotateX(e.rotate.x)),e.rotate.y&&n.push(rematrix.rotateY(e.rotate.y)),e.rotate.z&&n.push(rematrix.rotateZ(e.rotate.z)),1!==e.scale&&(0===e.scale?n.push(rematrix.scale(2e-4)):n.push(rematrix.scale(e.scale)));var o={},n=(n.length?(o.property=g.getPrefixedCssProp("transform"),o.computed={raw:a[o.property],matrix:rematrix.fromString(a[o.property])},n.unshift(o.computed.matrix),l=n.reduce(rematrix.multiply),o.generated={initial:`${o.property}: matrix3d(${l.join(", ")});`,final:`${o.property}: matrix3d(${o.computed.matrix.join(", ")});`}):o.generated={initial:"",final:""},{}),u=(i.generated||o.generated.initial?(n.property=g.getPrefixedCssProp("transition"),n.computed=a[n.property],n.fragments=[],{delay:l,duration:u,easing:c}=e,i.generated&&n.fragments.push({delayed:`opacity ${u/1e3}s ${c} ${l/1e3}s`,instant:`opacity ${u/1e3}s ${c} 0s`}),o.generated.initial&&n.fragments.push({delayed:o.property+` ${u/1e3}s ${c} ${l/1e3}s`,instant:o.property+` ${u/1e3}s ${c} 0s`}),n.computed&&!n.computed.match(/all 0s|none 0s/)&&n.fragments.unshift({delayed:n.computed,instant:n.computed}),l=n.fragments.reduce((t,e,r)=>(t.delayed+=0===r?e.delayed:", "+e.delayed,t.instant+=0===r?e.instant:", "+e.instant,t),{delayed:"",instant:""}),n.generated={delayed:`${n.property}: ${l.delayed};`,instant:`${n.property}: ${l.instant};`}):n.generated={delayed:"",instant:""},[t.computed,i.generated,o.generated.initial]),c=[t.generated,i.computed,o.generated.final];return e.delay?c.push(n.generated.delayed):c.push(n.generated.instant),{itself:t.computed,before:u.filter(t=>""!==t).join(" "),after:c.filter(t=>""!==t).join(" ")}},g.applyStyle=(r,t)=>{t.split(";").forEach(t=>{var[t,...e]=t.split(":");t&&e&&(r.style[t.trim()]=e.join(":"))})},g.register=(t,e={})=>{n[t]={},n[t].config={},n[t].config.opacity=e.opacity||0,n[t].config.distance=e.distance||"0",n[t].config.duration=e.duration||600,n[t].config.interval=e.interval||0,n[t].config.delay=e.delay||0,n[t].config.scale=e.scale||1,n[t].config.easing=e.easing||"cubic-bezier(0.5, 0, 0, 1)",n[t].config.origin=e.origin||"bottom",n[t].config.rotate=e.rotate||{x:0,y:0,z:0}},g.apply=(i,t,e={})=>{n[i]||g.register(i,e),n[i].elements={},n[i].eleNum=0,t.forEach(t=>{var{itself:e,before:r,after:a}=g.style(n[i].config,t);g.applyStyle(t,r),t.setAttribute("sa-id","sa-"+n[i].eleNum),t.setAttribute("sa-group-id",""+i),n[i].elements["sa-"+n[i].eleNum]={target:t,before:r,after:a,itself:e},n[i].eleNum++,s.observe(t)})},g.reset=t=>{n[t]?.elements&&Object.entries(n[t].elements).forEach(([,t])=>{"true"===t.target.getAttribute("sa-status")&&(t.target.setAttribute("style",t.itself),g.applyStyle(t.target,t.before),t.target.removeAttribute("sa-status"),s.observe(t.target))})},g.clean=t=>{n[t]?.elements&&Object.entries(n[t].elements).forEach(([,t])=>{t.target.setAttribute("style",t.itself),"true"!==t.target.getAttribute("sa-status")?s.unobserve(t.target):t.target.removeAttribute("sa-status")})},g.destory=t=>{n[t]?.elements&&Object.entries(n[t].elements).forEach(([,t])=>{t.target.setAttribute("style",t.itself),t.target.removeAttribute("sa-id"),t.target.removeAttribute("sa-group-id"),"true"===t.target.getAttribute("sa-status")&&t.target.removeAttribute("sa-status")&&s.unobserve(t.target)}),n[t]={}},g.isGroup=t=>!!n[t],{register:(t,e={})=>{g.register(t,e)},apply:(t,e,r={})=>{g.apply(t,e,r)},reset:t=>{g.reset(t)},clean:t=>{g.clean(t)},isGroup:t=>g.isGroup(t)}})());Object.freeze(scrollanimate);