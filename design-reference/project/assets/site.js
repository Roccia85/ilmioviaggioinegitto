/* IL MIO VIAGGIO IN EGITTO — shared behaviour
   Language toggle (IT default / EN), mobile drawer, sticky header, reveal-on-scroll */
(function(){
  /* ---------- Language ---------- */
  var saved = null;
  try{ saved = localStorage.getItem('imvie_lang'); }catch(e){}
  var lang = saved || document.documentElement.getAttribute('data-lang') || 'it';
  function setLang(l){
    lang = l;
    document.documentElement.setAttribute('data-lang', l);
    document.querySelectorAll('[data-lang-btn]').forEach(function(b){
      b.classList.toggle('on', b.getAttribute('data-lang-btn') === l);
    });
    document.querySelectorAll('[data-set-lang]').forEach(function(el){
      // update any title attributes etc if needed (none for now)
    });
    try{ localStorage.setItem('imvie_lang', l); }catch(e){}
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-lang-btn]');
    if(b){ setLang(b.getAttribute('data-lang-btn')); }
  });

  /* ---------- Mobile drawer ---------- */
  document.addEventListener('click', function(e){
    if(e.target.closest('[data-burger]')){ document.getElementById('drawer').classList.add('open'); }
    if(e.target.closest('[data-drawer-close]') || e.target.classList.contains('scrim')){
      document.getElementById('drawer').classList.remove('open');
    }
    if(e.target.closest('.drawer .panel a')){ document.getElementById('drawer').classList.remove('open'); }
  });

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector('.site-header');
  if(header && !header.classList.contains('always-solid')){
    var onScroll = function(){ header.classList.toggle('solid', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---------- Reveal on scroll (with failsafe) ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
  },{threshold:.08, rootMargin:'0px 0px -6% 0px'});
  function revealAll(){ document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ el.classList.add('in'); }); }
  function bindReveal(){
    if(reduceMotion){ revealAll(); return; }
    document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ io.observe(el); });
    clearTimeout(window.__revealFs);
    window.__revealFs = setTimeout(revealAll, 2200);
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function(){ setLang(lang); bindReveal(); });
  setLang(lang); bindReveal();
})();
