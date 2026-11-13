/* ===================== ἈΡΙΘΜΌΣ =====================
   Isopsefia clássica (milesiana, com as três letras arcaicas), assinatura poligonal
   em doze sistemas (s=2 … s=13) reduzida mod 12, e o sigilo radial de doze pontas.
   As 28 letras seguem a ordem numeral (com a Hasta Alpha depois do Sampi): a posição de cada uma (1…28) é o n dos números
   poligonais; o valor milesiano é a soma da isopsefia. */
const AR_LETRAS=[['Α',1],['Β',2],['Γ',3],['Δ',4],['Ε',5],['Ϝ',6],['Ζ',7],['Η',8],['Θ',9],['Ι',10],['Κ',20],['Λ',30],['Μ',40],['Ν',50],['Ξ',60],['Ο',70],['Π',80],['Ϙ',90],['Ρ',100],['Σ',200],['Τ',300],['Υ',400],['Φ',500],['Χ',600],['Ψ',700],['Ω',800],['Ϡ',900],['Ά',1000]];
const AR_POS={},AR_VAL={};
AR_LETRAS.forEach(([l,v],i)=>{AR_POS[l]=i+1;AR_VAL[l]=v;});
/* variantes gráficas → forma canônica. ϛ (stigma) conta como sigma, 200. */
const AR_VARIANTES={'ϝ':'Ϝ','Ϛ':'Σ','ϛ':'Σ','ϙ':'Ϙ','Ϟ':'Ϙ','ϟ':'Ϙ','ϡ':'Ϡ','Ͳ':'Ϡ','ͳ':'Ϡ','ς':'Σ','Ϲ':'Σ','ϲ':'Σ','ϐ':'Β','ϑ':'Θ','ϕ':'Φ','ϖ':'Π','ϰ':'Κ','ϱ':'Ρ'};
const AR_SISTEMAS=['linear','triangular','quadrado','pentagonal','hexagonal','heptagonal','octogonal','eneagonal','decagonal','hendecagonal','dodecagonal','tridecagonal'];

/* Hasta Alpha (Ά, 1000): o sinal ͵ antes do alfa (͵Α, ͵α) ou o alfa maiúsculo com acento e sem
   espírito (Ά). O ά minúsculo acentuado continua sendo alfa (1). */
function arNorm(txt){
  let out='';
  const t=String(txt||'').normalize('NFC').replace(/͵\s*[αΑ]/g,'').replace(/Ά/g,'');
  for(const c1 of t.normalize('NFD').replace(/[̀-ͯ]/g,'')){
    if(c1===''){out+='Ά';continue;}
    const c=AR_VARIANTES[c1]||c1;
    if(AR_POS[c]){out+=c;continue;}
    const up=c.toUpperCase();
    if(AR_POS[up])out+=up;
  }
  return out;
}
const arPoligonal=(s,n)=>n+n*(n-1)*(s-2)/2;
function arAssinatura(p){
  const t=new Array(12).fill(0);
  for(const ch of p){const n=AR_POS[ch];if(!n)continue;for(let j=0;j<12;j++)t[j]=(t[j]+arPoligonal(j+2,n))%12;}
  return t;
}
const arSoma=p=>[...p].reduce((s,ch)=>s+(AR_VAL[ch]||0),0);
function arRaiz(n){while(n>9)n=String(n).split('').reduce((a,d)=>a+ +d,0);return n;}
function arDist(a,b){let s=0;for(let i=0;i<12;i++){let d=Math.abs(a[i]-b[i]);d=Math.min(d,12-d);s+=d*d;}return Math.sqrt(s);}
function arAnalise(palavra){const n=arNorm(palavra);if(!n)return null;const soma=arSoma(n);return {palavra,norm:n,soma,raiz:arRaiz(soma),assin:arAssinatura(n)};}

