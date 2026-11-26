const STORAGE_FAV_KEY = "mhshub_favorites_v1";
const STORAGE_CUSTOM_KEY = "mhshub_custom_sites_v1";

const DEFAULT_SITES = [
  {
    id: "scholar",
    name: "Google Scholar",
    domain: "scholar.google.com",
    url: "https://scholar.google.com",
    category: "riset",
    categoryLabel: "Riset & Jurnal",
    desc: "Mesin pencari jurnal ilmiah, prosiding, tesis, dan kutipan akademik lintas disiplin ilmu.",
    tags: ["jurnal", "skripsi", "sitasi", "referensi"]
  },
  {
    id: "connected-papers",
    name: "Connected Papers",
    domain: "connectedpapers.com",
    url: "https://www.connectedpapers.com",
    category: "riset",
    categoryLabel: "Riset & Jurnal",
    desc: "Peta visual keterkaitan antar-paper ilmiah untuk menemukan literatur inti dan penelitian terbaru.",
    tags: ["literature review", "skripsi", "peta jurnal"]
  },
  {
    id: "research-rabbit",
    name: "ResearchRabbit",
    domain: "researchrabbit.ai",
    url: "https://www.researchrabbit.ai",
    category: "riset",
    categoryLabel: "Riset & Jurnal",
    desc: "Asisten penelusuran pustaka berbasis jaringan sitasi dan rekomendasi penulis terkait.",
    tags: ["riset", "koleksi paper", "skripsi"]
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    domain: "semanticscholar.org",
    url: "https://www.semanticscholar.org",
    category: "riset",
    categoryLabel: "Riset & Jurnal",
    desc: "Pencarian literatur akademik berbantuan AI dengan ringkasan cepat (TLDR) dan metrik dampak sitasi.",
    tags: ["ai riset", "paper", "ringkasan"]
  },
  {
    id: "zotero",
    name: "Zotero / Mendeley",
    domain: "zotero.org",
    url: "https://www.zotero.org",
    category: "riset",
    categoryLabel: "Riset & Jurnal",
    desc: "Manajer referensi gratis untuk menyimpan PDF dan menyisipkan daftar pustaka otomatis (APA, IEEE, dll.).",
    tags: ["daftar pustaka", "sitasi", "skripsi", "word"]
  },
  {
    id: "notion",
    name: "Notion",
    domain: "notion.so",
    url: "https://www.notion.so",
    category: "catatan",
    categoryLabel: "Catatan & Kolaborasi",
    desc: "Workspace terpadu untuk jadwal kuliah, tracker tugas, database bacaan, dan wiki organisasi.",
    tags: ["catatan", "jadwal", "produktivitas"]
  },
  {
    id: "gdrive",
    name: "Google Workspace (Docs & Sheets)",
    domain: "drive.google.com",
    url: "https://drive.google.com",
    category: "catatan",
    categoryLabel: "Catatan & Kolaborasi",
    desc: "Penyimpanan cloud, kolaborasi laporan kelompok secara real-time, dan pengolahan data spreadsheet.",
    tags: ["kolaborasi", "dokumen", "cloud"]
  },
  {
    id: "obsidian",
    name: "Obsidian",
    domain: "obsidian.md",
    url: "https://obsidian.md",
    category: "catatan",
    categoryLabel: "Catatan & Kolaborasi",
    desc: "Aplikasi catatan berbasis Markdown dengan tautan dua arah untuk membangun basis pengetahuan kuliah.",
    tags: ["markdown", "second brain", "ringkasan"]
  },
  {
    id: "grammarly",
    name: "Grammarly",
    domain: "grammarly.com",
    url: "https://www.grammarly.com",
    category: "penulisan",
    categoryLabel: "Penulisan & Presentasi",
    desc: "Pemeriksa tata bahasa Inggris, kejelasan kalimat, dan gaya penulisan abstrak maupun esai.",
    tags: ["abstrak", "bahasa inggris", "grammar"]
  },
  {
    id: "canva",
    name: "Canva",
    domain: "canva.com",
    url: "https://www.canva.com",
    category: "penulisan",
    categoryLabel: "Penulisan & Presentasi",
    desc: "Desain slide presentasi sidang/kelas, poster ilmiah, infografis, dan CV modern.",
    tags: ["presentasi", "poster", "cv", "desain"]
  },
  {
    id: "overleaf",
    name: "Overleaf (LaTeX)",
    domain: "overleaf.com",
    url: "https://www.overleaf.com",
    category: "penulisan",
    categoryLabel: "Penulisan & Presentasi",
    desc: "Editor LaTeX online kolaboratif untuk laporan teknik, persamaan matematika, dan template jurnal.",
    tags: ["latex", "skripsi", "rumus", "teknik"]
  },
  {
    id: "github",
    name: "GitHub & GitHub Pages",
    domain: "github.com",
    url: "https://github.com",
    category: "teknis",
    categoryLabel: "Coding, Data & Skill",
    desc: "Hosting kode proyek kuliah, kontrol versi Git, portofolio developer, serta GitHub Student Developer Pack.",
    tags: ["coding", "portofolio", "git", "website"]
  },
  {
    id: "kaggle",
    name: "Kaggle",
    domain: "kaggle.com",
    url: "https://www.kaggle.com",
    category: "teknis",
    categoryLabel: "Coding, Data & Skill",
    desc: "Ribuan dataset terbuka, notebook Python/R gratis di cloud, dan kompetisi data science.",
    tags: ["dataset", "python", "data science", "skripsi"]
  },
  {
    id: "dicoding",
    name: "Dicoding / Coursera",
    domain: "dicoding.com",
    url: "https://www.dicoding.com",
    category: "teknis",
    categoryLabel: "Coding, Data & Skill",
    desc: "Platform pembelajaran terstruktur dan sertifikasi kompetensi digital untuk menambah portofolio.",
    tags: ["kursus", "sertifikat", "skill"]
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    domain: "linkedin.com",
    url: "https://www.linkedin.com",
    category: "karier",
    categoryLabel: "Karier, Magang & Beasiswa",
    desc: "Jejaring profesional untuk membangun personal branding, koneksi alumni, dan mencari lowongan magang.",
    tags: ["magang", "networking", "karier", "cv"]
  },
  {
    id: "glints",
    name: "Glints & Kalibrr",
    domain: "glints.com",
    url: "https://glints.com/id",
    category: "karier",
    categoryLabel: "Karier, Magang & Beasiswa",
    desc: "Portal lowongan magang (internship), kerja paruh waktu, dan posisi entry-level di Indonesia.",
    tags: ["internship", "lowongan", "fresh graduate"]
  },
  {
    id: "lpdp",
    name: "Beasiswa LPDP & Kemdiktisaintek",
    domain: "lpdp.kemenkeu.go.id",
    url: "https://lpdp.kemenkeu.go.id",
    category: "karier",
    categoryLabel: "Karier, Magang & Beasiswa",
    desc: "Portal resmi informasi pendanaan studi lanjut, riset, dan program pengembangan mahasiswa.",
    tags: ["beasiswa", "studi lanjut", "pendanaan"]
  }
];

