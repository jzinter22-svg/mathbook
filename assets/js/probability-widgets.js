/* Chapter 6 — reusable probability visuals: dice, coins, balls, cards, and a generic
   tree-diagram renderer. Purely additive (new file, loaded only by chapter-6/ pages);
   follows the declarative data-attribute pattern already used by quiz.js / plot.js.

   Usage (static, auto-rendered on load):
     <span class="pw-die"  data-die="4"></span>
     <span class="pw-coin" data-coin="H"></span>
     <span class="pw-ball" data-ball="red" data-ball-label="1"></span>
     <span class="pw-card" data-card="7" data-card-color="blue"></span>

   Usage (programmatic, e.g. inside an interactive widget's render()):
     PW.die(4), PW.coin("H"), PW.ball("green","3"), PW.card("A","red")
     PW.renderTree(svgEl, treeSpec, opts)
*/
(function(){
  "use strict";
  var ns = "http://www.w3.org/2000/svg";

  var PIP_POS = {
    tl:[26,26], tm:[50,26], tr:[74,26],
    ml:[26,50], mm:[50,50], mr:[74,50],
    bl:[26,74], bm:[50,74], br:[74,74]
  };
  var PIP_MAP = {
    1:["mm"], 2:["tl","br"], 3:["tl","mm","br"],
    4:["tl","tr","bl","br"], 5:["tl","tr","mm","bl","br"],
    6:["tl","tr","ml","mr","bl","br"]
  };

  function die(value, opts){
    opts = opts || {};
    var v = Math.max(1, Math.min(6, parseInt(value,10) || 1));
    var accent = opts.accent || "var(--accent-purple)";
    var pips = PIP_MAP[v].map(function(k){
      var p = PIP_POS[k];
      return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="8.2" fill="'+(opts.pipColor||"var(--text-primary)")+'"/>';
    }).join("");
    return '<svg viewBox="0 0 100 100" role="img" aria-label="حجر نرد يظهر عليه الرقم '+v+'">' +
      '<rect x="5" y="5" width="90" height="90" rx="20" fill="var(--surface)" stroke="'+accent+'" stroke-width="4"/>' +
      pips + '</svg>';
  }

  function coin(face, opts){
    opts = opts || {};
    var isHead = String(face).toUpperCase() !== "T";
    var g1 = isHead ? "var(--accent-orange)" : "var(--accent-blue)";
    var g2 = isHead ? "var(--accent-pink)" : "var(--accent-purple)";
    var gid = "coinGrad" + Math.random().toString(36).slice(2,8);
    var letter = isHead ? "H" : "T";
    var caption = isHead ? "صورة" : "كتابة";
    return '<svg viewBox="0 0 100 100" role="img" aria-label="قطعة نقود، وجه '+caption+'">' +
      '<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="'+g1+'"/><stop offset="1" stop-color="'+g2+'"/></linearGradient></defs>' +
      '<circle cx="50" cy="50" r="45" fill="url(#'+gid+')" stroke="var(--surface)" stroke-width="4"/>' +
      '<circle cx="50" cy="50" r="36" fill="none" stroke="#fff" stroke-width="1.5" opacity=".55"/>' +
      '<text x="50" y="54" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="900" font-size="30" fill="#fff">'+letter+'</text>' +
      '<text x="50" y="78" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="700" font-size="12" fill="#fff" opacity=".92">'+caption+'</text>' +
      '</svg>';
  }

  var BALL_COLORS = {
    red:    ["#ff8a8a","#e6394a"],
    yellow: ["#ffe066","#e6ab00"],
    white:  ["#ffffff","#c3cbd8"],
    blue:   ["#8fd0ff","#3fa9f5"],
    green:  ["#7fe8c2","#2fd18f"],
    black:  ["#6b7385","#242a35"],
    orange: ["#ffc48a","#ff9f5e"],
    purple: ["#c9b6ff","#7c6fee"]
  };
  function ball(color, label, opts){
    opts = opts || {};
    var c = BALL_COLORS[color] || BALL_COLORS.blue;
    var gid = "ballGrad" + Math.random().toString(36).slice(2,8);
    var textColor = color === "white" || color === "yellow" ? "#2b3548" : "#fff";
    var lbl = label ? '<text x="50" y="58" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="800" font-size="26" fill="'+textColor+'">'+label+'</text>' : "";
    return '<svg viewBox="0 0 100 100" role="img" aria-label="كرة لون '+color+(label?(' رقم '+label):"")+'">' +
      '<defs><radialGradient id="'+gid+'" cx="35%" cy="30%" r="75%">' +
      '<stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="44" fill="url(#'+gid+')" stroke="'+(color==="white"?"#c3cbd8":c[1])+'" stroke-width="2"/>' +
      '<ellipse cx="36" cy="32" rx="13" ry="8" fill="#fff" opacity=".45"/>' +
      lbl + '</svg>';
  }

  var CARD_COLORS = {
    red:"var(--accent-red)", blue:"var(--accent-blue)", green:"var(--accent-green)",
    yellow:"#e6ab00", purple:"var(--accent-purple)", orange:"var(--accent-orange)"
  };
  function card(value, color, opts){
    opts = opts || {};
    var accent = CARD_COLORS[color] || CARD_COLORS.blue;
    return '<svg viewBox="0 0 70 100" role="img" aria-label="بطاقة رقم '+value+' لون '+(color||"")+'">' +
      '<rect x="3" y="3" width="64" height="94" rx="10" fill="var(--surface)" stroke="'+accent+'" stroke-width="3.5"/>' +
      '<text x="35" y="45" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="900" font-size="28" fill="'+accent+'">'+value+'</text>' +
      '<circle cx="35" cy="72" r="9" fill="'+accent+'" opacity=".8"/>' +
      '</svg>';
  }

  function initSlots(){
    document.querySelectorAll("[data-die]").forEach(function(el){
      if(el.getAttribute("data-pw-done")) return;
      el.innerHTML = die(el.getAttribute("data-die"), {accent: el.getAttribute("data-die-accent")});
      el.classList.add("pw-die");
      el.setAttribute("data-pw-done","1");
    });
    document.querySelectorAll("[data-coin]").forEach(function(el){
      if(el.getAttribute("data-pw-done")) return;
      el.innerHTML = coin(el.getAttribute("data-coin"));
      el.classList.add("pw-coin");
      el.setAttribute("data-pw-done","1");
    });
    document.querySelectorAll("[data-ball]").forEach(function(el){
      if(el.getAttribute("data-pw-done")) return;
      el.innerHTML = ball(el.getAttribute("data-ball"), el.getAttribute("data-ball-label"));
      el.classList.add("pw-ball");
      el.setAttribute("data-pw-done","1");
    });
    document.querySelectorAll("[data-card]").forEach(function(el){
      if(el.getAttribute("data-pw-done")) return;
      el.innerHTML = card(el.getAttribute("data-card"), el.getAttribute("data-card-color"));
      el.classList.add("pw-card");
      el.setAttribute("data-pw-done","1");
    });
  }

  /* ---- Generic top-down tree renderer -------------------------------------
     spec = { label:"S", sub:"", children:[ {label:"H", prob:"1/2", children:[...]}, ... ] }
     Leaves (nodes without children) get their outcome text drawn to the right/below. */
  function countLeaves(node){
    if(!node.children || !node.children.length) return 1;
    return node.children.reduce(function(a,c){ return a + countLeaves(c); }, 0);
  }
  function maxDepth(node){
    if(!node.children || !node.children.length) return 1;
    return 1 + Math.max.apply(null, node.children.map(maxDepth));
  }

  function renderTree(svg, root, opts){
    opts = opts || {};
    var W = opts.width || Math.max(560, countLeaves(root) * 110);
    var levels = maxDepth(root);
    var levelGap = opts.levelGap || 105;
    var H = opts.height || (levels * levelGap + 70);
    var topPad = opts.topPad || 45;
    var nodeR = opts.nodeR || 24;
    var accent = opts.accent || "#7c6fee";

    while(svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);

    var positions = [];
    var edges = [];
    function layout(node, x0, x1, y, parentPos){
      var cx = (x0 + x1) / 2;
      var pos = {node:node, x:cx, y:y};
      positions.push(pos);
      if(parentPos) edges.push({from:parentPos, to:pos});
      if(node.children && node.children.length){
        var total = countLeaves(node);
        var cursor = x0;
        node.children.forEach(function(c){
          var leaves = countLeaves(c);
          var width = (x1 - x0) * (leaves / total);
          layout(c, cursor, cursor + width, y + levelGap, pos);
          cursor += width;
        });
      }
      return pos;
    }
    layout(root, 20, W - 20, topPad, null);

    edges.forEach(function(e){
      var line = document.createElementNS(ns, "line");
      line.setAttribute("x1", e.from.x); line.setAttribute("y1", e.from.y + nodeR);
      line.setAttribute("x2", e.to.x);   line.setAttribute("y2", e.to.y - nodeR);
      line.setAttribute("stroke", "#b3bdcc"); line.setAttribute("stroke-width", "2.2");
      svg.appendChild(line);
      if(e.to.node.prob){
        var mx = (e.from.x + e.to.x)/2, my = (e.from.y + nodeR + e.to.y - nodeR)/2;
        var t = document.createElementNS(ns, "text");
        t.setAttribute("x", mx); t.setAttribute("y", my - 6);
        t.setAttribute("text-anchor","middle"); t.setAttribute("font-family","Cairo,sans-serif");
        t.setAttribute("font-weight","700"); t.setAttribute("font-size","13");
        t.setAttribute("fill", accent);
        t.textContent = e.to.node.prob;
        svg.appendChild(t);
      }
    });

    positions.forEach(function(p){
      var isLeaf = !(p.node.children && p.node.children.length);
      var circ = document.createElementNS(ns, "circle");
      circ.setAttribute("cx", p.x); circ.setAttribute("cy", p.y); circ.setAttribute("r", nodeR);
      circ.setAttribute("fill", isLeaf ? (p.node.fill || "#2fd18f") : (p.node.fill || accent));
      svg.appendChild(circ);
      var label = document.createElementNS(ns, "text");
      label.setAttribute("x", p.x); label.setAttribute("y", p.y + 5);
      label.setAttribute("text-anchor","middle"); label.setAttribute("font-family","Cairo,sans-serif");
      label.setAttribute("font-weight","800"); label.setAttribute("font-size", isLeaf ? "13" : "14");
      label.setAttribute("fill","#fff");
      label.textContent = p.node.label || "";
      svg.appendChild(label);
      if(p.node.sub){
        var sub = document.createElementNS(ns, "text");
        sub.setAttribute("x", p.x); sub.setAttribute("y", p.y + nodeR + 18);
        sub.setAttribute("text-anchor","middle"); sub.setAttribute("font-family","Cairo,sans-serif");
        sub.setAttribute("font-weight","700"); sub.setAttribute("font-size","12.5");
        sub.setAttribute("fill","var(--text-secondary)");
        sub.textContent = p.node.sub;
        svg.appendChild(sub);
      }
    });
  }

  window.PW = {
    die: die, coin: coin, ball: ball, card: card,
    renderTree: renderTree,
    init: initSlots
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initSlots);
  } else { initSlots(); }
})();