/* ---------- o acervo de palavras ---------- */
/* Léxico de demonstração do Analisador Léxico Grego: palavra;significado;palavras-chave */
const AR_LEXICO=`ΑΓΑΠΗ;amor, caridade;amor,afeto,vínculo|ΕΡΩΣ;amor, desejo;amor,desejo,beleza|ΦΙΛΙΑ;amizade;amor,vínculo,amizade|ΦΩΣ;luz;luz,claridade,revelação|ΗΛΙΟΣ;sol;luz,fogo,céu|ΠΥΡ;fogo;fogo,calor,transformação|ΛΟΓΟΣ;palavra, razão;palavra,razão,ordem|ΝΟΥΣ;intelecto;razão,intelecto,ordem|ΣΟΦΙΑ;sabedoria;sabedoria,razão,intelecto|ΨΥΧΗ;alma;alma,vida,sopro|ΖΩΗ;vida;vida,alma,natureza|ΘΑΝΑΤΟΣ;morte;morte,fim,sombra|ΣΚΙΑ;sombra;sombra,escuridão,morte|ΝΥΞ;noite;noite,escuridão,sombra|ΓΗ;terra;terra,natureza,matéria|ΥΔΩΡ;água;água,natureza,fluxo|ΑΗΡ;ar;ar,sopro,natureza|ΚΟΣΜΟΣ;mundo, ordem;ordem,mundo,beleza|ΧΑΟΣ;caos;caos,desordem,abismo|ΑΡΧΗ;princípio;princípio,origem,ordem|ΤΕΛΟΣ;fim, finalidade;fim,finalidade,perfeição|ΧΡΟΝΟΣ;tempo;tempo,ciclo,mudança|ΑΙΩΝ;eternidade;tempo,eternidade,ciclo|ΜΟΙΡΑ;destino;destino,necessidade,ordem|ΤΥΧΗ;fortuna;destino,acaso,mudança|ΔΙΚΗ;justiça;justiça,ordem,medida|ΜΕΤΡΟΝ;medida;medida,ordem,justiça|ΑΡΕΤΗ;virtude;virtude,excelência,medida|ΚΑΛΟΣ;belo;beleza,excelência,harmonia|ΑΓΑΘΟΣ;bom;bondade,excelência,virtude|ΑΛΗΘΕΙΑ;verdade;verdade,revelação,luz|ΠΙΣΤΙΣ;fé, confiança;fé,confiança,vínculo|ΕΛΠΙΣ;esperança;esperança,futuro,confiança|ΜΝΗΜΗ;memória;memória,tempo,alma|ΟΝΕΙΡΟΣ;sonho;sonho,imagem,noite|ΕΙΚΩΝ;imagem;imagem,reflexo,forma|ΜΟΡΦΗ;forma;forma,beleza,ordem|ΥΛΗ;matéria;matéria,terra,potência|ΔΥΝΑΜΙΣ;potência;potência,força,possibilidade|ΕΝΕΡΓΕΙΑ;ato, atividade;ato,força,realização|ΚΙΝΗΣΙΣ;movimento;movimento,mudança,fluxo|ΣΤΑΣΙΣ;repouso;repouso,estabilidade,ordem|ΗΣΥΧΙΑ;quietude;repouso,silêncio,alma|ΣΙΓΗ;silêncio;silêncio,mistério,quietude|ΜΥΣΤΗΡΙΟΝ;mistério;mistério,segredo,iniciação|ΤΕΛΕΤΗ;rito;rito,iniciação,sagrado|ΙΕΡΟΝ;templo, sagrado;sagrado,templo,rito|ΘΕΟΣ;deus;divino,sagrado,poder|ΔΑΙΜΩΝ;daimon;divino,intermediário,poder|ΟΥΡΑΝΟΣ;céu;céu,alto,divino`;
/* Teônimos: a soma é sempre calculada, nunca digitada à mão. */
const AR_TEONIMOS=['Ζεύς','Ἥρα','Ποσειδῶν','Ἀθηνᾶ','Ἀπόλλων','Ἄρτεμις','Ἀφροδίτη','Ἄρης','Δημήτηρ','Διόνυσος','Ἥφαιστος','Ἑρμῆς','Ἑστία','Ἅιδης','Περσεφόνη','Ἑκάτη','Πάν','Νίκη','Τύχη','Ἔρως','Ψυχή','Σοφία','Μοῖρα','Θέμις','Νύξ','Ἥλιος','Σελήνη','Ἠώς','Γαῖα','Οὐρανός','Κρόνος','Ῥέα','Λητώ','Μνημοσύνη','Ἀσκληπιός','Ἡρακλῆς'];
const AR_ARTIGOS=/^(τὸ|τὰ|τοῦ|ὁ|ἡ|οἱ|αἱ)\s+/;
let AR_FIXO=null;
function arAcervoFixo(){
  if(AR_FIXO)return AR_FIXO;
  const l=[];
  AR_LEXICO.split('|').forEach(linha=>{const [p,sig,kw]=linha.split(';');l.push({palavra:p,sentido:sig,chaves:kw,origem:'lexico'});});
  AR_TEONIMOS.forEach(t=>l.push({palavra:t,sentido:'teônimo',origem:'teonimo'}));
  Object.entries(SPAIRAS).forEach(([id,s])=>{
    const sub=s.tipo==='vogal'?`spaira ${s.rotulo} · ${s.planeta}`:'spaira central';
    if(id==='bathron')l.push({palavra:'Ἱεροστήριον',sentido:sub,origem:'okhema',href:'#spaira-'+id});
    else if(s.rotulo&&s.rotulo.length>1)l.push({palavra:s.rotulo,sentido:sub,origem:'okhema',href:'#spaira-'+id});
    if(s.nome_proprio)l.push({palavra:s.nome_proprio,sentido:sub,origem:'okhema',href:'#spaira-'+id});
    const papel={v:'medida',p:'falta',e:'excesso'};
    Object.entries(s.graus||{}).forEach(([g,tris])=>{const G=GRAUS.find(x=>x.id===g);
      (Array.isArray(tris)?tris:[tris]).forEach(tri=>['v','p','e'].forEach(k=>{const txt=tri&&tri[k];if(!txt)return;
        const [cab,...resto]=String(txt).split(' — ');
        if(/[A-Za-zÀ-ÿ]/.test(cab)||!arNorm(cab))return;
        l.push({palavra:cab.replace(AR_ARTIGOS,'').replace(/°/g,'').trim(),sentido:`${papel[k]} · ${G?G.nome:g} · ${s.rotulo}${resto.length?' — '+resto.join(' — ').replace(/°/g,''):''}`,origem:'okhema',href:'#spaira-'+id});}));});
  });
  GRAUS.forEach(g=>l.push({palavra:g.gr,sentido:`grau de virtude · ${g.nome}`,origem:'okhema'}));
  AR_FIXO=l.map(e=>Object.assign(e,arAnalise(e.palavra)||{})).filter(e=>e.norm);
  return AR_FIXO;
}
/* as palavras que o caderno vai juntando: epítetos, palavras-chave, virtudes e análises guardadas */
function arAcervo(){
  const din=[];
  todos().forEach(r=>{const it=r.item;let p='',sent='';
    if(it.kind==='epiteto'){p=it.grego;sent=[it.deus,it.traducao].filter(Boolean).join(' · ');}
    else if(it.kind==='palavra'){p=it.termo;sent=it.nota||'palavra-chave';}
    else if(it.kind==='virtude'){p=it.grego;sent='virtude · '+(it.nome||'');}
    else if(it.kind==='arithmos'){p=it.palavra;sent=it.nota||'análise guardada';}
    if(!p)return;const a=arAnalise(p);if(!a)return;
    din.push(Object.assign({sentido:sent,origem:r.origem==='base'?'referencia':'caderno',href:it.alvo?hrefAlvo(it.alvo):''},a));});
  /* uma linha por palavra: junta os sentidos de quem a trouxe */
  const m=new Map();
  arAcervoFixo().concat(din).forEach(e=>{const k=e.norm;const x=m.get(k);
    if(!x){m.set(k,Object.assign({},e,{sentidos:e.sentido?[e.sentido]:[],origens:new Set([e.origem])}));return;}
    if(e.sentido&&!x.sentidos.includes(e.sentido))x.sentidos.push(e.sentido);x.origens.add(e.origem);
    if(!x.href&&e.href)x.href=e.href;
    if(/[a-zά-ώἀ-ῼ]/.test(e.palavra)&&!/[a-zά-ώἀ-ῼ]/.test(x.palavra))x.palavra=e.palavra; /* prefere a grafia politônica */
  });
  return [...m.values()];
}
const AR_ORIGEM={lexico:'léxico',teonimo:'teônimo',okhema:'Okhema',referencia:'referência',caderno:'caderno'};

