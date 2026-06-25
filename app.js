/* ============================================================
   MPB - Monitoring Pengadaan Barang
   Versi Terintegrasi - Clean & Fixed
   ============================================================ */

// ========== KONFIGURASI ==========
const __MPB_STORAGE = (() => {
  try {
    const k = "__mpb_storage_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return window.localStorage;
  } catch (e) {
    console.warn("LocalStorage tidak tersedia, memakai memory storage sementara.", e);
    const m = {};
    return {
      getItem: k => Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null,
      setItem: (k, v) => { m[k] = String(v); },
      removeItem: k => { delete m[k]; }
    };
  }
})();

const CONFIG = {
  appName: "Monitoring Pengadaan Barang",
  shortName: "MPB",
  organizationName: "Divre",
  logoUrl: "assets/logo.svg",
  faviconUrl: "assets/favicon.svg",
  primaryColor: "#2563eb",
  secondaryColor: "#0f766e",
  accentColor: "#f59e0b",
  ...(window.APP_CONFIG || {})
};

document.title = CONFIG.appName;
document.documentElement.style.setProperty("--primary", CONFIG.primaryColor);
document.documentElement.style.setProperty("--secondary", CONFIG.secondaryColor);
document.documentElement.style.setProperty("--accent", CONFIG.accentColor);
const faviconEl = document.getElementById("favicon");
if (faviconEl) faviconEl.href = CONFIG.faviconUrl;

// ========== KONSTANTA ==========
const DB_KEY = "mpb_modern_db_v27_operational";
const SESSION_KEY = "mpb_modern_session_v27_operational";
const DEMO_PASSWORD = "demo123";

const ROLES = [
  "Admin", "Bidang Terkait", "PBJ", "Kadivre", "Legal", "Wakadivre",
  "Kadep Suike", "Vendor", "KSS Sarpra KPH", "TPHP", "PPHP", "Kasi Sarpra",
  "Kasi Angja", "Korektor Pajak", "Korektor Angja", "KSS Angja", "Umum"
];

const MODULES = [
  "Dashboard", "Data Pengadaan", "Input Pengadaan", "Approval",
  "Masa Pelaksanaan", "Alokasi KPH", "Pengiriman Barang",
  "Penerimaan Barang", "Monitoring Barang", "Role & Permission",
  "User Management", "Branding"
];

const ACTIONS = ["lihat", "tambah", "edit", "hapus"];

// ========== WORKFLOW ==========
const s = (title, pic, days, detail) => ({ title, pic, days, detail });

const WORKFLOW = [
  {
    phase: "Usulan & Persetujuan",
    items: [
      s("Surat Usulan Pengadaan ke Direksi", "Bidang Terkait", 2, "Dokumen usulan wajib diisi oleh Bidang Terkait/Bidang Teknis."),
      s("Persetujuan Anggaran & HPS", "Kadivre", null, "Flexible. Aktif jika persetujuan anggaran dan HPS sudah turun dari Kanpus."),
      s("Disposisi Persetujuan Anggaran", "Kadivre", 2, "Disposisi persetujuan anggaran."),
      s("Disposisi Pemberitahuan HPS", "Kadivre", 2, "Disposisi pemberitahuan HPS.")
    ]
  },
  {
    phase: "Pengadaan",
    items: [
      s("BA Pembahasan Proses Pengadaan", "PBJ", 1, "Berita acara pembahasan proses pengadaan."),
      s("Pemberitahuan Mulai Proses", "PBJ", 1, "Pemberitahuan mulai proses."),
      s("Penyusunan Dokumen Pengadaan", "PBJ", 1, "Penyusunan dokumen pengadaan."),
      s("Undangan Penawaran", "PBJ", 1, "Undangan penawaran."),
      s("Penjelasan Pekerjaan", "PBJ", 2, "Penjelasan pekerjaan."),
      s("BA Pemasukan, Pembukaan Dok, Penawaran", "PBJ", 3, "BA pemasukan, pembukaan dokumen, dan penawaran."),
      s("BA Hasil Penilaian Dok Penawaran", "PBJ", 1, "BA hasil penilaian dokumen penawaran."),
      s("Undangan Klarifikasi & Negosiasi", "PBJ", 1, "Undangan klarifikasi dan negosiasi."),
      s("BA Klarifikasi & Negosiasi", "PBJ", 1, "BA klarifikasi dan negosiasi."),
      s("ND Usul Penetapan Pemenang", "PBJ", 1, "Nota dinas usul penetapan pemenang."),
      s("ND Penetapan Pemenang", "PBJ", 1, "Nota dinas penetapan pemenang."),
      s("Surat Pengumuman Pemenang", "PBJ", 1, "Surat pengumuman pemenang."),
      s("Masa Sanggah", "PBJ", 2, "Masa sanggah."),
      s("SPPBJ", "PBJ", 7, "Surat Penunjukan Penyedia Barang/Jasa.")
    ]
  },
  {
    phase: "Kontrak & Pelaksanaan",
    items: [
      s("Vendor Membayar Jaminan", "PBJ", 7, "Bukti vendor membayar jaminan."),
      s("ND Selesai Proses", "PBJ", 1, "Nota dinas selesai proses."),
      s("Draf Perjanjian", "Bidang Terkait", 7, "Draf perjanjian oleh Bidang Terkait."),
      s("Review Perjanjian", "Legal", 7, "Review perjanjian oleh Legal."),
      s("TTD Vendor", "PBJ", 2, "Penandatangan kontrak oleh vendor."),
      s("Paraf User", "Bidang Terkait", 2, "Paraf user bidang terkait."),
      s("Paraf Kadep SDM, Umum, IT & Keuangan", "Kadep Suike", 2, "Paraf Kadep SUIKE."),
      s("Paraf Wakadivre", "Wakadivre", 2, "Paraf Wakadivre."),
      s("TTD Kadivre", "Kadivre", 2, "TTD Kadivre."),
      s("SPMK", "PBJ", 7, "Setelah SPMK, vendor dapat diisi dan form alokasi/pelaksanaan dibuka."),
      s("Masa Pelaksanaan Pekerjaan", "PBJ", null, "Flexible. Isi tanggal perjanjian sesuai kontrak.")
    ]
  },
  {
    phase: "Pengiriman & Pemeriksaan",
    items: [
      s("Kegiatan Pengisian Alokasi Barang Per KPH", "PBJ", 2, "Form alokasi wajib diisi sebelum approval."),
      s("Vendor Melaksanakan Pengiriman Barang", "PBJ", null, "Input form pengiriman barang dan upload DP pengiriman."),
      s("KPH Menerima Barang", "KSS Sarpra KPH", null, "Penerimaan baru aktif setelah pengiriman tersimpan."),
      s("Monitoring Penerimaan Barang", "Bidang Terkait", null, "Pantau total terkirim dan diterima."),
      s("Pemeriksaan TPHP KPH", "TPHP", 1, "Aktif setelah barang diterima 100%."),
      s("TPHP KPH membuat BA Pemeriksaan Barang", "KSS Sarpra KPH", 3, "Upload BA pemeriksaan dan dokumen lain."),
      s("Pengiriman BA Pemeriksaan & Kelengkapan ke Kantor Divre", "KSS Sarpra KPH", 7, "Pengiriman dokumen asli."),
      s("Surat Permohonan Pemeriksaan dari Vendor", "Umum", 2, "Setelah informasi barang diterima 100%."),
      s("Disposisi Kadivre Permohonan Pemeriksaan", "Kadivre", 2, "Disposisi permohonan pemeriksaan."),
      s("ND Permohonan Pemeriksaan Pengadaan", "Bidang Terkait", 2, "ND permohonan pemeriksaan pengadaan."),
      s("Disposisi Kadivre Pemeriksaan Pengadaan", "Kadivre", 2, "Disposisi pemeriksaan pengadaan."),
      s("BA Pemeriksaan PPHP", "PPHP", 2, "BA pemeriksaan PPHP.")
    ]
  },
  {
    phase: "Pembayaran & Selesai",
    items: [
      s("Surat Permohonan Pembayaran dari Vendor", "Kasi Sarpra", 2, "Surat permohonan pembayaran dari vendor."),
      s("Menerima BA Pemeriksaan dan Kelengkapan dari TPHP", "KSS Sarpra KPH", 2, "Menerima BA pemeriksaan dan kelengkapan dari TPHP."),
      s("TTD Vendor", "Kasi Sarpra", 2, "TTD BA Pemeriksaan PPHP & kelengkapan DP."),
      s("TTD Sekretaris PPHP", "Kasi Sarpra", 2, "TTD Sekretaris PPHP."),
      s("TTD Ketua PPHP", "Bidang Terkait", 2, "TTD Ketua PPHP."),
      s("TTD Anggota PPHP", "Kasi Angja", 2, "TTD Anggota PPHP."),
      s("TTD Kadep User", "Bidang Terkait", 2, "TTD Kadep User."),
      s("TTD Wakadivre", "Wakadivre", 2, "TTD Wakadivre."),
      s("TTD BA Serah Terima", "Kadivre", 2, "TTD BA Serah Terima."),
      s("Invoice, kwitansi, Faktur Pajak, dan berkas lainnya", "Kasi Sarpra", 2, "Upload invoice, kwitansi, faktur pajak, dan berkas lain."),
      s("Koreksi Korektor Pajak", "Korektor Pajak", 2, "Koreksi pajak."),
      s("Koreksi berkas oleh korektor Angja", "Korektor Angja", 5, "Koreksi berkas oleh korektor Angja."),
      s("Koreksi berkas oleh Kasi Angja", "Kasi Angja", 2, "Koreksi berkas oleh Kasi Angja."),
      s("Koreksi berkas oleh Kadep SUIKE", "Kadep SUIKE", 2, "Koreksi berkas oleh Kadep SUIKE."),
      s("Paraf Wakadivre", "Wakadivre", 2, "Paraf Wakadivre."),
      s("TTD Kadivre", "Kadivre", 2, "TTD Kadivre."),
      s("Scan Berkas dan upload Dokumen", "KSS Angja", 1, "Scan berkas dan upload dokumen."),
      s("Menunggu Pembayaran dari Kanpus", "Kadivre", null, "Flexible. Durasi tetap dihitung tanpa batas terlambat.")
    ]
  }
];

// ========== INDEX ==========
const STEPS = WORKFLOW.flatMap((p, pi) =>
  p.items.map((it, ii) => ({
    ...it,
    id: WORKFLOW.slice(0, pi).reduce((a, b) => a + b.items.length, 0) + ii,
    phase: p.phase,
    phaseIndex: pi,
    itemIndex: ii
  }))
);

const IDX = {
  SPMK: STEPS.findIndex(x => x.title === "SPMK"),
  MASA: STEPS.findIndex(x => x.title === "Masa Pelaksanaan Pekerjaan"),
  ALOKASI: STEPS.findIndex(x => x.title === "Kegiatan Pengisian Alokasi Barang Per KPH"),
  KIRIM: STEPS.findIndex(x => x.title === "Vendor Melaksanakan Pengiriman Barang"),
  TERIMA: STEPS.findIndex(x => x.title === "KPH Menerima Barang"),
  TPHP: STEPS.findIndex(x => x.title === "Pemeriksaan TPHP KPH")
};

// ========== DEFAULT HOLIDAYS ==========
const DEFAULT_HOLIDAYS = [
  "2026-01-01", "2026-02-16", "2026-02-17", "2026-03-19",
  "2026-03-20", "2026-03-21", "2026-05-01", "2026-05-14",
  "2026-05-27", "2026-06-01", "2026-06-17", "2026-08-17",
  "2026-12-25"
];

// ========== STATE ==========
let db = loadDb();
let session = JSON.parse(__MPB_STORAGE.getItem(SESSION_KEY) || "null");
let state = {
  page: "dashboard",
  filter: "all",
  details: true,
  flowDetails: false,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  flowPhaseByProc: {},
  flowStepByProc: {}
};

// ========== HELPER FUNCTIONS ==========
function u(id, name, email, password, role, bidang) {
  return { id, name, email, password, role, bidang, active: true, username: generateUsername(name, role, bidang) };
}

function generateUsername(name, role, bidang) {
  const base = String(name || role || "user").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return base || "user";
}

function p(id, nama, bidang, jenisPengadaan, jenisBarang, satuan, totalUsulan, catatan, currentStep, createdAt) {
  return {
    id, nama, bidang, jenisPengadaan, jenisBarang: jenisBarang || "",
    satuan: satuan || "Unit", totalUsulan: +totalUsulan || 0,
    catatan: catatan || "", vendor: "",
    createdAt: createdAt || today(), currentStep: currentStep || 0,
    completedSteps: Array.from({ length: currentStep || 0 }, (_, i) => i),
    approvals: [], allocations: [], shipments: [], receipts: [],
    documents: [], stepStartedAt: {},
    contract: { noPks: "", tanggalPks: "", tanggalMulai: "", tanggalAkhir: "", keterangan: "" }
  };
}

function alloc(vendor, noPks, tanggalPks, termin, tanggalMulai, tanggalAkhir, satuanKerja, jenisBarang, satuan, tarif, volume, tahunPks) {
  return {
    vendor, noPks, tanggalPks, termin, tanggalMulai, tanggalAkhir,
    satuanKerja, jenisBarang, satuan, tarif: +tarif, volume: +volume,
    tahunPks: +tahunPks, nilai: +tarif * +volume
  };
}

function mov(tanggal, noPks, termin, satuanKerja, jenisBarang, satuan, tarif, volume, tahunPks, dp) {
  return {
    tanggal, noPks, termin, satuanKerja, jenisBarang,
    satuan, tarif: +tarif, volume: +volume,
    tahunPks: +tahunPks, nilai: +tarif * +volume, dp: dp || ""
  };
}

// ========== DATE HELPERS ==========
function today() {
  return new Date().toISOString().slice(0, 10);
}

function d(v) {
  if (!v) return "-";
  const dt = new Date(v + "T00:00:00");
  if (isNaN(dt.getTime())) return String(v);
  return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function isoToID(v) {
  if (!v) return "";
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) return v;
  const m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : String(v);
}

function idToISO(v) {
  v = String(v || "").trim();
  if (!v) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

function normalizeDate(v) {
  const raw = String(v || "").trim();
  if (!raw) return "";
  let m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    const dt = new Date(+m[1], +m[2] - 1, +m[3]);
    if (!isNaN(dt.getTime()) && dt.getFullYear() === +m[1] && dt.getMonth() === +m[2] - 1 && dt.getDate() === +m[3]) {
      return `${m[1]}-${m[2]}-${m[3]}`;
    }
  }
  m = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
  if (m) {
    const dt = new Date(+m[3], +m[2] - 1, +m[1]);
    if (!isNaN(dt.getTime()) && dt.getFullYear() === +m[3] && dt.getMonth() === +m[2] - 1 && dt.getDate() === +m[1]) {
      return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    }
  }
  const parsed = new Date(raw);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return "";
}

