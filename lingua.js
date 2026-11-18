/* ===================== LÍNGUA =====================
   Mostra as palavras gregas do app no original, traduzidas ou transliteradas.
   Só muda a exibição: o texto guardado continua em grego. O original fica no
   title de cada palavra trocada. Ficam de fora: SVG (hierograma, céu), campos
   de escrita e a aba Ἀριθμός, que precisa do grego para contar. */

const LG_CHAVE='okhema-lingua';
let LG_MODO='grego';
try{LG_MODO=localStorage.getItem(LG_CHAVE)||'grego';}catch(e){}

/* ---------- transliteração (padrão acadêmico: η ē, ω ō, υ y, χ ch) ---------- */
const LG_BASE={α:'a',β:'b',γ:'g',δ:'d',ε:'e',ζ:'z',η:'ē',θ:'th',ι:'i',κ:'k',λ:'l',μ:'m',ν:'n',ξ:'x',ο:'o',π:'p',ρ:'r',σ:'s',ς:'s',τ:'t',υ:'y',φ:'ph',χ:'ch',ψ:'ps',ω:'ō',
  ϝ:'w',ϙ:'q',ϟ:'q',ϡ:'ss',ͳ:'ss',ϛ:'st'};
const LG_VOG='αεηιουω';
function lgTranslit(palavra){
  /* separa letra e diacríticos */
  const L=[];
  for(const ch of palavra.normalize('NFD')){
    const c=ch.charCodeAt(0);
    if(c>=0x300&&c<=0x36f){if(L.length)L[L.length-1].m+=ch;continue;}
    const low=ch.toLowerCase();
    L.push({l:low,up:ch!==low,m:''});
  }
  const rude=m=>m.includes('̔'),diar=m=>m.includes('̈'),sub=m=>m.includes('ͅ');
  let out='';
  for(let i=0;i<L.length;i++){
    const a=L[i],b=L[i+1];let s;
    if(!(a.l in LG_BASE)){out+=a.up?a.l.toUpperCase():a.l;continue;}
    /* ditongos: o espírito vem na segunda vogal */
    const dit=b&&!diar(b.m)&&((b.l==='υ'&&'αεηο'.includes(a.l))||(b.l==='ι'&&'αεουω'.includes(a.l)&&a.l!=='ω'));
    let h=false;
    if(dit){
      s=a.l==='ο'&&b.l==='υ'?'ou':(LG_BASE[a.l]+(b.l==='υ'?'u':'i'));
      h=rude(b.m)||rude(a.m);i++;
    }else if(a.l==='γ'&&b&&'γκξχ'.includes(b.l)){s='n';}
    else if(a.l==='ρ'&&rude(a.m)){s='rh';}
    else{
      s=LG_BASE[a.l];
      if(a.l==='α'&&a.m.includes('̄'))s='ā';
      if(sub(a.m))s+='i';
      h=LG_VOG.includes(a.l)&&rude(a.m);
    }
    if(h)s='h'+s;
    if(a.up)s=s.charAt(0).toUpperCase()+s.slice(1);
    out+=s;
  }
  return out;
}

const lgLetra=p=>p.normalize('NFD').replace(/[\u0300-\u036f]/g,'').length<2;
function lgTranslitTrecho(t){return t.split(/(\s+)/).map(p=>!p.trim()||lgLetra(p)?p:lgTranslit(p)).join('');}
/* ---------- tradução: glossário fixo primeiro, depois o mapa do glossário ---------- */
function lgSentido(txt){
  const k=glChave(txt);if(!k)return null;
  let v=GL_FIXO.get(k);
  if(!v){try{const m=glMapa();v=m.get(k);}catch(e){}}
  if(!v)return null;
  v=String(v).split(' · ')[0].trim();
  if(/^spaira /.test(v))return null;
  return v||null;
}
function lgTraduzir(trecho){
  const t=lgSentido(trecho);if(t)return {txt:t,ok:true};
  /* palavra por palavra; o que não tiver tradução fica transliterado */
  const partes=trecho.split(/(\s+)/);
  let algum=false;
  const r=partes.map(p=>{if(!p.trim()||lgLetra(p))return p;const s=lgSentido(p);if(s){algum=true;return s;}return lgTranslit(p);}).join('');
  return {txt:r,ok:algum};
}

