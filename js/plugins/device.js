var userAgent=navigator.userAgent;function getBrowserVersion(){var e=null;return e=/MSIE (\d+\.\d+);/.test(userAgent)||/Firefox\/([\d.]+)/.test(userAgent)||/Chrome\/([\d.]+)/.test(userAgent)||/Version\/([\d.]+).*Safari/.test(userAgent)||/Opera\/([\d.]+)/.test(userAgent)?parseFloat(RegExp.$1):e}function getBrowserEngine(){var e=null;return/Trident\/([\d.]+)/.test(userAgent)?e="Trident":/Gecko\/([\d.]+)/.test(userAgent)?e="Gecko":/AppleWebKit\/([\d.]+)/.test(userAgent)?e="Webkit":/Presto\/([\d.]+)/.test(userAgent)&&(e="Presto"),e}$(function(){var e=getBrowserEngine();console.log(e),"Gecko"!==e&&"Trident"!==e||document.querySelectorAll("pre").forEach(e=>{console.log(e.querySelector("code")),!e.classList.length&&e.querySelector("code")&&e.classList.add("device-pre-has-code")})});