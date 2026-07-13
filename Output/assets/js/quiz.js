/* Reusable quiz component.
   Markup:
   <div class="neu quiz" data-quiz>
     <div class="quiz-q" data-correct="1">
       <div class="quiz-q-title"><span>1.</span><span>نص السؤال مع رياضيات \(...\)</span></div>
       <div class="quiz-options">
         <label class="quiz-opt"><input type="radio" name="qX"><span>خيار</span></label>
         ...
       </div>
       <div class="quiz-explain">شرح</div>
     </div>
     ...
     <button class="neu-btn primary" data-quiz-check>تحقق من الإجابات</button>
     <div class="quiz-score"></div>
   </div>
*/
(function(){
  "use strict";
  function initQuiz(quiz, idx){
    var questions = quiz.querySelectorAll(".quiz-q");
    questions.forEach(function(q, qi){
      var opts = q.querySelectorAll('input[type=radio]');
      opts.forEach(function(o){ o.name = "quiz"+idx+"_q"+qi; });
    });
    var checkBtn = quiz.querySelector("[data-quiz-check]");
    var scoreEl = quiz.querySelector(".quiz-score");
    if(!checkBtn) return;
    checkBtn.addEventListener("click", function(){
      var correct = 0;
      questions.forEach(function(q){
        var correctIdx = parseInt(q.getAttribute("data-correct"), 10);
        var optLabels = q.querySelectorAll(".quiz-opt");
        var chosen = -1;
        optLabels.forEach(function(lbl, i){
          lbl.classList.remove("correct","wrong");
          var input = lbl.querySelector("input");
          if(input.checked) chosen = i;
        });
        var explain = q.querySelector(".quiz-explain");
        optLabels.forEach(function(lbl,i){
          if(i === correctIdx) lbl.classList.add("correct");
          else if(i === chosen && chosen !== correctIdx) lbl.classList.add("wrong");
        });
        if(chosen === correctIdx){ correct++; }
        if(explain) explain.classList.add("show");
      });
      var total = questions.length;
      if(scoreEl){
        scoreEl.textContent = "النتيجة: " + correct + " من " + total +
          (correct === total ? "  🎉 ممتاز!" : correct >= total*0.6 ? "  👍 جيد، حاول تحسين الباقي" : "  🔁 راجع الدرس وحاول مرة أخرى");
      }
      if(correct === total && window.Ch4 && window.Ch4.markComplete){
        window.Ch4.markComplete(document.body.getAttribute("data-page"));
      }
      if(window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise([quiz]);
    });
  }

  window.Ch4Quiz = {
    init: function(){
      document.querySelectorAll("[data-quiz]").forEach(function(q, i){ initQuiz(q, i); });
    }
  };
})();
