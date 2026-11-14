/* ===================== VIRTUDES =====================
   A escada dos graus de virtude e as quatro cardeais em cada grau.
   Convenção das fontes: "a conferir" = citado de memória, ainda não verificado
   numa edição; "°" = construção do Okhema, não da tradição. */

const VIRT_CARDEAIS = [
  {gr:"φρόνησις", nome:"Prudência", sede:"Na República, a virtude da parte que raciocina (τὸ λογιστικόν), que delibera pelo todo da alma. Nos graus altos, ganha o nome de σοφία."},
  {gr:"ἀνδρεία", nome:"Coragem", sede:"A virtude da parte irascível (τὸ θυμοειδές): conservar, no prazer e na dor, o que a razão ensinou ser temível ou não."},
  {gr:"σωφροσύνη", nome:"Temperança", sede:"O acordo e a consonância das partes: o que é governado consente em ser governado pelo que deve governar."},
  {gr:"δικαιοσύνη", nome:"Justiça", sede:"Cada parte fazendo o que é seu (τὰ αὑτοῦ πράττειν), no comandar e no ser comandado. É a virtude que ordena as outras três."}
];

const VIRT_GRAUS = {
  natural:{
    aprof:[
      ["Sede","A κρᾶσις, a mistura do corpo, e o temperamento."],
      ["Origem","O nascimento, a εὐφυΐα. Não se adquire: é dada ou não é dada. Por isso só este grau admite eixos de presença e ausência (°)."],
      ["Paixão","Ainda não há relação racional com a paixão. Há apenas uma inclinação dada."],
      ["Implicação","As virtudes naturais não se implicam umas às outras (Aristóteles, EN VI.13, 1144b34–1145a1) e podem até se opor: coragem e temperança, como naturezas, têm \"muita inimizade e discórdia entre si\" (Platão, Político 306a–308b). Sem νοῦς, chegam a prejudicar, como um corpo forte que se move sem ver (EN VI.13, 1144b8–12)."],
      ["Nos animais","O leão é corajoso, o boi temperante, a cegonha justa (com os pais), o grou prudente (Olimpiodoro, In Phaed. 8.2, a conferir)."]
    ],
    cardeais:{
      "φρόνησις":["εὐαισθησία — a agudeza dos sentidos.","Marino, Vida de Proclo 3 (a conferir)"],
      "ἀνδρεία":["ῥώμη — a força do corpo.","Marino, Vida de Proclo 3 (a conferir)"],
      "σωφροσύνη":["κάλλος — a beleza como proporção das partes.","Marino, Vida de Proclo 3 (a conferir)"],
      "δικαιοσύνη":["ὑγίεια — a saúde como equilíbrio, cada humor no seu lugar.","Marino, Vida de Proclo 3 (a conferir)"]
    }
  },
  etica:{
    aprof:[
      ["Sede","A parte irracional da alma, já educada."],
      ["Origem","O hábito (ἔθος) e a opinião reta, sem saber a causa. É a virtude \"popular e política\" que vem \"do hábito e do exercício, sem filosofia\" (Fédon 82a–b); as outras virtudes \"parecem próximas às do corpo\" e se implantam por hábitos e exercícios (República VII 518d–e)."],
      ["Paixão","Habituada: a paixão obedece por costume, não por compreensão."],
      ["Implicação","Já tendem a andar juntas, mas ainda não formam um sistema."],
      ["Em quem","Nas crianças bem criadas e em alguns animais domésticos (Olimpiodoro, In Phaed. 8.2, a conferir)."]
    ],
    cardeais:{
      "φρόνησις":["Opinião reta (ὀρθὴ δόξα): acerta, mas não sabe dizer por quê.","Mênon 97b–98a °"],
      "ἀνδρεία":["Firmeza habituada diante do temível.","°"],
      "σωφροσύνη":["Moderação habituada dos prazeres: o bom costume.","°"],
      "δικαιοσύνη":["Obediência ao justo recebido: o costume, a lei, os pais.","°"]
    }
  },
  politica:{
    aprof:[
      ["Sede","A razão governando as partes irracionais, na vida ativa e com os outros."],
      ["Origem","O λόγος que conhece a causa."],
      ["Paixão","μετριοπάθεια: a paixão recebe medida, não é extinta."],
      ["Implicação","Daqui para cima as virtudes se implicam (ἀντακολουθία), porque nascem de uma só φρόνησις: quem tem a φρόνησις tem todas (Aristóteles, EN VI.13, 1144b30–1145a2)."],
      ["Quem as tem","O homem bom, σπουδαῖος (Porfírio, Sent. 32.90–94, via Cardullo)."],
      ["Leitura","O Górgias, no currículo de Jâmblico (Prolegomena 26, a conferir)."]
    ],
    cardeais:{
      "φρόνησις":["A respeito da parte que raciocina (περὶ τὸ λογιζόμενον).","Porfírio, Sent. 32; República IV 441c–443b (grego a conferir)"],
      "ἀνδρεία":["A respeito da parte irascível (περὶ τὸ θυμούμενον).","Porfírio, Sent. 32 (a conferir)"],
      "σωφροσύνη":["O acordo e a consonância (ὁμολογία, συμφωνία) da parte passional com a razão.","Porfírio, Sent. 32 (a conferir)"],
      "δικαιοσύνη":["Cada parte fazendo o que é seu (οἰκειοπραγία) no comandar e no ser comandado.","Porfírio, Sent. 32 (a conferir)"]
    }
  },
  catartica:{
    aprof:[
      ["Sede","A razão se retirando da simpatia com o corpo."],
      ["Origem","A ascese e o rito. Para Jâmblico, a alma desce inteira e não se purifica sozinha: \"nos deuses, a purificação das almas é perfeita; nos arcanjos, é anagógica; os anjos apenas soltam as amarras da matéria\" (De mysteriis II.5, 79.7–11)."],
      ["Paixão","ἀπάθεια: o corte da simpatia com o corpo. É a virtude verdadeira do Fédon 69b–c, em que a φρόνησις é \"uma purificação\"."],
      ["Fim","Positivo antes de negativo: \"remoção do que é estranho, restauração da própria essência, perfeição, plenitude, autossuficiência, subida à causa geradora, conjunção das partes aos todos\". A libertação do corpo e a fuga da geração são \"fins menores\" (Jâmblico, De Anima §43)."],
      ["Quem as tem","O homem demoníaco, ou bom daimon (Porfírio, Sent. 32.90–94, via Cardullo)."],
      ["Leitura","O Fédon (Prolegomena 26, a conferir)."]
    ],
    cardeais:{
      "φρόνησις":["Não ter as mesmas opiniões que o corpo (μὴ συνδοξάζειν), e agir sozinha.","Porfírio, Sent. 32 (a conferir)"],
      "ἀνδρεία":["Não temer separar-se do corpo.","Porfírio, Sent. 32 (a conferir)"],
      "σωφροσύνη":["Não sofrer junto com ele (μὴ ὁμοπαθεῖν).","Porfírio, Sent. 32 (a conferir)"],
      "δικαιοσύνη":["A razão e o Nous conduzirem, sem que nada resista.","Porfírio, Sent. 32 (a conferir)"]
    }
  },
  teoretica:{
    aprof:[
      ["Sede","A alma já purificada, voltada ao Nous."],
      ["Origem","A contemplação."],
      ["Paixão","Já não se define pela paixão, e sim pelo olhar."],
      ["Quem as tem","Um deus, θεός (Porfírio, Sent. 32.90–94, via Cardullo)."],
      ["Duas leituras","A tradição de Plotino e Porfírio define este grau pelo olhar para o Nous (abaixo). A definição geral do Okhema (acima) o lê pelo Político 258e–260c, como a ciência γνωστική. São dois eixos: o primeiro diz o que a alma vê; o segundo, que tipo de saber ela exerce (°)."]
    ],
    cardeais:{
      "φρόνησις":["σοφία e φρόνησις: a contemplação do que o Nous contém (ἐν θεωρίᾳ ὧν νοῦς ἔχει).","Plotino I.2.6, via Cardullo"],
      "ἀνδρεία":["A impassibilidade por semelhança com aquilo para que se olha (ἀπάθεια καθ' ὁμοίωσιν τοῦ πρὸς ὃ βλέπει).","Plotino I.2.6, via Cardullo"],
      "σωφροσύνη":["A volta para dentro, para o Nous (ἡ εἴσω πρὸς νοῦν στροφή).","Plotino I.2.6, via Cardullo"],
      "δικαιοσύνη":["Agir em direção ao Nous (τὸ πρὸς νοῦν ἐνεργεῖν).","Plotino I.2.6, via Cardullo"]
    }
  }
};

