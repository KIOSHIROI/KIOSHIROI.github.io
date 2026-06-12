class o{config;root;start=0;allArticles=[];container;randomArticleContainer;statsContainer;loadMoreBtn;modal;load(){this.loadMoreArticles(),this.loadMoreBtn.addEventListener("click",this.loadMoreArticles.bind(this)),window.onclick=t=>{const e=document.getElementById("modal");t.target===e&&this.hideModal()}}init(t){this.config={private_api_url:t.private_api_url||"",page_turning_number:t.page_turning_number||20,error_img:t.error_img||"https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"},this.root=document.getElementById("friend-circle-lite-root"),this.root&&(this.root.innerHTML="",this.createContainers())}createContainers(){this.randomArticleContainer=this.createElement("div",{id:"random-article"}),this.container=this.createElement("div",{className:"articles-container",id:"articles-container"}),this.loadMoreBtn=this.createElement("button",{id:"load-more-btn",innerText:"Load more"}),this.statsContainer=this.createElement("div",{id:"stats-container"}),this.root.append(this.randomArticleContainer,this.container,this.loadMoreBtn,this.statsContainer)}createElement(t,e){const a=document.createElement(t);return Object.assign(a,e),a}loadMoreArticles(){const t="friend-circle-lite-cache",e="friend-circle-lite-cache-time",a=localStorage.getItem(e),r=Date.now();if(a&&r-Number(a)<600*1e3){const l=localStorage.getItem(t),i=l?JSON.parse(l):null;if(i){this.processArticles(i);return}}fetch(`${this.config.private_api_url}all.json`).then(l=>l.json()).then(l=>{localStorage.setItem(t,JSON.stringify(l)),localStorage.setItem(e,r.toString()),this.processArticles(l)}).finally(()=>{this.loadMoreBtn.innerText="Load more"})}processArticles({article_data:t,statistical_data:e}){this.allArticles=t,this.updateStats(e),this.displayRandomArticle(),this.displayArticles()}updateStats(t){this.statsContainer.innerHTML=`
        <div>${t.friends_num} links with ${t.active_num} active | ${t.article_num} articles in total</div>
        <div>Updated at ${t.last_updated_time}</div>
        <div>Powered by <a href="https://github.com/willow-god/Friend-Circle-Lite" target="_blank">FriendCircleLite</a><br></div>
      `}displayArticles(){this.allArticles.slice(this.start,this.start+this.config.page_turning_number).forEach(e=>this.createArticleCard(e)),this.start+=this.config.page_turning_number,this.start>=this.allArticles.length&&(this.loadMoreBtn.style.display="none")}createArticleCard(t){const e=document.createElement("div");e.className="article",e.innerHTML=`
        <div class="article-image author-click">
          <img class="no-lightbox" src="${t.avatar||this.config.error_img}" onerror="this.src='${this.config.error_img}'">
        </div>
        <div class="article-container">
          <div class="article-author author-click">${t.author}</div>
          <a class="article-title" href="${t.link instanceof URL?t.link.toString():t.link}" target="_blank">${t.title}</a>
          <div class="article-date">️${t.created.substring(0,10)}</div>
        </div>
      `,e.querySelectorAll(".author-click").forEach(a=>{a.addEventListener("click",()=>{this.showAuthorArticles(t.author,t.avatar,t.link)})}),this.container.appendChild(e)}displayRandomArticle(){const t=this.allArticles[Math.floor(Math.random()*this.allArticles.length)];this.randomArticleContainer.innerHTML=`
        <div class="random-title">Random Poll</div>
        <div class="article-container">
          <div class="article-author">${t.author}</div>
          <a class="article-title" href="${t.link}" target="_blank">${t.title}</a>
          <div class="article-date">️${t.created.substring(0,10)}</div>
        </div>
        <button id="random-refresh">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M2 12.08c-.006-.862.91-1.356 1.618-.975l.095.058l2.678 1.804c.972.655.377 2.143-.734 2.007l-.117-.02l-1.063-.234a8.002 8.002 0 0 0 14.804.605a1 1 0 0 1 1.82.828c-1.987 4.37-6.896 6.793-11.687 5.509A10 10 0 0 1 2 12.08m.903-4.228C4.89 3.482 9.799 1.06 14.59 2.343a10 10 0 0 1 7.414 9.581c.007.863-.91 1.358-1.617.976l-.096-.058l-2.678-1.804c-.972-.655-.377-2.143.734-2.007l.117.02l1.063.234A8.002 8.002 0 0 0 4.723 8.68a1 1 0 1 1-1.82-.828"/></g></svg>
        </button>
      `,this.randomArticleContainer.querySelector("button#random-refresh")?.addEventListener("click",e=>{e.preventDefault(),this.displayRandomArticle()})}showAuthorArticles(t,e,a){if(!document.getElementById("fclite-modal")){const i=this.createElement("div",{id:"modal",className:"modal"});i.innerHTML=`
        <div class="modal-content">
          <div class="modal-header">
            <img class="modal-author-avatar" src="${e||this.config.error_img}" alt="">
            <a class="modal-author-name-link" href="${new URL(a.toString()).origin}" target="_blank">${t}</a>
          </div>
          <div id="modal-articles-container"></div>
        </div>
        `,this.root.appendChild(i)}this.modal=document.getElementById("modal");const r=document.getElementById("modal-articles-container");this.allArticles.filter(i=>i.author===t).slice(0,4).forEach(i=>{const s=`
          <div class="modal-article">
            <a class="modal-article-title" href="${i.link instanceof URL?i.link.toString():i.link}" target="_blank">${i.title}</a>
            <div class="modal-article-date">${i.created.substring(0,10)}</div>
          </div>`;r.insertAdjacentHTML("beforeend",s)}),this.modal.style.display="block",setTimeout(()=>{this.modal.classList.add("modal-open")},10)}hideModal(){this.modal.classList.remove("modal-open"),this.modal.addEventListener("transitionend",()=>{this.modal.style.display="none",this.root.removeChild(this.modal)},{once:!0})}}const n=new o;n.init({private_api_url:"https://fc.axi404.top/",page_turning_number:10,error_img:"https://cravatar.cn/avatar/57d8260dfb55501c37dde588e7c3852c"});n.load();
