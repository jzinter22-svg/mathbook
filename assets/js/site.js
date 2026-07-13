/* Chapter 4 — shared site behaviour: header, TOC drawer, theme toggle, progress, reveal animations */
(function(){
  "use strict";

  var LESSONS = [
    {href:"index.html",            title:"الصفحة الرئيسية",              root:true},
    {href:"lessons/lesson-1.html", title:"1) مفاهيم عامة والدالة المقابلة"},
    {href:"lessons/lesson-2.html", title:"2) قواعد وخواص التكامل غير المحدد"},
    {href:"lessons/lesson-3.html", title:"3) مهارات استخراج قيمة التكامل"},
    {href:"lessons/lesson-4.html", title:"4) تطبيقات هندسية وفيزيائية"},
    {href:"lessons/lesson-5.html", title:"5) التكامل المحدد وخواصه"},
    {href:"lessons/lesson-6.html", title:"6) مساحة المنطقة المستوية"},
    {href:"lessons/lesson-7.html", title:"7) التطبيق الفيزيائي للتكامل المحدد"}
  ];

  var STORAGE_KEY = "ch4_progress_v1";
  var THEME_KEY = "ch4_theme";

  function getBase(){
    var d = document.documentElement.getAttribute("data-base");
    return d || "";
  }

  function loadProgress(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }catch(e){ return {}; }
  }
  function saveProgress(p){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }catch(e){}
  }
  window.Ch4 = window.Ch4 || {};
  window.Ch4.markComplete = function(id){
    var p = loadProgress();
    p[id] = true;
    saveProgress(p);
    updateProgressUI();
  };
  window.Ch4.isComplete = function(id){
    return !!loadProgress()[id];
  };

  function updateProgressUI(){
    var p = loadProgress();
    var total = LESSONS.length - 1;
    var done = 0;
    LESSONS.forEach(function(l){ if(!l.root && p[l.href]) done++; });
    var pct = total ? Math.round((done/total)*100) : 0;
    document.querySelectorAll(".progress-fill").forEach(function(f){ f.style.width = pct + "%"; });
    document.querySelectorAll(".progress-label").forEach(function(f){ f.textContent = pct + "٪ مكتمل"; });
    document.querySelectorAll(".toc-list a").forEach(function(a){
      var href = a.getAttribute("data-href");
      if(href && p[href]) a.classList.add("is-done");
    });
  }

  function applyTheme(){
    var t = localStorage.getItem(THEME_KEY);
    if(t) document.documentElement.setAttribute("data-theme", t);
  }
  function toggleTheme(){
    var cur = document.documentElement.getAttribute("data-theme");
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  }

  function buildHeader(){
    var header = document.querySelector(".site-header");
    if(!header) return;
    var base = getBase();
    var current = document.body.getAttribute("data-page") || "";

    var brand = document.createElement("a");
    brand.className = "brand";
    brand.href = base + "index.html";
    brand.innerHTML = '<span class="brand-badge">∫</span><span>الفصل الرابع · التكامل</span>';

    var actions = document.createElement("div");
    actions.className = "header-actions";
    actions.innerHTML =
      '<button class="neu-icon-btn" id="themeToggle" title="تبديل المظهر" aria-label="تبديل المظهر">🌓</button>' +
      '<button class="neu-icon-btn" id="tocToggle" title="فهرس المحتويات" aria-label="فهرس المحتويات">☰</button>';

    header.innerHTML = "";
    var container = document.createElement("div");
    container.className = "container";
    container.appendChild(brand);
    container.appendChild(actions);
    header.appendChild(container);

    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("tocToggle").addEventListener("click", openTOC);
  }

  function buildTOC(){
    var overlay = document.createElement("div");
    overlay.className = "toc-overlay";
    overlay.id = "tocOverlay";
    var drawer = document.createElement("div");
    drawer.className = "toc-drawer";
    drawer.id = "tocDrawer";
    var base = getBase();
    var current = (document.body.getAttribute("data-page") || "");

    var html = '<button class="neu-icon-btn" id="tocClose" aria-label="إغلاق">✕</button>' +
      '<h3>فهرس الفصل الرابع</h3>' +
      '<div class="progress-track" style="margin-bottom:1rem"><div class="progress-fill"></div></div>' +
      '<div class="progress-label" style="text-align:center;color:var(--text-secondary);font-size:.85rem;margin-bottom:1rem"></div>' +
      '<ul class="toc-list">';
    LESSONS.forEach(function(l){
      var href = base + l.href;
      var isCur = current === l.href;
      html += '<li><a href="'+href+'" data-href="'+l.href+'" class="'+(isCur?"current":"")+'">' +
        '<span>'+ l.title +'</span></a></li>';
    });
    html += "</ul>";
    drawer.innerHTML = html;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    overlay.addEventListener("click", closeTOC);
    document.getElementById("tocClose").addEventListener("click", closeTOC);
  }

  function openTOC(){
    document.getElementById("tocOverlay").classList.add("open");
    document.getElementById("tocDrawer").classList.add("open");
  }
  function closeTOC(){
    document.getElementById("tocOverlay").classList.remove("open");
    document.getElementById("tocDrawer").classList.remove("open");
  }

  function buildLessonNav(){
    var nav = document.querySelector(".lesson-nav[data-auto]");
    if(!nav) return;
    var current = document.body.getAttribute("data-page");
    var idx = -1;
    LESSONS.forEach(function(l,i){ if(l.href === current) idx = i; });
    if(idx === -1) return;
    var base = getBase();
    var prev = LESSONS[idx-1];
    var next = LESSONS[idx+1];
    var html = "";
    if(prev){
      html += '<a href="'+base+prev.href+'" class="neu nav-link-card"><span style="font-size:1.4rem">←</span>' +
        '<span><span class="dir">السابق</span><br><span class="lbl">'+prev.title+'</span></span></a>';
    } else { html += "<span></span>"; }
    if(next){
      html += '<a href="'+base+next.href+'" class="neu nav-link-card" style="margin-inline-start:auto;flex-direction:row-reverse;text-align:left">' +
        '<span style="font-size:1.4rem">→</span>' +
        '<span><span class="dir">التالي</span><br><span class="lbl">'+next.title+'</span></span></a>';
    }
    nav.innerHTML = html;
  }

  function revealOnScroll(){
    /* Elements already in view get a quick staggered entrance; anything below
       the fold is revealed the instant it nears the viewport. Nothing is ever
       left permanently hidden (unlike a pure IntersectionObserver approach,
       which can leave off-screen content at opacity:0 if it never scrolls
       into view or if the observer never fires during a snapshot/print). */
    var items = document.querySelectorAll(".fade-up");
    if(!("IntersectionObserver" in window)){
      items.forEach(function(i){ i.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, {threshold:.01, rootMargin:"400px 0px 400px 0px"});
    items.forEach(function(i, idx){
      io.observe(i);
      setTimeout(function(){ i.classList.add("in"); }, 900 + idx*40);
    });
  }

  function setupStepReveals(){
    document.querySelectorAll("[data-reveal-steps]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var target = document.getElementById(btn.getAttribute("data-reveal-steps"));
        if(!target) return;
        var already = target.classList.contains("shown");
        if(already){
          target.classList.remove("shown");
          btn.textContent = btn.getAttribute("data-show-label") || "إظهار خطوات الحل";
        } else {
          target.classList.add("shown");
          var steps = target.querySelectorAll(".step");
          steps.forEach(function(s,i){ s.style.animationDelay = (i*0.15)+"s"; });
          btn.textContent = btn.getAttribute("data-hide-label") || "إخفاء خطوات الحل";
        }
      });
    });
  }

  function forceRepaintAfterFonts(){
    /* Headless/low-power Chromium can leave stale glyph rasterization on
       shadowed elements after the Cairo web font swaps in (visible as
       clipped-looking Arabic text). Forcing one reflow once fonts are
       confirmed ready guarantees a clean repaint. */
    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(function(){
        var prev = document.body.style.display;
        document.body.style.display = "none";
        void document.body.offsetHeight;
        document.body.style.display = prev;
      });
    }
  }

  function init(){
    applyTheme();
    forceRepaintAfterFonts();
    buildHeader();
    buildTOC();
    buildLessonNav();
    updateProgressUI();
    revealOnScroll();
    setupStepReveals();
    if(window.Ch4Quiz) window.Ch4Quiz.init();
    if(window.Ch4Interactive) window.Ch4Interactive.init();
    if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise(); }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