const VIRT_ALEM = [
  {gr:"παραδειγματικαί", nome:"Paradigmáticas",
   txt:"A alma já não contempla o Nous, porque contemplar ainda supõe separação: ela está estabelecida nele por participação. São \"primeiramente as virtudes do próprio intelecto\", e Jâmblico as acrescenta no seu Sobre as virtudes (Damáscio, In Phaed. I 143, via Cardullo). Quem as tem é \"pai dos deuses\" (Porfírio, Sent. 32.90–94). Para Plotino, os paradigmas nem são virtudes: são a causa da virtude na alma (I.2.1–3).",
   cardeais:"Nas paradigmáticas, as cardeais são as do próprio Nous: a φρόνησις é o seu conhecer; a σωφροσύνη, o estar voltado a si mesmo; a δικαιοσύνη, a atividade própria; a ἀνδρεία, a identidade, o permanecer puro em si (Porfírio, Sent. 32, a conferir)."},
  {gr:"ἱερατικαί", nome:"Hieráticas (teúrgicas)",
   txt:"Não são um degrau a mais: \"subsistem segundo a parte deiforme da alma e se estendem paralelas a todas as anteriores; aquelas estão na esfera do ser, as hieráticas são unificadoras (ἑνιαῖαι)\" (Damáscio, In Phaed. I 144, via Cardullo). Marino diz que Proclo chegou às virtudes \"que Jâmblico, o inspirado, chamou excelentemente de teúrgicas\" (Vida de Proclo 26).",
   cardeais:"Nenhuma fonte conhecida define as quatro cardeais no registro hierático. Defini-las seria construção nossa (°)."}
];

