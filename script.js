/* ============================================================
   DIA DOS NAMORADOS — LÓGICA (Vanilla JS, sem bibliotecas)
   ============================================================ */

/* ╔══════════════════════════════════════════════════════════╗
   ║  EDITAR AQUI (7): CONFIGURAÇÃO PRINCIPAL                    ║
   ║  Mude o nome e ESCREVA A CARTA FINAL aqui embaixo.         ║
   ║  Use quebras de linha normais — elas serão respeitadas.    ║
   ╚══════════════════════════════════════════════════════════╝ */
const CONFIG = {
  // Velocidade da digitação da carta (ms por caractere). Menor = mais rápido.
  typingSpeed: 45,

  // A carta de amor que será "digitada" no final.
  // Escreva à vontade. Pode usar emojis. As linhas em branco são mantidas.
  letter:
`Meu amor,

Se você chegou até aqui, é porque eu finalmente consegui te dizer,
do meu jeito, o que sinto desde o primeiro dia.

Você é a minha pessoa. A minha calmaria e a minha aventura.
Obrigado(a) por existir e por escolher caminhar ao meu lado.

Feliz Dia dos Namorados. Eu te amo — hoje e sempre.`,
};

/* ---------- Atalhos ---------- */
const $ = (sel) => document.querySelector(sel);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   FUNDO: gera estrelas e corações flutuantes
   ============================================================ */
function buildSky() {
  const sky = $("#sky");
  const STAR_COUNT = 60;                  // quantidade de estrelas
  let html = "";
  for (let i = 0; i < STAR_COUNT; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (2 + Math.random() * 4).toFixed(2);
    const delay = (Math.random() * 4).toFixed(2);
    const size = Math.random() < 0.2 ? 3 : 2;
    html += `<span class="star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;--dur:${dur}s;animation-delay:${delay}s"></span>`;
  }
  sky.innerHTML = html;

  // Corações flutuantes (poucos, para não pesar)
  const hearts = $("#floatingHearts");
  let hh = "";
  const HEART_COUNT = 9;
  for (let i = 0; i < HEART_COUNT; i++) {
    const x = Math.random() * 100;
    const dur = (10 + Math.random() * 10).toFixed(1);
    const delay = (Math.random() * 12).toFixed(1);
    const size = 14 + Math.random() * 16;
    hh += `<span class="fh" style="left:${x}%;--dur:${dur}s;animation-delay:${delay}s;font-size:${size}px">♥</span>`;
  }
  hearts.innerHTML = hh;
}

/* ============================================================
   1) CAPA + 2) MÚSICA  (o toque no botão inicia a música)
   ============================================================ */
const audio = $("#bgMusic");
const player = $("#player");

function openExperience() {
  // Tenta tocar a música — chamada DENTRO do clique = autoplay liberado no mobile
  if (audio) {
    audio.volume = 0;
    const tryPlay = audio.play();
    if (tryPlay && typeof tryPlay.then === "function") {
      tryPlay
        .then(() => { fadeInVolume(); setPlaying(true); })
        .catch(() => { setPlaying(false); }); // se o navegador bloquear, fica pausado
    }
  }

  // Revela conteúdo, esconde capa, mostra player
  $("#cover").classList.add("is-open");
  $("#content").classList.add("is-revealed");
  player.classList.add("is-visible");

  // Garante que a primeira seção visível anime
  setTimeout(revealOnScroll, 60);
}

// Sobe o volume suavemente
function fadeInVolume() {
  let v = 0;
  const id = setInterval(() => {
    v += 0.05;
    if (v >= 0.85) { audio.volume = 0.85; clearInterval(id); }
    else { audio.volume = v; }
  }, 80);
}

function setPlaying(isPlaying) {
  player.classList.toggle("is-playing", isPlaying);
}

// Botão play/pause do mini-player
function setupPlayer() {
  $("#playToggle").addEventListener("click", () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  });
  audio?.addEventListener("play",  () => setPlaying(true));
  audio?.addEventListener("pause", () => setPlaying(false));
}

/* ============================================================
   3) FADE-IN NO SCROLL (IntersectionObserver)
   ============================================================ */