const WORKFLOWS = {
  skripsi: [
    "Cari 5–10 jurnal utama di <strong>Google Scholar</strong> atau <strong>Semantic Scholar</strong>.",
    "Petakan penelitian terdahulu & gap riset menggunakan <strong>Connected Papers</strong>.",
    "Simpan semua PDF dan kelola sitasi otomatis dengan <strong>Zotero</strong>.",
    "Tulis draf di <strong>Google Docs</strong> atau <strong>Overleaf (LaTeX)</strong>, lalu cek abstrak Inggris di <strong>Grammarly</strong>."
  ],
  tugas: [
    "Catat tenggat & pembagian tugas kelompok di <strong>Notion</strong>.",
    "Kerjakan dokumen atau analisis data bersama di <strong>Google Drive / Kaggle</strong>.",
    "Susun slide presentasi yang ringkas dan visual menggunakan <strong>Canva</strong>."
  ],
  karier: [
    "Simpan proyek kuliah dan kode terbaik di <strong>GitHub</strong> sebagai bukti portofolio.",
    "Perbarui profil <strong>LinkedIn</strong> dan CV satu halaman di <strong>Canva</strong>.",
    "Lamar posisi magang relevan melalui <strong>LinkedIn</strong> dan <strong>Glints</strong>."
  ]
};

const state = {
  category: "all",
  search: "",
  favoritesOnly: false,
  favorites: JSON.parse(localStorage.getItem(STORAGE_FAV_KEY) || "[]"),
  customSites: JSON.parse(localStorage.getItem(STORAGE_CUSTOM_KEY) || "[]"),
  workflow: "skripsi"
};

function getAllSites() {
  return [...state.customSites, ...DEFAULT_SITES];
}

function saveFavorites() {
  localStorage.setItem(STORAGE_FAV_KEY, JSON.stringify(state.favorites));
}

function saveCustomSites() {
  localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(state.customSites));
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((item) => item !== id);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  render();
}

