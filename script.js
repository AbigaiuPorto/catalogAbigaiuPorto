/* ==========================================================
   CATÁLOGO · Abigaiu Porto Beauty
   Para mudar preços, textos ou fotos, edite só os dados abaixo.
   Fotos: coloque os arquivos na pasta "fotos" com o nome indicado
   em cada "foto". Sem arquivo, aparece o quadro reservado.
   ========================================================== */
 
// Reajuste geral em %. Ex.: 10 aumenta todos os preços em 10%. 0 = preços como estão.
const REAJUSTE_PERCENT = 0;

const PERFIL = {
  nome: "Abigaiu Porto",
  foto: "fotos/perfil.jpg",
  anos: "Mais de 12 anos de experiência",
  texto: "Meu foco é a naturalidade, o bem-estar das minhas clientes e a durabilidade de cada trabalho."
};

// preco: número em reais. Use null para mostrar "Consulte".
// manutencao: texto livre, ou null para não mostrar.
const SECOES = [
  {
    titulo: "Cílios", numero: "02",
    destaque: { nome: "Volume egípcio", preco: 165, manutencao: "15 a 20 dias", foto: "fotos/volumeegipcio.jpg" },
    itens: [
      { nome: "Mega egípcio", preco: 200, manutencao: null, foto: "fotos/mega-egipcio.jpg" },
      { nome: "Volume brasileiro", preco: 140, manutencao: "15 a 20 dias", foto: "fotos/volume-brasileiro.jpg" },
      { nome: "Mega brasileiro", preco: 190, manutencao: null, foto: "fotos/mega-brasileiro.jpg" },
      { nome: "Brasileiro light", preco: 120, manutencao: null, foto: "fotos/brasileiro-light.jpg" },
      { nome: "Efeito aurora", preco: 140, manutencao: "15 a 20 dias", foto: "fotos/efeito-arora.jpg" },
      { nome: "Fio a fio clássico", preco: 130, manutencao: "15 a 20 dias", foto: "fotos/fio-a-fio-classico.jpg" },
      { nome: "Volume power", preco: 190 , manutencao: null, foto: "fotos/volume-power.jpg" }
    ],
    complementos: [
      { nome: "Manutenção de cílios", preco: 110 },
      { nome: "Remoção de cílios", preco: 35 }
    ]
  },
  {
    titulo: "Unhas", numero: "03",
    destaque: { nome: "Alongamento em gel", preco: 180, manutencao: "20 dias", foto: "fotos/alongamento-em-gel.jpg" },
    itens: [
      { nome: "Fibra de vidro", preco: 200, manutencao: "20 dias", foto: "fotos/fibra-de-vidro.jpg" },
      { nome: "Banho de gel", preco: 130, manutencao: "20 dias", foto: "fotos/banho-de-gel.jpg" },
      { nome: "Esmaltação em gel (mãos)", preco: 90, manutencao: null, foto: "fotos/esmaltacao-maos.jpg" },
      { nome: "Esmaltação em gel (pés)", preco: null, manutencao: null, foto: "fotos/esmaltacao-pes.jpg" }
    ],
    complementos: [
      { nome: "Manutenção do alongamento", preco: 115 },
      { nome: "Manutenção do banho de gel", preco: 100 },
      { nome: "Remoção de alongamento", preco: 40 },
      { nome: "Encapsulada, baby boomer", preco: 30 },
      { nome: "Unha quebrada", preco: 8 }
    ]
  },
  {
    titulo: "Sobrancelhas, mãos e pés", numero: "04",
    destaque: { nome: "Design com henna", preco: 50, manutencao: null, foto: "fotos/design-com-henna.jpg" },
    itens: [
      { nome: "Design de sobrancelha", preco: 40, manutencao: null, foto: "fotos/design-de-sobrancelha.jpg" },
     
      { nome: "Mão", preco: 35, manutencao: null, foto: "fotos/mao.jpg" },
      { nome: "Pé", preco: 45, manutencao: null, foto: "fotos/pe.jpg" },
     
    ],
    complementos: [ { nome: "Buço", preco: 12, manutencao: null, foto: null },
       { nome: "Mão e pé", preco: 70, manutencao: null, foto: null },
      { nome: "Plástica dos pés", preco: 45, manutencao: null, foto: null }

    ]
  }
];