const VIRT_PRINCIPIOS = [
  "Cada grau não troca de virtudes: redefine as mesmas quatro cardeais num nível diferente da alma.",
  "Quem tem os graus superiores tem os inferiores, mas age pelos superiores (Plotino I.2.7).",
  "A escada de cinco graus é a dos Prolegomena 26.30–32. Jâmblico, segundo Damáscio, contava sete, somando as paradigmáticas e as hieráticas (via Cardullo).",
  "Quem tem cada grau, segundo Porfírio: o político é homem bom; o catártico, homem demoníaco ou bom daimon; o teorético, deus; o paradigmático, pai dos deuses (Sent. 32.90–94)."
];

const VIRT_PORTICO=['natural','φρόνησις','etica','ἀνδρεία','politica','σωφροσύνη','catartica','δικαιοσύνη','teoretica'];
const VIRT_IMG={'φρόνησις':'phronesis','ἀνδρεία':'andreia','σωφροσύνη':'sophrosyne','δικαιοσύνη':'dikaiosyne'};
function portico(){
  return `<div class="portico-moldura"><div class="portico" role="group" aria-label="Os cinco graus e as quatro cardeais">${VIRT_PORTICO.map(k=>{
    const g=GRAUS.find(x=>x.id===k);
    if(g)return `<button type="button" class="pt-col" data-act="virt-ir" data-alvo="virt-${g.id}" title="${esc(g.nome)}"><img src="imagens/virtudes/col-${g.id}.webp" alt="Coluna: ${esc(g.nome)} (${esc(g.gr)})"></button>`;
    return `<button type="button" class="pt-est" data-act="virt-ir" data-alvo="virt-cardeais" data-card="${esc(k)}" title="${esc(k)}"><img src="imagens/virtudes/${VIRT_IMG[k]}.webp" alt="Estátua: ${esc(k)}"><span class="pt-placa"><span class="gr">${esc(k)}</span></span></button>`;
  }).join('')}</div></div>`;
}
function virtIr(alvo,card){
  if(S.fechadas.has(alvo)){S.fechadas.delete(alvo);try{localStorage.setItem(SEC_KEY,JSON.stringify([...S.fechadas]));}catch(e){}render();}
  const el=document.getElementById(alvo);if(!el)return;
  el.scrollIntoView({behavior:'smooth',block:'start'});
  const brilho=card?el.querySelector(`.virt-card[data-card="${card}"]`):el;
  if(brilho){brilho.classList.remove('virt-brilho');void brilho.offsetWidth;brilho.classList.add('virt-brilho');}
}
function vVirtudes(){
  const linhas=a=>a.map(([k,v])=>`<div class="virt-linha"><small>${esc(k)}</small><div>${esc(v)}</div></div>`).join('');
  const quadro=g=>{const c=VIRT_GRAUS[g.id].cardeais;return `<div class="virt-cardeais">${VIRT_CARDEAIS.map(k=>{const [d,f]=c[k.gr];return `<div class="virt-card"><div class="virt-card-nome"><span class="gr">${esc(k.gr)}</span> <small>${esc(k.nome)}</small></div><p>${esc(d)}</p><p class="virt-fonte">${esc(f)}</p></div>`;}).join('')}</div>`;};
  const graus=GRAUS.map((g,i)=>{const G=VIRT_GRAUS[g.id];if(!G)return '';
    return `<div id="virt-${g.id}" class="virt-ancora">`+caixa('virt-'+g.id,`${i+1}. ${esc(g.nome)} <span class="gr">${esc(g.gr)}</span>`,'',
      `<div class="virt-corpo"><p class="virt-geral">${esc(g.desc)}</p>
       <h4>Aprofundamento</h4>${linhas(G.aprof)}
       <h4>As quatro cardeais neste grau</h4>${quadro(g)}</div>`)+'</div>';}).join('');
  const alem=VIRT_ALEM.map(a=>caixa('virt-'+a.nome.slice(0,6).toLowerCase(),`${esc(a.nome)} <span class="gr">${esc(a.gr)}</span>`,'',
      `<div class="virt-corpo"><p>${esc(a.txt)}</p><p>${esc(a.cardeais)}</p></div>`)).join('');
  return `<section class="pagina virtudes"><h2>Virtudes</h2>
    <p class="base-txt">A escada dos graus de virtude, do corpo ao Nous. Em cada grau aparecem as mesmas quatro cardeais, redefinidas segundo a sede, a origem e a relação com a paixão. Referências marcadas \"a conferir\" estão citadas de memória; ° marca construção do Okhema.</p>
    ${portico()}
    <div id="virt-cardeais" class="virt-ancora">${caixa('virt-cardeais','As quatro cardeais','',`<div class="virt-cardeais">${VIRT_CARDEAIS.map(k=>`<div class="virt-card" data-card="${esc(k.gr)}"><div class="virt-card-nome"><span class="gr">${esc(k.gr)}</span> <small>${esc(k.nome)}</small></div><p>${esc(k.sede)}</p></div>`).join('')}</div><p class="virt-fonte">República IV 427e–444a.</p>`)}</div>
    ${caixa('virt-principios','Princípios da escada','',`<ul class="virt-lista">${VIRT_PRINCIPIOS.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`)}
    <h3 class="virt-titulo">Os cinco graus</h3>${graus}
    <h3 class="virt-titulo">Além dos cinco</h3>${alem}
  </section>`;
}
