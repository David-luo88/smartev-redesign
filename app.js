const app = document.getElementById("app");

let activeTab = 0;
let whyIndex = 0;
let scale = 1;
let flowController = null;

const ASSET = "assets/";

const navMap = [
  { num: "01", label: "WHY", tabs: [1] },
  { num: "02", label: "WHAT", tabs: [2, 21, 22, 23] },
  { num: "03", label: "HOW", tabs: [3, 31, 32] }
];

function sectionIndex(tab) {
  return navMap.findIndex((section) => section.tabs.includes(tab));
}

function setActiveTab(tab) {
  activeTab = tab;
  if (tab !== 1) whyIndex = 0;
  render();
}

function setWhyIndex(index) {
  whyIndex = index;
  render();
}

function button(label, tab, variant = "") {
  return `<button class="btn ${variant}" type="button" data-tab="${tab}">${label}</button>`;
}

function icon(name) {
  const common = `class="agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const paths = {
    search: `<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path><path d="M8.8 11h4.4"></path>`,
    simulate: `<path d="M4 7h16"></path><path d="M7 4v6"></path><path d="M17 4v6"></path><rect x="4" y="7" width="16" height="13" rx="2"></rect><path d="M8 13h3"></path><path d="M13 16h3"></path>`,
    chip: `<rect x="7" y="7" width="10" height="10" rx="2"></rect><path d="M9 1v4"></path><path d="M15 1v4"></path><path d="M9 19v4"></path><path d="M15 19v4"></path><path d="M1 9h4"></path><path d="M1 15h4"></path><path d="M19 9h4"></path><path d="M19 15h4"></path>`
  };
  return `<svg ${common}>${paths[name]}</svg>`;
}

function frame(src, alt, extra = "") {
  return `<div class="image-frame ${extra}"><img src="${ASSET}${src}" alt="${alt}" loading="lazy" /></div>`;
}

function pageHead(num, title, subtitle, small = false) {
  return `
    <div class="page-head animate-slide-up">
      <div class="page-num">${num}</div>
      <div>
        <h2 style="font-size:${small ? 40 : 56}px;font-weight:300;color:var(--accent);margin-bottom:10px;text-shadow:var(--glow)">${title}</h2>
        <div class="eyebrow">${subtitle}</div>
      </div>
    </div>
  `;
}

function rail() {
  const active = sectionIndex(activeTab);
  if (active < 0) return "";
  return `
    <div class="progress-rail" aria-hidden="true">
      ${navMap.map((item, index) => `
        ${index > 0 ? `<div class="rail-line ${index <= active ? "done" : ""}"></div>` : ""}
        <div class="rail-step ${index === active ? "active" : ""} ${index < active ? "done" : ""}">
          <span class="rail-dot"></span>
          <span class="rail-label">${item.num}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function homePage() {
  const cards = [
    { id: 1, title: "為什麼 (Why)", subtitle: "做智慧電動車平台" },
    { id: 2, title: "什麼是 (What)", subtitle: "何謂智慧電動車平台" },
    { id: 3, title: "如何能 (How)", subtitle: "持續運作與創造價值" }
  ];
  return `
    <section class="screen home">
      <h1 class="animate-slide-up">
        驅動車輛持續進化<br />
        <span class="brand-line">智慧電動車平台</span><br />
        <span class="subtitle">(Smart EV Platform)</span>
      </h1>
      <div class="choice-grid animate-slide-up delay-300">
        ${cards.map((card) => `
          <button class="choice-card" type="button" data-tab="${card.id}">
            <span class="choice-num">0${card.id}</span>
            <span class="choice-title">${card.title}</span>
            <span class="choice-subtitle">${card.subtitle}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function whyPage() {
  const slides = [
    {
      num: "01",
      title: "車廠面臨的核心困境",
      subtitle: "SDV 時代的結構性痛點",
      image: "car_factory_dilemma.png",
      body: `
        <div class="problem-list">
          ${[
            ["技術黑盒", "無法掌握核心演算法與模型，被供應商綁定"],
            ["高昂代價", "每次更新須重新談判、整合，成本失控"],
            ["量產即過時", "車輛出廠後智能功能停止進化，用戶體驗停滯"]
          ].map(([title, text], index) => `
            <div class="problem-card glass animate-slide-up delay-${200 + index * 100}">
              <h4>${title}</h4>
              <p>${text}</p>
            </div>
          `).join("")}
        </div>
      `
    },
    {
      num: "01.1",
      title: "改變，從這裡開始",
      subtitle: "讓車廠具備自主進化的能力",
      image: "soul_passing_orb.png",
      body: `
        <div class="why-copy animate-slide-up delay-200">
          <p>我們提供的是一套<strong>「主權級別」</strong>的智慧化能力——讓車廠拿回產品的靈魂與進化權。</p>
          <div class="quote-block">
            <h4>賦能者 (Enabler)</h4>
            <p>助力 OEM 從「硬體組裝者」轉型為「數據驅動的智能營運商」。</p>
          </div>
        </div>
      `
    }
  ];
  const slide = slides[whyIndex];
  return `
    <section class="screen page-shell">
      <div class="page-head animate-slide-up">
        <div class="page-num">${slide.num}</div>
        <div>
          <h2 style="font-size:56px;font-weight:300;color:var(--accent);margin-bottom:8px">${slide.title}</h2>
          <div class="eyebrow">${slide.subtitle}</div>
        </div>
      </div>
      <div class="split" style="flex-direction:${whyIndex === 0 ? "row" : "row-reverse"}">
        ${frame(slide.image, slide.title, "animate-slide-up delay-200")}
        <div class="why-content">${slide.body}</div>
      </div>
      <div class="nav-footer animate-slide-up delay-600">
        ${button("← 返回首頁", 0)}
        <div class="nav-group">
          ${whyIndex > 0 ? `<button class="btn" type="button" data-why="0">← 上一頁</button>` : ""}
          ${whyIndex < slides.length - 1 ? `<button class="btn primary" type="button" data-why="1">下一頁 →</button>` : button("了解產品介紹 →", 2, "primary")}
        </div>
      </div>
    </section>
  `;
}

function whatPage() {
  return `
    <section class="screen page-shell">
      ${pageHead("02", "什麼是智慧電動車平台產品", "WHAT IS SMART EV PLATFORM")}
      <div class="overview-grid">
        <div class="overview-row">
          <button class="overview-card glass" type="button" data-tab="21">
            <h3>三大智慧應用</h3>
            <p>AI 智慧駕駛、AI 智慧座艙 與 AI 智慧助理。</p>
            <div class="more">了解更多 →</div>
          </button>
          <button class="overview-card glass" type="button" data-tab="22">
            <h3>Agentic AI</h3>
            <p>OEM 應用 AI Agent，加速智慧應用的量產迭代任務。</p>
            <div class="more">了解更多 →</div>
          </button>
        </div>
        <button class="overview-card glass" type="button" data-tab="23" style="flex:0 0 220px">
          <h3 style="font-size:36px">智慧電動車平台</h3>
          <p style="font-size:18px;max-width:920px;margin:0 auto">對 OEM 開放的平台，專門為客戶進行智駕模型訓練與 Agent 部署，讓客戶在保有技術核心與 Data 主權的同時，也可以在量產後持續進化智駕功能。</p>
          <div class="more">了解更多 →</div>
        </button>
      </div>
      <div class="nav-footer">
        ${button("← 回首頁", 0)}
        ${button("大模型應用 →", 21, "primary")}
      </div>
    </section>
  `;
}

function applicationsPage() {
  const items = [
    ["AI 智慧駕駛", "ai_driving_viz.png", "感知、判斷、控制一體的AI智駕，持續從真實場景中學習與進化"],
    ["AI 智慧座艙", "ai_cockpit_viz.png", "由 AI 驅動的沉浸式體驗，根據用戶的習慣與當下情境提供個人化需求"],
    ["AI 智慧助理", "ai_assistant_viz.png", "愈開愈懂你的 AI 助理，像個貼心助手陪伴每一次出行"]
  ];
  return `
    <section class="screen page-shell">
      ${pageHead("02.1", "三大智慧應用", "THREE CORE SMART APPLICATIONS")}
      <div class="apps-grid">
        ${items.map(([name, image, detail], index) => `
          <article class="app-card animate-slide-up delay-${200 + index * 100}">
            ${frame(image, name)}
            <h3>${name}</h3>
            <p>${detail}</p>
          </article>
        `).join("")}
      </div>
      <div class="nav-footer animate-slide-up delay-600">
        ${button("← 回首頁", 0)}
        <div class="nav-group">
          ${button("← 上一頁", 2)}
          ${button("Agentic AI →", 22, "primary")}
        </div>
      </div>
    </section>
  `;
}

function agenticPage() {
  const cards = [
    ["search", "極端場景挖掘", "AI Agent 自動從海量數據中，找出罕見但關鍵的特殊場景，不需要人工逐筆整理"],
    ["simulate", "高擬真模擬生成", "以生成式 AI 重建高擬真場景，大幅降低實車測試成本與週期"],
    ["chip", "邊緣算力優化", "精準除錯與優化：大模型自動找出問題、修正 與 優化，持續提升用戶體驗"]
  ];
  return `
    <section class="screen page-shell">
      ${pageHead("02.2", "Agentic AI 加速量產迭代", "ACCELERATING PRODUCTION ITERATION")}
      <div class="split">
        ${frame("agent_iteration_viz.png", "Agentic AI Iteration", "animate-slide-up delay-200")}
        <div style="flex:1.2">
          <div class="agent-grid">
            ${cards.map(([iconName, title, detail], index) => `
              <article class="agent-card glass ${index === 2 ? "wide" : ""} animate-slide-up delay-${200 + index * 100}">
                ${icon(iconName)}
                <h4>${title}</h4>
                <p>${detail}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="nav-footer">
        ${button("← 回首頁", 0)}
        <div class="nav-group">
          ${button("← 上一頁", 21)}
          ${button("智慧電動車平台 →", 23, "primary")}
        </div>
      </div>
    </section>
  `;
}

function platformPage() {
  const items = [
    ["1", "數據閉環管理", "車端數據自動回傳、篩選與結構化處理"],
    ["2", "雲端大模型訓練", "大規模算力加速模型優化，並用 AIGC生成場景"],
    ["3", "OTA 無縫下發", "優化後的模型通過 OTA 回傳車端，實現能力進階"]
  ];
  return `
    <section class="screen page-shell">
      ${pageHead("02.3", "從車端到雲端，再回到車端", "CLOSED-LOOP DATA INTELLIGENCE")}
      <div class="split">
        ${frame("cloud_loop_viz.png", "Cloud Intelligence Loop", "animate-slide-up delay-200")}
        <div class="loop-list">
          ${items.map(([num, title, detail], index) => `
            <div class="loop-item animate-slide-up delay-${200 + index * 100}">
              <div class="loop-num">${num}</div>
              <div>
                <h4>${title}</h4>
                <p>${detail}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="nav-footer">
        ${button("← 回首頁", 0)}
        <div class="nav-group">
          ${button("← 上一頁", 22)}
          ${button("平台運作 →", 3, "primary")}
        </div>
      </div>
    </section>
  `;
}

function dataFlowMarkup() {
  return `
    <div class="flow-wrap animate-slide-up delay-500">
      <div id="token-meter" class="token-meter glass">
        <div class="token-label">Token Consumed</div>
        <div id="token-value" class="token-value">0</div>
        <div class="token-sub">CUMULATIVE</div>
        <div id="token-bars" class="token-bars">
          ${[0.2, 0.4, 0.55, 0.7, 0.85, 1].map((height) => `<i style="height:${height * 32}px"></i>`).join("")}
        </div>
      </div>
      <svg class="flow-svg" viewBox="0 0 950 380" aria-label="車端、資料平台、AI 訓練與 OTA 線上更新的資料循環示意">
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--accent-2)"></polygon>
          </marker>
        </defs>
        <path id="token-path" d="M 160,66 L 310,66" fill="none" stroke="rgba(77,214,255,0.25)" stroke-width="1.5" stroke-dasharray="5 5"></path>
        <text id="token-label-svg" x="235" y="58" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)" font-size="12">Token對話</text>
        <path id="regq-path" d="M 680,66 L 790,66" fill="none" stroke="rgba(77,214,255,0.25)" stroke-width="1.5" stroke-dasharray="5 5"></path>
        <text id="regq-label-svg" x="735" y="58" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)" font-size="12">車規查詢</text>
        <path id="rega-path" d="M 790,180 L 740,180" fill="none" stroke="rgba(77,214,255,0.25)" stroke-width="1.5" stroke-dasharray="5 5"></path>
        <text id="rega-label-svg" x="765" y="170" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)" font-size="12">車規稽核</text>

        ${flowBox("ai-box", 310, 15, 370, 102, "AI 調度")}
        <rect x="325" y="55" width="155" height="45" rx="5" fill="rgba(77,214,255,0.07)" stroke="rgba(77,214,255,0.28)"></rect>
        <text x="402" y="83" text-anchor="middle" fill="var(--ink)" font-family="var(--font-serif)" font-size="15">大模型</text>
        <rect x="510" y="55" width="155" height="45" rx="5" fill="rgba(77,214,255,0.07)" stroke="rgba(77,214,255,0.28)"></rect>
        <text x="587" y="83" text-anchor="middle" fill="var(--ink)" font-family="var(--font-serif)" font-size="15">Agent 代理</text>

        ${flowBox("car-box", 5, 45, 155, 270, "車輛應用")}
        <text x="82.5" y="105" text-anchor="middle" fill="var(--muted)" font-family="var(--font-serif)" font-size="14">智慧座艙</text>
        <text x="82.5" y="133" text-anchor="middle" fill="var(--muted)" font-family="var(--font-serif)" font-size="14">智慧助理</text>
        <text x="82.5" y="161" text-anchor="middle" fill="var(--muted)" font-family="var(--font-serif)" font-size="14">智慧駕駛</text>
        <rect x="17" y="215" width="131" height="70" rx="5" fill="rgba(77,214,255,0.06)" stroke="rgba(77,214,255,0.28)"></rect>
        <text x="82.5" y="259" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)" font-size="13">Vehicle</text>

        ${flowBox("plat-box", 250, 140, 490, 190, "車用資料平台")}
        ${flowBox("dm-box", 270, 185, 185, 130, "資料管理")}
        ${flowBox("ait-box", 535, 185, 185, 130, "AI 訓練")}
        ${flowBox("comp-box", 790, 45, 155, 270, "合法合規")}
        <text x="867.5" y="125" text-anchor="middle" fill="var(--muted)" font-family="var(--font-serif)" font-size="14">各國法規</text>
        <text x="867.5" y="165" text-anchor="middle" fill="var(--muted)" font-family="var(--font-serif)" font-size="14">資訊安全</text>
        <text x="867.5" y="205" text-anchor="middle" fill="var(--muted)" font-family="var(--font-serif)" font-size="14">功能安全</text>

        ${flowLine("line-step-1", "M 160,180 L 250,180", 90)}
        <text id="label-step-1" x="205" y="164" text-anchor="middle" fill="var(--accent-2)" font-family="var(--font-mono)" font-size="13" opacity="0">資料採集</text>
        ${flowLine("line-step-3", "M 455,250 L 535,250", 80)}
        <text id="label-step-3" x="495" y="234" text-anchor="middle" fill="var(--accent-2)" font-family="var(--font-mono)" font-size="13" opacity="0">資料流</text>
        ${flowLine("line-step-5up", "M 485,140 L 485,117", 30)}
        ${flowLine("line-step-5dn", "M 505,117 L 505,140", 30)}
        <text id="label-step-5" x="530" y="134" fill="var(--accent-2)" font-family="var(--font-mono)" font-size="13" opacity="0">模型迭代</text>
        ${flowLine("line-step-6", "M 627.5,330 L 627.5,365 L 80,365 L 80,315", 620)}
        <text id="label-step-6" x="330" y="355" fill="var(--accent-2)" font-family="var(--font-mono)" font-size="13" opacity="0">線上更新</text>
        <text id="dm-on" x="362.5" y="171" text-anchor="middle" fill="var(--accent-2)" font-family="var(--font-mono)" font-size="12" opacity="0">✓ 資料管理啟動</text>
        <text id="ait-on" x="627.5" y="171" text-anchor="middle" fill="var(--accent-2)" font-family="var(--font-mono)" font-size="12" opacity="0">✓ AI 訓練中</text>
      </svg>
      <div id="step-dots" class="step-dots">
        ${[1, 2, 3, 4, 5, 6].map(() => "<span></span>").join("")}
      </div>
    </div>
  `;
}

function flowBox(id, x, y, w, h, label) {
  return `
    <g id="${id}" class="flow-box">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" ry="5" fill="rgba(9,24,40,0.68)" stroke="rgba(77,214,255,0.35)" stroke-width="1"></rect>
      <text x="${x + w / 2}" y="${y + 24}" text-anchor="middle" fill="var(--ink)" font-size="16" font-weight="700">${label}</text>
    </g>
  `;
}

function flowLine(id, d, length) {
  return `<path id="${id}" d="${d}" data-length="${length}" fill="none" stroke="var(--accent-2)" stroke-width="2" marker-end="url(#arr)" style="stroke-dasharray:${length};stroke-dashoffset:${length};opacity:0"></path>`;
}

function howPage() {
  return `
    <section class="screen page-shell">
      ${pageHead("03", "數據循環，驅動進化，創造收益", "HOW IT WORKS & VALUE", true)}
      <div class="how-intro animate-slide-up delay-300">
        <p>車輛持續回傳數據，智慧平台進行 AI 訓練與模型迭代。</p>
        <p>訓練完成後，透過 OTA 線上更新，讓每台車越來越聰明。</p>
      </div>
      <div style="flex:1;display:flex;align-items:center">
        ${dataFlowMarkup()}
      </div>
      <div class="nav-footer animate-slide-up delay-700">
        ${button("← 回首頁", 0)}
        <div class="nav-group">
          ${button("← 上一頁", 23)}
          ${button("OEM 真正得到什麼 →", 31, "primary")}
        </div>
      </div>
    </section>
  `;
}

function valuePage() {
  const values = [
    ["數據主權", "掌控核心數據與模型，確保技術資產安全。"],
    ["持續演進", "量產後透過 OTA 實現功能進階與性能優化。"],
    ["加速迭代", "利用 Agentic AI 大幅縮短從研發到上車的週期。"],
    ["技術自主", "建立自主研發鏈，擺脫供應商鎖定，掌控未來方向。"]
  ];
  return `
    <section class="screen page-shell">
      ${pageHead("03.1", "OEM 真正得到什麼", "WHAT OEM REALLY GAINS")}
      <div class="split">
        <div style="flex:1.2;display:flex;justify-content:center" class="animate-slide-up delay-200">
          <div class="image-frame" style="width:100%;max-width:650px;aspect-ratio:1/1">
            <img src="${ASSET}value_prop_grid.png" alt="Value Proposition Grid" loading="lazy" />
          </div>
        </div>
        <div style="flex:1">
          <div class="animate-slide-up delay-300" style="margin-bottom:40px">
            <h3 style="font-size:28px;color:var(--accent);font-weight:300;margin-bottom:24px">從產品交付到平台共生</h3>
            <div class="value-list">
              ${values.map(([title, detail]) => `
                <div>
                  <span class="value-dot"></span>
                  <span><strong>${title}：</strong>${detail}</span>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="callout glass animate-slide-up delay-400">
            <div class="check-mark">✓</div>
            <p>每一台 <span>Foxconn inside</span> 的車輛，都將越開越聰明。</p>
          </div>
        </div>
      </div>
      <div class="nav-footer">
        ${button("← 回首頁", 0)}
        <div class="nav-group">
          ${button("← 上一頁", 3)}
          ${button("結語展望：越開越聰明 →", 32, "primary")}
        </div>
      </div>
    </section>
  `;
}

function closingPage() {
  return `
    <section class="screen closing">
      <div class="closing-main">
        <div class="closing-copy">
          <div class="animate-slide-up">
            <h1>越開越聰明</h1>
            <p>每一台 <span>Foxconn inside</span> 的車輛，<br />都將越開越聰明。</p>
          </div>
        </div>
        <div class="closing-img animate-slide-up delay-200">
          <img src="${ASSET}closing_vision_viz.png" alt="Future Vision" />
        </div>
      </div>
      <div class="nav-footer" style="margin:0 100px 56px">
        ${button("← 返回首頁", 0)}
        <div class="nav-group">
          ${button("← 上一頁", 31)}
          ${button("重新體驗智慧旅程 →", 1, "primary")}
        </div>
      </div>
    </section>
  `;
}

class DataFlow {
  constructor(root) {
    this.root = root;
    this.step = 0;
    this.target = 0;
    this.displayed = 0;
    this.timer = null;
    this.counter = null;
    this.durations = [0, 1000, 700, 900, 700, 1100, 1400];
    this.pause = 5000;
    this.tokens = [0, 120000, 45000, 380000, 95000, 1850000, 350000];
    this.start();
  }

  start() {
    this.advance();
  }

  stop() {
    clearTimeout(this.timer);
    clearInterval(this.counter);
  }

  advance() {
    clearTimeout(this.timer);
    if (this.step === 0) {
      this.timer = setTimeout(() => this.setStep(1), 400);
      return;
    }
    if (this.step >= 1 && this.step <= 6) {
      this.addTokens(this.tokens[this.step]);
      const next = this.step < 6 ? this.step + 1 : 7;
      this.timer = setTimeout(() => this.setStep(next), this.durations[this.step]);
      return;
    }
    this.timer = setTimeout(() => this.setStep(0), this.pause);
  }

  setStep(step) {
    this.step = step;
    this.update();
    this.advance();
  }

  addTokens(amount) {
    this.target += amount;
    clearInterval(this.counter);
    if (this.displayed === this.target) return;
    const diff = this.target - this.displayed;
    const inc = Math.ceil(diff / 30);
    this.counter = setInterval(() => {
      this.displayed = Math.min(this.displayed + inc, this.target);
      this.setText("token-value", formatNumber(this.displayed));
      if (this.displayed >= this.target) clearInterval(this.counter);
    }, 30);
  }

  update() {
    const active = (n) => this.step !== 0 && this.step >= n;
    const hot = (n) => this.step === n;
    ["car-box", "dm-box", "ait-box", "ai-box"].forEach((id) => this.box(id, false));
    this.box("car-box", active(1) || active(6));
    this.box("dm-box", active(2));
    this.box("ait-box", active(4));
    this.box("ai-box", active(5));
    this.line("line-step-1", active(1), this.durations[1] / 1000);
    this.line("line-step-3", active(3), this.durations[3] / 1000);
    this.line("line-step-5up", active(5), this.durations[5] / 2000);
    this.line("line-step-5dn", active(5), this.durations[5] / 2000);
    this.line("line-step-6", active(6), this.durations[6] / 1000);
    this.visible("label-step-1", active(1));
    this.visible("label-step-3", active(3));
    this.visible("label-step-5", active(5));
    this.visible("label-step-6", active(6));
    this.visible("dm-on", active(2));
    this.visible("ait-on", active(4));
    ["token-path", "regq-path"].forEach((id) => this.dash(id, active(5)));
    this.dash("rega-path", active(4));
    ["token-label-svg", "regq-label-svg"].forEach((id) => this.svgFill(id, active(5)));
    this.svgFill("rega-label-svg", active(4));
    const meter = this.root.querySelector("#token-meter");
    meter?.classList.toggle("hot", this.step >= 1 && this.step <= 6);
    this.root.querySelectorAll("#token-bars i").forEach((bar, index) => {
      bar.classList.toggle("on", index < (this.step === 0 ? 0 : Math.min(this.step, 6)));
    });
    this.root.querySelectorAll("#step-dots span").forEach((dot, index) => {
      const n = index + 1;
      dot.classList.toggle("on", active(n));
      dot.classList.toggle("hot", hot(n));
    });
  }

  box(id, on) {
    const rect = this.root.querySelector(`#${id} rect`);
    if (!rect) return;
    rect.setAttribute("fill", on ? "rgba(77,214,255,0.12)" : "rgba(9,24,40,0.68)");
    rect.setAttribute("stroke", on ? "var(--accent-2)" : "rgba(77,214,255,0.35)");
    rect.setAttribute("stroke-width", on ? "2" : "1");
    rect.style.filter = on ? "drop-shadow(0 0 7px rgba(119,255,191,0.5))" : "none";
  }

  line(id, on, dur) {
    const line = this.root.querySelector(`#${id}`);
    if (!line) return;
    const length = Number(line.dataset.length);
    line.style.opacity = on ? "1" : "0";
    line.style.strokeDashoffset = on ? "0" : String(length);
    line.style.transition = on
      ? `stroke-dashoffset ${dur}s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease`
      : "stroke-dashoffset 0s, opacity 0s";
  }

  dash(id, on) {
    const path = this.root.querySelector(`#${id}`);
    if (!path) return;
    path.setAttribute("stroke", on ? "var(--accent-2)" : "rgba(77,214,255,0.25)");
    path.style.animation = on ? "dashFlow 0.5s linear infinite" : "none";
  }

  visible(id, on) {
    const el = this.root.querySelector(`#${id}`);
    if (el) el.setAttribute("opacity", on ? "1" : "0");
  }

  svgFill(id, on) {
    const el = this.root.querySelector(`#${id}`);
    if (el) el.setAttribute("fill", on ? "var(--accent-2)" : "var(--muted)");
  }

  setText(id, text) {
    const el = this.root.querySelector(`#${id}`);
    if (el) el.textContent = text;
  }
}

function formatNumber(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} K`;
  return String(value);
}

function render() {
  flowController?.stop();
  flowController = null;
  const content = {
    0: homePage,
    1: whyPage,
    2: whatPage,
    3: howPage,
    21: applicationsPage,
    22: agenticPage,
    23: platformPage,
    31: valuePage,
    32: closingPage
  }[activeTab]?.() ?? homePage();

  app.innerHTML = `
    <div class="viewport">
      <main class="stage" style="--stage-scale:${scale}">
        ${content}
        ${rail()}
      </main>
    </div>
  `;

  app.querySelectorAll("[data-tab]").forEach((el) => {
    el.addEventListener("click", () => setActiveTab(Number(el.dataset.tab)));
  });
  app.querySelectorAll("[data-why]").forEach((el) => {
    el.addEventListener("click", () => setWhyIndex(Number(el.dataset.why)));
  });
  if (activeTab === 3) {
    flowController = new DataFlow(app);
  }
}

function resize() {
  scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1) * 0.985;
  const stage = app.querySelector(".stage");
  if (stage) stage.style.setProperty("--stage-scale", scale);
}

window.addEventListener("resize", resize);
resize();
render();