function dateObj(v) {
  const iso = normalizeDate(v);
  return iso ? new Date(iso + "T00:00:00") : new Date(NaN);
}

function daysDiff(a, b) {
  const da = dateObj(a), db = dateObj(b);
  if (isNaN(da.getTime()) || isNaN(db.getTime())) return NaN;
  return Math.round((db - da) / 86400000);
}

function nextDate(v, delta = 1) {
  const dt = dateObj(v);
  if (isNaN(dt.getTime())) return "";
  dt.setDate(dt.getDate() + delta);
  return dt.toISOString().slice(0, 10);
}

function isHoliday(v) {
  const holidays = Array.isArray(db?.holidays) && db.holidays.length ? db.holidays : DEFAULT_HOLIDAYS;
  return holidays.includes(normalizeDate(v));
}

function isWorkday(v) {
  const dt = dateObj(v);
  if (isNaN(dt.getTime())) return false;
  const day = dt.getDay();
  return day !== 0 && day !== 6 && !isHoliday(v);
}

function workDaysInclusive(start, end) {
  start = normalizeDate(start);
  end = normalizeDate(end);
  if (!start || !end) return 0;
  const diff = daysDiff(start, end);
  if (!isFinite(diff) || diff < 0) return -1;
  let total = 0, cur = start, guard = 0;
  while (daysDiff(cur, end) >= 0 && guard < 4000) {
    if (isWorkday(cur)) total++;
    cur = nextDate(cur, 1);
    guard++;
  }
  return total;
}

function before(id) {
  let total = 0;
  for (let i = 0; i < id; i++) total += STEPS[i]?.days || 0;
  return total;
}

function numID(v) {
  return Number(v || 0).toLocaleString("id-ID");
}

function parseNumID(v) {
  return Number(String(v || "").replace(/[^0-9,-]/g, "").replace(/,/g, ".")) || 0;
}

function rp(v) {
  return "Rp " + numID(v);
}

function esc(x) {
  return String(x ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}

function fd(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function fileLabel(input) {
  const el = typeof input === "string" ? document.querySelector(input) : input;
  return el?.files?.length ? [...el.files].map(f => f.name).join(", ") : "";
}

function modalOpen() {
  return !!document.querySelector(".modalBack");
}

function isMobile() {
  return window.matchMedia && window.matchMedia("(max-width: 860px)").matches;
}

function toast(msg) {
  document.querySelector(".toast")?.remove();
  const d = document.createElement("div");
  d.className = "toast";
  d.textContent = msg;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3200);
}

// ========== DB FUNCTIONS ==========
function initialDb() {
  const permissions = {};
  ROLES.forEach(r => {
    permissions[r] = {};
    MODULES.forEach(m => {
      permissions[r][m] = { lihat: false, tambah: false, edit: false, hapus: false };
    });
  });
  MODULES.forEach(m => {
    permissions.Admin[m] = { lihat: true, tambah: true, edit: true, hapus: true };
  });

  function set(role, mods, perm) {
    mods.forEach(m => {
      permissions[role][m] = { ...permissions[role][m], ...perm };
    });
  }

  set("Bidang Terkait", ["Dashboard", "Data Pengadaan", "Input Pengadaan", "Approval", "Monitoring Barang"], { lihat: true, edit: true });
  permissions["Bidang Terkait"]["Input Pengadaan"] = { lihat: true, tambah: true, edit: true, hapus: false };
  set("PBJ", ["Dashboard", "Data Pengadaan", "Approval", "Masa Pelaksanaan", "Alokasi KPH", "Pengiriman Barang", "Monitoring Barang"], { lihat: true, tambah: true, edit: true });
  ["Kadivre", "Legal", "Wakadivre", "Kadep Suike", "Vendor", "KSS Sarpra KPH", "TPHP", "PPHP", "Kasi Sarpra", "Kasi Angja", "Korektor Pajak", "Korektor Angja", "KSS Angja", "Umum"].forEach(r => {
    set(r, ["Dashboard", "Data Pengadaan", "Approval", "Monitoring Barang"], { lihat: true, edit: true });
  });
  permissions.Vendor["Pengiriman Barang"] = { lihat: true, tambah: true, edit: true, hapus: false };
  permissions["KSS Sarpra KPH"]["Penerimaan Barang"] = { lihat: true, tambah: true, edit: true, hapus: false };

  const users = [
    u(1, "Administrator", "admin@pengadaan.local", DEMO_PASSWORD, "Admin", "Administrasi"),
    u(2, "Bidang Teknis IT", "it@pengadaan.local", DEMO_PASSWORD, "Bidang Terkait", "IT"),
    u(3, "Bidang Umum", "umum.bidang@pengadaan.local", DEMO_PASSWORD, "Bidang Terkait", "Umum"),
    u(4, "Petugas PBJ", "pbj@pengadaan.local", DEMO_PASSWORD, "PBJ", "PBJ"),
    u(5, "Kadivre", "kadivre@pengadaan.local", DEMO_PASSWORD, "Kadivre", "Direksi"),
    u(6, "Legal", "legal@pengadaan.local", DEMO_PASSWORD, "Legal", "Legal"),
    u(7, "Vendor Demo", "vendor@pengadaan.local", DEMO_PASSWORD, "Vendor", "Vendor"),
    u(8, "KSS Sarpra KPH", "kph@pengadaan.local", DEMO_PASSWORD, "KSS Sarpra KPH", "KPH Bandung")
  ];

  users.forEach(u => {
    if (!u.username) u.username = generateUsername(u.name, u.role, u.bidang);
  });

  let proc1 = p(1, "Laptop Operasional Divre", "IT", "Pengadaan Langsung", "Laptop", "Unit", 120, "Kebutuhan laptop operasional Divre dan KPH.", 32, "2026-06-01");
  proc1.vendor = "PT Teknologi Nusantara";
  proc1.contract = { noPks: "PKS/001/2026", tanggalPks: "2026-06-01", tanggalMulai: "2026-06-02", tanggalAkhir: "2026-07-10", keterangan: "" };
  proc1.allocations = [
    alloc("PT Teknologi Nusantara", "PKS/001/2026", "2026-06-01", "Termin I", "2026-06-02", "2026-06-20", "KPH Bandung", "Laptop", "Unit", 8500000, 60, 2026),
    alloc("PT Teknologi Nusantara", "PKS/001/2026", "2026-06-01", "Termin II", "2026-06-21", "2026-07-10", "KPH Bogor", "Laptop", "Unit", 8500000, 60, 2026)
  ];
  proc1.shipments = [mov("2026-06-10", "PKS/001/2026", "Termin I", "KPH Bandung", "Laptop", "Unit", 8500000, 50, 2026, "dp-kirim-001.pdf")];
  proc1.receipts = [mov("2026-06-11", "PKS/001/2026", "Termin I", "KPH Bandung", "Laptop", "Unit", 8500000, 42, 2026, "dp-terima-001.pdf")];
  proc1.stepStartedAt = {};
  for (let i = 0; i <= 32; i++) proc1.stepStartedAt[i] = "2026-06-01";

  let proc2 = p(2, "APAR untuk KPH", "Umum", "Tender Cepat", "APAR", "Unit", 80, "Kebutuhan alat pemadam api ringan.", 8, "2026-06-12");

  // Demo after SPMK
  let proc3 = p(3, "Contoh Setelah SPMK - Siap Approve Alokasi", "IT", "Pengadaan Langsung", "Bibit Kopi Arabika", "Batang", 500, "Contoh data sudah melewati SPMK untuk uji approve tanpa error.", IDX.ALOKASI, "2026-06-03");
  proc3.vendor = "PT Agro Lestari Demo";
  proc3.contract = { noPks: "PKS-DEMO-SPMK/001/2026", tanggalPks: "2026-06-04", tanggalMulai: "2026-06-05", tanggalAkhir: "2026-07-05", keterangan: "Data contoh sudah melewati SPMK." };
  proc3.allocations = [alloc("PT Agro Lestari Demo", "PKS-DEMO-SPMK/001/2026", "2026-06-04", "Termin I", "2026-06-05", "2026-07-05", "KPH Bandung", "Bibit Kopi Arabika", "Batang", 18000, 500, 2026)];
  proc3.documents = [{
    stepId: IDX.ALOKASI,
    stepTitle: STEPS[IDX.ALOKASI]?.title || "Alokasi",
    name: "Dokumen Pelengkap Alokasi KPH Demo",
    file: "dokumen-alokasi-kph-demo.pdf",
    camera: "",
    note: "Dokumen contoh agar tombol Approve Tahapan Ini dapat diuji setelah SPMK.",
    by: "Petugas PBJ",
    role: "PBJ",
    at: new Date().toISOString()
  }];
  for (let i = 0; i <= IDX.ALOKASI; i++) {
    proc3.completedSteps.push(i);
    proc3.stepStartedAt[i] = i === IDX.ALOKASI ? today() : "2026-06-03";
    if (i < IDX.ALOKASI) {
      proc3.approvals.push({
        stepId: i,
        stepTitle: STEPS[i]?.title || `Tahapan ${i + 1}`,
        pic: STEPS[i]?.pic || "-",
        startedAt: "2026-06-03",
        approvedBy: "Data Demo",
        approvedRole: STEPS[i]?.pic || "-",
        approvedAt: "2026-06-04T08:00:00.000Z",
        workDays: 1
      });
    }
  }
  proc3.currentStep = IDX.ALOKASI;

  return {
    permissions,
    users,
    procurements: [proc1, proc2, proc3],
    nextUserId: 9,
    nextProcId: 4,
    holidays: DEFAULT_HOLIDAYS.slice()
  };
}

function loadDb() {
  try {
    const raw = __MPB_STORAGE.getItem(DB_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.procurements) {
        data.procurements.forEach(proc => {
          proc.documents = proc.documents || [];
          proc.allocations = proc.allocations || [];
          proc.shipments = proc.shipments || [];
          proc.receipts = proc.receipts || [];
          proc.approvals = proc.approvals || [];
          proc.completedSteps = proc.completedSteps || [];
          proc.stepStartedAt = proc.stepStartedAt || {};
          proc.contract = proc.contract || { noPks: "", tanggalPks: "", tanggalMulai: "", tanggalAkhir: "", keterangan: "" };
        });
        return data;
      }
    }
  } catch (e) { /* ignore */ }
  const x = initialDb();
  __MPB_STORAGE.setItem(DB_KEY, JSON.stringify(x));
  return x;
}

function save() {
  __MPB_STORAGE.setItem(DB_KEY, JSON.stringify(db));
}

function reset() {
  db = initialDb();
  save();
  toast("Data demo berhasil direset.");
  render();
}

// ========== ACCESS CONTROL ==========
function cur() {
  return db.users.find(x => x.id === session?.id);
}

function can(m, a = "lihat") {
  return session && (session.role === "Admin" || !!db.permissions?.[session.role]?.[m]?.[a]);
}

function admin() {
  return session?.role === "Admin";
}

function bidang() {
  return session?.role === "Bidang Terkait";
}

function accessProc(x) {
  return admin() || !bidang() || cur()?.bidang === x.bidang;
}

function canInput() {
  return admin() || (bidang() && can("Input Pengadaan", "tambah"));
}

function canEditProc(x) {
  return admin() || (bidang() && cur()?.bidang === x.bidang && can("Input Pengadaan", "edit"));
}

function canDeleteProc(x) {
  return !!x && accessProc(x) && (admin() || can("Data Pengadaan", "hapus") || can("Input Pengadaan", "hapus"));
}

function isPic(st) {
  return admin() || session?.role === st?.pic;
}

function spmk(x) {
  return x.completedSteps.includes(IDX.SPMK);
}

function shipTotal(x) {
  return x.shipments.reduce((a, b) => a + (+b.volume || 0), 0);
}

function recTotal(x) {
  return x.receipts.reduce((a, b) => a + (+b.volume || 0), 0);
}

function totalUsulan(x) {
  const stored = Number(x?.totalUsulan || 0);
  if (stored > 0) return stored;
  return (x?.allocations || []).reduce((a, b) => a + (Number(b.volume) || 0), 0);
}

function pct(v, t) {
  return t ? Math.min(100, Math.round(+v / +t * 100)) : 0;
}

function prog(x) {
  return pct(x.completedSteps.length, STEPS.length);
}

function vis() {
  return db.procurements.filter(accessProc);
}

function filtered() {
  let r = vis();
  if (state.filter === "done") return r.filter(x => x.currentStep >= STEPS.length);
  if (state.filter === "running") return r.filter(x => x.currentStep < STEPS.length);
  if (state.filter === "need") return r.filter(x => isPic(STEPS[x.currentStep]));
  if (state.filter === "my") return r.filter(x => x.bidang === cur()?.bidang);
  return r;
}

function contractFor(proc) {
  if (!proc) return { noPks: "", tanggalPks: "", tanggalMulai: "", tanggalAkhir: "", keterangan: "" };
  proc.contract = proc.contract || {};
  const c = proc.contract;
  ['tanggalPks', 'tanggalMulai', 'tanggalAkhir'].forEach(k => {
    c[k] = normalizeDate(c[k]) || "";
  });
  return c;
}

function contractOk(x) {
  const c = contractFor(x);
  return !!(x?.vendor && c.noPks && c.tanggalMulai && c.tanggalAkhir);
}

function contractDuration(x) {
  const c = contractFor(x || {});
  const start = normalizeDate(c.tanggalMulai);
  const end = normalizeDate(c.tanggalAkhir);
  if (!start || !end) return 0;
  const n = workDaysInclusive(start, end);
  return isFinite(n) ? Math.max(0, n) : 0;
}

function contractElapsed(x) {
  const c = contractFor(x || {});
  const start = normalizeDate(c.tanggalMulai);
  const end = normalizeDate(c.tanggalAkhir);
  const now = today();
  if (!start || !end) return 0;
  if (daysDiff(start, end) < 0) return 0;
  const last = daysDiff(now, end) > 0 ? now : end;
  const n = workDaysInclusive(start, last);
  return isFinite(n) ? Math.max(0, n) : 0;
}

