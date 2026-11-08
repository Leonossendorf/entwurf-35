(function(){
  var root=document.documentElement;
  // Schrift größer, bleibt gespeichert
  var sb=document.getElementById('schrift');
  try{ if(localStorage.getItem('spb-gross')==='1'){root.classList.add('gross');sb&&sb.setAttribute('aria-pressed','true');} }catch(e){}
  sb&&sb.addEventListener('click',function(){
    var an=!root.classList.contains('gross');
    root.classList.toggle('gross',an); sb.setAttribute('aria-pressed',an?'true':'false');
    try{localStorage.setItem('spb-gross',an?'1':'0');}catch(e){}
  });

  // Menü am Handy
  var bu=document.querySelector('.burger'), menu=document.getElementById('menu');
  bu&&bu.addEventListener('click',function(){
    var o=menu.classList.toggle('offen'); bu.setAttribute('aria-expanded',o?'true':'false');
  });
  menu&&menu.addEventListener('click',function(e){ if(e.target.tagName==='A'){menu.classList.remove('offen');bu.setAttribute('aria-expanded','false');} });

  // Formular: Weichen
  var form=document.getElementById('formular');
  function weiche(){
    var w=(form.querySelector('input[name=anliegen]:checked')||{}).value;
    form.querySelectorAll('.nur').forEach(function(el){ el.hidden = el.getAttribute('data-zeige')!==w; });
  }
  form.addEventListener('change',function(e){ if(e.target.name==='anliegen') weiche(); });
  // Knöpfe mit data-anliegen wählen vor
  document.querySelectorAll('[data-anliegen]').forEach(function(a){
    a.addEventListener('click',function(){
      var r=form.querySelector('input[name=anliegen][value="'+a.getAttribute('data-anliegen')+'"]');
      if(r){ r.checked=true; weiche(); }
    });
  });
  weiche();

  // Absenden (Entwurf)
  var texte={
    notar:'In der fertigen Seite käme Ihre Nachricht jetzt im Notariat an, und die Kanzlei meldet sich bei Ihnen.',
    anwalt:'In der fertigen Seite käme Ihre Nachricht jetzt im Sekretariat an, und die Kanzlei meldet sich bei Ihnen.',
    hof:'In der fertigen Seite käme Ihre Anfrage jetzt bei Herrn Peters und Frau Humbert an, und die Kanzlei meldet sich für ein erstes Gespräch.',
    urkunde:'In der fertigen Seite käme Ihre Frage mit der Urkundennummer jetzt im Notariat an, und die zuständige Mitarbeiterin meldet sich.',
    bewerbung:'In der fertigen Seite käme Ihre Bewerbung jetzt in der Kanzlei an, und Sie hören von uns.'
  };
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var weg=document.getElementById('weg'), f=document.getElementById('fehler');
    if(!weg.value.trim()){ f.hidden=false; weg.parentNode.classList.add('ungueltig'); weg.setAttribute('aria-invalid','true'); weg.focus(); return; }
    f.hidden=true; weg.parentNode.classList.remove('ungueltig'); weg.removeAttribute('aria-invalid');
    var w=(form.querySelector('input[name=anliegen]:checked')||{}).value||'anwalt';
    document.getElementById('danke-text').textContent=texte[w]+' Im Entwurf wird nichts versendet.';
    var d=document.getElementById('danke'); d.hidden=false; d.focus();
  });

  // ruhiges Einblenden
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var els=document.querySelectorAll('.kopfzeile,.anliegen,.ablauf,.zweispalt,.hof__text,.hof__fragen,.person,.kanzlei__text,.ausbildung__in,.kontakt__in');
    var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('da'); io.unobserve(en.target);} }); },{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ el.classList.add('zeigen'); io.observe(el); });
  }
})();
