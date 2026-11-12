/* ===================== CORES DE CADA CONTA =====================
   Cada pessoa pode pintar as spairas e os caminhos do hierograma: o fundo e a letra.
   As escolhas ficam nas preferências do caderno privado (acompanham a conta) e podem
   ser desligadas a qualquer momento para voltar ao padrão do tema. */
const PALETA=['#FFC600','#F2A33A','#E0603A','#B8342C','#8E2C48','#C04F8E','#7A4FA3','#3E5C8A','#2F8FC4','#2F9C8A','#4C9A4A','#9AAE3B','#F2E9D7','#FFFFFF','#8A8A8A','#2A1B10'];
function coresPrefs(){const c=prefs().cores||{};return {usar:c.usar!==false,sp:c.sp||{},cam:c.cam||{}};}
function temCores(){const c=coresPrefs();return Object.keys(c.sp).length+Object.keys(c.cam).length>0;}
function corDe(tipo,id,campo){const c=coresPrefs();if(!c.usar)return null;const o=c[tipo][id];return (o&&o[campo])||null;}
function hexDe(v){
  v=String(v||'').trim();
  if(/^#[0-9a-f]{6}$/i.test(v))return v.toLowerCase();
  if(/^#[0-9a-f]{3}$/i.test(v))return ('#'+v.slice(1).split('').map(c=>c+c).join('')).toLowerCase();
  const m=v.match(/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/);
  if(m)return '#'+[m[1],m[2],m[3]].map(n=>(+n).toString(16).padStart(2,'0')).join('');
  return '#ffc600';
}
const varCss=n=>getComputedStyle(document.documentElement).getPropertyValue(n);
function corPadrao(tipo,id,campo){
  if(tipo==='sp'){const centro=SPAIRAS[id]&&SPAIRAS[id].tipo==='centro';
    return hexDe(varCss(campo==='fundo'?(centro?'--acento':'--creme'):(centro?'--sobre-acento':'--tinta')));}
  return hexDe(campo==='fundo'?(contagemCam(+id)?varCss('--ouro'):varCss('--folha')):varCss('--suave'));
}
function novasPrefs(){const p=clone(prefs());p.id='prefs';p.kind='pref';const c=coresPrefs();p.cores={usar:c.usar,sp:clone(c.sp),cam:clone(c.cam)};return p;}
function redesenharHierograma(){const d=document.querySelector('.diagrama');if(d)d.innerHTML=svgHierograma();}
/* gravar=false: só pré-visualiza enquanto a pessoa arrasta no seletor; gravar=true: guarda */
function definirCor(tipo,id,campo,valor,gravar){
  const p=novasPrefs(),o=Object.assign({},p.cores[tipo][id]);
  if(valor)o[campo]=hexDe(valor);else delete o[campo];
  if(Object.keys(o).length)p.cores[tipo][id]=o;else delete p.cores[tipo][id];
  p.cores.usar=true;
  if(gravar)salvarItem(p,'priv');else{S.priv.set('prefs',p);redesenharHierograma();}
}
function usarCores(v){const p=novasPrefs();p.cores.usar=v;salvarItem(p,'priv');}
function apagarCores(){const p=novasPrefs();p.cores={usar:true,sp:{},cam:{}};salvarItem(p,'priv');}

const ROT_CORES={sp:{fundo:'Cor da spaira',letra:'Cor da letra'},cam:{fundo:'Cor do caminho',letra:'Cor da letra'}};
function editorCores(tipo,id){
  const c=coresPrefs(),o=c[tipo][id]||{};
  const linha=campo=>{
    const v=o[campo],atual=v||corPadrao(tipo,id,campo),dados=`data-tipo="${tipo}" data-id="${esc(String(id))}" data-campo="${campo}"`;
    return `<div class="cor-linha">
      <label class="cor-rot"><span>${ROT_CORES[tipo][campo]}</span><input type="color" class="cor-in" ${dados} value="${atual}"><span class="cor-estado">${v?'sua cor':'padrão do tema'}</span></label>
      <div class="cor-paleta" role="group" aria-label="${ROT_CORES[tipo][campo]}: cores prontas">${PALETA.map(p=>`<button type="button" class="cor-am${v&&v===p.toLowerCase()?' on':''}" style="background:${p}" data-act="cor-am" ${dados} data-cor="${p}" title="Usar esta cor" aria-label="Usar a cor ${p}"></button>`).join('')}</div>
      ${v?`<button type="button" class="btn texto" data-act="cor-limpar" ${dados}>Voltar ao padrão</button>`:''}
    </div>`;};
  const aviso=!c.usar?`<p class="aviso-conta">Suas cores estão desligadas e o hierograma mostra o padrão do tema. <button type="button" class="btn mini forte" data-act="cores-usar" data-v="1">Ligar minhas cores</button></p>`:'';
  return caixa('cores','Cores','',`${aviso}<p class="nota-campo">Toque no quadrado colorido para abrir o seletor com todas as cores, ou escolha uma das cores prontas. O hierograma muda enquanto você escolhe.</p>${linha('fundo')}${linha('letra')}`);
}
function barraCores(){
  if(!temCores())return '';
  const c=coresPrefs();
  return `<div class="linha">Cores: <b>${c.usar?'as suas':'as do tema'}</b>
    <button class="btn mini" data-act="cores-usar" data-v="${c.usar?'0':'1'}">${c.usar?'Ver nas cores do tema':'Ver nas minhas cores'}</button>
    <button class="btn texto" data-act="cores-apagar">Apagar todas as minhas cores</button></div>`;
}
document.addEventListener('input',e=>{const t=e.target;if(t.classList&&t.classList.contains('cor-in'))definirCor(t.dataset.tipo,t.dataset.id,t.dataset.campo,t.value,false);});
document.addEventListener('change',e=>{const t=e.target;if(t.classList&&t.classList.contains('cor-in'))definirCor(t.dataset.tipo,t.dataset.id,t.dataset.campo,t.value,true);});
function confirmarCores(){return window.confirm('Apagar todas as cores que você escolheu? O hierograma volta ao padrão do tema.');}