function contractStatus(x) {
  const c = contractFor(x || {});
  const start = normalizeDate(c.tanggalMulai);
  const end = normalizeDate(c.tanggalAkhir);
  const now = today();
  if (!start || !end) return { text: "Pilih tanggal mulai dan tanggal akhir", color: "yellow" };
  if (daysDiff(start, end) < 0) return { text: "Tanggal akhir lebih awal dari tanggal mulai", color: "red" };
  const total = contractDuration({ contract: { tanggalMulai: start, tanggalAkhir: end } });
  if (daysDiff(now, start) > 0) {
    const n = workDaysInclusive(now, start);
    return { text: `Mulai ${numID(n)} hari kerja lagi • durasi ${numID(total)} hari kerja`, color: "blue" };
  }
  if (daysDiff(end, now) > 0) {
    const late = workDaysInclusive(end, now);
    return { text: `Lewat ${numID(late)} hari kerja • ${numID(total)}/${numID(total)} hari kerja`, color: "red" };
  }
  const remain = workDaysInclusive(now, end);
  const elapsed = contractElapsed({ contract: { tanggalMulai: start, tanggalAkhir: end } });
  return {
    text: `Sisa ${numID(remain)} hari kerja • ${numID(elapsed)}/${numID(total)} hari kerja`,
    color: remain <= 3 ? "yellow" : "green"
  };
}

function due(x, id = x.currentStep) {
  const st = STEPS[id];
  if (!st) return { text: "Selesai", color: "green" };
  if (id === IDX.MASA) return contractStatus(x);
  const elapsed = Math.max(0, daysDiff(x.createdAt, today()));
  const startBefore = before(id);
  if (st.days === null) {
    return { text: `Flexible • ${Math.max(0, elapsed - startBefore)} hari berjalan`, color: "blue" };
  }
  const remain = startBefore + st.days - elapsed;
  if (remain < 0) return { text: `Lewat ${Math.abs(remain)} hari`, color: "red" };
  if (remain <= 1) return { text: `Sisa ${remain} hari`, color: "yellow" };
  return { text: `Sisa ${remain} hari`, color: "green" };
}

function status(x) {
  if (x.currentStep >= STEPS.length) return { text: "Selesai", color: "green" };
  const dd = due(x);
  if (dd.color === "red") return { text: "Terlambat", color: "red" };
  if (isPic(STEPS[x.currentStep])) return { text: "Perlu Approval", color: "yellow" };
  return { text: "Berlangsung", color: "blue" };
}

function stepStatus(proc, stepId) {
  if (stepId < proc.currentStep || proc.completedSteps.includes(stepId)) return "approved";
  if (stepId === proc.currentStep && proc.currentStep < STEPS.length) return "current";
  return "locked";
}

function currentGate(proc) {
  try {
    return gate(proc, proc.currentStep);
  } catch (e) {
    return { ok: false, msg: "Tahapan belum siap." };
  }
}

function phaseForStep(stepId) {
  const safe = Math.min(Math.max(0, Number(stepId) || 0), STEPS.length - 1);
  return STEPS[safe]?.phaseIndex || 0;
}

function phaseStartIndex(phaseIndex) {
  let n = 0;
  for (let i = 0; i < phaseIndex; i++) n += WORKFLOW[i]?.items?.length || 0;
  return n;
}

function docsForStep(proc, stepId) {
  proc.documents = proc.documents || [];
  return proc.documents.filter(d => Number(d.stepId) === Number(stepId));
}

function hasStepDocument(proc, stepId) {
  return docsForStep(proc, stepId).some(d => d.file || d.camera || d.name);
}

function movementUploadOk(list) {
  return (list || []).some(r => String(r.dp || "").trim().length > 0);
}

function stepUploadOk(proc, stepId) {
  if (hasStepDocument(proc, stepId)) return true;
  if (stepId === IDX.KIRIM) return movementUploadOk(proc.shipments);
  if (stepId === IDX.TERIMA) return movementUploadOk(proc.receipts);
  return false;
}

function uploadRequiredMessage(proc, stepId) {
  const step = STEPS[stepId];
  return `Upload dokumen wajib untuk tahapan ${step ? step.title : "ini"}. Pilih file atau ambil foto langsung dari kamera.`;
}

function gate(proc, id) {
  const st = STEPS[id];
  if (!st) return { ok: false, msg: "Tahapan tidak ditemukan." };
  if (!isPic(st)) return { ok: false, msg: "Role login bukan PIC tahapan ini." };
  if (id === IDX.MASA && !contractOk(proc)) {
    return { ok: false, msg: "Masa Pelaksanaan wajib dilengkapi terlebih dahulu." };
  }
  if (id === IDX.ALOKASI && !proc.allocations.length) {
    return { ok: false, msg: "Alokasi KPH wajib diisi terlebih dahulu." };
  }
  if (id === IDX.KIRIM && !proc.shipments.length) {
    return { ok: false, msg: "Pengiriman wajib diisi terlebih dahulu." };
  }
  if (id === IDX.KIRIM && !movementUploadOk(proc.shipments) && !hasStepDocument(proc, id)) {
    return { ok: false, msg: "Upload DP pengiriman wajib: pilih file atau ambil foto langsung." };
  }
  if (id === IDX.TERIMA && !proc.receipts.length) {
    return { ok: false, msg: "Form penerimaan wajib diisi setelah pengiriman." };
  }
  if (id === IDX.TERIMA && !movementUploadOk(proc.receipts) && !hasStepDocument(proc, id)) {
    return { ok: false, msg: "Upload dokumen/foto penerimaan wajib: pilih file atau ambil foto langsung." };
  }
  if (id === IDX.TPHP && pct(recTotal(proc), totalUsulan(proc)) < 100) {
    return { ok: false, msg: "TPHP aktif setelah barang diterima 100%." };
  }
  if (!stepUploadOk(proc, id)) {
    return { ok: false, msg: uploadRequiredMessage(proc, id) };
  }
  return { ok: true, msg: "Dapat di-approve." };
}

// ========== NAMA BARANG ==========
function namaBarangList(proc) {
  const names = [
    ...(proc.allocations || []).map(a => a.jenisBarang || a.namaBarang),
    proc.jenisBarang
  ].filter(Boolean);
  return [...new Set(names)].join(", ") || "-";
}

// ========== NAVIGATION ==========
function nav(page, label, module, ico) {
  return { page, label, module, ico };
}

function title() {
  const titles = {
    dashboard: "Dashboard Pengadaan",
    procurements: "Data Pengadaan",
    input: "Input Data Pengadaan",
    approval: "Approval Sesuai PIC",
    masa: "Masa Pelaksanaan Pekerjaan",
    allocation: "Alokasi Barang Per KPH",
    shipping: "Pengiriman Barang",
    receiving: "Penerimaan Barang",
    monitoring: "Monitoring Barang",
    roles: "Role & Permission",
    users: "User Management",
    branding: "Branding Aplikasi"
  };
  return titles[state.page] || "Aplikasi";
}

// ========== LOGIN ==========
function login() {
  return `<section class="login">
    <div class="loginHero">
      <div class="loginBrand">
        <img src="${esc(CONFIG.logoUrl)}">
        <div><b>${esc(CONFIG.appName)}</b><span>${esc(CONFIG.organizationName)}</span></div>
      </div>
      <h1>Monitoring pengadaan barang yang rapi, terkontrol, dan berbasis PIC.</h1>
      <p>Login memakai username internal. Halaman approval dibuat ringkas dengan alur vertikal.</p>
      <div class="badges">
        <span>Username Login</span><span>Approval by PIC</span>
        <span>Compact Approval</span><span>Vertical Flow</span>
      </div>
    </div>
    <div class="loginPanel">
      <div class="loginCard">
        <h2>Masuk Aplikasi</h2>
        <p>Gunakan username demo sesuai role.</p>
        <form id="loginForm">
          <div class="field">
            <label>Username</label>
            <input name="username" value="admin" autocomplete="username" required>
          </div>
          <div class="field" style="margin-top:12px">
            <label>Password</label>
            <input type="password" name="password" value="${DEMO_PASSWORD}" autocomplete="current-password" required>
          </div>
          <button class="btn primary" style="width:100%;margin-top:18px">Login</button>
        </form>
        <div class="demo">
          <b>Username demo:</b><br>
          Admin: <b>admin</b> / demo123<br>
          PBJ: <b>pbj</b> / demo123<br>
          Kadivre: <b>kadivre</b> / demo123<br>
          Wakadivre: <b>wakadivre</b> / demo123<br>
          KPH: <b>kss_kph</b> / demo123<br>
          Legal: <b>legal</b> / demo123
        </div>
      </div>
    </div>
  </section>`;
}

function bindLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.onsubmit = e => {
    e.preventDefault();
    const x = fd(e.target);
    const username = String(x.username || "").trim().toLowerCase();
    const u = db.users.find(v =>
      v.active &&
      String(v.username || "").toLowerCase() === username &&
      v.password === String(x.password || "")
    );
    if (!u) return toast("Username atau password tidak sesuai.");
    session = { id: u.id, name: u.name, role: u.role, username: u.username };
    __MPB_STORAGE.setItem(SESSION_KEY, JSON.stringify(session));
    state.page = "dashboard";
    render();
  };
}

// ========== SHELL ==========
function shell() {
  const u = cur();
  const groups = [
    ["Utama", [
      nav("dashboard", "Dashboard", "Dashboard", "⌂"),
      nav("procurements", "Data Pengadaan", "Data Pengadaan", "▦"),
      nav("input", "Input Pengadaan", "Input Pengadaan", "＋"),
      nav("approval", "Approval", "Approval", "✓")
    ]],
    ["Operasional", [
      nav("masa", "Masa Pelaksanaan", "Masa Pelaksanaan", "◷"),
      nav("allocation", "Alokasi KPH", "Alokasi KPH", "↦"),
      nav("shipping", "Pengiriman", "Pengiriman Barang", "⇢"),
      nav("receiving", "Penerimaan", "Penerimaan Barang", "⇠")
    ]],
    ["Monitoring", [
      nav("monitoring", "Monitoring Barang", "Monitoring Barang", "◉")
    ]],
    ["Admin", [
      nav("roles", "Role & Permission", "Role & Permission", "⚙"),
      nav("users", "User Management", "User Management", "☷"),
      nav("branding", "Branding", "Branding", "✦")
    ]]
  ];

  return `<div class="shell ${state.sidebarCollapsed ? 'sidebarCollapsed' : ''} ${state.mobileSidebarOpen ? 'mobileSidebarOpen' : ''}">
    <button type="button" class="sidebarBackdrop" data-sidebar-close aria-label="Tutup menu"></button>
    <aside class="sidebar">
      <div class="brand">
        <img src="${esc(CONFIG.logoUrl)}">
        <div><b>${esc(CONFIG.shortName)}</b><span>${esc(CONFIG.appName)}</span></div>
        <button type="button" class="btn ghost small sidebarHide" data-sidebar-toggle title="Minimize menu">
          ${state.sidebarCollapsed ? '›' : '‹'}
        </button>
      </div>
      ${groups.map(([t, items]) => {
        const v = items.filter(i => can(i.module));
        return v.length ? `<div>
          <div class="navTitle">${t}</div>
          ${v.map(i => `<button class="navBtn ${state.page === i.page ? 'active' : ''}" data-nav="${i.page}" title="${esc(i.label)}">
            <span class="ico">${i.ico}</span>
            <span class="navText">${i.label}</span>
          </button>`).join("")}
        </div>` : "";
      }).join("")}
      <div class="sideUser">
        <b>${esc(u?.name || "")}</b>
        <span>${esc(u?.role || "")} • ${esc(u?.bidang || "")}</span>
      </div>
    </aside>
    <main class="main">
      <div class="topbar">
        <button type="button" class="btn ghost small menuToggle" data-sidebar-toggle>☰ Menu</button>
        <div class="topbarTitle">
          <div class="kicker">${esc(CONFIG.organizationName)} Procurement System</div>
          <h1>${title()}</h1>
        </div>
        <div class="userChip">
          <div class="avatar">${esc(u?.name?.[0] || "?")}</div>
          <div><b>${esc(u?.name || "")}</b><span>${esc(u?.role || "")}</span></div>
          <button id="logout" class="btn ghost small">Logout</button>
        </div>
      </div>
      <div id="content"></div>
      <div id="modalRoot"></div>
    </main>
  </div>`;
}

function bindShell() {
  document.querySelectorAll("[data-nav]").forEach(btn => {
    btn.onclick = () => {
      state.page = btn.dataset.nav;
      state.mobileSidebarOpen = false;
      render();
    };
  });
  document.querySelectorAll("[data-sidebar-toggle]").forEach(btn => {
    btn.onclick = () => {
      if (isMobile()) {
        state.mobileSidebarOpen = !state.mobileSidebarOpen;
      } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
      }
      render();
    };
  });
  document.querySelectorAll("[data-sidebar-close]").forEach(btn => {
    btn.onclick = () => {
      state.mobileSidebarOpen = false;
      render();
    };
  });
  const logout = document.getElementById("logout");
  if (logout) {
    logout.onclick = () => {
      __MPB_STORAGE.removeItem(SESSION_KEY);
      session = null;
      state.mobileSidebarOpen = false;
      render();
    };
  }
}

// ========== STAT CARD ==========
function stat(f, t, v, n) {
  return `<div class="card stat" data-filter="${f}">
    <div class="statTitle">${t}</div>
    <div class="statVal">${typeof v === 'number' ? numID(v) : v}</div>
    <div class="note">${n}</div>
  </div>`;
}

