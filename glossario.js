/* ===================== GLOSSÁRIO (tradução ao passar o mouse) =====================
   Só em aparelhos com mouse. Junta, nesta ordem de preferência: as traduções escritas
   no caderno (epítetos, virtudes, palavras-chave), o glossário abaixo, o léxico do
   Ἀριθμός e os teônimos. As glosas abaixo são breves, no sentido em que o termo
   aparece no Okhema; não substituem o dicionário. */
const GLOSSARIO_TXT=`
ΟΧΗΜΑ=veículo (da alma)|Ὄχημα=veículo (da alma)|Ἀριθμός=número|Ἄγαλμα=imagem sagrada, aquilo em que o deus se compraz|ἀγάλλω=alegrar, honrar, adornar|ἀγάλματα θεῶν=imagens dos deuses
Θεοί=deuses|Ἔννοια=noção, pensamento|Ἱεροστήριον=fundamento sagrado, base do sagrado|Ἱ.Στήριον=fundamento sagrado|Στήριον=fundamento, suporte|Βάθρον=base, pedestal|στερεός=sólido, firme
Σοφία=sabedoria|Ζωή=vida|Λόγος=razão, palavra|Εὐβουλία=bom conselho|Ἔλλαμψις=iluminação, irradiação|Ζῆλος=zelo, emulação|Ἔρως=amor, desejo
Ἀγαθὸς Δαίμων=Bom Daimon|Ἴδιος Δαίμων=Daimon próprio|ἀγαθόν=o bem|ἀλήθεια=verdade|Ἀργώ=Argo, a nau|Ξῖ=xi|Φῖ=fi|Σαμπῖ=sampi|Ϙόππα=koppa|͵Α=Hasta Alpha, mil
φυσικαί=naturais|ἠθικαί=éticas|πολιτικαί=políticas|καθαρτικαί=catárticas|θεωρητικαί=teoréticas
φυσική=física, ciência da natureza|βασιλική=arte régia|διαλεκτική=dialética|ἐρωτική=arte erótica|ῥητορική=retórica|στρατηγική=estratégia, arte do comando|οἰκονομική=economia, arte da casa|πολιτική=política|γνωστική=cognitiva|ἐπιτακτική=prescritiva|κριτική=crítica, judicativa|θρεπτική=nutritiva|τελεστική=telestiké, arte dos ritos|χρηματιστική=arte de enriquecer|τυραννική=tirânica|ἀντιλογική=antilógica, arte da contradição
ἐπιστήμη=ciência, conhecimento|τέχνη=arte, técnica|ἐμπειρία=experiência|δόξα=opinião|διάνοια=pensamento discursivo|νόησις=intelecção|Νοῦς=intelecto|νόος=intelecto, mente|φαντασία=imaginação|τὸ εὐφαντασίωτον=a boa imaginação|φαντασιοπληξία=desvario da imaginação|φύσις=natureza|φυσιολογία=estudo da natureza|θεολογία=teologia|ποίησις=produção, poesia|βίος=vida, modo de vida
φυσικῶς=naturalmente|λογικῶς=racionalmente|νοερῶς=intelectivamente|αἰσθητῶς=sensivelmente
λόγος ἐνδιάθετος=razão interior|λόγος προφορικός=palavra proferida|ἑρμηνεία=interpretação, expressão|εὐγλωττία=eloquência|εὐφημία=bem-dizer, silêncio reverente|ἐχεμυθία=discrição, guardar a palavra|φλυαρία=tagarelice|ψυχαγωγία διὰ λόγων=condução da alma pelas palavras|συνδοξάζειν=partilhar a opinião
σωφροσύνη=temperança|ἀκολασία=intemperança|ἀναισθησία=insensibilidade|ἀνδρεία=coragem|δειλία=covardia|θρασύτης=temeridade|ἀφοβία=destemor|δικαιοσύνη=justiça|φρόνησις=prudência|ἀφροσύνη=insensatez|πανουργία=astúcia vil|ἀγχίνοια=sagacidade|δεινότης=habilidade, engenho|δεξιότης=destreza|μετριοπάθεια=moderação das paixões|ἀπάθεια=impassibilidade|πραότης=mansidão|ὀργή=ira|ὀργιλότης=irascibilidade|ἀοργησία=incapacidade de ira|θυμός=ânimo, ardor|θυμὸς εὐγενής=ardor nobre|καρτερία=firmeza, perseverança|φιλοπονία=amor ao trabalho|ἀργία=ociosidade|ἡσυχία=quietude|αἰδώς=pudor, reverência|ἀναίδεια=impudência|εὐσχημοσύνη=decoro, boa compostura|ἀσχημοσύνη=indecoro|ἀλαζονεία=jactância|εἰρωνεία=ironia, falsa modéstia|κολακεία=adulação|φθόνος=inveja|λύπη=dor, tristeza|ἐπιθυμία=desejo, apetite|εὐορεξία=bom apetite|εὐκρασία=boa mistura, bom temperamento|ὕβρις=desmedida, insolência
στοργή=afeto natural|φιλοστοργία=ternura|ἀστοργία=falta de afeto|ἀνέραστος=sem amor|ἔρως οὐράνιος=amor celeste|ἔρως πάνδημος=amor vulgar|φιλομάθεια=amor ao aprender|πολυμαθία=muito saber|εὐμουσία=boa musicalidade|ἀμουσία=falta de musa, incultura|συμφωνία=consonância, acordo|ἐγκύκλιος παιδεία=educação geral|οἰκειοπραγία=fazer o que é próprio|πολυπραγμοσύνη=intromissão|ἀπραγμοσύνη=inação|πρόνοια=providência|βουλή=deliberação, conselho|καιρός=o momento oportuno
κάθαρσις=purificação|ἁγνεία=pureza|λύσις=libertação|μόνωσις=isolamento, recolhimento|φυγὴ μόνου πρὸς μόνον=fuga do só para o Só|ἄφελε πάντα=retira tudo|ἐπιστροφή=retorno, conversão|πρόοδος=processão|Ὕπαρξις=existência|πίστις=fé, confiança|χάρις=graça, gratidão|μυστήριον=mistério|συνθήματα=senhas, símbolos sagrados|προσπάθεια=simpatia, apego|Ἵδρυσις=consagração, fundação de imagem|εἰκών=imagem, semelhança
ἱερόν=santuário, o sagrado|θυσιαστήριον=altar|βόθρος=fosso ritual|δικαστήριον=tribunal
Ἥλιος=Sol|Σελήνη=Lua|Στίλβων=o Cintilante (Mercúrio)|Φωσφόρος=o Portador da Luz (Vênus)|Πυρόεις=o Ígneo (Marte)|Φαέθων=o Resplandecente (Júpiter)|Φαίνων=o Que Aparece (Saturno)
Κριός=Carneiro (Áries)|Ταῦρος=Touro|Δίδυμοι=Gêmeos|Καρκίνος=Caranguejo (Câncer)|Λέων=Leão|Παρθένος=Virgem|Ζυγός=Balança (Libra)|Σκορπίος=Escorpião|Τοξότης=Arqueiro (Sagitário)|Αἰγόκερως=Chifre de cabra (Capricórnio)|Ὑδροχόος=Aguadeiro (Aquário)|Ἰχθύες=Peixes
Ζεύς=Zeus|Ἥρα=Hera|Ποσειδῶν=Posídon|Ἀθηνᾶ=Atena|Ἀπόλλων=Apolo|Ἄρτεμις=Ártemis|Ἀφροδίτη=Afrodite|Ἄρης=Ares|Δημήτηρ=Deméter|Διόνυσος=Dioniso|Ἥφαιστος=Hefesto|Ἑρμῆς=Hermes|Ἑστία=Héstia|Ἅιδης=Hades|Περσεφόνη=Perséfone|Ἑκάτη=Hécate|Πάν=Pã|Νίκη=Vitória|Τύχη=Fortuna|Ψυχή=alma|Μοῖρα=Destino, quinhão|Θέμις=Têmis, a lei divina|Νύξ=Noite|Ἠώς=Aurora|Γαῖα=Terra|Οὐρανός=Céu|Κρόνος=Cronos|Ῥέα=Reia|Λητώ=Leto|Μνημοσύνη=Memória|Ἀσκληπιός=Asclépio|Ἡρακλῆς=Héracles`;
function glChave(t){
  return String(t||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/ς/g,'σ').replace(/[^Ͱ-Ͽἀ-῿ ]+/g,' ').replace(/\s+/g,' ').trim();
}
const GL_FIXO=new Map();
GLOSSARIO_TXT.split(/[|\n]/).forEach(par=>{const i=par.indexOf('=');if(i>0)GL_FIXO.set(glChave(par.slice(0,i)),par.slice(i+1).trim());});
let GL_CACHE={v:-1,n:-1,m:null};
function glMapa(){
  const lista=todos();
  if(GL_CACHE.m&&GL_CACHE.v===S.versao&&GL_CACHE.n===lista.length)return GL_CACHE.m;
  const m=new Map();
  /* o que está no Analisador e no Okhema (sentidos já curtos) */
  try{arAcervoFixo().forEach(e=>{if(e.origem==='lexico'&&e.sentido)m.set(glChave(e.palavra),e.sentido);});}catch(e){}
  GL_FIXO.forEach((v,k)=>m.set(k,v));
  Object.values(SPAIRAS).forEach(s=>{if(s.tipo==='vogal')m.set(glChave(s.rotulo),`spaira ${s.rotulo} · ${s.nome_proprio||''} · ${s.planeta}`);});
  /* o que o caderno escreveu tem a última palavra */
  const curto=t=>{t=String(t||'').trim();return t.length>90?t.slice(0,88)+'…':t;};
  lista.forEach(r=>{const it=r.item;
    if(it.kind==='epiteto'&&it.grego&&it.traducao)m.set(glChave(it.grego),curto(it.traducao)+(it.deus?` · ${it.deus}`:''));
    else if(it.kind==='virtude'&&it.grego&&it.nome)m.set(glChave(it.grego),curto(it.nome));
    else if(it.kind==='palavra'&&it.termo&&it.nota&&!m.has(glChave(it.termo)))m.set(glChave(it.termo),curto(it.nota));
    else if((it.kind==='daimon'||it.kind==='heroi')&&it.grego&&it.titulo)m.set(glChave(it.grego),curto(it.titulo));});
  GL_CACHE={v:S.versao,n:lista.length,m};return m;
}
/* tenta a expressão inteira, depois palavra por palavra */
function glTraduzir(txt){
  const m=glMapa(),k=glChave(txt);if(!k)return null;
  if(m.has(k))return m.get(k);
  const partes=k.split(' ');if(partes.length<2)return null;
  const ach=partes.map(p=>m.get(p)).filter(Boolean);
  return ach.length?ach.join(' · '):null;
}
const GREGO=/[Ͱ-Ͽἀ-῿]/;
function glPalavraNoPonto(x,y){
  let no=null,off=0;
  if(document.caretPositionFromPoint){const p=document.caretPositionFromPoint(x,y);if(p){no=p.offsetNode;off=p.offset;}}
  else if(document.caretRangeFromPoint){const r=document.caretRangeFromPoint(x,y);if(r){no=r.startContainer;off=r.startOffset;}}
  if(!no||no.nodeType!==3)return null;
  const t=no.textContent,eh=c=>c&&/[Ͱ-Ͽἀ-῿̀-ͯ]/.test(c);
  let a=off,b=off;
  while(a>0&&eh(t[a-1]))a--;while(b<t.length&&eh(t[b]))b++;
  if(a===b)return null;
  /* confere que o cursor está mesmo sobre a palavra, não ao lado */
  const rg=document.createRange();rg.setStart(no,a);rg.setEnd(no,b);const q=rg.getBoundingClientRect();
  if(x<q.left-2||x>q.right+2||y<q.top-2||y>q.bottom+2)return null;
  return t.slice(a,b);
}
function glIniciar(){
  if(!window.matchMedia||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  const tip=document.createElement('div');tip.id='glosa';tip.setAttribute('role','tooltip');tip.hidden=true;document.body.appendChild(tip);
  let ult='',pend=0;
  const esconder=()=>{tip.hidden=true;ult='';};
  document.addEventListener('mousemove',e=>{
    if(pend)return;pend=requestAnimationFrame(()=>{pend=0;
      const el=e.target;
      if(!el||el.closest&&el.closest('input,textarea,select,#glosa')){esconder();return;}
      let txt=null;
      /* nomes inteiros: um elemento grego (span.gr) ou um texto do desenho */
      const inteiro=el.closest&&el.closest('.gr,.letra,.vogal,svg text');
      if(inteiro&&GREGO.test(inteiro.textContent)&&inteiro.textContent.length<60){const t=inteiro.textContent.trim();if(glTraduzir(t))txt=t;}
      /* as spairas do hierograma: o texto do disco não recebe o mouse, o disco sim */
      const nodo=!txt&&el.closest&&el.closest('[data-act="sp"][data-id],.ceu-sp[data-sp]');
      if(nodo){const s=SPAIRAS[nodo.dataset.id||nodo.dataset.sp];if(s&&glTraduzir(s.rotulo))txt=s.rotulo;}
      if(!txt){const w=glPalavraNoPonto(e.clientX,e.clientY);if(w&&glTraduzir(w))txt=w;}
      if(!txt){esconder();return;}
      if(txt!==ult){tip.innerHTML=`<span class="gr">${esc(txt)}</span> ${esc(glTraduzir(txt))}`;ult=txt;}
      tip.hidden=false;
      const w=tip.offsetWidth,h=tip.offsetHeight;
      let x=e.clientX+14,y=e.clientY+18;
      if(x+w>innerWidth-8)x=innerWidth-w-8;if(y+h>innerHeight-8)y=e.clientY-h-12;
      tip.style.transform=`translate(${Math.round(x)}px,${Math.round(y)}px)`;
    });
  },{passive:true});
  document.addEventListener('mouseleave',esconder);
  window.addEventListener('scroll',esconder,{passive:true});
  document.addEventListener('mousedown',esconder);
}
glIniciar();
