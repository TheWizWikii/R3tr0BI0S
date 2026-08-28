/* ---------------------------------------------------------
   1) FONDO SYNTHWAVE: horizonte de rejilla + sol en movimiento
--------------------------------------------------------- */
(function () {
  const canvas = document.getElementById("grid-bg");
  const ctx = canvas.getContext("2d");
  let w, h, dpr;
  let offset = 0;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  window.addEventListener("resize", resize);
  resize();

  const horizonY = () => h * 0.62;

  function drawStars() {
    ctx.save();
    for (let i = 0; i < 70; i++) {
      const sx = (i * 197) % w;
      const sy = (i * 311) % (horizonY() * 0.9);
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin((offset / 40) + i));
      ctx.fillStyle = `rgba(200,220,255,${0.15 + twinkle * 0.35})`;
      ctx.fillRect(sx, sy, 2 * dpr, 2 * dpr);
    }
    ctx.restore();
  }

  function drawSun() {
    const cx = w / 2;
    const cy = horizonY() - 40 * dpr;
    const r = Math.min(w, h) * 0.16;

    const grad = ctx.createLinearGradient(0, cy - r, 0, cy + r);
    grad.addColorStop(0, "#ffd23f");
    grad.addColorStop(0.45, "#ff6b35");
    grad.addColorStop(1, "#ff2e9d");

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = grad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    // franjas horizontales estilo "sol de los 80"
    ctx.fillStyle = "rgba(10,1,24,0.92)";
    const stripes = 7;
    for (let i = 0; i < stripes; i++) {
      const t = i / stripes;
      const stripeY = cy - r + t * r * 1.6;
      const stripeH = (r * 0.09) * (1 + t * 1.4);
      ctx.fillRect(cx - r, stripeY, r * 2, stripeH);
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(255,107,53,0.5)";
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawGrid() {
    const hY = horizonY();
    ctx.save();

    // rejilla horizontal (líneas que se alejan hacia el horizonte)
    const lines = 26;
    for (let i = 0; i < lines; i++) {
      const t = ((i + (offset % 1)) / lines);
      const easedT = Math.pow(t, 2.6);
      const y = hY + easedT * (h - hY);
      const alpha = 0.55 * (1 - t * 0.6);
      ctx.strokeStyle = `rgba(0,240,255,${Math.max(alpha, 0.03)})`;
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // rejilla vertical (líneas convergentes hacia el punto de fuga)
    const vanishX = w / 2;
    const cols = 22;
    for (let i = -cols; i <= cols; i++) {
      const spread = i / cols;
      const farX = vanishX + spread * w * 0.06;
      const nearX = vanishX + spread * w * 1.6;
      const alpha = 0.4 * (1 - Math.abs(spread) * 0.5);
      ctx.strokeStyle = `rgba(255,46,157,${Math.max(alpha, 0.04)})`;
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(farX, hY);
      ctx.lineTo(nearX, h);
      ctx.stroke();
    }

    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    // cielo
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY());
    skyGrad.addColorStop(0, "#0a0118");
    skyGrad.addColorStop(1, "#1a0b3e");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizonY());

    // suelo
    const groundGrad = ctx.createLinearGradient(0, horizonY(), 0, h);
    groundGrad.addColorStop(0, "#170b2e");
    groundGrad.addColorStop(1, "#0a0118");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY(), w, h - horizonY());

    drawStars();
    drawSun();
    drawGrid();

    if (!prefersReducedMotion) {
      offset += 0.006;
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();

/* ---------------------------------------------------------
   2) TARJETAS: generación a partir de data.js
--------------------------------------------------------- */
function cartridgeIcon(label, color) {
  return `
  <svg class="cart-icon" viewBox="0 0 64 64" role="img" aria-hidden="true" style="--c:${color}">
    <rect x="10" y="6" width="44" height="52" rx="3" fill="#12081f" stroke="var(--c)" stroke-width="2"/>
    <rect x="16" y="12" width="32" height="14" rx="1" fill="var(--c)" opacity="0.18"/>
    <rect x="16" y="12" width="32" height="14" rx="1" fill="none" stroke="var(--c)" stroke-width="1.5"/>
    <rect x="20" y="30" width="24" height="4" fill="var(--c)" opacity="0.55"/>
    <rect x="20" y="38" width="16" height="4" fill="var(--c)" opacity="0.35"/>
    <rect x="16" y="48" width="4" height="4" fill="var(--c)"/>
    <rect x="24" y="48" width="4" height="4" fill="var(--c)" opacity="0.6"/>
    <rect x="32" y="48" width="4" height="4" fill="var(--c)" opacity="0.3"/>
    <text x="32" y="22" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="7" fill="#0a0118">${label}</text>
  </svg>`;
}

function initials(name) {
  return name
    .replace("/", " ")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function partsLinks(parts) {
  return parts
    .map((p, i) => {
      const label = parts.length > 1 ? `parte ${i + 1}` : "descargar";
      return `<a class="part-link" href="${RELEASE_BASE}${p}" download>${label}</a>`;
    })
    .join(" + ");
}

function renderPlatformCard(p) {
  const archivedTag = p.archived
    ? `<span class="tag tag-archived">Archivado</span>`
    : "";
  return `
  <article class="cart" style="--accent:${p.color}" data-name="${p.name.toLowerCase()}">
    <div class="cart-top">
      ${cartridgeIcon(initials(p.name), p.color)}
      <div class="cart-title">
        <h3>${p.name}</h3>
        <p class="cart-version">v${p.version} ${archivedTag}</p>
      </div>
    </div>

    <p class="cart-extract"><span>Extraer en</span><code>${p.extract}</code></p>

    <div class="cart-row">
      <div class="cart-meta">
        <i class="dot dot-full"></i>
        <span>Pack completo</span>
        <b>${p.full.files.toLocaleString("es-ES")} arch. · ${p.full.size}</b>
      </div>
      <div class="cart-links">${partsLinks(p.full.parts)}</div>
    </div>

    <div class="cart-row">
      <div class="cart-meta">
        <i class="dot dot-lite"></i>
        <span>Pack de plataforma</span>
        <b>${p.lite.files.toLocaleString("es-ES")} arch. · ${p.lite.size}</b>
      </div>
      <div class="cart-links">${partsLinks(p.lite.parts)}</div>
    </div>
  </article>`;
}

function renderStandaloneCard(s) {
  return `
  <article class="cart cart-standalone" style="--accent:${s.color}" data-name="${s.name.toLowerCase()}">
    <div class="cart-top">
      ${cartridgeIcon(initials(s.name), s.color)}
      <div class="cart-title">
        <h3>${s.name}</h3>
        <p class="cart-version">${s.note}</p>
      </div>
    </div>
    <div class="cart-row">
      <div class="cart-meta">
        <i class="dot dot-full"></i>
        <span>Pack</span>
        <b>${s.files} arch. · ${s.size}</b>
      </div>
      <div class="cart-links">${partsLinks(s.parts)}</div>
    </div>
  </article>`;
}

const grid = document.getElementById("cart-grid");
grid.innerHTML = PLATFORMS.map(renderPlatformCard).join("");

const standaloneGrid = document.getElementById("standalone-grid");
standaloneGrid.innerHTML = STANDALONE.map(renderStandaloneCard).join("");

/* ---------------------------------------------------------
   3) BUSCADOR
--------------------------------------------------------- */
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll("#cart-grid .cart").forEach((card) => {
    card.style.display = card.dataset.name.includes(q) ? "" : "none";
  });
});

/* ---------------------------------------------------------
   4) TABS DE INSTALACIÓN
--------------------------------------------------------- */
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".terminal-body").forEach((el) => el.classList.add("hidden"));
    document.getElementById(`term-${tab.dataset.tab}`).classList.remove("hidden");
  });
});

/* ---------------------------------------------------------
   5) COPIAR COMANDO
--------------------------------------------------------- */
const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", async () => {
  const visible = document.querySelector(".terminal-body:not(.hidden)");
  try {
    await navigator.clipboard.writeText(visible.textContent.trim());
    const original = copyBtn.textContent;
    copyBtn.textContent = "¡COPIADO!";
    setTimeout(() => (copyBtn.textContent = original), 1500);
  } catch (err) {
    copyBtn.textContent = "ERROR";
  }
});
