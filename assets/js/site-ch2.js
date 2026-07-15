/* Chapter 2 — shared site behaviour: header, TOC drawer, theme toggle, progress, reveal animations.
   Fork of assets/js/site-ch1.js parametrised for Chapter 2 (القطوع المخروطية) so Chapter 1's own
   site-ch1.js never needs to change. Loaded only by chapter-2/ pages. */
(function(){
  "use strict";

  var LESSONS = [
    {href:"index.html",            title:"الصفحة الرئيسية",              root:true},
    {href:"lessons/lesson-1.html", title:"1) المفهوم العام للقطوع المخروطية"},
    {href:"lessons/lesson-2.html", title:"2) تعريف القطع المكافئ ومعادلته"},
    {href:"lessons/lesson-3.html", title:"3) أمثلة وتمارين على القطع المكافئ"},
    {href:"lessons/lesson-4.html", title:"4) القطع الناقص: تعريفه ومعادلته ورسمه"},
    {href:"lessons/lesson-5.html", title:"5) القطع الزائد: تعريفه ومعادلته ورسمه"}
  ];

  var STORAGE_KEY = "ch2_progress_v1";
  var THEME_KEY = "ch4_theme"; /* shared site-wide theme preference across chapters */

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
  window.Ch4.typeset = function(elements){
    /* Safe, retrying wrapper around MathJax.typesetPromise for widgets that
       render a formula in response to user input (sliders, calculators...).
       window.MathJax is only the plain config object until MathJax's async
       script finishes loading, so a plain "if it exists, call it" check can
       silently no-op on a slow-loading page. Retry until it's really ready. */
    function attempt(){
      if(window.MathJax && window.MathJax.typesetPromise){
        window.MathJax.typesetPromise(elements);
      } else {
        setTimeout(attempt, 30);
      }
    }
    attempt();
  };
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
    document.querySelectorAll(".sidebar-link").forEach(function(a){
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

    var toggleBtn = document.createElement("button");
    toggleBtn.className = "neu-icon-btn sidebar-toggle-btn";
    toggleBtn.id = "sidebarToggle";
    toggleBtn.setAttribute("aria-label", "فهرس المحتويات");
    toggleBtn.title = "فهرس المحتويات";
    toggleBtn.textContent = "☰";

    var brand = document.createElement("a");
    brand.className = "brand";
    brand.href = base + "index.html";
    brand.innerHTML = '<span class="brand-badge">◠</span><span>الفصل الثاني · القطوع المخروطية</span>';

    var actions = document.createElement("div");
    actions.className = "header-actions";
    actions.innerHTML = '<button class="neu-icon-btn" id="themeToggle" title="تبديل المظهر" aria-label="تبديل المظهر">🌓</button>';
    actions.insertBefore(toggleBtn, actions.firstChild);

    header.innerHTML = "";
    var container = document.createElement("div");
    container.className = "container";
    container.appendChild(brand);
    container.appendChild(actions);
    header.appendChild(container);

    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    toggleBtn.addEventListener("click", toggleSidebar);
  }

  function buildSidebar(){
    var overlay = document.createElement("div");
    overlay.className = "toc-overlay";
    overlay.id = "sidebarOverlay";
    var aside = document.createElement("aside");
    aside.className = "sidebar";
    aside.id = "sidebarNav";
    var base = getBase();
    var current = (document.body.getAttribute("data-page") || "");

    var html = '<div class="sidebar-inner">' +
      '<div class="sidebar-topbar">' +
        '<button class="neu-icon-btn sidebar-close-btn" id="sidebarClose" aria-label="إغلاق">✕</button>' +
      '</div>' +
      '<a class="sidebar-brand" href="'+base+'index.html"><span class="brand-badge">◠</span><span>الفصل الثاني</span></a>' +
      '<div class="sidebar-subtitle">القطوع المخروطية · Conic Sections</div>' +
      '<div class="sidebar-progress">' +
        '<div class="progress-track"><div class="progress-fill"></div></div>' +
        '<div class="progress-label"></div>' +
      '</div>' +
      '<nav class="sidebar-nav"><ul class="sidebar-list">';

    LESSONS.forEach(function(l){
      var href = base + l.href;
      var isCur = current === l.href;
      html += '<li class="sidebar-item'+(isCur?" active":"")+'">' +
        '<a href="'+href+'" data-href="'+l.href+'" class="sidebar-link'+(l.root?" root":"")+(isCur?" current":"")+'">'+l.title+'</a>';
      if(isCur){
        var subs = document.querySelectorAll("main section[id][data-navlabel]");
        if(subs.length){
          html += '<ul class="sidebar-sublist">';
          subs.forEach(function(s){
            html += '<li><a href="#'+s.id+'" class="sidebar-sublink" data-target="'+s.id+'">'+s.getAttribute("data-navlabel")+'</a></li>';
          });
          html += '</ul>';
        }
      }
      html += '</li>';
    });
    html += '</ul></nav></div>';
    aside.innerHTML = html;

    document.body.appendChild(overlay);
    document.body.appendChild(aside);

    overlay.addEventListener("click", closeSidebar);
    var closeBtn = document.getElementById("sidebarClose");
    if(closeBtn) closeBtn.addEventListener("click", closeSidebar);
    aside.querySelectorAll(".sidebar-sublink").forEach(function(a){
      a.addEventListener("click", function(){ if(window.innerWidth < 1180) closeSidebar(); });
    });
    aside.querySelectorAll(".sidebar-link").forEach(function(a){
      a.addEventListener("click", function(){ if(window.innerWidth < 1180) closeSidebar(); });
    });

    setupScrollspy();
  }

  function openSidebar(){
    document.getElementById("sidebarOverlay").classList.add("open");
    document.getElementById("sidebarNav").classList.add("open");
  }
  function closeSidebar(){
    document.getElementById("sidebarOverlay").classList.remove("open");
    document.getElementById("sidebarNav").classList.remove("open");
  }
  function toggleSidebar(){
    var nav = document.getElementById("sidebarNav");
    if(nav.classList.contains("open")) closeSidebar(); else openSidebar();
  }

  function setupScrollspy(){
    var subs = document.querySelectorAll("main section[id][data-navlabel]");
    var links = document.querySelectorAll(".sidebar-sublink");
    if(!subs.length || !links.length || !("IntersectionObserver" in window)) return;
    var linkMap = {};
    links.forEach(function(l){ linkMap[l.getAttribute("data-target")] = l; });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var link = linkMap[e.target.id];
        if(!link) return;
        if(e.isIntersecting) link.classList.add("in-view");
        else link.classList.remove("in-view");
      });
    }, {rootMargin:"-20% 0px -70% 0px", threshold:0});
    subs.forEach(function(s){ io.observe(s); });
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

  var BG_SYMBOLS = ["y²=4ax","F","e","x²/a²+y²/b²=1","القطع الناقص","القطع الزائد","القطع المكافئ","V","الدليل"];
  function buildMathBackground(){
    if(document.querySelector(".math-bg")) return;
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var wrap = document.createElement("div");
    wrap.className = "math-bg";
    wrap.setAttribute("aria-hidden", "true");
    var n = window.innerWidth < 700 ? 9 : 16;
    for(var i=0;i<n;i++){
      var s = document.createElement("span");
      s.className = "math-bg-item";
      s.textContent = BG_SYMBOLS[i % BG_SYMBOLS.length];
      s.style.left = (3 + Math.random()*82) + "%";
      s.style.top = (4 + Math.random()*88) + "%";
      s.style.fontSize = (1.1 + Math.random()*1.7) + "rem";
      s.style.animationDuration = (26 + Math.random()*28) + "s";
      s.style.animationDelay = (-(Math.random()*30)) + "s";
      s.style.setProperty("--drift", (Math.random()>.5?1:-1) * (20 + Math.random()*40) + "px");
      wrap.appendChild(s);
    }
    document.body.insertBefore(wrap, document.body.firstChild);
  }

  function forceRepaintAfterFonts(){
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
    buildMathBackground();
    buildHeader();
    buildSidebar();
    buildLessonNav();
    updateProgressUI();
    revealOnScroll();
    setupStepReveals();
    if(window.Ch4Quiz) window.Ch4Quiz.init();
    if(window.Ch4Interactive) window.Ch4Interactive.init();
    typesetOnceReady();
  }

  function typesetOnceReady(){
    /* MathJax's own automatic startup typeset raced this page's explicit
       call on lessons with heavier inline scripts: sometimes only part of
       the page rendered, sometimes every formula rendered twice. Startup
       auto-typeset is disabled (see each lesson's MathJax config,
       startup:{typeset:false}) so there is exactly one typeset pass, ever.
       Polling for window.MathJax.typesetPromise alone isn't enough: that
       method reference can exist before MathJax's component graph (tex
       input, chtml output, font data) has actually finished loading, and
       calling it that early silently typesets only part of the page.
       MathJax.startup.promise is the documented full-readiness signal —
       it resolves once startup truly completes, whether or not an
       automatic pass ran. */
    if(window.MathJax && window.MathJax.startup && window.MathJax.startup.promise){
      window.MathJax.startup.promise.then(function(){
        window.MathJax.typesetPromise();
      });
    } else {
      setTimeout(typesetOnceReady, 30);
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
