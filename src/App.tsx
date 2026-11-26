/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, Star, Trash2, ExternalLink, Plus, BookOpen, 
  FileText, Code2, Briefcase, GraduationCap, CheckCircle2, RotateCcw, Sparkles, Flame, BarChart2,
  PenTool, Download, Printer, Copy, RefreshCw, Send, Check, ShieldCheck, X, Maximize2, Minimize2,
  Library, BookMarked, Eye
} from 'lucide-react';

interface Site {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  categoryLabel: string;
  desc: string;
  tags?: string[];
  isCustom?: boolean;
}

interface WhiteboardDoc {
  id: string;
  title: string;
  section: string;
  content: string;
  updatedAt: number;
}

interface LibraryBook {
  id: string;
  title: string;
  faculty: string;
  pages: number;
  desc: string;
  topics: string[];
  pdfPath: string;
}

const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "lib-teknik",
    title: "Panduan Pembelajaran Fakultas Teknik",
    faculty: "Fakultas Teknik",
    pages: 11,
    desc: "Buku pegangan umum untuk mahasiswa teknik mengenai dasar matematika, fisika, metode berpikir rekayasa, peta program studi (Sipil, Mesin, Elektro, Informatika, Industri, Kimia, Arsitektur), praktikum, dan keselamatan kerja.",
    topics: ["Matematika Teknik", "Metode Rekayasa", "Teknik Sipil & Mesin", "Keselamatan Lab"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_Fakultas_Teknik_197ee351.pdf"
  },
  {
    id: "lib-fmipa",
    title: "Panduan Pembelajaran FMIPA (Sains & Matematika)",
    faculty: "FMIPA",
    pages: 15,
    desc: "Peta belajar lintas bidang sains mencakup logika matematika, statistika & analisis data, fisika dasar, kimia, biologi, ilmu komputer, dan metode ilmiah.",
    topics: ["Matematika", "Statistika", "Fisika & Kimia", "Metode Ilmiah"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_FMIPA_Lengkap_0bf9cc55.pdf"
  },
  {
    id: "lib-pertanian",
    title: "Panduan Pembelajaran Fakultas Pertanian",
    faculty: "Fakultas Pertanian",
    pages: 18,
    desc: "Panduan komprehensif ilmu tanaman, tanah dan kesuburan, agronomi, hortikultura, pemuliaan tanaman, perlindungan tanaman (PHT), irigasi, agribisnis, dan pertanian berkelanjutan.",
    topics: ["Agronomi", "Ilmu Tanah", "Agribisnis", "Perlindungan Tanaman"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_Fakultas_Pertanian_Lengkap_b071b6b0.pdf"
  },
  {
    id: "lib-ilkom",
    title: "Panduan Lengkap Ilmu Komputer & Teknologi Informasi",
    faculty: "Ilmu Komputer & TI",
    pages: 18,
    desc: "Materi pengantar lengkap dari dasar hingga praktik: sistem digital, pemrograman Python, algoritma & struktur data, basis data SQL, pengembangan web, keamanan siber, dan AI.",
    topics: ["Pemrograman", "Algoritma & Struktur Data", "Basis Data SQL", "Keamanan Siber & AI"],
    pdfPath: "/assets/aistudio/Panduan_Lengkap_Ilmu_Komputer_Teknologi_Informasi_52e8a22a.pdf"
  },
  {
    id: "lib-peternakan",
    title: "Panduan Pembelajaran Fakultas Peternakan",
    faculty: "Fakultas Peternakan",
    pages: 10,
    desc: "Materi pengantar ilmu peternakan, nutrisi & teknologi pakan, genetika & pemuliaan ternak, kesehatan & kesejahteraan hewan, manajemen agribisnis peternakan, dan One Health.",
    topics: ["Nutrisi Pakan", "Kesehatan Ternak", "Agribisnis Peternakan", "One Health"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_Fakultas_Peternakan_53930f95.pdf"
  },
  {
    id: "lib-kehutanan",
    title: "Panduan Pembelajaran Kehutanan",
    faculty: "Fakultas Kehutanan",
    pages: 9,
    desc: "Materi ilmu kehutanan, ekologi hutan, silvikultur, inventarisasi & pengukuran hutan, pengelolaan hutan lestari, konservasi, sosial kehutanan, dan teknologi pemetaan GIS.",
    topics: ["Ekologi Hutan", "Silvikultur", "Inventarisasi Hutan", "Sosial Kehutanan"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_Kehutanan_Lengkap_831b6a56.pdf"
  },
  {
    id: "lib-perikanan",
    title: "Panduan Pembelajaran Perikanan & Ilmu Kelautan",
    faculty: "FPIK",
    pages: 10,
    desc: "Biologi perairan & oseanografi, ekologi perairan, akuakultur (budidaya), teknologi penangkapan ikan, pengelolaan sumber daya & konservasi, serta teknologi hasil perikanan.",
    topics: ["Oseanografi", "Akuakultur", "Teknologi Tangkap", "Konservasi Pesisir"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_Perikanan_dan_Ilmu_Kelautan_0547cebc.pdf"
  },
  {
    id: "lib-ftp",
    title: "Panduan Pembelajaran Fakultas Teknologi Pertanian",
    faculty: "Teknologi Pertanian (FTP)",
    pages: 9,
    desc: "Penerapan rekayasa untuk penanganan pascapanen, teknologi pangan, agroindustri, bioproses, keamanan pangan (HACCP), dan perancangan alat pertanian.",
    topics: ["Teknologi Pangan", "Pascapanen", "HACCP & Mutu", "Bioproses"],
    pdfPath: "/assets/aistudio/Panduan_Pembelajaran_Fakultas_Teknologi_Pertanian_0848bc76.pdf"
  }
];

const DEFAULT_SITES: Site[] = [
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

const WORKFLOWS: Record<string, string[]> = {
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

const STORAGE_FAV_KEY = "mhshub_favorites_v1";
const STORAGE_CUSTOM_KEY = "mhshub_custom_sites_v1";
const STORAGE_ANALYTICS_KEY = "mhshub_analytics_v1";
const STORAGE_DOCS_KEY = "mhshub_whiteboard_docs_v1";

const INITIAL_DOCS: WhiteboardDoc[] = [
  {
    id: "doc-1",
    title: "Bab 1: Pendahuluan & Latar Belakang",
    section: "Bab 1 Pendahuluan",
    content: `# Bab 1: Pendahuluan\n\n## 1.1 Latar Belakang Masalah\nPerkembangan teknologi informasi dan kecerdasan buatan saat ini telah merambah ke berbagai sektor, termasuk dunia pendidikan tinggi...\n\n## 1.2 Rumusan Masalah\n1. Bagaimana merancang sistem yang efektif?\n2. Seberapa besar peningkatan produktivitas mahasiswa?\n\n## 1.3 Tujuan Penelitian\nMenghasilkan platform terpadu berbasis web yang memudahkan mahasiswa mengakses sumber riset dan alat produktivitas.`,
    updatedAt: Date.now()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"portal" | "whiteboard" | "library">("portal");
  
  // Portal state
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_FAV_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [customSites, setCustomSites] = useState<Site[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_CUSTOM_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [clickCounts, setClickCounts] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_ANALYTICS_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [workflow, setWorkflow] = useState<string>("skripsi");

  // Custom form state
  const [customName, setCustomName] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [customCat, setCustomCat] = useState("riset");
  const [customDesc, setCustomDesc] = useState("");

  // Whiteboard state
  const [docs, setDocs] = useState<WhiteboardDoc[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DOCS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_DOCS;
  });
  const [activeDocId, setActiveDocId] = useState<string>(() => docs[0]?.id || INITIAL_DOCS[0].id);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Focus Mode state
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // AI Checker modal state
  const [auditReport, setAuditReport] = useState<string | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  // Library search state
  const [librarySearch, setLibrarySearch] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(STORAGE_FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(customSites));
  }, [customSites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ANALYTICS_KEY, JSON.stringify(clickCounts));
  }, [clickCounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_DOCS_KEY, JSON.stringify(docs));
  }, [docs]);

  const activeDoc = docs.find(d => d.id === activeDocId) || docs[0] || INITIAL_DOCS[0];

  const updateActiveDoc = (fields: Partial<WhiteboardDoc>) => {
    setDocs(prev => prev.map(d => d.id === activeDoc.id ? { ...d, ...fields, updatedAt: Date.now() } : d));
  };

  const createNewDoc = () => {
    const newDoc: WhiteboardDoc = {
      id: `doc-${Date.now()}`,
      title: "Dokumen Riset Baru",
      section: "Catatan Bebas",
      content: "# Judul Penelitian\n\nTulis catatan, draf bab, atau hasil literature review di sini...",
      updatedAt: Date.now()
    };
    setDocs(prev => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
  };

  const deleteDoc = (id: string) => {
    if (docs.length <= 1) {
      alert("Minimal harus ada 1 dokumen aktif.");
      return;
    }
    const nextDocs = docs.filter(d => d.id !== id);
    setDocs(nextDocs);
    if (activeDocId === id) {
      setActiveDocId(nextDocs[0].id);
    }
  };

  const handleAiAssist = async (action: string, customText?: string) => {
    const promptText = customText || aiPrompt.trim() || activeDoc.content;
    if (!promptText.trim()) {
      alert("Harap isi teks dokumen atau masukkan instruksi untuk AI terlebih dahulu.");
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, action })
      });
      const data = await res.json();
      if (data.text) {
        if (action === 'check') {
          setAuditReport(data.text);
          setIsAuditModalOpen(true);
        } else {
          const appended = `\n\n### 🤖 Bantuan AI (${action.toUpperCase()}):\n${data.text}\n`;
          updateActiveDoc({ content: activeDoc.content + appended });
        }
        if (!customText) setAiPrompt("");
      } else if (data.error) {
        alert("Gagal memproses AI: " + data.error);
      }
    } catch (err: any) {
      alert("Terjadi kesalahan koneksi ke server AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleExportPdf = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${activeDoc.title}</title>
  <style>
    body { font-family: "Times New Roman", Times, Georgia, serif; padding: 50px; line-height: 1.8; color: #111; max-width: 800px; margin: 0 auto; background: #fff; }
    h1 { font-size: 22pt; margin-bottom: 5px; color: #0b1120; border-bottom: 2px solid #0b1120; padding-bottom: 10px; }
    .meta { font-size: 11pt; color: #555; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; }
    .content { white-space: pre-wrap; font-size: 12pt; text-align: justify; }
    .print-bar { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
    .print-btn { background: #0284c7; color: white; border: none; padding: 10px 20px; font-size: 11pt; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .print-btn:hover { background: #0369a1; }
    @media print {
      body { padding: 0; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <strong>Dokumen Siap Cetak / PDF</strong><br/>
      <span style="font-size: 10pt; color: #64748b;">Klik tombol di samping atau tekan Ctrl+P (Cmd+P) untuk menyimpan sebagai PDF.</span>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
  </div>
  <h1>${activeDoc.title}</h1>
  <div class="meta">Bagian: ${activeDoc.section}</div>
  <div class="content">${activeDoc.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeDoc.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([activeDoc.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeDoc.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(activeDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSiteClick = (id: string) => {
    setClickCounts(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: current + 1 };
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const deleteCustomSite = (id: string) => {
    setCustomSites(prev => prev.filter(s => s.id !== id));
    setFavorites(prev => prev.filter(fid => fid !== id));
    setClickCounts(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handlePreset = (preset: string) => {
    setFavoritesOnly(false);
    if (preset === "skripsi") {
      setCategory("all");
      setSearch("skripsi");
    } else if (preset === "coding") {
      setCategory("teknis");
      setSearch("");
    } else if (preset === "karier") {
      setCategory("karier");
      setSearch("");
    } else {
      setCategory("all");
      setSearch("");
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customUrl.trim() || !customDesc.trim()) return;

    let formattedUrl = customUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const catNames: Record<string, string> = {
      riset: "Riset & Jurnal",
      catatan: "Catatan & Kolaborasi",
      penulisan: "Penulisan & Presentasi",
      teknis: "Coding, Data & Skill",
      karier: "Karier, Magang & Beasiswa"
    };

    let domain = formattedUrl;
    try {
      domain = new URL(formattedUrl).hostname;
    } catch {}

    const newSite: Site = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      domain,
      url: formattedUrl,
      category: customCat,
      categoryLabel: catNames[customCat] || "Kustom",
      desc: customDesc.trim(),
      tags: ["kustom", "kampus"],
      isCustom: true
    };

    setCustomSites(prev => [newSite, ...prev]);
    setCustomName("");
    setCustomUrl("");
    setCustomDesc("");
  };

  const allSites = [...customSites, ...DEFAULT_SITES];
  const isPopular = (id: string) => {
    const count = clickCounts[id] || 0;
    if (count === 0) return false;
    const sortedCounts = Object.values(clickCounts).sort((a, b) => b - a);
    const threshold = sortedCounts[2] || 2;
    return count >= threshold && count >= 2;
  };

  const filteredSites = allSites.filter(site => {
    if (favoritesOnly && !favorites.includes(site.id)) return false;
    if (category !== "all" && site.category !== category) return false;
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const hay = `${site.name} ${site.domain} ${site.desc} ${site.categoryLabel} ${(site.tags || []).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  const filteredLibraryBooks = LIBRARY_BOOKS.filter(book => {
    if (!librarySearch.trim()) return true;
    const q = librarySearch.trim().toLowerCase();
    const hay = `${book.title} ${book.faculty} ${book.desc} ${book.topics.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  const totalClicks = Object.values(clickCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#0b1120] text-[#f1f5f9] flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Topbar (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <header className="bg-[#111827] border-b border-[#334155] px-6 py-4 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-tr from-sky-400 to-blue-600 text-[#06101f] font-extrabold px-3 py-1.5 rounded-lg text-xs tracking-wider">
              MHS·HUB
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Portal Website, Perpustakaan & Papan Tulis Skripsi</h1>
              <p className="text-xs text-[#94a3b8]">Direktori riset terkurasi, Buku Panduan Fakultas & Workspace AI</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Navigation Tab Switcher */}
            <div className="flex bg-[#1e293b] p-1 rounded-lg border border-[#334155]">
              <button 
                type="button"
                onClick={() => setActiveTab("portal")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "portal" ? 'bg-sky-600 text-white shadow-sm' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Direktori Web</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab("library")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "library" ? 'bg-sky-600 text-white shadow-sm' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Library className="w-3.5 h-3.5" />
                <span>📚 Perpustakaan</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab("whiteboard")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "whiteboard" ? 'bg-sky-600 text-white shadow-sm' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Papan Tulis AI</span>
              </button>
            </div>

            {activeTab === "portal" && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input 
                    type="search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari website, fungsi, atau tag..." 
                    className="bg-[#1e293b] border border-[#334155] text-[#f1f5f9] pl-9 pr-4 py-2 rounded-lg text-xs md:text-sm w-64 md:w-72 focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    favoritesOnly 
                      ? 'border-amber-400 text-amber-300 bg-amber-500/10' 
                      : 'border-[#334155] bg-[#1e293b] text-[#f1f5f9] hover:border-sky-400'
                  }`}
                  title="Tampilkan hanya website yang disimpan"
                >
                  <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span className="hidden sm:inline">Favorit</span>
                  <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px]">{favorites.length}</span>
                </button>
              </>
            )}
          </div>
        </header>
      )}

      {/* PORTAL VIEW */}
      {activeTab === "portal" && (
        <>
          <section className="max-w-[1340px] w-full mx-auto mt-4 px-6 flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                type="button"
                onClick={() => setCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  category === "all" ? 'bg-sky-600 border-sky-400 text-white shadow-sm' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                }`}
              >
                Semua Kategori
              </button>
              <button 
                type="button"
                onClick={() => setCategory("riset")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  category === "riset" ? 'bg-sky-600 border-sky-400 text-white shadow-sm' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                }`}
              >
                📚 Riset & Jurnal
              </button>
              <button 
                type="button"
                onClick={() => setCategory("catatan")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  category === "catatan" ? 'bg-sky-600 border-sky-400 text-white shadow-sm' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                }`}
              >
                🗂️ Catatan & Kolaborasi
              </button>
              <button 
                type="button"
                onClick={() => setCategory("penulisan")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  category === "penulisan" ? 'bg-sky-600 border-sky-400 text-white shadow-sm' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                }`}
              >
                ✍️ Penulisan & Presentasi
              </button>
              <button 
                type="button"
                onClick={() => setCategory("teknis")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  category === "teknis" ? 'bg-sky-600 border-sky-400 text-white shadow-sm' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                }`}
              >
                💻 Coding, Data & Skill
              </button>
              <button 
                type="button"
                onClick={() => setCategory("karier")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  category === "karier" ? 'bg-sky-600 border-sky-400 text-white shadow-sm' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                }`}
              >
                🎓 Karier, Magang & Beasiswa
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#94a3b8] hidden xl:inline">Paket Cepat:</span>
              <button type="button" onClick={() => handlePreset("skripsi")} className="px-2.5 py-1 text-xs font-medium bg-[#1e293b] border border-[#334155] rounded-md hover:border-sky-400 transition-colors">
                🎯 Mode Skripsi
              </button>
              <button type="button" onClick={() => handlePreset("coding")} className="px-2.5 py-1 text-xs font-medium bg-[#1e293b] border border-[#334155] rounded-md hover:border-sky-400 transition-colors">
                ⚡ Mode Tech & Data
              </button>
              <button type="button" onClick={() => handlePreset("karier")} className="px-2.5 py-1 text-xs font-medium bg-[#1e293b] border border-[#334155] rounded-md hover:border-sky-400 transition-colors">
                🚀 Mode Magang & CV
              </button>
              <button type="button" onClick={() => handlePreset("reset")} className="px-2.5 py-1 text-xs font-medium bg-[#1e293b] border border-[#334155] rounded-md hover:border-sky-400 transition-colors flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </section>

          <main className="max-w-[1340px] w-full mx-auto my-4 px-6 grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-6 flex-1">
            <section className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm md:text-base font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Semua Website Penting Mahasiswa</span>
                </h2>
                <span className="text-xs text-[#94a3b8]">Menampilkan {filteredSites.length} platform</span>
              </div>

              {filteredSites.length === 0 ? (
                <div className="bg-[#111827] border border-[#334155] rounded-xl p-8 text-center text-[#94a3b8] text-sm">
                  Tidak ada website yang cocok dengan filter atau kata kunci saat ini. Coba ubah kata kunci pencarian atau klik Reset.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                  {filteredSites.map((site) => {
                    const isFav = favorites.includes(site.id);
                    const popular = isPopular(site.id);
                    const clicks = clickCounts[site.id] || 0;

                    return (
                      <article key={site.id} className="bg-[#111827] border border-[#334155] rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-sky-400 transition-all duration-150 group relative">
                        {popular && (
                          <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wide">
                            <Flame className="w-3 h-3 fill-slate-950" />
                            <span>Populer</span>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1e293b] text-sky-400 border border-[#334155]">
                              {site.categoryLabel}
                            </span>
                            <div className="flex items-center gap-2">
                              {clicks > 0 && (
                                <span className="text-[10px] text-slate-400 font-mono" title={`${clicks} kali diklik`}>
                                  {clicks}x klik
                                </span>
                              )}
                              <button 
                                type="button" 
                                onClick={() => toggleFavorite(site.id)}
                                className="text-amber-400 hover:scale-110 transition-transform p-1 cursor-pointer"
                                title="Simpan ke Favorit"
                              >
                                {isFav ? <Star className="w-4 h-4 fill-amber-400" /> : <Star className="w-4 h-4 text-slate-500 hover:text-amber-400" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">{site.name}</h3>
                            <div className="text-[11px] font-mono text-emerald-400">{site.domain}</div>
                          </div>
                        </div>

                        <p className="text-xs text-[#94a3b8] leading-relaxed">{site.desc}</p>

                        <div className="flex flex-wrap gap-1">
                          {(site.tags || []).map((t, idx) => (
                            <span key={idx} className="text-[10px] bg-[#172033] text-slate-300 px-1.5 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center gap-2 pt-2 border-t border-[#1e293b] mt-1">
                          <a 
                            href={site.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => handleSiteClick(site.id)}
                            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Buka Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          {site.isCustom && (
                            <button 
                              type="button" 
                              onClick={() => deleteCustomSite(site.id)}
                              className="p-2 bg-[#1e293b] hover:bg-rose-500/20 text-[#94a3b8] hover:text-rose-400 border border-[#334155] rounded-lg transition-colors cursor-pointer"
                              title="Hapus tautan kustom"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            <aside className="flex flex-col gap-4">
              <div className="bg-[#111827] border border-[#334155] rounded-xl p-4 flex flex-col gap-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4" />
                  <span>📊 Analitik Kunjungan</span>
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-center">
                    <div className="text-lg font-extrabold text-sky-300 font-mono">{totalClicks}</div>
                    <div className="text-[10px] text-[#94a3b8]">Total Klik Situs</div>
                  </div>
                  <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-center">
                    <div className="text-lg font-extrabold text-amber-400 font-mono">{Object.keys(clickCounts).length}</div>
                    <div className="text-[10px] text-[#94a3b8]">Situs Dijelajahi</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-[#334155] rounded-xl p-4 flex flex-col gap-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>🧭 Alur Kerja Rekomendasi</span>
                </h2>
                <div className="flex gap-1.5">
                  <button 
                    type="button"
                    onClick={() => setWorkflow("skripsi")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      workflow === "skripsi" ? 'bg-sky-600 border-sky-400 text-white' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Skripsi
                  </button>
                  <button 
                    type="button"
                    onClick={() => setWorkflow("tugas")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      workflow === "tugas" ? 'bg-sky-600 border-sky-400 text-white' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Tugas
                  </button>
                  <button 
                    type="button"
                    onClick={() => setWorkflow("karier")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      workflow === "karier" ? 'bg-sky-600 border-sky-400 text-white' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Karier
                  </button>
                </div>
                <ol className="list-decimal pl-4 flex flex-col gap-2 text-xs text-slate-200">
                  {(WORKFLOWS[workflow] || []).map((stepHtml, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: stepHtml }} />
                  ))}
                </ol>
              </div>

              <div className="bg-[#111827] border border-[#334155] rounded-xl p-4 flex flex-col gap-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Website Kampus / Pribadi</span>
                </h2>
                <form onSubmit={handleAddCustom} className="flex flex-col gap-2.5">
                  <input 
                    type="text" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Nama Website (mis. SIAKAD / Perpus)" 
                    className="bg-[#1e293b] border border-[#334155] text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-sky-400"
                    required 
                  />
                  <input 
                    type="text" 
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://..." 
                    className="bg-[#1e293b] border border-[#334155] text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-sky-400"
                    required 
                  />
                  <select 
                    value={customCat}
                    onChange={(e) => setCustomCat(e.target.value)}
                    className="bg-[#1e293b] border border-[#334155] text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-sky-400"
                  >
                    <option value="riset">Riset & Jurnal</option>
                    <option value="catatan">Catatan & Kolaborasi</option>
                    <option value="penulisan">Penulisan & Presentasi</option>
                    <option value="teknis">Coding, Data & Skill</option>
                    <option value="karier">Karier, Magang & Beasiswa</option>
                  </select>
                  <input 
                    type="text" 
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="Kegunaan singkat..." 
                    className="bg-[#1e293b] border border-[#334155] text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-sky-400"
                    required 
                  />
                  <button 
                    type="submit" 
                    className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Simpan ke Portal</span>
                  </button>
                </form>
              </div>
            </aside>
          </main>
        </>
      )}

      {/* LIBRARY VIEW */}
      {activeTab === "library" && (
        <main className="max-w-[1340px] w-full mx-auto my-6 px-6 flex flex-col gap-6 flex-1">
          <div className="flex flex-wrap justify-between items-center gap-4 bg-[#111827] border border-[#334155] p-6 rounded-2xl shadow-md">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Library className="w-5 h-5 text-sky-400" />
                <span>Perpustakaan Buku Panduan Fakultas</span>
              </h2>
              <p className="text-xs text-[#94a3b8] mt-1">
                Koleksi lengkap 8 buku panduan pembelajaran resmi untuk referensi kuliah, praktikum, dan penyusunan skripsi.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <input 
                type="search"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Cari buku atau topik panduan..."
                className="bg-[#1e293b] border border-[#334155] text-slate-100 pl-9 pr-4 py-2 rounded-lg text-xs w-72 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {filteredLibraryBooks.map((book) => (
              <div key={book.id} className="bg-[#111827] border border-[#334155] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-sky-400 transition-all group">
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-600/20 text-sky-400 border border-sky-500/30">
                      {book.faculty}
                    </span>
                    <span className="text-[10px] text-[#94a3b8] font-mono">{book.pages} Halaman</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors leading-snug">{book.title}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{book.desc}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {book.topics.map((t, i) => (
                    <span key={i} className="text-[10px] bg-[#172033] text-slate-300 px-2 py-0.5 rounded font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#1e293b]">
                  <a 
                    href={book.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Baca PDF</span>
                  </a>
                  <a 
                    href={book.pdfPath}
                    download
                    className="p-2 bg-[#1e293b] hover:bg-[#253348] text-[#94a3b8] hover:text-white border border-[#334155] rounded-lg transition-colors cursor-pointer"
                    title="Unduh PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* WHITEBOARD VIEW */}
      {activeTab === "whiteboard" && (
        <main className={`max-w-[1400px] w-full mx-auto my-4 px-6 grid gap-6 flex-1 print:block ${isFocusMode ? 'grid-cols-1 max-w-5xl' : 'grid-cols-1 lg:grid-cols-[280px_1fr]'}`}>
          {/* Documents Sidebar (Hidden in Focus Mode & on print) */}
          {!isFocusMode && (
            <div className="bg-[#111827] border border-[#334155] rounded-xl p-4 flex flex-col gap-3 print:hidden">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Dokumen Skripsi</span>
                </h2>
                <button 
                  type="button"
                  onClick={createNewDoc} 
                  className="p-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Buat Dokumen Baru"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-[450px]">
                {docs.map((doc) => (
                  <div 
                    key={doc.id}
                    onClick={() => setActiveDocId(doc.id)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex flex-col gap-1 ${
                      doc.id === activeDoc.id 
                        ? 'bg-sky-600/20 border-sky-400 text-white' 
                        : 'bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:border-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold truncate">{doc.title}</div>
                    <div className="flex justify-between items-center text-[10px] opacity-75">
                      <span>{doc.section}</span>
                      {docs.length > 1 && (
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); deleteDoc(doc.id); }}
                          className="hover:text-rose-400 p-0.5 cursor-pointer"
                          title="Hapus dokumen"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Assistant Quick Toolbelt */}
              <div className="mt-2 pt-3 border-t border-[#334155] flex flex-col gap-2">
                <div className="text-xs font-bold text-sky-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Asisten AI & Pengecek</span>
                </div>
                
                <button 
                  type="button"
                  onClick={() => handleAiAssist('check')}
                  disabled={isAiLoading}
                  className="w-full text-left bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs p-2.5 rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>🔍 AI Pengecek & Audit Naskah</span>
                </button>

                <button 
                  type="button"
                  onClick={() => handleAiAssist('outline')}
                  disabled={isAiLoading}
                  className="w-full text-left bg-[#1e293b] hover:bg-[#253348] disabled:opacity-50 border border-[#334155] text-slate-200 text-xs p-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>📑</span>
                  <span>Buat Outline Bab</span>
                </button>
                <button 
                  type="button"
                  onClick={() => handleAiAssist('proofread')}
                  disabled={isAiLoading}
                  className="w-full text-left bg-[#1e293b] hover:bg-[#253348] disabled:opacity-50 border border-[#334155] text-slate-200 text-xs p-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>✍️</span>
                  <span>Proofread & Formal Akademik</span>
                </button>
                <button 
                  type="button"
                  onClick={() => handleAiAssist('expand')}
                  disabled={isAiLoading}
                  className="w-full text-left bg-[#1e293b] hover:bg-[#253348] disabled:opacity-50 border border-[#334155] text-slate-200 text-xs p-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>🔍</span>
                  <span>Kembangkan Pembahasan</span>
                </button>
                <button 
                  type="button"
                  onClick={() => handleAiAssist('abstract')}
                  disabled={isAiLoading}
                  className="w-full text-left bg-[#1e293b] hover:bg-[#253348] disabled:opacity-50 border border-[#334155] text-slate-200 text-xs p-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>📝</span>
                  <span>Buat Draf Abstrak (ID/EN)</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Whiteboard Editor Area */}
          <div className="bg-[#111827] border border-[#334155] rounded-xl p-6 flex flex-col gap-4 print:border-none print:bg-white print:text-black">
            {/* Header controls (Hidden on print) */}
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-[#334155] print:hidden">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <input 
                  type="text"
                  value={activeDoc.title}
                  onChange={(e) => updateActiveDoc({ title: e.target.value })}
                  className="bg-[#1e293b] border border-[#334155] text-slate-100 font-bold px-3 py-2 rounded-lg text-sm md:text-base w-72 focus:outline-none focus:border-sky-400"
                  placeholder="Judul Dokumen..."
                />
                <select 
                  value={activeDoc.section}
                  onChange={(e) => updateActiveDoc({ section: e.target.value })}
                  className="bg-[#1e293b] border border-[#334155] text-slate-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-sky-400"
                >
                  <option value="Bab 1 Pendahuluan">Bab 1 Pendahuluan</option>
                  <option value="Tinjauan Pustaka">Tinjauan Pustaka</option>
                  <option value="Metodologi Penelitian">Metodologi Penelitian</option>
                  <option value="Hasil & Pembahasan">Hasil & Pembahasan</option>
                  <option value="Kesimpulan & Saran">Kesimpulan & Saran</option>
                  <option value="Catatan Bebas">Catatan Bebas / Ide Riset</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Focus Mode Toggle Button */}
                <button 
                  type="button"
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className={`border text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isFocusMode 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                      : 'bg-[#1e293b] hover:bg-[#253348] border-[#334155] text-slate-200'
                  }`}
                  title={isFocusMode ? "Keluar dari Mode Fokus" : "Masuk Mode Fokus (Sembunyikan Sidebar & Header)"}
                >
                  {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span>{isFocusMode ? "Keluar Fokus" : "Focus Mode"}</span>
                </button>

                <button 
                  type="button"
                  onClick={handleCopyText}
                  className="bg-[#1e293b] hover:bg-[#253348] border border-[#334155] text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Salin ke clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Tersalin!" : "Salin"}</span>
                </button>
                <button 
                  type="button"
                  onClick={handleExportMarkdown}
                  className="bg-[#1e293b] hover:bg-[#253348] border border-[#334155] text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Download File Markdown"
                >
                  <Download className="w-4 h-4" />
                  <span>Export MD</span>
                </button>
                <button 
                  type="button"
                  onClick={handleExportPdf}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Download Dokumen Siap Cetak PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* AI Custom Prompt Bar (Hidden on print) */}
            <div className="bg-[#172033] border border-[#334155] rounded-xl p-3 flex gap-2 items-center print:hidden">
              <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
              <input 
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAiAssist('question'); }}
                placeholder="Tanya AI atau ketik instruksi penulisan (mis. Buatkan rumusan masalah tentang E-Learning)..."
                className="bg-[#111827] border border-[#334155] text-slate-100 text-xs px-3 py-2 rounded-lg flex-1 focus:outline-none focus:border-sky-400"
              />
              <button 
                type="button"
                onClick={() => handleAiAssist('question')}
                disabled={isAiLoading || !aiPrompt.trim()}
                className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isAiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Kirim AI</span>
              </button>
            </div>

            {isAiLoading && (
              <div className="bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs p-3 rounded-lg flex items-center gap-2 print:hidden animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Asisten AI & Pengecek sedang menganalisis naskah Anda...</span>
              </div>
            )}

            {/* Document Textarea / Editor */}
            <div className="flex-1 flex flex-col">
              <textarea 
                value={activeDoc.content}
                onChange={(e) => updateActiveDoc({ content: e.target.value })}
                className={`w-full bg-[#172033] print:bg-white print:text-black border border-[#334155] print:border-none text-slate-100 font-mono text-sm p-4 rounded-xl focus:outline-none focus:border-sky-400 resize-y leading-relaxed ${isFocusMode ? 'h-[75vh]' : 'h-[550px]'}`}
                placeholder="Mulai menulis draf skripsi, latar belakang, tinjauan pustaka, atau catatan penelitian di sini..."
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#94a3b8] print:text-slate-600 pt-2 border-t border-[#334155]">
              <span>Bagian: <strong className="text-sky-300">{activeDoc.section}</strong></span>
              {isFocusMode ? (
                <button 
                  type="button"
                  onClick={() => setIsFocusMode(false)}
                  className="text-amber-400 hover:underline cursor-pointer font-semibold"
                >
                  Keluar Focus Mode ✕
                </button>
              ) : (
                <span>Terakhir disimpan otomatis di browser (localStorage)</span>
              )}
            </div>
          </div>
        </main>
      )}

      {/* AI Audit Report Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#334155] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="bg-[#172033] px-6 py-4 border-b border-[#334155] flex justify-between items-center">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Laporan AI Pengecek & Reviewer Akademik</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-[#0b1120]">
              {auditReport}
            </div>

            <div className="bg-[#172033] px-6 py-4 border-t border-[#334155] flex justify-between items-center">
              <span className="text-[11px] text-[#94a3b8]">Evaluasi berdasarkan standar penulisan ilmiah & EYD</span>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => {
                    if (auditReport) {
                      updateActiveDoc({ content: activeDoc.content + `\n\n### 🔍 Laporan AI Pengecek:\n${auditReport}\n` });
                    }
                    setIsAuditModalOpen(false);
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Sisipkan ke Naskah
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAuditModalOpen(false)}
                  className="bg-[#1e293b] hover:bg-[#253348] border border-[#334155] text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <footer className="text-center py-4 text-[#94a3b8] text-xs border-t border-[#334155] mt-auto bg-[#111827] print:hidden">
          MahasiswaHub — Portal riset & Papan Tulis Skripsi Berbantuan AI. Tersimpan otomatis di browser (<code className="text-sky-400 font-mono">localStorage</code>).
        </footer>
      )}
    </div>
  );
}