const CONTATO = {
  titulo: "Agende seu horário",
  // Deixe só as formas que você aceita.
  pagamentos: ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"],
  endereco: "Estrada Serra do Aguirre, 198, Chácara Monte Serrat, Itapevi - SP, 06685-200", // Escreva o endereço completo: o mapa e a rota do Google Maps são criados sozinhos.
                         // Ex.: "Rua das Flores, 123, Centro, Itapevi - SP"
  mapaEmbed: "",           // Opcional. Só preencha se quiser um mapa específico (Maps > Compartilhar > Incorporar).
  mapaLink: "",            // Opcional. Link do Maps (Compartilhar > Copiar link) para o botão de rota.
  foto: "fotos/local.jpg", // Usada se não houver mapaEmbed
  instagram: "abigailportobeauty",
  telefone: "(11) 97240-2055",
  whatsapp: "5511972402055",
  fecho: "Será um prazer cuidar de você"
};

/* ---------------- código ---------------- */
const $ = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reais = n => n == null ? "Consulte" : "R$ " + Math.round(n * (1 + REAJUSTE_PERCENT / 100)).toLocaleString("pt-BR");


function foto(src, rotulo, extra) {
  const f = $("div", "foto" + (extra ? " " + extra : ""));
  const vazio = () => { f.classList.add("vazia"); f.innerHTML = "Foto"; };
  if (!src) { vazio(); return f; }
  const img = new Image();
  img.alt = rotulo || ""; img.loading = "lazy";
  img.onerror = () => { img.remove(); vazio(); };
  img.src = src; f.appendChild(img);
  return f;
}
function pagina(classe, conteudo) {
  const s = $("section", "pagina surge " + classe), m = $("div", "miolo");
  m.append(...conteudo); s.append(m); return s;
}
const topo = n => $("div", "topo", `<span class="rotulo">Abigaiu Porto Beauty</span><span class="rotulo">${esc(n)}</span>`);
const manut = t => t ? `<div class="manut">Manutenção · ${esc(t)}</div>` : "";
const whatsLink = (msg) => `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(msg)}`;

function capa() {
  const c = $("section", "pagina capa escuro surge"), m = $("div", "miolo");
  m.append($("div", "rotulo", "Beauty"), $("h1", "", esc(PERFIL.nome)), foto(PERFIL.foto, PERFIL.nome),
    $("div", "anos", esc(PERFIL.anos)), $("p", "texto", esc(PERFIL.texto)), $("div", "fio"),
    $("div", "rotulo", "Catálogo de serviços"), $("div", "sub", "Cílios · Unhas · Sobrancelhas"));
  const b = $("a", "btn", "Agendar"); b.href = whatsLink("Olá! Vim pelo catálogo e gostaria de agendar um horário."); b.target = "_blank"; b.rel = "noopener";
  m.append(b); c.append(m); return c;
}
function secao(s) {
  const d = s.destaque;
  const dest = $("div", "destaque");
  dest.append(foto(d.foto, d.nome), $("div", "info",
    `<div><div class="rotulo">Destaque</div><h3>${esc(d.nome)}</h3>${manut(d.manutencao)}</div><div class="preco">${reais(d.preco)}</div>`));
  const grade = $("div", "grade");
  s.itens.forEach(i => {
    const c = $("div", "card");
    if (i.foto) c.append(foto(i.foto, i.nome));
    c.append($("div", "linha", `<h3>${esc(i.nome)}</h3><div class="preco">${reais(i.preco)}</div>`));
    if (i.manutencao) c.append($("div", "manut", `Manutenção · ${esc(i.manutencao)}`));
    grade.append(c);
  });
  const partes = [topo(s.numero), $("h2", "titulo", esc(s.titulo)), dest, grade];
  if (s.complementos.length) {
    const cp = $("div", "complementos", `<div class="rotulo">Complementos</div>`);
    s.complementos.forEach(i => cp.append($("div", "item", `<span>${esc(i.nome)}</span><span class="preco">${reais(i.preco)}</span>`)));
    partes.push(cp);
  }
  partes.push($("div", "fim centro rotulo", esc(CONTATO.telefone)));
  return pagina("claro", partes);
}