/* ---------- aplicação no DOM ---------- */
const LG_TRECHO=/[Ͱ-Ͽἀ-῿][Ͱ-Ͽἀ-῿̀-ͯ'’ʼ]*(?:\s+[Ͱ-Ͽἀ-῿][Ͱ-Ͽἀ-῿̀-ͯ'’ʼ]*)*/g;
function lgFora(n){
  for(let e=n.parentNode;e&&e!==document.body;e=e.parentNode){
    if(e.nodeType!==1)continue;
    const tg=e.tagName;
    if(tg==='svg'||tg==='SVG'||tg==='TEXTAREA'||tg==='INPUT'||tg==='SELECT'||tg==='OPTION'||tg==='SCRIPT'||tg==='STYLE'||tg==='CODE')return true;
    if(e.classList&&(e.classList.contains('lg')||e.classList.contains('lg-fixo')))return true;
    if(e.namespaceURI==='http://www.w3.org/2000/svg')return true;
  }
  return false;
}
let LG_OCUPADO=false;
function lgAplicar(raiz){
  if(LG_MODO==='grego'||!raiz)return;
  if(typeof S!=='undefined'&&S.view==='arithmos')return;
  LG_OCUPADO=true;
  try{
    const w=document.createTreeWalker(raiz,NodeFilter.SHOW_TEXT,{acceptNode:n=>GREGO.test(n.nodeValue)&&!lgFora(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
    const nos=[];while(w.nextNode())nos.push(w.currentNode);
    nos.forEach(n=>{
      const t=n.nodeValue,f=document.createDocumentFragment();let i=0;
      t.replace(LG_TRECHO,(m,pos)=>{
        if(pos>i)f.appendChild(document.createTextNode(t.slice(i,pos)));
        /* letras isoladas (Ε, Ω, Ϙ…) são símbolos do sistema: ficam como estão */
        if(m.normalize('NFD').replace(/[\u0300-\u036f]/g,'').length<2){f.appendChild(document.createTextNode(m));i=pos+m.length;return m;}
        const sp=document.createElement('span');
        if(LG_MODO==='traduzida'){const r=lgTraduzir(m);sp.textContent=r.txt;sp.className='lg lg-trad'+(r.ok?'':' lg-sem');}
        else{sp.textContent=lgTranslitTrecho(m);sp.className='lg lg-tl';}
        sp.title=m;sp.lang='grc-Latn';
        f.appendChild(sp);i=pos+m.length;return m;
      });
      if(i<t.length)f.appendChild(document.createTextNode(t.slice(i)));
      n.parentNode.replaceChild(f,n);
    });
  }finally{LG_OCUPADO=false;}
}
let LG_OBS=null,LG_PEND=false;
function lgObservar(){
  const m=document.getElementById('principal');if(!m||LG_OBS)return;
  LG_OBS=new MutationObserver(()=>{
    if(LG_OCUPADO||LG_MODO==='grego'||LG_PEND)return;
    LG_PEND=true;requestAnimationFrame(()=>{LG_PEND=false;lgAplicar(m);});
  });
  LG_OBS.observe(m,{childList:true,subtree:true,characterData:true});
}
function definirLingua(v){
  const antes=LG_MODO;LG_MODO=v;
  try{localStorage.setItem(LG_CHAVE,v);}catch(e){}
  const s=document.getElementById('sel-lingua');if(s&&s.value!==v)s.value=v;
  document.documentElement.dataset.lingua=v;
  lgObservar();
  /* volta ao original redesenhando a tela */
  if(antes!==v&&typeof render==='function')render();
}
