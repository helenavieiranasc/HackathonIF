/* Renders content.js into the page and runs the tape motion.
   Every fact on the page comes from window.HACKATHON. */
(function () {
  "use strict";

  const C = window.HACKATHON || {};
  const PH = /\[[^\]]+\]/;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  const isPlaceholder = (s) => typeof s === "string" && PH.test(s);
  const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s) && !isPlaceholder(s);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // Wrap each [MARCADOR] in a yellow-tape <mark> so pending facts read as state, not as finished copy.
  function rich(s, size = "s", inline = false) {
    if (s == null) return "";
    if (!inline && /^\[[^\]]+\]$/.test(String(s).trim())) {
      return `<span class="tape tape--pending tape--${size}">${esc(String(s).trim().slice(1, -1))}</span>`;
    }
    return esc(s).replace(/\[([^\]]+)\]/g, (_, inner) =>
      `<mark class="ph" title="A confirmar pela organização">${inner}</mark>`
    );
  }

  // A tape whose whole text is a placeholder becomes yellow pending tape with plain words.
  function tapeText(s) {
    return isPlaceholder(s) ? esc(s.replace(/[\[\]]/g, "")) : esc(s);
  }

  function pendingTag(confirmed) {
    return confirmed ? "" : `<span class="tape tape--yellow tape--s qa-status">Resposta pendente</span>`;
  }

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
      el.innerHTML = rich(v, el.dataset.size, "inline" in el.dataset);
    }
  });

  /* ---------- Lists ---------- */
  const renderers = {
    "sobre.texto": (items) => items.map((t) => `<p>${rich(t, "s", true)}</p>`).join(""),

    "sobre.motivos": (items) =>
      items
        .map(
          (m) => `<li>
            <h3 class="motive-title"><span class="tape tape--black tape--s">${esc(m.titulo)}</span></h3>
            <p>${rich(m.texto, "s", true)}</p>
          </li>`
        )
        .join(""),

    "participacao.habilidades": (items) =>
      items.map((h) => `<li><span class="tape tape--white tape--s">${esc(h)}</span></li>`).join(""),

    "revelacao.pauta": (items) => items.map((t) => `<li>${rich(t, "s", true)}</li>`).join(""),

    "ia.frases": (items) => items.map((t) => `<span class="ai-line">${esc(t)}</span>`).join(""),
    "ia.texto": (items) => items.map((t) => `<p>${rich(t, "s", true)}</p>`).join(""),
    "ia.usos": (items) => items.map((t) => `<li><span class="tape tape--white tape--s">${esc(t)}</span></li>`).join(""),
    "projeto.formatos": (items) => items.map((t) => `<li><span class="tape tape--black tape--s">${esc(t)}</span></li>`).join(""),
    "projeto.regras": (items) => items.map((t) => `<li>${rich(t, "s", true)}</li>`).join(""),

    etapas: (items) =>
      items
        .map(
          (e, i) => `<li class="control" id="etapa-${esc(e.id)}">
            <span class="control-num" aria-hidden="true">${i + 1}</span>
            <h3 class="control-title"><span class="sr-only">Etapa ${i + 1}: </span><span class="tape tape--black tape--s">${esc(e.titulo)}</span></h3>
            <p>${rich(e.texto, "s", true)}</p>
            ${e.detalhe ? `<p class="control-detail">${rich(e.detalhe)}</p>` : ""}
          </li>`
        )
        .join(""),

    cronograma: (items) =>
      items
        .filter((c) => c.exibir !== false)
        .map((c) => {
          const pending = isPlaceholder(c.data);
          const tapeClass = pending ? "tape--pending" : c.marco ? "tape--red" : "tape--black";
          return `<li class="slot${c.marco ? " slot--deadline" : ""}">
            <span class="slot-date"><span class="tape tape--s ${tapeClass}">${tapeText(c.data)}</span></span>
            <span class="slot-title">${esc(c.titulo)}${c.marco ? ' <span class="tape tape--red tape--s slot-deadline">Prazo</span>' : ""}${c.local ? `<small>${rich(c.local, "s", true)}</small>` : ""}</span>
            <span class="slot-time">${c.hora ? rich(c.hora, "s", true) : ""}</span>
          </li>`;
        })
        .join(""),

    "pitch.mostrar": (items) =>
      items.map((m) => `<li><strong>${esc(m.titulo)}</strong> ${rich(m.texto, "s", true)}</li>`).join(""),

    "pitch.star": (items) =>
      items
        .map(
          (s) => `<li class="star-step">
            <span class="tape tape--black tape--l star-letter" aria-hidden="true">${esc(s.letra)}</span>
            <span class="star-text"><strong>${esc(s.nome)}</strong> ${rich(s.texto, "s", true)}</span>
          </li>`
        )
        .join(""),

    "avaliacao.criterios": (items) =>
      items.map((c, i) => `<li><span class="crit-num" aria-hidden="true">${i + 1}</span>${rich(c)}</li>`).join(""),

    // The confirmed judge is printed on black tape; pending seats stay yellow, smaller and grouped.
    "avaliacao.banca": (items) =>
      items
        .map((n) =>
          isPlaceholder(n)
            ? `<li class="panel-pending">${rich(n)}</li>`
            : `<li class="panel-confirmed"><span class="tape tape--black tape--m">${esc(n)}</span></li>`
        )
        .join(""),

    "avaliacao.premios": (items) =>
      items
        .map(
          (p, i) => `<li class="award award--${i + 1}">
            <span class="tape tape--black tape--l award-place">${esc(p.lugar)}</span>
            <span class="award-items">
              ${p.medalha ? '<span class="tape tape--green tape--s">Medalha</span>' : ""}
              <span class="award-plus" aria-hidden="true">+</span>
              ${rich(p.premio)}
            </span>
          </li>`
        )
        .join(""),

    faq: (items) =>
      items
        .map(
          (q) => `<details class="qa">
            <summary><span class="qa-q">${esc(q.pergunta)}${pendingTag(q.confirmado && !/^\[[^\]]+\]$/.test(q.resposta.trim()))}</span><span class="qa-mark" aria-hidden="true"><svg class="icon"><use href="#i-plus"/></svg></span></summary>
            <div class="qa-a"><p>${rich(q.resposta)}</p></div>
          </details>`
        )
        .join(""),

    "regulamento.secoes": (items) =>
      items
        .map(
          (s, i) => `<li class="rule" id="regra-${esc(s.id)}">
            <h3 class="rule-title"><span class="rule-num">${i + 1}.</span><span>${esc(s.titulo)}</span>
              <a class="rule-anchor" href="#regra-${esc(s.id)}" aria-label="Link direto para a regra ${i + 1}"><svg class="icon" aria-hidden="true"><use href="#i-link"/></svg></a></h3>
            <ul>${s.itens
              .map((t) =>
                typeof t === "string"
                  ? `<li>${rich(t, "s", true)}</li>`
                  : `<li class="rule-field"><strong>${esc(t.rotulo)}:</strong> ${rich(t.valor)}</li>`
              )
              .join("")}</ul>
          </li>`
        )
        .join(""),

    "contato.redes": (items) =>
      items.length
        ? items.map((r) => `<li><a class="tape tape--blue tape--s" href="${esc(r.url)}" rel="noopener">${esc(r.nome)}</a></li>`).join("")
        : `<li>${rich("[REDES SOCIAIS A DEFINIR]")}</li>`,
  };

  document.querySelectorAll("[data-list]").forEach((el) => {
    const key = el.dataset.list;
    const items = get(key) || [];
    if (renderers[key]) el.innerHTML = renderers[key](items);
  });


  /* ---------- Team slots: the required seats are punched, the optional ones are blank tape ---------- */
  const team = document.querySelector("[data-team]");
  if (team && C.participacao) {
    const { minimo, maximo } = C.participacao;
    team.innerHTML = Array.from({ length: maximo }, (_, i) =>
      i < minimo
        ? `<li><span class="tape tape--black tape--s">Integrante ${i + 1}</span></li>`
        : `<li class="slot-optional"><span class="tape tape--blank tape--s">Opcional ${i + 1}</span></li>`
    ).join("");
  }

  /* ---------- Theme reveal: countdown to the opening, then the revealed state ---------- */
  const reveal = C.revelacao || {};
  const revealStart = Date.parse(reveal.inicio);
  const revealEnd = Date.parse(reveal.fim);
  const cdBox = document.querySelector("[data-countdown]");
  const cdStatus = document.querySelector("[data-reveal-status]");
  const themeTape = document.querySelector("[data-theme-tape]");
  const revealTitle = document.querySelector("[data-reveal-title]");
  const pad = (n) => String(n).padStart(2, "0");
  let cdTimer = null;
  function setThemeTape(text, color) {
    if (!themeTape) return;
    themeTape.classList.remove("tape--red", "tape--black", "tape--white");
    themeTape.classList.add(color);
    const face = themeTape.querySelector(".tape-face") || themeTape;
    face.textContent = text;
    delete face.dataset.split;
  }
  function tickReveal() {
    if (!cdBox || Number.isNaN(revealStart)) return;
    const now = Date.now();
    if (now < revealStart) {
      let left = Math.floor((revealStart - now) / 1000);
      const d = Math.floor(left / 86400); left -= d * 86400;
      const h = Math.floor(left / 3600); left -= h * 3600;
      const m = Math.floor(left / 60);
      const sec = left - m * 60;
      for (const [k, v] of [["d", d], ["h", h], ["m", m], ["s", sec]]) {
        const cell = cdBox.querySelector(`[data-cd="${k}"]`);
        const face = cell.querySelector(".tape-face") || cell;
        if (face.textContent !== pad(v)) face.textContent = pad(v);
      }
      return;
    }
    clearInterval(cdTimer);
    cdBox.hidden = true;
    if (now < revealEnd) {
      revealTitle.textContent = "A revelação é agora.";
      cdStatus.textContent = "A abertura está acontecendo neste momento.";
      setThemeTape("Revelando agora", "tape--red");
    } else if (reveal.tema && reveal.tema.trim()) {
      revealTitle.textContent = "O tema foi revelado.";
      cdStatus.textContent = `Revelado na abertura de ${reveal.dia.toLowerCase()}.`;
      setThemeTape(reveal.tema.trim(), "tape--black");
    } else {
      revealTitle.textContent = "O tema já foi revelado na abertura.";
      cdStatus.textContent = `A revelação aconteceu em ${reveal.dia.toLowerCase()}.`;
      setThemeTape("Revelado em 26/10", "tape--white");
    }
  }

  /* ---------- Status lines that depend on confirmation ---------- */
  if (C.regulamento && C.regulamento.oficialConfirmado) {
    const flag = document.querySelector('[data-status="regulamento"]');
    if (flag) flag.hidden = true;
  }

  /* ---------- Links: real URLs go out, placeholders stay on the page and say why ---------- */
  document.querySelectorAll("[data-link]").forEach((a) => {
    const key = a.dataset.link;
    const url = C.links && C.links[key];
    if (isUrl(url)) {
      a.href = url;
      if (!url.includes(location.host)) {
        a.target = "_blank";
        a.rel = "noopener";
        if (!a.querySelector(".sr-only")) a.insertAdjacentHTML("beforeend", '<span class="sr-only"> (abre em nova aba)</span>');
      }
      return;
    }
    // Placeholder URL
    if (key === "inscricao") {
      const note = document.querySelector('[data-link-note="inscricao"]');
      if (note) note.hidden = false;
      const label = a.dataset.pendingLabel || "Como se inscrever";
      if (a.closest("#participe")) {
        // In the registration block itself: a disabled form strip plus "em breve".
        a.setAttribute("aria-disabled", "true");
        a.removeAttribute("href");
        a.setAttribute("role", "link");
        a.setAttribute("aria-describedby", "nota-inscricao");
        a.classList.remove("tape--green");
        a.classList.add("tape--muted");
        a.innerHTML = esc(label);
        a.insertAdjacentHTML("afterend", ' <span class="tape tape--pending tape--l" aria-hidden="true">Em breve</span>');
      } else {
        // Elsewhere: lead to the registration block, never to a fake form.
        a.href = "#participe";
        const icon = a.querySelector(".icon");
        a.textContent = label + " ";
        if (icon) a.appendChild(icon);
      }
    } else if (a.classList.contains("tape")) {
      const name = a.textContent.trim();
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("href");
      a.setAttribute("role", "link");
      a.setAttribute("aria-label", `${name}: ainda não publicado`);
      a.classList.remove("tape--blue");
      a.classList.add("tape--muted");
      a.innerHTML = esc(name);
      a.insertAdjacentHTML("afterend", ' <span class="tape tape--pending tape--s" aria-hidden="true">Em breve</span>');
    } else {
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("href");
      a.title = "Link ainda não publicado";
      a.insertAdjacentHTML("beforeend", ' <mark class="ph">em breve</mark>');
    }
  });

  /* ---------- Tape construction: every .tape gets a vinyl body and a raised face ---------- */
  // Small stable hash so each strip gets its own scissor cut, the same on every visit.
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

  // A heading strip that is wider than its column is punched as two or three strips, never wrapped.
  function fitTitles() {
    document.querySelectorAll(".section-title, .control-title").forEach((h) => {
      const first = h.querySelector(".tape");
      if (!h.dataset.text) {
        h.dataset.text = first.textContent.trim();
        h.dataset.cls = first.className;
        h.dataset.stick = first.hasAttribute("data-stick") ? "1" : "";
        const sr = h.querySelector(".sr-only");
        h.dataset.sr = sr ? sr.textContent : "";
      }
      const words = h.dataset.text.split(" ");
      const build = (lines) => {
        h.innerHTML = `<span class="sr-only">${esc(h.dataset.sr + h.dataset.text)}</span>` + lines
          .map((l) => `<span class="${h.dataset.cls}" aria-hidden="true"${h.dataset.stick ? " data-stick" : ""}>${esc(l)}</span>`)
          .join("");
        h.querySelectorAll(".tape").forEach(tapeify);
      };
      build([h.dataset.text]);
      const avail = h.clientWidth;
      for (let n = 2; n <= Math.min(3, words.length); n++) {
        if (h.querySelector(".tape").getBoundingClientRect().width <= avail) break;
        const per = Math.ceil(words.length / n);
        const lines = [];
        for (let i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(" "));
        build(lines);
      }
    });
  }
  fitTitles();
  tickReveal();
  if (cdBox && !cdBox.hidden) cdTimer = setInterval(tickReveal, 1000);
  let titleTimer;
  addEventListener("resize", () => { clearTimeout(titleTimer); titleTimer = setTimeout(fitTitles, 150); });
  if (document.fonts) document.fonts.ready.then(fitTitles);

  /* ---------- Masthead state + active section ---------- */
  const masthead = document.querySelector("[data-masthead]");
  const onScroll = () => masthead.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  const navLinks = [...document.querySelectorAll(".nav-list a")];
  const byId = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.removeAttribute("aria-current"));
        const link = byId.get(en.target.id);
        if (link) link.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main > section[id]").forEach((s) => sectionObserver.observe(s));

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
    if (e.target.closest("a")) {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
    // keep Tab inside the open menu
    if (e.key === "Tab" && !menu.hidden) {
      const f = [...menu.querySelectorAll("a, button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  matchMedia("(min-width: 1241px)").addEventListener("change", (m) => { if (m.matches && !menu.hidden) setMenu(false); });

  /* ---------- Course line: straight legs between controls, edge to edge ---------- */
  const course = document.querySelector(".course");
  const courseSvg = course.querySelector(".course-line");
  let coursePath = null;
  function drawCourse() {
    const box = course.getBoundingClientRect();
    const nums = [...course.querySelectorAll(".control-num")].map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, r: r.width / 2 + 6 };
    });
    const stacked = matchMedia("(max-width: 600px)").matches;
    let d = "";
    for (let i = 0; i < nums.length - 1; i++) {
      const a = nums[i], b = nums[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
      // A row change in the same column would cut through the step's text:
      // run that leg out along the page margin instead.
      if (!stacked && Math.abs(dx) < a.r && Math.abs(dy) > a.r * 2) {
        const right = a.x > box.width / 2;
        const edge = right ? box.width + 20 : -20;
        const k = right ? 1 : -1, c = 14;
        d += `M${(a.x + k * a.r).toFixed(1)} ${a.y.toFixed(1)}H${(edge - k * c).toFixed(1)}Q${edge} ${a.y.toFixed(1)} ${edge} ${(a.y + c).toFixed(1)}`
          + `V${(b.y - c).toFixed(1)}Q${edge} ${b.y.toFixed(1)} ${(edge - k * c).toFixed(1)} ${b.y.toFixed(1)}H${(b.x + k * b.r).toFixed(1)}`;
        continue;
      }
      if (len < a.r + b.r) continue;
      const ux = dx / len, uy = dy / len;
      d += `M${(a.x + ux * a.r).toFixed(1)} ${(a.y + uy * a.r).toFixed(1)}L${(b.x - ux * b.r).toFixed(1)} ${(b.y - uy * b.r).toFixed(1)}`;
    }
    courseSvg.setAttribute("viewBox", `0 0 ${box.width.toFixed(0)} ${box.height.toFixed(0)}`);
    courseSvg.innerHTML = `<path d="${d}"/>`;
    coursePath = courseSvg.querySelector("path");
    if (window.__courseTween) window.__courseTween();
  }
  drawCourse();
  let resizeTimer;
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawCourse, 120); });
  if (document.fonts) document.fonts.ready.then(drawCourse);

  /* ---------- Punch helper: split text into letters ---------- */
  // Real embossers never land every letter on the same line: each one sits a fraction off.
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

  /* ---------- The label maker ---------- */
  const form = document.querySelector("[data-labeler]");
  const out = form.querySelector("[data-tape-out]");
  const outFace = faceOf(out);
  const input = form.querySelector('input[name="equipe"]');
  const cutBtn = form.querySelector(".machine-cut");
  const tray = form.querySelector("[data-tray]");
  const wheel = form.querySelector("[data-wheel]");
  const DEFAULT = "Sua equipe";
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let lastValue = "";

  // The character wheel: the letter just punched turns to the pointer.
  wheel.innerHTML = LETTERS.map((l, i) => {
    const a = (i / LETTERS.length) * Math.PI * 2 - Math.PI / 2;
    return `<text x="${(Math.cos(a) * 46).toFixed(1)}" y="${(Math.sin(a) * 46).toFixed(1)}" data-l="${l}">${l}</text>`;
  }).join("") + '<circle r="30" fill="#2b2e33"/><circle r="5" fill="#4b5158"/>';
  function turnWheel(ch) {
    const base = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const i = LETTERS.indexOf(base);
    if (i < 0) return;
    wheel.style.rotate = `${-(i / LETTERS.length) * 360}deg`;
    wheel.querySelectorAll("text").forEach((t) => t.classList.toggle("is-on", t.dataset.l === base));
  }

  function renderTape() {
    const value = input.value.replace(/\s+/g, " ").slice(0, 18);
    const shown = value.trim() ? value : DEFAULT;
    const grew = value.length > lastValue.length && value.startsWith(lastValue);
    outFace.innerHTML = punchRun(shown);
    out.setAttribute("aria-label", `Etiqueta: ${shown}`);
    cutBtn.disabled = !value.trim();
    if (grew) {
      turnWheel(value.slice(-1));
      if (window.gsap && !reduceMotion.matches) {
        const chars = outFace.querySelectorAll(".ch");
        const ch = chars[chars.length - 1];
        if (ch) gsap.fromTo(ch, { scale: 1.45, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 0.22, ease: "back.out(3)" });
        gsap.fromTo(out, { x: -6 }, { x: 0, duration: 0.18, ease: "power2.out" });
      }
    }
    lastValue = value;
  }
  input.addEventListener("input", renderTape);
  renderTape();

  form.querySelectorAll('input[name="cor"]').forEach((r) =>
    r.addEventListener("change", () => {
      out.classList.remove("tape--black", "tape--green", "tape--blue", "tape--red");
      out.classList.add(`tape--${r.value}`);
    })
  );

  // Cut: the strip leaves the slot and drops onto the bench as a finished label.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.replace(/\s+/g, " ").trim().slice(0, 18);
    if (!value) return;
    const color = form.querySelector('input[name="cor"]:checked').value;
    const label = document.createElement("span");
    label.className = `tape tape--${color} tape--l`;
    label.textContent = value;
    label.setAttribute("role", "img");
    label.setAttribute("aria-label", `Etiqueta cortada: ${value}`);
    tapeify(label);
    const rot = ((hash(value) - 0.5) * 7).toFixed(1);
    label.style.setProperty("--r", `${rot}deg`);
    tray.prepend(label);
    while (tray.children.length > 3) tray.lastElementChild.remove();
    if (window.gsap && !reduceMotion.matches) {
      gsap.fromTo(label, { y: -70, opacity: 0, rotate: 0 }, { y: 0, opacity: 1, rotate: 0, duration: 0.55, ease: "bounce.out" });
      gsap.fromTo(out, { x: 0 }, { x: 40, opacity: 0, duration: 0.18, ease: "power2.in", onComplete: () => gsap.set(out, { x: -20, opacity: 0 }) });
      gsap.to(out, { x: 0, opacity: 1, duration: 0.35, delay: 0.3, ease: "power3.out" });
    }
  });

  /* ---------- Review pin: only on localhost or with ?revisao ---------- */
  const reviewing = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || new URLSearchParams(location.search).has("revisao");
  const pending = typeof window.HACKATHON_PENDENTES === "function" ? window.HACKATHON_PENDENTES() : [];
  if (reviewing && pending.length) {
    const pin = document.querySelector("[data-review]");
    const a = pin.querySelector("[data-review-toggle]");
    a.textContent = `${pending.length} a substituir`;
    a.title = "Marcadores pendentes em content.js";
    a.setAttribute("aria-expanded", "false");
    a.setAttribute("role", "button");
    pin.hidden = false;
    let panel;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "review-panel";
        panel.innerHTML = `<p><strong>Edite content.js</strong> e troque estes marcadores:</p><ul>${pending.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
        pin.appendChild(panel);
      } else panel.hidden = !panel.hidden;
      a.setAttribute("aria-expanded", String(!panel.hidden));
    });
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

    // Entrance: tape feeds out of the label maker, letters punch in order, the rest is stuck on.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onStart: () => root.classList.remove("motion") });
    gsap.set(chars, { opacity: 0 });
    if (narrow) {
      gsap.set(segs, { clipPath: "inset(0 100% 0 0)" });
      tl.to(segs, { clipPath: "inset(0 0% 0 0)", duration: 0.45, stagger: 0.35, ease: "power2.inOut" }, 0);
    } else {
      gsap.set(strip, { clipPath: "inset(0 100% 0 0)" });
      tl.to(strip, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power2.inOut" }, 0);
    }
    tl.fromTo(chars, { opacity: 0, scale: 1.35, y: -4 }, { opacity: 1, scale: 1, y: 0, duration: 0.18, stagger: 0.055, ease: "back.out(3)" }, 0.12)
      .fromTo(".hero-semana .tape", { opacity: 0, y: -26, rotate: -6 }, { opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: "back.out(1.6)" }, "-=0.1")
      .fromTo(".hero-edition, .hero-lede", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.25")
      .fromTo(".hero-actions", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
      .fromTo(".hero-facts", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.35")
      .add(() => gsap.set([strip, ...segs], { clearProps: "clipPath" }));

    // Section headings: a strip is pressed onto the surface as it arrives.
    gsap.utils.toArray(".section-title .tape").forEach((t) => {
      gsap.from(t, {
        y: -18, scale: 1.06, opacity: 0, duration: 0.55, ease: "back.out(1.8)",
        scrollTrigger: { trigger: t, start: "top 88%", once: true },
      });
    });

    // HACK + MARATONA = HACKATHON, one strip at a time.
    gsap.from("[data-eq], .eq-op", {
      opacity: 0, x: -14, duration: 0.4, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".equation", start: "top 85%", once: true },
    });

    // The theme in the drawer is punched letter by letter when the cabinet comes into view.
    const theme = document.querySelector("[data-punch-on-view]");
    if (theme) {
      const tc = splitChars(theme);
      gsap.from(tc, {
        opacity: 0, scale: 1.4, duration: 0.16, stagger: 0.035, ease: "back.out(3)",
        scrollTrigger: { trigger: theme, start: "top 85%", once: true },
      });
    }
    gsap.from(".drawer", {
      y: 40, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".challenge", start: "top 80%", once: true },
    });

    // The course line is drawn as the visitor walks the route; controls light up as reached.
    window.__courseTween = () => {
      if (!coursePath) return;
      ScrollTrigger.getById("course") && ScrollTrigger.getById("course").kill();
      const len = coursePath.getTotalLength();
      gsap.set(coursePath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(coursePath, {
        strokeDashoffset: 0, ease: "none",
        scrollTrigger: { id: "course", trigger: ".course", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
      });
    };
    window.__courseTween();
    gsap.utils.toArray(".control").forEach((c) => {
      gsap.from(c.querySelector(".control-num"), {
        scale: 0.6, opacity: 0, duration: 0.4, ease: "back.out(2.4)",
        scrollTrigger: { trigger: c, start: "top 82%", once: true },
      });
    });

    // Schedule slots slide in from the rail.
    ScrollTrigger.batch(".slot", {
      start: "top 90%", once: true,
      onEnter: (els) => gsap.from(els, { opacity: 0, x: -16, duration: 0.45, stagger: 0.06, ease: "power3.out" }),
    });

    // Rules: the sheet slides onto the bench.
    gsap.from(".sheet", {
      y: 60, rotate: -0.6, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".sheet", start: "top 90%", once: true },
    });

    addEventListener("load", () => ScrollTrigger.refresh());
  }

  if (document.readyState === "complete" || document.readyState === "interactive") startMotion();
  else addEventListener("DOMContentLoaded", startMotion);
})();
