/* Fig. 1 in WebGL: the event week as an axonometric model on a ground grid.
   Loaded only on wide screens with motion allowed; the SVG drawing in main.js is the fallback. */
import * as THREE from "./vendor/three/three.module.min.js";

const HEIGHTS = { empty: 0.7, dated: 2.4, deadline: 3.2, final: 4, locked: 2.9 };
const COLORS = { dated: 0x1e2023, deadline: 0xcd191e, final: 0x1f7f33 };
// Labels fan upward from left to right (by order of labelled day) so they never overlap.
const LIFTS = [120, 64, 14];
const LABEL_TONE = { dated: "", deadline: " model-label--red", final: " model-label--green", locked: " model-label--locked" };

// Days still under wraps are wrapped in caution stripes: present, but nothing to read.
function cautionTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = "#f2c200";
  g.fillRect(0, 0, 64, 64);
  g.fillStyle = "#17181a";
  for (let i = -64; i < 128; i += 32) {
    g.beginPath();
    g.moveTo(i, 0); g.lineTo(i + 16, 0); g.lineTo(i + 80, 64); g.lineTo(i + 64, 64);
    g.closePath(); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 2.6);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function mountWeekModel(stage, data, description) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", description || "Maquete da semana do hackathon.");

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(10, 8.5, 10);
  camera.lookAt(0, 1.4, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xaab1b9, 1.7));
  const sun = new THREE.DirectionalLight(0xffffff, 1.9);
  sun.position.set(-6, 11, 7); // light from the upper left, like the embossed tape
  scene.add(sun);

  const model = new THREE.Group();
  scene.add(model);

  const grid = new THREE.GridHelper(13, 13, 0x17181a, 0x17181a);
  grid.material.transparent = true;
  grid.material.opacity = 0.14;
  model.add(grid);

  const parts = data.map((m, i) => {
    const h = HEIGHTS[m.kind];
    const geo = new THREE.BoxGeometry(1.1, h, 1.1);
    geo.translate(0, h / 2, 0);
    const edges = new THREE.EdgesGeometry(geo);
    const holder = new THREE.Group();
    holder.position.set((i - 2) * 2.1, 0, 0);
    if (m.kind === "empty") {
      // Days without a confirmed event stay a dashed wireframe: drawn, not built.
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineDashedMaterial({ color: 0x17181a, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity: 0.6 })
      );
      line.computeLineDistances();
      holder.add(line);
    } else {
      const mat = m.kind === "locked"
        ? [0, 1, 2, 3, 4, 5].map((f) => (f === 2 || f === 3
            ? new THREE.MeshStandardMaterial({ color: 0x2b2d30, roughness: 0.7 })
            : new THREE.MeshStandardMaterial({ map: cautionTexture(), roughness: 0.65 })))
        : new THREE.MeshStandardMaterial({ color: COLORS[m.kind], roughness: 0.6, metalness: 0.05 });
      holder.add(new THREE.Mesh(geo, mat));
      holder.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0b0c0d, transparent: true, opacity: 0.45 })));
    }
    model.add(holder);
    return { holder, h, m };
  });

  // HTML labels follow their volumes: confirmed days get a leader label, every day gets its name.
  const labelLayer = document.createDocumentFragment();
  const labels = parts.map(({ m }) => {
    const day = document.createElement("span");
    day.className = "model-day";
    day.textContent = `${m.short.toUpperCase()} ${m.num}`;
    labelLayer.appendChild(day);
    let tag = null;
    if (m.kind !== "empty") {
      tag = document.createElement("span");
      tag.className = "model-label" + LABEL_TONE[m.kind];
      tag.innerHTML = `<span class="ml-date"></span><span class="ml-title"></span>${m.extra ? '<span class="ml-extra"></span>' : ""}<span class="ml-lead" aria-hidden="true"></span>`;
      if (m.extra) tag.querySelector(".ml-extra").textContent = m.extra;
      tag.querySelector(".ml-date").textContent = m.date;
      tag.querySelector(".ml-title").textContent = m.title;
      labelLayer.appendChild(tag);
    }
    return { day, tag };
  });

  stage.innerHTML = "";
  stage.appendChild(canvas);
  stage.appendChild(labelLayer);

  let width = 1, height = 1;
  function resize() {
    const r = stage.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    renderer.setSize(width, height, false);
    const view = 10.5;
    const aspect = width / height;
    camera.left = (-view * aspect) / 2;
    camera.right = (view * aspect) / 2;
    camera.top = view / 2;
    camera.bottom = -view / 2;
    camera.updateProjectionMatrix();
    request();
  }

  const v = new THREE.Vector3();
  function place(el, x, y, z, dx = 0, dy = 0) {
    v.set(x, y, z);
    model.localToWorld(v);
    v.project(camera);
    const sx = (v.x * 0.5 + 0.5) * width + dx;
    const sy = (-v.y * 0.5 + 0.5) * height + dy;
    el.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
  }

  // State: the model rises on load, turns a little with the hero scroll and leans toward the pointer.
  const hero = stage.closest(".hero") || document.body;
  let rotY = -0.18, targetY = -0.18, tilt = 0, targetTilt = 0;
  let rise = 0;
  const riseStart = performance.now();
  let pointerX = 0.5, pointerY = 0.5;
  let visible = true;
  let frame = 0;

  function targets() {
    const r = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    targetY = -0.18 + progress * 0.7 + (pointerX - 0.5) * 0.3;
    targetTilt = (pointerY - 0.5) * 0.08;
  }

  function render(now) {
    frame = 0;
    rise = Math.min(1, (now - riseStart) / 1400);
    parts.forEach(({ holder }, i) => {
      const t = Math.min(1, Math.max(0, rise * 1.6 - i * 0.12));
      holder.scale.y = Math.max(0.001, 1 - Math.pow(1 - t, 3));
    });
    targets();
    rotY += (targetY - rotY) * 0.08;
    tilt += (targetTilt - tilt) * 0.08;
    model.rotation.y = rotY;
    model.rotation.x = tilt;
    renderer.render(scene, camera);

    parts.forEach(({ holder, h }, i) => {
      const { day, tag } = labels[i];
      place(day, holder.position.x, 0, 0.95, 0, 8);
      if (tag) {
        // Labels fan upward from left to right so they never sit on top of each other.
        const lift = LIFTS[labels.slice(0, i).filter((l) => l.tag).length] || 14;
        place(tag, holder.position.x, h * holder.scale.y, 0, 0, -lift - tag.offsetHeight);
        tag.style.setProperty("--lead", `${lift}px`);
        tag.style.opacity = holder.scale.y > 0.98 ? "1" : "0";
      }
    });

    const settling = Math.abs(targetY - rotY) > 0.0008 || Math.abs(targetTilt - tilt) > 0.0008 || rise < 1;
    if (visible && settling) request();
  }
  function request() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  addEventListener("scroll", request, { passive: true });
  addEventListener("pointermove", (e) => {
    pointerX = e.clientX / innerWidth;
    pointerY = e.clientY / innerHeight;
    request();
  }, { passive: true });
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) request();
  }).observe(stage);

  resize();
}
