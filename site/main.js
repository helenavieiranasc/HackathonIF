/* Renders content.js into the page, builds the tapes, the countdown, the week model
   and the label maker, then runs the motion. Every fact on the page comes from window.HACKATHON. */
(function () {
  "use strict";

  // Release gate. The full content (rules, prizes, judges...) is not part of the published site
  // until the organizers set publicacao.liberado = true and ship content-completo.js.
  // A visitor's clock never unlocks anything: it only changes the wording around the reveal.
  const C0 = window.HACKATHON || {};
  const pub = C0.publicacao || {};
  function mergeContent(target, extra) {
    Object.keys(extra).forEach((k) => {
      const v = extra[k];
      if (k === "agenda" && Array.isArray(target.agenda)) {
        target.agenda = target.agenda.map((d) => v.find((x) => x.dia === d.dia) || d);
      } else if (v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object") {
        Object.assign(target[k], v);
      } else target[k] = v;
    });
  }
  if (pub.liberado) {
    const sc = document.createElement("script");
    sc.src = pub.arquivo || "content-completo.js";
    sc.onload = () => { mergeContent(C0, window.HACKATHON_COMPLETO || {}); boot(!!window.HACKATHON_COMPLETO); };
    sc.onerror = () => boot(false);
    document.head.appendChild(sc);
  } else boot(false);

  function boot(LIBERADO) {
  const C = C0;
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

  /* ---------- Locked vault, or the released chapters in its place ---------- */
  const vault = document.querySelector("[data-vault]");
  const fullHolder = document.querySelector("[data-full-sections]");
  const revealEndAt = Date.parse((C.revelacao || {}).fim);
  if (LIBERADO && C.secoesHtml) {
    if (fullHolder) fullHolder.outerHTML = C.secoesHtml;
    if (vault) vault.remove();
    const extra = document.querySelector("[data-final-extra]");
    if (extra && C.inscricaoHtml) extra.innerHTML = C.inscricaoHtml;
    const chap = document.querySelector("[data-final-chap]");
    if (chap) chap.textContent = "11";
    document.querySelectorAll("[data-locked-link]").forEach((a) => a.setAttribute("href", "#projeto"));
  } else {
    if (fullHolder) fullHolder.remove();
    const grid = document.querySelector("[data-vault-grid]");
    const after = Date.now() >= revealEndAt;
    const stamp = after ? "Publicação em breve" : "Revelação em 26.10";
    const when = after
      ? "A revelação já aconteceu. A organização publica este conteúdo em breve."
      : "Disponível após o anúncio oficial: segunda-feira, 26.10, depois da reunião das 8h às 9h30.";
    if (grid) {
      grid.innerHTML = (C.bloqueados || [])
        .map(
          (b) => `<li class="lockbox" id="${esc(b.id)}">
            <button type="button" class="lock-face" aria-expanded="false" aria-controls="lock-${esc(b.id)}">
              <span class="lock-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path class="lock-shackle" d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3"/><rect x="4.5" y="11" width="15" height="10" rx="1.5"/><path d="M12 14.8v2.6"/></svg></span>
              <span class="lock-title">${esc(b.titulo)}</span>
              <span class="lock-redacted" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tape tape--yellow tape--s lock-stamp">${esc(stamp)}</span>
            </button>
            <p class="lock-note" id="lock-${esc(b.id)}" hidden>${esc(b.texto)} <span>${esc(when)}</span></p>
          </li>`
        )
        .join("");
      grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".lock-face");
        if (!btn) return;
        const note = document.getElementById(btn.getAttribute("aria-controls"));
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        note.hidden = !open;
        const box = btn.closest(".lockbox");
        box.classList.remove("is-shaking");
        void box.offsetWidth;
        box.classList.add("is-shaking");
      });
    }
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
      el.innerHTML = rich(v);
    }
  });

  /* ---------- Lists ---------- */
  const renderers = {
    "sobre.texto": (items) => items.map((t) => `<p>${rich(t)}</p>`).join(""),
    "sobre.motivos": (items) =>
      items.map((m) => `<li><h3 class="motive-title">${esc(m.titulo)}</h3><p>${rich(m.texto)}</p></li>`).join(""),

    "revelacao.pauta": (items) => items.map((t) => `<li>${rich(t)}</li>`).join(""),
    "participacao.dicas": (items) => items.map((t) => `<li>${rich(t)}</li>`).join(""),

    "ia.frases": (items) => items.map((t) => `<span class="ai-line">${esc(t)}</span>`).join(""),
    "ia.texto": (items) => items.map((t) => `<p>${rich(t)}</p>`).join(""),
    "projeto.regras": (items) => items.map((t) => `<li>${rich(t)}</li>`).join(""),

    etapas: (items) =>
      items
        .map(
          (e, i) => `<li class="control" id="etapa-${esc(e.id)}">
            <span class="control-num" aria-hidden="true">${i + 1}</span>
            <h3 class="control-title"><span class="sr-only">Etapa ${i + 1}: </span>${esc(e.titulo)}</h3>
            <p>${rich(e.texto)}</p>
            ${e.detalhe ? `<p class="control-detail">${rich(e.detalhe)}</p>` : ""}
          </li>`
        )
        .join(""),

    "pitch.mostrar": (items) => items.map((m) => `<li><strong>${esc(m.titulo)}</strong> ${rich(m.texto)}</li>`).join(""),
    "pitch.star": (items) =>
      items
        .map(
          (s) => `<li class="star-step"><span class="star-letter" aria-hidden="true">${esc(s.letra)}</span>
            <span class="star-text"><strong>${esc(s.nome)}</strong> ${rich(s.texto)}</span></li>`
        )
        .join(""),

    "avaliacao.criterios": (items) =>
      items.map((c, i) => `<li><span class="crit-num" aria-hidden="true">${i + 1}</span><span>${rich(c)}</span></li>`).join(""),
    "avaliacao.banca": (items) =>
      items
        .map((n) => (isPlaceholder(n) ? `<li class="panel-pending">${rich(n)}</li>` : `<li class="panel-confirmed">${esc(n)}</li>`))
        .join(""),
    "avaliacao.premios": (items) =>
      items
        .map(
          (p, i) => `<li class="award award--${i + 1}">
            <span class="award-place">${esc(p.lugar.replace(" lugar", ""))}<span class="sr-only"> lugar</span></span>
            <span class="award-items">${p.medalha ? `<span class="award-medal">${esc(p.medalha)}</span> <span aria-hidden="true">+</span>` : ""} ${rich(p.premio)}</span>
          </li>`
        )
        .join(""),

    faq: (items) =>
      items
        .map((q) => {
          const pending = !q.confirmado || isWholePlaceholder(q.resposta);
          return `<details class="qa">
            <summary><span class="qa-q">${esc(q.pergunta)}${pending ? '<mark class="ph qa-status">Resposta pendente</mark>' : ""}</span><span class="qa-mark" aria-hidden="true"><svg class="icon"><use href="#i-plus"/></svg></span></summary>
            <div class="qa-a"><p>${rich(q.resposta)}</p></div>
          </details>`;
        })
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
                  ? `<li>${rich(t)}</li>`
                  : `<li class="rule-field"><strong>${esc(t.rotulo)}:</strong> ${rich(t.valor)}</li>`
              )
              .join("")}</ul>
          </li>`
        )
        .join(""),

    "contato.redes": (items) =>
      items.length
        ? items.map((r) => `<li><a class="link-out" href="${esc(r.url)}" rel="noopener" target="_blank">${esc(r.nome)} <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg><span class="sr-only"> (abre em nova aba)</span></a></li>`).join("")
        : `<li>${rich("[REDES SOCIAIS A DEFINIR]")}</li>`,
  };
  document.querySelectorAll("[data-list]").forEach((el) => {
    const key = el.dataset.list;
    if (renderers[key]) el.innerHTML = renderers[key](get(key) || []);
  });

  // Inline lists read as sentences, not as a row of pills.
  const joinInline = (items) => items.map((t) => `<span>${esc(t)}</span>`).join("");
  const fill = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };
  if (C.participacao) fill("[data-skills]", esc(C.participacao.habilidades.join(", ").toLocaleLowerCase("pt-BR")));
  if (C.ia) fill("[data-uses]", esc(C.ia.usos.join(", ").toLocaleLowerCase("pt-BR")));
  if (C.projeto) fill("[data-formats]", joinInline(C.projeto.formatos));

  /* ---------- Regulation index ---------- */
  const toc = document.querySelector("[data-toc]");
  if (toc && C.regulamento) {
    toc.innerHTML = C.regulamento.secoes.map((s) => `<li><a href="#regra-${esc(s.id)}">${esc(s.titulo)}</a></li>`).join("");
  }

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
  const weekList = document.querySelector(".week-days");
  if (weekList) {
    weekList.innerHTML = days
      .map(
        (d) => `<li class="week-day${d.events.length ? "" : " week-day--empty"}">
          <span class="wd-name">${esc(d.name.charAt(0).toUpperCase() + d.name.slice(1))}</span>
          <span class="wd-num">${d.num}<span class="sr-only"> de outubro</span></span>
          <div class="wd-events">${d.events
            .map(
              (e) => `<div class="wd-event${e.marco ? " wd-event--deadline" : ""}">
                ${e.hora ? `<span class="tape tape--s tape--time ${e.marco ? "tape--red" : "tape--black"}">${esc(e.hora)}</span>` : ""}
                <span class="wd-title">${esc(e.titulo)}</span>
                ${e.marco ? '<span class="wd-meta">Prazo sem volta</span>' : ""}
                ${e.local ? `<span class="wd-meta">${rich(e.local)}</span>` : ""}
              </div>`
            )
            .join("")}</div>
        </li>`
      )
      .join("");
  }
  fill(
    "[data-week-pending]",
    undated
      .map((e) => `<li><strong>${esc(e.titulo)}</strong>${e.marco ? ' <span class="tape tape--red tape--s">Prazo</span>' : ""} ${rich(e.data)}</li>`)
      .join("")
  );

  /* ---------- Team slots: required seats are punched, optional ones are blank tape ---------- */
  const team = document.querySelector("[data-team]");
  if (team && C.participacao) {
    const { minimo, maximo } = C.participacao;
    team.innerHTML = Array.from({ length: maximo }, (_, i) =>
      i < minimo
        ? `<li><span class="tape tape--black tape--s">Integrante ${i + 1}</span></li>`
        : `<li><span class="tape tape--blank tape--s">Opcional ${i + 1}</span></li>`
    ).join("");
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
        a.insertAdjacentHTML("afterend", ' <mark class="ph" aria-hidden="true">em breve</mark>');
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
      a.setAttribute("role", "link");
      a.insertAdjacentHTML("afterend", ' <mark class="ph">em breve</mark>');
    }
  });

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
    } else if (!LIBERADO) {
      setTitle("O tema já foi revelado na abertura.");
      if (cdStatus) cdStatus.textContent = "O conteúdo completo será publicado pela organização em breve.";
      if (miniLabel) miniLabel.textContent = "O tema já foi revelado na abertura";
      setThemeTape("Revelado em 26/10", "tape--white");
      const st = document.querySelector(".hero-statement");
      if (st) st.innerHTML = "O tema já foi revelado.".split(" ").map((w) => `<span class="w"><span>${esc(w)}</span></span>`).join(" ");
    } else if (reveal.tema && reveal.tema.trim()) {
      setTitle("O tema foi revelado.");
      if (cdStatus) cdStatus.textContent = `Revelado na abertura de ${reveal.dia.toLowerCase()}.`;
      if (miniLabel) miniLabel.textContent = `Tema revelado: ${reveal.tema.trim()}`;
      setThemeTape(reveal.tema.trim(), "tape--black");
    } else {
      setTitle("O tema já foi revelado.");
      if (cdStatus) cdStatus.textContent = `A revelação aconteceu em ${reveal.dia.toLowerCase()}.`;
      if (miniLabel) miniLabel.textContent = "O tema já foi revelado";
      setThemeTape("Revelado em 26/10", "tape--white");
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

  /* ---------- Course line: straight legs between controls ---------- */
  const course = document.querySelector(".course");
  const courseSvg = course ? course.querySelector(".course-line") : null;
  let coursePath = null;
  function drawCourse() {
    if (!course) return;
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
      // A row change in the same column would cut through the step's text: run it out along the margin.
      if (!stacked && Math.abs(dx) < a.r && Math.abs(dy) > a.r * 2) {
        const right = a.x > box.width / 2;
        const edge = right ? box.width + 20 : -20;
        const k = right ? 1 : -1, c = 14;
        d += `M${(a.x + k * a.r).toFixed(1)} ${a.y.toFixed(1)}H${(edge - k * c).toFixed(1)}Q${edge} ${a.y.toFixed(1)} ${edge} ${(a.y + c).toFixed(1)}`
          + `V${(b.y - c).toFixed(1)}Q${edge} ${b.y.toFixed(1)} ${(edge - k * c).toFixed(1)} ${b.y.toFixed(1)}H${(b.x + k * b.r).toFixed(1)}`;
        continue;
      }
      // Next row, back at the left: run along the margin, then the gap above the new row.
      if (!stacked && dx < -a.r && dy > a.r * 2) {
        const edge = box.width + 20, c = 14, gapY = b.y - b.r - 28;
        d += `M${(a.x + a.r).toFixed(1)} ${a.y.toFixed(1)}H${(edge - c).toFixed(1)}Q${edge} ${a.y.toFixed(1)} ${edge} ${(a.y + c).toFixed(1)}`
          + `V${(gapY - c).toFixed(1)}Q${edge} ${gapY.toFixed(1)} ${(edge - c).toFixed(1)} ${gapY.toFixed(1)}H${(b.x + c).toFixed(1)}`
          + `Q${b.x.toFixed(1)} ${gapY.toFixed(1)} ${b.x.toFixed(1)} ${(gapY + c).toFixed(1)}V${(b.y - b.r).toFixed(1)}`;
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

  /* ---------- Fig. 1: the week model. SVG drawing first; WebGL replaces it where it can ---------- */
  // Each day of the model comes from the agenda: public days show their facts, locked days only a padlock.
  const KIND = { revelacao: "dated", prazo: "deadline", final: "final" };
  const modelData = days.map((d) => {
    const ev = (C.agenda || []).find((x) => x.dia === d.num);
    const short = d.name.slice(0, 3).replace(/^./, (c) => c.toUpperCase());
    if (!ev) return { num: d.num, short, kind: "empty", date: "", title: "" };
    if (ev.bloqueado) return { num: d.num, short, kind: "locked", date: `${short} ${d.num}/10`, title: "Revelado em 26.10" };
    const extra = [ev.local, ev.apresentador].filter(Boolean).join(" · ");
    return {
      num: d.num,
      short,
      kind: KIND[ev.tipo] || "dated",
      date: `${short} ${d.num}/10${ev.hora ? " · " + ev.hora : ""}`,
      title: ev.titulo,
      extra,
    };
  });
  // The accessible description is built from the same public data, so it never says more than the drawing.
  const modelAria = "Maquete da semana: " + modelData
    .filter((m) => m.kind !== "empty")
    .map((m) => (m.kind === "locked" ? `${m.date}: bloqueado até o anúncio oficial` : `${m.date}: ${m.title}${m.extra ? " (" + m.extra + ")" : ""}`))
    .join("; ") + ".";
  const stage = document.querySelector("[data-model-stage]");
  function drawModelSvg() {
    // Isometric drawing of the same five volumes; dated days solid, the rest dashed wireframe.
    const W = 640, H = 560, s = 44;
    const cx = 290, cy = 350;
    const iso = (x, y, z) => [cx + (x - z) * Math.cos(Math.PI / 6) * s, cy + (x + z) * Math.sin(Math.PI / 6) * s - y * s];
    const heights = { empty: 0.7, dated: 2.4, deadline: 3.2, final: 4, locked: 2.9 };
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
      if (m.kind === "locked") {
        return `<g class="svg-locked"><polygon points="${right}" fill="url(#hatch-dark)"/><polygon points="${left}" fill="url(#hatch)"/><polygon points="${top}" fill="#2b2d30"/></g>${day}`;
      }
      const f = fills[m.kind];
      return `<g class="svg-solid"><polygon points="${right}" fill="${f[2]}"/><polygon points="${left}" fill="${f[1]}"/><polygon points="${top}" fill="${f[0]}"/></g>${day}`;
    });
    let rank = 0;
    const labels = modelData
      .map((m, i) => {
        if (m.kind === "empty") return "";
        const order = rank++;
        const x = (i - 2) * 1.55 - 0.5, z = (i - 2) * -0.4 - 0.5;
        const p = iso(x + 0.5, heights[m.kind] + 0.25, z + 0.5);
        // Labels fan upward from left to right, like the WebGL version, so they never collide.
        const lift = [112, 62, 18][order] || 18;
        const lx = p[0], ly = p[1] - lift;
        const color = m.kind === "deadline" ? "#b3161b" : m.kind === "final" ? "#176a2a" : m.kind === "locked" ? "#6f747a" : "#17181a";
        return `<g class="svg-label"><line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}" stroke="${color}"/>
          <text x="${(lx + 6).toFixed(1)}" y="${(ly - 16).toFixed(1)}" class="svg-l-date" fill="${color}">${esc(m.date)}</text>
          <text x="${(lx + 6).toFixed(1)}" y="${(ly + 4).toFixed(1)}" class="svg-l-title">${esc(m.title)}</text>${m.extra ? `<text x="${(lx + 6).toFixed(1)}" y="${(ly + 22).toFixed(1)}" class="svg-l-date">${esc(m.extra)}</text>` : ""}</g>`;
      })
      .join("");
    const vb = matchMedia("(max-width: 600px)").matches ? `0 175 ${W} 380` : `0 0 ${W} ${H}`;
    stage.innerHTML = `<svg class="model-svg" viewBox="${vb}" role="img" aria-label="${esc(modelAria)}">
      <defs><pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="#f2c200"/><rect width="6" height="12" fill="#17181a"/></pattern><pattern id="hatch-dark" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="#b38f00"/><rect width="6" height="12" fill="#0d0e10"/></pattern></defs>
      <g class="svg-grid">${grid}</g>${vols.join("")}${labels}</svg>`;
  }
  drawModelSvg();
  // On phones the drawing is too small for its labels: the same three facts follow it as a legend.
  const legend = document.createElement("ul");
  legend.className = "model-legend";
  legend.innerHTML = modelData
    .filter((m) => m.kind !== "empty")
    .map((m) => `<li class="ml-${m.kind}"><span class="ml-date">${esc(m.date)}</span><span class="ml-title">${esc(m.title)}</span>${m.extra ? `<span class="ml-extra">${esc(m.extra)}</span>` : ""}</li>`)
    .join("");
  stage.after(legend);

  const wantsWebGL = () => {
    if (reduceMotion.matches || !matchMedia("(min-width: 900px)").matches) return false;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch { return false; }
  };
  if (wantsWebGL()) {
    const load = () =>
      import("./model.js")
        .then((mod) => mod.mountWeekModel(stage, modelData, modelAria))
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
  wheel.innerHTML = LETTERS.map((l, i) => {
    const a = (i / LETTERS.length) * Math.PI * 2 - Math.PI / 2;
    return `<text x="${(Math.cos(a) * 46).toFixed(1)}" y="${(Math.sin(a) * 46).toFixed(1)}" data-l="${l}">${l}</text>`;
  }).join("") + '<circle r="30" fill="#2b2e33"/><circle r="5" fill="#4b5158"/>';
  function turnWheel(ch) {
    const base = ch.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
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
    label.style.setProperty("--r", `${((hash(value) - 0.5) * 7).toFixed(1)}deg`);
    tray.prepend(label);
    while (tray.children.length > 3) tray.lastElementChild.remove();
    if (window.gsap && !reduceMotion.matches) {
      gsap.fromTo(label, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "bounce.out" });
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
      .fromTo(".hero-lede, .hero-facts, .hero-actions, .mini-countdown", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, "-=0.45")
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

    // The locked drawers slide in one after another.
    if (document.querySelector(".lockbox")) {
      gsap.from(".lockbox", { y: 26, opacity: 0, duration: 0.55, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: ".vault-grid", start: "top 85%", once: true } });
    }

    // Problem → idea → solution: the arrows draw, the steps follow.
    gsap.utils.toArray(".flow [data-draw]").forEach((p, i) => {
      const len = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, duration: 0.9, delay: i * 0.25, ease: "power2.inOut",
        scrollTrigger: { trigger: ".flow", start: "top 75%", once: true },
      });
    });
    gsap.from(".flow-step", { opacity: 0, y: 16, duration: 0.6, stagger: 0.3, ease: "power3.out", scrollTrigger: { trigger: ".flow", start: "top 75%", once: true } });

    // The secret drawer: the theme tape is punched, the drawer eases out a little with the scroll.
    const theme = document.querySelector("[data-punch-on-view]");
    if (theme) {
      gsap.from(splitChars(theme), { opacity: 0, scale: 1.4, duration: 0.16, stagger: 0.035, ease: "back.out(3)", scrollTrigger: { trigger: theme, start: "top 85%", once: true } });
    }
    gsap.fromTo("[data-drawer]", { y: 50 }, { y: 0, ease: "none", scrollTrigger: { trigger: ".challenge", start: "top bottom", end: "top 20%", scrub: 0.6 } });
    gsap.from(".countdown .cd-cell", { y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".countdown", start: "top 85%", once: true } });

    // The course line draws as the visitor walks the route.
    window.__courseTween = () => {
      if (!coursePath) return;
      const prev = ScrollTrigger.getById("course");
      if (prev) prev.kill();
      const len = coursePath.getTotalLength();
      gsap.set(coursePath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(coursePath, { strokeDashoffset: 0, ease: "none", scrollTrigger: { id: "course", trigger: ".course", start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
    };
    if (course) window.__courseTween();
    gsap.utils.toArray(".control-num").forEach((n) => {
      gsap.from(n, { scale: 0.6, opacity: 0, duration: 0.4, ease: "back.out(2.4)", scrollTrigger: { trigger: n, start: "top 85%", once: true } });
    });

    // The week: the rule draws across, then the days and their events drop in.
    if (document.querySelector(".week")) gsap.from(".week-day", { opacity: 0, y: 24, duration: 0.6, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: ".week", start: "top 80%", once: true } });
    if (document.querySelector(".week")) gsap.from(".wd-event", { opacity: 0, y: -18, duration: 0.5, stagger: 0.12, delay: 0.35, ease: "back.out(1.8)", scrollTrigger: { trigger: ".week", start: "top 80%", once: true } });

    // The regulation sheet slides onto the bench.
    if (document.querySelector(".sheet")) gsap.from(".sheet", { y: 60, rotate: -0.5, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".sheet", start: "top 92%", once: true } });

    addEventListener("load", () => ScrollTrigger.refresh());
  }
  if (document.readyState === "complete" || document.readyState === "interactive") startMotion();
  else addEventListener("DOMContentLoaded", startMotion);
  }
})();
