/* Pre-announcement version. Renders the public content.js, the tapes, the countdown,
   the week model and the label maker, then closes the rest of the site behind one padlock.
   It carries none of the code or copy of the full site: that ships only with the full build. */
(function () {
  "use strict";

  const C = window.HACKATHON || {};
  const PH = /\[[^\]]+\]/;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  const isPlaceholder = (s) => typeof s === "string" && PH.test(s);
  const isWholePlaceholder = (s) => typeof s === "string" && /^\[[^\]]+\]$/.test(s.trim());
  const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s) && !isPlaceholder(s);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // "[LOCAL A DEFINIR]" reads as "Local a definir": sentence case, in the reading face.
  const sentence = (s) => {
    const t = s.toLocaleLowerCase("pt-BR");
    return t.charAt(0).toLocaleUpperCase("pt-BR") + t.slice(1);
  };
  const phText = (inner) => sentence(inner.replace(/^RESPOSTA:\s*/i, ""));

  // Placeholders become a yellow marker inside the text, never a block of mono caps.
  function rich(s) {
    if (s == null) return "";
    return esc(s).replace(/\[([^\]]+)\]/g, (_, inner) =>
      `<mark class="ph" title="A confirmar pela organização">${esc(phText(inner))}</mark>`
    );
  }
  // Tape text: a placeholder strip shows its words without brackets.
  const tapeText = (s) => (isPlaceholder(s) ? esc(phText(s.replace(/[\[\]]/g, ""))) : esc(s));

  /* ---------- Simple fields ---------- */
  document.querySelectorAll("[data-c]").forEach((el) => {
    const v = get(el.dataset.c);
    const kind = el.dataset.tape;
    if (kind) {
      el.innerHTML = tapeText(v);
      const pending = isPlaceholder(v);
      el.classList.toggle("tape--pending", pending);
      if (!pending) el.classList.add(kind === "deadline" ? "tape--red" : "tape--black");
    } else {
      el.innerHTML = rich(v);
    }
  });

  /* ---------- Lists ---------- */
  const renderers = {
    "sobre.texto": (items) => items.map((t) => `<p>${rich(t)}</p>`).join(""),
    "sobre.motivos": (items) =>
      items.map((m) => `<li><h3 class="motive-title">${esc(m.titulo)}</h3><p>${rich(m.texto)}</p></li>`).join(""),
  };
  document.querySelectorAll("[data-list]").forEach((el) => {
    const key = el.dataset.list;
    if (renderers[key]) el.innerHTML = renderers[key](get(key) || []);
  });

  const fill = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };
  if (C.participacao) fill("[data-skills]", esc(C.participacao.habilidades.join(", ").toLocaleLowerCase("pt-BR")));

  /* ---------- The week: days 26 to 30, with the confirmed events pinned to their day ---------- */
  const reveal = C.revelacao || {};
  const weekStart = new Date((reveal.inicio || "2026-10-26T08:00:00-03:00").slice(0, 10) + "T12:00:00-03:00");
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(weekStart.getTime() + i * 86400000);
    return {
      num: d.getUTCDate(),
      name: new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: "America/Sao_Paulo" }).format(d),
      events: [],
    };
  });
  const undated = [];
  (C.cronograma || []).filter((c) => c.exibir !== false).forEach((c) => {
    const m = !isPlaceholder(c.data) && /(\d{1,2})\/10/.exec(c.data);
    const day = m && days.find((d) => d.num === Number(m[1]));
    if (day) day.events.push(c);
    else undated.push(c);
  });

  /* ---------- Team roster: required seats are punched tape, optional ones are empty slots,
     and two dimension lines mark the minimum and the maximum, like a drawing ---------- */
  const team = document.querySelector("[data-team]");
  if (team && C.participacao) {
    const { minimo, maximo } = C.participacao;
    const rows = Array.from({ length: maximo }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      const slot = i < minimo
        ? `<span class="tape tape--black tape--m crew-tape">Integrante ${i + 1}</span>`
        : `<span class="crew-empty">Opcional</span>`;
      return `<li class="crew-row${i < minimo ? "" : " crew-row--opt"}" style="grid-row:${i + 1}"><span class="crew-num" aria-hidden="true">${n}</span>${slot}</li>`;
    }).join("");
    team.innerHTML = `<ol class="crew-slots" style="grid-row:1 / ${maximo + 1}" aria-label="Equipe de ${minimo} a ${maximo} integrantes: ${minimo} obrigatórios e ${maximo - minimo} opcionais">${rows}</ol>
      <span class="crew-dim crew-dim--min" style="grid-row:1 / ${minimo + 1}" aria-hidden="true"><span>mín. ${minimo}</span></span>
      <span class="crew-dim crew-dim--max" style="grid-row:1 / ${maximo + 1}" aria-hidden="true"><span>máx. ${maximo}</span></span>`;
  }

  /* ---------- Tape construction: every .tape gets a vinyl body and a raised face ---------- */
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    return (h >>> 0) / 4294967295;
  }
  function tapeify(tape) {
    if (tape.querySelector(":scope > .tape-body")) return;
    const body = document.createElement("span");
    body.className = "tape-body";
    const face = document.createElement("span");
    face.className = "tape-face";
    while (tape.firstChild) face.appendChild(tape.firstChild);
    body.appendChild(face);
    if (tape.classList.contains("tape--pending") && !tape.classList.contains("tape--s")) {
      body.insertAdjacentHTML("beforeend", '<span class="tape-note">a confirmar</span>');
    }
    tape.appendChild(body);
    tape.classList.add("is-built");
    const h = hash(tape.textContent);
    tape.style.setProperty("--cut-l", (0.06 + h * 0.3).toFixed(2) + "em");
    tape.style.setProperty("--cut-r", (0.06 + ((h * 7) % 1) * 0.3).toFixed(2) + "em");
  }
  const faceOf = (tape) => tape.querySelector(".tape-face") || tape;
  document.querySelectorAll(".tape").forEach(tapeify);

  /* ---------- Headlines: words wrapped so they can rise; the text itself is untouched ---------- */
  document.querySelectorAll("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="w"><span>${esc(w)}</span></span>`).join(" ");
  });

  /* ---------- Countdown to the theme reveal (fixed instants, Brasília time) ---------- */
  const revealStart = Date.parse(reveal.inicio);
  const revealEnd = Date.parse(reveal.fim);
  const boxes = [...document.querySelectorAll("[data-countdown]")];
  const cdStatus = document.querySelector("[data-reveal-status]");
  const miniWrap = document.querySelector("[data-countdown-wrap]");
  const miniLabel = document.querySelector("[data-reveal-mini]");
  const themeTape = document.querySelector("[data-theme-tape]");
  const revealTitle = document.querySelector("[data-reveal-title]");
  const pad = (n) => String(n).padStart(2, "0");
  let cdTimer = null;
  function setThemeTape(text, color) {
    if (!themeTape) return;
    themeTape.classList.remove("tape--red", "tape--black", "tape--white");
    themeTape.classList.add(color);
    const face = faceOf(themeTape);
    face.textContent = text;
    delete face.dataset.split;
  }
  function setTitle(text) {
    if (!revealTitle) return;
    revealTitle.innerHTML = text.split(" ").map((w) => `<span class="w"><span>${esc(w)}</span></span>`).join(" ");
  }
  function tickReveal() {
    if (Number.isNaN(revealStart)) return;
    const now = Date.now();
    if (now < revealStart) {
      let left = Math.floor((revealStart - now) / 1000);
      const d = Math.floor(left / 86400); left -= d * 86400;
      const h = Math.floor(left / 3600); left -= h * 3600;
      const m = Math.floor(left / 60);
      const sec = left - m * 60;
      const vals = { d, h, m, s: sec };
      boxes.forEach((box) => {
        for (const k of ["d", "h", "m", "s"]) {
          const cell = box.querySelector(`[data-cd="${k}"]`);
          if (!cell) continue;
          const face = faceOf(cell);
          const next = pad(vals[k]);
          if (face.textContent !== next) {
            face.textContent = next;
            if (window.gsap && !reduceMotion.matches && k !== "s") gsap.fromTo(face, { scale: 1.25 }, { scale: 1, duration: 0.3, ease: "back.out(3)" });
          }
        }
      });
      return;
    }
    clearInterval(cdTimer);
    boxes.forEach((b) => (b.hidden = true));
    if (miniWrap) miniWrap.dataset.state = "over";
    if (now < revealEnd) {
      setTitle("A revelação é agora.");
      if (cdStatus) cdStatus.textContent = "A abertura está acontecendo neste momento.";
      if (miniLabel) miniLabel.textContent = "A revelação do tema é agora";
      setThemeTape("Revelando agora", "tape--red");
    } else {
      setTitle("O tema já foi revelado.");
      if (cdStatus) cdStatus.textContent = "O tema foi revelado na abertura. O restante do site será publicado pela organização em breve.";
      if (miniLabel) miniLabel.textContent = "O tema já foi revelado";
      setThemeTape("Revelado em 26/10", "tape--white");
    }
    const lockedTitle = document.querySelector(".locked-title");
    if (lockedTitle && !lockedTitle.dataset.after) {
      lockedTitle.dataset.after = "1";
      lockedTitle.innerHTML = "O restante será publicado em breve.".split(" ").map((w) => `<span class="w"><span>${esc(w)}</span></span>`).join(" ");
    }
  }
  tickReveal();
  if (!boxes.every((b) => b.hidden)) cdTimer = setInterval(tickReveal, 1000);

  /* ---------- Masthead: progress ruler, active section ---------- */
  const rulerFill = document.querySelector("[data-ruler]");
  let rulerQueued = false;
  function updateRuler() {
    rulerQueued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    rulerFill.style.setProperty("--p", max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
  }
  addEventListener("scroll", () => { if (!rulerQueued) { rulerQueued = true; requestAnimationFrame(updateRuler); } }, { passive: true });
  updateRuler();

  const navLinks = [...document.querySelectorAll(".nav-list a, .toc a")];
  const linksById = new Map();
  navLinks.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    if (!linksById.has(id)) linksById.set(id, []);
    linksById.get(id).push(a);
  });
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const group = en.target.classList.contains("rule") ? ".toc a" : ".nav-list a";
        document.querySelectorAll(group).forEach((a) => a.removeAttribute("aria-current"));
        (linksById.get(en.target.id) || []).forEach((a) => a.setAttribute("aria-current", "true"));
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  document.querySelectorAll("main > section[id], .rule[id]").forEach((s) => sectionObserver.observe(s));

  /* ---------- Mobile menu ---------- */
  const menu = document.getElementById("menu");
  const toggle = document.querySelector(".menu-toggle");
  const closeBtn = menu.querySelector(".menu-close");
  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) menu.querySelector("a").focus();
    else toggle.focus();
  }
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  closeBtn.addEventListener("click", () => setMenu(false));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a[href]")) {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
    if (e.key === "Tab" && !menu.hidden) {
      const f = [...menu.querySelectorAll("a[href], button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  matchMedia("(min-width: 1241px)").addEventListener("change", (m) => { if (m.matches && !menu.hidden) setMenu(false); });

  /* ---------- Fig. 1: the week model. SVG drawing first; WebGL replaces it where it can ---------- */
  const modelData = days.map((d) => {
    const ev = d.events[0];
    const kind = !ev ? "empty" : ev.marco ? "deadline" : /apresenta/i.test(ev.titulo) ? "final" : "dated";
    return {
      num: d.num,
      short: d.name.slice(0, 3).replace(/^./, (c) => c.toUpperCase()),
      kind,
      date: ev ? `${d.name.slice(0, 3).replace(/^./, (c) => c.toUpperCase())} ${d.num}/10${ev.hora ? " · " + ev.hora : ""}` : "",
      title: ev ? (ev.marco ? "Inscrições encerram" : /apresenta/i.test(ev.titulo) ? "Pitch final" : ev.titulo) : "",
    };
  });
  const stage = document.querySelector("[data-model-stage]");
  function drawModelSvg() {
    // Isometric drawing of the same five volumes; dated days solid, the rest dashed wireframe.
    const W = 640, H = 560, s = 44;
    const cx = 290, cy = 350;
    const iso = (x, y, z) => [cx + (x - z) * Math.cos(Math.PI / 6) * s, cy + (x + z) * Math.sin(Math.PI / 6) * s - y * s];
    const heights = { empty: 0.7, dated: 2.4, deadline: 3.2, final: 4 };
    const fills = { dated: ["#2b2d30", "#161718", "#0d0e0f"], deadline: ["#e0393d", "#cd191e", "#a51216"], final: ["#2c9a45", "#1f7f33", "#16632a"] };
    let grid = "";
    for (let i = -3; i <= 3; i++) {
      const a = iso(i * 1.2, 0, -5), b = iso(i * 1.2, 0, 5);
      const c = iso(-5, 0, i * 1.2), d = iso(5, 0, i * 1.2);
      grid += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/><line x1="${c[0]}" y1="${c[1]}" x2="${d[0]}" y2="${d[1]}"/>`;
    }
    const vols = modelData.map((m, i) => {
      const x = (i - 2) * 1.55 - 0.5, z = (i - 2) * -0.4 - 0.5, w = 1, h = heights[m.kind];
      const P = (dx, dy, dz) => iso(x + dx, dy, z + dz).map((v) => v.toFixed(1)).join(",");
      const top = [P(0, h, 0), P(w, h, 0), P(w, h, w), P(0, h, w)].join(" ");
      const left = [P(0, 0, w), P(w, 0, w), P(w, h, w), P(0, h, w)].join(" ");
      const right = [P(w, 0, 0), P(w, 0, w), P(w, h, w), P(w, h, 0)].join(" ");
      const label = iso(x + w / 2, 0, z + w + 0.7);
      const day = `<text class="svg-day" x="${label[0].toFixed(1)}" y="${label[1].toFixed(1)}">${esc(m.short.toUpperCase())} ${m.num}</text>`;
      if (m.kind === "empty") {
        return `<g class="svg-wire"><polygon points="${top}"/><polygon points="${left}"/><polygon points="${right}"/></g>${day}`;
      }
      const f = fills[m.kind];
      return `<g class="svg-solid"><polygon points="${right}" fill="${f[2]}"/><polygon points="${left}" fill="${f[1]}"/><polygon points="${top}" fill="${f[0]}"/></g>${day}`;
    });
    const labels = modelData
      .map((m, i) => {
        if (m.kind === "empty") return "";
        const x = (i - 2) * 1.55 - 0.5, z = (i - 2) * -0.4 - 0.5;
        const p = iso(x + 0.5, heights[m.kind] + 0.25, z + 0.5);
        // Labels fan upward from left to right, like the WebGL version, so they never collide.
        const lift = { dated: 112, deadline: 62, final: 18 }[m.kind];
        const lx = p[0], ly = p[1] - lift;
        const color = m.kind === "deadline" ? "#cd191e" : m.kind === "final" ? "#1f7f33" : "#17181a";
        return `<g class="svg-label"><line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}" stroke="${color}"/>
          <text x="${(lx + 6).toFixed(1)}" y="${(ly - 16).toFixed(1)}" class="svg-l-date" fill="${color}">${esc(m.date)}</text>
          <text x="${(lx + 6).toFixed(1)}" y="${(ly + 4).toFixed(1)}" class="svg-l-title">${esc(m.title)}</text></g>`;
      })
      .join("");
    const vb = matchMedia("(max-width: 600px)").matches ? `0 175 ${W} 380` : `0 0 ${W} ${H}`;
    stage.innerHTML = `<svg class="model-svg" viewBox="${vb}" role="img" aria-label="Maquete da semana: segunda 26 revelação do tema; quarta 28 encerramento das inscrições às 23h59; sexta 30 pitch final.">
      <g class="svg-grid">${grid}</g>${vols.join("")}${labels}</svg>`;
  }
  drawModelSvg();
  // On phones the drawing is too small for its labels: the same three facts follow it as a legend.
  const legend = document.createElement("ul");
  legend.className = "model-legend";
  legend.innerHTML = modelData
    .filter((m) => m.kind !== "empty")
    .map((m) => `<li class="ml-${m.kind}"><span class="ml-date">${esc(m.date)}</span><span class="ml-title">${esc(m.title)}</span></li>`)
    .join("");
  stage.after(legend);

  // Every screen that can draw WebGL gets the 3D model; the SVG drawing stays only where it cannot.
  const wantsWebGL = () => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch { return false; }
  };
  if (wantsWebGL()) {
    const load = () =>
      import("./model.js")
        .then((mod) => mod.mountWeekModel(stage, modelData, { still: reduceMotion.matches }))
        .catch(() => { /* keep the SVG drawing */ });
    if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 1500 });
    else setTimeout(load, 300);
  }

  /* ---------- Punch helper ---------- */
  const jitter = (c, i) => ((hash(c + i) - 0.5) * 0.05).toFixed(3) + "em";
  const punchRun = (text) =>
    `<span class="ch-run" aria-hidden="true">${[...text]
      .map((c, i) => (c === " " ? " " : `<span class="ch" style="translate:0 ${jitter(c, i)}">${esc(c)}</span>`))
      .join("")}</span>`;
  function splitChars(el) {
    el = faceOf(el);
    if (el.dataset.split) return [...el.querySelectorAll(".ch")];
    const text = el.textContent;
    el.dataset.split = "1";
    el.setAttribute("aria-label", text.trim());
    el.innerHTML = punchRun(text);
    return [...el.querySelectorAll(".ch")];
  }

  /* ---------- The rest of the site: one closed padlock and nothing behind the glass ---------- */
  const locked = document.querySelector("[data-locked]");
  const padlock = document.querySelector("[data-padlock]");
  const hint = document.querySelector("[data-locked-hint]");
  const motionOK = () => !!window.gsap && !reduceMotion.matches;
  // Two label-maker bands cross the dark: the same strip twice, so the run loops without a seam.
  document.querySelectorAll("[data-band]").forEach((band) => {
    const strip = Array.from({ length: 6 }, () => '<span class="tape tape--yellow tape--m">Trancado até 26.10</span>').join("");
    band.innerHTML = strip + strip;
    band.querySelectorAll(".tape").forEach(tapeify);
  });
  if (padlock) {
    const tilt = padlock.querySelector(".padlock-tilt");
    const ring = padlock.querySelector(".padlock-ring");
    const shackle = padlock.querySelector(".padlock-shackle");
    const HOLD = 1.6;
    const replies = [
      "Ainda não. Só na segunda-feira, 26.10.",
      "Trancado de verdade. Volte na segunda.",
      "Nem com força. Segunda-feira, das 8h às 9h30.",
    ];
    let tries = 0;
    let holding = false;
    let lastTry = 0;
    let hold = null;
    let tremble = null;

    // Every try ends the same way: the shackle snaps home and the lock answers.
    function refuse() {
      hint.textContent = replies[tries++ % replies.length];
      if (!motionOK()) return;
      gsap.timeline()
        .to(shackle, { y: 0, duration: 0.7, ease: "elastic.out(1.1, 0.3)" }, 0)
        .to(ring, { attr: { "stroke-dashoffset": 1 }, duration: 0.5, ease: "power2.out" }, 0)
        .to(tilt, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" }, 0)
        .fromTo(tilt, { x: 0 }, { keyframes: { x: [-12, 10, -7, 5, -2, 0] }, duration: 0.5, ease: "none" }, 0)
        .fromTo(hint, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.05);
    }
    function startHold() {
      if (holding) return;
      holding = true;
      padlock.classList.add("is-holding");
      if (!motionOK()) return;
      // Holding pulls on the shackle; the ring fills like a dial that never reaches the number.
      hold = gsap.timeline({ onComplete: endHold })
        .to(ring, { attr: { "stroke-dashoffset": 0 }, duration: HOLD, ease: "none" }, 0)
        .to(shackle, { y: -16, duration: HOLD, ease: "power1.in" }, 0)
        .to(tilt, { scale: 0.96, duration: HOLD, ease: "power2.out" }, 0);
      tremble = gsap.to(padlock.querySelector(".padlock-svg"), { x: 1.4, duration: 0.05, repeat: -1, yoyo: true, ease: "none" });
    }
    function endHold() {
      if (!holding) return;
      holding = false;
      lastTry = performance.now();
      padlock.classList.remove("is-holding");
      if (hold) { hold.kill(); hold = null; }
      if (tremble) { tremble.kill(); tremble = null; gsap.set(padlock.querySelector(".padlock-svg"), { x: 0 }); }
      refuse();
    }
    padlock.addEventListener("pointerdown", (e) => { if (e.button === 0) { padlock.setPointerCapture(e.pointerId); startHold(); } });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((t) => padlock.addEventListener(t, endHold));
    padlock.addEventListener("keydown", (e) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); startHold(); }
    });
    padlock.addEventListener("keyup", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); endHold(); } });
    padlock.addEventListener("blur", endHold);
    // Screen readers activate with a plain click: answer that too.
    padlock.addEventListener("click", () => { if (performance.now() - lastTry > 500) refuse(); });
    padlock.addEventListener("contextmenu", (e) => e.preventDefault());

    // The padlock and the glass behind it follow the pointer, each at its own depth.
    if (motionOK() && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const q = (el, prop, d) => gsap.quickTo(el, prop, { duration: d, ease: "power3.out" });
      const rx = q(tilt, "rotationX", 0.9), ry = q(tilt, "rotationY", 0.9);
      const ghost = locked.querySelector(".locked-ghost");
      const gx = q(ghost, "x", 1.6), gy = q(ghost, "y", 1.6);
      const glint = padlock.querySelector(".padlock-glint");
      const sx = q(glint, "x", 0.9);
      locked.addEventListener("pointermove", (e) => {
        const r = locked.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 26); rx(-py * 20); gx(-px * 50); gy(-py * 36); sx(120 + px * 160);
      });
      locked.addEventListener("pointerleave", () => { rx(0); ry(0); gx(0); gy(0); sx(120); });
    }
  }

  /* ---------- Motion ---------- */
  function startMotion() {
    const root = document.documentElement;
    if (!window.gsap || reduceMotion.matches) { root.classList.remove("motion"); return; }
    gsap.registerPlugin(ScrollTrigger);

    const narrow = matchMedia("(max-width: 600px)").matches;
    const segs = [...document.querySelectorAll(".hero-seg")];
    const chars = segs.flatMap((sg) => splitChars(sg.querySelector(".tape-face")));
    const strip = document.querySelector(".hero-strip");

    // Entrance: the tape feeds out, the letters punch in order, then the sheet fills in.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onStart: () => root.classList.remove("motion") });
    gsap.set(chars, { opacity: 0 });
    if (narrow) {
      gsap.set(segs, { clipPath: "inset(0 100% 0 0)" });
      tl.to(segs, { clipPath: "inset(0 0% 0 0)", duration: 0.4, stagger: 0.3, ease: "power2.inOut" }, 0);
    } else {
      gsap.set(strip, { clipPath: "inset(0 100% 0 0)" });
      tl.to(strip, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" }, 0);
    }
    tl.fromTo(chars, { opacity: 0, scale: 1.35, y: -4 }, { opacity: 1, scale: 1, y: 0, duration: 0.16, stagger: 0.045, ease: "back.out(3)" }, 0.1)
      .fromTo(".hero-meta", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 0.05)
      .fromTo(".hero-statement .w > span", { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.05 }, "-=0.3")
      .fromTo(".hero-lede, .hero-actions, .mini-countdown", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, "-=0.45")
      .add(() => gsap.set([strip, ...segs], { clearProps: "clipPath" }));

    // Headlines rise word by word as their section arrives.
    gsap.utils.toArray(".h2 [data-words], .h2[data-words]").forEach((h) => {
      gsap.from(h.querySelectorAll(".w > span"), {
        yPercent: 110, duration: 0.8, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: h, start: "top 88%", once: true },
      });
    });
    gsap.utils.toArray(".chap").forEach((c) => {
      gsap.from(c, { y: -14, rotate: -10, opacity: 0, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: c, start: "top 90%", once: true } });
    });

    // Problem → idea → solution: the arrows draw, the steps follow.
    gsap.utils.toArray(".flow [data-draw]").forEach((p, i) => {
      const len = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, duration: 0.9, delay: i * 0.25, ease: "power2.inOut",
        scrollTrigger: { trigger: ".flow", start: "top 75%", once: true },
      });
    });
    gsap.from(".flow-step", { opacity: 0, y: 16, duration: 0.6, stagger: 0.3, ease: "power3.out", scrollTrigger: { trigger: ".flow", start: "top 75%", once: true } });


    // The roster fills seat by seat, then the dimension lines draw the minimum and the maximum.
    gsap.from(".crew-row", { x: -24, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".crew-board", start: "top 80%", once: true } });
    gsap.from(".crew-dim", { scaleY: 0, transformOrigin: "50% 0%", duration: 0.7, stagger: 0.2, delay: 0.35, ease: "power2.inOut", scrollTrigger: { trigger: ".crew-board", start: "top 80%", once: true } });

    // Into the locked part: the padlock drops onto the bench.
    gsap.from(".padlock", { y: -140, rotate: -10, opacity: 0, duration: 1.1, ease: "bounce.out", scrollTrigger: { trigger: "#trancado", start: "top 55%", once: true } });
    gsap.from(".padlock-tag", { scale: 1.6, opacity: 0, rotate: 30, duration: 0.5, delay: 0.9, ease: "back.out(2.4)", scrollTrigger: { trigger: "#trancado", start: "top 55%", once: true } });
    gsap.from(".locked-title .w > span", { yPercent: 110, duration: 0.8, stagger: 0.06, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: "#trancado", start: "top 55%", once: true } });
    gsap.from(".locked-kicker, .locked-date, .locked-hint", { opacity: 0, y: 12, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out", scrollTrigger: { trigger: "#trancado", start: "top 55%", once: true } });
    gsap.from(".locked-band--1", { xPercent: -30, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "#trancado", start: "top 70%", once: true } });
    gsap.from(".locked-band--2", { xPercent: 30, opacity: 0, duration: 1.2, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: "#trancado", start: "top 70%", once: true } });
    // The glint sweeps once when the padlock lands.
    gsap.fromTo(".padlock-glint", { x: -60 }, { x: 300, duration: 1.1, delay: 1.1, ease: "power2.inOut", scrollTrigger: { trigger: "#trancado", start: "top 55%", once: true }, onComplete: () => gsap.set(".padlock-glint", { x: 120 }) });

    addEventListener("load", () => ScrollTrigger.refresh());
  }
  if (document.readyState === "complete" || document.readyState === "interactive") startMotion();
  else addEventListener("DOMContentLoaded", startMotion);
})();
