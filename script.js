/* =========================================================
   Portofolio v2 — script.js
   Data proyek diambil dari projects.js (PROJECTS & KATEGORI)
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;

  const esc = (v = "") => String(v).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (v = "") => v.toLowerCase().trim().replace(/\s+/g, "-");
  const arrow = '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  /* ---------- Navbar ---------- */
  const nav = $("#nav");
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");

  const setMenu = (open) => {
    navLinks.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Tutup" : "Menu";
  };
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

  // Tandai menu sesuai section yang sedang dibaca
  const links = $$("a", navLinks);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-current", a.hash === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => { const t = $(a.hash); if (t) spy.observe(t); });

  /* ---------- Proyek ---------- */
  const data = (typeof PROJECTS !== "undefined" ? PROJECTS : []).slice()
    .sort((a, b) => (b.unggulan === true) - (a.unggulan === true) || (b.tahun || 0) - (a.tahun || 0));
  const labels = typeof KATEGORI !== "undefined" ? KATEGORI : {};
  const listEl = $("#workList");
  const filterEl = $("#filters");
  let active = "all";
  let current = null; // proyek yang sedang ditampilkan di panel

  const coverHTML = (p) => p.gambar
    ? `<img src="${esc(p.gambar)}" alt="Tampilan ${esc(p.judul)}" loading="lazy">`
    : `<div class="cover cover--${esc(p.warna || "biru")}"><span>${esc(p.judul)}</span></div>`;

  const linksHTML = (p) => {
    const btns = [];
    if (p.link?.demo) btns.push(`<a class="btn btn--solid" href="${esc(p.link.demo)}" target="_blank" rel="noopener">Buka proyek</a>`);
    if (p.link?.kode) btns.push(`<a class="btn btn--line" href="${esc(p.link.kode)}" target="_blank" rel="noopener">Lihat kode</a>`);
    return btns.join("");
  };

  // Panel tampilan proyek (desktop)
  const showcase = $("#showcase");
  const renderShowcase = (animate = true) => {
    const p = data.find((d) => d.id === current);
    if (!p) { showcase.innerHTML = ""; showcase.hidden = true; return; }
    showcase.hidden = false;
    showcase.innerHTML = `
      <div class="showcase__cover">${coverHTML(p)}</div>
      <div class="showcase__body">
        <p class="showcase__meta">
          <span class="status status--${slug(p.status)}">${esc(p.status || "")}</span>
          <span>${esc(p.jenis || "")}</span><span>${esc(p.tahun || "")}</span>
        </p>
        <h3>${esc(p.judul)}</h3>
        <p class="showcase__desc">${esc(p.ringkas || "")}</p>
        ${(p.detail || []).length ? `<ul class="showcase__list">${p.detail.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        ${(p.tags || []).length ? `<div class="showcase__tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="showcase__links">${linksHTML(p)}</div>
      </div>`;
    if (animate && !reduceMotion) {
      showcase.classList.remove("is-changing");
      void showcase.offsetWidth; // mulai ulang animasi
      showcase.classList.add("is-changing");
    }
  };

  const setCurrent = (id) => {
    if (!id || id === current) return;
    current = id;
    $$(".work__row", listEl).forEach((li) => {
      const on = li.firstElementChild.dataset.id === id;
      li.classList.toggle("is-active", on);
      li.firstElementChild.setAttribute("aria-pressed", String(on));
    });
    renderShowcase();
  };
  const wide = matchMedia("(min-width: 961px)");

  // Ringkasan, misalnya "4 proyek · 1 proyek klien · 1 riset"
  const klien = data.filter((p) => /klien/i.test(p.jenis)).length;
  const riset = data.filter((p) => /riset/i.test(p.jenis)).length;
  $("#workSummary").textContent = [
    `${data.length} proyek`,
    klien && `${klien} proyek klien`,
    riset && `${riset} riset`
  ].filter(Boolean).join(" · ");

  const renderFilters = () => {
    const used = Object.keys(labels).filter((k) => data.some((p) => (p.kategori || []).includes(k)));
    const btn = (key, text, n) =>
      `<button class="filter${key === active ? " is-active" : ""}" data-filter="${key}" role="tab" aria-selected="${key === active}">${esc(text)}<sup>${n}</sup></button>`;
    filterEl.innerHTML = btn("all", "Semua", data.length) +
      used.map((k) => btn(k, labels[k], data.filter((p) => p.kategori.includes(k)).length)).join("");
  };

  const renderList = () => {
    const items = data.filter((p) => active === "all" || (p.kategori || []).includes(active));
    if (!items.some((p) => p.id === current)) current = items[0]?.id || null;
    listEl.innerHTML = items.map((p) => `
      <li class="work__row${p.id === current ? " is-active" : ""}">
        <button class="work__btn" data-id="${esc(p.id)}" aria-pressed="${p.id === current}">
          <span class="work__thumb" aria-hidden="true">${coverHTML(p)}</span>
          <span class="status status--${slug(p.status)}">${esc(p.status || "")}</span>
          <span class="work__name">${esc(p.judul)}</span>
          <span class="work__type">${esc(p.jenis || "")}</span>
          <span class="work__year">${esc(p.tahun || "")}</span>
          <span class="work__arrow" aria-hidden="true">${arrow}</span>
        </button>
      </li>`).join("");
    $("#workEmpty").hidden = items.length > 0;
    renderShowcase(false);
  };

  filterEl.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    active = b.dataset.filter;
    renderFilters();
    renderList();
  });

  renderFilters();
  renderList();

  /* ---------- Sorot proyek -> panel ikut berganti (desktop) ---------- */
  listEl.addEventListener("mouseover", (e) => {
    const btn = e.target.closest(".work__btn");
    if (btn && wide.matches && canHover) setCurrent(btn.dataset.id);
  });
  listEl.addEventListener("focusin", (e) => {
    const btn = e.target.closest(".work__btn");
    if (btn && wide.matches) setCurrent(btn.dataset.id);
  });

  /* ---------- Modal detail proyek ---------- */
  const modal = $("#modal");
  let lastFocus = null;

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".work__btn");
    if (!btn) return;
    const p = data.find((d) => d.id === btn.dataset.id);
    if (!p) return;

    // Desktop: tampilkan di panel. HP/tablet: buka jendela detail.
    if (wide.matches) { setCurrent(p.id); return; }

    $("#modalMeta").innerHTML =
      `<span class="status status--${slug(p.status)}">${esc(p.status || "")}</span>` +
      `<span>${esc(p.jenis || "")}</span><span>${esc(p.tahun || "")}</span>`;
    $("#modalTitle").textContent = p.judul;
    $("#modalBody").innerHTML =
      `<p>${esc(p.ringkas || "")}</p>` +
      ((p.detail || []).length ? `<ul>${p.detail.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : "") +
      ((p.tags || []).length ? `<div class="modal__tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : "");

    $("#modalLinks").innerHTML = linksHTML(p);
    lastFocus = btn;
    modal.showModal();
  });

  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", () => lastFocus && lastFocus.focus());


  $("#year").textContent = new Date().getFullYear();

  /* ---------- Grafik latar interaktif ----------
     - Ribuan titik kecil tersusun dalam grid
     - Titik di dekat kursor menyala biru terang, membesar, dan terdorong menjauh,
       lalu kembali ke tempatnya seperti pegas
     - Klik / ketuk layar = gelombang riak yang menyebar
     - Saat diam, ada gelombang cahaya pelan supaya latar tetap hidup
  -------------------------------------------------- */
  const canvas = $("#bgDots");
  const ctx = canvas.getContext("2d");
  const spot = $("#bgSpot");

  // ===== Pengaturan (boleh diubah) =====
  const CFG = {
    gap: 26,           // jarak antar titik (px). Kecil = lebih rapat
    radius: 150,       // radius pengaruh kursor
    push: 18,          // seberapa kuat titik terdorong
    baseAlpha: 0.13,   // kecerahan titik saat diam
    baseSize: 1.1,     // ukuran titik saat diam
    maxSize: 2.8,      // ukuran titik paling dekat kursor
    spring: 0.08,      // kecepatan titik kembali ke posisi
    damping: 0.82      // redaman gerak
  };

  let W = 0, H = 0, dpr = 1, dots = [], raf = null, t = 0;
  const pointer = { x: -9999, y: -9999, active: false };
  const ripples = [];

  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gap = W < 600 ? CFG.gap + 4 : CFG.gap;
    const cols = Math.ceil(W / gap) + 1;
    const rows = Math.ceil(H / gap) + 1;
    const offX = (W - (cols - 1) * gap) / 2;
    const offY = (H - (rows - 1) * gap) / 2;
    dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offX + c * gap, y = offY + r * gap;
        dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
      }
    }
    if (reduceMotion) render();
  };

  const render = () => {
    ctx.clearRect(0, 0, W, H);
    const R = CFG.radius;

    for (const d of dots) {
      let glow = 0;

      if (!reduceMotion) {
        // 1. Dorongan dari kursor
        const dx = d.x - pointer.x, dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (pointer.active && dist < R) {
          const f = 1 - dist / R;
          glow = Math.max(glow, f);
          const a = Math.atan2(dy, dx);
          d.vx += Math.cos(a) * f * CFG.push * 0.12;
          d.vy += Math.sin(a) * f * CFG.push * 0.12;
        }

        // 2. Gelombang riak dari klik
        for (const rp of ripples) {
          const rd = Math.hypot(d.ox - rp.x, d.oy - rp.y);
          const band = Math.abs(rd - rp.r);
          if (band < 40) {
            const f = (1 - band / 40) * rp.life;
            glow = Math.max(glow, f);
            const a = Math.atan2(d.oy - rp.y, d.ox - rp.x);
            d.vx += Math.cos(a) * f * 1.4;
            d.vy += Math.sin(a) * f * 1.4;
          }
        }

        // 3. Pegas kembali ke posisi awal
        d.vx += (d.ox - d.x) * CFG.spring;
        d.vy += (d.oy - d.y) * CFG.spring;
        d.vx *= CFG.damping; d.vy *= CFG.damping;
        d.x += d.vx; d.y += d.vy;
      }

      // 4. Gelombang cahaya pelan saat diam
      const ambient = reduceMotion ? 0 :
        (Math.sin(d.ox * 0.008 + d.oy * 0.006 - t * 0.9) + 1) * 0.5 * 0.14;

      const alpha = CFG.baseAlpha + ambient + glow * 0.8;
      const size = CFG.baseSize + glow * (CFG.maxSize - CFG.baseSize);

      // warna titik: krem #FCF1D3 saat diam -> biru terang #8EA3D6 saat menyala
      const rC = Math.round(252 + (142 - 252) * glow);
      const gC = Math.round(241 + (163 - 241) * glow);
      const bC = Math.round(211 + (214 - 211) * glow);
      ctx.fillStyle = `rgba(${rC}, ${gC}, ${bC}, ${Math.min(alpha, 1)})`;

      if (size < 1.6) {
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size);
      } else {
        ctx.beginPath(); ctx.arc(d.x, d.y, size / 2 + 0.3, 0, Math.PI * 2); ctx.fill();
      }
    }
  };

  const loop = () => {
    t += 1 / 60;
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 7;
      rp.life -= 0.012;
      if (rp.life <= 0) ripples.splice(i, 1);
    }
    render();
    raf = requestAnimationFrame(loop);
  };

  // Kursor & sentuhan
  const moveTo = (x, y) => {
    pointer.x = x; pointer.y = y; pointer.active = true;
    spot.style.setProperty("--x", `${x}px`);
    spot.style.setProperty("--y", `${y}px`);
    spot.classList.add("is-on");
  };
  const release = () => {
    pointer.active = false; pointer.x = pointer.y = -9999;
    spot.classList.remove("is-on");
  };

  addEventListener("pointermove", (e) => moveTo(e.clientX, e.clientY), { passive: true });
  addEventListener("pointerdown", (e) => {
    moveTo(e.clientX, e.clientY);
    if (!reduceMotion) ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", release);
  addEventListener("pointerup", (e) => { if (e.pointerType === "touch") setTimeout(release, 600); });
  addEventListener("blur", release);

  let resizeTimer;
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 150); });
  build();

  if (!reduceMotion) {
    loop();
    // hentikan animasi saat tab tidak dilihat supaya hemat baterai
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) loop();
    });
  }
})();