// ========== PROC TABLE ==========
function procTable(rows) {
  if (!rows.length) return `<div class="card empty">Belum ada data pengadaan.</div>`;
  return `<div class="tableWrap"><table><thead><tr>
    <th>Pengadaan</th><th>Bidang</th><th>Jenis Pengadaan</th>
    <th>Total Usulan</th><th>Barang Diterima</th><th>Vendor</th>
    <th>Progress</th><th>Posisi Terakhir</th>
    <th>Tata Waktu</th><th>Status</th><th>Aksi</th>
  </tr></thead><tbody>${rows.map(proc => {
    const st = STEPS[proc.currentStep];
    const ps = status(proc);
    const du = due(proc);
    const vendor = spmk(proc) ?
      (proc.vendor || `<span class="badge yellow">Belum diisi</span>`) :
      `<span class="badge gray">Terkunci sampai SPMK</span>`;
    const us = totalUsulan(proc);
    const rec = recTotal(proc);
    const showDelete = state.page === "procurements" && canDeleteProc(proc);
    return `<tr>
      <td data-label="Pengadaan">
        <button type="button" class="linkBtn" data-detail="${proc.id}"><b>${esc(proc.nama)}</b></button>
        <br><small>Nama barang: ${esc(namaBarangList(proc))}</small>
      </td>
      <td data-label="Bidang">${esc(proc.bidang)}</td>
      <td data-label="Jenis Pengadaan">${esc(proc.jenisPengadaan)}</td>
      <td data-label="Total Usulan"><b>${numID(us)}</b><br><small>${esc(proc.satuan || "Unit")}</small></td>
      <td data-label="Barang Diterima"><b>${numID(rec)}</b><br><small>${pct(rec, us)}%</small></td>
      <td data-label="Vendor">${vendor}</td>
      <td data-label="Progress">
        <div class="progress"><span style="width:${prog(proc)}%"></span></div>
        <small>${prog(proc)}%</small>
      </td>
      <td data-label="Posisi Terakhir">${st ? `<b>${esc(st.title)}</b><br><small>PIC: ${esc(st.pic)}</small>` : "<b>Selesai</b>"}</td>
      <td data-label="Tata Waktu"><span class="badge ${du.color}">${esc(du.text)}</span></td>
      <td data-label="Status"><span class="badge ${ps.color}">${esc(ps.text)}</span></td>
      <td data-label="Aksi">
        <div class="tools">
          <button type="button" class="btn primary small" data-detail="${proc.id}">Detail</button>
          ${canEditProc(proc) ? `<button type="button" class="btn ghost small" data-edit="${proc.id}">Edit</button>` : ""}
          ${showDelete ? `<button type="button" class="btn danger small" data-delete-proc="${proc.id}">Hapus</button>` : ""}
        </div>
      </td>
    </tr>`;
  }).join("")}</tbody></table></div>`;
}

// ========== DASHBOARD ==========
function dashboard() {
  const rows = vis();
  const done = rows.filter(x => x.currentStep >= STEPS.length).length;
  const run = rows.filter(x => x.currentStep < STEPS.length).length;
  const need = rows.filter(x => isPic(STEPS[x.currentStep])).length;

  return `<div class="grid cards">
    ${stat("all", "Total Pengadaan", rows.length, "Seluruh pengadaan yang dapat Anda akses")}
    ${stat("done", "Selesai", done, "Pengadaan selesai")}
    ${stat("running", "Sedang Berlangsung", run, "Klik untuk melihat proses berjalan")}
    ${stat("need", "Perlu Approval", need, "Tahapan sesuai PIC login")}
  </div>
  <div class="head">
    <h2>Daftar Pengadaan</h2>
    <div class="tools">
      ${canInput() ? `<button class="btn primary small" data-go="input">+ Input Pengadaan</button>` : ""}
      <button class="btn ghost small" data-reset>Reset Data Demo</button>
    </div>
  </div>
  ${procTable(filtered())}`;
}

// ========== INPUT PENGADAAN ==========
function input() {
  if (!can("Input Pengadaan")) return denied("Anda tidak memiliki akses ke input pengadaan.");
  return `<div class="card pad">
    <div class="head" style="margin-top:0">
      <div><h2>Input Data Pengadaan</h2><small>Form dibuat ringkas sesuai proses awal pengadaan.</small></div>
    </div>
    ${canInput() ? `<div class="help ok">Cukup isi Nama Pengadaan, Bidang, dan Jenis Pengadaan. Detail barang, volume, tarif, dan total usulan diisi pada tab Alokasi KPH.</div>
    <form id="procForm" style="margin-top:16px">
      <div class="formGrid">
        <div class="field"><label>Nama Pengadaan</label><input name="nama" required placeholder="Contoh: Pengadaan APAR KPH Bandung"></div>
        <div class="field"><label>Bidang</label><input name="bidang" value="${esc(bidang() ? cur().bidang : "")}" ${bidang() ? "readonly" : ""} required placeholder="IT / Umum / Sarpra"></div>
        <div class="field"><label>Jenis Pengadaan</label>
          <select name="jenisPengadaan">
            <option>Pengadaan Langsung</option><option>Tender Cepat</option>
            <option>Tender Terbuka</option><option>E-Purchasing</option>
            <option>Penunjukan Langsung</option>
          </select>
        </div>
        <div class="field full"><button class="btn primary">Simpan Data Pengadaan</button></div>
      </div>
    </form>` : `<div class="help warn">Role Anda hanya dapat melihat data. Input pengadaan dibatasi untuk Bidang Terkait.</div>`}
  </div>
  <div class="head"><h2>Data Pengadaan</h2></div>
  ${procTable(vis())}`;
}

function saveProc(e) {
  e.preventDefault();
  if (!canInput()) return toast("Input pengadaan hanya oleh Bidang Terkait atau Admin.");
  const x = fd(e.target);
  const bd = bidang() ? cur().bidang : x.bidang;
  db.procurements.push(p(
    db.nextProcId++,
    x.nama,
    bd,
    x.jenisPengadaan,
    "",
    "",
    0,
    "",
    0,
    today()
  ));
  save();
  toast("Data pengadaan berhasil disimpan.");
  state.page = "procurements";
  render();
}

// ========== EDIT PENGADAAN ==========
function editProc(id) {
  const proc = db.procurements.find(p => p.id === +id);
  if (!proc || !canEditProc(proc)) return toast("Anda tidak berwenang mengedit data ini.");
  document.getElementById("modalRoot").innerHTML = `
    <div class="modalBack">
      <div class="modal">
        <div class="modalHead">
          <div><h2>Edit Data Pengadaan</h2><small>${esc(proc.nama)}</small></div>
          <button type="button" class="btn ghost small" id="closeEditProc">Tutup</button>
        </div>
        <div class="modalBody">
          <form id="editProcForm" data-proc-id="${proc.id}">
            <div class="formGrid">
              <div class="field"><label>Nama Pengadaan</label><input name="nama" required value="${esc(proc.nama)}"></div>
              <div class="field"><label>Bidang</label><input name="bidang" required value="${esc(proc.bidang)}" ${bidang() ? "readonly" : ""}></div>
              <div class="field"><label>Jenis Pengadaan</label>
                <select name="jenisPengadaan">
                  ${["Pengadaan Langsung","Tender Cepat","Tender Terbuka","E-Purchasing","Penunjukan Langsung"].map(v =>
                    `<option ${proc.jenisPengadaan === v ? "selected" : ""}>${esc(v)}</option>`
                  ).join("")}
                </select>
              </div>
              <div class="field full"><button class="btn primary">Simpan Perubahan</button></div>
            </div>
          </form>
          <div class="help" style="margin-top:14px">Detail barang, volume, tarif, pengiriman, dan penerimaan tetap dikelola pada tab operasional masing-masing.</div>
        </div>
      </div>
    </div>`;
  document.getElementById("closeEditProc").onclick = () => document.getElementById("modalRoot").innerHTML = "";
  document.getElementById("editProcForm").onsubmit = e => {
    e.preventDefault();
    const data = fd(e.target);
    const p = db.procurements.find(x => x.id === +e.target.dataset.procId);
    if (!p) return toast("Data pengadaan tidak ditemukan.");
    p.nama = data.nama.trim();
    p.bidang = bidang() ? cur().bidang : data.bidang.trim();
    p.jenisPengadaan = data.jenisPengadaan;
    save();
    document.getElementById("modalRoot").innerHTML = "";
    toast("Data pengadaan berhasil diperbarui.");
    render();
  };
}

function deleteProc(id) {
  const proc = db.procurements.find(p => p.id === +id);
  if (!proc) return toast("Data pengadaan tidak ditemukan.");
  if (!canDeleteProc(proc)) return toast("Anda tidak berwenang menghapus data ini.");
  if (!confirm(`Hapus data pengadaan "${proc.nama}"?`)) return;
  db.procurements = db.procurements.filter(p => p.id !== proc.id);
  save();
  document.getElementById("modalRoot").innerHTML = "";
  toast("Data pengadaan berhasil dihapus.");
  render();
}

// ========== MASA PELAKSANAAN ==========
function contractForm(rows, selectedId = "") {
  if (!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
  const selected = +selectedId || rows[0].id;
  return `<form id="contractForm" data-contract-form>
    <div class="formGrid">
      <div class="field"><label>Pengadaan</label>
        <select name="procId" id="contractProc" required>
          ${rows.map(proc => `<option value="${proc.id}" ${+selected === proc.id ? "selected" : ""}
            data-vendor="${esc(proc.vendor || "")}"
            data-nopks="${esc(proc.contract?.noPks || "")}"
            data-tglpks="${esc(normalizeDate(proc.contract?.tanggalPks))}"
            data-tglmulai="${esc(normalizeDate(proc.contract?.tanggalMulai))}"
            data-tglakhir="${esc(normalizeDate(proc.contract?.tanggalAkhir))}"
            data-keterangan="${esc(proc.contract?.keterangan || "")}">
            ${esc(proc.nama)}
          </option>`).join("")}
        </select>
      </div>
      <div class="field"><label>Vendor Bertanggung Jawab</label><input name="vendor" id="contractVendor" required placeholder="Nama vendor"></div>
      <div class="field"><label>No PKS</label><input name="noPks" id="contractNoPks" required placeholder="Nomor PKS"></div>
      <div class="field"><label>Tanggal PKS</label><input name="tanggalPks" id="contractTanggalPks" type="date"></div>
      <div class="field"><label>Tanggal Mulai Kontrak</label><input name="tanggalMulai" id="contractTanggalMulai" type="date" required></div>
      <div class="field"><label>Tanggal Akhir Kontrak</label><input name="tanggalAkhir" id="contractTanggalAkhir" type="date" required></div>
      <div class="field"><label>Durasi Hari Efektif</label><input id="contractDurasi" disabled placeholder="Otomatis Senin-Jumat, hari libur tidak dihitung"></div>
      <div class="field"><label>Status Tata Waktu</label><input id="contractStatusText" disabled placeholder="Otomatis dari tanggal mulai dan akhir"></div>
      <div class="field full"><label>Keterangan Masa Pelaksanaan</label><textarea name="keterangan" id="contractKeterangan" placeholder="Catatan masa pelaksanaan pekerjaan"></textarea></div>
      <div class="field full"><button class="btn primary" type="submit">Simpan Masa Pelaksanaan</button></div>
    </div>
  </form>`;
}

function refreshContractForm() {
  const sel = document.getElementById("contractProc");
  if (!sel) return;
  const proc = db.procurements.find(x => Number(x.id) === Number(sel.value));
  if (!proc) return;
  const c = contractFor(proc);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ""; };
  set("contractVendor", proc.vendor || "");
  set("contractNoPks", c.noPks || "");
  set("contractTanggalPks", normalizeDate(c.tanggalPks));
  set("contractTanggalMulai", normalizeDate(c.tanggalMulai));
  set("contractTanggalAkhir", normalizeDate(c.tanggalAkhir));
  set("contractKeterangan", c.keterangan || "");
  updateContractPreview();
}

function updateContractPreview() {
  const dur = document.getElementById("contractDurasi");
  const stat = document.getElementById("contractStatusText");
  if (!dur || !stat) return;
  const mulai = normalizeDate(document.getElementById("contractTanggalMulai")?.value);
  const akhir = normalizeDate(document.getElementById("contractTanggalAkhir")?.value);
  if (!mulai || !akhir) {
    dur.value = "";
    stat.value = "Pilih tanggal mulai dan tanggal akhir";
    return;
  }
  const diff = daysDiff(mulai, akhir);
  if (!isFinite(diff) || diff < 0) {
    dur.value = "Tanggal akhir harus setelah/sama dengan mulai";
    stat.value = "Tanggal akhir lebih awal dari tanggal mulai";
    return;
  }
  const total = workDaysInclusive(mulai, akhir);
  const fake = { contract: { tanggalMulai: mulai, tanggalAkhir: akhir } };
  dur.value = `${numID(total)} hari kerja efektif`;
  stat.value = contractStatus(fake).text;
}

function saveContractForm(e) {
  e.preventDefault();
  const data = fd(e.target);
  const proc = db.procurements.find(x => Number(x.id) === Number(data.procId));
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  if (!spmk(proc)) return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");
  const tanggalPks = normalizeDate(data.tanggalPks);
  const tanggalMulai = normalizeDate(data.tanggalMulai);
  const tanggalAkhir = normalizeDate(data.tanggalAkhir);
  if (!data.vendor || !data.noPks || !tanggalMulai || !tanggalAkhir) {
    return toast("Vendor, No PKS, tanggal mulai, dan tanggal akhir wajib dipilih.");
  }
  if (daysDiff(tanggalMulai, tanggalAkhir) < 0) {
    return toast("Tanggal akhir kontrak tidak boleh sebelum tanggal mulai.");
  }
  proc.vendor = String(data.vendor || "").trim();
  proc.contract = {
    ...(proc.contract || {}),
    noPks: String(data.noPks || "").trim(),
    tanggalPks,
    tanggalMulai,
    tanggalAkhir,
    keterangan: data.keterangan || ""
  };
  save();
  toast("Masa Pelaksanaan berhasil disimpan.");
  const modal = document.getElementById("modalRoot");
  if (modal) modal.innerHTML = "";
  render();
}

function bindContractForm() {
  const cf = document.getElementById("contractForm");
  if (!cf) return;
  cf.onsubmit = saveContractForm;
  const sel = document.getElementById("contractProc");
  if (sel) sel.onchange = refreshContractForm;
  ["contractTanggalPks", "contractTanggalMulai", "contractTanggalAkhir"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = updateContractPreview;
  });
  refreshContractForm();
}

