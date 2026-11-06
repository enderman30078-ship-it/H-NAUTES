/* ===================== CÉU (mapa em tempo real) =====================
   Calculado no próprio aparelho com a astronomy-engine (astronomy.js): posições
   geocêntricas no zodíaco tropical, na eclíptica verdadeira da data. Ascendente e
   Meio do Céu só quando a pessoa dá a localização, que fica guardada só no aparelho. */
const CEU_PLANETAS=[
  {id:'Sun',nome:'Sol',gr:'Ἥλιος',g:'☉'},
  {id:'Moon',nome:'Lua',gr:'Σελήνη',g:'☽'},
  {id:'Mercury',nome:'Mercúrio',gr:'Στίλβων',g:'☿'},
  {id:'Venus',nome:'Vênus',gr:'Φωσφόρος',g:'♀'},
  {id:'Mars',nome:'Marte',gr:'Πυρόεις',g:'♂'},
  {id:'Jupiter',nome:'Júpiter',gr:'Φαέθων',g:'♃'},
  {id:'Saturn',nome:'Saturno',gr:'Φαίνων',g:'♄'}];
const CEU_SIGNOS=[
  ['Áries','Κριός','♈'],['Touro','Ταῦρος','♉'],['Gêmeos','Δίδυμοι','♊'],['Câncer','Καρκίνος','♋'],
  ['Leão','Λέων','♌'],['Virgem','Παρθένος','♍'],['Libra','Ζυγός','♎'],['Escorpião','Σκορπίος','♏'],
  ['Sagitário','Τοξότης','♐'],['Capricórnio','Αἰγόκερως','♑'],['Aquário','Ὑδροχόος','♒'],['Peixes','Ἰχθύες','♓']];
const TXT='︎'; /* força o desenho do símbolo como letra, não como emoji */
const CEU_LOC_KEY='okhema-local-ceu';

function ceuLon(corpo,date){
  const A=window.Astronomy;
  if(corpo==='Sun')return A.SunPosition(date).elon;
  if(corpo==='Moon')return A.EclipticGeoMoon(date).lon;
  const t=A.MakeTime(date);
  const s=A.SphereFromVector(A.RotateVector(A.Rotation_EQJ_ECT(t),A.GeoVector(A.Body[corpo],t,true)));
  return (s.lon%360+360)%360;
}
function ceuAscMc(date,lat,lon){
  const A=window.Astronomy,t=A.MakeTime(date);
  const th=((A.SiderealTime(t)*15+lon)%360+360)%360*Math.PI/180;
  const eps=A.e_tilt(t).tobl*Math.PI/180,phi=lat*Math.PI/180;
  const asc=(Math.atan2(Math.cos(th),-(Math.sin(th)*Math.cos(eps)+Math.tan(phi)*Math.sin(eps)))*180/Math.PI+360)%360;
  const mc=(Math.atan2(Math.sin(th),Math.cos(th)*Math.cos(eps))*180/Math.PI+360)%360;
  return {asc,mc};
}
const ceuGrau=l=>{const d=l%30,g=Math.floor(d),m=Math.floor((d-g)*60);return `${g}°${String(m).padStart(2,'0')}′`;};
const ceuVogal=p=>{const sp=ceuSpaira(p.nome);return sp?sp.s.rotulo:p.g;};
const ceuSigno=l=>CEU_SIGNOS[Math.floor(((l%360)+360)%360/30)];
function ceuSpaira(nome){const e=Object.entries(SPAIRAS).find(([id,s])=>s.tipo==='vogal'&&s.planeta===nome);return e?{id:e[0],s:e[1]}:null;}