/* ---------- sigilo ---------- */
function arSigilo(assin,{tam=300,mini=false}={}){
  const c=150,R=118,pt=(i,r)=>{const a=Math.PI*2*i/12-Math.PI/2;return [c+Math.cos(a)*r,c+Math.sin(a)*r];};
  let g='';
  if(!mini){
    for(let r=3;r<=11;r+=4)g+=`<circle cx="${c}" cy="${c}" r="${(R*r/11).toFixed(1)}" fill="none" stroke="var(--linha)" stroke-width=".7"/>`;
    for(let i=0;i<12;i++){const [x,y]=pt(i,R),[tx,ty]=pt(i,R+16);
      g+=`<line x1="${c}" y1="${c}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--linha)" stroke-width=".7"/><text x="${tx.toFixed(1)}" y="${(ty+3.5).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--suave)" font-family="EB Garamond,Georgia,serif">s${i+2}</text>`;}
  }else g+=`<circle cx="${c}" cy="${c}" r="${R}" fill="none" stroke="var(--linha)" stroke-width="3"/>`;
  const pts=assin.map((v,i)=>pt(i,R*v/11));
  g+=`<polygon points="${pts.map(p=>p.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="var(--acento)" fill-opacity=".16" stroke="var(--acento)" stroke-width="${mini?6:2}" stroke-linejoin="round"/>`;
  if(!mini)pts.forEach(([x,y])=>g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.8" fill="var(--acento)"/>`);
  g+=`<circle cx="${c}" cy="${c}" r="${mini?6:2.4}" fill="var(--ouro)"/>`;
  return `<svg class="${mini?'sigilo-mini':'sigilo'}" viewBox="${mini?'20 20 260 260':'0 0 300 300'}" width="${tam}" height="${tam}" role="img" aria-label="Sigilo poligonal">${g}</svg>`;
}
function arBaixarSigilo(){
  const a=arAnalise(S.arPalavra||'');if(!a)return;
  const cs=getComputedStyle(document.documentElement);
  let s=arSigilo(a.assin).replace(/var\((--[a-z0-9-]+)\)/g,(m,v)=>cs.getPropertyValue(v).trim()||'#A8442A');
  s=s.replace('<svg ',`<svg xmlns="http://www.w3.org/2000/svg" style="background:${cs.getPropertyValue('--folha').trim()}" `);
  s=s.replace('</svg>',`<text x="150" y="296" text-anchor="middle" font-size="12" fill="${cs.getPropertyValue('--tinta').trim()}" font-family="Times New Roman,Tinos,Times,serif">${esc(a.norm)} · ${a.soma}</text></svg>`);
  const u=URL.createObjectURL(new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n'+s],{type:'image/svg+xml'}));
  const el=document.createElement('a');el.href=u;el.download=`sigilo-${a.norm}.svg`;document.body.appendChild(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);
}

/* ---------- uso no resto do caderno ---------- */
const arHref=p=>'#arithmos='+encodeURIComponent(p);
function arNumeroLink(p){const a=arAnalise(p);return a?` <a class="num-ar" href="${arHref(p)}" title="Abrir no Ἀριθμός: isopsefia ${a.soma}, raiz ${a.raiz}">${a.soma}</a>`:'';}

/* ---------- a página ---------- */
function arPalavraHtml(e,extra){
  const tags=[...(e.origens||[])].map(o=>AR_ORIGEM[o]||o).join(' · ');
  return `<div class="ar-palavra"><a href="${arHref(e.palavra)}" class="gr">${esc(e.palavra)}</a> <span class="ar-num">${e.soma}</span>${extra?` <span class="ar-num">${extra}</span>`:''}<span class="ar-sent">${esc((e.sentidos||[]).slice(0,2).join(' / '))}${tags?` <i>(${esc(tags)})</i>`:''}</span></div>`;
}
function vArithmos(){
  const q=(S.arPalavra||'').trim(),acervo=arAcervo();
  const cont={};acervo.forEach(e=>e.origens.forEach(o=>cont[o]=(cont[o]||0)+1));
  const resumo=Object.entries(cont).map(([o,n])=>`${n} ${AR_ORIGEM[o]||o}`).join(' · ');
  let res='';
  if(/^\d+$/.test(q)){
    const n=+q,raiz=arRaiz(n);
    const iguais=acervo.filter(e=>e.soma===n),mesmaRaiz=acervo.filter(e=>e.raiz===raiz&&e.soma!==n).sort((a,b)=>Math.abs(a.soma-n)-Math.abs(b.soma-n)).slice(0,16);
    res=`<section class="secao"><h3>O número ${n} · raiz ${raiz}</h3>
      <h4 class="ar-h">Palavras que somam ${n}</h4>${iguais.length?iguais.map(e=>arPalavraHtml(e)).join(''):'<p class="vazio">Nenhuma palavra do acervo soma exatamente isto.</p>'}
      <h4 class="ar-h">Com a mesma raiz, as mais próximas</h4>${mesmaRaiz.map(e=>arPalavraHtml(e)).join('')}</section>`;
  }else if(q){
    const a=arAnalise(q);
    if(!a)res=`<p class="vazio">Nenhuma letra grega em “${esc(q)}”. Escreva em grego, com ou sem acentos.</p>`;
    else{
      const outros=acervo.filter(e=>e.norm!==a.norm);
      const iguais=outros.filter(e=>e.soma===a.soma);
      const raiz=outros.filter(e=>e.raiz===a.raiz&&e.soma!==a.soma).sort((x,y)=>Math.abs(x.soma-a.soma)-Math.abs(y.soma-a.soma)).slice(0,10);
      const assin=outros.map(e=>({e,d:arDist(a.assin,e.assin)})).sort((x,y)=>x.d-y.d).slice(0,10);
      const teo=outros.filter(e=>e.origens.has('teonimo')).sort((x,y)=>Math.abs(x.soma-a.soma)-Math.abs(y.soma-a.soma)).slice(0,5);
      const sps=PLANETARIAS.map(id=>({id,s:SPAIRAS[id],d:arDist(a.assin,arAssinatura(arNorm(SPAIRAS[id].letra||SPAIRAS[id].rotulo)))})).sort((x,y)=>x.d-y.d).slice(0,3);
      const letras=[...a.norm].map(ch=>`<span class="ar-letra"><span class="gr">${esc(ch)}</span><small>${AR_VAL[ch]}</small></span>`).join('');
      const vetor=a.assin.map((v,i)=>`<div class="ar-cel" title="${AR_SISTEMAS[i]}">${v}<small>s${i+2}</small></div>`).join('');
      const doAcervo=acervo.find(e=>e.norm===a.norm);
      res=`<div class="ar-grade">
        <div class="ar-sig">${arSigilo(a.assin)}<div class="barra"><button class="btn mini" data-act="ar-baixar">Baixar sigilo (SVG)</button><button class="btn mini forte" data-act="ar-guardar">Guardar no caderno</button></div></div>
        <div class="ar-leitura">
          <div class="ar-bloco"><h4 class="ar-h">Palavra</h4><p class="ar-pal gr">${esc(a.palavra)}</p><div class="ar-letras">${letras}</div>
            ${doAcervo&&doAcervo.sentidos.length?`<p class="nota-campo">No acervo: ${esc(doAcervo.sentidos.join(' / '))}</p>`:''}</div>
          <div class="ar-bloco"><h4 class="ar-h">Isopsefia clássica</h4><div class="ar-grande">${a.soma}<small>raiz ${a.raiz}</small></div></div>
          <div class="ar-bloco"><h4 class="ar-h">Assinatura poligonal (s=2 … s=13, mod 12)</h4><div class="ar-vetor">${vetor}</div></div>
          <div class="ar-bloco"><h4 class="ar-h">Spairas mais afins pela assinatura</h4><div class="chips">${sps.map(o=>`<a class="chip" href="#spaira-${o.id}"><span class="gr">${esc(o.s.rotulo)} ${esc(o.s.nome_proprio||'')}</span> d=${o.d.toFixed(1)}</a>`).join('')}</div></div>
        </div></div>
        <section class="secao"><h3>Palavras afins no acervo</h3>
          <h4 class="ar-h">Mesma soma (${a.soma})</h4>${iguais.length?iguais.map(e=>arPalavraHtml(e)).join(''):'<p class="vazio">Nenhuma palavra do acervo soma exatamente o mesmo.</p>'}
          <h4 class="ar-h">Mesma raiz (${a.raiz}), as mais próximas</h4>${raiz.map(e=>arPalavraHtml(e,'Δ'+Math.abs(e.soma-a.soma))).join('')||'<p class="vazio">Nenhuma.</p>'}
          <h4 class="ar-h">Assinatura mais próxima</h4>${assin.map(o=>arPalavraHtml(o.e,'d='+o.d.toFixed(1))).join('')}
          <h4 class="ar-h">Teônimos mais próximos pela soma</h4>${teo.map(e=>arPalavraHtml(e,e.soma===a.soma?'igual':'Δ'+Math.abs(e.soma-a.soma))).join('')}
        </section>`;
    }
  }
  const guardadas=ordenar(doTipo('arithmos'));
  const tabela=acervo.slice().sort((x,y)=>x.soma-y.soma).map(e=>`<tr><td><a class="gr" href="${arHref(e.palavra)}">${esc(e.palavra)}</a></td><td>${e.soma}</td><td>${e.raiz}</td><td>${esc((e.sentidos||[])[0]||'')}</td></tr>`).join('');
  return `<section class="pagina"><h2>Ἀριθμός</h2>
    <p class="base-txt">A isopsefia clássica soma o valor milesiano de cada letra, contando as arcaicas, Ϝ 6, Ϙ 90, Ϡ 900, e a Hasta Alpha, Ά 1000 (escreva ͵Α, ou Ά maiúsculo sem espírito). A assinatura poligonal toma a posição de cada uma das 28 letras na ordem numeral como número poligonal em doze sistemas, do linear ao tridecagonal, e reduz cada soma a mod 12; o sigilo é essa assinatura desenhada em doze raios. Escreva uma palavra grega, ou um número para ver as palavras que o somam.</p>
    <form class="barra" id="form-ar" role="search"><input type="search" id="ar-palavra" class="gr" value="${esc(q)}" placeholder="Ἑρμῆς, χάρις, 353…" aria-label="Palavra grega ou número" autocomplete="off" spellcheck="false"><button type="submit" class="btn forte">Analisar</button></form>
    <div class="barra" aria-label="Letras que faltam no teclado">${['Ϝ','Ϙ','Ϡ','Ά'].map(l=>`<button type="button" class="btn mini" data-act="ar-tecla" data-l="${l}" title="Inserir ${l} (${AR_VAL[l]})"><span class="gr">${l}</span> <small>${AR_VAL[l]}</small></button>`).join('')}</div>
    ${res}
    <section class="secao"><div class="secao-cab"><h3>Suas análises guardadas</h3></div>${guardadas.length?`<div class="lista">${guardadas.map(card).join('')}</div>`:'<p class="vazio">Nenhuma ainda. Analise uma palavra e toque em “Guardar no caderno”.</p>'}</section>
    <details class="ar-acervo"><summary>O acervo de palavras · ${acervo.length} palavras (${esc(resumo)})</summary>
      <p class="nota-campo">Léxico do Analisador, teônimos, nomes e virtudes do Okhema, e tudo o que o caderno vai juntando: epítetos, palavras-chave, virtudes com nome grego e análises guardadas, inclusive as do acervo comum.</p>
      <div class="rolagem"><table class="ar-tab"><tr><th>Palavra</th><th>Soma</th><th>Raiz</th><th>Sentido</th></tr>${tabela}</table></div></details>
  </section>`;
}