function masa() {
  const rows = vis().filter(spmk);
  return `<div class="help ok"><b>Update v39:</b> Durasi Hari Efektif dan Status Tata Waktu dihitung otomatis dari Tanggal Mulai Kontrak dan Tanggal Akhir Kontrak. Hari kerja: Senin-Jumat, hari libur aplikasi tidak dihitung.</div>
  <div class="card pad" style="margin-top:14px">
    <div class="head" style="margin-top:0"><h2>Input Masa Pelaksanaan Pekerjaan</h2></div>
    ${can("Masa Pelaksanaan", "edit") ? contractForm(rows) : `<div class="help warn">Role Anda tidak dapat mengisi masa pelaksanaan.</div>`}
  </div>
  <div class="head"><h2>Pengadaan Setelah SPMK</h2></div>
  ${rows.length ? `<div class="tableWrap"><table><thead><tr>
    <th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Tanggal PKS</th>
    <th>Mulai</th><th>Akhir</th><th>Durasi Hari Efektif</th><th>Tata Waktu</th><th>Aksi</th>
  </tr></thead><tbody>${rows.map(proc => {
    const c = contractFor(proc);
    const cs = contractStatus(proc);
    const dur = contractDuration(proc);
    return `<tr>
      <td data-label="Pengadaan"><b>${esc(proc.nama)}</b><br><small>${esc(proc.bidang)}</small></td>
      <td data-label="Vendor">${esc(proc.vendor || "-")}</td>
      <td data-label="No PKS">${esc(c.noPks || "-")}</td>
      <td data-label="Tanggal PKS">${d(c.tanggalPks)}</td>
      <td data-label="Mulai">${d(c.tanggalMulai)}</td>
      <td data-label="Akhir">${d(c.tanggalAkhir)}</td>
      <td data-label="Durasi"><b>${numID(dur)}</b> hari kerja efektif</td>
      <td data-label="Tata Waktu"><span class="badge ${cs.color}">${esc(cs.text)}</span></td>
      <td data-label="Aksi">${can("Masa Pelaksanaan", "edit") ? `<button type="button" class="btn primary small" data-contract="${proc.id}">Isi/Edit</button>` : "-"}</td>
    </tr>`;
  }).join("")}</tbody></table></div>` : `<div class="card empty">Belum ada pengadaan yang mencapai SPMK.</div>`}`;
}

function contract(id) {
  const rows = vis().filter(spmk);
  const proc = db.procurements.find(x => Number(x.id) === Number(id));
  if (!proc || !spmk(proc)) return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");
  document.getElementById("modalRoot").innerHTML = `
    <div class="modalBack">
      <div class="modal">
        <div class="modalHead">
          <div><h2>Edit Masa Pelaksanaan Pekerjaan</h2><small>${esc(proc.nama)} • durasi dan status otomatis dihitung</small></div>
          <button type="button" class="btn ghost small" id="closeContractModal">Tutup</button>
        </div>
        <div class="modalBody">
          <div class="help ok">Tanggal lama otomatis dimuat. Setelah tanggal mulai atau akhir dipilih, Durasi Hari Efektif dan Status Tata Waktu langsung terisi.</div>
          <div style="height:14px"></div>
          ${contractForm(rows, id)}
        </div>
      </div>
    </div>`;
  document.getElementById("closeContractModal").onclick = () => document.getElementById("modalRoot").innerHTML = "";
  bindContractForm();
}

// ========== ALOKASI KPH ==========
function allocationHeader(proc) {
  return `<div class="formGrid allocHeader">
    <div class="field"><label>Vendor</label><input name="vendor" data-vendor-field readonly value="${esc(proc?.vendor || "")}" placeholder="Otomatis dari Masa Pelaksanaan"></div>
    <div class="field"><label>No PKS</label><input name="noPks" data-nopks-field readonly required value="${esc(proc?.contract?.noPks || "")}" placeholder="${esc(proc?.contract?.noPks ? "Otomatis dari Masa Pelaksanaan" : "Isi No PKS terlebih dahulu di Masa Pelaksanaan")}"></div>
    <div class="field"><label>Tanggal PKS</label><input name="tanggalPks" data-tglpks-field readonly type="date" value="${esc(normalizeDate(proc?.contract?.tanggalPks))}"></div>
    <div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div>
  </div>`;
}

function termOptions(selected = "Termin I") {
  return ["Langsung", "Termin I", "Termin II", "Termin III"].map(t =>
    `<option ${selected === t ? "selected" : ""}>${esc(t)}</option>`
  ).join("");
}

function allocationItemRow(values = {}) {
  return `<tr class="allocationItemRow">
    <td data-label="Nama Barang"><input name="jenisBarang" required value="${esc(values.jenisBarang || values.namaBarang || "")}" placeholder="Contoh: APAR / Laptop"></td>
    <td data-label="Satuan"><input name="satuan" required value="${esc(values.satuan || "Unit")}" placeholder="Unit / Set / Paket"></td>
    <td data-label="Tarif"><input name="tarif" class="num-id" inputmode="numeric" required value="${values.tarif ? numID(values.tarif) : ""}" placeholder="0"></td>
    <td data-label="Volume Barang"><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume ? numID(values.volume) : ""}" placeholder="0"></td>
    <td data-label="Nilai"><input disabled data-nilai-preview placeholder="Otomatis" value="${values.tarif && values.volume ? rp(Number(values.tarif) * Number(values.volume)) : ""}"></td>
    <td data-label="Aksi"><button type="button" class="btn danger small" data-remove-allocation-item>Hapus</button></td>
  </tr>`;
}

function allocationGroupTemplate(values = {}) {
  const items = (values.items && values.items.length ? values.items : [values]).filter(Boolean);
  return `<div class="multiRow allocationGroup allocationTableGroup" data-allocation-group>
    <div class="rowHeader allocationGroupHeader">
      <div><b>Satuan Kerja</b><small>Isi identitas satuan kerja, lalu input barang dalam tabel.</small></div>
      <button type="button" class="btn danger small" data-remove-allocation-group>Hapus Satuan Kerja</button>
    </div>
    <div class="formGrid allocationGroupFields">
      <div class="field full"><label>Nama Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja || "")}" placeholder="Contoh: KPH Bandung / KPH Bogor"></div>
      <div class="field"><label>Termin</label><select name="termin">${termOptions(values.termin || "Termin I")}</select></div>
      <div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" type="date" required value="${esc(normalizeDate(values.tanggalMulai))}"></div>
      <div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" type="date" required value="${esc(normalizeDate(values.tanggalAkhir))}"></div>
    </div>
    <div class="allocationItemTableWrap"><table class="allocationItemTable"><thead><tr>
      <th>Nama Barang</th><th>Satuan</th><th>Tarif</th><th>Volume Barang</th><th>Nilai otomatis</th><th>Aksi</th>
    </tr></thead><tbody data-allocation-items>${items.map(it => allocationItemRow(it)).join("")}</tbody></table></div>
    <div class="multiToolbar innerToolbar"><button type="button" class="btn ghost small" data-add-allocation-item>+ Tambah Barang</button></div>
  </div>`;
}

