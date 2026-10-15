(() => {
  const $ = (id) => document.getElementById(id);
  const IMG = "https://cdn.jsdelivr.net/npm/three-globe@2.31.0/example/img/";
  const COUNTRIES_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
  const RESUME_ROTATE_MS = 4000;
  const FLY_MS = 1000;

  const visitedKeys = Object.keys(TRAVELS);
  let hovered = null;
  let current = null;        // 目前展開的國家 key
  let thumbs = [];           // 目前散在畫面上的縮圖元素
  let photoIndex = 0;
  let resumeTimer = null;
  let burstTimer = null;

  /* ---------------- 背景星空 ---------------- */
  const starCanvas = $("stars");
  const starCtx = starCanvas.getContext("2d");
  const STAR_COLORS = ["#ffffff", "#c4b5fd", "#93c5fd", "#f5d0fe"];
  let stars = [];

  function sizeStars() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    starCanvas.width = innerWidth * dpr;
    starCanvas.height = innerHeight * dpr;
    starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.round((innerWidth * innerHeight) / 4500) }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.6,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
    }));
  }

  function drawStars(t) {
    starCtx.clearRect(0, 0, innerWidth, innerHeight);
    for (const s of stars) {
      starCtx.globalAlpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin((t / 1000) * s.speed + s.phase));
      starCtx.fillStyle = s.color;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fill();
    }
    requestAnimationFrame(drawStars);
  }
  sizeStars();
  requestAnimationFrame(drawStars);

  /* ---------------- 地球 ---------------- */
  const globe = Globe()($("globe"))
    .backgroundColor("rgba(0,0,0,0)")
    .globeImageUrl(IMG + "earth-dark.jpg")
    .bumpImageUrl(IMG + "earth-topology.png")
    .atmosphereColor("#8b5cf6")
    .atmosphereAltitude(0.25)
    .polygonAltitude((d) => {
      if (d === hovered) return isVisited(d) ? 0.06 : 0.025;
      return isVisited(d) ? 0.012 : 0.006;
    })
    .polygonCapColor((d) => {
      if (isVisited(d)) return d === hovered ? "rgba(240, 150, 255, .92)" : "rgba(167, 139, 250, .6)";
      return d === hovered ? "rgba(147, 197, 253, .32)" : "rgba(120, 110, 220, .06)";
    })
    .polygonSideColor((d) => {
      if (d !== hovered) return "rgba(139, 92, 246, .22)";
      return isVisited(d) ? "rgba(232, 121, 249, .55)" : "rgba(147, 197, 253, .25)";
    })
    .polygonStrokeColor((d) => (d === hovered ? "rgba(255, 255, 255, .9)" : "rgba(196, 181, 253, .28)"))
    .polygonLabel(() => null)          // 改用自己做的資訊卡（hover card）
    .polygonsTransitionDuration(450)
    .onPolygonHover((d) => setHovered(d))
    .onPolygonClick((d) => {
      hideCard();
      const key = d.properties.name;
      if (TRAVELS[key]) openCountry(key);
      else toast(`Haven’t been to ${key} yet — next stop? ✈️`);
    })
    // 滑鼠移到國家時，從國家中心擴散出的漣漪
    .ringsData([])
    .ringColor((r) => (t) => r.visited
      ? `rgba(255, 170, 255, ${Math.pow(1 - t, 1.2)})`
      : `rgba(170, 210, 255, ${0.85 * Math.pow(1 - t, 1.2)})`)
    .ringMaxRadius((r) => (r.visited ? 6 : 3.5))
    .ringPropagationSpeed((r) => (r.visited ? 3 : 2))
    .ringRepeatPeriod((r) => (r.visited ? 650 : 900))
    .ringAltitude((r) => (r.visited ? 0.065 : 0.03))   // 放在浮起的國家上方，才看得到
    .ringResolution(96)
    .htmlElementsData([])
    .htmlElement((d) => (d.kind === "pin" ? makePin(d) : makeHello(d)))
    .htmlAltitude((d) => (d.kind === "pin" ? 0.02 : 0.08));

  // 背面的元素隱藏起來
  if (typeof globe.htmlElementVisibilityModifier === "function") {
    globe.htmlElementVisibilityModifier((el, visible) => el.classList.toggle("hidden", !visible));
  }

  // 把地球染成深藍紫色調
  const mat = globe.globeMaterial();
  mat.color.set("#7c6cff");
  mat.emissive.set("#1e1462");
  mat.emissiveIntensity = 0.55;
  mat.shininess = 8;

  const controls = globe.controls();
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.6;
  controls.enableDamping = true;

  // 被嵌在別的網頁（iframe）裡時，關掉滾輪縮放，讓訪客的滾輪可以繼續捲動外面的頁面
  const embedded = window.self !== window.top;
  if (embedded) {
    controls.enableZoom = false;
    document.body.classList.add("embedded");
  }
  globe.pointOfView({ lat: 25, lng: 60, altitude: 2.4 });

  // 使用者拖曳時暫停旋轉，放開後一段時間再恢復
  controls.addEventListener("start", () => { controls.autoRotate = false; clearTimeout(resumeTimer); });
  controls.addEventListener("end", scheduleResume);

  function scheduleResume() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { if (!current) controls.autoRotate = true; }, RESUME_ROTATE_MS);
  }

  function isVisited(d) { return !!TRAVELS[d.properties.name]; }

  fetch(COUNTRIES_URL)
    .then((r) => r.json())
    .then((topo) => {
      const features = topojson.feature(topo, topo.objects.countries).features
        .filter((f) => f.properties.name !== "Antarctica");
      globe.polygonsData(features);
    })
    .catch(() => toast("Couldn’t load the country borders — check your connection"));

  window.addEventListener("resize", () => {
    globe.width(innerWidth).height(innerHeight);
    sizeStars();
    if (current) placeThumbs(false);
  });

  /* ---------------- 滑鼠移到國家上 ---------------- */
  const card = $("hover-card");
  const cardInner = card.querySelector(".hc-inner");
  const pinEls = {};
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const cardPos = { x: mouse.x, y: mouse.y };

  function setHovered(d) {
    if (d === hovered) return;
    const prevKey = hovered && hovered.properties.name;
    hovered = d;
    // 重新套用樣式，讓國家浮起 / 落下（globe.gl 會用 transition 補間）
    globe
      .polygonAltitude(globe.polygonAltitude())
      .polygonCapColor(globe.polygonCapColor())
      .polygonSideColor(globe.polygonSideColor())
      .polygonStrokeColor(globe.polygonStrokeColor());
    $("globe").style.cursor = d ? "pointer" : "grab";

    if (prevKey && pinEls[prevKey]) pinEls[prevKey].classList.remove("lit");
    if (!d || current) { globe.ringsData([]); hideCard(); return; }

    const key = d.properties.name;
    const t = TRAVELS[key];
    const [lng, lat] = t ? [t.lng, t.lat] : centroid(d);
    globe.ringsData([{ lat, lng, visited: !!t }]);
    if (t && pinEls[key]) pinEls[key].classList.add("lit");
    showCard(key, t);
  }

  function showCard(key, t) {
    cardInner.innerHTML = t
      ? `<div class="hc-head">${flagImg(t, "hc-flag")}<div><b>${t.name}</b><small>${t.visited} · ${t.photos.length} photos</small></div></div>
         <div class="hc-strip">${t.photos.slice(0, 3).map((p) => `<img src="${p.src}" alt="">`).join("")}</div>
         <div class="hc-cta">Click to explore <span>→</span></div>`
      : `<div class="hc-head"><div><b>${key}</b><small>Not visited yet</small></div></div>`;
    card.classList.toggle("is-visited", !!t);
    card.classList.remove("show");
    void card.offsetWidth;          // 重新觸發彈出動畫
    card.classList.add("show");
  }

  function hideCard() { card.classList.remove("show"); }

  // 資訊卡平滑地跟著滑鼠（每一幀往目標位置靠近一點）
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.documentElement.addEventListener("pointerleave", () => setHovered(null));
  (function followMouse() {
    cardPos.x += (mouse.x - cardPos.x) * 0.2;
    cardPos.y += (mouse.y - cardPos.y) * 0.2;
    // 靠近右邊或下面時翻到滑鼠的另一側，避免卡片超出畫面
    const w = card.offsetWidth, h = card.offsetHeight;
    const x = cardPos.x + w + 40 > innerWidth ? cardPos.x - w - 22 : cardPos.x + 22;
    const y = cardPos.y + h + 40 > innerHeight ? cardPos.y - h - 22 : cardPos.y + 22;
    card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(followMouse);
  })();

  // 沒去過的國家沒有座標，用最大一塊陸地的平均點當作漣漪中心
  function centroid(f) {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    const ring = polys.map((p) => p[0]).sort((a, b) => b.length - a.length)[0];
    const sum = ring.reduce((acc, [x, y]) => [acc[0] + x, acc[1] + y], [0, 0]);
    return [sum[0] / ring.length, sum[1] / ring.length];
  }

  /* ---------------- 圖釘 & 哈囉 ---------------- */
  const pins = visitedKeys.map((key) => ({ kind: "pin", key, lat: TRAVELS[key].lat, lng: TRAVELS[key].lng }));
  let hellos = [];

  function makePin(d) {
    const t = TRAVELS[d.key];
    const el = document.createElement("div");
    el.className = "pin";
    el.innerHTML = `<span class="pin-label">${flagImg(t)} ${t.name}</span><span class="pin-dot"></span>`;
    el.addEventListener("click", (e) => { e.stopPropagation(); hideCard(); openCountry(d.key); });
    pinEls[d.key] = el;
    return el;
  }

  function makeHello(d) {
    const wrap = document.createElement("div");
    wrap.className = "hello-wrap";
    wrap.innerHTML = `<div class="hello">${d.text}</div>`;
    return wrap;
  }

  function spawnHello() {
    if (current) return;   // 展開照片時暫停，讓畫面乾淨一點
    const now = Date.now();
    hellos = hellos.filter((h) => now - h.born < 4500);
    const used = new Set(hellos.map((h) => h.text + h.lat));
    const pool = HELLOS.filter((h) => !used.has(h.text + h.lat));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    hellos.push({ ...pick, kind: "hello", born: now });
    globe.htmlElementsData([...pins, ...hellos]);
  }
  globe.htmlElementsData(pins);
  setInterval(spawnHello, 700);

  // 標題輪播
  const heroWords = [...new Set(HELLOS.map((h) => h.text))];
  let heroI = 0;
  setInterval(() => {
    const el = $("hero-hello");
    el.classList.add("out");
    setTimeout(() => {
      heroI = (heroI + 1) % heroWords.length;
      el.textContent = heroWords[heroI];
      el.classList.remove("out");
    }, 400);
  }, 2200);

  /* ---------------- 左側清單 ---------------- */
  const totalPhotos = visitedKeys.reduce((n, k) => n + TRAVELS[k].photos.length, 0);
  $("stats").textContent = `${visitedKeys.length} countries · ${totalPhotos} photos`;
  $("visited-list").innerHTML = visitedKeys.map((k) => {
    const t = TRAVELS[k];
    return `<li><button data-key="${k}">${flagImg(t, "flag")}${t.name}<span class="count">${t.photos.length}</span></button></li>`;
  }).join("");
  $("visited-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-key]");
    if (btn) openCountry(btn.dataset.key);
  });
  $("visited-toggle").addEventListener("click", () => {
    const v = $("visited");
    v.classList.toggle("collapsed");
    $("visited-toggle").setAttribute("aria-expanded", !v.classList.contains("collapsed"));
  });
  if (innerWidth < 720) $("visited").classList.add("collapsed");

  /* ---------------- 照片散開 ---------------- */
  function openCountry(key) {
    if (key === current) return;
    const t = TRAVELS[key];
    const switching = !!current;
    current = key;
    controls.autoRotate = false;
    clearTimeout(resumeTimer);
    clearTimeout(burstTimer);
    globe.pointOfView({ lat: t.lat, lng: t.lng, altitude: 1.5 }, FLY_MS);

    $("stage-flag").innerHTML = flagImg(t);
    $("stage-title").textContent = t.name;
    $("stage-meta").textContent = `${t.visited} · ${t.photos.length} photos`;
    $("stage-intro").textContent = t.intro || "";
    document.querySelectorAll("#visited-list button").forEach((b) => b.classList.toggle("active", b.dataset.key === key));

    document.body.classList.add("stage-open");
    $("stage").classList.add("open");
    $("stage").setAttribute("aria-hidden", "false");

    // 換國家時，舊的照片先淡出
    thumbs.forEach((el) => { el.classList.remove("shown"); setTimeout(() => el.remove(), 400); });
    thumbs = [];

    // 等鏡頭飛到一半，照片從國家位置（畫面中心）散出來
    burstTimer = setTimeout(() => burst(t), switching ? 350 : FLY_MS * 0.6);
  }

  function burst(t) {
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    thumbs = t.photos.map((p, i) => {
      const el = document.createElement("button");
      el.className = "thumb";
      el.dataset.i = i;
      el.setAttribute("aria-label", p.title);
      el.innerHTML = `<img src="${p.src}" alt="" draggable="false"><figcaption>${p.title}</figcaption>`;
      attachFallback(el.querySelector("img"), p);
      el.dataset.ox = cx;
      el.dataset.oy = cy;
      $("scatter").appendChild(el);
      return el;
    });
    placeThumbs(true);
  }

  // 環狀排列：縮圖圍成一圈（橢圓），國家資訊在圓心；從大尺寸開始往下找能放得下的大小
  function layout(n) {
    const mobile = innerWidth < 720;
    const ratio = 1.18;   // 縮圖高 / 寬
    const gutter = mobile ? 6 : 36;
    const head = document.querySelector(".stage-head").getBoundingClientRect();
    const top = mobile ? head.bottom + 10 : 40;
    const bottom = mobile ? 40 : 44;
    const cx = innerWidth / 2;
    const cy = (top + innerHeight - bottom) / 2;
    const halfH = (innerHeight - bottom - top) / 2;

    const ring = (w) => {
      const h = w * ratio;
      const rx = Math.max(0, innerWidth / 2 - gutter - w / 2);
      const ry = Math.max(0, halfH - h / 2);
      const pts = Array.from({ length: n }, (_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        return { a, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
      });
      return { w, h, pts };
    };
    const fits = ({ w, h, pts }) => {
      // 相鄰縮圖不重疊
      const apart = n < 2 || pts.every((p, i) => {
        const q = pts[(i + 1) % n];
        const k = mobile ? 1.02 : 1.08;
        return Math.abs(p.x - q.x) >= w * k || Math.abs(p.y - q.y) >= h * k;
      });
      // 桌機版不能壓到圓心的國家資訊
      const clear = mobile || pts.every((p) =>
        Math.abs(p.x - cx) >= head.width / 2 + w / 2 + 12 || Math.abs(p.y - cy) >= head.height / 2 + h / 2 + 12);
      return apart && clear;
    };

    let best = ring(56);
    for (let w = mobile ? 132 : 230; w >= 56; w -= 4) {
      const r = ring(w);
      if (fits(r)) { best = r; break; }
    }
    return best.pts.map((p) => ({
      x: p.x - best.w / 2,
      y: p.y - best.h / 2,
      r: Math.cos(p.a) * 6,   // 左右兩側微微向外傾斜
      w: best.w,
      h: best.h
    }));
  }

  function placeThumbs(animate) {
    const spots = layout(thumbs.length);
    thumbs.forEach((el, i) => {
      const s = spots[i];
      el.style.width = s.w + "px";
      el.style.height = s.h + "px";
      if (animate) {
        // 起點：縮小、旋轉、疊在國家的位置
        el.style.setProperty("--x", `${el.dataset.ox - s.w / 2}px`);
        el.style.setProperty("--y", `${el.dataset.oy - s.h / 2}px`);
        el.style.setProperty("--r", `${(i % 2 ? 1 : -1) * (30 + i * 8)}deg`);
        el.style.setProperty("--s", "0.15");
        el.style.setProperty("--delay", `${i * 0.08}s`);
      }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.classList.add("shown");
        el.style.setProperty("--x", `${s.x}px`);
        el.style.setProperty("--y", `${s.y}px`);
        el.style.setProperty("--r", `${s.r}deg`);
        el.style.setProperty("--s", "1");
      }));
      if (animate) setTimeout(() => el.classList.add("landed"), 950 + i * 80);
    });
  }

  function closeCountry() {
    if (!current) return;
    current = null;
    clearTimeout(burstTimer);
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    const leaving = thumbs;
    thumbs = [];
    // 照片收回國家的位置
    leaving.forEach((el, i) => {
      el.classList.remove("landed");
      el.style.setProperty("--delay", `${(leaving.length - 1 - i) * 0.05}s`);
      el.style.setProperty("--x", `${cx - el.offsetWidth / 2}px`);
      el.style.setProperty("--y", `${cy - el.offsetHeight / 2}px`);
      el.style.setProperty("--r", `${(i % 2 ? -1 : 1) * 25}deg`);
      el.style.setProperty("--s", "0.1");
      el.classList.remove("shown");
    });
    setTimeout(() => leaving.forEach((el) => el.remove()), 700 + leaving.length * 50);

    setTimeout(() => {
      $("stage").classList.remove("open");
      $("stage").setAttribute("aria-hidden", "true");
      document.body.classList.remove("stage-open");
      globe.pointOfView({ altitude: 2.4 }, 1000);
    }, 300);
    document.querySelectorAll("#visited-list button").forEach((b) => b.classList.remove("active"));
    scheduleResume();
  }

  $("stage-close").addEventListener("click", closeCountry);
  $("stage").addEventListener("click", (e) => {
    const thumb = e.target.closest(".thumb");
    if (thumb) openPhoto(+thumb.dataset.i, thumb);
    else if (!e.target.closest("button")) closeCountry();
  });

  /* ---------------- 照片故事 ---------------- */
  function openPhoto(i, fromEl) {
    const photos = TRAVELS[current].photos;
    const wasOpen = $("modal").classList.contains("open");
    photoIndex = (i + photos.length) % photos.length;
    const p = photos[photoIndex];

    const img = $("modal-img");
    img.src = p.src;
    img.alt = p.title;
    attachFallback(img, p);
    $("modal-kicker").innerHTML = `${flagImg(TRAVELS[current])} ${[p.location, p.year].filter(Boolean).join("  ·  ")}`;
    $("modal-title").textContent = p.title;
    const story = Array.isArray(p.story) ? p.story : [p.story || ""];
    $("modal-story").innerHTML = story.map((s) => `<p>${s}</p>`).join("");
    $("modal-body").scrollTop = 0;
    $("modal-prev").hidden = $("modal-next").hidden = photos.length < 2;

    // 文字逐段浮現、照片淡入
    restartAnimation($("modal-body"), "reveal");
    if (wasOpen) restartAnimation(img, "swap");

    if (!wasOpen) {
      $("modal").classList.add("open");
      $("modal").setAttribute("aria-hidden", "false");
      if (fromEl) zoomFrom(fromEl);
    }
  }

  // FLIP：卡片從被點的縮圖位置放大到畫面中央
  function zoomFrom(el) {
    const card = $("modal-card");
    card.style.transition = "none";
    card.style.transform = "none";
    const to = card.getBoundingClientRect();
    const from = el.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    card.style.transform = `translate(${dx}px, ${dy}px) scale(${from.width / to.width})`;
    card.style.opacity = "0.4";
    card.getBoundingClientRect();   // 強制重排，讓起點生效
    card.style.transition = "";
    card.style.transform = "";
    card.style.opacity = "";
  }

  function restartAnimation(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function closePhoto() {
    const card = $("modal-card");
    const thumb = thumbs[photoIndex];
    if (thumb) {
      const to = card.getBoundingClientRect();
      const from = thumb.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      card.style.transform = `translate(${dx}px, ${dy}px) scale(${from.width / to.width})`;
      card.style.opacity = "0";
    }
    $("modal").classList.remove("open");
    $("modal").setAttribute("aria-hidden", "true");
    setTimeout(() => { card.style.transform = ""; card.style.opacity = ""; }, 450);
  }

  $("modal-close").addEventListener("click", closePhoto);
  $("modal").addEventListener("click", (e) => { if (e.target === $("modal")) closePhoto(); });
  $("modal-prev").addEventListener("click", () => openPhoto(photoIndex - 1));
  $("modal-next").addEventListener("click", () => openPhoto(photoIndex + 1));

  document.addEventListener("keydown", (e) => {
    const modalOpen = $("modal").classList.contains("open");
    if (e.key === "Escape") modalOpen ? closePhoto() : closeCountry();
    if (modalOpen && e.key === "ArrowLeft") openPhoto(photoIndex - 1);
    if (modalOpen && e.key === "ArrowRight") openPhoto(photoIndex + 1);
  });

  /* ---------------- 工具 ---------------- */
  // 國旗改用 SVG 圖片（Windows 不支援國旗 emoji，只會顯示成 DE、JP 這種字母）
  // 直接從 data.js 的 flag emoji 換算出國家代碼，例如 🇩🇪 → de
  function flagImg(t, cls = "") {
    const code = [...t.flag].map((c) => String.fromCharCode(c.codePointAt(0) - 0x1f1e6 + 97)).join("");
    return `<img class="flag-img ${cls}" src="https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${code}.svg" alt="${t.name} flag">`;
  }

  // 照片還沒放進資料夾時，顯示漸層佔位圖
  function attachFallback(img, photo) {
    img.onerror = () => { img.onerror = null; img.src = placeholder(photo.title); };
  }

  function placeholder(title) {
    let h = 0;
    for (const c of title) h = (h * 31 + c.codePointAt(0)) % 60;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${240 + h},55%,30%)"/><stop offset="1" stop-color="hsl(${270 + h},60%,12%)"/>
      </linearGradient></defs>
      <rect width="800" height="1000" fill="url(#g)"/>
      <g fill="none" stroke="rgba(255,255,255,.35)" stroke-width="6">
        <path d="M250 340 L400 200 L550 340 Z"/><rect x="280" y="340" width="240" height="140"/>
        <path d="M330 480 v-80 h40 v80 M430 480 v-80 h40 v80"/>
      </g>
      <text x="400" y="560" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="30" font-family="sans-serif">Photo coming soon</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  let toastTimer;
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
})();