function contato() {
  const pag = $("div", "bloco");

  CONTATO.pagamentos.forEach((forma) => {
    pag.append(
      $("div", "item", `<span>${esc(forma)}</span>`)
    );
  });

  // Localização e Google Maps
  const loc = $("div", "bloco",
    `<div class="rotulo">Localização</div>`
  );

  // Mapa do Google (resumo da localização). Usa mapaEmbed se você preencher, senão cria a partir do endereço.
  const mapaSrc = CONTATO.mapaEmbed || (CONTATO.endereco ? `https://www.google.com/maps?q=${encodeURIComponent(CONTATO.endereco)}&output=embed` : "");
  if (mapaSrc) {
    const mp = $("div", "foto mapa");
    mp.style.cursor = "default"; mp.style.marginBottom = "14px";
    mp.innerHTML = `<iframe src="${esc(mapaSrc)}" title="Mapa do Google Maps com a localização do atendimento" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
    loc.append(mp);
  }

  loc.append(
    $("div", "item",
      `<span>${esc(CONTATO.endereco)}</span>`
    )
  );

  const mapaUrl = CONTATO.mapaLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.endereco)}`;

  loc.append(
    $("div", "item",
      `<a class="preco"
          style="color:inherit; text-decoration:none"
          href="${esc(mapaUrl)}"
          target="_blank"
          rel="noopener noreferrer">
          Ver localização no Google Maps
       </a>`
    )
  );

  // Redes sociais
  const redes = $("div", "bloco",
    `<div class="rotulo">Redes sociais</div>`
  );

  // Instagram: ícone e nome clicáveis
  if (CONTATO.instagram) {
    redes.append(
      $("div", "item",
        `<a href="https://instagram.com/${esc(CONTATO.instagram)}"
            target="_blank"
            rel="noopener noreferrer"
            style="color:inherit; text-decoration:none; display:flex; align-items:center; gap:8px">

          <svg xmlns="http://www.w3.org/2000/svg"
               width="18" height="18"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="1.8"
               stroke-linecap="round"
               stroke-linejoin="round"
               aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1"/>
          </svg>

          Instagram
        </a>`
      )
    );
  }

  // WhatsApp: ícone e nome clicáveis, sem exibir o número
  redes.append(
    $("div", "item",
      `<a href="${whatsLink("Olá! Gostaria de agendar um horário.")}"
          target="_blank"
          rel="noopener noreferrer"
          style="color:inherit; text-decoration:none; display:flex; align-items:center; gap:8px">

        <svg xmlns="http://www.w3.org/2000/svg"
             width="18" height="18"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round"
             aria-hidden="true">
          <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.4A8.4 8.4 0 1 1 21 11.5Z"/>
          <path d="M9 9a6 6 0 0 0 6 6"/>
        </svg>

        WhatsApp
      </a>`
    )
  );

  return pagina("escuro", [
    topo("05"),
    $("h2", "titulo", esc(CONTATO.titulo)),
    pag,
    loc,
    redes,
    $("div", "fecho", esc(CONTATO.fecho))
  ]);
}

const raiz = document.getElementById("catalogo");
raiz.append(capa(), ...SECOES.map(secao), contato());

// zoom ao clicar na foto
const lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
document.addEventListener("click", e => {
  const f = e.target.closest(".foto img");
  if (f && !lb.contains(f)) { lbImg.src = f.src; lbImg.alt = f.alt; lb.hidden = false; }
  else if (!lb.hidden) lb.hidden = true;
});
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });

// entrada suave ao rolar
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visivel"); io.unobserve(x.target); } }), { threshold: .08 });
document.querySelectorAll(".surge").forEach(e => io.observe(e));

/* ---------- acessibilidade: tamanho da fonte e contraste ---------- */
(function () {
  const ESCALAS = [0.9, 1, 1.15, 1.3, 1.5];
  const ler = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  let idx = ESCALAS.indexOf(parseFloat(ler("ap-escala")));
  if (idx < 0) idx = 1;
  let contraste = ler("ap-contraste") === "1";
  const raizHtml = document.documentElement;

  const barra = $("div", "acess");
  barra.setAttribute("role", "group");
  barra.setAttribute("aria-label", "Acessibilidade");
  const botao = (txt, rotulo) => { const b = $("button", "acess-btn", txt); b.type = "button"; b.setAttribute("aria-label", rotulo); b.title = rotulo; return b; };
  const menos = botao("A−", "Diminuir tamanho da fonte");
  const mais = botao("A+", "Aumentar tamanho da fonte");
  const cont = botao("Contraste", "Alto contraste");
  const aviso = $("div", "sr-only"); aviso.setAttribute("role", "status");
  barra.append(menos, mais, cont, aviso);

  function aplicar(anunciar) {
    raizHtml.style.setProperty("--fs", ESCALAS[idx]);
    raizHtml.classList.toggle("fonte-ajustada", idx !== 1);
    raizHtml.classList.toggle("alto-contraste", contraste);
    cont.setAttribute("aria-pressed", String(contraste));
    menos.disabled = idx === 0;
    mais.disabled = idx === ESCALAS.length - 1;
    guardar("ap-escala", ESCALAS[idx]); guardar("ap-contraste", contraste ? "1" : "0");
    if (anunciar) aviso.textContent = `Fonte em ${Math.round(ESCALAS[idx] * 100)}%. Alto contraste ${contraste ? "ligado" : "desligado"}.`;
  }
  menos.addEventListener("click", () => { if (idx > 0) { idx--; aplicar(true); } });
  mais.addEventListener("click", () => { if (idx < ESCALAS.length - 1) { idx++; aplicar(true); } });
  cont.addEventListener("click", () => { contraste = !contraste; aplicar(true); });
  document.body.append(barra);
  aplicar(false);
})();