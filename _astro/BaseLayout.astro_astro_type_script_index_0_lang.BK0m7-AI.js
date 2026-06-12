function b(){const e=document.createElement("canvas"),t=e.getContext("webgl",{failIfMajorPerformanceCaveat:!0})||e.getContext("experimental-webgl",{failIfMajorPerformanceCaveat:!0});return e.getContext("webgl")||e.getContext("experimental-webgl")?t?{webglSupported:!0,hardwareAccelerated:!0}:{webglSupported:!0,hardwareAccelerated:!1}:{webglSupported:!1,hardwareAccelerated:!1}}function y(){const e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)return null;const n=t,r=n.getExtension("WEBGL_debug_renderer_info");if(r){const o=n.getParameter(r.UNMASKED_RENDERER_WEBGL),a=n.getParameter(r.UNMASKED_VENDOR_WEBGL);return{isSoftwareRenderer:["swiftshader","software","llvmpipe","microsoft basic render"].some(s=>o.toLowerCase().includes(s)),renderer:o,vendor:a}}return null}const E="axi-blog-graphics-warning-shown",g="axi-blog-webgl-support",S="1.0",k=10080*60*1e3;function I(){try{return localStorage.getItem(E)==="true"}catch{return!1}}function d(){try{localStorage.setItem(E,"true")}catch{}}function v(){try{const e=localStorage.getItem(g);if(!e)return null;const t=JSON.parse(e),n=Date.now();return t.version!==S||n-t.timestamp>k?(localStorage.removeItem(g),null):t}catch{return null}}function C(e){try{const t={...e,timestamp:Date.now(),version:S};localStorage.setItem(g,JSON.stringify(t))}catch{}}function x(){const e=window.location.pathname;return e.includes("/en/")||e.endsWith("/en")?"en":"zh"}const u={zh:{webglError:{title:"浏览器兼容性提醒",content:`
        <strong>您的浏览器不支持 WebGL 技术</strong>，可能会影响网站的某些功能体验。
        
        <ul class="graphics-warning-list">
          <li>更新到最新版本的现代浏览器（Chrome、Firefox、Edge、Safari）</li>
          <li>确保您的设备支持硬件加速</li>
          <li>如果使用的是较老的设备，建议升级浏览器版本</li>
        </ul>
      `},performanceWarning:{title:"性能优化建议",content:`
        <strong>检测到您的浏览器可能未启用硬件加速</strong>，这可能会影响网页性能和视觉效果。开启硬件加速通常<strong>不会导致性能开销明显增加</strong>，但是可能可以显著提升网页的渲染速度与浏览体验。
        
        <ul class="graphics-warning-list">
          <li><strong>Chrome:</strong> 设置 → 系统 → 使用图形加速功能（如果可用）</li>
          <li><strong>Firefox:</strong> 设置 → 常规 → 性能 → 使用推荐的性能设置 → 自动启用硬件加速</li>
          <li><strong>Edge:</strong> 设置 → 系统和性能 → 图形加速 → 在可用时使用图形加速</li>
          <li>重启浏览器让设置生效</li>
        </ul>
        
        <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
          💡 如果您的设备较老或不支持硬件加速，网站仍可正常使用。
        </p>
      `},button:"我知道了"},en:{webglError:{title:"Browser Compatibility Notice",content:`
        <strong>Your browser does not support WebGL technology</strong>, which may affect some website features and experience.
        
        <ul class="graphics-warning-list">
          <li>Update to the latest version of modern browsers (Chrome, Firefox, Edge, Safari)</li>
          <li>Ensure your device supports hardware acceleration</li>
          <li>For older devices, consider upgrading your browser version</li>
        </ul>
      `},performanceWarning:{title:"Performance Optimization Suggestion",content:`
        <strong>Hardware acceleration may not be enabled in your browser</strong>, which could affect web performance and visual effects. Enabling hardware acceleration typically <strong>does not significantly increase performance overhead</strong>, but can significantly improve web rendering speed and browsing experience.
        
        <ul class="graphics-warning-list">
          <li><strong>Chrome:</strong> Settings → System → Use hardware acceleration when available</li>
          <li><strong>Firefox:</strong> Settings → General → Performance → Use recommended performance settings → Enable hardware acceleration</li>
          <li><strong>Edge:</strong> Settings → System and performance → Use hardware acceleration when available</li>
          <li>Restart your browser for settings to take effect</li>
        </ul>
        
        <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
          💡 If your device is older or doesn't support hardware acceleration, the website will still work normally.
        </p>
      `},button:"Got it"}},L="axi-blog-graphics-warning-shown";function f(e,t,n="warning"){const r=x(),o=u[r].button,a=document.createElement("div");a.className="graphics-warning-overlay";const i=document.createElement("div");i.className="graphics-warning-dialog";const w=n==="error"?"graphics-warning-icon error":"graphics-warning-icon",s=n==="error"?"🚫":"⚠️";i.innerHTML=`
    <div class="graphics-warning-header">
      <div class="${w}">${s}</div>
      <h3 class="graphics-warning-title">${e}</h3>
    </div>
    <div class="graphics-warning-content">
      ${t}
    </div>
    <div class="graphics-warning-actions">
      <button class="graphics-warning-btn" onclick="this.closest('.graphics-warning-overlay').remove(); localStorage.setItem('${L}', 'true')">
        ${o}
      </button>
    </div>
  `,a.appendChild(i),document.body.appendChild(a),a.addEventListener("click",l=>{l.target===a&&(d(),a.remove())});const h=l=>{l.key==="Escape"&&(d(),a.remove(),document.removeEventListener("keydown",h))};document.addEventListener("keydown",h),d()}function p(){const e=document.getElementById("gradient-background");e&&(e.style.display="block",e.style.opacity="1");const t=document.createElement("style");t.textContent=`
    header-component.not-top {
      background-color: hsl(var(--background) / 0.0) !important;
    }
    .dark header-component.not-top {
      background-color: hsl(var(--muted) / 0.0) !important;
    }
  `,document.head.appendChild(t)}function c(){const e=document.getElementById("gradient-background");e&&(e.style.opacity="0",setTimeout(()=>{e.style.display="none"},1e3))}function A(e,t){document.getElementById("gradient-background")&&(!e||!t?c():p())}function G(){try{const e=b(),t=y();C({webglSupported:e.webglSupported,hardwareAccelerated:e.hardwareAccelerated&&!(t&&t.isSoftwareRenderer)});const n=v();n&&(!n.webglSupported||!n.hardwareAccelerated?c():p())}catch{}}function W(){if(!I())try{const e=x(),t=b(),n=y();if(C({webglSupported:t.webglSupported,hardwareAccelerated:t.hardwareAccelerated&&!(n&&n.isSoftwareRenderer)}),t.webglSupported)if(!t.hardwareAccelerated||n&&n.isSoftwareRenderer){c();const r=u[e].performanceWarning;f(r.title,r.content,"warning")}else p();else{c();const r=u[e].webglError;f(r.title,r.content,"error")}}catch{}}function m(){const e=v();!!e&&e?(A(e.webglSupported,e.hardwareAccelerated),setTimeout(G,1500)):setTimeout(W,1500)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m();
