var userAgent=navigator.userAgent;function getBrowserVersion(){var e=null;return e=/MSIE (\d+\.\d+);/.test(userAgent)||/Firefox\/([\d.]+)/.test(userAgent)||/Chrome\/([\d.]+)/.test(userAgent)||/Version\/([\d.]+).*Safari/.test(userAgent)||/Opera\/([\d.]+)/.test(userAgent)?parseFloat(RegExp.$1):e}function getBrowserEngine(){var e=null;return/Trident\/([\d.]+)/.test(userAgent)?e="Trident":/Gecko\/([\d.]+)/.test(userAgent)?e="Gecko":/AppleWebKit\/([\d.]+)/.test(userAgent)?e="Webkit":/Presto\/([\d.]+)/.test(userAgent)&&(e="Presto"),e}var preNodes,browserEngine=getBrowserEngine();console.log(browserEngine),"Gecko"!==browserEngine&&"Trident"!==browserEngine||(console.log("1111111"),(preNodes=document.querySelectorAll("pre")).forEach(e=>{""===e.classList&&e.querySelector("code")&&e.classList.add("device-pre-has-code")}));