let CEU_CACHE={chave:'',dados:null};
function ceuPosicoes(date){
  if(!window.Astronomy)return null;
  const chave=String(Math.floor(+date/60000));
  if(CEU_CACHE.chave===chave)return CEU_CACHE.dados;
  const depois=new Date(+date+6*3600e3);
  const pl=CEU_PLANETAS.map(p=>{const l=ceuLon(p.id,date),l2=ceuLon(p.id,depois);
    return Object.assign({},p,{lon:l,retro:p.id!=='Sun'&&p.id!=='Moon'&&((l2-l+540)%360-180)<0});});
  const A=window.Astronomy,fase=A.MoonPhase(date);
  const ilum=A.Illumination(A.Body.Moon,date).phase_fraction;
  const prox=q=>{try{return A.SearchMoonPhase(q,date,40).date;}catch(e){return null;}};
  const dados={pl,fase,ilum,nova:prox(0),cheia:prox(180)};
  CEU_CACHE={chave,dados};return dados;
}
function ceuNomeFase(f){
  if(f<6||f>=354)return 'Lua nova';if(f<84)return 'Lua crescente';if(f<96)return 'Quarto crescente';
  if(f<174)return 'Crescente gibosa';if(f<186)return 'Lua cheia';if(f<264)return 'Minguante gibosa';
  if(f<276)return 'Quarto minguante';return 'Lua minguante';
}
function ceuLocal(){try{const v=JSON.parse(localStorage.getItem(CEU_LOC_KEY)||'null');return v&&isFinite(v.lat)&&isFinite(v.lon)?v:null;}catch(e){return null;}}

/* ---------- a roda ---------- */
/* o Okhema em miniatura no centro da roda: os caminhos e as spairas, sem as letras */
function ceuOkhema(cx,cy,raio){
  const ps=Object.values(SPAIRAS).map(s=>s.pos),mx=(Math.min(...ps.map(p=>p[0]))+Math.max(...ps.map(p=>p[0])))/2,my=(Math.min(...ps.map(p=>p[1]))+Math.max(...ps.map(p=>p[1])))/2;
  const k=raio/Math.max(...ps.map(([x,y])=>Math.hypot(x-mx,y-my)+27));
  const P=([x,y])=>[(cx+(x-mx)*k).toFixed(2),(cy+(y-my)*k).toFixed(2)];
  let g='<g class="ceu-okhema" pointer-events="none">';
  CAMINHOS.forEach(c=>{const [x1,y1]=P(SPAIRAS[c.de].pos),[x2,y2]=P(SPAIRAS[c.para].pos);
    g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--tinta)" stroke-width="${Math.max(6.5*k,1.9).toFixed(2)}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--folha)" stroke-width="${Math.max(3.6*k,.9).toFixed(2)}" stroke-linecap="round"/>`;});
  Object.values(SPAIRAS).forEach(s=>{const [x,y]=P(s.pos),centro=s.tipo==='centro';
    g+=centro?`<circle cx="${x}" cy="${y}" r="${(27*k).toFixed(2)}" fill="var(--acento)" stroke="var(--tinta)" stroke-width="${(2.2*k).toFixed(2)}"/>`
      :`<circle cx="${x}" cy="${y}" r="${(23*k).toFixed(2)}" fill="var(--creme)" stroke="var(--tinta)" stroke-width="${(2.2*k).toFixed(2)}"/><circle cx="${x}" cy="${y}" r="${(18*k).toFixed(2)}" fill="none" stroke="var(--acento)" stroke-width="${(1*k).toFixed(2)}"/>`;});
  return g+'</g>';
}