function multiAllocationForm(proc = null, formId = "allocMultiForm") {
  const rows = proc ? [proc] : vis().filter(spmk);
  if (!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
  const selected = proc?.id || rows[0].id;
  const p0 = proc || rows[0];
  return `<form id="${formId}" class="multiForm" data-kind="allocation">
    <div class="formGrid">
      <div class="field full"><label>Pengadaan</label>
        <select name="procId" data-proc-select ${proc ? "disabled" : ""}>
          ${rows.map(p => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(p.nama)}</option>`).join("")}
        </select>
        ${proc ? `<input type="hidden" name="procId" value="${proc.id}">` : ""}
      </div>
    </div>
    ${allocationHeader(p0)}
    <div class="help ok"><b>Alokasi KPH v32:</b> tanggal mulai dan akhir dipilih dari kalender. Input barang berbentuk tabel dengan Nilai otomatis.</div>
    <div class="multiRows allocationGroupRows" data-container="allocation">${allocationGroupTemplate()}</div>
    <div class="multiToolbar">
      <button type="button" class="btn ghost small" data-add-allocation-group>+ Tambah Satuan Kerja</button>
      <button class="btn primary" type="submit">Simpan Semua Alokasi</button>
    </div>
    <div class="help" data-allocation-header-help style="margin-top:12px">${esc(p0?.contract?.noPks ? `No PKS ${p0.contract.noPks} otomatis dari Masa Pelaksanaan.` : "Lengkapi Masa Pelaksanaan agar No PKS tersedia.")}</div>
  </form>`;
}

function syncAllocationHeader(form) {
  const proc = selectedProcFromForm(form);
  if (!proc || !form) return;
  const set = (sel, v) => { const el = form.querySelector(sel); if (el) el.value = v || ""; };
  set('[data-vendor-field]', proc.vendor || "");
  set('[data-nopks-field]', proc.contract?.noPks || "");
  set('[data-tglpks-field]', normalizeDate(proc.contract?.tanggalPks));
  const help = form.querySelector('[data-allocation-header-help]');
  if (help) help.textContent = proc.contract?.noPks ? `No PKS ${proc.contract.noPks} otomatis dari Masa Pelaksanaan.` : "Lengkapi Masa Pelaksanaan agar No PKS tersedia.";
}

function selectedProcFromForm(form) {
  const id = +(form.querySelector('[name="procId"]')?.value || 0);
  return db.procurements.find(p => p.id === id);
}

function updateAllocationItemNilai(item) {
  const tarif = parseNumID(item.querySelector('[name="tarif"]')?.value || 0);
  const volume = parseNumID(item.querySelector('[name="volume"]')?.value || 0);
  const nilai = item.querySelector('[data-nilai-preview]');
  if (nilai) nilai.value = tarif && volume ? rp(tarif * volume) : "";
}

function bindAllocationNilai(scope = document) {
  scope.querySelectorAll?.('.allocationItemRow').forEach(item => {
    ['input', 'change'].forEach(ev => {
      item.querySelector('[name="tarif"]')?.addEventListener(ev, () => updateAllocationItemNilai(item));
      item.querySelector('[name="volume"]')?.addEventListener(ev, () => updateAllocationItemNilai(item));
    });
    updateAllocationItemNilai(item);
  });
}

function readAllocationGroups(form) {
  return [...form.querySelectorAll('[data-allocation-group]')].flatMap(group => {
    const groupValue = name => group.querySelector(`.allocationGroupFields [name="${name}"]`)?.value?.trim() || "";
    const satuanKerja = groupValue('satuanKerja');
    const termin = groupValue('termin') || "Termin I";
    const tanggalMulai = normalizeDate(groupValue('tanggalMulai'));
    const tanggalAkhir = normalizeDate(groupValue('tanggalAkhir'));
    return [...group.querySelectorAll('.allocationItemRow')].map(item => {
      const q = name => item.querySelector(`[name="${name}"]`)?.value?.trim() || "";
      return {
        satuanKerja, termin, tanggalMulai, tanggalAkhir,
        jenisBarang: q('jenisBarang'),
        namaBarang: q('jenisBarang'),
        satuan: q('satuan'),
        tarif: parseNumID(q('tarif')),
        volume: parseNumID(q('volume'))
      };
    });
  }).filter(r => r.satuanKerja || r.jenisBarang || r.volume || r.tarif);
}

function saveMultiAllocation(e) {
  e.preventDefault();
  const form = e.target;
  const data = fd(form);
  const proc = db.procurements.find(p => p.id === +data.procId);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  if (!spmk(proc)) return toast("Alokasi hanya dapat diisi setelah SPMK.");
  if (!contractOk(proc)) return toast("Lengkapi Masa Pelaksanaan terlebih dahulu agar No PKS tersedia.");
  if (!can("Alokasi KPH", "tambah") && !isPic(STEPS[proc.currentStep])) {
    return toast("Anda tidak dapat mengisi alokasi.");
  }
  const rows = readAllocationGroups(form);
  if (!rows.length) return toast("Minimal isi satu Satuan Kerja dan satu baris Barang pada tabel.");
  for (const r of rows) {
    if (!r.satuanKerja || !r.termin || !r.tanggalMulai || !r.tanggalAkhir) {
      return toast("Setiap Satuan Kerja wajib memiliki Nama Satuan Kerja, Termin, Tanggal Mulai, dan Tanggal Akhir.");
    }
    if (!r.jenisBarang || !r.satuan || !r.tarif || !r.volume) {
      return toast("Setiap baris tabel barang wajib memiliki Nama Barang, Satuan, Tarif, dan Volume Barang.");
    }
    if (daysDiff(r.tanggalMulai, r.tanggalAkhir) < 0) {
      return toast("Tanggal akhir alokasi tidak boleh sebelum tanggal mulai.");
    }
  }
  rows.forEach(r => {
    proc.allocations.push(alloc(
      proc.vendor,
      proc.contract.noPks,
      proc.contract.tanggalPks,
      r.termin,
      r.tanggalMulai,
      r.tanggalAkhir,
      r.satuanKerja,
      r.jenisBarang,
      r.satuan,
      r.tarif,
      r.volume,
      parseNumID(data.tahunPks) || new Date().getFullYear()
    ));
  });
  proc.totalUsulan = proc.allocations.reduce((a, b) => a + (Number(b.volume) || 0), 0);
  proc.satuan = proc.allocations[0]?.satuan || proc.satuan || "Unit";
  proc.jenisBarang = namaBarangList(proc);
  save();
  const satkerCount = new Set(rows.map(r => r.satuanKerja)).size;
  toast(`${numID(rows.length)} barang dari ${numID(satkerCount)} satuan kerja berhasil disimpan.`);
  modalOpen() ? detail(proc.id) : render();
}

function allocTable(rows) {
  let list = [];
  rows.forEach(proc => (proc.allocations || []).forEach((a, i) => list.push({ proc, _idx: i, ...a })));
  if (!list.length) return `<div class="card empty">Belum ada alokasi.</div>`;
  return `<div class="tableWrap"><table><thead><tr>
    <th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Satuan Kerja</th>
    <th>Termin</th><th>Tgl Mulai</th><th>Tgl Akhir</th>
    <th>Nama Barang</th><th>Satuan</th><th>Tarif</th><th>Volume</th><th>Nilai</th>
  </tr></thead><tbody>${list.map(x => `<tr>
    <td data-label="Pengadaan"><b>${esc(x.proc.nama)}</b></td>
    <td data-label="Vendor">${esc(x.vendor)}</td>
    <td data-label="No PKS">${esc(x.noPks)}</td>
    <td data-label="Satuan Kerja"><b>${esc(x.satuanKerja)}</b></td>
    <td data-label="Termin">${esc(x.termin)}</td>
    <td data-label="Tgl Mulai">${d(x.tanggalMulai)}</td>
    <td data-label="Tgl Akhir">${d(x.tanggalAkhir)}</td>
    <td data-label="Nama Barang">${esc(x.jenisBarang)}</td>
    <td data-label="Satuan">${esc(x.satuan || "")}</td>
    <td data-label="Tarif">${rp(x.tarif)}</td>
    <td data-label="Volume">${numID(x.volume)} ${esc(x.satuan || "")}</td>
    <td data-label="Nilai">${rp(x.nilai)}</td>
  </tr>`).join("")}</tbody></table></div>`;
}

function allocation() {
  const rows = vis().filter(spmk);
  return `<div class="help ok"><b>Alokasi KPH v32:</b> tanggal mulai dan akhir dipilih dari kalender. Input barang berbentuk tabel dengan Nilai otomatis.</div>
  <div class="card pad" style="margin-top:14px">
    <h2 style="margin-top:0">Form Alokasi Barang Per Satuan Kerja</h2>
    ${can("Alokasi KPH", "tambah") ? multiAllocationForm(null, "allocMultiForm") : `<div class="help warn">Role Anda tidak dapat menambah alokasi.</div>`}
  </div>
  <div class="head"><h2>Data Alokasi</h2></div>
  ${allocTable(rows)}`;
}

// ========== PENGIRIMAN & PENERIMAAN ==========
function allocationOptions(proc) {
  return (proc?.allocations || []).map((a, i) => ({
    value: i,
    label: `${a.satuanKerja || "-"} • ${a.jenisBarang || "Barang"} • ${a.termin || "-"} • ${numID(a.volume || 0)} ${a.satuan || ""}`,
    row: a
  }));
}

function selectedAllocation(proc, idx) {
  const arr = proc?.allocations || [];
  return arr[Number(idx)] || arr[0] || {};
}

function movementRowTemplate(values = {}, isReceipt = false, procId = null) {
  const proc = db.procurements.find(p => p.id === +(procId || values.procId || 0)) ||
    vis().find(p => spmk(p) && p.allocations.length) || null;
  const opts = allocationOptions(proc);
  const selected = values.allocationIndex != null ? Number(values.allocationIndex) : 0;
  const src = selectedAllocation(proc, selected);
  const labelTanggal = isReceipt ? "Tanggal Penerimaan" : "Tanggal Pengiriman";
  const labelVolume = isReceipt ? "Volume Diterima" : "Volume Terkirim";
  return `<div class="multiRow movementRow">
    <div class="rowHeader"><b>Baris ${isReceipt ? "Penerimaan" : "Pengiriman"}</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div>
    <div class="formGrid">
      <div class="field"><label>${labelTanggal}</label><input name="tanggal" type="date" required value="${esc(normalizeDate(values.tanggal))}"></div>
      <div class="field full"><label>Pilih Barang dari Alokasi KPH</label>
        <select name="allocationIndex" data-allocation-select required>
          ${opts.map(o => `<option value="${o.value}" ${selected === o.value ? "selected" : ""}>${esc(o.label)}</option>`).join("")}
        </select>
      </div>
      <div class="field"><label>Satuan Kerja</label><input name="satuanKerja" readonly required value="${esc(values.satuanKerja || src.satuanKerja || "")}"></div>
      <div class="field"><label>Termin</label><input name="termin" readonly required value="${esc(values.termin || src.termin || "")}"></div>
      <div class="field"><label>Nama Barang</label><input name="jenisBarang" readonly required value="${esc(values.jenisBarang || src.jenisBarang || "")}"></div>
      <div class="field"><label>Satuan</label><input name="satuan" readonly required value="${esc(values.satuan || src.satuan || "")}"></div>
      <div class="field"><label>Tarif (Rp)</label><input name="tarif" readonly class="num-id" value="${src.tarif ? numID(src.tarif) : ""}"></div>
      <div class="field"><label>${labelVolume}</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume ? numID(values.volume) : ""}"></div>
      <div class="field full"><label>Upload DP / File Dokumen</label>
        <div class="uploadDpUnified">
          <div class="uploadDpActions">
            <label class="filePickBtn">
              <input name="dpFile" type="file" accept=".pdf,.jpg,.jpeg,.png,image/*">
              <span>Pilih File</span>
            </label>
          </div>
          <small>Upload file dokumen pendukung pengiriman/penerimaan.</small>
        </div>
      </div>
      <div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div>
    </div>
  </div>`;
}

function multiMovementForm(proc = null, formId, type) {
  const allowed = type === "receipts" ?
    vis().filter(p => spmk(p) && p.shipments.length && p.allocations.length) :
    vis().filter(p => spmk(p) && p.allocations.length);
  const rows = proc ? [proc] : allowed;
  if (!rows.length) {
    return `<div class="empty">${type === "receipts" ? "Belum ada pengiriman/alokasi, sehingga penerimaan belum dapat diinput." : "Belum ada pengadaan yang sudah SPMK dan memiliki alokasi."}</div>`;
  }
  const p0 = proc || rows[0];
  const isReceipt = type === "receipts";
  return `<form id="${formId}" class="multiForm" data-kind="${type}">
    <div class="formGrid">
      <div class="field"><label>Pengadaan</label>
        <select name="procId" data-proc-select ${proc ? "disabled" : ""}>
          ${rows.map(p => `<option value="${p.id}" ${p.id === p0.id ? "selected" : ""}>${esc(p.nama)}</option>`).join("")}
        </select>
        ${proc ? `<input type="hidden" name="procId" value="${proc.id}">` : ""}
      </div>
      <div class="field"><label>No PKS</label><input name="noPks" data-nopks-field readonly required value="${esc(p0?.contract?.noPks || "")}" placeholder="Otomatis dari Masa Pelaksanaan"></div>
      <div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div>
    </div>
    <div class="help ok" style="margin-top:12px">Tanggal ${isReceipt ? "penerimaan" : "pengiriman"} dapat dipilih langsung dari kalender.</div>
    <div class="multiRows" data-container="${type}">${movementRowTemplate({}, isReceipt, p0.id)}</div>
    <div class="multiToolbar">
      <button type="button" class="btn ghost small" data-add-movement-row="${type}">+ Tambah ${isReceipt ? "Penerimaan" : "Pengiriman"} Barang</button>
      <button class="btn primary" type="submit">Simpan Semua ${isReceipt ? "Penerimaan" : "Pengiriman"}</button>
    </div>
  </form>`;
}

function readRows(form, selector) {
  return [...form.querySelectorAll(selector)].map(row => {
    const q = name => row.querySelector(`[name="${name}"]`)?.value?.trim() || "";
    const file = fileLabel(row.querySelector('[name="dpFile"]'));
    return {
      allocationIndex: q("allocationIndex"),
      satuanKerja: q("satuanKerja"),
      termin: q("termin"),
      tanggal: normalizeDate(q("tanggal")),
      tanggalMulai: normalizeDate(q("tanggalMulai")),
      tanggalAkhir: normalizeDate(q("tanggalAkhir")),
      jenisBarang: q("jenisBarang"),
      satuan: q("satuan"),
      tarif: parseNumID(q("tarif")),
      volume: parseNumID(q("volume")),
      dp: file || q("dp"),
      noPks: q("noPks")
    };
  }).filter(r => r.satuanKerja || r.volume || r.jenisBarang);
}

function updateMovementRowByAllocation(row, proc) {
  const idx = row.querySelector('[name="allocationIndex"]')?.value || 0;
  const src = selectedAllocation(proc, idx);
  const set = (name, v) => {
    const el = row.querySelector(`[name="${name}"]`);
    if (el) el.value = v || "";
  };
  set("satuanKerja", src.satuanKerja);
  set("termin", src.termin);
  set("jenisBarang", src.jenisBarang);
  set("satuan", src.satuan);
  set("tarif", src.tarif ? numID(src.tarif) : "");
}

function bindMovementAuto(form, type) {
  const syncHeader = () => {
    const proc = selectedProcFromForm(form);
    const no = form.querySelector('[data-nopks-field]');
    if (no) no.value = proc?.contract?.noPks || "";
    return proc;
  };
  form.querySelector('[data-proc-select]')?.addEventListener('change', () => {
    const proc = syncHeader();
    const box = form.querySelector(`[data-container="${type}"]`);
    box.innerHTML = movementRowTemplate({}, type === "receipts", proc?.id);
    bindMultiForms();
  });
  const proc = syncHeader();
  form.querySelectorAll('.movementRow').forEach(row => {
    row.querySelector('[data-allocation-select]')?.addEventListener('change', () => updateMovementRowByAllocation(row, proc));
    updateMovementRowByAllocation(row, proc);
  });
}

function saveMultiMovement(e, type) {
  e.preventDefault();
  const form = e.target;
  const data = fd(form);
  const proc = db.procurements.find(p => p.id === +data.procId);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  if (!spmk(proc)) return toast("Data hanya dapat diinput setelah SPMK.");
  if (!contractOk(proc)) return toast("Lengkapi Masa Pelaksanaan terlebih dahulu agar No PKS tersedia.");
  if (type === "shipments" && !proc.allocations.length) {
    return toast("Pengiriman membutuhkan alokasi barang terlebih dahulu.");
  }
  if (type === "receipts" && !proc.shipments.length) {
    return toast("Penerimaan baru dapat diinput setelah pengiriman tersimpan.");
  }
  const rows = readRows(form, ".movementRow");
  if (!rows.length) return toast("Minimal isi satu baris data.");
  for (const r of rows) {
    if (!r.tanggal || !r.satuanKerja || !r.termin || !r.jenisBarang || !r.satuan || !r.volume) {
      return toast("Setiap baris wajib memiliki tanggal, barang alokasi, satuan kerja, termin, nama barang, satuan, dan volume.");
    }
    if (!r.dp) return toast("Setiap baris wajib memiliki Upload DP / File Dokumen.");
  }
  rows.forEach(r => {
    proc[type].push(mov(
      r.tanggal,
      proc.contract.noPks,
      r.termin,
      r.satuanKerja,
      r.jenisBarang,
      r.satuan,
      r.tarif,
      r.volume,
      parseNumID(data.tahunPks) || new Date().getFullYear(),
      r.dp
    ));
  });
  save();
  toast(`${numID(rows.length)} baris ${type === "shipments" ? "pengiriman" : "penerimaan"} berhasil disimpan.`);
  modalOpen() ? detail(proc.id) : render();
}

function movTable(type) {
  let list = [];
  vis().forEach(proc => (proc[type] || []).forEach(row => list.push({ proc, ...row })));
  if (!list.length) return `<div class="card empty">Belum ada data.</div>`;
  return `<div class="tableWrap"><table><thead><tr>
    <th>Pengadaan</th><th>Tanggal</th><th>No PKS</th><th>Termin</th>
    <th>Satuan Kerja</th><th>Nama Barang</th><th>Tarif</th>
    <th>Volume</th><th>Nilai</th><th>Upload DP / File Dokumen</th>
  </tr></thead><tbody>${list.map(x => `<tr>
    <td data-label="Pengadaan"><b>${esc(x.proc.nama)}</b></td>
    <td data-label="Tanggal">${d(x.tanggal)}</td>
    <td data-label="No PKS">${esc(x.noPks)}</td>
    <td data-label="Termin">${esc(x.termin)}</td>
    <td data-label="Satuan Kerja">${esc(x.satuanKerja)}</td>
    <td data-label="Nama Barang">${esc(x.jenisBarang)}</td>
    <td data-label="Tarif">${rp(x.tarif)}</td>
    <td data-label="Volume">${numID(x.volume)} ${esc(x.satuan || "")}</td>
    <td data-label="Nilai">${rp(x.nilai)}</td>
    <td data-label="Upload">${esc(x.dp || "-")}</td>
  </tr>`).join("")}</tbody></table></div>`;
}

function shipping() {
  const rows = vis().filter(x => spmk(x) && x.allocations.length);
  return `<div class="help ok">Tanggal pengiriman dapat dipilih dari kalender. Nomor PKS otomatis dari Masa Pelaksanaan dan Nama Barang diambil dari data Alokasi KPH.</div>
  <div class="card pad" style="margin-top:14px">
    <h2 style="margin-top:0">Form Pengiriman Barang</h2>
    ${can("Pengiriman Barang", "tambah") ? multiMovementForm(null, "shipMultiForm", "shipments") : `<div class="help warn">Role Anda tidak dapat menambah pengiriman.</div>`}
  </div>
  <div class="head"><h2>Data Pengiriman</h2></div>
  ${movTable("shipments")}`;
}

function receiving() {
  const rows = vis().filter(x => spmk(x) && x.shipments.length);
  return `<div class="help ${rows.length ? "ok" : "warn"}">Tanggal penerimaan dapat dipilih dari kalender. Nomor PKS otomatis dari Masa Pelaksanaan dan Nama Barang diambil dari data Alokasi KPH.</div>
  <div class="card pad" style="margin-top:14px">
    <h2 style="margin-top:0">Form Penerimaan Barang</h2>
    ${can("Penerimaan Barang", "tambah") ? multiMovementForm(null, "recMultiForm", "receipts") : `<div class="help warn">Role Anda tidak dapat menambah penerimaan.</div>`}
  </div>
  <div class="head"><h2>Data Penerimaan</h2></div>
  ${movTable("receipts")}`;
}

// ========== MONITORING ==========
function summary() {
  const rows = vis();
  const us = rows.reduce((a, x) => a + totalUsulan(x), 0);
  const sh = rows.reduce((a, x) => a + shipTotal(x), 0);
  const re = rows.reduce((a, x) => a + recTotal(x), 0);
  return `<div class="kpiRow">
    <div class="mini"><span>Total Usulan</span><b>${numID(us)}</b></div>
    <div class="mini"><span>Total Terkirim</span><b>${numID(sh)}</b><small>${pct(sh, us)}%</small></div>
    <div class="mini"><span>Total Diterima</span><b>${numID(re)}</b><small>${pct(re, us)}%</small></div>
  </div>`;
}

function monitoring() {
  const rows = vis();
  return `<div class="grid cards">
    ${stat("all", "Total Pengadaan", rows.length, "Jumlah pengadaan")}
    ${stat("all", "Total Usulan", rows.reduce((a, x) => a + totalUsulan(x), 0), "Volume barang usulan")}
    ${stat("all", "Total Terkirim", rows.reduce((a, x) => a + shipTotal(x), 0), "Akumulasi volume kirim")}
    ${stat("all", "Total Diterima", rows.reduce((a, x) => a + recTotal(x), 0), "Akumulasi volume terima")}
  </div>
  <div class="head"><h2>Monitoring Barang Sesuai Usulan</h2></div>
  <div class="tableWrap"><table><thead><tr>
    <th>Pengadaan</th><th>Bidang</th><th>Total Usulan</th>
    <th>Total Terkirim</th><th>Total Diterima</th>
    <th>% Terkirim</th><th>% Diterima</th><th>Catatan</th>
  </tr></thead><tbody>${rows.map(x => {
    const sh = shipTotal(x);
    const re = recTotal(x);
    const us = totalUsulan(x);
    return `<tr>
      <td data-label="Pengadaan"><b>${esc(x.nama)}</b><br><small>${esc(x.jenisBarang)}</small></td>
      <td data-label="Bidang">${esc(x.bidang)}</td>
      <td data-label="Total Usulan">${numID(us)} ${esc(x.satuan || "Unit")}</td>
      <td data-label="Total Terkirim">${numID(sh)}</td>
      <td data-label="Total Diterima">${numID(re)}</td>
      <td data-label="% Terkirim"><div class="progress"><span style="width:${pct(sh, us)}%"></span></div><small>${pct(sh, us)}%</small></td>
      <td data-label="% Diterima"><div class="progress"><span style="width:${pct(re, us)}%"></span></div><small>${pct(re, us)}%</small></td>
      <td data-label="Catatan">${re >= us ? `<span class="badge green">Diterima 100%</span>` : `<span class="badge yellow">Belum 100%</span>`}</td>
    </tr>`;
  }).join("")}</tbody></table></div>`;
}

// ========== APPROVAL ==========
function quickApprovalCard(proc) {
  const st = STEPS[proc.currentStep];
  if (!st) return "";
  const g = currentGate(proc);
  const docs = docsForStep(proc, proc.currentStep);
  const canApprove = isPic(st);
  const hasDoc = docs.length > 0;

  return `<div class="card pad quickApprovalCard">
    <div class="quickApprovalHead">
      <button type="button" class="approvalNameClick" data-open-approval="${proc.id}">
        <b>${esc(proc.nama)}</b>
        <span>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)}</span>
      </button>
      <div class="tools">
        <span class="badge teal">PIC: ${esc(st.pic)}</span>
        <span class="badge ${due(proc).color}">${esc(due(proc).text)}</span>
      </div>
    </div>
    <div class="quickStep">
      <small>Tahapan aktif</small>
      <b>${esc(st.title)}</b>
      <span>${esc(st.detail || "")}</span>
    </div>
    <div class="help ${g.ok ? "ok" : "warn"}" style="margin-top:12px">
      ${g.ok ? "Syarat approval sudah lengkap. PIC dapat approve langsung dari kartu ini." : `Belum bisa approve: ${esc(g.msg)}`}
    </div>
    <form class="quickApprovalForm" data-proc-id="${proc.id}">
      <div class="formGrid compactApprovalGrid">
        <div class="field"><label>Nama Dokumen</label><input name="name" value="Dokumen ${esc(st.title)}" required></div>
        <div class="field full"><label>Upload Dokumen / Foto</label>
          <div class="uploadDpUnified">
            <div class="uploadDpActions">
              <label class="filePickBtn">
                <input name="fileUpload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*">
                <span>Pilih File</span>
              </label>
            </div>
            <small>Upload file dokumen pendukung approval.</small>
          </div>
        </div>
        <div class="field full"><label>Catatan</label><textarea name="note" placeholder="Catatan dokumen approval"></textarea></div>
        <div class="field full"><button class="btn primary" ${canApprove ? "" : "disabled"}>${hasDoc ? "Tambah Dokumen & Approve" : "Simpan Dokumen & Approve"}</button></div>
      </div>
    </form>
    ${docs.length ? `<div class="quickDocList">${docs.map(d => `<span class="badge blue">${esc(d.name || "Dokumen")} • ${esc(d.file || d.camera || "File")}</span>`).join("")}</div>` : ""}
  </div>`;
}

function approval() {
  const apps = vis().filter(x => x.currentStep < STEPS.length && isPic(STEPS[x.currentStep]));
  return `<div class="head" style="margin-top:0">
    <div><h2>Antrian Approval Anda</h2><small>Klik Buka untuk menampilkan hanya bagian aktif yang perlu di-approve.</small></div>
  </div>
  <div class="help ok"><b>Mode ringkas:</b> tab Approval hanya menampilkan tahapan aktif, syarat, dokumen pelengkap, dan tombol approve.</div>
  <br>
  <div class="quickApprovalList">
    ${apps.length ? apps.map(quickApprovalCard).join("") : `<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`}
  </div>`;
}

function quickApprovalSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const proc = db.procurements.find(p => p.id === +form.dataset.procId);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  const data = fd(form);
  const file = fileLabel(form.querySelector('[name="fileUpload"]'));
  if (!file) return toast("Pilih file dokumen terlebih dahulu.");
  proc.documents = proc.documents || [];
  proc.documents.push({
    stepId: proc.currentStep,
    stepTitle: STEPS[proc.currentStep]?.title || "-",
    name: data.name || `Dokumen ${STEPS[proc.currentStep]?.title || "Approval"}`,
    file: file,
    camera: "",
    note: data.note || "",
    by: session.name,
    role: session.role,
    at: new Date().toISOString()
  });
  save();
  approve(proc.id);
}

function approve(id) {
  const proc = db.procurements.find(p => p.id === +id);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  if (!document.querySelector('.approvalDetailModal') && !document.querySelector('.quickApprovalCard')) {
    return openApprovalTarget(id);
  }

  const current = proc.currentStep;
  const g = currentGate(proc);
  if (!g.ok) return toast(g.msg);

  proc.stepStartedAt = proc.stepStartedAt || {};
  if (!proc.stepStartedAt[current]) proc.stepStartedAt[current] = today();

  if (!proc.completedSteps.includes(current)) proc.completedSteps.push(current);
  proc.approvals = proc.approvals || [];
  proc.approvals.push({
    stepId: current,
    stepTitle: STEPS[current]?.title || "-",
    pic: STEPS[current]?.pic || "-",
    startedAt: proc.stepStartedAt[current],
    approvedBy: session?.name || "User",
    approvedRole: session?.role || "-",
    approvedAt: new Date().toISOString(),
    workDays: workDaysInclusive(proc.stepStartedAt[current], today())
  });
  proc.currentStep = Math.min(STEPS.length, current + 1);
  if (proc.currentStep < STEPS.length) {
    proc.stepStartedAt[proc.currentStep] = today();
  }
  save();
  toast("Approval berhasil disimpan.");
  refreshAfterApprove(proc);
}

function refreshAfterApprove(proc) {
  try {
    if (state.page === "approval" && typeof compactApprovalDetail === "function") {
      render();
      setTimeout(() => compactApprovalDetail(proc.id), 0);
      return;
    }
    if (document.querySelector('.approvalDetailModal') && typeof detail === "function") {
      detail(proc.id);
      return;
    }
    render();
  } catch (err) {
    console.error("Refresh approval error", err);
    try { render(); } catch (e) { /* ignore */ }
  }
}

function openApprovalTarget(id) {
  const proc = db.procurements.find(p => p.id === +id);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  state.page = "approval";
  state.forceApprovalProc = proc.id;
  render();
  setTimeout(() => compactApprovalDetail(proc.id), 0);
}

// ========== COMPACT APPROVAL DETAIL ==========
function compactApprovalDetail(id) {
  const proc = db.procurements.find(p => p.id === +id);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  proc.documents = proc.documents || [];

  const step = STEPS[proc.currentStep];
  if (!step) {
    document.getElementById("modalRoot").innerHTML = `<div class="modalBack"><div class="modal"><div class="modalBody"><div class="help ok"><b>Pengadaan selesai.</b> Semua tahapan approval sudah disetujui.</div></div></div></div>`;
    return;
  }

  const g = currentGate(proc);
  const docs = docsForStep(proc, proc.currentStep);
  const target = step.days === null ? "Flexible" : `${numID(step.days)} hari`;

  document.getElementById("modalRoot").innerHTML = `
    <div class="modalBack">
      <div class="modal modalWide approvalDetailModal compactApprovalModal">
        <div class="modalHead">
          <div>
            <h2>${esc(proc.nama)}</h2>
            <small>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)} • ${numID(totalUsulan(proc))} ${esc(proc.satuan || "Unit")}</small>
          </div>
          <div class="tools"><button type="button" class="btn ghost small" id="closeModal">Tutup</button></div>
        </div>
        <div class="modalBody">
          <div class="kpiRow approvalKpi compactOnlyKpi">
            <div class="mini"><span>Status</span><b>${esc(status(proc).text)}</b></div>
            <div class="mini"><span>Progress</span><b>${prog(proc)}%</b></div>
            <div class="mini"><span>PIC Aktif</span><b style="font-size:18px">${esc(step.pic)}</b></div>
            <div class="mini"><span>Tata Waktu</span><b style="font-size:18px">${esc(due(proc).text)}</b></div>
          </div>
          <div class="help ok approvalCompactNotice"><b>Tampilan ringkas:</b> hanya tahapan aktif yang perlu disetujui dan form kelengkapannya.</div>
          <section class="approvalOnlyActive currentApprovalBox">
            <div class="head compactHead" style="margin-top:0">
              <div><h2>Bagian yang Perlu Di-approve</h2><small>Hanya tahapan aktif yang ditampilkan.</small></div>
              <div class="tools">
                <span class="badge teal">PIC: ${esc(step.pic)}</span>
                <span class="badge ${g.ok ? "green" : "yellow"}">${g.ok ? "Siap approve" : "Perlu dilengkapi"}</span>
              </div>
            </div>
            <div class="approvalStepSingle">
              <div class="singleStepNumber">${proc.currentStep + 1}</div>
              <div class="singleStepMain">
                <div class="kicker">Tahapan aktif</div>
                <h3>${esc(step.title)}</h3>
                <p>${esc(step.phase)} • Target: <b>${esc(target)}</b></p>
                <div class="help"><b>Penjelasan:</b> ${esc(step.detail || "-")}</div>
                <div class="help ${g.ok ? "ok" : "warn"}"><b>Status approval:</b> ${esc(g.msg)}</div>
                <div class="docCount"><span class="badge ${docs.length ? "blue" : "yellow"}">Dokumen tahapan: ${numID(docs.length)}</span></div>
              </div>
            </div>
            <div class="approvalOnlyNeeds">
              ${uploadRequirementPanel(proc)}
            </div>
            <div class="approvalStickyAction approvalOnlyAction">
              ${isPic(step) ?
                `<button type="button" class="btn primary" data-approve="${proc.id}" ${g.ok ? "" : "disabled"}>Approve Tahapan Ini</button>` :
                `<span class="badge gray">Menunggu PIC ${esc(step.pic)}</span>`
              }
            </div>
          </section>
        </div>
      </div>
    </div>`;

  document.getElementById("closeModal").onclick = () => document.getElementById("modalRoot").innerHTML = "";
  document.querySelectorAll('[data-approve]').forEach(btn => {
    btn.onclick = () => approve(Number(btn.dataset.approve));
  });
  bindMultiForms();
  bindFormattedInputs();
  setTimeout(() => {
    const box = document.querySelector('.approvalOnlyActive');
    if (box) {
      box.classList.add('approvalFocusPulse');
      try { box.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { box.scrollIntoView(); }
      setTimeout(() => box.classList.remove('approvalFocusPulse'), 1200);
    }
  }, 0);
}

function uploadRequirementPanel(proc) {
  const id = proc.currentStep;
  const ok = stepUploadOk(proc, id);
  return `<div class="uploadRequired ${ok ? "ok" : "need"}">
    <div>
      <b>Upload dokumen wajib tahapan</b><br>
      <small>Setiap alur proses wajib memiliki dokumen. Pilih file atau ambil foto langsung dari kamera HP/laptop.</small>
    </div>
    <span class="badge ${ok ? "green" : "yellow"}">${ok ? "Dokumen tersedia" : "Belum upload"}</span>
  </div>
  <form id="docForm" data-proc-id="${proc.id}">
    <div class="formGrid">
      <div class="field"><label>Nama Dokumen / Kelengkapan</label><input name="name" required placeholder="Contoh: BA Klarifikasi, ND, Invoice, DP"></div>
      <div class="field full"><label>Upload File Dokumen</label>
        <div class="uploadDpUnified">
          <div class="uploadDpActions">
            <label class="filePickBtn">
              <input name="fileUpload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*">
              <span>Pilih File</span>
            </label>
          </div>
          <small>File atau foto tersimpan sebagai dokumen tahapan approval.</small>
        </div>
      </div>
      <div class="field"><label>Tahapan</label><input value="${esc(STEPS[id]?.title || "-")}" disabled></div>
      <div class="field full"><label>Catatan</label><textarea name="note" placeholder="Catatan kelengkapan dokumen"></textarea></div>
      <div class="field full"><button class="btn secondary">Simpan Kelengkapan</button></div>
    </div>
  </form>
  ${documentList(proc, id)}`;
}

function documentList(proc, stepId) {
  const docs = docsForStep(proc, stepId);
  if (!docs.length) {
    return `<div class="help" style="margin-top:12px">Belum ada dokumen/kelengkapan untuk tahapan ini. Pilih file atau ambil foto langsung agar data masuk ke Upload File Dokumen.</div>`;
  }
  return `<div class="tableWrap" style="margin-top:12px"><table><thead><tr>
    <th>Dokumen</th><th>Upload File Dokumen</th><th>Catatan</th><th>Diinput Oleh</th><th>Waktu</th>
  </tr></thead><tbody>
    ${docs.map(d => `<tr>
      <td data-label="Dokumen"><b>${esc(d.name)}</b></td>
      <td data-label="Upload">${esc(d.file || d.camera || "-")}</td>
      <td data-label="Catatan">${esc(d.note || "-")}</td>
      <td data-label="Diinput Oleh">${esc(d.by || "-")}<br><small>${esc(d.role || "")}</small></td>
      <td data-label="Waktu">${d.at ? new Date(d.at).toLocaleString("id-ID") : "-"}</td>
    </tr>`).join("")}
  </tbody></table></div>`;
}

function saveDocumentForm(e) {
  e.preventDefault();
  const form = e.target;
  const proc = db.procurements.find(p => p.id === +form.dataset.procId);
  if (!proc) return toast("Pengadaan tidak ditemukan.");
  const data = fd(form);
  const file = fileLabel(form.querySelector('[name="fileUpload"]'));
  if (!file) return toast("Pilih file dokumen terlebih dahulu.");
  proc.documents = proc.documents || [];
  proc.documents.push({
    stepId: proc.currentStep,
    stepTitle: STEPS[proc.currentStep]?.title || "-",
    name: data.name,
    file: file,
    camera: "",
    note: data.note || "",
    by: session.name,
    role: session.role,
    at: new Date().toISOString()
  });
  save();
  toast("Dokumen/kelengkapan berhasil disimpan.");
  compactApprovalDetail(proc.id);
}

// ========== DETAIL (legacy) ==========
function detail(id) {
  if (state.page === "approval") return compactApprovalDetail(id);
  const proc = db.procurements.find(p => p.id === +id);
  if (!proc) return toast("Pengadaan tidak ditemukan.");

  // Simple detail view for non-approval pages
  const st = STEPS[proc.currentStep];
  document.getElementById("modalRoot").innerHTML = `
    <div class="modalBack">
      <div class="modal">
        <div class="modalHead">
          <div><h2>${esc(proc.nama)}</h2><small>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)}</small></div>
          <button type="button" class="btn ghost small" id="closeDetailModal">Tutup</button>
        </div>
        <div class="modalBody">
          <div class="kpiRow">
            <div class="mini"><span>Status</span><b>${esc(status(proc).text)}</b></div>
            <div class="mini"><span>Progress</span><b>${prog(proc)}%</b></div>
            <div class="mini"><span>Vendor</span><b>${esc(proc.vendor || "-")}</b></div>
          </div>
          <div style="height:16px"></div>
          <div class="help"><b>Tahapan aktif:</b> ${st ? esc(st.title) : "Selesai"} • PIC: ${st ? esc(st.pic) : "-"}</div>
          <div style="height:16px"></div>
          <div class="tableWrap"><table><thead><tr><th>#</th><th>Tahapan</th><th>PIC</th><th>Status</th></tr></thead><tbody>
            ${STEPS.map((s, i) => `<tr>
              <td>${i + 1}</td>
              <td>${esc(s.title)}</td>
              <td>${esc(s.pic)}</td>
              <td>${proc.completedSteps.includes(i) ? '<span class="badge green">Approved</span>' : i === proc.currentStep ? '<span class="badge yellow">Aktif</span>' : '<span class="badge gray">Menunggu</span>'}</td>
            </tr>`).join("")}
          </tbody></table></div>
        </div>
      </div>
    </div>`;
  document.getElementById("closeDetailModal").onclick = () => document.getElementById("modalRoot").innerHTML = "";
}

// ========== ROLE & PERMISSION ==========
function roles() {
  if (!can("Role & Permission")) return denied("Anda tidak memiliki akses Role & Permission.");
  return `<div class="head" style="margin-top:0">
    <h2>Role & Permission</h2>
    ${can("Role & Permission", "edit") ? `<button class="btn primary small" id="savePerm">Simpan Permission</button>` : ""}
  </div>
  <div class="help">Admin dapat mengatur permission per modul: LIHAT, TAMBAH, EDIT, HAPUS.</div>
  <br>
  <div class="tableWrap">
    <div class="permGrid">
      <div class="phead">Role</div><div class="phead">Modul</div>
      <div class="phead">Lihat</div><div class="phead">Tambah</div>
      <div class="phead">Edit</div><div class="phead">Hapus</div>
      ${ROLES.map(r => MODULES.map(m => `
        <div><b>${esc(r)}</b></div>
        <div>${esc(m)}</div>
        ${ACTIONS.map(a => `<div><input type="checkbox" data-perm="${esc(r)}|${esc(m)}|${a}" ${db.permissions?.[r]?.[m]?.[a] ? "checked" : ""} ${can("Role & Permission", "edit") ? "" : "disabled"}></div>`).join("")}
      `).join("")).join("")}
    </div>
  </div>`;
}

function savePerms() {
  document.querySelectorAll("[data-perm]").forEach(cb => {
    const [r, m, a] = cb.dataset.perm.split("|");
    if (db.permissions[r] && db.permissions[r][m]) {
      db.permissions[r][m][a] = cb.checked;
    }
  });
  save();
  toast("Permission berhasil disimpan.");
}

// ========== USER MANAGEMENT ==========
function users() {
  if (!can("User Management")) return denied("Anda tidak memiliki akses User Management.");
  return `<div class="split">
    <div class="card pad">
      <h2 style="margin-top:0">Tambah User</h2>
      ${can("User Management", "tambah") ? `<form id="userForm">
        <div class="formGrid" style="grid-template-columns:1fr">
          <div class="field"><label>Nama</label><input name="name" required></div>
          <div class="field"><label>Email</label><input name="email" type="email" required></div>
          <div class="field"><label>Password</label><input name="password" required></div>
          <div class="field"><label>Role</label><select name="role">${ROLES.map(r => `<option>${esc(r)}</option>`).join("")}</select></div>
          <div class="field"><label>Bidang</label><input name="bidang" required></div>
          <button class="btn primary">Tambah User</button>
        </div>
      </form>` : `<div class="help warn">Role Anda tidak dapat menambah user.</div>`}
    </div>
    <div class="tableWrap">
      <table><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Bidang</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>${db.users.map(x => `<tr>
        <td><b>${esc(x.name)}</b></td>
        <td>${esc(x.email)}</td>
        <td>${esc(x.role)}</td>
        <td>${esc(x.bidang)}</td>
        <td><span class="badge ${x.active ? "green" : "gray"}">${x.active ? "Aktif" : "Nonaktif"}</span></td>
        <td>${can("User Management", "edit") && x.role !== "Admin" ? `<button class="btn ghost small" data-toggle-user="${x.id}">${x.active ? "Nonaktifkan" : "Aktifkan"}</button>` : "-"}</td>
      </tr>`).join("")}</tbody></table>
    </div>
  </div>`;
}

function saveUser(e) {
  e.preventDefault();
  const x = fd(e.target);
  if (db.users.some(u => u.email === x.email)) return toast("Email sudah digunakan.");
  db.users.push(u(db.nextUserId++, x.name, x.email, x.password, x.role, x.bidang));
  save();
  toast("User berhasil ditambahkan.");
  render();
}

// ========== BRANDING ==========
function branding() {
  return `<div class="card pad">
    <h2 style="margin-top:0">Cara Mengganti Logo, Favicon, dan Nama Web</h2>
    <div class="help ok">Semua pengaturan branding ada di file <b>config.js</b>. Logo dan favicon ada di folder <b>assets</b>.</div>
    <div class="thirds" style="margin-top:16px">
      <div class="mini"><span>Nama Web</span><b style="font-size:18px">${esc(CONFIG.appName)}</b></div>
      <div class="mini"><span>Logo</span><b style="font-size:18px">${esc(CONFIG.logoUrl)}</b></div>
      <div class="mini"><span>Favicon</span><b style="font-size:18px">${esc(CONFIG.faviconUrl)}</b></div>
    </div>
    <h3>Contoh config.js</h3>
    <pre>window.APP_CONFIG = {
  appName: "Monitoring Pengadaan Barang",
  shortName: "MPB",
  organizationName: "Divre",
  logoUrl: "assets/logo.svg",
  faviconUrl: "assets/favicon.svg",
  primaryColor: "#2563eb",
  secondaryColor: "#0f766e",
  accentColor: "#f59e0b"
};</pre>
    <div class="help warn">Untuk mengganti logo, simpan file logo baru di folder assets, lalu ubah logoUrl menjadi path file tersebut.</div>
  </div>`;
}

function denied(m) {
  return `<div class="card pad"><h2>Akses Ditolak</h2><p class="note">${esc(m)}</p></div>`;
}

// ========== MULTI FORMS BINDING ==========
function bindMultiForms() {
  // Allocation groups
  document.querySelectorAll('[data-add-allocation-group]').forEach(btn => {
    btn.onclick = () => {
      const form = btn.closest('form');
      const box = form.querySelector('[data-container="allocation"]');
      box.insertAdjacentHTML('beforeend', allocationGroupTemplate());
      bindMultiForms();
      bindFormattedInputs(form);
      bindAllocationNilai(form);
    };
  });

  document.querySelectorAll('[data-add-allocation-item]').forEach(btn => {
    btn.onclick = () => {
      const group = btn.closest('[data-allocation-group]');
      const box = group.querySelector('[data-allocation-items]');
      box.insertAdjacentHTML('beforeend', allocationItemRow());
      bindMultiForms();
      bindFormattedInputs(group);
      bindAllocationNilai(group);
    };
  });

  document.querySelectorAll('[data-remove-allocation-item]').forEach(btn => {
    btn.onclick = () => {
      const group = btn.closest('[data-allocation-group]');
      if (group.querySelectorAll('.allocationItemRow').length <= 1) {
        return toast('Minimal satu barang pada setiap Satuan Kerja.');
      }
      btn.closest('.allocationItemRow')?.remove();
    };
  });

  document.querySelectorAll('[data-remove-allocation-group]').forEach(btn => {
    btn.onclick = () => {
      const wrap = btn.closest('.multiRows');
      if (wrap && wrap.querySelectorAll('[data-allocation-group]').length <= 1) {
        return toast('Minimal harus ada satu Satuan Kerja.');
      }
      btn.closest('[data-allocation-group]')?.remove();
    };
  });

  // Movement rows
  document.querySelectorAll('[data-add-movement-row]').forEach(btn => {
    btn.onclick = () => {
      const form = btn.closest('form');
      const type = btn.dataset.addMovementRow;
      const proc = selectedProcFromForm(form);
      const box = form.querySelector(`[data-container="${type}"]`);
      box.insertAdjacentHTML('beforeend', movementRowTemplate({}, type === "receipts", proc?.id));
      bindMultiForms();
      bindFormattedInputs(form);
    };
  });

  document.querySelectorAll('[data-remove-row]').forEach(btn => {
    btn.onclick = () => {
      const wrap = btn.closest('.multiRows');
      if (wrap && wrap.querySelectorAll('.multiRow').length <= 1) {
        return toast('Minimal harus ada satu baris.');
      }
      btn.closest('.multiRow')?.remove();
    };
  });

  // Form submissions
  [["approvalAllocForm", "allocation"], ["allocMultiForm", "allocation"]].forEach(([id]) => {
    const f = document.getElementById(id);
    if (f) f.onsubmit = saveMultiAllocation;
  });

  [["approvalShipForm", "shipments"], ["shipMultiForm", "shipments"],
   ["approvalRecForm", "receipts"], ["recMultiForm", "receipts"]].forEach(([id, type]) => {
    const f = document.getElementById(id);
    if (f) {
      f.onsubmit = e => saveMultiMovement(e, type);
      bindMovementAuto(f, type);
    }
  });

  // Sync allocation header
  document.querySelectorAll('form[data-kind="allocation"] [data-proc-select]').forEach(sel => {
    sel.onchange = () => syncAllocationHeader(sel.closest('form'));
    syncAllocationHeader(sel.closest('form'));
  });

  bindAllocationNilai(document);
  bindFormattedInputs();

  // Quick approval forms
  document.querySelectorAll('.quickApprovalForm').forEach(f => {
    f.onsubmit = quickApprovalSubmit;
  });
}

// ========== FORMATTED INPUTS ==========
function bindFormattedInputs(scope = document) {
  scope.querySelectorAll?.('.num-id').forEach(el => {
    if (el.dataset.numBound) return;
    el.dataset.numBound = '1';
    el.oninput = () => {
      const pos = el.selectionStart;
      el.value = numID(parseNumID(el.value));
      try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) { /* ignore */ }
    };
  });

  // Convert date-id to native date inputs
  scope.querySelectorAll?.('input.date-id').forEach(el => {
    if (el.dataset.dateConverted) return;
    el.dataset.dateConverted = '1';
    const val = normalizeDate(el.value);
    try { el.type = 'date'; } catch (e) { /* ignore */ }
    el.classList.remove('date-id');
    el.removeAttribute('inputmode');
    el.removeAttribute('placeholder');
    if (val) el.value = val;
    el.oninput = null;
  });
}

// ========== RENDER ==========
function render() {
  const app = document.getElementById("app");
  if (!session || !cur()) {
    app.innerHTML = login();
    bindLogin();
    return;
  }
  app.innerHTML = shell();
  bindShell();
  page();
}

function page() {
  const c = document.getElementById("content");
  const map = {
    dashboard,
    procurements: () => `<div class="head" style="margin-top:0"><h2>Data Pengadaan</h2><div class="tools">${canInput() ? `<button class="btn primary small" data-go="input">+ Input Pengadaan</button>` : ""}</div></div>${procTable(vis())}`,
    input,
    approval,
    masa,
    allocation,
    shipping,
    receiving,
    monitoring,
    roles,
    users,
    branding
  };
  c.innerHTML = (map[state.page] || dashboard)();
  bindPage();
}

function bindPage() {
  document.querySelectorAll("[data-filter]").forEach(b => {
    b.onclick = () => {
      state.filter = b.dataset.filter;
      if (state.page === "dashboard") state.page = "procurements";
      render();
    };
  });

  document.querySelectorAll("[data-go]").forEach(b => {
    b.onclick = () => {
      state.page = b.dataset.go;
      render();
    };
  });

  document.querySelectorAll("[data-detail]").forEach(b => {
    b.onclick = () => detail(+b.dataset.detail);
  });

  document.querySelectorAll("[data-open-approval]").forEach(b => {
    b.onclick = () => openApprovalTarget(+b.dataset.openApproval);
  });

  document.querySelectorAll("[data-approval-detail]").forEach(b => {
    b.onclick = () => openApprovalTarget(+b.dataset.approvalDetail);
  });

  document.querySelectorAll("[data-edit]").forEach(b => {
    b.onclick = () => editProc(+b.dataset.edit);
  });

  document.querySelectorAll("[data-contract]").forEach(b => {
    b.onclick = () => contract(+b.dataset.contract);
  });

  document.querySelectorAll("[data-delete-proc]").forEach(b => {
    b.onclick = () => deleteProc(+b.dataset.deleteProc);
  });

  document.querySelectorAll("[data-toggle-user]").forEach(b => {
    b.onclick = () => {
      const u = db.users.find(x => x.id === +b.dataset.toggleUser);
      if (u) {
        u.active = !u.active;
        save();
        render();
      }
    };
  });

  const resetBtn = document.querySelector("[data-reset]");
  if (resetBtn) resetBtn.onclick = reset;

  const toggleDetails = document.getElementById("toggleDetails");
  if (toggleDetails) toggleDetails.onclick = () => { state.details = !state.details; render(); };

  // Form submissions
  const procForm = document.getElementById("procForm");
  if (procForm) procForm.onsubmit = saveProc;

  const contractFormEl = document.getElementById("contractForm");
  if (contractFormEl) bindContractForm();

  const userForm = document.getElementById("userForm");
  if (userForm) userForm.onsubmit = saveUser;

  const docForm = document.getElementById("docForm");
  if (docForm) docForm.onsubmit = saveDocumentForm;

  const savePermBtn = document.getElementById("savePerm");
  if (savePermBtn) savePermBtn.onclick = savePerms;

  bindMultiForms();
  bindFormattedInputs();
}

// ========== INISIALISASI ==========
try {
  render();
} catch (e) {
  console.error("Error initializing MPB:", e);
  document.getElementById("app").innerHTML = `<div class="error">Error memuat aplikasi: ${e.message}</div>`;
}