function deleteCustomSite(id) {
  state.customSites = state.customSites.filter((s) => s.id !== id);
  state.favorites = state.favorites.filter((fid) => fid !== id);
  saveCustomSites();
  saveFavorites();
  render();
}

function renderWorkflow() {
  const list = document.getElementById("workflow-steps");
  const steps = WORKFLOWS[state.workflow] || [];
  list.innerHTML = steps.map((step) => `<li>${step}</li>`).join("");
}

function render() {
  document.getElementById("fav-count").textContent = state.favorites.length;

  const q = state.search.trim().toLowerCase();
  const filtered = getAllSites().filter((site) => {
    if (state.favoritesOnly && !state.favorites.includes(site.id)) return false;
    if (state.category !== "all" && site.category !== state.category) return false;
    if (!q) return true;
    const hay = `${site.name} ${site.domain} ${site.desc} ${site.categoryLabel} ${(site.tags || []).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  document.getElementById("result-count").textContent = `Menampilkan ${filtered.length} platform`;
  const grid = document.getElementById("cards-grid");

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="card"><p class="muted">Tidak ada website yang cocok dengan filter/pencarian saat ini. Coba ubah kata kunci atau klik Reset.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map((site) => {
    const isFav = state.favorites.includes(site.id);
    const tagsHtml = (site.tags || []).map((t) => `<span class="tag">#${t}</span>`).join("");
    const deleteBtn = site.isCustom
      ? `<button type="button" class="ghost-btn" data-del="${site.id}" title="Hapus tautan kustom">🗑️</button>`
      : "";

    return `
      <article class="site-card">
        <div>
          <div class="site-top">
            <span class="cat-badge">${site.categoryLabel}</span>
            <button type="button" class="fav-btn" data-fav="${site.id}" title="Simpan ke Favorit">${isFav ? "⭐" : "☆"}</button>
          </div>
          <h3 class="site-title">${site.name}</h3>
          <div class="site-domain">${site.domain}</div>
        </div>
        <p class="site-desc">${site.desc}</p>
        <div class="tag-list">${tagsHtml}</div>
        <div class="card-footer">
          <a class="visit-link" href="${site.url}" target="_blank" rel="noopener noreferrer">Buka Website ↗</a>
          ${deleteBtn}
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", () => toggleFavorite(btn.dataset.fav));
  });

  grid.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => deleteCustomSite(btn.dataset.del));
  });

  renderWorkflow();
}

// Event listeners
document.getElementById("search-input").addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

document.getElementById("btn-bookmarks-only").addEventListener("click", (e) => {
  state.favoritesOnly = !state.favoritesOnly;
  e.currentTarget.classList.toggle("active", state.favoritesOnly);
  render();
});

document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    state.category = pill.dataset.cat;
    render();
  });
});

document.querySelectorAll(".preset-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const preset = btn.dataset.preset;
    const searchInput = document.getElementById("search-input");
    state.favoritesOnly = false;
    document.getElementById("btn-bookmarks-only").classList.remove("active");

    if (preset === "skripsi") {
      state.category = "all";
      state.search = "skripsi";
      searchInput.value = "skripsi";
    } else if (preset === "coding") {
      state.category = "teknis";
      state.search = "";
      searchInput.value = "";
    } else if (preset === "karier") {
      state.category = "karier";
      state.search = "";
      searchInput.value = "";
    } else {
      state.category = "all";
      state.search = "";
      searchInput.value = "";
    }

    document.querySelectorAll(".pill").forEach((p) => {
      p.classList.toggle("active", p.dataset.cat === state.category);
    });
    render();
  });
});

document.querySelectorAll(".wf-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".wf-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.workflow = btn.dataset.wf;
    renderWorkflow();
  });
});

document.getElementById("custom-site-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("custom-name").value.trim();
  const url = document.getElementById("custom-url").value.trim();
  const category = document.getElementById("custom-cat").value;
  const desc = document.getElementById("custom-desc").value.trim();
  if (!name || !url || !desc) return;

  const catNames = {
    riset: "Riset & Jurnal",
    catatan: "Catatan & Kolaborasi",
    penulisan: "Penulisan & Presentasi",
    teknis: "Coding, Data & Skill",
    karier: "Karier, Magang & Beasiswa"
  };

  let domain = url;
  try {
    domain = new URL(url).hostname;
  } catch (_) {}

  state.customSites.unshift({
    id: `custom-${Date.now()}`,
    name,
    domain,
    url,
    category,
    categoryLabel: catNames[category] || "Kustom",
    desc,
    tags: ["kustom", "kampus"],
    isCustom: true
  });

  saveCustomSites();
  e.target.reset();
  render();
});

render();