function ceuRoda(d,ang){
  const c=180,R0=172,R1=146,RP=122;
  const ref=ang?ang.asc:0; /* com ascendente, ele fica à esquerda; sem, 0° de Áries */
  const P=(l,r)=>{const a=(180+(l-ref))*Math.PI/180;return [c+r*Math.cos(a),c-r*Math.sin(a)];};
  const f=n=>n.toFixed(1);
  let g=`<circle cx="${c}" cy="${c}" r="${R0}" fill="var(--folha)" stroke="var(--tinta)" stroke-width="1.6"/><circle cx="${c}" cy="${c}" r="${R1}" fill="var(--fundo)" stroke="var(--tinta)" stroke-width="1"/><circle cx="${c}" cy="${c}" r="58" fill="none" stroke="var(--linha)" stroke-width=".8"/>`;
  for(let i=0;i<12;i++){
    const [x1,y1]=P(i*30,R0),[x2,y2]=P(i*30,R1),[tx,ty]=P(i*30+15,(R0+R1)/2);
    g+=`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="var(--tinta)" stroke-width="1"/>`;
    g+=`<text x="${f(tx)}" y="${f(ty+6)}" text-anchor="middle" font-size="17" fill="var(--acento)" class="ceu-g"><title>${CEU_SIGNOS[i][0]} · ${CEU_SIGNOS[i][1]}</title>${CEU_SIGNOS[i][2]}${TXT}</text>`;
    for(let k=5;k<30;k+=5){const [a1,b1]=P(i*30+k,R1),[a2,b2]=P(i*30+k,R1+(k%10?4:7));g+=`<line x1="${f(a1)}" y1="${f(b1)}" x2="${f(a2)}" y2="${f(b2)}" stroke="var(--linha)" stroke-width=".8"/>`;}
  }
  if(ang){
    const eixo=(l,rot)=>{const [x1,y1]=P(l,R1),[x2,y2]=P(l+180,R1),[tx,ty]=P(l,R0+11);
      return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="var(--ouro)" stroke-width="1.2" stroke-dasharray="4 3"/><text x="${f(tx)}" y="${f(ty+4)}" text-anchor="middle" font-size="10" fill="var(--ouro)" font-family="EB Garamond,Georgia,serif">${rot}</text>`;};
    g+=eixo(ang.asc,'ASC')+eixo(ang.mc,'MC');
  }
  /* planetas: os próximos entre si descem um degrau para não se sobreporem */
  const ord=d.pl.slice().sort((a,b)=>a.lon-b.lon),niveis=[];
  ord.forEach(p=>{let n=0;while(n<3&&niveis.some(q=>q.n===n&&Math.abs(((p.lon-q.lon+540)%360)-180)<12))n++;niveis.push({n,lon:p.lon,p});});
  niveis.forEach(({n,p})=>{
    const r=RP-n*24,[x,y]=P(p.lon,r),[a1,b1]=P(p.lon,R1),[a2,b2]=P(p.lon,R1-6);
    const sp=ceuSpaira(p.nome);
    g+=`<line x1="${f(a1)}" y1="${f(b1)}" x2="${f(a2)}" y2="${f(b2)}" stroke="var(--tinta)" stroke-width="1.6"/>`;
    g+=`<a href="${sp?'#spaira-'+sp.id:'#ceu'}"><circle cx="${f(x)}" cy="${f(y)}" r="12.5" fill="var(--creme)" stroke="${p.retro?'var(--acento)':'var(--tinta)'}" stroke-width="1.2"${p.retro?' stroke-dasharray="2.5 2"':''}/><text x="${f(x)}" y="${f(y+5.5)}" text-anchor="middle" font-size="16" fill="var(--tinta)" style="font-family:var(--f-grego)"><title>${p.nome} · ${ceuSigno(p.lon)[0]} ${ceuGrau(p.lon)}${p.retro?' · retrógrado':''}</title>${esc(ceuVogal(p))}</text></a>`;
  });
  g+=ceuOkhema(c,c,56);
  return `<svg class="ceu-roda" viewBox="-16 -16 392 392" role="img" aria-label="Roda do zodíaco com os sete planetas">${g}</svg>`;
}

/* ---------- a página ---------- */
const fmtHora=dt=>dt.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
const fmtDia=dt=>dt?dt.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short'})+' · '+dt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'—';
function ceuConteudo(){
  if(!window.Astronomy)return '<p class="vazio">Não foi possível carregar o cálculo do céu neste aparelho.</p>';
  const date=S.ceuData?new Date(S.ceuData):new Date(),d=ceuPosicoes(date),loc=ceuLocal();
  const ang=loc?ceuAscMc(date,loc.lat,loc.lon):null;
  const linhas=d.pl.map(p=>{const sg=ceuSigno(p.lon),sp=ceuSpaira(p.nome);
    return `<tr><td><a href="${sp?'#spaira-'+sp.id:'#ceu'}"><span class="vogal">${esc(ceuVogal(p))}</span> ${esc(p.nome)} <span class="gr suave">${esc(p.gr)}</span></a></td><td><span class="ceu-g">${sg[2]}${TXT}</span> ${esc(sg[0])} <span class="gr suave">${esc(sg[1])}</span></td><td class="num">${ceuGrau(p.lon)}${p.retro?' <b class="retro" title="retrógrado">℞</b>':''}</td></tr>`;}).join('');
  const angL=ang?['asc','mc'].map(k=>{const sg=ceuSigno(ang[k]);return `<tr><td>${k==='asc'?'Ascendente':'Meio do Céu'}</td><td><span class="ceu-g">${sg[2]}${TXT}</span> ${esc(sg[0])} <span class="gr suave">${esc(sg[1])}</span></td><td class="num">${ceuGrau(ang[k])}</td></tr>`;}).join(''):'';
  return `<p class="ceu-quando">${S.ceuData?'Céu de':'Agora,'} ${esc(fmtHora(date))}${S.ceuData?'':' · atualiza a cada minuto'}</p>
    <div class="ceu-grade">${ceuRoda(d,ang)}
      <div class="ceu-lado"><div class="rolagem"><table class="ceu-tab"><tr><th>Planeta</th><th>Signo</th><th>Grau</th></tr>${linhas}${angL}</table></div>
        <div class="ceu-lua"><b>${esc(ceuNomeFase(d.fase))}</b> · ${Math.round(d.ilum*100)}% iluminada<br>Próxima lua nova: ${esc(fmtDia(d.nova))}<br>Próxima lua cheia: ${esc(fmtDia(d.cheia))}</div>
      </div></div>`;
}
function vCeu(){
  const loc=ceuLocal();
  const valor=S.ceuData?new Date(S.ceuData-new Date(S.ceuData).getTimezoneOffset()*60000).toISOString().slice(0,16):'';
  return `<section class="pagina"><h2>Céu</h2>
    <p class="base-txt">Os sete planetas nos doze signos, calculados neste aparelho, sem internet. Zodíaco tropical, posições vistas da Terra. Cada planeta aparece pela vogal da sua spaira; ℞ marca o retrógrado, e tocar num planeta abre a sua spaira.</p>
    <div class="barra"><label for="ceu-data" class="nota-campo">Outro momento</label><input type="datetime-local" id="ceu-data" value="${valor}"><button class="btn mini" data-act="ceu-ver">Ver</button>${S.ceuData?'<button class="btn mini forte" data-act="ceu-agora">Voltar para agora</button>':''}</div>
    <div id="ceu-conteudo">${ceuConteudo()}</div>
    <section class="secao"><h3>Ascendente e Meio do Céu</h3>
      ${loc?`<p class="nota-campo">Calculados para ${loc.lat.toFixed(2)}°, ${loc.lon.toFixed(2)}°. A localização fica guardada só neste aparelho.</p><div class="barra"><button class="btn mini" data-act="ceu-local">Atualizar localização</button><button class="btn mini" data-act="ceu-esquecer">Esquecer localização</button></div>`
        :`<p class="nota-campo">Dependem do lugar. Com a sua localização, a roda passa a ter o ascendente à esquerda e mostra o Meio do Céu. Ela fica guardada só neste aparelho, nunca vai para o banco.</p><div class="barra"><button class="btn mini forte" data-act="ceu-local">Usar minha localização</button></div>`}
    </section></section>`;
}
function ceuPedirLocal(){
  if(!navigator.geolocation){toast('Este aparelho não informa a localização.');return;}
  navigator.geolocation.getCurrentPosition(pos=>{
    try{localStorage.setItem(CEU_LOC_KEY,JSON.stringify({lat:pos.coords.latitude,lon:pos.coords.longitude}));}catch(e){}
    render();toast('Localização guardada neste aparelho.');
  },()=>toast('Sem permissão para a localização. Dá para liberar nas configurações do navegador.'),{timeout:15000,maximumAge:3600e3});
}
/* uma linha na spaira planetária: onde o seu planeta está agora */
function ceuNaSpaira(s){
  if(!window.Astronomy||s.tipo!=='vogal')return '';
  const d=ceuPosicoes(new Date());const p=d&&d.pl.find(x=>x.nome===s.planeta);if(!p)return '';
  const sg=ceuSigno(p.lon);
  return ` · <a href="#ceu" class="ceu-agora">agora em <span class="ceu-g">${sg[2]}${TXT}</span> ${esc(sg[0])} ${ceuGrau(p.lon)}${p.retro?' ℞':''}</a>`;
}
setInterval(()=>{if(S.view==='ceu'&&!S.ceuData&&document.visibilityState==='visible'){const el=document.getElementById('ceu-conteudo');if(el)el.innerHTML=ceuConteudo();}},60000);
