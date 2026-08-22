/* MUBADER — shared runtime: nav, footer, chatbot, counters, reveal */
(function(){
  const PAGES = [
    {href:'/mubader.html', label:'الرئيسية', key:'home'},
    {href:'/opportunities.html', label:'الفرص', key:'opportunities'},
    {href:'/academy.html', label:'الأكاديمية', key:'academy'},
    {href:'/portfolio.html', label:'المحفظة', key:'portfolio'},
    {href:'/awards.html', label:'التقدير', key:'awards'},
    {href:'/about.html', label:'عن المنصة', key:'about'},
  ];

  const currentPage = (document.body.dataset.page || 'home');

  /* ---- NAV injection ---- */
  const navHost = document.getElementById('mub-nav');
  if(navHost){
    navHost.innerHTML = `
    <nav class="nav" aria-label="التنقل الرئيسي">
      <div class="nav-row">
        <a href="./mubader.html" class="logo" style="text-decoration:none;" aria-label="مبادر — الصفحة الرئيسية">
          <img src="./logo-mubader.png" alt="شعار مبادر" class="brand-logo" />
        </a>
        <ul class="nav-links" id="navLinks">
          ${PAGES.map(p=>`<li><a href="${p.href}" class="${p.key===currentPage?'active':''}">${p.label}</a></li>`).join('')}
        </ul>
        <div class="nav-actions">
          <button class="lang-toggle" id="langBtn" aria-label="تبديل اللغة">EN / <b>AR</b></button>
          <button class="btn btn-outline" style="padding:9px 16px; font-size:13px;">تسجيل الدخول</button>
          <button class="btn btn-sand" style="padding:9px 18px; font-size:13px;">انضم كمتطوع</button>
          <button class="menu-toggle" id="menuBtn" aria-label="القائمة">☰</button>
        </div>
      </div>
    </nav>`;
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn && menuBtn.addEventListener('click', ()=> navLinks.classList.toggle('open'));
    const langBtn = document.getElementById('langBtn');
    langBtn && langBtn.addEventListener('click', ()=> alert('سيتم دعم التبديل الكامل للغة الإنجليزية في النسخة النهائية من المنصة.'));
  }

  /* ---- FOOTER injection ---- */
  const footerHost = document.getElementById('mub-footer');
  if(footerHost){
    footerHost.innerHTML = `
    <footer>
      <div class="container">
        <div class="foot-grid">
          <div class="foot-col">
            <h4 style="font-size:18px; display:flex; align-items:center; gap:8px;">مبادر</h4>
            <p style="font-size:13px; color:var(--ink-on-dark-soft); max-width:260px;">المنصة الوطنية الموحّدة للتطوع في ليبيا — محايدة، شفافة، وجامعة لكل الجهود.</p>
          </div>
          <div class="foot-col">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a href="./opportunities.html">الفرص</a></li>
              <li><a href="./academy.html">الأكاديمية</a></li>
              <li><a href="./portfolio.html">المحفظة الرقمية</a></li>
              <li><a href="./awards.html">قائمة التقدير</a></li>
            </ul>
          </div>
          <div class="foot-col">
            <h4>الحوكمة</h4>
            <ul>
              <li><a href="./about.html">عن المنصة</a></li>
              <li><a href="./about.html#transparency">صفحة الشفافية</a></li>
              <li><a href="./about.html#steering">اللجنة التوجيهية</a></li>
            </ul>
          </div>
          <div class="foot-col">
            <h4>السياسات</h4>
            <ul><li><a href="#">سياسة الخصوصية</a></li><li><a href="#">الشروط والأحكام</a></li><li><a href="#">مدونة السلوك</a></li></ul>
          </div>
          <div class="foot-col">
            <h4>الدعم</h4>
            <ul><li><a href="#">مركز المساعدة</a></li><li><a href="#">تواصل معنا</a></li><li><a href="#">إمكانية الوصول</a></li></ul>
          </div>
        </div>
        <div class="foot-bottom">© 2026 مبادر — منصة وطنية محايدة · جميع الحقوق محفوظة</div>
      </div>
    </footer>`;
  }

  /* ---- CHATBOT ---- */
  const chatMount = document.createElement('div');
  chatMount.innerHTML = `
    <button class="chat-fab" id="chatFab" aria-label="افتح المساعد الذكي">
      💬<span class="chat-badge"></span>
    </button>
    <aside class="chat-panel" id="chatPanel" role="dialog" aria-label="مساعد مبادر">
      <div class="chat-head">
        <div class="chat-head-left">
          <div class="chat-avatar">م</div>
          <div>
            <div class="chat-title">مساعد مبادر</div>
            <div class="chat-sub"><span class="pulse-dot"></span> متصل الآن</div>
          </div>
        </div>
        <button class="chat-close" id="chatClose" aria-label="إغلاق">×</button>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="chat-msg bot">أهلًا بك في <b>مبادر</b> 🌿 كيف يمكنني مساعدتك اليوم؟</div>
        <div class="chat-msg bot">يمكنك سؤالي عن الفرص، الأكاديمية، النقاط، أو كيفية التسجيل.</div>
      </div>
      <div class="chat-suggestions" id="chatSugg">
        <span class="chat-sugg">كيف أسجّل كمتطوع؟</span>
        <span class="chat-sugg">ما هي نقاط مبادر؟</span>
        <span class="chat-sugg">أقرب فرصة لي</span>
        <span class="chat-sugg">شهادات الأكاديمية</span>
      </div>
      <form class="chat-input-row" id="chatForm">
        <label for="chatInput" style="position:absolute; left:-9999px;">اكتب رسالتك</label>
        <input id="chatInput" type="text" placeholder="اكتب سؤالك هنا..." autocomplete="off">
        <button class="chat-send" type="submit" aria-label="إرسال">➤</button>
      </form>
    </aside>`;
  document.body.appendChild(chatMount);

  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const chatBody = document.getElementById('chatBody');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const suggBox = document.getElementById('chatSugg');
  const badge = fab.querySelector('.chat-badge');

  function togglePanel(open){
    panel.classList.toggle('open', open);
    if(open){ badge.style.display='none'; setTimeout(()=>chatInput.focus(), 100); }
  }
  fab.addEventListener('click', ()=> togglePanel(!panel.classList.contains('open')));
  closeBtn.addEventListener('click', ()=> togglePanel(false));

  function addMsg(text, who){
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    div.innerHTML = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function botReply(userText){
    const q = userText.toLowerCase();
    let reply;
    if(/تسج|انضم|حساب/.test(q)) reply = 'للتسجيل كمتطوع: اضغط زر <b>"انضم كمتطوع"</b> أعلى الصف��ة، أنشئ حسابك، ثم اختر مجالاتك واهتماماتك — ستصلك فرص مقترحة فورًا.';
    else if(/نقاط|point|score|ترتيب/.test(q)) reply = '📊 <b>نقاط مبادر</b> هي مقياس التأثير في المنصة:<br>• كل ساعة تطوع = 5 نقاط<br>• إتمام فرصة = 20 نقطة<br>• شهادة أكاديمية = 40 نقطة<br>• قيادة فريق = 60 نقطة<br>• تقييم ممتاز من المنظمة = 15 نقطة إضافية.';
    else if(/فرص|قريب|قرب/.test(q)) reply = 'لعرض الفرص القريبة منك، افتح صفحة <a href="./opportunities.html">الفرص</a> واستخدم التوصيات الذكية بعد اختيار مدينتك واهتماماتك.';
    else if(/أكاديم|شهاد|دور/.test(q)) reply = '🎓 أكاديمية مبادر تقدّم دورات قصيرة بشهادات معتمدة تُضاف تلقائيًا إلى محفظتك الرقمية. زُر <a href="./academy.html">صفحة الأكاديمية</a>.';
    else if(/محفظ|سيرة|cv/.test(q)) reply = 'محفظتك الرقمية تجمع ساعاتك، شهاداتك، وتقييمات المنظمات في رابط أنيق قابل للمشاركة. راجع <a href="./portfolio.html">المحفظة</a>.';
    else if(/شكر|thank/.test(q)) reply = 'العفو 🌿 نحن هنا دائمًا لخدمة كل متطوع في ليبيا.';
    else reply = 'شكرًا لسؤالك! فريقنا سيراجع طلبك ويعود إليك قريبًا. في الأثناء، جرّب زيارة <a href="./opportunities.html">صفحة الفرص</a> أو <a href="./about.html">صفحة عن المنصة</a>.';
    setTimeout(()=> addMsg(reply, 'bot'), 500);
  }
  chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = chatInput.value.trim();
    if(!v) return;
    addMsg(v, 'user');
    chatInput.value = '';
    botReply(v);
  });
  suggBox.addEventListener('click', (e)=>{
    if(e.target.classList.contains('chat-sugg')){
      const t = e.target.textContent;
      addMsg(t, 'user');
      botReply(t);
    }
  });

  /* ---- counters ---- */
  function animateCount(el, target){
    const dur = 1400, t0 = performance.now();
    function step(t){
      const p = Math.min((t - t0)/dur, 1);
      el.textContent = Math.floor(p*target).toLocaleString('en-US');
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('[data-count-now]').forEach(el=>{
    animateCount(el, parseInt(el.dataset.countNow));
  });
  const statEls = document.querySelectorAll('[data-count]');
  if(statEls.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ animateCount(en.target, parseInt(en.target.dataset.count)); io.unobserve(en.target); }
      });
    },{threshold:.4});
    statEls.forEach(el=> io.observe(el));
  }

  /* ---- reveal ---- */
  const rIo = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('show'); rIo.unobserve(en.target); } });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=> rIo.observe(el));

  /* ---- opportunity filters ---- */
  const filterBar = document.getElementById('filterBar');
  if(filterBar){
    const btns = filterBar.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#oppGrid .opp-card');
    btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        btns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.f;
        cards.forEach(c=>{ c.style.display = (f==='all' || c.dataset.cat===f) ? 'flex' : 'none'; });
      });
    });
  }

  /* ---- reco chips ---- */
  document.querySelectorAll('#recoChips .reco-chip').forEach(chip=>{
    chip.addEventListener('click', ()=> chip.classList.toggle('on'));
  });

  /* ---- categories render ---- */
  const catGrid = document.getElementById('catGrid');
  if(catGrid){
    const cats = ['تعليم','صحة','بيئة','طوارئ','تقنية','ثقافة','رياضة','تنمية مجتمعية','عمل إنساني','شباب','تمكين المرأة','ابتكار'];
    const icons = {'تعليم':'📚','صحة':'❤️','بيئة':'🌿','طوارئ':'🚑','تقنية':'💻','ثقافة':'🎭','رياضة':'⚽','تنمية مجتمعية':'🤝','عمل إنساني':'🕊️','شباب':'✨','تمكين المرأة':'🌸','ابتكار':'💡'};
    cats.forEach(n=>{
      const d = document.createElement('div');
      d.className = 'cat-card';
      d.innerHTML = `<div class="cat-icon"><span style="font-size:20px;">${icons[n]||'•'}</span></div><span>${n}</span>`;
      catGrid.appendChild(d);
    });
  }

  /* ---- map ---- */
  const cityData = {
    tripoli:{name:'طرابلس', vol:'4,120', opp:'86', hrs:'22,400', org:'54'},
    benghazi:{name:'بنغازي', vol:'3,240', opp:'62', hrs:'17,100', org:'41'},
    misrata:{name:'مصراتة', vol:'2,180', opp:'44', hrs:'11,600', org:'29'},
    sabha:{name:'سبها', vol:'980', opp:'21', hrs:'5,200', org:'14'},
    zawiya:{name:'الزاوية', vol:'1,340', opp:'27', hrs:'7,050', org:'18'},
    bayda:{name:'البيضاء', vol:'1,020', opp:'19', hrs:'4,800', org:'12'}
  };
  document.querySelectorAll('.city-dot').forEach(dot=>{
    dot.addEventListener('click', ()=>{
      document.querySelectorAll('.city-dot').forEach(d=>d.classList.remove('selected'));
      dot.classList.add('selected');
      const d = cityData[dot.dataset.city]; if(!d) return;
      const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
      set('mapCity', d.name); set('mapVol', d.vol); set('mapOpp', d.opp); set('mapHrs', d.hrs); set('mapOrg', d.org);
    });
  });

  /* ---- newsletter channel ---- */
  document.querySelectorAll('.channel-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      document.querySelectorAll('.channel-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
})();