let io;
function setupReveal() {
  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    return;
  }
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}
// fallback manual (usado logo após abrir)
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) el.classList.add("is-in");
  });
}

/* ============================================================
   4) CARROSSEL — pontinhos indicadores + swipe nativo
   ============================================================ */
function setupCarousel() {
  const track = $("#carousel");
  const dotsWrap = $("#dots");
  const cards = Array.from(track.children);
  if (!cards.length) return;

  // Cria um pontinho por cartão
  cards.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Ir para o cartão ${i + 1}`);
    if (i === 0) b.classList.add("is-active");
    b.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.children);

  // Atualiza o pontinho ativo conforme o usuário arrasta
  let raf;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let activeIndex = 0;
      let best = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < best) { best = dist; activeIndex = i; }
      });
      dots.forEach((d, i) => d.classList.toggle("is-active", i === activeIndex));
    });
  });
}

/* ============================================================
   5) REVELAÇÃO FINAL — typewriter + confetes de coração
   ============================================================ */
function setupFinal() {
  $("#unlockBtn").addEventListener("click", (e) => {
    e.currentTarget.classList.add("is-used");
    const letter = $("#letter");
    letter.hidden = false;
    letter.scrollIntoView({ behavior: "smooth", block: "center" });

    heartConfetti();           // 🎉 corações
    typeWriter($("#letterText"), CONFIG.letter, CONFIG.typingSpeed);
  });
}

// Efeito de digitação
function typeWriter(el, text, speed) {
  if (prefersReducedMotion) {          // sem animação se o usuário pediu
    el.textContent = text;
    $(".letter__sign")?.classList.add("is-in");
    return;
  }
  el.textContent = "";
  el.classList.add("is-typing");
  let i = 0;
  (function tick() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(tick, speed);
    } else {
      el.classList.remove("is-typing");
      $(".letter__sign")?.classList.add("is-in");   // mostra a assinatura no fim
    }
  })();
}

/* ---- Confetes em formato de CORAÇÃO (Canvas) ---- */
function heartConfetti() {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#ff6f9c", "#ffb3cd", "#f6d6a8", "#ff8fb1", "#ffffff"];
  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  // Cria as partículas (corações)
  const COUNT = prefersReducedMotion ? 0 : 70;
  const parts = [];
  for (let i = 0; i < COUNT; i++) {
    parts.push({
      x: W() / 2 + (Math.random() - 0.5) * 80,
      y: H() + 20,
      vx: (Math.random() - 0.5) * 6,
      vy: -(7 + Math.random() * 7),          // dispara para cima
      g: 0.18 + Math.random() * 0.1,         // gravidade
      size: 8 + Math.random() * 12,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
      color: colors[(Math.random() * colors.length) | 0],
      life: 1,
    });
  }

  function drawHeart(x, y, size, rot, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(size / 16, size / 16);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    // desenho de coração (curvas de Bézier)
    ctx.moveTo(0, 4);
    ctx.bezierCurveTo(0, 1, -2, -3, -6, -3);
    ctx.bezierCurveTo(-12, -3, -12, 4, -12, 4);
    ctx.bezierCurveTo(-12, 8, -7, 12, 0, 16);
    ctx.bezierCurveTo(7, 12, 12, 8, 12, 4);
    ctx.bezierCurveTo(12, 4, 12, -3, 6, -3);
    ctx.bezierCurveTo(2, -3, 0, 1, 0, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  let frame = 0;
  const MAX_FRAMES = 240;          // ~4s
  function loop() {
    ctx.clearRect(0, 0, W(), H());
    let alive = false;
    parts.forEach((p) => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (frame > 90) p.life -= 0.012;       // some no fim
      const a = Math.max(0, Math.min(1, p.life));
      if (p.y < H() + 40 && a > 0) {
        drawHeart(p.x, p.y, p.size, p.rot, p.color, a);
        alive = true;
      }
    });
    frame++;
    if (alive && frame < MAX_FRAMES) {
      requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, W(), H());        // limpa ao final
    }
  }
  loop();
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  buildSky();
  setupPlayer();
  setupReveal();
  setupCarousel();
  setupFinal();

  $("#openBtn").addEventListener("click", openExperience);
});
