const __MPB_STORAGE=(()=>{
  try{
    const k="__mpb_storage_test__";
    window.localStorage.setItem(k,"1");
    window.localStorage.removeItem(k);
    return window.localStorage;
  }catch(e){
    console.warn("LocalStorage tidak tersedia, memakai memory storage sementara.", e);
    const m={};
    return {getItem:k=>Object.prototype.hasOwnProperty.call(m,k)?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}};
  }
})();
const CONFIG={appName:"Monitoring Pengadaan Barang",shortName:"MPB",organizationName:"Divre",logoUrl:"assets/logo.svg",faviconUrl:"assets/favicon.svg",primaryColor:"#2563eb",secondaryColor:"#0f766e",accentColor:"#f59e0b",...(window.APP_CONFIG||{})};
document.title=CONFIG.appName;document.documentElement.style.setProperty("--primary",CONFIG.primaryColor);document.documentElement.style.setProperty("--secondary",CONFIG.secondaryColor);document.documentElement.style.setProperty("--accent",CONFIG.accentColor);document.getElementById("favicon").href=CONFIG.faviconUrl;
const DB_KEY="mpb_modern_db_v27_operational",SESSION_KEY="mpb_modern_session_v27_operational";
const ROLES=["Admin","Bidang Terkait","PBJ","Kadivre","Legal","Wakadivre","Kadep Suike","Vendor","KSS Sarpra KPH","TPHP","PPHP","Kasi Sarpra","Kasi Angja","Korektor Pajak","Korektor Angja","KSS Angja","Umum"];
const MODULES=["Dashboard","Data Pengadaan","Input Pengadaan","Approval","Masa Pelaksanaan","Alokasi KPH","Pengiriman Barang","Penerimaan Barang","Monitoring Barang","Role & Permission","User Management","Branding"];
const ACTIONS=["lihat","tambah","edit","hapus"];
const s=(title,pic,days,detail)=>({title,pic,days,detail});
const WORKFLOW=[
{phase:"Usulan & Persetujuan",items:[s("Surat Usulan Pengadaan ke Direksi","Bidang Terkait",2,"Dokumen usulan wajib diisi oleh Bidang Terkait/Bidang Teknis."),s("Persetujuan Anggaran & HPS","Kadivre",null,"Flexible. Aktif jika persetujuan anggaran dan HPS sudah turun dari Kanpus."),s("Disposisi Persetujuan Anggaran","Kadivre",2,"Disposisi persetujuan anggaran."),s("Disposisi Pemberitahuan HPS","Kadivre",2,"Disposisi pemberitahuan HPS.")]},
{phase:"Pengadaan",items:[s("BA Pembahasan Proses Pengadaan","PBJ",1,"Berita acara pembahasan proses pengadaan."),s("Pemberitahuan Mulai Proses","PBJ",1,"Pemberitahuan mulai proses."),s("Penyusunan Dokumen Pengadaan","PBJ",1,"Penyusunan dokumen pengadaan."),s("Undangan Penawaran","PBJ",1,"Undangan penawaran."),s("Penjelasan Pekerjaan","PBJ",2,"Penjelasan pekerjaan."),s("BA Pemasukan, Pembukaan Dok, Penawaran","PBJ",3,"BA pemasukan, pembukaan dokumen, dan penawaran."),s("BA Hasil Penilaian Dok Penawaran","PBJ",1,"BA hasil penilaian dokumen penawaran."),s("Undangan Klarifikasi & Negosiasi","PBJ",1,"Undangan klarifikasi dan negosiasi."),s("BA Klarifikasi & Negosiasi","PBJ",1,"BA klarifikasi dan negosiasi."),s("ND Usul Penetapan Pemenang","PBJ",1,"Nota dinas usul penetapan pemenang."),s("ND Penetapan Pemenang","PBJ",1,"Nota dinas penetapan pemenang."),s("Surat Pengumuman Pemenang","PBJ",1,"Surat pengumuman pemenang."),s("Masa Sanggah","PBJ",2,"Masa sanggah."),s("SPPBJ","PBJ",7,"Surat Penunjukan Penyedia Barang/Jasa.")]},
{phase:"Kontrak & Pelaksanaan",items:[s("Vendor Membayar Jaminan","PBJ",7,"Bukti vendor membayar jaminan."),s("ND Selesai Proses","PBJ",1,"Nota dinas selesai proses."),s("Draf Perjanjian","Bidang Terkait",7,"Draf perjanjian oleh Bidang Terkait."),s("Review Perjanjian","Legal",7,"Review perjanjian oleh Legal."),s("TTD Vendor","PBJ",2,"Penandatangan kontrak oleh vendor."),s("Paraf User","Bidang Terkait",2,"Paraf user bidang terkait."),s("Paraf Kadep SDM, Umum, IT & Keuangan","Kadep Suike",2,"Paraf Kadep SUIKE."),s("Paraf Wakadivre","Wakadivre",2,"Paraf Wakadivre."),s("TTD Kadivre","Kadivre",2,"TTD Kadivre."),s("SPMK","PBJ",7,"Setelah SPMK, vendor dapat diisi dan form alokasi/pelaksanaan dibuka."),s("Masa Pelaksanaan Pekerjaan","PBJ",null,"Flexible. Isi tanggal perjanjian sesuai kontrak.")]},
{phase:"Pengiriman & Pemeriksaan",items:[s("Kegiatan Pengisian Alokasi Barang Per KPH","PBJ",2,"Form alokasi wajib diisi sebelum approval."),s("Vendor Melaksanakan Pengiriman Barang","PBJ",null,"Input form pengiriman barang dan upload DP pengiriman."),s("KPH Menerima Barang","KSS Sarpra KPH",null,"Penerimaan baru aktif setelah pengiriman tersimpan."),s("Monitoring Penerimaan Barang","Bidang Terkait",null,"Pantau total terkirim dan diterima."),s("Pemeriksaan TPHP KPH","TPHP",1,"Aktif setelah barang diterima 100%."),s("TPHP KPH membuat BA Pemeriksaan Barang","KSS Sarpra KPH",3,"Upload BA pemeriksaan dan dokumen lain."),s("Pengiriman BA Pemeriksaan & Kelengkapan ke Kantor Divre","KSS Sarpra KPH",7,"Pengiriman dokumen asli."),s("Surat Permohonan Pemeriksaan dari Vendor","Umum",2,"Setelah informasi barang diterima 100%."),s("Disposisi Kadivre Permohonan Pemeriksaan","Kadivre",2,"Disposisi permohonan pemeriksaan."),s("ND Permohonan Pemeriksaan Pengadaan","Bidang Terkait",2,"ND permohonan pemeriksaan pengadaan."),s("Disposisi Kadivre Pemeriksaan Pengadaan","Kadivre",2,"Disposisi pemeriksaan pengadaan."),s("BA Pemeriksaan PPHP","PPHP",2,"BA pemeriksaan PPHP.")]},
{phase:"Pembayaran & Selesai",items:[s("Surat Permohonan Pembayaran dari Vendor","Kasi Sarpra",2,"Surat permohonan pembayaran dari vendor."),s("Menerima BA Pemeriksaan dan Kelengkapan dari TPHP","KSS Sarpra KPH",2,"Menerima BA pemeriksaan dan kelengkapan dari TPHP."),s("TTD Vendor","Kasi Sarpra",2,"TTD BA Pemeriksaan PPHP & kelengkapan DP."),s("TTD Sekretaris PPHP","Kasi Sarpra",2,"TTD Sekretaris PPHP."),s("TTD Ketua PPHP","Bidang Terkait",2,"TTD Ketua PPHP."),s("TTD Anggota PPHP","Kasi Angja",2,"TTD Anggota PPHP."),s("TTD Kadep User","Bidang Terkait",2,"TTD Kadep User."),s("TTD Wakadivre","Wakadivre",2,"TTD Wakadivre."),s("TTD BA Serah Terima","Kadivre",2,"TTD BA Serah Terima."),s("Invoice, kwitansi, Faktur Pajak, dan berkas lainnya","Kasi Sarpra",2,"Upload invoice, kwitansi, faktur pajak, dan berkas lain."),s("Koreksi Korektor Pajak","Korektor Pajak",2,"Koreksi pajak."),s("Koreksi berkas oleh korektor Angja","Korektor Angja",5,"Koreksi berkas oleh korektor Angja."),s("Koreksi berkas oleh Kasi Angja","Kasi Angja",2,"Koreksi berkas oleh Kasi Angja."),s("Koreksi berkas oleh Kadep SUIKE","Kadep SUIKE",2,"Koreksi berkas oleh Kadep SUIKE."),s("Paraf Wakadivre","Wakadivre",2,"Paraf Wakadivre."),s("TTD Kadivre","Kadivre",2,"TTD Kadivre."),s("Scan Berkas dan upload Dokumen","KSS Angja",1,"Scan berkas dan upload dokumen."),s("Menunggu Pembayaran dari Kanpus","Kadivre",null,"Flexible. Durasi tetap dihitung tanpa batas terlambat.")]}];
const STEPS=WORKFLOW.flatMap((p,pi)=>p.items.map((it,ii)=>({...it,id:WORKFLOW.slice(0,pi).reduce((a,b)=>a+b.items.length,0)+ii,phase:p.phase,phaseIndex:pi,itemIndex:ii})));const IDX={SPMK:STEPS.findIndex(x=>x.title==="SPMK"),MASA:STEPS.findIndex(x=>x.title==="Masa Pelaksanaan Pekerjaan"),ALOKASI:STEPS.findIndex(x=>x.title==="Kegiatan Pengisian Alokasi Barang Per KPH"),KIRIM:STEPS.findIndex(x=>x.title==="Vendor Melaksanakan Pengiriman Barang"),TERIMA:STEPS.findIndex(x=>x.title==="KPH Menerima Barang"),TPHP:STEPS.findIndex(x=>x.title==="Pemeriksaan TPHP KPH")};
let db=loadDb(),session=JSON.parse(__MPB_STORAGE.getItem(SESSION_KEY)||"null"),state={page:"dashboard",filter:"all",details:true};
function u(id,name,email,password,role,bidang){return{id,name,email,password,role,bidang,active:true}}function p(id,nama,bidang,jenisPengadaan,jenisBarang,satuan,totalUsulan,catatan,currentStep,createdAt){return{id,nama,bidang,jenisPengadaan,jenisBarang,satuan,totalUsulan:+totalUsulan,catatan:catatan||"",vendor:"",createdAt:createdAt||today(),currentStep,completedSteps:Array.from({length:currentStep},(_,i)=>i),approvals:[],allocations:[],shipments:[],receipts:[],contract:{noPks:"",tanggalPks:"",tanggalPerjanjian:"",tanggalMulai:"",tanggalAkhir:""}}}function alloc(vendor,noPks,tanggalPks,termin,tanggalMulai,tanggalAkhir,satuanKerja,jenisBarang,satuan,tarif,volume,tahunPks){return{vendor,noPks,tanggalPks,termin,tanggalMulai,tanggalAkhir,satuanKerja,jenisBarang,satuan,tarif:+tarif,volume:+volume,tahunPks:+tahunPks,nilai:+tarif*+volume}}function mov(tanggal,noPks,termin,satuanKerja,jenisBarang,satuan,tarif,volume,tahunPks,dp){return{tanggal,noPks,termin,satuanKerja,jenisBarang,satuan,tarif:+tarif,volume:+volume,tahunPks:+tahunPks,nilai:+tarif*+volume,dp:dp||""}}
function initialDb(){const permissions={};ROLES.forEach(r=>{permissions[r]={};MODULES.forEach(m=>permissions[r][m]={lihat:false,tambah:false,edit:false,hapus:false})});MODULES.forEach(m=>permissions.Admin[m]={lihat:true,tambah:true,edit:true,hapus:true});function set(role,mods,perm){mods.forEach(m=>permissions[role][m]={...permissions[role][m],...perm})}set("Bidang Terkait",["Dashboard","Data Pengadaan","Input Pengadaan","Approval","Monitoring Barang"],{lihat:true,edit:true});permissions["Bidang Terkait"]["Input Pengadaan"]={lihat:true,tambah:true,edit:true,hapus:false};set("PBJ",["Dashboard","Data Pengadaan","Approval","Masa Pelaksanaan","Alokasi KPH","Pengiriman Barang","Monitoring Barang"],{lihat:true,tambah:true,edit:true});["Kadivre","Legal","Wakadivre","Kadep Suike","Vendor","KSS Sarpra KPH","TPHP","PPHP","Kasi Sarpra","Kasi Angja","Korektor Pajak","Korektor Angja","KSS Angja","Umum"].forEach(r=>set(r,["Dashboard","Data Pengadaan","Approval","Monitoring Barang"],{lihat:true,edit:true}));permissions.Vendor["Pengiriman Barang"]={lihat:true,tambah:true,edit:true,hapus:false};permissions["KSS Sarpra KPH"]["Penerimaan Barang"]={lihat:true,tambah:true,edit:true,hapus:false};const users=[u(1,"Administrator","admin@pengadaan.local","admin123","Admin","Administrasi"),u(2,"Bidang Teknis IT","it@pengadaan.local","it123","Bidang Terkait","IT"),u(3,"Bidang Umum","umum.bidang@pengadaan.local","umum123","Bidang Terkait","Umum"),u(4,"Petugas PBJ","pbj@pengadaan.local","pbj123","PBJ","PBJ"),u(5,"Kadivre","kadivre@pengadaan.local","kadivre123","Kadivre","Direksi"),u(6,"Legal","legal@pengadaan.local","legal123","Legal","Legal"),u(7,"Vendor Demo","vendor@pengadaan.local","vendor123","Vendor","Vendor"),u(8,"KSS Sarpra KPH","kph@pengadaan.local","kph123","KSS Sarpra KPH","KPH Bandung")];let a=p(1,"Laptop Operasional Divre","IT","Pengadaan Langsung","Laptop","Unit",120,"Kebutuhan laptop operasional Divre dan KPH.",32,"2026-06-01");a.vendor="PT Teknologi Nusantara";a.contract={noPks:"PKS/001/2026",tanggalPks:"2026-06-01",tanggalPerjanjian:"2026-06-02",tanggalMulai:"2026-06-02",tanggalAkhir:"2026-07-10"};a.allocations=[alloc("PT Teknologi Nusantara","PKS/001/2026","2026-06-01","Termin I","2026-06-02","2026-06-20","KPH Bandung","Laptop","Unit",8500000,60,2026),alloc("PT Teknologi Nusantara","PKS/001/2026","2026-06-01","Termin II","2026-06-21","2026-07-10","KPH Bogor","Laptop","Unit",8500000,60,2026)];a.shipments=[mov("2026-06-10","PKS/001/2026","Termin I","KPH Bandung","Laptop","Unit",8500000,50,2026,"dp-kirim-001.pdf")];a.receipts=[mov("2026-06-11","PKS/001/2026","Termin I","KPH Bandung","Laptop","Unit",8500000,42,2026,"dp-terima-001.pdf")];let b=p(2,"APAR untuk KPH","Umum","Tender Cepat","APAR","Unit",80,"Kebutuhan alat pemadam api ringan.",8,"2026-06-12");return{permissions,users,procurements:[a,b],nextUserId:9,nextProcId:3}}
function loadDb(){try{const raw=__MPB_STORAGE.getItem(DB_KEY);if(raw)return JSON.parse(raw)}catch(e){}const x=initialDb();__MPB_STORAGE.setItem(DB_KEY,JSON.stringify(x));return x}function save(){__MPB_STORAGE.setItem(DB_KEY,JSON.stringify(db))}function reset(){db=initialDb();save();toast("Data demo berhasil direset.");render()}function cur(){return db.users.find(x=>x.id===session?.id)}function can(m,a="lihat"){return session&&(session.role==="Admin"||!!db.permissions?.[session.role]?.[m]?.[a])}function admin(){return session?.role==="Admin"}function bidang(){return session?.role==="Bidang Terkait"}function accessProc(x){return admin()||!bidang()||cur()?.bidang===x.bidang}function canInput(){return admin()||bidang()&&can("Input Pengadaan","tambah")}function canEditProc(x){return admin()||bidang()&&cur()?.bidang===x.bidang&&can("Input Pengadaan","edit")}function spmk(x){return x.completedSteps.includes(IDX.SPMK)}function shipTotal(x){return x.shipments.reduce((a,b)=>a+(+b.volume||0),0)}function recTotal(x){return x.receipts.reduce((a,b)=>a+(+b.volume||0),0)}function pct(v,t){return t?Math.min(100,Math.round(+v/+t*100)):0}function today(){return new Date().toISOString().slice(0,10)}function d(v){return v?new Date(v).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"}):"-"}function rp(v){return"Rp "+Number(v||0).toLocaleString("id-ID")}function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}function fd(form){return Object.fromEntries(new FormData(form).entries())}function days(a,b){return Math.floor((new Date(b)-new Date(a))/(864e5))}function before(id){let n=0;for(let i=0;i<id;i++)n+=STEPS[i].days||0;return n}function due(x,id=x.currentStep){const st=STEPS[id];if(!st)return{text:"Selesai",color:"green"};const e=Math.max(0,days(x.createdAt,today())),start=before(id);if(st.days===null)return{text:`Flexible • ${Math.max(0,e-start)} hari berjalan`,color:"blue"};const r=start+st.days-e;if(r<0)return{text:`Lewat ${Math.abs(r)} hari`,color:"red"};if(r<=1)return{text:`Sisa ${r} hari`,color:"yellow"};return{text:`Sisa ${r} hari`,color:"green"}}function isPic(st){return admin()||session?.role===st?.pic}function status(x){if(x.currentStep>=STEPS.length)return{text:"Selesai",color:"green"};let dd=due(x);if(dd.color==="red")return{text:"Terlambat",color:"red"};if(isPic(STEPS[x.currentStep]))return{text:"Perlu Approval",color:"yellow"};return{text:"Berlangsung",color:"blue"}}function prog(x){return pct(x.completedSteps.length,STEPS.length)}function vis(){return db.procurements.filter(accessProc)}function filtered(){let r=vis();if(state.filter==="done")return r.filter(x=>x.currentStep>=STEPS.length);if(state.filter==="running")return r.filter(x=>x.currentStep<STEPS.length);if(state.filter==="need")return r.filter(x=>isPic(STEPS[x.currentStep]));if(state.filter==="my")return r.filter(x=>x.bidang===cur()?.bidang);return r}
function render(){const app=document.getElementById("app");if(!session||!cur()){app.innerHTML=login();bindLogin();return}app.innerHTML=shell();bindShell();page()}function login(){return`<section class="login"><div class="loginHero"><div class="loginBrand"><img src="${esc(CONFIG.logoUrl)}"><div><b>${esc(CONFIG.appName)}</b><span>${esc(CONFIG.organizationName)}</span></div></div><h1>Monitoring pengadaan barang yang rapi, terkontrol, dan berbasis PIC.</h1><p>Approval berjalan sesuai PIC, pengadaan hanya diisi bidang terkait, vendor baru dapat diinput setelah SPMK, serta progress pengiriman-penerimaan termonitor otomatis.</p><div class="badges"><span>Role-based Access</span><span>Approval by PIC</span><span>Vendor after SPMK</span><span>Modern Dashboard</span></div></div><div class="loginPanel"><div class="loginCard"><h2>Masuk Aplikasi</h2><p>Gunakan akun demo sesuai role untuk menguji akses.</p><form id="loginForm"><div class="field"><label>Email</label><input name="email" value="admin@pengadaan.local" required></div><div class="field" style="margin-top:12px"><label>Password</label><input type="password" name="password" value="admin123" required></div><button class="btn primary" style="width:100%;margin-top:18px">Login</button></form><div class="demo"><b>Akun demo:</b><br>Admin: admin@pengadaan.local / admin123<br>Bidang IT: it@pengadaan.local / it123<br>Bidang Umum: umum.bidang@pengadaan.local / umum123<br>PBJ: pbj@pengadaan.local / pbj123<br>Kadivre: kadivre@pengadaan.local / kadivre123<br>Vendor: vendor@pengadaan.local / vendor123<br>KPH: kph@pengadaan.local / kph123</div></div></div></section>`}function bindLogin(){document.getElementById("loginForm").onsubmit=e=>{e.preventDefault();let x=fd(e.target),u=db.users.find(v=>v.active&&v.email===x.email&&v.password===x.password);if(!u)return toast("Email atau password tidak sesuai.");session={id:u.id,name:u.name,role:u.role};__MPB_STORAGE.setItem(SESSION_KEY,JSON.stringify(session));state.page="dashboard";render()}}
function nav(page,label,module,ico){return{page,label,module,ico}}function shell(){const u=cur(),groups=[["Utama",[nav("dashboard","Dashboard","Dashboard","⌂"),nav("procurements","Data Pengadaan","Data Pengadaan","▦"),nav("input","Input Pengadaan","Input Pengadaan","＋"),nav("approval","Approval","Approval","✓")]],["Operasional",[nav("masa","Masa Pelaksanaan","Masa Pelaksanaan","◷"),nav("allocation","Alokasi KPH","Alokasi KPH","↦"),nav("shipping","Pengiriman","Pengiriman Barang","⇢"),nav("receiving","Penerimaan","Penerimaan Barang","⇠"),nav("monitoring","Monitoring Barang","Monitoring Barang","◉")]],["Admin",[nav("roles","Role & Permission","Role & Permission","⚙"),nav("users","User Management","User Management","☷"),nav("branding","Branding","Branding","✦")]]];return`<div class="shell"><aside class="sidebar"><div class="brand"><img src="${esc(CONFIG.logoUrl)}"><div><b>${esc(CONFIG.shortName)}</b><span>${esc(CONFIG.appName)}</span></div></div>${groups.map(([t,items])=>{let v=items.filter(i=>can(i.module));return v.length?`<div><div class="navTitle">${t}</div>${v.map(i=>`<button class="navBtn ${state.page===i.page?'active':''}" data-nav="${i.page}"><span class="ico">${i.ico}</span><span>${i.label}</span></button>`).join("")}</div>`:""}).join("")}<div class="sideUser"><b>${esc(u.name)}</b><span>${esc(u.role)} • ${esc(u.bidang)}</span></div></aside><main class="main"><div class="topbar"><div><div class="kicker">${esc(CONFIG.organizationName)} Procurement System</div><h1>${title()}</h1></div><div class="userChip"><div class="avatar">${esc(u.name[0])}</div><div><b>${esc(u.name)}</b><span>${esc(u.role)}</span></div><button id="logout" class="btn ghost small">Logout</button></div></div><div id="content"></div><div id="modalRoot"></div></main></div>`}function bindShell(){document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{state.page=b.dataset.nav;render()});document.getElementById("logout").onclick=()=>{__MPB_STORAGE.removeItem(SESSION_KEY);session=null;render()}}function title(){return{dashboard:"Dashboard Pengadaan",procurements:"Data Pengadaan",input:"Input Data Pengadaan",approval:"Approval Sesuai PIC",masa:"Masa Pelaksanaan Pekerjaan",allocation:"Alokasi Barang Per KPH",shipping:"Pengiriman Barang",receiving:"Penerimaan Barang",monitoring:"Monitoring Barang",roles:"Role & Permission",users:"User Management",branding:"Branding Aplikasi"}[state.page]||"Aplikasi"}
function page(){const c=document.getElementById("content"),map={dashboard,procurements,input,approval,masa,allocation,shipping,receiving,monitoring,roles,users,branding};c.innerHTML=(map[state.page]||dashboard)();bindPage()}
function stat(f,t,v,n){return`<div class="card stat" data-filter="${f}"><div class="statTitle">${t}</div><div class="statVal">${v}</div><div class="note">${n}</div></div>`}function summary(){let r=vis(),us=r.reduce((a,x)=>a+x.totalUsulan,0),sh=r.reduce((a,x)=>a+shipTotal(x),0),re=r.reduce((a,x)=>a+recTotal(x),0);return`<div class="kpiRow"><div class="mini"><span>Total Usulan</span><b>${us}</b></div><div class="mini"><span>Total Terkirim</span><b>${sh}</b><small>${pct(sh,us)}%</small></div><div class="mini"><span>Total Diterima</span><b>${re}</b><small>${pct(re,us)}%</small></div></div>`}function dashboard(){let r=vis(),done=r.filter(x=>x.currentStep>=STEPS.length).length,run=r.filter(x=>x.currentStep<STEPS.length).length,need=r.filter(x=>isPic(STEPS[x.currentStep])).length,bc={};r.forEach(x=>bc[x.bidang]=(bc[x.bidang]||0)+1);return`<div class="grid cards">${stat("all","Total Pengadaan",r.length,"Seluruh pengadaan yang dapat Anda akses")}${stat("done","Selesai",done,"Pengadaan selesai")}${stat("running","Sedang Berlangsung",run,"Klik untuk melihat proses berjalan")}${stat("need","Perlu Approval",need,"Tahapan sesuai PIC login")}</div><div class="split"><div class="card pad"><div class="head" style="margin-top:0"><h2>Pengadaan per Bidang</h2></div>${Object.entries(bc).map(([b,n])=>`<div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--line);padding:11px 0"><div><b>${esc(b)}</b><br><small>${n} pengadaan</small></div><span class="badge blue">${n}</span></div>`).join("")||`<div class="empty">Belum ada data.</div>`}</div><div class="card pad"><div class="head" style="margin-top:0"><h2>Monitoring Barang</h2></div>${summary()}<div class="help ok" style="margin-top:14px">Persentase diterima bertambah setelah form penerimaan diinput oleh KSS Sarpra KPH.</div></div></div><div class="head"><h2>Daftar Pengadaan</h2><div class="tools">${canInput()?`<button class="btn primary small" data-go="input">+ Input Pengadaan</button>`:""}<button class="btn ghost small" data-reset>Reset Data Demo</button></div></div>${procTable(filtered())}`}
function procTable(rows){if(!rows.length)return`<div class="card empty">Belum ada data pengadaan.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Jenis</th><th>Vendor</th><th>Progress</th><th>Posisi Terakhir</th><th>Tata Waktu</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${rows.map(x=>{let st=STEPS[x.currentStep],ps=status(x),du=due(x),vendor=spmk(x)?(x.vendor||`<span class="badge yellow">Belum diisi</span>`):`<span class="badge gray">Terkunci sampai SPMK</span>`;return`<tr><td><b>${esc(x.nama)}</b><br><small>Total usulan: ${x.totalUsulan} ${esc(x.satuan)}</small></td><td>${esc(x.bidang)}</td><td>${esc(x.jenisPengadaan)}</td><td>${vendor}</td><td><div class="progress"><span style="width:${prog(x)}%"></span></div><small>${prog(x)}%</small></td><td>${st?`<b>${esc(st.title)}</b><br><small>PIC: ${esc(st.pic)}</small>`:"<b>Selesai</b>"}</td><td><span class="badge ${du.color}">${esc(du.text)}</span></td><td><span class="badge ${ps.color}">${esc(ps.text)}</span></td><td><div class="tools"><button class="btn ghost small" data-detail="${x.id}">Detail</button>${canEditProc(x)?`<button class="btn ghost small" data-edit="${x.id}">Edit</button>`:""}</div></td></tr>`}).join("")}</tbody></table></div>`}
function procurements(){return`<div class="head" style="margin-top:0"><h2>Data Pengadaan</h2><div class="tools"><button class="btn ghost small" data-filter="all">Semua</button><button class="btn ghost small" data-filter="running">Berlangsung</button><button class="btn ghost small" data-filter="need">Perlu Approval</button>${bidang()?`<button class="btn ghost small" data-filter="my">Bidang Saya</button>`:""}${canInput()?`<button class="btn primary small" data-go="input">+ Input Pengadaan</button>`:""}</div></div>${bidang()?`<div class="help">Anda login sebagai Bidang Terkait. Input dan edit hanya untuk bidang <b>${esc(cur().bidang)}</b>.</div><br>`:""}${procTable(filtered())}`}
function input(){if(!can("Input Pengadaan"))return denied("Anda tidak memiliki akses ke input pengadaan.");return`<div class="card pad"><div class="head" style="margin-top:0"><h2>Input Data Pengadaan</h2></div>${canInput()?`<div class="help">Data pengadaan hanya dapat dibuat oleh <b>Bidang Terkait</b> atau Admin. Jika login sebagai Bidang Terkait, bidang otomatis mengikuti bidang user.</div><form id="procForm" style="margin-top:16px"><div class="formGrid"><div class="field"><label>Nama Pengadaan</label><input name="nama" required placeholder="Contoh: Laptop Operasional"></div><div class="field"><label>Bidang</label><input name="bidang" value="${esc(bidang()?cur().bidang:"")}" ${bidang()?"readonly":""} required placeholder="IT / Umum"></div><div class="field"><label>Jenis Pengadaan</label><select name="jenisPengadaan"><option>Pengadaan Langsung</option><option>Tender Cepat</option><option>Tender Terbuka</option><option>E-Purchasing</option><option>Penunjukan Langsung</option></select></div><div class="field"><label>Jenis Barang</label><input name="jenisBarang" required></div><div class="field"><label>Satuan</label><input name="satuan" value="Unit" required></div><div class="field"><label>Total/Jumlah Usulan</label><input name="totalUsulan" type="number" min="1" value="1" required></div><div class="field full"><label>Catatan</label><textarea name="catatan"></textarea></div><div class="field full"><button class="btn primary">Simpan Data Pengadaan</button></div></div></form>`:`<div class="help warn">Role Anda hanya dapat melihat data. Input pengadaan dibatasi untuk Bidang Terkait.</div>`}</div><div class="head"><h2>Data Pengadaan</h2></div>${procTable(vis())}`}
function approval(){let apps=vis().filter(x=>x.currentStep<STEPS.length&&isPic(STEPS[x.currentStep]));return`<div class="head" style="margin-top:0"><h2>Antrian Approval Anda</h2><button class="btn ghost small" id="toggleDetails">${state.details?"Hide Detail":"Unhide Detail"}</button></div><div class="help">Tombol approve hanya aktif jika role login sama dengan PIC tahapan berjalan. Admin dapat melakukan semua approval.</div><br>${apps.length?procTable(apps):`<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`}<div class="head"><h2>Form Approval Alur Lengkap</h2></div>${workflowAll()}`}
function workflowAll(){let no=0;return`<div class="workflow">${WORKFLOW.map(ph=>`<div class="phase"><div class="phaseHead"><b>${esc(ph.phase)}</b><span class="badge gray">${ph.items.length} tahapan</span></div>${ph.items.map(it=>{let id=no++;return`<div class="stepRow"><div class="num">${id+1}</div><div class="stepTitle"><b>${esc(it.title)}</b><span>PIC: ${esc(it.pic)} • Tata waktu: ${it.days===null?"Flexible":it.days+" Hari"}</span>${state.details?`<div class="detail">${esc(it.detail)}</div>`:""}</div><div><span class="badge teal">${esc(it.pic)}</span></div><div><span class="badge ${it.days===null?"blue":"green"}">${it.days===null?"Flexible":it.days+" Hari"}</span></div><div><small>${id+1} dari ${STEPS.length}</small></div></div>`}).join("")}</div>`).join("")}</div>`}
function masa(){let rows=vis().filter(spmk);return`<div class="help">Masa Pelaksanaan Pekerjaan dibuka setelah SPMK selesai. PBJ mengisi tanggal perjanjian sesuai kontrak.</div><div class="head"><h2>Pengadaan Setelah SPMK</h2></div>${rows.length?`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Tanggal Perjanjian</th><th>Mulai</th><th>Akhir</th><th>Aksi</th></tr></thead><tbody>${rows.map(x=>`<tr><td><b>${esc(x.nama)}</b><br><small>${esc(x.bidang)}</small></td><td>${esc(x.vendor||"-")}</td><td>${esc(x.contract.noPks||"-")}</td><td>${d(x.contract.tanggalPerjanjian)}</td><td>${d(x.contract.tanggalMulai)}</td><td>${d(x.contract.tanggalAkhir)}</td><td>${can("Masa Pelaksanaan","edit")?`<button class="btn primary small" data-contract="${x.id}">Isi/Edit Kontrak</button>`:"-"}</td></tr>`).join("")}</tbody></table></div>`:`<div class="card empty">Belum ada pengadaan yang mencapai SPMK.</div>`}`}
function allocation(){let rows=vis().filter(spmk);return`<div class="help">Form alokasi hanya aktif setelah SPMK. Vendor dapat diisi karena SPMK sudah selesai.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Alokasi Barang Per KPH</h2>${can("Alokasi KPH","tambah")?allocForm(rows):`<div class="help warn">Role Anda tidak dapat menambah alokasi.</div>`}</div><div class="head"><h2>Data Alokasi</h2></div>${allocTable(rows)}`}
function allocForm(rows){if(!rows.length)return`<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;return`<form id="allocForm"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId">${rows.map(x=>`<option value="${x.id}">${esc(x.nama)}</option>`).join("")}</select></div><div class="field"><label>Vendor</label><input name="vendor" required></div><div class="field"><label>No PKS</label><input name="noPks" required></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" type="date" required></div><div class="field"><label>Termin</label><select name="termin"><option>Langsung</option><option>Termin I</option><option>Termin II</option></select></div><div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" type="date" required></div><div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" type="date" required></div><div class="field"><label>Satuan Kerja</label><input name="satuanKerja" required></div><div class="field"><label>Jenis Barang</label><input name="jenisBarang" required></div><div class="field"><label>Satuan</label><input name="satuan" value="Unit" required></div><div class="field"><label>Tarif (Rp)</label><input name="tarif" type="number" required></div><div class="field"><label>Volume</label><input name="volume" type="number" required></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" type="number" value="2026" required></div><div class="field full"><button class="btn primary">Simpan Alokasi</button></div></div></form>`}
function allocTable(rows){let list=[];rows.forEach(x=>x.allocations.forEach(a=>list.push({proc:x,...a})));if(!list.length)return`<div class="card empty">Belum ada alokasi.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Termin</th><th>Satuan Kerja</th><th>Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th></tr></thead><tbody>${list.map(x=>`<tr><td><b>${esc(x.proc.nama)}</b></td><td>${esc(x.vendor)}</td><td>${esc(x.noPks)}</td><td>${esc(x.termin)}</td><td>${esc(x.satuanKerja)}</td><td>${esc(x.jenisBarang)}</td><td>${rp(x.tarif)}</td><td>${x.volume}</td><td>${rp(x.nilai)}</td></tr>`).join("")}</tbody></table></div>`}
function movementForm(id,rows,label){if(!rows.length)return`<div class="empty">Belum ada pengadaan yang memenuhi syarat.</div>`;return`<form id="${id}"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId">${rows.map(x=>`<option value="${x.id}">${esc(x.nama)}</option>`).join("")}</select></div><div class="field"><label>Tanggal</label><input name="tanggal" type="date" required></div><div class="field"><label>No PKS</label><input name="noPks" required></div><div class="field"><label>Termin</label><select name="termin"><option>Langsung</option><option>Termin I</option><option>Termin II</option></select></div><div class="field"><label>Satuan Kerja</label><input name="satuanKerja" required></div><div class="field"><label>Jenis Barang</label><input name="jenisBarang" required></div><div class="field"><label>Satuan</label><input name="satuan" value="Unit" required></div><div class="field"><label>Tarif (Rp)</label><input name="tarif" type="number" required></div><div class="field"><label>Volume</label><input name="volume" type="number" required></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" type="number" value="2026" required></div><div class="field"><label>Upload DP / Nama File</label><input name="dp" placeholder="dp-pengiriman.pdf"></div><div class="field"><label>Nilai Realisasi</label><input disabled placeholder="Otomatis = Tarif x Volume"></div><div class="field full"><button class="btn primary">${label}</button></div></div></form>`}
function shipping(){let rows=vis().filter(x=>spmk(x)&&x.allocations.length);return`<div class="help">Pengiriman dapat diinput setelah SPMK dan alokasi tersedia. Data pengiriman menjadi syarat agar form penerimaan aktif.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Pengiriman Barang</h2>${can("Pengiriman Barang","tambah")?movementForm("shipForm",rows,"Simpan Pengiriman"):`<div class="help warn">Role Anda tidak dapat menambah pengiriman.</div>`}</div><div class="head"><h2>Data Pengiriman</h2></div>${movTable("shipments")}`}
function receiving(){let rows=vis().filter(x=>spmk(x)&&x.shipments.length);return`<div class="help ${rows.length?"":"warn"}">Penerimaan baru dapat diinput setelah pengiriman tersimpan.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Penerimaan Barang</h2>${can("Penerimaan Barang","tambah")?movementForm("recForm",rows,"Simpan Penerimaan"):`<div class="help warn">Role Anda tidak dapat menambah penerimaan.</div>`}</div><div class="head"><h2>Data Penerimaan</h2></div>${movTable("receipts")}`}
function movTable(type){let list=[];vis().forEach(x=>x[type].forEach(a=>list.push({proc:x,...a})));if(!list.length)return`<div class="card empty">Belum ada data.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Tanggal</th><th>No PKS</th><th>Termin</th><th>Satuan Kerja</th><th>Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th><th>DP</th></tr></thead><tbody>${list.map(x=>`<tr><td><b>${esc(x.proc.nama)}</b></td><td>${d(x.tanggal)}</td><td>${esc(x.noPks)}</td><td>${esc(x.termin)}</td><td>${esc(x.satuanKerja)}</td><td>${esc(x.jenisBarang)}</td><td>${rp(x.tarif)}</td><td>${x.volume}</td><td>${rp(x.nilai)}</td><td>${esc(x.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`}
function monitoring(){let rows=vis();return`<div class="grid cards">${stat("all","Total Pengadaan",rows.length,"Jumlah pengadaan")}${stat("all","Total Usulan",rows.reduce((a,x)=>a+x.totalUsulan,0),"Volume barang usulan")}${stat("all","Total Terkirim",rows.reduce((a,x)=>a+shipTotal(x),0),"Akumulasi volume kirim")}${stat("all","Total Diterima",rows.reduce((a,x)=>a+recTotal(x),0),"Akumulasi volume terima")}</div><div class="head"><h2>Monitoring Barang Sesuai Usulan</h2></div><div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Total Usulan</th><th>Total Terkirim</th><th>Total Diterima</th><th>% Terkirim</th><th>% Diterima</th><th>Catatan</th></tr></thead><tbody>${rows.map(x=>{let sh=shipTotal(x),re=recTotal(x);return`<tr><td><b>${esc(x.nama)}</b><br><small>${esc(x.jenisBarang)}</small></td><td>${esc(x.bidang)}</td><td>${x.totalUsulan} ${esc(x.satuan)}</td><td>${sh}</td><td>${re}</td><td><div class="progress"><span style="width:${pct(sh,x.totalUsulan)}%"></span></div><small>${pct(sh,x.totalUsulan)}%</small></td><td><div class="progress"><span style="width:${pct(re,x.totalUsulan)}%"></span></div><small>${pct(re,x.totalUsulan)}%</small></td><td>${re>=x.totalUsulan?`<span class="badge green">Diterima 100%</span>`:`<span class="badge yellow">Belum 100%</span>`}</td></tr>`}).join("")}</tbody></table></div>`}
function roles(){if(!can("Role & Permission"))return denied("Anda tidak memiliki akses Role & Permission.");return`<div class="head" style="margin-top:0"><h2>Role & Permission</h2>${can("Role & Permission","edit")?`<button class="btn primary small" id="savePerm">Simpan Permission</button>`:""}</div><div class="help">Admin dapat mengatur permission per modul: LIHAT, TAMBAH, EDIT, HAPUS.</div><br><div class="tableWrap"><div class="permGrid"><div class="phead">Role</div><div class="phead">Modul</div><div class="phead">Lihat</div><div class="phead">Tambah</div><div class="phead">Edit</div><div class="phead">Hapus</div>${ROLES.map(r=>MODULES.map(m=>`<div><b>${esc(r)}</b></div><div>${esc(m)}</div>${ACTIONS.map(a=>`<div><input type="checkbox" data-perm="${esc(r)}|${esc(m)}|${a}" ${db.permissions?.[r]?.[m]?.[a]?"checked":""} ${can("Role & Permission","edit")?"":"disabled"}></div>`).join("")}`).join("")).join("")}</div></div>`}
function users(){if(!can("User Management"))return denied("Anda tidak memiliki akses User Management.");return`<div class="split"><div class="card pad"><h2 style="margin-top:0">Tambah User</h2>${can("User Management","tambah")?`<form id="userForm"><div class="formGrid" style="grid-template-columns:1fr"><div class="field"><label>Nama</label><input name="name" required></div><div class="field"><label>Email</label><input name="email" type="email" required></div><div class="field"><label>Password</label><input name="password" required></div><div class="field"><label>Role</label><select name="role">${ROLES.map(r=>`<option>${esc(r)}</option>`).join("")}</select></div><div class="field"><label>Bidang</label><input name="bidang" required></div><button class="btn primary">Tambah User</button></div></form>`:`<div class="help warn">Role Anda tidak dapat menambah user.</div>`}</div><div class="tableWrap"><table><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Bidang</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${db.users.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.email)}</td><td>${esc(x.role)}</td><td>${esc(x.bidang)}</td><td><span class="badge ${x.active?"green":"gray"}">${x.active?"Aktif":"Nonaktif"}</span></td><td>${can("User Management","edit")&&x.role!=="Admin"?`<button class="btn ghost small" data-toggle-user="${x.id}">${x.active?"Nonaktifkan":"Aktifkan"}</button>`:"-"}</td></tr>`).join("")}</tbody></table></div></div>`}
function branding(){return`<div class="card pad"><h2 style="margin-top:0">Cara Mengganti Logo, Favicon, dan Nama Web</h2><div class="help ok">Semua pengaturan branding ada di file <b>config.js</b>. Logo dan favicon ada di folder <b>assets</b>.</div><div class="thirds" style="margin-top:16px"><div class="mini"><span>Nama Web</span><b style="font-size:18px">${esc(CONFIG.appName)}</b></div><div class="mini"><span>Logo</span><b style="font-size:18px">${esc(CONFIG.logoUrl)}</b></div><div class="mini"><span>Favicon</span><b style="font-size:18px">${esc(CONFIG.faviconUrl)}</b></div></div><h3>Contoh config.js</h3><pre>window.APP_CONFIG = {
  appName: "Monitoring Pengadaan Barang",
  shortName: "MPB",
  organizationName: "Divre",
  logoUrl: "assets/logo.svg",
  faviconUrl: "assets/favicon.svg",
  primaryColor: "#2563eb",
  secondaryColor: "#0f766e",
  accentColor: "#f59e0b"
};</pre><div class="help warn">Untuk mengganti logo, simpan file logo baru di folder assets, lalu ubah logoUrl menjadi path file tersebut.</div></div>`}function denied(m){return`<div class="card pad"><h2>Akses Ditolak</h2><p class="note">${esc(m)}</p></div>`}
function gate(x,id){let st=STEPS[id];if(!isPic(st))return{ok:false,msg:"Role login bukan PIC tahapan ini."};if(id===IDX.ALOKASI&&!x.allocations.length)return{ok:false,msg:"Form alokasi barang per KPH wajib diisi."};if(id===IDX.KIRIM&&!x.shipments.length)return{ok:false,msg:"Form pengiriman dan DP wajib diisi."};if(id===IDX.TERIMA&&!x.receipts.length)return{ok:false,msg:"Form penerimaan wajib diisi setelah pengiriman."};if(id===IDX.TPHP&&pct(recTotal(x),x.totalUsulan)<100)return{ok:false,msg:"TPHP aktif setelah barang diterima 100%."};if(id===IDX.MASA&&!x.contract.tanggalPerjanjian)return{ok:false,msg:"Tanggal perjanjian sesuai kontrak wajib diisi."};return{ok:true,msg:"Dapat di-approve."}}
function detail(id){let x=db.procurements.find(p=>p.id===id);if(!x)return;let curStep=STEPS[x.currentStep],ps=status(x);document.getElementById("modalRoot").innerHTML=`<div class="modalBack"><div class="modal"><div class="modalHead"><div><h2>${esc(x.nama)}</h2><small>${esc(x.bidang)} • ${esc(x.jenisPengadaan)} • ${prog(x)}% selesai</small></div><div class="tools"><button class="btn ghost small" id="modalToggle">${state.details?"Hide Detail":"Unhide Detail"}</button><button class="btn ghost small" id="closeModal">Tutup</button></div></div><div class="modalBody"><div class="kpiRow"><div class="mini"><span>Status</span><b>${esc(ps.text)}</b></div><div class="mini"><span>Posisi Terakhir</span><b style="font-size:18px">${curStep?esc(curStep.title):"Selesai"}</b></div><div class="mini"><span>Vendor</span><b style="font-size:18px">${spmk(x)?esc(x.vendor||"Belum diisi"):"Terkunci sampai SPMK"}</b></div></div><div class="split" style="margin-top:16px"><div class="help"><b>Rule:</b> Approval sesuai PIC. Vendor setelah SPMK. Penerimaan setelah pengiriman.</div><div class="help ${isPic(curStep)?"ok":"warn"}">${curStep?`PIC aktif: <b>${esc(curStep.pic)}</b>. Role Anda: <b>${esc(session.role)}</b>.`:"Pengadaan selesai."}</div></div><div class="head"><h2>Alur Approval Pengadaan</h2><div class="tools">${canEditProc(x)?`<button class="btn ghost small" data-edit="${x.id}">Edit Data</button>`:""}${spmk(x)?`<button class="btn secondary small" data-contract="${x.id}">Isi/Edit Vendor & Kontrak</button>`:""}</div></div>${workflowProc(x)}</div></div></div>`;document.getElementById("closeModal").onclick=()=>document.getElementById("modalRoot").innerHTML="";document.getElementById("modalToggle").onclick=()=>{state.details=!state.details;detail(x.id)};document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit))}
function workflowProc(x){let n=0;return`<div class="workflow">${WORKFLOW.map(ph=>`<div class="phase"><div class="phaseHead"><b>${esc(ph.phase)}</b><span class="badge gray">${ph.items.length} tahapan</span></div>${ph.items.map(it=>{let id=n++,done=x.completedSteps.includes(id),curr=id===x.currentStep,g=gate(x,id),cls=done?"done":curr?(g.ok?"current":"current blocked"):"",du=due(x,id);return`<div class="stepRow ${cls}"><div class="num">${id+1}</div><div class="stepTitle"><b>${esc(it.title)}</b><span>PIC: ${esc(it.pic)} • Tata waktu: ${it.days===null?"Flexible":it.days+" Hari"}</span>${state.details?`<div class="detail">${esc(it.detail)}${curr&&!g.ok?`<br><b>Belum bisa approve:</b> ${esc(g.msg)}`:""}</div>`:""}</div><div><span class="badge teal">${esc(it.pic)}</span></div><div><span class="badge ${du.color}">${done?"Selesai":curr?du.text:"Menunggu"}</span></div><div>${curr&&isPic(it)?`<button class="btn ${g.ok?"primary":"warning"} small" data-approve="${x.id}" ${g.ok?"":"disabled"}>${g.ok?"Approve":"Lengkapi"}</button>`:curr?`<span class="badge gray">Menunggu PIC</span>`:done?`<span class="badge green">Approved</span>`:`<span class="badge gray">Belum aktif</span>`}</div></div>`}).join("")}</div>`).join("")}</div>`}
function approve(id){let x=db.procurements.find(p=>p.id===id);if(!x)return;let g=gate(x,x.currentStep);if(!g.ok)return toast(g.msg);x.completedSteps.push(x.currentStep);x.approvals.push({stepId:x.currentStep,stepTitle:STEPS[x.currentStep].title,pic:STEPS[x.currentStep].pic,approvedBy:session.name,approvedRole:session.role,approvedAt:new Date().toISOString()});x.currentStep=Math.min(STEPS.length,x.currentStep+1);save();toast("Approval berhasil disimpan.");detail(x.id)}
function bindPage(){document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;if(state.page==="dashboard")state.page="procurements";render()});document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{state.page=b.dataset.go;render()});document.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.detail));document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));let r=document.querySelector("[data-reset]");if(r)r.onclick=reset;let t=document.getElementById("toggleDetails");if(t)t.onclick=()=>{state.details=!state.details;render()};let pf=document.getElementById("procForm");if(pf)pf.onsubmit=saveProc;let af=document.getElementById("allocForm");if(af)af.onsubmit=saveAlloc;let sf=document.getElementById("shipForm");if(sf)sf.onsubmit=e=>saveMove(e,"shipments");let rf=document.getElementById("recForm");if(rf)rf.onsubmit=e=>saveMove(e,"receipts");let uf=document.getElementById("userForm");if(uf)uf.onsubmit=saveUser;document.querySelectorAll("[data-toggle-user]").forEach(b=>b.onclick=()=>{let u=db.users.find(x=>x.id===+b.dataset.toggleUser);u.active=!u.active;save();render()});let sp=document.getElementById("savePerm");if(sp)sp.onclick=savePerms}
function saveProc(e){e.preventDefault();if(!canInput())return toast("Input pengadaan hanya oleh Bidang Terkait atau Admin.");let x=fd(e.target),bd=bidang()?cur().bidang:x.bidang;db.procurements.push(p(db.nextProcId++,x.nama,bd,x.jenisPengadaan,x.jenisBarang,x.satuan,+x.totalUsulan,x.catatan,0,today()));save();toast("Data pengadaan berhasil disimpan.");state.page="procurements";render()}function editProc(id){let x=db.procurements.find(p=>p.id===id);if(!x||!canEditProc(x))return toast("Anda tidak berwenang mengedit data ini.");let j=prompt("Edit jenis pengadaan:",x.jenisPengadaan);if(j!==null)x.jenisPengadaan=j.trim()||x.jenisPengadaan;let total=prompt("Edit total usulan:",x.totalUsulan);if(total!==null&&+total>0)x.totalUsulan=+total;if(spmk(x)){let v=prompt("Isi/Edit vendor setelah SPMK:",x.vendor||"");if(v!==null)x.vendor=v.trim()}else toast("Vendor belum dapat diisi karena SPMK belum selesai.");save();render()}function saveAlloc(e){e.preventDefault();let x=fd(e.target),pr=db.procurements.find(p=>p.id===+x.procId);if(!spmk(pr))return toast("Alokasi hanya setelah SPMK.");let a=alloc(x.vendor,x.noPks,x.tanggalPks,x.termin,x.tanggalMulai,x.tanggalAkhir,x.satuanKerja,x.jenisBarang,x.satuan,+x.tarif,+x.volume,+x.tahunPks);pr.allocations.push(a);pr.vendor=x.vendor;pr.contract.noPks=x.noPks;pr.contract.tanggalPks=x.tanggalPks;pr.contract.tanggalMulai=x.tanggalMulai;pr.contract.tanggalAkhir=x.tanggalAkhir;save();toast("Alokasi tersimpan. Nilai otomatis dihitung.");render()}function saveMove(e,type){e.preventDefault();let x=fd(e.target),pr=db.procurements.find(p=>p.id===+x.procId);if(type==="receipts"&&!pr.shipments.length)return toast("Penerimaan baru bisa diinput setelah pengiriman.");let m=mov(x.tanggal,x.noPks,x.termin,x.satuanKerja,x.jenisBarang,x.satuan,+x.tarif,+x.volume,+x.tahunPks,x.dp);pr[type].push(m);save();toast(type==="shipments"?"Pengiriman tersimpan. Penerimaan sekarang aktif.":"Penerimaan tersimpan. Persentase diterima diperbarui.");render()}function contract(id){let x=db.procurements.find(p=>p.id===id);if(!spmk(x))return toast("Vendor dan kontrak baru dapat diisi setelah SPMK.");let vendor=prompt("Vendor bertanggung jawab:",x.vendor||"");if(vendor===null)return;let no=prompt("No PKS:",x.contract.noPks||"");if(no===null)return;let tp=prompt("Tanggal Perjanjian sesuai kontrak (YYYY-MM-DD):",x.contract.tanggalPerjanjian||today());if(tp===null)return;let tm=prompt("Tanggal Mulai (YYYY-MM-DD):",x.contract.tanggalMulai||today());if(tm===null)return;let ta=prompt("Tanggal Akhir (YYYY-MM-DD):",x.contract.tanggalAkhir||today());if(ta===null)return;x.vendor=vendor.trim();x.contract.noPks=no.trim();x.contract.tanggalPerjanjian=tp.trim();x.contract.tanggalMulai=tm.trim();x.contract.tanggalAkhir=ta.trim();save();toast("Vendor dan kontrak tersimpan.");document.getElementById("modalRoot").innerHTML="";render()}function saveUser(e){e.preventDefault();let x=fd(e.target);if(db.users.some(u=>u.email===x.email))return toast("Email sudah digunakan.");db.users.push(u(db.nextUserId++,x.name,x.email,x.password,x.role,x.bidang));save();toast("User berhasil ditambahkan.");render()}function savePerms(){document.querySelectorAll("[data-perm]").forEach(cb=>{let[r,m,a]=cb.dataset.perm.split("|");db.permissions[r][m][a]=cb.checked});save();toast("Permission berhasil disimpan.")}function toast(msg){document.querySelector(".toast")?.remove();let d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),3200)}

/* === PATCH v4: input Masa Pelaksanaan + tata waktu sesuai kontrak === */
function contractDuration(x){let c=x?.contract||{};if(!c.tanggalMulai||!c.tanggalAkhir)return 0;let n=days(c.tanggalMulai,c.tanggalAkhir)+1;return Number.isFinite(n)?Math.max(0,n):0}
function contractElapsed(x){let c=x?.contract||{};if(!c.tanggalMulai)return 0;let n=days(c.tanggalMulai,today())+1;return Number.isFinite(n)?Math.max(0,n):0}
function contractStatus(x){let c=x?.contract||{};if(!c.tanggalPerjanjian||!c.tanggalMulai||!c.tanggalAkhir)return{text:"Isi tanggal kontrak",color:"yellow"};let now=today(),dur=contractDuration(x);if(now<c.tanggalMulai){let n=days(now,c.tanggalMulai);return{text:`Kontrak mulai ${n} hari lagi • durasi ${dur} hari`,color:"blue"}}if(now>c.tanggalAkhir){let n=days(c.tanggalAkhir,now);return{text:`Kontrak lewat ${n} hari • durasi ${dur} hari`,color:"red"}}let rem=days(now,c.tanggalAkhir)+1,elapsed=contractElapsed(x);return{text:`Sisa kontrak ${rem} hari • ${elapsed}/${dur} hari`,color:rem<=3?"yellow":"green"}}
function due(x,id=x.currentStep){const st=STEPS[id];if(!st)return{text:"Selesai",color:"green"};if(id===IDX.MASA)return contractStatus(x);const e=Math.max(0,days(x.createdAt,today())),start=before(id);if(st.days===null)return{text:`Flexible • ${Math.max(0,e-start)} hari berjalan`,color:"blue"};const r=start+st.days-e;if(r<0)return{text:`Lewat ${Math.abs(r)} hari`,color:"red"};if(r<=1)return{text:`Sisa ${r} hari`,color:"yellow"};return{text:`Sisa ${r} hari`,color:"green"}}
function contractOk(x){let c=x?.contract||{};return !!(x.vendor&&c.noPks&&c.tanggalPerjanjian&&c.tanggalMulai&&c.tanggalAkhir)}
function gate(x,id){let st=STEPS[id];if(!isPic(st))return{ok:false,msg:"Role login bukan PIC tahapan ini."};if(id===IDX.ALOKASI&&!x.allocations.length)return{ok:false,msg:"Form alokasi barang per KPH wajib diisi."};if(id===IDX.KIRIM&&!x.shipments.length)return{ok:false,msg:"Form pengiriman dan DP wajib diisi."};if(id===IDX.TERIMA&&!x.receipts.length)return{ok:false,msg:"Form penerimaan wajib diisi setelah pengiriman."};if(id===IDX.TPHP&&pct(recTotal(x),x.totalUsulan)<100)return{ok:false,msg:"TPHP aktif setelah barang diterima 100%."};if(id===IDX.MASA&&!contractOk(x))return{ok:false,msg:"Vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir kontrak wajib diisi."};return{ok:true,msg:"Dapat di-approve."}}
function contractOptionData(x){let c=x.contract||{};return `data-vendor="${esc(x.vendor||"")}" data-nopks="${esc(c.noPks||"")}" data-tglpks="${esc(c.tanggalPks||"")}" data-tglperjanjian="${esc(c.tanggalPerjanjian||"")}" data-tglmulai="${esc(c.tanggalMulai||"")}" data-tglakhir="${esc(c.tanggalAkhir||"")}" data-keterangan="${esc(c.keterangan||"")}"`}
function contractForm(rows,selectedId=""){if(!rows.length)return`<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;return`<form id="contractForm"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" id="contractProc" required>${rows.map(x=>`<option value="${x.id}" ${+selectedId===x.id?"selected":""} ${contractOptionData(x)}>${esc(x.nama)}</option>`).join("")}</select></div><div class="field"><label>Vendor Bertanggung Jawab</label><input name="vendor" id="contractVendor" required placeholder="Nama vendor"></div><div class="field"><label>No PKS</label><input name="noPks" id="contractNoPks" required placeholder="Nomor PKS"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" id="contractTanggalPks" type="date"></div><div class="field"><label>Tanggal Perjanjian Sesuai Kontrak</label><input name="tanggalPerjanjian" id="contractTanggalPerjanjian" type="date" required></div><div class="field"><label>Tanggal Mulai Kontrak</label><input name="tanggalMulai" id="contractTanggalMulai" type="date" required></div><div class="field"><label>Tanggal Akhir Kontrak</label><input name="tanggalAkhir" id="contractTanggalAkhir" type="date" required></div><div class="field"><label>Durasi Kontrak</label><input id="contractDurasi" disabled placeholder="Otomatis dari tanggal mulai - akhir"></div><div class="field"><label>Status Tata Waktu</label><input id="contractStatusText" disabled placeholder="Otomatis sesuai kontrak"></div><div class="field full"><label>Keterangan Masa Pelaksanaan</label><textarea name="keterangan" id="contractKeterangan" placeholder="Contoh: masa pelaksanaan pekerjaan sesuai periode kontrak"></textarea></div><div class="field full"><button class="btn primary">Simpan Masa Pelaksanaan</button></div></div></form>`}
function refreshContractForm(){let sel=document.getElementById("contractProc");if(!sel)return;let op=sel.selectedOptions[0];let set=(id,v)=>{let el=document.getElementById(id);if(el)el.value=v||""};set("contractVendor",op.dataset.vendor);set("contractNoPks",op.dataset.nopks);set("contractTanggalPks",op.dataset.tglpks);set("contractTanggalPerjanjian",op.dataset.tglperjanjian);set("contractTanggalMulai",op.dataset.tglmulai);set("contractTanggalAkhir",op.dataset.tglakhir);set("contractKeterangan",op.dataset.keterangan);updateContractPreview()}
function updateContractPreview(){let mulai=document.getElementById("contractTanggalMulai")?.value,akhir=document.getElementById("contractTanggalAkhir")?.value;let dur=document.getElementById("contractDurasi"),stat=document.getElementById("contractStatusText");if(!dur||!stat)return;if(!mulai||!akhir){dur.value="";stat.value="Lengkapi tanggal mulai dan akhir";return}let n=days(mulai,akhir)+1;dur.value=n>0?`${n} hari`:"Tanggal akhir harus setelah/sama dengan mulai";let fake={contract:{tanggalPerjanjian:document.getElementById("contractTanggalPerjanjian")?.value,tanggalMulai:mulai,tanggalAkhir:akhir}};let cs=contractStatus(fake);stat.value=cs.text}
function saveContractForm(e){e.preventDefault();let f=e.target,x=fd(f),pr=db.procurements.find(p=>p.id===+x.procId);if(!pr)return toast("Pengadaan tidak ditemukan.");if(!spmk(pr))return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");if(!x.vendor||!x.noPks||!x.tanggalPerjanjian||!x.tanggalMulai||!x.tanggalAkhir)return toast("Vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir wajib diisi.");if(days(x.tanggalMulai,x.tanggalAkhir)<0)return toast("Tanggal akhir kontrak tidak boleh sebelum tanggal mulai.");pr.vendor=x.vendor.trim();pr.contract={...(pr.contract||{}),noPks:x.noPks.trim(),tanggalPks:x.tanggalPks,tanggalPerjanjian:x.tanggalPerjanjian,tanggalMulai:x.tanggalMulai,tanggalAkhir:x.tanggalAkhir,keterangan:x.keterangan||""};save();toast("Masa Pelaksanaan dan tata waktu kontrak berhasil disimpan.");document.getElementById("modalRoot").innerHTML="";render()}
function masa(){let rows=vis().filter(spmk);return`<div class="help">Masa Pelaksanaan Pekerjaan dibuka setelah SPMK selesai. PBJ mengisi vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir. Tata waktu dihitung otomatis sesuai periode kontrak.</div><div class="card pad" style="margin-top:14px"><div class="head" style="margin-top:0"><h2>Input Masa Pelaksanaan Pekerjaan</h2></div>${can("Masa Pelaksanaan","edit")?contractForm(rows):`<div class="help warn">Role Anda tidak dapat mengisi masa pelaksanaan.</div>`}</div><div class="head"><h2>Pengadaan Setelah SPMK</h2></div>${rows.length?`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Tanggal Perjanjian</th><th>Mulai</th><th>Akhir</th><th>Durasi</th><th>Tata Waktu Kontrak</th><th>Aksi</th></tr></thead><tbody>${rows.map(x=>{let cs=contractStatus(x);return`<tr><td><b>${esc(x.nama)}</b><br><small>${esc(x.bidang)}</small></td><td>${esc(x.vendor||"-")}</td><td>${esc(x.contract.noPks||"-")}</td><td>${d(x.contract.tanggalPerjanjian)}</td><td>${d(x.contract.tanggalMulai)}</td><td>${d(x.contract.tanggalAkhir)}</td><td>${contractDuration(x)||"-"} hari</td><td><span class="badge ${cs.color}">${esc(cs.text)}</span></td><td>${can("Masa Pelaksanaan","edit")?`<button class="btn primary small" data-contract="${x.id}">Isi/Edit</button>`:"-"}</td></tr>`}).join("")}</tbody></table></div>`:`<div class="card empty">Belum ada pengadaan yang mencapai SPMK.</div>`}`}
function contract(id){let rows=vis().filter(spmk),x=db.procurements.find(p=>p.id===id);if(!x||!spmk(x))return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");document.getElementById("modalRoot").innerHTML=`<div class="modalBack"><div class="modal"><div class="modalHead"><div><h2>Input Masa Pelaksanaan Pekerjaan</h2><small>${esc(x.nama)} • Tata waktu sesuai kontrak</small></div><button class="btn ghost small" id="closeContractModal">Tutup</button></div><div class="modalBody"><div class="help">Lengkapi tanggal perjanjian, tanggal mulai, dan tanggal akhir. Durasi serta status tata waktu dihitung otomatis dari kontrak.</div><div style="height:14px"></div>${contractForm(rows,id)}</div></div></div>`;document.getElementById("closeContractModal").onclick=()=>document.getElementById("modalRoot").innerHTML="";bindContractForm();refreshContractForm()}
function bindContractForm(){let cf=document.getElementById("contractForm");if(!cf)return;cf.onsubmit=saveContractForm;let sel=document.getElementById("contractProc");if(sel)sel.onchange=refreshContractForm;["contractTanggalPerjanjian","contractTanggalMulai","contractTanggalAkhir"].forEach(id=>{let el=document.getElementById(id);if(el)el.oninput=updateContractPreview});refreshContractForm()}
function bindPage(){document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;if(state.page==="dashboard")state.page="procurements";render()});document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{state.page=b.dataset.go;render()});document.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.detail));document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));let r=document.querySelector("[data-reset]");if(r)r.onclick=reset;let t=document.getElementById("toggleDetails");if(t)t.onclick=()=>{state.details=!state.details;render()};let pf=document.getElementById("procForm");if(pf)pf.onsubmit=saveProc;let af=document.getElementById("allocForm");if(af)af.onsubmit=saveAlloc;let sf=document.getElementById("shipForm");if(sf)sf.onsubmit=e=>saveMove(e,"shipments");let rf=document.getElementById("recForm");if(rf)rf.onsubmit=e=>saveMove(e,"receipts");let cf=document.getElementById("contractForm");if(cf)bindContractForm();let uf=document.getElementById("userForm");if(uf)uf.onsubmit=saveUser;document.querySelectorAll("[data-toggle-user]").forEach(b=>b.onclick=()=>{let u=db.users.find(x=>x.id===+b.dataset.toggleUser);u.active=!u.active;save();render()});let sp=document.getElementById("savePerm");if(sp)sp.onclick=savePerms}

render();



/* === PATCH v5: approval completion forms + multi satker rows === */

function docsForStep(x, stepId){
  x.documents = x.documents || [];
  return x.documents.filter(d => d.stepId === stepId);
}

function currentApprovalPanel(x){
  const st = STEPS[x.currentStep];
  if(!st) return `<div class="help ok"><b>Pengadaan selesai.</b> Semua tahapan approval sudah selesai.</div>`;
  const g = gate(x, x.currentStep);
  const du = due(x, x.currentStep);
  return `
    <div class="card pad approvalFocus">
      <div class="head" style="margin-top:0">
        <div>
          <h2>Bagian yang Perlu Di-approve PIC</h2>
          <small>Klik pengadaan akan langsung membuka bagian aktif ini.</small>
        </div>
        <span class="badge ${du.color}">${esc(du.text)}</span>
      </div>
      <div class="approvalStepBox">
        <div>
          <div class="kicker">Tahapan aktif</div>
          <h2 style="margin:4px 0 8px">${esc(st.title)}</h2>
          <div class="tools">
            <span class="badge teal">PIC: ${esc(st.pic)}</span>
            <span class="badge ${st.days===null?"blue":"green"}">${st.days===null?"Flexible":st.days+" Hari"}</span>
            <span class="badge ${isPic(st)?"green":"gray"}">${isPic(st)?"Role Anda PIC":"Menunggu PIC"}</span>
          </div>
        </div>
        <div>
          ${g.ok
            ? `<button class="btn primary" data-approve="${x.id}">Approve Tahapan Ini</button>`
            : `<button class="btn warning" disabled>Lengkapi Dahulu</button>`}
        </div>
      </div>
      <div class="help ${g.ok?"ok":"warn"}" style="margin-top:14px">
        ${g.ok ? "Semua syarat tahapan sudah lengkap. PIC dapat melakukan approval." : `<b>Belum bisa approve:</b> ${esc(g.msg)}`}
      </div>
      <div style="height:14px"></div>
      ${approvalCompletionForm(x)}
    </div>
  `;
}

function approvalCompletionForm(x){
  const id = x.currentStep;
  if(id === IDX.MASA) return `
    <div class="subHead"><h3>Lengkapi Masa Pelaksanaan Pekerjaan</h3></div>
    ${contractForm([x], x.id)}
  `;
  if(id === IDX.ALOKASI) return `
    <div class="subHead"><h3>Lengkapi Kegiatan Pengisian Alokasi Barang Per KPH</h3><small>Bisa isi banyak satuan kerja/termin sekaligus.</small></div>
    ${multiAllocationForm(x, "approvalAllocForm")}
    ${existingDataTable(x, "allocations")}
  `;
  if(id === IDX.KIRIM) return `
    <div class="subHead"><h3>Lengkapi Pengiriman Barang</h3><small>Bisa isi banyak pengiriman ke satuan kerja berbeda sekaligus.</small></div>
    ${multiMovementForm(x, "approvalShipForm", "shipments")}
    ${existingDataTable(x, "shipments")}
  `;
  if(id === IDX.TERIMA) return `
    <div class="subHead"><h3>Lengkapi Penerimaan Barang</h3><small>Penerimaan aktif setelah pengiriman tersimpan. Bisa isi banyak satuan kerja sekaligus.</small></div>
    ${multiMovementForm(x, "approvalRecForm", "receipts")}
    ${existingDataTable(x, "receipts")}
  `;
  return `
    <div class="subHead"><h3>Dokumen / Hal yang Perlu Dilengkapi</h3><small>Dokumen bisa dicatat langsung dari bagian approval.</small></div>
    ${documentForm(x)}
    ${documentList(x, id)}
  `;
}

function documentForm(x){
  const st = STEPS[x.currentStep];
  return `
    <form id="docForm" data-proc-id="${x.id}">
      <div class="formGrid">
        <div class="field">
          <label>Nama Dokumen / Kelengkapan</label>
          <input name="name" required placeholder="Contoh: BA Klarifikasi, ND, Invoice, DP">
        </div>
        <div class="field">
          <label>Nama File / Link Dokumen</label>
          <input name="file" placeholder="contoh: ba-klarifikasi.pdf">
        </div>
        <div class="field">
          <label>Tahapan</label>
          <input value="${esc(st ? st.title : "-")}" disabled>
        </div>
        <div class="field full">
          <label>Catatan</label>
          <textarea name="note" placeholder="Catatan kelengkapan dokumen"></textarea>
        </div>
        <div class="field full">
          <button class="btn secondary">Simpan Kelengkapan</button>
        </div>
      </div>
    </form>
  `;
}

function documentList(x, stepId){
  const docs = docsForStep(x, stepId);
  if(!docs.length) return `<div class="help" style="margin-top:12px">Belum ada dokumen/kelengkapan yang dicatat untuk tahapan ini.</div>`;
  return `
    <div class="tableWrap" style="margin-top:12px">
      <table>
        <thead><tr><th>Dokumen</th><th>File/Link</th><th>Catatan</th><th>Diinput Oleh</th><th>Waktu</th></tr></thead>
        <tbody>
          ${docs.map(d => `<tr>
            <td><b>${esc(d.name)}</b></td>
            <td>${esc(d.file || "-")}</td>
            <td>${esc(d.note || "-")}</td>
            <td>${esc(d.by || "-")}</td>
            <td>${d.at ? new Date(d.at).toLocaleString("id-ID") : "-"}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function multiAllocationForm(proc, formId="allocMultiForm"){
  const rows = proc ? [proc] : vis().filter(spmk);
  if(!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
  const selected = proc?.id || rows[0]?.id || "";
  const p0 = proc || rows[0];
  return `
    <form id="${formId}" class="multiForm" data-kind="allocation">
      <div class="formGrid">
        <div class="field">
          <label>Pengadaan</label>
          <select name="procId" ${proc ? "disabled" : ""}>
            ${rows.map(p => `<option value="${p.id}" ${p.id===selected?"selected":""}>${esc(p.nama)}</option>`).join("")}
          </select>
          ${proc ? `<input type="hidden" name="procId" value="${proc.id}">` : ""}
        </div>
        <div class="field">
          <label>Vendor</label>
          <input name="vendor" required value="${esc(p0?.vendor || "")}" placeholder="Nama vendor">
        </div>
        <div class="field">
          <label>No PKS</label>
          <input name="noPks" required value="${esc(p0?.contract?.noPks || "")}" placeholder="Nomor PKS">
        </div>
        <div class="field">
          <label>Tanggal PKS</label>
          <input name="tanggalPks" type="date" value="${esc(p0?.contract?.tanggalPks || "")}">
        </div>
        <div class="field">
          <label>Tahun PKS</label>
          <input name="tahunPks" type="number" value="2026">
        </div>
        <div class="field">
          <label>Info</label>
          <input disabled value="Tambah baris untuk tiap satuan kerja">
        </div>
      </div>

      <div class="multiRows" data-container="allocation">
        ${allocationRowTemplate()}
      </div>
      <div class="multiToolbar">
        <button class="btn ghost small" type="button" data-add-allocation-row>+ Tambah Satuan Kerja</button>
        <button class="btn primary" type="submit">Simpan Semua Alokasi</button>
      </div>
    </form>
  `;
}

function allocationRowTemplate(values={}){
  return `
    <div class="multiRow allocationRow">
      <div class="rowHeader">
        <b>Baris Alokasi</b>
        <button type="button" class="btn danger small" data-remove-row>Hapus</button>
      </div>
      <div class="formGrid">
        <div class="field"><label>Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja || "")}" placeholder="KPH Bandung"></div>
        <div class="field"><label>Termin</label><select name="termin">
          ${["Langsung","Termin I","Termin II","Termin III"].map(t => `<option ${values.termin===t?"selected":""}>${t}</option>`).join("")}
        </select></div>
        <div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" type="date" required value="${esc(values.tanggalMulai || "")}"></div>
        <div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" type="date" required value="${esc(values.tanggalAkhir || "")}"></div>
        <div class="field"><label>Jenis Barang</label><input name="jenisBarang" required value="${esc(values.jenisBarang || "")}" placeholder="Laptop"></div>
        <div class="field"><label>Satuan</label><input name="satuan" required value="${esc(values.satuan || "Unit")}"></div>
        <div class="field"><label>Tarif (Rp)</label><input name="tarif" type="number" required value="${esc(values.tarif || "")}"></div>
        <div class="field"><label>Volume Barang</label><input name="volume" type="number" required value="${esc(values.volume || "")}"></div>
        <div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div>
      </div>
    </div>
  `;
}

function multiMovementForm(proc, formId, type){
  const allowed = type === "receipts" ? vis().filter(p => spmk(p) && p.shipments.length) : vis().filter(p => spmk(p) && p.allocations.length);
  const rows = proc ? [proc] : allowed;
  if(!rows.length) return `<div class="empty">${type==="receipts" ? "Belum ada pengiriman, sehingga penerimaan belum dapat diinput." : "Belum ada pengadaan yang sudah SPMK dan memiliki alokasi."}</div>`;
  const p0 = proc || rows[0];
  const isReceipt = type === "receipts";
  return `
    <form id="${formId}" class="multiForm" data-kind="${type}">
      <div class="formGrid">
        <div class="field">
          <label>Pengadaan</label>
          <select name="procId" ${proc ? "disabled" : ""}>
            ${rows.map(p => `<option value="${p.id}" ${p.id===p0.id?"selected":""}>${esc(p.nama)}</option>`).join("")}
          </select>
          ${proc ? `<input type="hidden" name="procId" value="${proc.id}">` : ""}
        </div>
        <div class="field"><label>No PKS</label><input name="noPks" required value="${esc(p0?.contract?.noPks || "")}" placeholder="Nomor PKS"></div>
        <div class="field"><label>Tahun PKS</label><input name="tahunPks" type="number" value="2026"></div>
      </div>

      <div class="multiRows" data-container="${type}">
        ${movementRowTemplate({}, isReceipt)}
      </div>
      <div class="multiToolbar">
        <button class="btn ghost small" type="button" data-add-movement-row="${type}">+ Tambah ${isReceipt ? "Penerimaan" : "Pengiriman"} Satuan Kerja</button>
        <button class="btn primary" type="submit">Simpan Semua ${isReceipt ? "Penerimaan" : "Pengiriman"}</button>
      </div>
    </form>
  `;
}

function movementRowTemplate(values={}, isReceipt=false){
  const labelTanggal = isReceipt ? "Tanggal Penerimaan" : "Tanggal Pengiriman";
  const labelVolume = isReceipt ? "Volume Diterima" : "Volume Terkirim";
  return `
    <div class="multiRow movementRow">
      <div class="rowHeader">
        <b>Baris ${isReceipt ? "Penerimaan" : "Pengiriman"}</b>
        <button type="button" class="btn danger small" data-remove-row>Hapus</button>
      </div>
      <div class="formGrid">
        <div class="field"><label>${labelTanggal}</label><input name="tanggal" type="date" required value="${esc(values.tanggal || "")}"></div>
        <div class="field"><label>Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja || "")}" placeholder="KPH Bandung"></div>
        <div class="field"><label>Termin</label><select name="termin">
          ${["Langsung","Termin I","Termin II","Termin III"].map(t => `<option ${values.termin===t?"selected":""}>${t}</option>`).join("")}
        </select></div>
        <div class="field"><label>Jenis Barang</label><input name="jenisBarang" required value="${esc(values.jenisBarang || "")}" placeholder="Laptop"></div>
        <div class="field"><label>Satuan</label><input name="satuan" required value="${esc(values.satuan || "Unit")}"></div>
        <div class="field"><label>Tarif (Rp)</label><input name="tarif" type="number" required value="${esc(values.tarif || "")}"></div>
        <div class="field"><label>${labelVolume}</label><input name="volume" type="number" required value="${esc(values.volume || "")}"></div>
        <div class="field"><label>Upload DP / Nama File</label><input name="dp" value="${esc(values.dp || "")}" placeholder="dp-${isReceipt ? "terima" : "kirim"}.pdf"></div>
        <div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div>
      </div>
    </div>
  `;
}

function existingDataTable(x, type){
  const data = x[type] || [];
  if(!data.length) return `<div class="help" style="margin-top:12px">Belum ada data ${labelDataType(type)}.</div>`;
  const isAlloc = type === "allocations";
  return `
    <div class="tableWrap" style="margin-top:12px">
      <table>
        <thead>
          <tr>
            <th>Satuan Kerja</th><th>Termin</th>${isAlloc ? "<th>Tgl Mulai</th><th>Tgl Akhir</th>" : "<th>Tanggal</th>"}<th>Barang</th><th>Volume</th><th>Tarif</th><th>Nilai</th><th>DP/File</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(r => `<tr>
            <td>${esc(r.satuanKerja || "-")}</td>
            <td>${esc(r.termin || "-")}</td>
            ${isAlloc ? `<td>${d(r.tanggalMulai)}</td><td>${d(r.tanggalAkhir)}</td>` : `<td>${d(r.tanggal)}</td>`}
            <td>${esc(r.jenisBarang || "-")}</td>
            <td>${esc(r.volume || 0)} ${esc(r.satuan || "")}</td>
            <td>${rp(r.tarif || 0)}</td>
            <td>${rp(r.nilai || 0)}</td>
            <td>${esc(r.dp || "-")}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}
function labelDataType(type){
  return type==="allocations" ? "alokasi" : type==="shipments" ? "pengiriman" : "penerimaan";
}

function readRows(form, selector){
  return [...form.querySelectorAll(selector)].map(row => {
    const q = name => row.querySelector(`[name="${name}"]`)?.value?.trim() || "";
    return {
      satuanKerja:q("satuanKerja"),
      termin:q("termin"),
      tanggal:q("tanggal"),
      tanggalMulai:q("tanggalMulai"),
      tanggalAkhir:q("tanggalAkhir"),
      jenisBarang:q("jenisBarang"),
      satuan:q("satuan"),
      tarif:Number(q("tarif") || 0),
      volume:Number(q("volume") || 0),
      dp:q("dp")
    };
  }).filter(r => r.satuanKerja || r.volume || r.jenisBarang);
}

function saveMultiAllocation(e){
  e.preventDefault();
  const form = e.target;
  const data = fd(form);
  const pr = db.procurements.find(p => p.id === +data.procId);
  if(!pr) return toast("Pengadaan tidak ditemukan.");
  if(!spmk(pr)) return toast("Alokasi hanya dapat diisi setelah SPMK.");
  if(!can("Alokasi KPH","tambah") && !isPic(STEPS[pr.currentStep])) return toast("Anda tidak dapat mengisi alokasi.");

  const rows = readRows(form, ".allocationRow");
  if(!rows.length) return toast("Minimal isi satu baris alokasi.");
  if(!data.vendor || !data.noPks) return toast("Vendor dan No PKS wajib diisi.");

  for(const r of rows){
    if(!r.satuanKerja || !r.termin || !r.tanggalMulai || !r.tanggalAkhir || !r.jenisBarang || !r.satuan || !r.tarif || !r.volume){
      return toast("Setiap baris alokasi wajib memiliki satuan kerja, termin, tanggal mulai/akhir, barang, tarif, dan volume.");
    }
    if(days(r.tanggalMulai, r.tanggalAkhir) < 0) return toast("Tanggal akhir alokasi tidak boleh sebelum tanggal mulai.");
  }

  rows.forEach(r => pr.allocations.push(alloc(data.vendor, data.noPks, data.tanggalPks, r.termin, r.tanggalMulai, r.tanggalAkhir, r.satuanKerja, r.jenisBarang, r.satuan, r.tarif, r.volume, data.tahunPks || new Date().getFullYear())));
  pr.vendor = data.vendor;
  pr.contract = {...(pr.contract||{}), noPks:data.noPks, tanggalPks:data.tanggalPks};
  save();
  toast(`${rows.length} baris alokasi berhasil disimpan.`);
  document.getElementById("modalRoot").innerHTML ? detail(pr.id) : render();
}

function saveMultiMovement(e, type){
  e.preventDefault();
  const form = e.target;
  const data = fd(form);
  const pr = db.procurements.find(p => p.id === +data.procId);
  if(!pr) return toast("Pengadaan tidak ditemukan.");
  if(!spmk(pr)) return toast("Data hanya dapat diinput setelah SPMK.");
  if(type === "shipments" && !pr.allocations.length) return toast("Pengiriman membutuhkan alokasi barang terlebih dahulu.");
  if(type === "receipts" && !pr.shipments.length) return toast("Penerimaan baru dapat diinput setelah pengiriman tersimpan.");
  if(type === "shipments" && !can("Pengiriman Barang","tambah") && !isPic(STEPS[pr.currentStep])) return toast("Anda tidak dapat mengisi pengiriman.");
  if(type === "receipts" && !can("Penerimaan Barang","tambah") && !isPic(STEPS[pr.currentStep])) return toast("Anda tidak dapat mengisi penerimaan.");

  const rows = readRows(form, ".movementRow");
  if(!rows.length) return toast("Minimal isi satu baris data.");
  if(!data.noPks) return toast("No PKS wajib diisi.");

  for(const r of rows){
    if(!r.tanggal || !r.satuanKerja || !r.termin || !r.jenisBarang || !r.satuan || !r.tarif || !r.volume){
      return toast("Setiap baris wajib memiliki tanggal, satuan kerja, termin, barang, tarif, dan volume.");
    }
  }
  rows.forEach(r => pr[type].push(mov(r.tanggal, data.noPks, r.termin, r.satuanKerja, r.jenisBarang, r.satuan, r.tarif, r.volume, data.tahunPks || new Date().getFullYear(), r.dp)));
  save();
  toast(`${rows.length} baris ${type === "shipments" ? "pengiriman" : "penerimaan"} berhasil disimpan.`);
  document.getElementById("modalRoot").innerHTML ? detail(pr.id) : render();
}

function saveDocumentForm(e){
  e.preventDefault();
  const form = e.target;
  const data = fd(form);
  const pr = db.procurements.find(p => p.id === +form.dataset.procId);
  if(!pr) return toast("Pengadaan tidak ditemukan.");
  pr.documents = pr.documents || [];
  pr.documents.push({
    stepId: pr.currentStep,
    stepTitle: STEPS[pr.currentStep]?.title || "-",
    name: data.name,
    file: data.file,
    note: data.note,
    by: session.name,
    role: session.role,
    at: new Date().toISOString()
  });
  save();
  toast("Dokumen/kelengkapan berhasil dicatat di approval.");
  detail(pr.id);
}

function gate(x,id){
  let st=STEPS[id];
  if(!isPic(st))return{ok:false,msg:"Role login bukan PIC tahapan ini."};
  if(id===IDX.ALOKASI&&!x.allocations.length)return{ok:false,msg:"Form alokasi barang per KPH wajib diisi. Anda bisa mengisinya langsung di bagian approval ini."};
  if(id===IDX.KIRIM&&!x.shipments.length)return{ok:false,msg:"Form pengiriman dan DP wajib diisi. Anda bisa mengisinya langsung di bagian approval ini."};
  if(id===IDX.TERIMA&&!x.receipts.length)return{ok:false,msg:"Form penerimaan wajib diisi setelah pengiriman. Anda bisa mengisinya langsung di bagian approval ini."};
  if(id===IDX.TPHP&&pct(recTotal(x),x.totalUsulan)<100)return{ok:false,msg:"TPHP aktif setelah barang diterima 100%."};
  if(id===IDX.MASA&&!contractOk(x))return{ok:false,msg:"Vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir kontrak wajib diisi. Anda bisa mengisinya langsung di bagian approval ini."};
  return{ok:true,msg:"Dapat di-approve."}
}

function approval(){
  let apps=vis().filter(x=>x.currentStep<STEPS.length&&isPic(STEPS[x.currentStep]));
  return `
    <div class="head" style="margin-top:0">
      <h2>Antrian Approval Anda</h2>
      <button class="btn ghost small" id="toggleDetails">${state.details?"Hide Detail":"Unhide Detail"}</button>
    </div>
    <div class="help">Klik nama pengadaan atau tombol Detail untuk langsung membuka tahapan aktif, form/dokumen yang harus dilengkapi, dan tombol approve sesuai PIC.</div>
    <br>
    ${apps.length?procTable(apps):`<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`}
    <div class="head"><h2>Form Approval Alur Lengkap</h2></div>
    ${workflowAll()}
  `;
}

function procTable(rows){
  if(!rows.length)return`<div class="card empty">Belum ada data pengadaan.</div>`;
  return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Jenis</th><th>Vendor</th><th>Progress</th><th>Posisi Terakhir</th><th>Tata Waktu</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${rows.map(x=>{let st=STEPS[x.currentStep],ps=status(x),du=due(x),vendor=spmk(x)?(x.vendor||`<span class="badge yellow">Belum diisi</span>`):`<span class="badge gray">Terkunci sampai SPMK</span>`;return`<tr><td><button class="linkBtn" data-detail="${x.id}"><b>${esc(x.nama)}</b></button><br><small>Total usulan: ${x.totalUsulan} ${esc(x.satuan)}</small></td><td>${esc(x.bidang)}</td><td>${esc(x.jenisPengadaan)}</td><td>${vendor}</td><td><div class="progress"><span style="width:${prog(x)}%"></span></div><small>${prog(x)}%</small></td><td>${st?`<b>${esc(st.title)}</b><br><small>PIC: ${esc(st.pic)}</small>`:"<b>Selesai</b>"}</td><td><span class="badge ${du.color}">${esc(du.text)}</span></td><td><span class="badge ${ps.color}">${esc(ps.text)}</span></td><td><div class="tools"><button class="btn primary small" data-detail="${x.id}">Buka Approval</button>${canEditProc(x)?`<button class="btn ghost small" data-edit="${x.id}">Edit</button>`:""}</div></td></tr>`}).join("")}</tbody></table></div>`
}

function detail(id){
  let x=db.procurements.find(p=>p.id===id);
  if(!x)return;
  x.documents = x.documents || [];
  let curStep=STEPS[x.currentStep],ps=status(x);
  document.getElementById("modalRoot").innerHTML=`
    <div class="modalBack">
      <div class="modal">
        <div class="modalHead">
          <div>
            <h2>${esc(x.nama)}</h2>
            <small>${esc(x.bidang)} • ${esc(x.jenisPengadaan)} • ${prog(x)}% selesai</small>
          </div>
          <div class="tools">
            <button class="btn ghost small" id="modalToggle">${state.details?"Hide Detail":"Unhide Detail"}</button>
            <button class="btn ghost small" id="closeModal">Tutup</button>
          </div>
        </div>
        <div class="modalBody">
          <div class="kpiRow">
            <div class="mini"><span>Status</span><b>${esc(ps.text)}</b></div>
            <div class="mini"><span>Posisi Terakhir</span><b style="font-size:18px">${curStep?esc(curStep.title):"Selesai"}</b></div>
            <div class="mini"><span>Vendor</span><b style="font-size:18px">${spmk(x)?esc(x.vendor||"Belum diisi"):"Terkunci sampai SPMK"}</b></div>
          </div>
          <div style="height:16px"></div>
          ${currentApprovalPanel(x)}
          <div class="head">
            <h2>Alur Approval Pengadaan</h2>
            <div class="tools">
              ${canEditProc(x)?`<button class="btn ghost small" data-edit="${x.id}">Edit Data</button>`:""}
              ${spmk(x)?`<button class="btn secondary small" data-contract="${x.id}">Isi/Edit Vendor & Kontrak</button>`:""}
            </div>
          </div>
          ${workflowProc(x)}
        </div>
      </div>
    </div>`;
  document.getElementById("closeModal").onclick=()=>document.getElementById("modalRoot").innerHTML="";
  document.getElementById("modalToggle").onclick=()=>{state.details=!state.details;detail(x.id)};
  bindApprovalForms();
}

function workflowProc(x){
  let n=0;
  return`<div class="workflow">${WORKFLOW.map(ph=>`<div class="phase"><div class="phaseHead"><b>${esc(ph.phase)}</b><span class="badge gray">${ph.items.length} tahapan</span></div>${ph.items.map(it=>{let id=n++,done=x.completedSteps.includes(id),curr=id===x.currentStep,g=gate(x,id),cls=done?"done":curr?(g.ok?"current":"current blocked"):"",du=due(x,id);return`<div class="stepRow ${cls}"><div class="num">${id+1}</div><div class="stepTitle"><b>${esc(it.title)}</b><span>PIC: ${esc(it.pic)} • Tata waktu: ${it.days===null?"Flexible":it.days+" Hari"}</span>${state.details?`<div class="detail">${esc(it.detail)}${curr&&!g.ok?`<br><b>Belum bisa approve:</b> ${esc(g.msg)}`:""}</div>`:""}</div><div><span class="badge teal">${esc(it.pic)}</span></div><div><span class="badge ${du.color}">${done?"Selesai":curr?du.text:"Menunggu"}</span></div><div>${curr&&isPic(it)?`<button class="btn ${g.ok?"primary":"warning"} small" data-approve="${x.id}" ${g.ok?"":"disabled"}>${g.ok?"Approve":"Lengkapi"}</button>`:curr?`<span class="badge gray">Menunggu PIC</span>`:done?`<span class="badge green">Approved</span>`:`<span class="badge gray">Belum aktif</span>`}</div></div>`}).join("")}</div>`).join("")}</div>`
}

function allocation(){
  let rows=vis().filter(spmk);
  return`<div class="help">Form alokasi mendukung banyak satuan kerja. Tiap baris bisa punya termin, volume barang, tanggal mulai, tanggal akhir, tarif, dan satuan kerja berbeda.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Alokasi Barang Per KPH</h2>${can("Alokasi KPH","tambah")?multiAllocationForm(null,"allocMultiForm"):`<div class="help warn">Role Anda tidak dapat menambah alokasi.</div>`}</div><div class="head"><h2>Data Alokasi</h2></div>${allocTable(rows)}`;
}

function shipping(){
  let rows=vis().filter(x=>spmk(x)&&x.allocations.length);
  return`<div class="help">Form pengiriman mendukung banyak baris pengiriman ke satuan kerja/termin berbeda. Data pengiriman menjadi syarat agar form penerimaan aktif.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Pengiriman Barang</h2>${can("Pengiriman Barang","tambah")?multiMovementForm(null,"shipMultiForm","shipments"):`<div class="help warn">Role Anda tidak dapat menambah pengiriman.</div>`}</div><div class="head"><h2>Data Pengiriman</h2></div>${movTable("shipments")}`;
}

function receiving(){
  let rows=vis().filter(x=>spmk(x)&&x.shipments.length);
  return`<div class="help ${rows.length?"":"warn"}">Form penerimaan mendukung banyak baris penerimaan. Penerimaan baru dapat diinput setelah pengiriman barang tersimpan.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Penerimaan Barang</h2>${can("Penerimaan Barang","tambah")?multiMovementForm(null,"recMultiForm","receipts"):`<div class="help warn">Role Anda tidak dapat menambah penerimaan.</div>`}</div><div class="head"><h2>Data Penerimaan</h2></div>${movTable("receipts")}`;
}

function bindApprovalForms(){
  document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));
  document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));
  document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));
  bindContractForm();
  bindMultiForms();
  const doc = document.getElementById("docForm");
  if(doc) doc.onsubmit = saveDocumentForm;
}

function bindMultiForms(){
  document.querySelectorAll("[data-add-allocation-row]").forEach(btn => {
    btn.onclick = () => {
      const form = btn.closest("form");
      const box = form.querySelector('[data-container="allocation"]');
      box.insertAdjacentHTML("beforeend", allocationRowTemplate());
      bindMultiForms();
    };
  });
  document.querySelectorAll("[data-add-movement-row]").forEach(btn => {
    btn.onclick = () => {
      const form = btn.closest("form");
      const type = btn.dataset.addMovementRow;
      const box = form.querySelector(`[data-container="${type}"]`);
      box.insertAdjacentHTML("beforeend", movementRowTemplate({}, type==="receipts"));
      bindMultiForms();
    };
  });
  document.querySelectorAll("[data-remove-row]").forEach(btn => {
    btn.onclick = () => {
      const wrap = btn.closest(".multiRows");
      if(wrap && wrap.querySelectorAll(".multiRow").length <= 1) return toast("Minimal harus ada satu baris.");
      btn.closest(".multiRow")?.remove();
    };
  });
  ["approvalAllocForm","allocMultiForm"].forEach(id => {
    const f=document.getElementById(id);
    if(f) f.onsubmit=saveMultiAllocation;
  });
  [["approvalShipForm","shipments"],["shipMultiForm","shipments"],["approvalRecForm","receipts"],["recMultiForm","receipts"]].forEach(([id,type]) => {
    const f=document.getElementById(id);
    if(f) f.onsubmit=e=>saveMultiMovement(e,type);
  });
}

function bindPage(){
  document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;if(state.page==="dashboard")state.page="procurements";render()});
  document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{state.page=b.dataset.go;render()});
  document.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.detail));
  document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));
  document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));
  let r=document.querySelector("[data-reset]");if(r)r.onclick=reset;
  let t=document.getElementById("toggleDetails");if(t)t.onclick=()=>{state.details=!state.details;render()};
  let pf=document.getElementById("procForm");if(pf)pf.onsubmit=saveProc;
  let cf=document.getElementById("contractForm");if(cf)bindContractForm();
  bindMultiForms();
  let uf=document.getElementById("userForm");if(uf)uf.onsubmit=saveUser;
  document.querySelectorAll("[data-toggle-user]").forEach(b=>b.onclick=()=>{let u=db.users.find(x=>x.id===+b.dataset.toggleUser);u.active=!u.active;save();render()});
  let sp=document.getElementById("savePerm");if(sp)sp.onclick=savePerms;
}

render();
/* === PATCH v6: format Indonesia, upload file/camera, searchable PKS, auto data from allocation === */
const TERMIN_CHOICES_V6 = ["Langsung", "Termin I", "Termin II"];
function numID(v){return Number(v||0).toLocaleString("id-ID");}
function parseNumID(v){return Number(String(v??"").replace(/[^0-9,-]/g,"").replace(/,/g,"."))||0;}
function rp(v){return "Rp " + numID(v);}
function isoToID(v){if(!v)return""; if(/^\d{2}\/\d{2}\/\d{4}$/.test(v)) return v; const m=String(v).match(/^(\d{4})-(\d{2})-(\d{2})/); return m?`${m[3]}/${m[2]}/${m[1]}`:String(v);}
function idToISO(v){v=String(v||"").trim(); if(!v)return""; if(/^\d{4}-\d{2}-\d{2}$/.test(v)) return v; const m=v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m?`${m[3]}-${m[2]}-${m[1]}`:"";}
function d(v){return v?isoToID(v):"-";}
function validDateID(v){return !!idToISO(v);}
function fileLabel(input){const el=typeof input==="string"?document.querySelector(input):input;return el?.files?.length?[...el.files].map(f=>f.name).join(", "):"";}
function unique(arr){return [...new Set(arr.filter(Boolean))];}
function fileInputsForRow(row){return {dpFile:fileLabel(row.querySelector('[name="dpFile"]')),dpCamera:fileLabel(row.querySelector('[name="dpCamera"]'))};}
function fileInputsForForm(form){return {file:fileLabel(form.querySelector('[name="fileUpload"]')),camera:fileLabel(form.querySelector('[name="cameraUpload"]'))};}
function maskDateInput(el){let raw=el.value.replace(/\D/g,"").slice(0,8);let out=raw;if(raw.length>4)out=`${raw.slice(0,2)}/${raw.slice(2,4)}/${raw.slice(4)}`;else if(raw.length>2)out=`${raw.slice(0,2)}/${raw.slice(2)}`;el.value=out;}
function bindFormattedInputs(scope=document){scope.querySelectorAll('.num-id').forEach(el=>{el.oninput=()=>{const pos=el.selectionStart;el.value=numID(parseNumID(el.value));try{el.setSelectionRange(el.value.length,el.value.length)}catch(e){}}});scope.querySelectorAll('.date-id').forEach(el=>{el.oninput=()=>maskDateInput(el)});}
function termOptionsHtml(selected="Termin I", includeLangsung=true){return (includeLangsung?TERMIN_CHOICES_V6:TERMIN_CHOICES_V6.filter(x=>x!=="Langsung")).map(t=>`<option ${selected===t?"selected":""}>${t}</option>`).join("");}
function allocationSources(proc){return (proc?.allocations||[]).map((a,i)=>({...a,_sourceIndex:i}));}
function shipmentSources(proc){return (proc?.shipments||[]).map((a,i)=>({...a,_sourceIndex:i}));}
function movementSources(proc,type){return type==="receipts"?shipmentSources(proc):allocationSources(proc);}
function pksListForProc(proc,type="shipments"){return unique(movementSources(proc,type).map(a=>a.noPks));}
function termsForPks(proc,type,noPks){return unique(movementSources(proc,type).filter(a=>!noPks||a.noPks===noPks).map(a=>a.termin));}
function satkersForSelection(proc,type,noPks,termin){return unique(movementSources(proc,type).filter(a=>(!noPks||a.noPks===noPks)&&(!termin||a.termin===termin)).map(a=>a.satuanKerja));}
function findSource(proc,type,noPks,termin,satker){return movementSources(proc,type).find(a=>(!noPks||a.noPks===noPks)&&(!termin||a.termin===termin)&&(!satker||a.satuanKerja===satker))||movementSources(proc,type)[0];}
function selectedProcFromForm(form){const id=+(form.querySelector('[name="procId"]')?.value||0);return db.procurements.find(p=>p.id===id);}
function dataListId(prefix){return `${prefix}_${Math.random().toString(36).slice(2)}`;}

function stat(f,t,v,n){return`<div class="card stat" data-filter="${f}"><div class="statTitle">${t}</div><div class="statVal">${typeof v==='number'?numID(v):v}</div><div class="note">${n}</div></div>`}
function summary(){let r=vis(),us=r.reduce((a,x)=>a+x.totalUsulan,0),sh=r.reduce((a,x)=>a+shipTotal(x),0),re=r.reduce((a,x)=>a+recTotal(x),0);return`<div class="kpiRow"><div class="mini"><span>Total Usulan</span><b>${numID(us)}</b></div><div class="mini"><span>Total Terkirim</span><b>${numID(sh)}</b><small>${pct(sh,us)}%</small></div><div class="mini"><span>Total Diterima</span><b>${numID(re)}</b><small>${pct(re,us)}%</small></div></div>`}
function dashboard(){let r=vis(),done=r.filter(x=>x.currentStep>=STEPS.length).length,run=r.filter(x=>x.currentStep<STEPS.length).length,need=r.filter(x=>isPic(STEPS[x.currentStep])).length,bc={};r.forEach(x=>bc[x.bidang]=(bc[x.bidang]||0)+1);return`<div class="grid cards">${stat("all","Total Pengadaan",r.length,"Seluruh pengadaan yang dapat Anda akses")}${stat("done","Selesai",done,"Pengadaan selesai")}${stat("running","Sedang Berlangsung",run,"Klik untuk melihat proses berjalan")}${stat("need","Perlu Approval",need,"Tahapan sesuai PIC login")}</div><div class="split"><div class="card pad"><div class="head" style="margin-top:0"><h2>Pengadaan per Bidang</h2></div>${Object.entries(bc).map(([b,n])=>`<div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--line);padding:11px 0"><div><b>${esc(b)}</b><br><small>${numID(n)} pengadaan</small></div><span class="badge blue">${numID(n)}</span></div>`).join("")||`<div class="empty">Belum ada data.</div>`}</div><div class="card pad"><div class="head" style="margin-top:0"><h2>Monitoring Barang</h2></div>${summary()}<div class="help ok" style="margin-top:14px">Persentase diterima bertambah setelah form penerimaan diinput oleh KSS Sarpra KPH.</div></div></div><div class="head"><h2>Daftar Pengadaan</h2><div class="tools">${canInput()?`<button class="btn primary small" data-go="input">+ Input Pengadaan</button>`:""}<button class="btn ghost small" data-reset>Reset Data Demo</button></div></div>${procTable(filtered())}`}

function documentForm(x){const st=STEPS[x.currentStep];return `<form id="docForm" data-proc-id="${x.id}"><div class="formGrid"><div class="field"><label>Nama Dokumen / Kelengkapan</label><input name="name" required placeholder="Contoh: BA Klarifikasi, ND, Invoice, DP"></div><div class="field"><label>Upload Dokumen</label><input name="fileUpload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*"></div><div class="field"><label>Foto dari Kamera</label><input name="cameraUpload" type="file" accept="image/*" capture="environment"></div><div class="field"><label>Tahapan</label><input value="${esc(st?st.title:"-")}" disabled></div><div class="field full"><label>Catatan</label><textarea name="note" placeholder="Catatan kelengkapan dokumen"></textarea></div><div class="field full"><button class="btn secondary">Simpan Kelengkapan</button></div></div></form>`}
function saveDocumentForm(e){e.preventDefault();const form=e.target,data=fd(form),pr=db.procurements.find(p=>p.id===+form.dataset.procId);if(!pr)return toast("Pengadaan tidak ditemukan.");const files=fileInputsForForm(form);pr.documents=pr.documents||[];pr.documents.push({stepId:pr.currentStep,stepTitle:STEPS[pr.currentStep]?.title||"-",name:data.name,file:files.file,camera:files.camera,note:data.note,by:session.name,role:session.role,at:new Date().toISOString()});save();toast("Dokumen/kelengkapan berhasil dicatat di approval.");detail(pr.id)}
function documentList(x, stepId){const docs=docsForStep(x, stepId);if(!docs.length)return`<div class="help" style="margin-top:12px">Belum ada dokumen/kelengkapan yang dicatat untuk tahapan ini.</div>`;return`<div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Dokumen</th><th>Upload File</th><th>Foto Kamera</th><th>Catatan</th><th>Diinput Oleh</th><th>Waktu</th></tr></thead><tbody>${docs.map(d=>`<tr><td><b>${esc(d.name)}</b></td><td>${esc(d.file||"-")}</td><td>${esc(d.camera||"-")}</td><td>${esc(d.note||"-")}</td><td>${esc(d.by||"-")}</td><td>${d.at?new Date(d.at).toLocaleString("id-ID"):"-"}</td></tr>`).join("")}</tbody></table></div>`}

function contractOptionData(x){let c=x.contract||{};return `data-vendor="${esc(x.vendor||"")}" data-nopks="${esc(c.noPks||"")}" data-tglpks="${esc(isoToID(c.tanggalPks)||"")}" data-tglperjanjian="${esc(isoToID(c.tanggalPerjanjian)||"")}" data-tglmulai="${esc(isoToID(c.tanggalMulai)||"")}" data-tglakhir="${esc(isoToID(c.tanggalAkhir)||"")}" data-keterangan="${esc(c.keterangan||"")}"`}
function contractForm(rows,selectedId=""){if(!rows.length)return`<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;return`<form id="contractForm"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" id="contractProc" required>${rows.map(x=>`<option value="${x.id}" ${+selectedId===x.id?"selected":""} ${contractOptionData(x)}>${esc(x.nama)}</option>`).join("")}</select></div><div class="field"><label>Vendor Bertanggung Jawab</label><input name="vendor" id="contractVendor" required placeholder="Nama vendor"></div><div class="field"><label>No PKS</label><input name="noPks" id="contractNoPks" required placeholder="Nomor PKS"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" id="contractTanggalPks" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY"></div><div class="field"><label>Tanggal Perjanjian Sesuai Kontrak</label><input name="tanggalPerjanjian" id="contractTanggalPerjanjian" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Tanggal Mulai Kontrak</label><input name="tanggalMulai" id="contractTanggalMulai" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Tanggal Akhir Kontrak</label><input name="tanggalAkhir" id="contractTanggalAkhir" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Durasi Kontrak</label><input id="contractDurasi" disabled placeholder="Otomatis dari tanggal mulai - akhir"></div><div class="field"><label>Status Tata Waktu</label><input id="contractStatusText" disabled placeholder="Otomatis sesuai kontrak"></div><div class="field full"><label>Keterangan Masa Pelaksanaan</label><textarea name="keterangan" id="contractKeterangan" placeholder="Contoh: masa pelaksanaan pekerjaan sesuai periode kontrak"></textarea></div><div class="field full"><button class="btn primary">Simpan Masa Pelaksanaan</button></div></div></form>`}
function updateContractPreview(){let mulai=idToISO(document.getElementById("contractTanggalMulai")?.value),akhir=idToISO(document.getElementById("contractTanggalAkhir")?.value);let dur=document.getElementById("contractDurasi"),stat=document.getElementById("contractStatusText");if(!dur||!stat)return;if(!mulai||!akhir){dur.value="";stat.value="Lengkapi tanggal mulai dan akhir format DD/MM/YYYY";return}let n=days(mulai,akhir)+1;dur.value=n>0?`${numID(n)} hari`:"Tanggal akhir harus setelah/sama dengan mulai";let fake={contract:{tanggalPerjanjian:idToISO(document.getElementById("contractTanggalPerjanjian")?.value),tanggalMulai:mulai,tanggalAkhir:akhir}};let cs=contractStatus(fake);stat.value=cs.text}
function refreshContractForm(){let sel=document.getElementById("contractProc"),opt=sel?.selectedOptions?.[0];if(!opt)return;document.getElementById("contractVendor").value=opt.dataset.vendor||"";document.getElementById("contractNoPks").value=opt.dataset.nopks||"";document.getElementById("contractTanggalPks").value=opt.dataset.tglpks||"";document.getElementById("contractTanggalPerjanjian").value=opt.dataset.tglperjanjian||"";document.getElementById("contractTanggalMulai").value=opt.dataset.tglmulai||"";document.getElementById("contractTanggalAkhir").value=opt.dataset.tglakhir||"";document.getElementById("contractKeterangan").value=opt.dataset.keterangan||"";updateContractPreview();bindFormattedInputs(document.getElementById("contractForm"));}
function saveContractForm(e){e.preventDefault();let f=e.target,x=fd(f),pr=db.procurements.find(p=>p.id===+x.procId);if(!pr)return toast("Pengadaan tidak ditemukan.");if(!spmk(pr))return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");const tanggalPks=idToISO(x.tanggalPks),tanggalPerjanjian=idToISO(x.tanggalPerjanjian),tanggalMulai=idToISO(x.tanggalMulai),tanggalAkhir=idToISO(x.tanggalAkhir);if(!x.vendor||!x.noPks||!tanggalPerjanjian||!tanggalMulai||!tanggalAkhir)return toast("Vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir wajib diisi format DD/MM/YYYY.");if(days(tanggalMulai,tanggalAkhir)<0)return toast("Tanggal akhir kontrak tidak boleh sebelum tanggal mulai.");pr.vendor=x.vendor.trim();pr.contract={...(pr.contract||{}),noPks:x.noPks.trim(),tanggalPks,tanggalPerjanjian,tanggalMulai,tanggalAkhir,keterangan:x.keterangan||""};save();toast("Masa Pelaksanaan dan tata waktu kontrak berhasil disimpan.");document.getElementById("modalRoot").innerHTML="";render()}
function bindContractForm(){let cf=document.getElementById("contractForm");if(!cf)return;cf.onsubmit=saveContractForm;let sel=document.getElementById("contractProc");if(sel)sel.onchange=refreshContractForm;["contractTanggalPerjanjian","contractTanggalMulai","contractTanggalAkhir","contractTanggalPks"].forEach(id=>{let el=document.getElementById(id);if(el)el.oninput=()=>{maskDateInput(el);updateContractPreview()}});refreshContractForm()}

function allocationRowTemplate(values={}){return`<div class="multiRow allocationRow"><div class="rowHeader"><b>Baris Alokasi</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div><div class="formGrid"><div class="field"><label>Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja||"")}" placeholder="KPH Bandung"></div><div class="field"><label>Termin</label><select name="termin">${termOptionsHtml(values.termin||"Termin I",true)}</select></div><div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required value="${esc(isoToID(values.tanggalMulai)||"")}"></div><div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required value="${esc(isoToID(values.tanggalAkhir)||"")}"></div><div class="field"><label>Jenis Barang</label><input name="jenisBarang" required value="${esc(values.jenisBarang||"")}" placeholder="Laptop"></div><div class="field"><label>Satuan</label><input name="satuan" required value="${esc(values.satuan||"Unit")}"></div><div class="field"><label>Tarif (Rp)</label><input name="tarif" class="num-id" inputmode="numeric" required value="${values.tarif?numID(values.tarif):""}"></div><div class="field"><label>Volume Barang</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}"></div><div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div></div></div>`}
function multiAllocationForm(proc, formId="allocMultiForm"){const rows=proc?[proc]:vis().filter(spmk);if(!rows.length)return`<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;const selected=proc?.id||rows[0]?.id||"",p0=proc||rows[0];return`<form id="${formId}" class="multiForm" data-kind="allocation"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" ${proc?"disabled":""}>${rows.map(p=>`<option value="${p.id}" ${p.id===selected?"selected":""}>${esc(p.nama)}</option>`).join("")}</select>${proc?`<input type="hidden" name="procId" value="${proc.id}">`:""}</div><div class="field"><label>Vendor</label><input name="vendor" required value="${esc(p0?.vendor||"")}" placeholder="Nama vendor"></div><div class="field"><label>No PKS</label><input name="noPks" required value="${esc(p0?.contract?.noPks||"")}" placeholder="Nomor PKS"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" value="${esc(isoToID(p0?.contract?.tanggalPks)||"")}"></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div><div class="field"><label>Info</label><input disabled value="Tambah baris untuk tiap satuan kerja"></div></div><div class="multiRows" data-container="allocation">${allocationRowTemplate()}</div><div class="multiToolbar"><button class="btn ghost small" type="button" data-add-allocation-row>+ Tambah Satuan Kerja</button><button class="btn primary" type="submit">Simpan Semua Alokasi</button></div></form>`}

function movementRowTemplate(values={}, isReceipt=false, procId=0){const rowId=dataListId("pksList"),labelTanggal=isReceipt?"Tanggal Penerimaan":"Tanggal Pengiriman",labelVolume=isReceipt?"Volume Diterima":"Volume Terkirim",type=isReceipt?"receipts":"shipments",proc=db.procurements.find(p=>p.id===+procId)||vis().find(p=>spmk(p));const pks=pksListForProc(proc,type),selectedPks=values.noPks||pks[0]||"",terms=termsForPks(proc,type,selectedPks),selectedTerm=values.termin||terms[0]||"Langsung",satkers=satkersForSelection(proc,type,selectedPks,selectedTerm),selectedSatker=values.satuanKerja||satkers[0]||"",src=findSource(proc,type,selectedPks,selectedTerm,selectedSatker)||{};return`<div class="multiRow movementRow" data-movement-type="${type}"><div class="rowHeader"><b>Baris ${isReceipt?"Penerimaan":"Pengiriman"}</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div><div class="formGrid"><div class="field"><label>${labelTanggal}</label><input name="tanggal" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required value="${esc(isoToID(values.tanggal)||"")}"></div><div class="field"><label>No PKS</label><input name="noPks" list="${rowId}" data-pks-input required value="${esc(selectedPks)}" placeholder="Ketik/cari No PKS"><datalist id="${rowId}">${pks.map(no=>`<option value="${esc(no)}"></option>`).join("")}</datalist></div><div class="field"><label>Termin</label><select name="termin" data-term-select ${terms.length<=1?"":""}>${(terms.length?terms:["Langsung"]).map(t=>`<option ${selectedTerm===t?"selected":""}>${esc(t)}</option>`).join("")}</select><small>${terms.length<=1?"Otomatis dari alokasi":"Pilih sesuai termin alokasi"}</small></div><div class="field"><label>Satuan Kerja</label><select name="satuanKerja" data-satker-select required>${(satkers.length?satkers:[selectedSatker]).filter(Boolean).map(sk=>`<option ${selectedSatker===sk?"selected":""}>${esc(sk)}</option>`).join("")}</select></div><div class="field"><label>Jenis Barang</label><input name="jenisBarang" readonly required value="${esc(values.jenisBarang||src.jenisBarang||"")}" placeholder="Otomatis dari alokasi"></div><div class="field"><label>Satuan</label><input name="satuan" readonly required value="${esc(values.satuan||src.satuan||"")}" placeholder="Otomatis"></div><div class="field"><label>Tarif (Rp)</label><input name="tarif" readonly class="num-id" value="${src.tarif?numID(src.tarif):""}" placeholder="Otomatis"></div><div class="field"><label>${labelVolume}</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}"></div><div class="field"><label>Upload DP / Dokumen</label><input name="dpFile" type="file" accept=".pdf,.jpg,.jpeg,.png,image/*"></div><div class="field"><label>Foto dari Kamera</label><input name="dpCamera" type="file" accept="image/*" capture="environment"></div><div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div></div></div>`}
function multiMovementForm(proc, formId, type){const allowed=type==="receipts"?vis().filter(p=>spmk(p)&&p.shipments.length):vis().filter(p=>spmk(p)&&p.allocations.length);const rows=proc?[proc]:allowed;if(!rows.length)return`<div class="empty">${type==="receipts"?"Belum ada pengiriman, sehingga penerimaan belum dapat diinput.":"Belum ada pengadaan yang sudah SPMK dan memiliki alokasi."}</div>`;const p0=proc||rows[0],isReceipt=type==="receipts";return`<form id="${formId}" class="multiForm" data-kind="${type}"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" data-proc-select ${proc?"disabled":""}>${rows.map(p=>`<option value="${p.id}" ${p.id===p0.id?"selected":""}>${esc(p.nama)}</option>`).join("")}</select>${proc?`<input type="hidden" name="procId" value="${proc.id}">`:""}</div><div class="field"><label>Info No PKS</label><input disabled value="Pilih/cari No PKS dari data alokasi"></div><div class="field"><label>Info Barang</label><input disabled value="Jenis barang, satuan, tarif otomatis"></div></div><div class="multiRows" data-container="${type}">${movementRowTemplate({},isReceipt,p0.id)}</div><div class="multiToolbar"><button class="btn ghost small" type="button" data-add-movement-row="${type}">+ Tambah ${isReceipt?"Penerimaan":"Pengiriman"} Satuan Kerja</button><button class="btn primary" type="submit">Simpan Semua ${isReceipt?"Penerimaan":"Pengiriman"}</button></div></form>`}
function updateMovementRow(row){const form=row.closest('form'),proc=selectedProcFromForm(form),type=form?.dataset.kind||row.dataset.movementType;if(!proc)return;const pksInput=row.querySelector('[name="noPks"]'),termSel=row.querySelector('[name="termin"]'),satSel=row.querySelector('[name="satuanKerja"]');let noPks=pksInput?.value||"";const pks=pksListForProc(proc,type);if(!noPks&&pks.length){noPks=pks[0];pksInput.value=noPks}let terms=termsForPks(proc,type,noPks);if(!terms.length)terms=["Langsung"];const oldTerm=termSel.value;termSel.innerHTML=terms.map(t=>`<option ${oldTerm===t?"selected":""}>${esc(t)}</option>`).join("");if(!terms.includes(oldTerm))termSel.value=terms[0];termSel.disabled=terms.length<=1;let satkers=satkersForSelection(proc,type,noPks,termSel.value);const oldSat=satSel.value;satSel.innerHTML=satkers.map(sk=>`<option ${oldSat===sk?"selected":""}>${esc(sk)}</option>`).join("");if(satkers.length&&!satkers.includes(oldSat))satSel.value=satkers[0];const src=findSource(proc,type,noPks,termSel.value,satSel.value)||{};row.querySelector('[name="jenisBarang"]').value=src.jenisBarang||"";row.querySelector('[name="satuan"]').value=src.satuan||"";row.querySelector('[name="tarif"]').value=src.tarif?numID(src.tarif):"";}
function bindMovementAuto(form){if(!form)return;form.querySelectorAll('.movementRow').forEach(row=>{['change','input'].forEach(ev=>{row.querySelector('[name="noPks"]')?.addEventListener(ev,()=>updateMovementRow(row));row.querySelector('[name="termin"]')?.addEventListener(ev,()=>updateMovementRow(row));row.querySelector('[name="satuanKerja"]')?.addEventListener(ev,()=>updateMovementRow(row));});updateMovementRow(row)});form.querySelector('[data-proc-select]')?.addEventListener('change',()=>{const proc=selectedProcFromForm(form),type=form.dataset.kind,isReceipt=type==='receipts';form.querySelector('.multiRows').innerHTML=movementRowTemplate({},isReceipt,proc?.id);bindMultiForms();});}
function readRows(form, selector){return[...form.querySelectorAll(selector)].map(row=>{const q=name=>row.querySelector(`[name="${name}"]`)?.value?.trim()||"";const files=fileInputsForRow(row);return{satuanKerja:q("satuanKerja"),termin:q("termin"),tanggal:idToISO(q("tanggal")),tanggalMulai:idToISO(q("tanggalMulai")),tanggalAkhir:idToISO(q("tanggalAkhir")),jenisBarang:q("jenisBarang"),satuan:q("satuan"),tarif:parseNumID(q("tarif")),volume:parseNumID(q("volume")),dp:[files.dpFile,files.dpCamera].filter(Boolean).join(" | "),noPks:q("noPks")}}).filter(r=>r.satuanKerja||r.volume||r.jenisBarang)}
function saveMultiAllocation(e){e.preventDefault();const form=e.target,data=fd(form),pr=db.procurements.find(p=>p.id===+data.procId);if(!pr)return toast("Pengadaan tidak ditemukan.");if(!spmk(pr))return toast("Alokasi hanya dapat diisi setelah SPMK.");if(!can("Alokasi KPH","tambah")&&!isPic(STEPS[pr.currentStep]))return toast("Anda tidak dapat mengisi alokasi.");const rows=readRows(form,".allocationRow"),tanggalPks=idToISO(data.tanggalPks);if(!rows.length)return toast("Minimal isi satu baris alokasi.");if(!data.vendor||!data.noPks)return toast("Vendor dan No PKS wajib diisi.");for(const r of rows){if(!r.satuanKerja||!r.termin||!r.tanggalMulai||!r.tanggalAkhir||!r.jenisBarang||!r.satuan||!r.tarif||!r.volume)return toast("Setiap baris alokasi wajib memiliki satuan kerja, termin, tanggal mulai/akhir DD/MM/YYYY, barang, tarif, dan volume.");if(days(r.tanggalMulai,r.tanggalAkhir)<0)return toast("Tanggal akhir alokasi tidak boleh sebelum tanggal mulai.");if(!TERMIN_CHOICES_V6.includes(r.termin))return toast("Termin hanya boleh Langsung, Termin I, atau Termin II.");}rows.forEach(r=>pr.allocations.push(alloc(data.vendor,data.noPks,tanggalPks,r.termin,r.tanggalMulai,r.tanggalAkhir,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,parseNumID(data.tahunPks)||new Date().getFullYear())));pr.vendor=data.vendor;pr.contract={...(pr.contract||{}),noPks:data.noPks,tanggalPks};save();toast(`${numID(rows.length)} baris alokasi berhasil disimpan.`);document.getElementById("modalRoot").innerHTML?detail(pr.id):render()}
function saveMultiMovement(e,type){e.preventDefault();const form=e.target,data=fd(form),pr=db.procurements.find(p=>p.id===+data.procId);if(!pr)return toast("Pengadaan tidak ditemukan.");if(!spmk(pr))return toast("Data hanya dapat diinput setelah SPMK.");if(type==="shipments"&&!pr.allocations.length)return toast("Pengiriman membutuhkan alokasi barang terlebih dahulu.");if(type==="receipts"&&!pr.shipments.length)return toast("Penerimaan baru dapat diinput setelah pengiriman tersimpan.");if(type==="shipments"&&!can("Pengiriman Barang","tambah")&&!isPic(STEPS[pr.currentStep]))return toast("Anda tidak dapat mengisi pengiriman.");if(type==="receipts"&&!can("Penerimaan Barang","tambah")&&!isPic(STEPS[pr.currentStep]))return toast("Anda tidak dapat mengisi penerimaan.");const rows=readRows(form,".movementRow");if(!rows.length)return toast("Minimal isi satu baris data.");for(const r of rows){if(!r.tanggal||!r.noPks||!r.satuanKerja||!r.termin||!r.jenisBarang||!r.satuan||!r.tarif||!r.volume)return toast("Setiap baris wajib memiliki tanggal DD/MM/YYYY, No PKS, satuan kerja, termin, barang, tarif, dan volume.");}rows.forEach(r=>pr[type].push(mov(r.tanggal,r.noPks,r.termin,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,new Date().getFullYear(),r.dp)));save();toast(`${numID(rows.length)} baris ${type==="shipments"?"pengiriman":"penerimaan"} berhasil disimpan.`);document.getElementById("modalRoot").innerHTML?detail(pr.id):render()}
function existingDataTable(x,type){const data=x[type]||[];if(!data.length)return`<div class="help" style="margin-top:12px">Belum ada data ${labelDataType(type)}.</div>`;const isAlloc=type==="allocations";return`<div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Satuan Kerja</th><th>Termin</th>${isAlloc?"<th>Tgl Mulai</th><th>Tgl Akhir</th>":"<th>Tanggal</th>"}<th>Barang</th><th>Volume</th><th>Tarif</th><th>Nilai</th><th>DP/File</th></tr></thead><tbody>${data.map(r=>`<tr><td>${esc(r.satuanKerja||"-")}</td><td>${esc(r.termin||"-")}</td>${isAlloc?`<td>${d(r.tanggalMulai)}</td><td>${d(r.tanggalAkhir)}</td>`:`<td>${d(r.tanggal)}</td>`}<td>${esc(r.jenisBarang||"-")}</td><td>${numID(r.volume||0)} ${esc(r.satuan||"")}</td><td>${rp(r.tarif||0)}</td><td>${rp(r.nilai||0)}</td><td>${esc(r.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`}
function allocTable(rows){let list=[];rows.forEach(x=>x.allocations.forEach(a=>list.push({proc:x,...a})));if(!list.length)return`<div class="card empty">Belum ada alokasi.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Termin</th><th>Tgl Mulai</th><th>Tgl Akhir</th><th>Satuan Kerja</th><th>Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th></tr></thead><tbody>${list.map(x=>`<tr><td><b>${esc(x.proc.nama)}</b></td><td>${esc(x.vendor)}</td><td>${esc(x.noPks)}</td><td>${esc(x.termin)}</td><td>${d(x.tanggalMulai)}</td><td>${d(x.tanggalAkhir)}</td><td>${esc(x.satuanKerja)}</td><td>${esc(x.jenisBarang)}</td><td>${rp(x.tarif)}</td><td>${numID(x.volume)}</td><td>${rp(x.nilai)}</td></tr>`).join("")}</tbody></table></div>`}
function movTable(type){let list=[];vis().forEach(x=>x[type].forEach(a=>list.push({proc:x,...a})));if(!list.length)return`<div class="card empty">Belum ada data.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Tanggal</th><th>No PKS</th><th>Termin</th><th>Satuan Kerja</th><th>Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th><th>DP</th></tr></thead><tbody>${list.map(x=>`<tr><td><b>${esc(x.proc.nama)}</b></td><td>${d(x.tanggal)}</td><td>${esc(x.noPks)}</td><td>${esc(x.termin)}</td><td>${esc(x.satuanKerja)}</td><td>${esc(x.jenisBarang)}</td><td>${rp(x.tarif)}</td><td>${numID(x.volume)}</td><td>${rp(x.nilai)}</td><td>${esc(x.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`}
function monitoring(){let rows=vis();return`<div class="grid cards">${stat("all","Total Pengadaan",rows.length,"Jumlah pengadaan")}${stat("all","Total Usulan",rows.reduce((a,x)=>a+x.totalUsulan,0),"Volume barang usulan")}${stat("all","Total Terkirim",rows.reduce((a,x)=>a+shipTotal(x),0),"Akumulasi volume kirim")}${stat("all","Total Diterima",rows.reduce((a,x)=>a+recTotal(x),0),"Akumulasi volume terima")}</div><div class="head"><h2>Monitoring Barang Sesuai Usulan</h2></div><div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Total Usulan</th><th>Total Terkirim</th><th>Total Diterima</th><th>% Terkirim</th><th>% Diterima</th><th>Catatan</th></tr></thead><tbody>${rows.map(x=>{let sh=shipTotal(x),re=recTotal(x);return`<tr><td><b>${esc(x.nama)}</b><br><small>${esc(x.jenisBarang)}</small></td><td>${esc(x.bidang)}</td><td>${numID(x.totalUsulan)} ${esc(x.satuan)}</td><td>${numID(sh)}</td><td>${numID(re)}</td><td><div class="progress"><span style="width:${pct(sh,x.totalUsulan)}%"></span></div><small>${pct(sh,x.totalUsulan)}%</small></td><td><div class="progress"><span style="width:${pct(re,x.totalUsulan)}%"></span></div><small>${pct(re,x.totalUsulan)}%</small></td><td>${re>=x.totalUsulan?`<span class="badge green">Diterima 100%</span>`:`<span class="badge yellow">Belum 100%</span>`}</td></tr>`}).join("")}</tbody></table></div>`}
function procTable(rows){if(!rows.length)return`<div class="card empty">Belum ada data pengadaan.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Jenis</th><th>Vendor</th><th>Progress</th><th>Posisi Terakhir</th><th>Tata Waktu</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${rows.map(x=>{let st=STEPS[x.currentStep],ps=status(x),du=due(x),vendor=spmk(x)?(x.vendor||`<span class="badge yellow">Belum diisi</span>`):`<span class="badge gray">Terkunci sampai SPMK</span>`;return`<tr><td data-label="Pengadaan"><button class="linkBtn" data-detail="${x.id}"><b>${esc(x.nama)}</b></button><br><small>Total usulan: ${numID(x.totalUsulan)} ${esc(x.satuan)}</small></td><td data-label="Bidang">${esc(x.bidang)}</td><td data-label="Jenis">${esc(x.jenisPengadaan)}</td><td data-label="Vendor">${vendor}</td><td data-label="Progress"><div class="progress"><span style="width:${prog(x)}%"></span></div><small>${prog(x)}%</small></td><td data-label="Posisi Terakhir">${st?`<b>${esc(st.title)}</b><br><small>PIC: ${esc(st.pic)}</small>`:"<b>Selesai</b>"}</td><td data-label="Tata Waktu"><span class="badge ${du.color}">${esc(du.text)}</span></td><td data-label="Status"><span class="badge ${ps.color}">${esc(ps.text)}</span></td><td data-label="Aksi"><div class="tools"><button class="btn primary small" data-detail="${x.id}">Buka Approval</button>${canEditProc(x)?`<button class="btn ghost small" data-edit="${x.id}">Edit</button>`:""}</div></td></tr>`}).join("")}</tbody></table></div>`}
function bindMultiForms(){document.querySelectorAll("[data-add-allocation-row]").forEach(btn=>{btn.onclick=()=>{const form=btn.closest("form"),box=form.querySelector('[data-container="allocation"]');box.insertAdjacentHTML("beforeend",allocationRowTemplate());bindMultiForms();bindFormattedInputs(form)}});document.querySelectorAll("[data-add-movement-row]").forEach(btn=>{btn.onclick=()=>{const form=btn.closest("form"),type=btn.dataset.addMovementRow,proc=selectedProcFromForm(form),box=form.querySelector(`[data-container="${type}"]`);box.insertAdjacentHTML("beforeend",movementRowTemplate({},type==="receipts",proc?.id));bindMultiForms();bindFormattedInputs(form)}});document.querySelectorAll("[data-remove-row]").forEach(btn=>{btn.onclick=()=>{const wrap=btn.closest(".multiRows");if(wrap&&wrap.querySelectorAll(".multiRow").length<=1)return toast("Minimal harus ada satu baris.");btn.closest(".multiRow")?.remove()}});["approvalAllocForm","allocMultiForm"].forEach(id=>{const f=document.getElementById(id);if(f)f.onsubmit=saveMultiAllocation});[["approvalShipForm","shipments"],["shipMultiForm","shipments"],["approvalRecForm","receipts"],["recMultiForm","receipts"]].forEach(([id,type])=>{const f=document.getElementById(id);if(f){f.onsubmit=e=>saveMultiMovement(e,type);bindMovementAuto(f)}});bindFormattedInputs()}
function bindPage(){document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;if(state.page==="dashboard")state.page="procurements";render()});document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{state.page=b.dataset.go;render()});document.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.detail));document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));let r=document.querySelector("[data-reset]");if(r)r.onclick=reset;let t=document.getElementById("toggleDetails");if(t)t.onclick=()=>{state.details=!state.details;render()};let pf=document.getElementById("procForm");if(pf)pf.onsubmit=saveProc;bindContractForm();bindMultiForms();let uf=document.getElementById("userForm");if(uf)uf.onsubmit=saveUser;document.querySelectorAll("[data-toggle-user]").forEach(b=>b.onclick=()=>{let u=db.users.find(x=>x.id===+b.dataset.toggleUser);u.active=!u.active;save();render()});let sp=document.getElementById("savePerm");if(sp)sp.onclick=savePerms;bindFormattedInputs()}
function bindApprovalForms(){document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));bindContractForm();bindMultiForms();const doc=document.getElementById("docForm");if(doc)doc.onsubmit=saveDocumentForm;bindFormattedInputs()}

render();


/* ============================================================
   PATCH v7
   - Monitoring PIC aging/lama approve
   - Upload dokumen/file/foto kamera wajib di tiap tahapan approval
   - Form Approval Alur Lengkap: penjelasan bisa Hide / Unhide terpisah
============================================================ */

state.flowDetails = state.flowDetails ?? false;

function safeDateISO(v){
  if(!v) return "";
  if(/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0,10);
  const iso = typeof idToISO === "function" ? idToISO(v) : "";
  return iso || "";
}
function addDaysISO(base, n){
  const d0 = new Date((safeDateISO(base)||today()) + "T00:00:00");
  d0.setDate(d0.getDate() + Number(n||0));
  return d0.toISOString().slice(0,10);
}
function stepStartISO(proc, stepId){
  proc.stepStartedAt = proc.stepStartedAt || {};
  if(proc.stepStartedAt[stepId]) return safeDateISO(proc.stepStartedAt[stepId]);
  return addDaysISO(proc.createdAt, before(stepId));
}
function approvalForStep(proc, stepId){
  return (proc.approvals || []).find(a => Number(a.stepId) === Number(stepId));
}
function docsForStepV7(proc, stepId){
  proc.documents = proc.documents || [];
  return proc.documents.filter(d => Number(d.stepId) === Number(stepId));
}
function hasStepDocument(proc, stepId){
  return docsForStepV7(proc, stepId).some(d => (d.file || d.camera || d.name));
}
function movementUploadOk(list){
  return (list || []).some(r => String(r.dp || "").trim().length > 0);
}
function stepUploadOk(proc, stepId){
  if(hasStepDocument(proc, stepId)) return true;
  if(stepId === IDX.KIRIM) return movementUploadOk(proc.shipments);
  if(stepId === IDX.TERIMA) return movementUploadOk(proc.receipts);
  return false;
}
function uploadRequiredMessage(proc, stepId){
  const step = STEPS[stepId];
  return `Upload dokumen wajib untuk tahapan ${step ? step.title : "ini"}. Gunakan upload file atau foto dari kamera.`;
}
function agingColorBy(actual, target){
  if(target === null || target === undefined){
    if(actual >= 10) return "red";
    if(actual >= 5) return "yellow";
    return "blue";
  }
  if(actual > target) return "red";
  if(actual >= Math.max(1, target - 1)) return "yellow";
  return "green";
}
function agingStatusText(actual, target){
  if(target === null || target === undefined){
    if(actual >= 10) return "Pantau lama";
    if(actual >= 5) return "Perlu dipantau";
    return "Flexible";
  }
  const diff = actual - target;
  if(diff > 0) return `Terlambat +${numID(diff)} hari`;
  if(diff === 0) return "Batas akhir";
  return `Sisa ${numID(Math.abs(diff))} hari`;
}
function picAgingRows(){
  const rows=[];
  vis().forEach(proc => {
    const currentStep = STEPS[proc.currentStep];
    if(currentStep){
      const start = stepStartISO(proc, proc.currentStep);
      const actual = Math.max(0, days(start, today()));
      const target = currentStep.days;
      rows.push({proc, stepId:proc.currentStep, phase:currentStep.phase, step:currentStep.title, pic:currentStep.pic, target, actual, diff:target==null?null:actual-target, status:agingStatusText(actual,target), color:agingColorBy(actual,target), type:"Aktif", start, approved:"-"});
    }
    (proc.approvals || []).forEach(ap => {
      const step = STEPS[ap.stepId];
      if(!step) return;
      const start = safeDateISO(ap.startedAt) || stepStartISO(proc, ap.stepId);
      const approved = safeDateISO(ap.approvedAt) || today();
      const actual = Math.max(0, days(start, approved));
      const target = step.days;
      rows.push({proc, stepId:ap.stepId, phase:step.phase, step:step.title, pic:step.pic, target, actual, diff:target==null?null:actual-target, status:agingStatusText(actual,target), color:agingColorBy(actual,target), type:"Approved", start, approved});
    });
  });
  return rows.sort((a,b)=>{
    const wa = a.color==="red"?3:a.color==="yellow"?2:1;
    const wb = b.color==="red"?3:b.color==="yellow"?2:1;
    return wb-wa || b.actual-a.actual;
  });
}
function picAgingSummaryCards(rows){
  const terlambat = rows.filter(r=>r.color==="red").length;
  const pantau = rows.filter(r=>r.color==="yellow").length;
  const active = rows.filter(r=>r.type==="Aktif").length;
  const max = rows.length ? Math.max(...rows.map(r=>r.actual)) : 0;
  return `<div class="grid cards agingCards">
    ${stat("all","PIC Terlambat",terlambat,"Tahapan melewati tata waktu atau flexible terlalu lama")}
    ${stat("all","Perlu Dipantau",pantau,"Mendekati batas target")}
    ${stat("all","Tahapan Aktif",active,"Belum approved / masih dikerjakan")}
    ${stat("all","Durasi Terlama",`${numID(max)} hari`,"Durasi pekerjaan atau approval paling lama")}
  </div>`;
}
function monitoringPICSection(){
  const rows = picAgingRows();
  const top = rows.slice(0,12);
  return `<div class="head"><h2>Monitoring PIC Lama Melakukan Pekerjaan / Approved</h2></div>
    ${picAgingSummaryCards(rows)}
    <div class="help warn">Monitoring ini membandingkan durasi aktual PIC sejak tahapan aktif sampai approved. Untuk tata waktu Flexible, sistem tetap menghitung durasi berjalan agar proses yang terlalu lama tetap terlihat.</div>
    <div style="height:12px"></div>
    <div class="tableWrap agingTable"><table><thead><tr><th>PIC</th><th>Pengadaan</th><th>Tahapan</th><th>Mulai Aktif</th><th>Approved</th><th>Target</th><th>Durasi Aktual</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
      ${top.map(r=>`<tr>
        <td data-label="PIC"><b>${esc(r.pic)}</b><br><small>${esc(r.type)}</small></td>
        <td data-label="Pengadaan">${esc(r.proc.nama)}</td>
        <td data-label="Tahapan"><b>${esc(r.step)}</b><br><small>${esc(r.phase)}</small></td>
        <td data-label="Mulai Aktif">${d(r.start)}</td>
        <td data-label="Approved">${r.approved === "-" ? "-" : d(r.approved)}</td>
        <td data-label="Target">${r.target==null?"Flexible":numID(r.target)+" hari"}</td>
        <td data-label="Durasi Aktual">${numID(r.actual)} hari</td>
        <td data-label="Status"><span class="badge ${r.color}">${esc(r.status)}</span></td>
        <td data-label="Aksi"><button class="btn ghost small" data-detail="${r.proc.id}">Buka</button></td>
      </tr>`).join("")}
    </tbody></table></div>`;
}

function uploadRequirementPanel(proc, stepId){
  const ok = stepUploadOk(proc, stepId);
  return `<div class="uploadRequired ${ok?"ok":"need"}">
    <div>
      <b>Upload dokumen wajib tahapan</b><br>
      <small>Setiap alur proses wajib memiliki dokumen: upload file atau foto langsung dari kamera.</small>
    </div>
    <span class="badge ${ok?"green":"yellow"}">${ok?"Dokumen tersedia":"Belum upload"}</span>
  </div>
  ${documentForm(proc)}
  ${documentList(proc, stepId)}`;
}
function documentList(proc, stepId){
  const docs = docsForStepV7(proc, stepId);
  if(!docs.length) return `<div class="help" style="margin-top:12px">Belum ada dokumen/kelengkapan untuk tahapan ini. Upload file atau ambil foto dari kamera agar approval dapat dilakukan.</div>`;
  return `<div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Dokumen</th><th>File Upload</th><th>Foto Kamera</th><th>Catatan</th><th>Diinput Oleh</th><th>Waktu</th></tr></thead><tbody>
    ${docs.map(d=>`<tr><td data-label="Dokumen"><b>${esc(d.name)}</b></td><td data-label="File">${esc(d.file||"-")}</td><td data-label="Foto Kamera">${esc(d.camera||"-")}</td><td data-label="Catatan">${esc(d.note||"-")}</td><td data-label="Diinput Oleh">${esc(d.by||"-")}<br><small>${esc(d.role||"")}</small></td><td data-label="Waktu">${d.at?new Date(d.at).toLocaleString("id-ID"):"-"}</td></tr>`).join("")}
  </tbody></table></div>`;
}
function approvalCompletionForm(proc){
  const id = proc.currentStep;
  const upload = `<div class="subHead"><h3>Upload Dokumen Wajib Tahapan</h3><small>Wajib untuk semua alur proses.</small></div>${uploadRequirementPanel(proc,id)}`;
  if(id === IDX.MASA) return `<div class="subHead"><h3>Lengkapi Masa Pelaksanaan Pekerjaan</h3></div>${contractForm([proc], proc.id)}${upload}`;
  if(id === IDX.ALOKASI) return `<div class="subHead"><h3>Lengkapi Kegiatan Pengisian Alokasi Barang Per KPH</h3><small>Bisa isi banyak satuan kerja/termin sekaligus.</small></div>${multiAllocationForm(proc,"approvalAllocForm")}${existingDataTable(proc,"allocations")}${upload}`;
  if(id === IDX.KIRIM) return `<div class="subHead"><h3>Lengkapi Pengiriman Barang</h3><small>Upload DP/file/foto bisa di tiap baris dan di dokumen wajib tahapan.</small></div>${multiMovementForm(proc,"approvalShipForm","shipments")}${existingDataTable(proc,"shipments")}${upload}`;
  if(id === IDX.TERIMA) return `<div class="subHead"><h3>Lengkapi Penerimaan Barang</h3><small>Upload file/foto bukti penerimaan dari kamera atau file.</small></div>${multiMovementForm(proc,"approvalRecForm","receipts")}${existingDataTable(proc,"receipts")}${upload}`;
  return `<div class="subHead"><h3>Dokumen / Hal yang Perlu Dilengkapi</h3><small>Dokumen bisa dicatat langsung dari bagian approval.</small></div>${uploadRequirementPanel(proc,id)}`;
}
function gate(proc,id){
  const st = STEPS[id];
  if(!isPic(st)) return {ok:false,msg:"Role login bukan PIC tahapan ini."};
  if(id===IDX.ALOKASI && !proc.allocations.length) return {ok:false,msg:"Form alokasi barang per KPH wajib diisi. Anda bisa mengisinya langsung di bagian approval ini."};
  if(id===IDX.KIRIM && !proc.shipments.length) return {ok:false,msg:"Form pengiriman barang wajib diisi."};
  if(id===IDX.KIRIM && !movementUploadOk(proc.shipments) && !hasStepDocument(proc,id)) return {ok:false,msg:"Upload DP pengiriman wajib: pilih file atau foto kamera."};
  if(id===IDX.TERIMA && !proc.receipts.length) return {ok:false,msg:"Form penerimaan wajib diisi setelah pengiriman."};
  if(id===IDX.TERIMA && !movementUploadOk(proc.receipts) && !hasStepDocument(proc,id)) return {ok:false,msg:"Upload dokumen/foto penerimaan wajib: pilih file atau foto kamera."};
  if(id===IDX.TPHP && pct(recTotal(proc),proc.totalUsulan)<100) return {ok:false,msg:"TPHP aktif setelah barang diterima 100%."};
  if(id===IDX.MASA && !contractOk(proc)) return {ok:false,msg:"Vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir kontrak wajib diisi."};
  if(!stepUploadOk(proc,id)) return {ok:false,msg:uploadRequiredMessage(proc,id)};
  return {ok:true,msg:"Dapat di-approve."};
}
function approve(id){
  const proc = db.procurements.find(p=>p.id===id);
  if(!proc) return;
  proc.stepStartedAt = proc.stepStartedAt || {};
  const current = proc.currentStep;
  if(!proc.stepStartedAt[current]) proc.stepStartedAt[current] = stepStartISO(proc,current);
  const g = gate(proc,current);
  if(!g.ok) return toast(g.msg);
  if(!proc.completedSteps.includes(current)) proc.completedSteps.push(current);
  proc.approvals = proc.approvals || [];
  proc.approvals.push({
    stepId: current,
    stepTitle: STEPS[current].title,
    pic: STEPS[current].pic,
    startedAt: proc.stepStartedAt[current],
    approvedBy: session.name,
    approvedRole: session.role,
    approvedAt: new Date().toISOString()
  });
  proc.currentStep = Math.min(STEPS.length,current+1);
  if(proc.currentStep < STEPS.length) proc.stepStartedAt[proc.currentStep] = new Date().toISOString();
  save();
  toast("Approval berhasil disimpan.");
  detail(proc.id);
}
function saveMultiMovement(e,type){
  e.preventDefault();
  const form=e.target,data=fd(form),proc=db.procurements.find(p=>p.id===+data.procId);
  if(!proc) return toast("Pengadaan tidak ditemukan.");
  if(!spmk(proc)) return toast("Data hanya dapat diinput setelah SPMK.");
  if(type==="shipments"&&!proc.allocations.length) return toast("Pengiriman membutuhkan alokasi barang terlebih dahulu.");
  if(type==="receipts"&&!proc.shipments.length) return toast("Penerimaan baru dapat diinput setelah pengiriman tersimpan.");
  if(type==="shipments"&&!can("Pengiriman Barang","tambah")&&!isPic(STEPS[proc.currentStep])) return toast("Anda tidak dapat mengisi pengiriman.");
  if(type==="receipts"&&!can("Penerimaan Barang","tambah")&&!isPic(STEPS[proc.currentStep])) return toast("Anda tidak dapat mengisi penerimaan.");
  const rows=readRows(form,".movementRow");
  if(!rows.length) return toast("Minimal isi satu baris data.");
  for(const r of rows){
    if(!r.tanggal||!r.noPks||!r.satuanKerja||!r.termin||!r.jenisBarang||!r.satuan||!r.tarif||!r.volume) return toast("Setiap baris wajib memiliki tanggal DD/MM/YYYY, No PKS, satuan kerja, termin, barang, tarif, dan volume.");
    if(!r.dp) return toast("Setiap baris wajib upload DP/dokumen: pilih file atau foto kamera.");
  }
  rows.forEach(r=>proc[type].push(mov(r.tanggal,r.noPks,r.termin,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,new Date().getFullYear(),r.dp)));
  save();
  toast(`${numID(rows.length)} baris ${type==="shipments"?"pengiriman":"penerimaan"} berhasil disimpan.`);
  document.getElementById("modalRoot").innerHTML?detail(proc.id):render();
}
function monitoring(){
  const rows=vis();
  const shTotal=rows.reduce((a,x)=>a+shipTotal(x),0), reTotal=rows.reduce((a,x)=>a+recTotal(x),0), usTotal=rows.reduce((a,x)=>a+x.totalUsulan,0);
  return `${monitoringPICSection()}
    <div class="head"><h2>Monitoring Barang Sesuai Usulan</h2></div>
    <div class="grid cards">${stat("all","Total Pengadaan",rows.length,"Jumlah pengadaan")}${stat("all","Total Usulan",usTotal,"Volume barang usulan")}${stat("all","Total Terkirim",shTotal,"Akumulasi volume kirim")}${stat("all","Total Diterima",reTotal,"Akumulasi volume terima")}</div>
    <div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Total Usulan</th><th>Total Terkirim</th><th>Total Diterima</th><th>% Terkirim</th><th>% Diterima</th><th>Catatan</th></tr></thead><tbody>
      ${rows.map(x=>{let sh=shipTotal(x),re=recTotal(x);return`<tr><td data-label="Pengadaan"><b>${esc(x.nama)}</b><br><small>${esc(x.jenisBarang)}</small></td><td data-label="Bidang">${esc(x.bidang)}</td><td data-label="Total Usulan">${numID(x.totalUsulan)} ${esc(x.satuan)}</td><td data-label="Total Terkirim">${numID(sh)}</td><td data-label="Total Diterima">${numID(re)}</td><td data-label="% Terkirim"><div class="progress"><span style="width:${pct(sh,x.totalUsulan)}%"></span></div><small>${pct(sh,x.totalUsulan)}%</small></td><td data-label="% Diterima"><div class="progress"><span style="width:${pct(re,x.totalUsulan)}%"></span></div><small>${pct(re,x.totalUsulan)}%</small></td><td data-label="Catatan">${re>=x.totalUsulan?`<span class="badge green">Diterima 100%</span>`:`<span class="badge yellow">Belum 100%</span>`}</td></tr>`}).join("")}
    </tbody></table></div>`;
}
function approval(){
  let apps=vis().filter(x=>x.currentStep<STEPS.length&&isPic(STEPS[x.currentStep]));
  return `<div class="head" style="margin-top:0"><h2>Antrian Approval Anda</h2><div class="tools"><button class="btn ghost small" id="toggleDetails">${state.details?"Hide Detail Tahapan":"Unhide Detail Tahapan"}</button><button class="btn ghost small" id="toggleFlowDetails">${state.flowDetails?"Hide Penjelasan Form Approval":"Unhide Penjelasan Form Approval"}</button></div></div>
    <div class="help">Klik nama pengadaan atau tombol Buka Approval untuk melihat tahapan aktif, form/dokumen wajib, dan tombol approve sesuai PIC.</div><br>
    ${apps.length?procTable(apps):`<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`}
    <div class="head"><h2>Form Approval Alur Lengkap</h2><button class="btn ghost small" id="toggleFlowDetails2">${state.flowDetails?"Hide Penjelasan":"Unhide Penjelasan"}</button></div>
    ${workflowAll()}`;
}
function workflowAll(){
  let no=0;
  return `<div class="workflow ${state.flowDetails?"showDetails":"hideDetails"}">${WORKFLOW.map(ph=>`<div class="phase"><div class="phaseHead"><b>${esc(ph.phase)}</b><span class="badge gray">${ph.items.length} tahapan</span></div>${ph.items.map(it=>{let id=no++;return`<div class="stepRow"><div class="num">${id+1}</div><div class="stepTitle"><b>${esc(it.title)}</b><span>PIC: ${esc(it.pic)} • Tata waktu: ${it.days===null?"Flexible":it.days+" Hari"}</span>${state.flowDetails?`<div class="detail"><b>Penjelasan:</b> ${esc(it.detail)}<br><b>Upload:</b> Wajib upload file dokumen atau foto kamera sebelum approve.</div>`:""}</div><div><span class="badge teal">${esc(it.pic)}</span></div><div><span class="badge ${it.days===null?"blue":"green"}">${it.days===null?"Flexible":it.days+" Hari"}</span></div><div><small>${state.flowDetails?"Detail tampil":"Detail hide"}</small></div></div>`}).join("")}</div>`).join("")}</div>`;
}
function bindPage(){
  document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;if(state.page==="dashboard")state.page="procurements";render()});
  document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{state.page=b.dataset.go;render()});
  document.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.detail));
  document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));
  document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));
  let r=document.querySelector("[data-reset]");if(r)r.onclick=reset;
  let t=document.getElementById("toggleDetails");if(t)t.onclick=()=>{state.details=!state.details;render()};
  document.querySelectorAll("#toggleFlowDetails,#toggleFlowDetails2").forEach(btn=>btn.onclick=()=>{state.flowDetails=!state.flowDetails;render()});
  let pf=document.getElementById("procForm");if(pf)pf.onsubmit=saveProc;
  bindContractForm();bindMultiForms();
  let uf=document.getElementById("userForm");if(uf)uf.onsubmit=saveUser;
  document.querySelectorAll("[data-toggle-user]").forEach(b=>b.onclick=()=>{let u=db.users.find(x=>x.id===+b.dataset.toggleUser);u.active=!u.active;save();render()});
  let sp=document.getElementById("savePerm");if(sp)sp.onclick=savePerms;
  bindFormattedInputs();
}
function bindApprovalForms(){
  document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));
  document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>contract(+b.dataset.contract));
  document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));
  document.querySelectorAll("#toggleFlowDetails,#toggleFlowDetails2").forEach(btn=>btn.onclick=()=>{state.flowDetails=!state.flowDetails;detail(Number(document.querySelector(".modal [data-approve]")?.dataset.approve || 0))});
  bindContractForm();bindMultiForms();
  const doc=document.getElementById("docForm");if(doc)doc.onsubmit=saveDocumentForm;
  bindFormattedInputs();
}

render();



/* === PATCH v8: real camera capture for Upload DP / Dokumen ===
   - Upload DP / Nama File now supports direct camera capture through getUserMedia.
   - Fallback for mobile browsers uses input accept=image/* capture=environment.
   - Captured images are stored in __MPB_STORAGE as data URLs for this frontend demo.
*/
const CAMERA_STORE_KEY_V8 = "mpb_camera_captures_v8";
function cameraStoreV8(){try{return JSON.parse(__MPB_STORAGE.getItem(CAMERA_STORE_KEY_V8)||"{}");}catch{return {};}}
function saveCameraCaptureV8(name, dataUrl){const store=cameraStoreV8();store[name]=dataUrl;__MPB_STORAGE.setItem(CAMERA_STORE_KEY_V8, JSON.stringify(store));}
function cameraCaptureHtmlV8(hiddenName, label="Ambil Foto Langsung dari Kamera"){
  return `<div class="cameraCaptureBox">
    <input type="hidden" name="${hiddenName}" data-camera-hidden>
    <button type="button" class="btn ghost small" data-open-camera data-camera-target="${hiddenName}">${label}</button>
    <div class="cameraPreview" data-camera-preview="${hiddenName}">Belum ada foto kamera</div>
  </div>`;
}
function previewCameraResultV8(scope, hiddenName, fileName, dataUrl){
  const hidden = scope.querySelector(`[name="${hiddenName}"]`);
  if(hidden) hidden.value = fileName;
  const preview = scope.querySelector(`[data-camera-preview="${hiddenName}"]`);
  if(preview){
    preview.innerHTML = `<div class="cameraThumbWrap"><img src="${dataUrl}" alt="Foto kamera"><span>${esc(fileName)}</span></div>`;
  }
}
function openFallbackCameraInputV8(scope, hiddenName){
  const input=document.createElement("input");
  input.type="file"; input.accept="image/*"; input.capture="environment";
  input.onchange=()=>{
    const file=input.files?.[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=()=>{
      const name=`camera-${new Date().toISOString().replace(/[:.]/g,"-")}-${file.name || "foto.jpg"}`;
      const dataUrl=String(reader.result||"");
      saveCameraCaptureV8(name,dataUrl);
      previewCameraResultV8(scope,hiddenName,name,dataUrl);
      toast("Foto kamera berhasil diambil.");
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
async function openCameraModalV8(scope, hiddenName){
  if(!navigator.mediaDevices?.getUserMedia){
    openFallbackCameraInputV8(scope,hiddenName);
    return;
  }
  let stream;
  const modal=document.createElement("div");
  modal.className="cameraModalBackdrop";
  modal.innerHTML=`<div class="cameraModal">
    <div class="cameraModalHead"><b>Ambil Foto Langsung dari Kamera</b><button type="button" class="btn ghost small" data-close-camera>Tutup</button></div>
    <video autoplay playsinline></video>
    <canvas class="hidden"></canvas>
    <div class="cameraActions">
      <button type="button" class="btn primary" data-capture-photo>Ambil Foto</button>
      <button type="button" class="btn ghost" data-switch-fallback>Pilih dari Galeri/File</button>
    </div>
    <small>Kamera dibuka langsung dari perangkat. Di laptop, browser akan meminta izin kamera.</small>
  </div>`;
  document.body.appendChild(modal);
  const video=modal.querySelector("video"), canvas=modal.querySelector("canvas");
  const close=()=>{try{stream?.getTracks()?.forEach(t=>t.stop());}catch{} modal.remove();};
  modal.querySelector("[data-close-camera]").onclick=close;
  modal.querySelector("[data-switch-fallback]").onclick=()=>{close();openFallbackCameraInputV8(scope,hiddenName);};
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}}, audio:false});
    video.srcObject=stream;
  }catch(err){
    close();
    toast("Kamera tidak bisa dibuka. Browser akan membuka pilihan file/foto sebagai fallback.");
    openFallbackCameraInputV8(scope,hiddenName);
    return;
  }
  modal.querySelector("[data-capture-photo]").onclick=()=>{
    const w=video.videoWidth||1280,h=video.videoHeight||720;
    canvas.width=w; canvas.height=h;
    canvas.getContext("2d").drawImage(video,0,0,w,h);
    const dataUrl=canvas.toDataURL("image/jpeg",0.88);
    const name=`camera-${new Date().toISOString().replace(/[:.]/g,"-")}.jpg`;
    saveCameraCaptureV8(name,dataUrl);
    previewCameraResultV8(scope,hiddenName,name,dataUrl);
    close();
    toast("Foto kamera berhasil diambil dan tersimpan di form.");
  };
}
if(!window.__mpbCameraV8Bound){
  window.__mpbCameraV8Bound=true;
  document.addEventListener("click",e=>{
    const btn=e.target.closest("[data-open-camera]");
    if(!btn) return;
    const scope=btn.closest(".multiRow") || btn.closest("form") || document;
    openCameraModalV8(scope, btn.dataset.cameraTarget);
  });
}
function fileInputsForRow(row){
  return {
    dpFile:fileLabel(row.querySelector('[name="dpFile"]')),
    dpCamera:row.querySelector('[name="dpCameraName"]')?.value || ""
  };
}
function fileInputsForForm(form){
  return {
    file:fileLabel(form.querySelector('[name="fileUpload"]')),
    camera:form.querySelector('[name="cameraUploadName"]')?.value || ""
  };
}
function documentForm(proc){
  const st=STEPS[proc.currentStep];
  return `<form id="docForm" data-proc-id="${proc.id}">
    <div class="formGrid">
      <div class="field"><label>Nama Dokumen / Kelengkapan</label><input name="name" required placeholder="Contoh: BA Klarifikasi, ND, Invoice, DP"></div>
      <div class="field"><label>Upload File Dokumen</label><input name="fileUpload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*"></div>
      <div class="field"><label>Foto Langsung dari Kamera</label>${cameraCaptureHtmlV8("cameraUploadName")}</div>
      <div class="field"><label>Tahapan</label><input value="${esc(st?st.title:"-")}" disabled></div>
      <div class="field full"><label>Catatan</label><textarea name="note" placeholder="Catatan kelengkapan dokumen"></textarea></div>
      <div class="field full"><button class="btn secondary">Simpan Kelengkapan</button></div>
    </div>
  </form>`;
}
function movementRowTemplate(values={}, isReceipt=false, procId=0){
  const rowId=dataListId("pksList"),labelTanggal=isReceipt?"Tanggal Penerimaan":"Tanggal Pengiriman",labelVolume=isReceipt?"Volume Diterima":"Volume Terkirim",type=isReceipt?"receipts":"shipments",proc=db.procurements.find(p=>p.id===+procId)||vis().find(p=>spmk(p));
  const pks=pksListForProc(proc,type),selectedPks=values.noPks||pks[0]||"",terms=termsForPks(proc,type,selectedPks),selectedTerm=values.termin||terms[0]||"Langsung",satkers=satkersForSelection(proc,type,selectedPks,selectedTerm),selectedSatker=values.satuanKerja||satkers[0]||"",src=findSource(proc,type,selectedPks,selectedTerm,selectedSatker)||{};
  return `<div class="multiRow movementRow" data-movement-type="${type}">
    <div class="rowHeader"><b>Baris ${isReceipt?"Penerimaan":"Pengiriman"}</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div>
    <div class="formGrid">
      <div class="field"><label>${labelTanggal}</label><input name="tanggal" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required value="${esc(isoToID(values.tanggal)||"")}"></div>
      <div class="field"><label>No PKS</label><input name="noPks" list="${rowId}" data-pks-input required value="${esc(selectedPks)}" placeholder="Ketik/cari No PKS"><datalist id="${rowId}">${pks.map(no=>`<option value="${esc(no)}"></option>`).join("")}</datalist></div>
      <div class="field"><label>Termin</label><select name="termin" data-term-select>${(terms.length?terms:["Langsung"]).map(t=>`<option ${selectedTerm===t?"selected":""}>${esc(t)}</option>`).join("")}</select><small>${terms.length<=1?"Otomatis dari alokasi":"Pilih sesuai termin alokasi"}</small></div>
      <div class="field"><label>Satuan Kerja</label><select name="satuanKerja" data-satker-select required>${(satkers.length?satkers:[selectedSatker]).filter(Boolean).map(sk=>`<option ${selectedSatker===sk?"selected":""}>${esc(sk)}</option>`).join("")}</select></div>
      <div class="field"><label>Jenis Barang</label><input name="jenisBarang" readonly required value="${esc(values.jenisBarang||src.jenisBarang||"")}" placeholder="Otomatis dari alokasi"></div>
      <div class="field"><label>Satuan</label><input name="satuan" readonly required value="${esc(values.satuan||src.satuan||"")}" placeholder="Otomatis"></div>
      <div class="field"><label>Tarif (Rp)</label><input name="tarif" readonly class="num-id" value="${src.tarif?numID(src.tarif):""}" placeholder="Otomatis"></div>
      <div class="field"><label>${labelVolume}</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}"></div>
      <div class="field"><label>Upload DP / File Dokumen</label><input name="dpFile" type="file" accept=".pdf,.jpg,.jpeg,.png,image/*"></div>
      <div class="field"><label>Ambil Foto Langsung</label>${cameraCaptureHtmlV8("dpCameraName")}</div>
      <div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div>
    </div>
  </div>`;
}
function readRows(form, selector){
  return [...form.querySelectorAll(selector)].map(row=>{
    const q=name=>row.querySelector(`[name="${name}"]`)?.value?.trim()||"";
    const files=fileInputsForRow(row);
    return {satuanKerja:q("satuanKerja"),termin:q("termin"),tanggal:idToISO(q("tanggal")),tanggalMulai:idToISO(q("tanggalMulai")),tanggalAkhir:idToISO(q("tanggalAkhir")),jenisBarang:q("jenisBarang"),satuan:q("satuan"),tarif:parseNumID(q("tarif")),volume:parseNumID(q("volume")),dp:[files.dpFile,files.dpCamera].filter(Boolean).join(" | "),noPks:q("noPks")};
  }).filter(r=>r.satuanKerja||r.volume||r.jenisBarang);
}
function uploadRequirementPanel(proc, stepId){
  const ok = stepUploadOk(proc, stepId);
  return `<div class="uploadRequired ${ok?"ok":"need"}">
    <div>
      <b>Upload dokumen wajib tahapan</b><br>
      <small>Setiap alur proses wajib memiliki dokumen. Bisa pilih file atau ambil foto langsung dari kamera HP/laptop.</small>
    </div>
    <span class="badge ${ok?"green":"yellow"}">${ok?"Dokumen tersedia":"Belum upload"}</span>
  </div>${documentForm(proc)}${documentList(proc,stepId)}`;
}
function uploadRequiredMessage(proc, stepId){
  const step = STEPS[stepId];
  return `Upload dokumen wajib untuk tahapan ${step ? step.title : "ini"}. Pilih file atau ambil foto langsung dari kamera HP/laptop.`;
}
function gate(proc,id){
  const st = STEPS[id];
  if(!isPic(st)) return {ok:false,msg:"Role login bukan PIC tahapan ini."};
  if(id===IDX.ALOKASI && !proc.allocations.length) return {ok:false,msg:"Form alokasi barang per KPH wajib diisi. Anda bisa mengisinya langsung di bagian approval ini."};
  if(id===IDX.KIRIM && !proc.shipments.length) return {ok:false,msg:"Form pengiriman barang wajib diisi."};
  if(id===IDX.KIRIM && !movementUploadOk(proc.shipments) && !hasStepDocument(proc,id)) return {ok:false,msg:"Upload DP pengiriman wajib: pilih file atau ambil foto langsung dari kamera."};
  if(id===IDX.TERIMA && !proc.receipts.length) return {ok:false,msg:"Form penerimaan wajib diisi setelah pengiriman."};
  if(id===IDX.TERIMA && !movementUploadOk(proc.receipts) && !hasStepDocument(proc,id)) return {ok:false,msg:"Upload dokumen/foto penerimaan wajib: pilih file atau ambil foto langsung dari kamera."};
  if(id===IDX.TPHP && pct(recTotal(proc),proc.totalUsulan)<100) return {ok:false,msg:"TPHP aktif setelah barang diterima 100%."};
  if(id===IDX.MASA && !contractOk(proc)) return {ok:false,msg:"Vendor, No PKS, tanggal perjanjian, tanggal mulai, dan tanggal akhir kontrak wajib diisi."};
  if(!stepUploadOk(proc,id)) return {ok:false,msg:uploadRequiredMessage(proc,id)};
  return {ok:true,msg:"Dapat di-approve."};
}
render();

/* === PATCH v9: camera photo goes into Upload DP / File Dokumen ===
   - Camera capture is now part of the same Upload DP / File Dokumen field.
   - The captured photo name is stored in the same dp value used by shipment/receipt rows.
   - Document uploads also show file + direct camera capture in a single upload block.
*/
function uploadDpFileDokumenHtmlV9(hiddenName="dpCameraName", fileName="dpFile"){
  return `<div class="uploadDpUnified" data-upload-dp-box>
    <div class="uploadDpActions">
      <label class="filePickBtn">
        <input name="${fileName}" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*">
        <span>Pilih File</span>
      </label>
      ${cameraCaptureHtmlV8(hiddenName,"Ambil Foto Langsung")}
    </div>
    <small>Foto dari kamera akan otomatis masuk ke data <b>Upload DP / File Dokumen</b> pada baris ini.</small>
  </div>`;
}
function uploadDokumenTahapanHtmlV9(){
  return `<div class="uploadDpUnified" data-upload-dp-box>
    <div class="uploadDpActions">
      <label class="filePickBtn">
        <input name="fileUpload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*">
        <span>Pilih File Dokumen</span>
      </label>
      ${cameraCaptureHtmlV8("cameraUploadName","Ambil Foto Langsung")}
    </div>
    <small>File atau foto kamera tersimpan sebagai dokumen tahapan approval.</small>
  </div>`;
}
function fileInputsForRow(row){
  const file = fileLabel(row.querySelector('[name="dpFile"]'));
  const camera = row.querySelector('[name="dpCameraName"]')?.value || "";
  return {
    dpFile:file,
    dpCamera:camera,
    dpUnified:[file,camera].filter(Boolean).join(" | ")
  };
}
function fileInputsForForm(form){
  const file = fileLabel(form.querySelector('[name="fileUpload"]'));
  const camera = form.querySelector('[name="cameraUploadName"]')?.value || "";
  return {
    file,
    camera,
    unified:[file,camera].filter(Boolean).join(" | ")
  };
}
function documentForm(proc){
  const st=STEPS[proc.currentStep];
  return `<form id="docForm" data-proc-id="${proc.id}">
    <div class="formGrid">
      <div class="field"><label>Nama Dokumen / Kelengkapan</label><input name="name" required placeholder="Contoh: BA Klarifikasi, ND, Invoice, DP"></div>
      <div class="field full"><label>Upload File Dokumen / Foto Langsung</label>${uploadDokumenTahapanHtmlV9()}</div>
      <div class="field"><label>Tahapan</label><input value="${esc(st?st.title:"-")}" disabled></div>
      <div class="field full"><label>Catatan</label><textarea name="note" placeholder="Catatan kelengkapan dokumen"></textarea></div>
      <div class="field full"><button class="btn secondary">Simpan Kelengkapan</button></div>
    </div>
  </form>`;
}
function saveDocumentForm(e){
  e.preventDefault();
  const form=e.target,data=fd(form),pr=db.procurements.find(p=>p.id===+form.dataset.procId);
  if(!pr)return toast("Pengadaan tidak ditemukan.");
  const files=fileInputsForForm(form);
  if(!files.unified) return toast("Pilih file dokumen atau ambil foto langsung dari kamera terlebih dahulu.");
  pr.documents=pr.documents||[];
  pr.documents.push({
    stepId:pr.currentStep,
    stepTitle:STEPS[pr.currentStep]?.title||"-",
    name:data.name,
    file:files.unified,
    camera:files.camera,
    note:data.note,
    by:session.name,
    role:session.role,
    at:new Date().toISOString()
  });
  save();
  toast("Dokumen/kelengkapan berhasil masuk ke Upload File Dokumen.");
  detail(pr.id);
}
function documentList(proc,stepId){
  const docs=docsForStepV7(proc,stepId);
  if(!docs.length) return `<div class="help" style="margin-top:12px">Belum ada dokumen/kelengkapan untuk tahapan ini. Pilih file atau ambil foto langsung agar data masuk ke Upload File Dokumen.</div>`;
  return `<div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Dokumen</th><th>Upload File Dokumen</th><th>Catatan</th><th>Diinput Oleh</th><th>Waktu</th></tr></thead><tbody>
    ${docs.map(d=>`<tr><td data-label="Dokumen"><b>${esc(d.name)}</b></td><td data-label="Upload">${esc(d.file||d.camera||"-")}</td><td data-label="Catatan">${esc(d.note||"-")}</td><td data-label="Diinput Oleh">${esc(d.by||"-")}<br><small>${esc(d.role||"")}</small></td><td data-label="Waktu">${d.at?new Date(d.at).toLocaleString("id-ID"):"-"}</td></tr>`).join("")}
  </tbody></table></div>`;
}
function movementRowTemplate(values={}, isReceipt=false, procId=0){
  const rowId=dataListId("pksList"),labelTanggal=isReceipt?"Tanggal Penerimaan":"Tanggal Pengiriman",labelVolume=isReceipt?"Volume Diterima":"Volume Terkirim",type=isReceipt?"receipts":"shipments",proc=db.procurements.find(p=>p.id===+procId)||vis().find(p=>spmk(p));
  const pks=pksListForProc(proc,type),selectedPks=values.noPks||pks[0]||"",terms=termsForPks(proc,type,selectedPks),selectedTerm=values.termin||terms[0]||"Langsung",satkers=satkersForSelection(proc,type,selectedPks,selectedTerm),selectedSatker=values.satuanKerja||satkers[0]||"",src=findSource(proc,type,selectedPks,selectedTerm,selectedSatker)||{};
  return `<div class="multiRow movementRow" data-movement-type="${type}">
    <div class="rowHeader"><b>Baris ${isReceipt?"Penerimaan":"Pengiriman"}</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div>
    <div class="formGrid">
      <div class="field"><label>${labelTanggal}</label><input name="tanggal" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required value="${esc(isoToID(values.tanggal)||"")}"></div>
      <div class="field"><label>No PKS</label><input name="noPks" list="${rowId}" data-pks-input required value="${esc(selectedPks)}" placeholder="Ketik/cari No PKS"><datalist id="${rowId}">${pks.map(no=>`<option value="${esc(no)}"></option>`).join("")}</datalist></div>
      <div class="field"><label>Termin</label><select name="termin" data-term-select>${(terms.length?terms:["Langsung"]).map(t=>`<option ${selectedTerm===t?"selected":""}>${esc(t)}</option>`).join("")}</select><small>${terms.length<=1?"Otomatis dari alokasi":"Pilih sesuai termin alokasi"}</small></div>
      <div class="field"><label>Satuan Kerja</label><select name="satuanKerja" data-satker-select required>${(satkers.length?satkers:[selectedSatker]).filter(Boolean).map(sk=>`<option ${selectedSatker===sk?"selected":""}>${esc(sk)}</option>`).join("")}</select></div>
      <div class="field"><label>Jenis Barang</label><input name="jenisBarang" readonly required value="${esc(values.jenisBarang||src.jenisBarang||"")}" placeholder="Otomatis dari alokasi"></div>
      <div class="field"><label>Satuan</label><input name="satuan" readonly required value="${esc(values.satuan||src.satuan||"")}" placeholder="Otomatis"></div>
      <div class="field"><label>Tarif (Rp)</label><input name="tarif" readonly class="num-id" value="${src.tarif?numID(src.tarif):""}" placeholder="Otomatis"></div>
      <div class="field"><label>${labelVolume}</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}"></div>
      <div class="field full"><label>Upload DP / File Dokumen</label>${uploadDpFileDokumenHtmlV9("dpCameraName","dpFile")}</div>
      <div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div>
    </div>
  </div>`;
}
function readRows(form, selector){
  return [...form.querySelectorAll(selector)].map(row=>{
    const q=name=>row.querySelector(`[name="${name}"]`)?.value?.trim()||"";
    const files=fileInputsForRow(row);
    return {
      satuanKerja:q("satuanKerja"),
      termin:q("termin"),
      tanggal:idToISO(q("tanggal")),
      tanggalMulai:idToISO(q("tanggalMulai")),
      tanggalAkhir:idToISO(q("tanggalAkhir")),
      jenisBarang:q("jenisBarang"),
      satuan:q("satuan"),
      tarif:parseNumID(q("tarif")),
      volume:parseNumID(q("volume")),
      dp:files.dpUnified,
      noPks:q("noPks")
    };
  }).filter(r=>r.satuanKerja||r.volume||r.jenisBarang);
}
function movementUploadOk(list){return (list||[]).some(x=>!!x.dp);}
function existingDataTable(proc,type){
  const data=proc[type]||[],isAlloc=type==="allocations";
  if(!data.length)return`<div class="help" style="margin-top:12px">Belum ada data ${labelDataType(type)}.</div>`;
  return `<div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Satuan Kerja</th><th>Termin</th>${isAlloc?"<th>Tgl Mulai</th><th>Tgl Akhir</th>":"<th>Tanggal</th>"}<th>Barang</th><th>Volume</th><th>Tarif</th><th>Nilai</th><th>Upload DP / File Dokumen</th></tr></thead><tbody>${data.map(r=>`<tr><td data-label="Satuan Kerja">${esc(r.satuanKerja||"-")}</td><td data-label="Termin">${esc(r.termin||"-")}</td>${isAlloc?`<td data-label="Tgl Mulai">${d(r.tanggalMulai)}</td><td data-label="Tgl Akhir">${d(r.tanggalAkhir)}</td>`:`<td data-label="Tanggal">${d(r.tanggal)}</td>`}<td data-label="Barang">${esc(r.jenisBarang||"-")}</td><td data-label="Volume">${numID(r.volume||0)} ${esc(r.satuan||"")}</td><td data-label="Tarif">${rp(r.tarif||0)}</td><td data-label="Nilai">${rp(r.nilai||0)}</td><td data-label="Upload">${esc(r.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`;
}
function movTable(type){
  let list=[];vis().forEach(x=>x[type].forEach(a=>list.push({proc:x,...a})));
  if(!list.length)return`<div class="card empty">Belum ada data.</div>`;
  return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Tanggal</th><th>No PKS</th><th>Termin</th><th>Satuan Kerja</th><th>Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th><th>Upload DP / File Dokumen</th></tr></thead><tbody>${list.map(x=>`<tr><td data-label="Pengadaan"><b>${esc(x.proc.nama)}</b></td><td data-label="Tanggal">${d(x.tanggal)}</td><td data-label="No PKS">${esc(x.noPks)}</td><td data-label="Termin">${esc(x.termin)}</td><td data-label="Satuan Kerja">${esc(x.satuanKerja)}</td><td data-label="Barang">${esc(x.jenisBarang)}</td><td data-label="Tarif">${rp(x.tarif)}</td><td data-label="Volume">${numID(x.volume)}</td><td data-label="Nilai">${rp(x.nilai)}</td><td data-label="Upload">${esc(x.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`;
}
function saveMultiMovement(e,type){
  e.preventDefault();
  const form=e.target,data=fd(form),pr=db.procurements.find(p=>p.id===+data.procId);
  if(!pr)return toast("Pengadaan tidak ditemukan.");
  if(!spmk(pr))return toast("Data hanya dapat diinput setelah SPMK.");
  if(type==="shipments"&&!pr.allocations.length)return toast("Pengiriman membutuhkan alokasi barang terlebih dahulu.");
  if(type==="receipts"&&!pr.shipments.length)return toast("Penerimaan baru dapat diinput setelah pengiriman tersimpan.");
  const rows=readRows(form,".movementRow");
  if(!rows.length)return toast("Minimal isi satu baris data.");
  for(const r of rows){
    if(!r.tanggal||!r.satuanKerja||!r.termin||!r.jenisBarang||!r.satuan||!r.tarif||!r.volume)return toast("Setiap baris wajib memiliki tanggal, satuan kerja, termin, barang, tarif, dan volume.");
    if(!r.dp)return toast("Setiap baris wajib memiliki Upload DP / File Dokumen: pilih file atau ambil foto langsung.");
  }
  rows.forEach(r=>pr[type].push(mov(r.tanggal,r.noPks,r.termin,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,new Date().getFullYear(),r.dp)));
  save();
  toast(`${rows.length} baris ${type==="shipments"?"pengiriman":"penerimaan"} berhasil disimpan ke Upload DP / File Dokumen.`);
  document.getElementById("modalRoot").innerHTML?detail(pr.id):render();
}
render();

/* === PATCH v23: Compact Approval page + horizontal approval flow === */
(function(){
  const DEMO_PASSWORD_V23 = "demo123";
  const PRIV_APPROVED_ALL_V23 = ["Kadivre","Wakadivre","PBJ","Kadep Suike","Kadep SUIKE","Admin"];

  function roleUserSlugV23(user){
    const fixed={"Admin":"admin","PBJ":"pbj","Kadivre":"kadivre","Wakadivre":"wakadivre","Kadep Suike":"kadep_suike","Kadep SUIKE":"kadep_suike","Legal":"legal","Vendor":"vendor","KSS Sarpra KPH":"kss_kph","TPHP":"tphp","PPHP":"pphp","Kasi Sarpra":"kasi_sarpra","Kasi Angja":"kasi_angja","Korektor Pajak":"korektor_pajak","Korektor Angja":"korektor_angja","KSS Angja":"kss_angja","Umum":"umum"};
    if(user.role==="Bidang Terkait") return user.bidang?`bidang_${slugV23(user.bidang)}`:"bidang_terkait";
    return fixed[user.role] || slugV23(user.name||user.email||user.role||"user");
  }
  function slugV23(v){return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"user";}
  function ensureUsernameLoginV23(){
    try{
      const used=new Set();
      (db.users||[]).forEach(u=>{
        let base=slugV23(u.username||roleUserSlugV23(u));
        let name=base,i=2;
        while(used.has(name)){name=`${base}_${i++}`;}
        used.add(name);
        u.username=name;
        u.password=DEMO_PASSWORD_V23;
      });
      const req=[
        {name:"Wakadivre",username:"wakadivre",role:"Wakadivre",bidang:"Direksi"},
        {name:"Kadep SUIKE",username:"kadep_suike",role:"Kadep Suike",bidang:"SUIKE"},
        {name:"TPHP KPH",username:"tphp",role:"TPHP",bidang:"KPH"},
        {name:"PPHP",username:"pphp",role:"PPHP",bidang:"Divre"}
      ];
      req.forEach(r=>{if(!db.users.some(u=>u.username===r.username)){db.users.push({id:db.nextUserId++,email:"",password:DEMO_PASSWORD_V23,active:true,...r});}});
      save();
    }catch(e){console.warn("Migrasi username v23 gagal", e);}
  }
  ensureUsernameLoginV23();

  login = function login(){return `<section class="login"><div class="loginHero"><div class="loginBrand"><img src="${esc(CONFIG.logoUrl)}"><div><b>${esc(CONFIG.appName)}</b><span>${esc(CONFIG.organizationName)}</span></div></div><h1>Monitoring pengadaan barang yang rapi, terkontrol, dan berbasis PIC.</h1><p>Login memakai username internal. Halaman approval dibuat ringkas: klik nama pengadaan untuk melihat alur approval horizontal dan tombol approve sesuai PIC.</p><div class="badges"><span>Username Login</span><span>Approval by PIC</span><span>Compact Approval</span><span>Horizontal Flow</span></div></div><div class="loginPanel"><div class="loginCard"><h2>Masuk Aplikasi</h2><p>Gunakan username demo sesuai role.</p><form id="loginForm"><div class="field"><label>Username</label><input name="username" value="admin" autocomplete="username" required></div><div class="field" style="margin-top:12px"><label>Password</label><input type="password" name="password" value="demo123" autocomplete="current-password" required></div><button class="btn primary" style="width:100%;margin-top:18px">Login</button></form><div class="demo"><b>Username demo:</b><br>Admin: <b>admin</b> / demo123<br>PBJ: <b>pbj</b> / demo123<br>Kadivre: <b>kadivre</b> / demo123<br>Wakadivre: <b>wakadivre</b> / demo123<br>Kadep SUIKE: <b>kadep_suike</b> / demo123<br>Legal: <b>legal</b> / demo123<br>KPH: <b>kss_kph</b> / demo123</div></div></div></section>`};
  bindLogin = function bindLogin(){
    const form=document.getElementById("loginForm");
    if(!form) return;
    form.onsubmit=e=>{
      e.preventDefault();
      const x=fd(e.target), username=String(x.username||"").trim().toLowerCase();
      const u=db.users.find(v=>v.active && String(v.username||"").toLowerCase()===username && v.password===String(x.password||""));
      if(!u) return toast("Username atau password tidak sesuai.");
      session={id:u.id,name:u.name,role:u.role,username:u.username};
      try{__MPB_STORAGE.setItem(SESSION_KEY,JSON.stringify(session));}catch(e){}
      state.page="dashboard";
      render();
    };
  };

  function phaseStartIndexV23(phaseIndex){let n=0;for(let i=0;i<phaseIndex;i++)n+=WORKFLOW[i].items.length;return n;}
  function phaseForStepV23(stepId){return STEPS[Math.min(Math.max(0,stepId||0),STEPS.length-1)]?.phaseIndex || 0;}
  function stepStatusV23(proc,stepId){
    if(stepId < proc.currentStep || (proc.completedSteps||[]).includes(stepId)) return "approved";
    if(stepId === proc.currentStep && proc.currentStep < STEPS.length) return "current";
    return "locked";
  }
  function stepBadgeV23(proc,stepId){
    const s=stepStatusV23(proc,stepId);
    if(s==="approved") return `<span class="badge green">Approved</span>`;
    if(s==="current") return `<span class="badge yellow">Belum Approved</span>`;
    return `<span class="badge gray">Menunggu</span>`;
  }
  function currentGateV23(proc){try{return gate(proc,proc.currentStep);}catch(e){return {ok:false,msg:"Tahapan belum siap."};}}
  function currentActionV23(proc){
    if(proc.currentStep>=STEPS.length) return `<span class="badge green">Selesai</span>`;
    const st=STEPS[proc.currentStep], g=currentGateV23(proc);
    if(!isPic(st)) return `<span class="badge gray">PIC: ${esc(st.pic)}</span>`;
    if(g.ok) return `<button type="button" class="btn primary small" data-approve="${proc.id}">Approve</button>`;
    return `<button type="button" class="btn secondary small" data-approval-detail="${proc.id}">Lengkapi</button>`;
  }
  function approvalCompactListV23(rows){
    if(!rows.length) return `<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`;
    return `<div class="approvalCompactList">${rows.map(proc=>{const st=STEPS[proc.currentStep], ps=status(proc), du=due(proc);return `<div class="approvalCompactRow">
      <button type="button" class="approvalNameClick" data-approval-detail="${proc.id}"><b>${esc(proc.nama)}</b><span>${esc(proc.bidang)} • ${esc(proc.jenisBarang)} • ${numID(proc.totalUsulan)} ${esc(proc.satuan)}</span></button>
      <div class="approvalMeta"><span class="badge ${ps.color}">${esc(ps.text)}</span><span class="badge ${du.color}">${esc(du.text)}</span></div>
      <div class="approvalStepNow"><small>Tahapan aktif</small><b>${st?esc(st.title):"Selesai"}</b><span>PIC: ${st?esc(st.pic):"-"}</span></div>
      <div class="approvalCompactAction">${currentActionV23(proc)}</div>
    </div>`}).join("")}</div>`;
  }

  approval = function approval(){
    const apps=vis().filter(x=>x.currentStep<STEPS.length && isPic(STEPS[x.currentStep]));
    return `<div class="head" style="margin-top:0"><div><h2>Antrian Approval Anda</h2><small>Tampilan dibuat ringkas. Klik nama pengadaan untuk melihat detail approval dan tahapan yang belum approved.</small></div></div>
      <div class="help ok"><b>Alur baru:</b> nama pengadaan menjadi pintu masuk detail. Di dalam detail, alur approval tampil horizontal/berjejer dan setiap fase/tahapan bisa diklik.</div>
      <br>${approvalCompactListV23(apps)}`;
  };

  function phaseRailV23(proc){
    const selected=(state.flowPhaseByProc&&state.flowPhaseByProc[proc.id]!=null)?+state.flowPhaseByProc[proc.id]:phaseForStepV23(proc.currentStep);
    return `<div class="approvalPhaseRail">${WORKFLOW.map((ph,idx)=>{
      const start=phaseStartIndexV23(idx), end=start+ph.items.length-1;
      const done=ph.items.filter((_,i)=>stepStatusV23(proc,start+i)==="approved").length;
      const active=proc.currentStep>=start && proc.currentStep<=end;
      return `<button type="button" class="phaseCard ${selected===idx?"active":""} ${active?"current":""}" data-flow-phase="${idx}" data-proc-id="${proc.id}"><span>Fase ${idx+1}</span><b>${esc(ph.phase)}</b><small>${numID(done)}/${numID(ph.items.length)} approved</small></button>`;
    }).join("")}</div>`;
  }
  function stepRailV23(proc){
    const selectedPhase=(state.flowPhaseByProc&&state.flowPhaseByProc[proc.id]!=null)?+state.flowPhaseByProc[proc.id]:phaseForStepV23(proc.currentStep);
    const start=phaseStartIndexV23(selectedPhase), items=WORKFLOW[selectedPhase]?.items||[];
    const activeStep=(state.flowStepByProc&&state.flowStepByProc[proc.id]!=null)?+state.flowStepByProc[proc.id]:(proc.currentStep>=start&&proc.currentStep<start+items.length?proc.currentStep:start);
    return `<div class="approvalStepRail">${items.map((it,i)=>{const id=start+i, st=stepStatusV23(proc,id);return `<button type="button" class="stepPill ${st} ${activeStep===id?"active":""}" data-flow-step="${id}" data-proc-id="${proc.id}"><span>${id+1}</span><b>${esc(it.title)}</b><small>${esc(it.pic)}</small></button>`}).join("")}</div>${stepDetailV23(proc,activeStep)}`;
  }
  function docsMiniV23(proc, stepId){
    const docs=(typeof docsForStepV7==="function"?docsForStepV7(proc,stepId):(proc.documents||[]).filter(d=>+d.stepId===+stepId));
    if(!docs.length) return `<div class="help warn">Belum ada dokumen/foto pada tahapan ini.</div>`;
    return `<div class="miniDocList">${docs.map(d=>`<div><b>${esc(d.name||"Dokumen")}</b><span>${esc(d.file||d.camera||"-")}</span><small>${esc(d.by||"-")} • ${d.at?new Date(d.at).toLocaleString("id-ID"):"-"}</small></div>`).join("")}</div>`;
  }
  function approvalInfoV23(proc, stepId){
    const ap=(proc.approvals||[]).find(a=>+a.stepId===+stepId);
    if(!ap) return "";
    return `<div class="approvalInfo"><b>Approved oleh ${esc(ap.approvedBy||"-")}</b><span>${esc(ap.approvedRole||ap.pic||"-")} • ${ap.approvedAt?new Date(ap.approvedAt).toLocaleString("id-ID"):"-"}</span></div>`;
  }
  function stepDetailV23(proc, stepId){
    const step=STEPS[stepId];
    if(!step) return `<div class="card empty">Tahapan tidak ditemukan.</div>`;
    const statusStep=stepStatusV23(proc,stepId), isCurrent=statusStep==="current", g=isCurrent?currentGateV23(proc):{ok:false,msg:""};
    const target=step.days==null?"Flexible":`${numID(step.days)} hari`;
    return `<div class="approvalStepDetail ${statusStep}">
      <div class="stepDetailHead"><div><h3>${esc(step.title)}</h3><p>${esc(step.phase)} • PIC: <b>${esc(step.pic)}</b> • Target: <b>${esc(target)}</b></p></div>${stepBadgeV23(proc,stepId)}</div>
      <div class="help"><b>Penjelasan:</b> ${esc(step.detail||"-")}</div>
      ${statusStep==="approved"?approvalInfoV23(proc,stepId):""}
      ${docsMiniV23(proc,stepId)}
      ${isCurrent?`<div class="currentApprovalBox"><div class="help ${g.ok?"ok":"warn"}"><b>Status approval:</b> ${esc(g.msg)}</div>${uploadRequirementPanel(proc,stepId)}<div class="approvalStickyAction">${isPic(step)?`<button type="button" class="btn primary" data-approve="${proc.id}" ${g.ok?"":"disabled"}>Approve Tahapan Ini</button>`:`<span class="badge gray">Menunggu PIC ${esc(step.pic)}</span>`}</div></div>`:""}
    </div>`;
  }
  function horizontalWorkflowV23(proc){
    return `<section class="approvalHorizontalWrap"><div class="head compactHead"><div><h2>Alur Approval Pengadaan</h2><small>Fase dibuat berjejer. Klik fase untuk membuka tahapan, lalu klik tahapan untuk melihat detail.</small></div></div>${phaseRailV23(proc)}${stepRailV23(proc)}</section>`;
  }
  function approvalSummaryV23(proc){
    const curStep=STEPS[proc.currentStep], ps=status(proc), du=due(proc);
    return `<div class="kpiRow approvalKpi"><div class="mini"><span>Status</span><b>${esc(ps.text)}</b></div><div class="mini"><span>Progress</span><b>${prog(proc)}%</b></div><div class="mini"><span>PIC Aktif</span><b style="font-size:18px">${curStep?esc(curStep.pic):"Selesai"}</b></div><div class="mini"><span>Tata Waktu</span><b style="font-size:18px">${esc(du.text)}</b></div></div>`;
  }
  detail = function detail(id){
    const proc=db.procurements.find(p=>p.id===+id);
    if(!proc) return;
    proc.documents=proc.documents||[];
    state.flowPhaseByProc=state.flowPhaseByProc||{};
    state.flowStepByProc=state.flowStepByProc||{};
    if(state.flowPhaseByProc[proc.id]==null) state.flowPhaseByProc[proc.id]=phaseForStepV23(proc.currentStep);
    if(state.flowStepByProc[proc.id]==null) state.flowStepByProc[proc.id]=proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1;
    document.getElementById("modalRoot").innerHTML=`<div class="modalBack"><div class="modal modalWide approvalDetailModal"><div class="modalHead"><div><h2>${esc(proc.nama)}</h2><small>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)} • ${numID(proc.totalUsulan)} ${esc(proc.satuan)}</small></div><div class="tools"><button type="button" class="btn ghost small" id="closeModal">Tutup</button></div></div><div class="modalBody">${approvalSummaryV23(proc)}<div class="split approvalRuleSplit" style="margin-top:16px"><div class="help"><b>Aturan:</b> Approval dilakukan oleh PIC tahapan aktif. Jika belum lengkap, upload dokumen/foto terlebih dahulu.</div><div class="help ${isPic(STEPS[proc.currentStep])?"ok":"warn"}">${proc.currentStep<STEPS.length?`PIC aktif: <b>${esc(STEPS[proc.currentStep].pic)}</b>. Role login: <b>${esc(session.role)}</b>.`:"Pengadaan selesai."}</div></div>${horizontalWorkflowV23(proc)}</div></div></div>`;
    const close=document.getElementById("closeModal"); if(close) close.onclick=()=>document.getElementById("modalRoot").innerHTML="";
    bindApprovalForms();
  };

  function bindApprovalFlowV23(){
    document.querySelectorAll("[data-flow-phase]").forEach(b=>b.onclick=()=>{
      const pid=+b.dataset.procId, phase=+b.dataset.flowPhase;
      state.flowPhaseByProc=state.flowPhaseByProc||{}; state.flowStepByProc=state.flowStepByProc||{};
      state.flowPhaseByProc[pid]=phase; state.flowStepByProc[pid]=phaseStartIndexV23(phase);
      detail(pid);
    });
    document.querySelectorAll("[data-flow-step]").forEach(b=>b.onclick=()=>{
      const pid=+b.dataset.procId, step=+b.dataset.flowStep;
      state.flowStepByProc=state.flowStepByProc||{}; state.flowPhaseByProc=state.flowPhaseByProc||{};
      state.flowStepByProc[pid]=step; state.flowPhaseByProc[pid]=phaseForStepV23(step);
      detail(pid);
    });
    document.querySelectorAll("[data-approval-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.approvalDetail));
  }
  const oldBindPageV23=bindPage;
  bindPage=function bindPage(){
    oldBindPageV23();
    bindApprovalFlowV23();
    document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));
  };
  const oldBindApprovalFormsV23=bindApprovalForms;
  bindApprovalForms=function bindApprovalForms(){
    try{oldBindApprovalFormsV23();}catch(e){}
    bindApprovalFlowV23();
    document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));
    const doc=document.getElementById("docForm"); if(doc) doc.onsubmit=saveDocumentForm;
    try{bindContractForm();bindMultiForms();bindFormattedInputs();}catch(e){}
  };
  const oldApproveV23=approve;
  approve=function approve(id){
    const proc=db.procurements.find(p=>p.id===+id);
    oldApproveV23(+id);
    if(proc){
      state.flowPhaseByProc=state.flowPhaseByProc||{}; state.flowStepByProc=state.flowStepByProc||{};
      state.flowPhaseByProc[proc.id]=phaseForStepV23(proc.currentStep);
      state.flowStepByProc[proc.id]=proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1;
    }
  };
  render();
})();

/* PATCH v23.1: keep approval detail focused on the next unapproved step after approve */
(function(){
  const prevApproveV231 = approve;
  approve = function approve(id){
    const proc=db.procurements.find(p=>p.id===+id);
    const before=proc?proc.currentStep:null;
    prevApproveV231(+id);
    if(proc && proc.currentStep!==before){
      state.flowPhaseByProc=state.flowPhaseByProc||{};
      state.flowStepByProc=state.flowStepByProc||{};
      state.flowPhaseByProc[proc.id]=proc.currentStep<STEPS.length?STEPS[proc.currentStep].phaseIndex:STEPS[STEPS.length-1].phaseIndex;
      state.flowStepByProc[proc.id]=proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1;
      if(document.getElementById("modalRoot")?.innerHTML) detail(proc.id); else render();
    }
  };
  render();
})();

/* === PATCH v24: Vertical approval flow / timeline approval === */
(function(){
  const DEMO_PASSWORD_V24 = "demo123";

  login = function login(){return `<section class="login"><div class="loginHero"><div class="loginBrand"><img src="${esc(CONFIG.logoUrl)}"><div><b>${esc(CONFIG.appName)}</b><span>${esc(CONFIG.organizationName)}</span></div></div><h1>Monitoring pengadaan barang yang rapi, terkontrol, dan berbasis PIC.</h1><p>Login memakai username internal. Halaman approval dibuat ringkas: klik nama pengadaan untuk melihat alur approval vertikal dan approve sesuai PIC.</p><div class="badges"><span>Username Login</span><span>Approval by PIC</span><span>Compact Approval</span><span>Vertical Flow</span></div></div><div class="loginPanel"><div class="loginCard"><h2>Masuk Aplikasi</h2><p>Gunakan username demo sesuai role.</p><form id="loginForm"><div class="field"><label>Username</label><input name="username" value="admin" autocomplete="username" required></div><div class="field" style="margin-top:12px"><label>Password</label><input type="password" name="password" value="${DEMO_PASSWORD_V24}" autocomplete="current-password" required></div><button class="btn primary" style="width:100%;margin-top:18px">Login</button></form><div class="demo"><b>Username demo:</b><br>Admin: <b>admin</b> / demo123<br>PBJ: <b>pbj</b> / demo123<br>Kadivre: <b>kadivre</b> / demo123<br>Wakadivre: <b>wakadivre</b> / demo123<br>Kadep SUIKE: <b>kadep_suike</b> / demo123<br>Legal: <b>legal</b> / demo123<br>KPH: <b>kss_kph</b> / demo123</div></div></div></section>`};

  bindLogin = function bindLogin(){
    const form=document.getElementById("loginForm");
    if(!form) return;
    form.onsubmit=e=>{
      e.preventDefault();
      const x=fd(e.target), username=String(x.username||"").trim().toLowerCase();
      const u=db.users.find(v=>v.active && String(v.username||"").toLowerCase()===username && v.password===String(x.password||""));
      if(!u) return toast("Username atau password tidak sesuai.");
      session={id:u.id,name:u.name,role:u.role,username:u.username};
      try{__MPB_STORAGE.setItem(SESSION_KEY,JSON.stringify(session));}catch(e){}
      state.page="dashboard";
      render();
    };
  };

  function phaseStartIndexV24(phaseIndex){let n=0;for(let i=0;i<phaseIndex;i++)n+=WORKFLOW[i].items.length;return n;}
  function phaseForStepV24(stepId){return STEPS[Math.min(Math.max(0,stepId||0),STEPS.length-1)]?.phaseIndex || 0;}
  function selectedPhaseV24(proc){return (state.flowPhaseByProc&&state.flowPhaseByProc[proc.id]!=null)?+state.flowPhaseByProc[proc.id]:phaseForStepV24(proc.currentStep);}
  function selectedStepV24(proc){return (state.flowStepByProc&&state.flowStepByProc[proc.id]!=null)?+state.flowStepByProc[proc.id]:(proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1);}
  function stepStatusV24(proc,stepId){
    if(stepId < proc.currentStep || (proc.completedSteps||[]).includes(stepId)) return "approved";
    if(stepId === proc.currentStep && proc.currentStep < STEPS.length) return "current";
    return "locked";
  }
  function stepBadgeV24(proc,stepId){
    const s=stepStatusV24(proc,stepId);
    if(s==="approved") return `<span class="badge green">Approved</span>`;
    if(s==="current") return `<span class="badge yellow">Belum Approved</span>`;
    return `<span class="badge gray">Menunggu</span>`;
  }
  function currentGateV24(proc){try{return gate(proc,proc.currentStep);}catch(e){return {ok:false,msg:"Tahapan belum siap."};}}
  function currentActionV24(proc){
    if(proc.currentStep>=STEPS.length) return `<span class="badge green">Selesai</span>`;
    const st=STEPS[proc.currentStep], g=currentGateV24(proc);
    if(!isPic(st)) return `<span class="badge gray">PIC: ${esc(st.pic)}</span>`;
    if(g.ok) return `<button type="button" class="btn primary small" data-approve="${proc.id}">Approve</button>`;
    return `<button type="button" class="btn secondary small" data-approval-detail="${proc.id}">Lengkapi</button>`;
  }
  function approvalCompactListV24(rows){
    if(!rows.length) return `<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`;
    return `<div class="approvalCompactList">${rows.map(proc=>{const st=STEPS[proc.currentStep], ps=status(proc), du=due(proc);return `<div class="approvalCompactRow">
      <button type="button" class="approvalNameClick" data-approval-detail="${proc.id}"><b>${esc(proc.nama)}</b><span>${esc(proc.bidang)} • ${esc(proc.jenisBarang)} • ${numID(proc.totalUsulan)} ${esc(proc.satuan)}</span></button>
      <div class="approvalMeta"><span class="badge ${ps.color}">${esc(ps.text)}</span><span class="badge ${du.color}">${esc(du.text)}</span></div>
      <div class="approvalStepNow"><small>Tahapan aktif</small><b>${st?esc(st.title):"Selesai"}</b><span>PIC: ${st?esc(st.pic):"-"}</span></div>
      <div class="approvalCompactAction">${currentActionV24(proc)}</div>
    </div>`}).join("")}</div>`;
  }
  approval = function approval(){
    const apps=vis().filter(x=>x.currentStep<STEPS.length && isPic(STEPS[x.currentStep]));
    return `<div class="head" style="margin-top:0"><div><h2>Antrian Approval Anda</h2><small>Daftar dibuat ringkas. Klik nama pengadaan untuk membuka detail approval.</small></div></div>
      <div class="help ok"><b>Alur vertikal:</b> detail approval menampilkan fase dan tahapan dari atas ke bawah. Klik fase untuk membuka tahapan, lalu klik tahapan untuk melihat detail dan tombol approve.</div>
      <br>${approvalCompactListV24(apps)}`;
  };

  function docsMiniV24(proc, stepId){
    const docs=(typeof docsForStepV7==="function"?docsForStepV7(proc,stepId):(proc.documents||[]).filter(d=>+d.stepId===+stepId));
    if(!docs.length) return `<div class="help warn">Belum ada dokumen/foto pada tahapan ini.</div>`;
    return `<div class="miniDocList">${docs.map(d=>`<div><b>${esc(d.name||"Dokumen")}</b><span>${esc(d.file||d.camera||"-")}</span><small>${esc(d.by||"-")} • ${d.at?new Date(d.at).toLocaleString("id-ID"):"-"}</small></div>`).join("")}</div>`;
  }
  function approvalInfoV24(proc, stepId){
    const ap=(proc.approvals||[]).find(a=>+a.stepId===+stepId);
    if(!ap) return "";
    return `<div class="approvalInfo"><b>Approved oleh ${esc(ap.approvedBy||"-")}</b><span>${esc(ap.approvedRole||ap.pic||"-")} • ${ap.approvedAt?new Date(ap.approvedAt).toLocaleString("id-ID"):"-"}</span></div>`;
  }
  function stepDetailV24(proc, stepId){
    const step=STEPS[stepId];
    if(!step) return `<div class="card empty">Tahapan tidak ditemukan.</div>`;
    const statusStep=stepStatusV24(proc,stepId), isCurrent=statusStep==="current", g=isCurrent?currentGateV24(proc):{ok:false,msg:""};
    const target=step.days==null?"Flexible":`${numID(step.days)} hari`;
    return `<div class="approvalStepDetail vertical ${statusStep}">
      <div class="stepDetailHead"><div><h3>${esc(step.title)}</h3><p>${esc(step.phase)} • PIC: <b>${esc(step.pic)}</b> • Target: <b>${esc(target)}</b></p></div>${stepBadgeV24(proc,stepId)}</div>
      <div class="help"><b>Penjelasan:</b> ${esc(step.detail||"-")}</div>
      ${statusStep==="approved"?approvalInfoV24(proc,stepId):""}
      ${docsMiniV24(proc,stepId)}
      ${isCurrent?`<div class="currentApprovalBox"><div class="help ${g.ok?"ok":"warn"}"><b>Status approval:</b> ${esc(g.msg)}</div>${uploadRequirementPanel(proc,stepId)}<div class="approvalStickyAction">${isPic(step)?`<button type="button" class="btn primary" data-approve="${proc.id}" ${g.ok?"":"disabled"}>Approve Tahapan Ini</button>`:`<span class="badge gray">Menunggu PIC ${esc(step.pic)}</span>`}</div></div>`:""}
    </div>`;
  }
  function phaseHeaderV24(proc, ph, idx, selected){
    const start=phaseStartIndexV24(idx), end=start+ph.items.length-1;
    const done=ph.items.filter((_,i)=>stepStatusV24(proc,start+i)==="approved").length;
    const active=proc.currentStep>=start && proc.currentStep<=end;
    const phaseStatus=done===ph.items.length?"approved":active?"current":"locked";
    return `<button type="button" class="verticalPhaseHeader ${selected===idx?"active":""} ${phaseStatus}" data-flow-phase="${idx}" data-proc-id="${proc.id}">
      <span class="phaseIndex">${idx+1}</span>
      <span class="phaseText"><b>${esc(ph.phase)}</b><small>${numID(done)}/${numID(ph.items.length)} tahapan approved ${active?"• fase aktif":""}</small></span>
      <span class="phaseChevron">${selected===idx?"−":"+"}</span>
    </button>`;
  }
  function verticalStepItemV24(proc, it, stepId){
    const st=stepStatusV24(proc,stepId), active=selectedStepV24(proc)===stepId;
    const target=it.days==null?"Flexible":`${numID(it.days)} hari`;
    return `<div class="verticalStepItem ${st} ${active?"active":""}">
      <button type="button" class="verticalStepBtn" data-flow-step="${stepId}" data-proc-id="${proc.id}">
        <span class="stepDot">${stepId+1}</span>
        <span class="stepText"><b>${esc(it.title)}</b><small>PIC: ${esc(it.pic)} • Target: ${esc(target)}</small></span>
        ${stepBadgeV24(proc,stepId)}
      </button>
      ${active?`<div class="verticalStepDetailSlot">${stepDetailV24(proc,stepId)}</div>`:""}
    </div>`;
  }
  function verticalWorkflowV24(proc){
    const selected=selectedPhaseV24(proc);
    return `<section class="approvalVerticalWrap"><div class="head compactHead"><div><h2>Alur Approval Pengadaan</h2><small>Alur dibuat vertikal. Klik fase untuk membuka tahapan, lalu klik tahapan untuk melihat detail dan approve.</small></div></div>
      <div class="approvalVerticalTimeline">${WORKFLOW.map((ph,idx)=>{
        const open=selected===idx;
        const start=phaseStartIndexV24(idx);
        return `<div class="verticalPhase ${open?"open":"collapsed"}">${phaseHeaderV24(proc,ph,idx,selected)}${open?`<div class="verticalSteps">${ph.items.map((it,i)=>verticalStepItemV24(proc,it,start+i)).join("")}</div>`:""}</div>`;
      }).join("")}</div></section>`;
  }
  function approvalSummaryV24(proc){
    const curStep=STEPS[proc.currentStep], ps=status(proc), du=due(proc);
    return `<div class="kpiRow approvalKpi"><div class="mini"><span>Status</span><b>${esc(ps.text)}</b></div><div class="mini"><span>Progress</span><b>${prog(proc)}%</b></div><div class="mini"><span>PIC Aktif</span><b style="font-size:18px">${curStep?esc(curStep.pic):"Selesai"}</b></div><div class="mini"><span>Tata Waktu</span><b style="font-size:18px">${esc(du.text)}</b></div></div>`;
  }
  detail = function detail(id){
    const proc=db.procurements.find(p=>p.id===+id);
    if(!proc) return;
    proc.documents=proc.documents||[];
    state.flowPhaseByProc=state.flowPhaseByProc||{};
    state.flowStepByProc=state.flowStepByProc||{};
    if(state.flowPhaseByProc[proc.id]==null) state.flowPhaseByProc[proc.id]=phaseForStepV24(proc.currentStep);
    if(state.flowStepByProc[proc.id]==null) state.flowStepByProc[proc.id]=proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1;
    document.getElementById("modalRoot").innerHTML=`<div class="modalBack"><div class="modal modalWide approvalDetailModal verticalApprovalModal"><div class="modalHead"><div><h2>${esc(proc.nama)}</h2><small>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)} • ${numID(proc.totalUsulan)} ${esc(proc.satuan)}</small></div><div class="tools"><button type="button" class="btn ghost small" id="closeModal">Tutup</button></div></div><div class="modalBody">${approvalSummaryV24(proc)}<div class="split approvalRuleSplit" style="margin-top:16px"><div class="help"><b>Aturan:</b> Approval dilakukan oleh PIC tahapan aktif. Jika belum lengkap, upload dokumen/foto terlebih dahulu.</div><div class="help ${proc.currentStep<STEPS.length&&isPic(STEPS[proc.currentStep])?"ok":"warn"}">${proc.currentStep<STEPS.length?`PIC aktif: <b>${esc(STEPS[proc.currentStep].pic)}</b>. Role login: <b>${esc(session.role)}</b>.`:"Pengadaan selesai."}</div></div>${verticalWorkflowV24(proc)}</div></div></div>`;
    const close=document.getElementById("closeModal"); if(close) close.onclick=()=>document.getElementById("modalRoot").innerHTML="";
    bindApprovalForms();
  };

  function bindApprovalFlowV24(){
    document.querySelectorAll("[data-flow-phase]").forEach(b=>b.onclick=()=>{
      const pid=+b.dataset.procId, phase=+b.dataset.flowPhase;
      state.flowPhaseByProc=state.flowPhaseByProc||{}; state.flowStepByProc=state.flowStepByProc||{};
      state.flowPhaseByProc[pid]=phase;
      const proc=db.procurements.find(p=>p.id===pid);
      const start=phaseStartIndexV24(phase), end=start+(WORKFLOW[phase]?.items.length||1)-1;
      const candidate=proc&&proc.currentStep>=start&&proc.currentStep<=end?proc.currentStep:start;
      state.flowStepByProc[pid]=candidate;
      detail(pid);
    });
    document.querySelectorAll("[data-flow-step]").forEach(b=>b.onclick=()=>{
      const pid=+b.dataset.procId, step=+b.dataset.flowStep;
      state.flowStepByProc=state.flowStepByProc||{}; state.flowPhaseByProc=state.flowPhaseByProc||{};
      state.flowStepByProc[pid]=step; state.flowPhaseByProc[pid]=phaseForStepV24(step);
      detail(pid);
    });
    document.querySelectorAll("[data-approval-detail]").forEach(b=>b.onclick=()=>detail(+b.dataset.approvalDetail));
  }
  const oldBindPageV24=bindPage;
  bindPage=function bindPage(){
    try{oldBindPageV24();}catch(e){}
    bindApprovalFlowV24();
    document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));
  };
  const oldBindApprovalFormsV24=bindApprovalForms;
  bindApprovalForms=function bindApprovalForms(){
    try{oldBindApprovalFormsV24();}catch(e){}
    bindApprovalFlowV24();
    document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>approve(+b.dataset.approve));
    const doc=document.getElementById("docForm"); if(doc) doc.onsubmit=saveDocumentForm;
    try{bindContractForm();bindMultiForms();bindFormattedInputs();}catch(e){}
  };
  const prevApproveV24 = approve;
  approve = function approve(id){
    const proc=db.procurements.find(p=>p.id===+id);
    const before=proc?proc.currentStep:null;
    prevApproveV24(+id);
    if(proc && proc.currentStep!==before){
      state.flowPhaseByProc=state.flowPhaseByProc||{};
      state.flowStepByProc=state.flowStepByProc||{};
      state.flowPhaseByProc[proc.id]=proc.currentStep<STEPS.length?phaseForStepV24(proc.currentStep):phaseForStepV24(STEPS.length-1);
      state.flowStepByProc[proc.id]=proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1;
      if(document.getElementById("modalRoot")?.innerHTML) detail(proc.id); else render();
    }
  };
  try{render();}catch(e){console.error("Patch v24 vertical approval gagal", e);}
})();

/* === PATCH v25: fix minimize/collapse on vertical approval flow === */
(function(){
  function phaseForStepFixV25(stepId){
    const safe=Math.min(Math.max(0,+stepId||0),STEPS.length-1);
    return STEPS[safe]?.phaseIndex || 0;
  }
  function getProcFromFlowV25(){
    const node=document.querySelector('[data-flow-phase][data-proc-id], [data-flow-step][data-proc-id]');
    if(!node) return null;
    return db.procurements.find(p=>p.id===+node.dataset.procId) || null;
  }
  function ensureFlowToolsV25(){
    const proc=getProcFromFlowV25();
    const head=document.querySelector('.approvalVerticalWrap .compactHead');
    if(!proc || !head) return;
    let tools=head.querySelector('.flowToolsV25');
    if(!tools){
      tools=document.createElement('div');
      tools.className='tools flowToolsV25';
      tools.innerHTML=`<button type="button" class="btn ghost small" data-flow-collapse-all="${proc.id}">Minimize Semua</button><button type="button" class="btn ghost small" data-flow-open-active="${proc.id}">Buka Fase Aktif</button>`;
      head.appendChild(tools);
    }else{
      tools.querySelectorAll('[data-flow-collapse-all],[data-flow-open-active]').forEach(b=>{
        b.dataset.flowCollapseAll=proc.id;
        b.dataset.flowOpenActive=proc.id;
      });
    }
  }
  function bindApprovalFlowMinimizeV25(){
    ensureFlowToolsV25();

    document.querySelectorAll('[data-flow-phase]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.procId;
        const phase=+btn.dataset.flowPhase;
        const proc=db.procurements.find(p=>p.id===pid);
        if(!proc) return;

        state.flowPhaseByProc=state.flowPhaseByProc||{};
        state.flowStepByProc=state.flowStepByProc||{};

        const current=+state.flowPhaseByProc[pid];
        const isOpen=current===phase;

        if(isOpen){
          // Perbaikan utama: klik fase yang sedang terbuka sekarang benar-benar menutup/minimize fase tersebut.
          state.flowPhaseByProc[pid] = -1;
        }else{
          state.flowPhaseByProc[pid] = phase;
          const start=WORKFLOW.slice(0,phase).reduce((sum,item)=>sum+item.items.length,0);
          const end=start+(WORKFLOW[phase]?.items.length||1)-1;
          const candidate=proc.currentStep>=start && proc.currentStep<=end ? proc.currentStep : start;
          state.flowStepByProc[pid]=candidate;
        }
        detail(pid);
      };
    });

    document.querySelectorAll('[data-flow-step]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.procId;
        const step=+btn.dataset.flowStep;
        state.flowStepByProc=state.flowStepByProc||{};
        state.flowPhaseByProc=state.flowPhaseByProc||{};
        state.flowStepByProc[pid]=step;
        state.flowPhaseByProc[pid]=phaseForStepFixV25(step);
        detail(pid);
      };
    });

    document.querySelectorAll('[data-flow-collapse-all]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.flowCollapseAll;
        state.flowPhaseByProc=state.flowPhaseByProc||{};
        state.flowPhaseByProc[pid]=-1;
        detail(pid);
      };
    });

    document.querySelectorAll('[data-flow-open-active]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.flowOpenActive;
        const proc=db.procurements.find(p=>p.id===pid);
        if(!proc) return;
        state.flowPhaseByProc=state.flowPhaseByProc||{};
        state.flowStepByProc=state.flowStepByProc||{};
        const activeStep=proc.currentStep<STEPS.length?proc.currentStep:STEPS.length-1;
        state.flowPhaseByProc[pid]=phaseForStepFixV25(activeStep);
        state.flowStepByProc[pid]=activeStep;
        detail(pid);
      };
    });

    document.querySelectorAll('[data-approval-detail]').forEach(btn=>{
      btn.onclick=()=>detail(+btn.dataset.approvalDetail);
    });

    document.querySelectorAll('[data-approve]').forEach(btn=>{
      btn.onclick=()=>approve(+btn.dataset.approve);
    });
  }

  const prevBindPageV25=bindPage;
  bindPage=function bindPage(){
    try{prevBindPageV25();}catch(e){console.warn(e)}
    bindApprovalFlowMinimizeV25();
  };

  const prevBindApprovalFormsV25=bindApprovalForms;
  bindApprovalForms=function bindApprovalForms(){
    try{prevBindApprovalFormsV25();}catch(e){console.warn(e)}
    bindApprovalFlowMinimizeV25();
    const doc=document.getElementById('docForm');
    if(doc) doc.onsubmit=saveDocumentForm;
  };

  const prevDetailV25=detail;
  detail=function detail(id){
    prevDetailV25(id);
    bindApprovalFlowMinimizeV25();
  };

  try{window.bindPage=bindPage;window.bindApprovalForms=bindApprovalForms;window.detail=detail;render();}catch(e){console.error('Patch v25 minimize approval gagal', e);}
})();

/* === PATCH v26: robust collapse/minimize approval flow + mobile sidebar menu === */
(function(){
  function isMobileV26(){
    return window.matchMedia && window.matchMedia('(max-width: 860px)').matches;
  }
  function phaseForStepV26(stepId){
    const safe=Math.min(Math.max(0,+stepId||0),STEPS.length-1);
    return STEPS[safe]?.phaseIndex || 0;
  }
  function phaseStartIndexV26(phaseIndex){
    let n=0;
    for(let i=0;i<phaseIndex;i++) n += (WORKFLOW[i]?.items?.length || 0);
    return n;
  }
  function currentProcInApprovalModalV26(){
    const modal=document.querySelector('.approvalDetailModal');
    const node=modal?.querySelector('[data-flow-phase][data-proc-id], [data-flow-step][data-proc-id]');
    if(!node) return null;
    return db.procurements.find(p=>p.id===+node.dataset.procId) || null;
  }
  function ensureFlowToolsV26(){
    const proc=currentProcInApprovalModalV26();
    const head=document.querySelector('.approvalVerticalWrap .compactHead');
    if(!proc || !head) return;

    // Remove older v25 buttons because they could inherit both data attributes after re-render.
    head.querySelectorAll('.flowToolsV25').forEach(n=>n.remove());

    let tools=head.querySelector('.flowToolsV26');
    if(!tools){
      tools=document.createElement('div');
      tools.className='tools flowToolsV26';
      head.appendChild(tools);
    }
    tools.innerHTML = `
      <button type="button" class="btn ghost small" data-flow-action="collapse-all" data-proc-id="${proc.id}">Minimize Semua</button>
      <button type="button" class="btn ghost small" data-flow-action="open-active" data-proc-id="${proc.id}">Buka Fase Aktif</button>
    `;
  }
  function openPhaseV26(proc, phase){
    state.flowPhaseByProc=state.flowPhaseByProc||{};
    state.flowStepByProc=state.flowStepByProc||{};
    state.flowPhaseByProc[proc.id]=phase;
    const start=phaseStartIndexV26(phase);
    const end=start+(WORKFLOW[phase]?.items?.length || 1)-1;
    const selected=+state.flowStepByProc[proc.id];
    const candidate=selected>=start && selected<=end ? selected : (proc.currentStep>=start && proc.currentStep<=end ? proc.currentStep : start);
    state.flowStepByProc[proc.id]=candidate;
  }
  function collapseAllV26(pid){
    state.flowPhaseByProc=state.flowPhaseByProc||{};
    state.flowPhaseByProc[pid] = -1;
  }
  function bindApprovalFlowMinimizeV26(){
    ensureFlowToolsV26();

    document.querySelectorAll('.approvalDetailModal [data-flow-phase]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.procId;
        const phase=+btn.dataset.flowPhase;
        const proc=db.procurements.find(p=>p.id===pid);
        if(!proc) return;
        state.flowPhaseByProc=state.flowPhaseByProc||{};
        const current=+state.flowPhaseByProc[pid];
        if(current===phase){
          collapseAllV26(pid);
        }else{
          openPhaseV26(proc, phase);
        }
        detail(pid);
      };
    });

    document.querySelectorAll('.approvalDetailModal [data-flow-step]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.procId;
        const step=+btn.dataset.flowStep;
        state.flowStepByProc=state.flowStepByProc||{};
        state.flowPhaseByProc=state.flowPhaseByProc||{};
        state.flowStepByProc[pid]=step;
        state.flowPhaseByProc[pid]=phaseForStepV26(step);
        detail(pid);
      };
    });

    document.querySelectorAll('.approvalDetailModal [data-flow-action]').forEach(btn=>{
      btn.onclick=()=>{
        const pid=+btn.dataset.procId;
        const proc=db.procurements.find(p=>p.id===pid);
        if(!proc) return;
        const action=btn.dataset.flowAction;
        if(action==='collapse-all'){
          collapseAllV26(pid);
        }
        if(action==='open-active'){
          const activeStep=proc.currentStep<STEPS.length ? proc.currentStep : STEPS.length-1;
          state.flowStepByProc=state.flowStepByProc||{};
          state.flowPhaseByProc=state.flowPhaseByProc||{};
          state.flowStepByProc[pid]=activeStep;
          state.flowPhaseByProc[pid]=phaseForStepV26(activeStep);
        }
        detail(pid);
      };
    });

    document.querySelectorAll('[data-approval-detail]').forEach(btn=>{
      btn.onclick=()=>detail(+btn.dataset.approvalDetail);
    });
    document.querySelectorAll('.approvalDetailModal [data-approve]').forEach(btn=>{
      btn.onclick=()=>approve(+btn.dataset.approve);
    });
  }

  // Replace shell with responsive desktop-collapse + mobile off-canvas sidebar.
  shell=function shell(){
    const u=cur();
    state.sidebarCollapsed=!!state.sidebarCollapsed;
    state.mobileSidebarOpen=!!state.mobileSidebarOpen;
    const groups=[
      ['Utama',[nav('dashboard','Dashboard','Dashboard','⌂'),nav('procurements','Data Pengadaan','Data Pengadaan','▦'),nav('input','Input Pengadaan','Input Pengadaan','＋'),nav('approval','Approval','Approval','✓')]],
      ['Operasional',[nav('masa','Masa Pelaksanaan','Masa Pelaksanaan','◷'),nav('allocation','Alokasi KPH','Alokasi KPH','↦'),nav('shipping','Pengiriman','Pengiriman Barang','⇢'),nav('receiving','Penerimaan','Penerimaan Barang','⇠')]],
      ['Monitoring',[nav('monitoring','Monitoring Barang','Monitoring Barang','◉')]],
      ['Admin',[nav('roles','Role & Permission','Role & Permission','⚙'),nav('users','User Management','User Management','☷'),nav('branding','Branding','Branding','✦')]]
    ];
    return `<div class="shell ${state.sidebarCollapsed?'sidebarCollapsed':''} ${state.mobileSidebarOpen?'mobileSidebarOpen':''}">
      <button type="button" class="sidebarBackdrop" data-sidebar-close aria-label="Tutup menu"></button>
      <aside class="sidebar">
        <div class="brand"><img src="${esc(CONFIG.logoUrl)}"><div><b>${esc(CONFIG.shortName)}</b><span>${esc(CONFIG.appName)}</span></div><button type="button" class="btn ghost small sidebarHide" data-sidebar-toggle title="Minimize menu">${state.sidebarCollapsed?'›':'‹'}</button></div>
        ${groups.map(([t,items])=>{let v=items.filter(i=>can(i.module));return v.length?`<div><div class="navTitle">${t}</div>${v.map(i=>`<button class="navBtn ${state.page===i.page?'active':''}" data-nav="${i.page}" title="${esc(i.label)}"><span class="ico">${i.ico}</span><span class="navText">${i.label}</span></button>`).join('')}</div>`:''}).join('')}
        <div class="sideUser"><b>${esc(u.name)}</b><span>${esc(u.role)} • ${esc(u.bidang)}</span></div>
      </aside>
      <main class="main">
        <div class="topbar"><button type="button" class="btn ghost small menuToggle" data-sidebar-toggle>☰ Menu</button><div class="topbarTitle"><div class="kicker">${esc(CONFIG.organizationName)} Procurement System</div><h1>${title()}</h1></div><div class="userChip"><div class="avatar">${esc(u.name[0])}</div><div><b>${esc(u.name)}</b><span>${esc(u.role)}</span></div><button id="logout" class="btn ghost small">Logout</button></div></div>
        <div id="content"></div><div id="modalRoot"></div>
      </main>
    </div>`;
  };

  bindShell=function bindShell(){
    document.querySelectorAll('[data-nav]').forEach(btn=>{
      btn.onclick=()=>{
        state.page=btn.dataset.nav;
        state.mobileSidebarOpen=false;
        render();
      };
    });
    document.querySelectorAll('[data-sidebar-toggle]').forEach(btn=>{
      btn.onclick=()=>{
        if(isMobileV26()){
          state.mobileSidebarOpen=!state.mobileSidebarOpen;
        }else{
          state.sidebarCollapsed=!state.sidebarCollapsed;
        }
        render();
      };
    });
    document.querySelectorAll('[data-sidebar-close]').forEach(btn=>{
      btn.onclick=()=>{state.mobileSidebarOpen=false;render();};
    });
    const logout=document.getElementById('logout');
    if(logout){
      logout.onclick=()=>{__MPB_STORAGE.removeItem(SESSION_KEY);session=null;state.mobileSidebarOpen=false;render();};
    }
  };

  const prevBindPageV26=bindPage;
  bindPage=function bindPage(){
    try{prevBindPageV26();}catch(e){console.warn(e);}
    bindApprovalFlowMinimizeV26();
  };

  const prevBindApprovalFormsV26=bindApprovalForms;
  bindApprovalForms=function bindApprovalForms(){
    try{prevBindApprovalFormsV26();}catch(e){console.warn(e);}
    bindApprovalFlowMinimizeV26();
    const doc=document.getElementById('docForm');
    if(doc) doc.onsubmit=saveDocumentForm;
  };

  const prevDetailV26=detail;
  detail=function detail(id){
    prevDetailV26(id);
    bindApprovalFlowMinimizeV26();
  };

  try{
    window.shell=shell; window.bindShell=bindShell; window.bindPage=bindPage; window.bindApprovalForms=bindApprovalForms; window.detail=detail;
    render();
  }catch(e){console.error('Patch v26 minimize/menu mobile gagal', e);}
})();

/* === PATCH v27: simplified input, compact approval, operational data flow, working-day SLA === */
(function(){
  const DEFAULT_HOLIDAYS_V27 = [
    "2026-01-01","2026-02-16","2026-02-17","2026-03-19","2026-03-20","2026-03-21",
    "2026-05-01","2026-05-14","2026-05-27","2026-06-01","2026-06-17","2026-08-17","2026-12-25"
  ];
  db.holidays = Array.isArray(db.holidays) && db.holidays.length ? db.holidays : DEFAULT_HOLIDAYS_V27;
  (db.procurements||[]).forEach(proc=>{
    proc.documents = proc.documents || [];
    proc.allocations = proc.allocations || [];
    proc.shipments = proc.shipments || [];
    proc.receipts = proc.receipts || [];
    proc.contract = proc.contract || {noPks:"",tanggalPks:"",tanggalMulai:"",tanggalAkhir:""};
    if(proc.contract.tanggalPerjanjian) delete proc.contract.tanggalPerjanjian;
    if(proc.totalUsulan==null) proc.totalUsulan=0;
    if(!proc.satuan) proc.satuan="";
    if(!proc.jenisBarang) proc.jenisBarang="";
  });
  try{save();}catch(e){}

  function safeISO(v){
    if(!v) return "";
    if(/^\d{4}-\d{2}-\d{2}/.test(String(v))) return String(v).slice(0,10);
    if(typeof idToISO==="function") return idToISO(v);
    return "";
  }
  function dateObjV27(v){return new Date(`${safeISO(v)}T00:00:00`)}
  function nextISOV27(v,delta=1){const d=dateObjV27(v);d.setDate(d.getDate()+delta);return d.toISOString().slice(0,10)}
  function isHolidayV27(v){return (db.holidays||DEFAULT_HOLIDAYS_V27).includes(safeISO(v));}
  function isWorkDayV27(v){const d=dateObjV27(v),day=d.getDay();return day!==0&&day!==6&&!isHolidayV27(v);}
  function calendarDiffV27(a,b){return Math.floor((dateObjV27(b)-dateObjV27(a))/864e5);}
  function workDaysInclusiveV27(start,end){
    start=safeISO(start); end=safeISO(end); if(!start||!end) return 0;
    if(calendarDiffV27(start,end)<0) return -1;
    let n=0, cur=start;
    while(calendarDiffV27(cur,end)<=0){if(isWorkDayV27(cur)) n++; cur=nextISOV27(cur,1);}
    return n;
  }
  function workDaysElapsedV27(start,end){
    start=safeISO(start); end=safeISO(end); if(!start||!end) return 0;
    if(calendarDiffV27(start,end)<0) return -1;
    let n=0, cur=nextISOV27(start,1);
    while(calendarDiffV27(cur,end)<=0){if(isWorkDayV27(cur)) n++; cur=nextISOV27(cur,1);}
    return n;
  }
  function totalUsulanV27(proc){
    const stored=Number(proc.totalUsulan||0);
    if(stored>0) return stored;
    return (proc.allocations||[]).reduce((a,b)=>a+(Number(b.volume)||0),0);
  }
  function namaBarangListV27(proc){
    const names=[...(proc.allocations||[]).map(a=>a.jenisBarang||a.namaBarang), proc.jenisBarang].filter(Boolean);
    return [...new Set(names)].join(", ") || "-";
  }
  function ensureContractNoPksV27(proc){return proc?.contract?.noPks || "";}
  function noPksReadonlyHelpV27(proc){return ensureContractNoPksV27(proc)?"Otomatis dari Masa Pelaksanaan":"Isi No PKS terlebih dahulu di Masa Pelaksanaan";}
  function hasModalOpenV27(){return !!document.querySelector(".modalBack");}

  // Tata waktu dihitung berdasarkan hari efektif kerja, bukan hari kalender.
  due = function due(proc,id=proc.currentStep){
    const st=STEPS[id];
    if(!st) return {text:"Selesai",color:"green"};
    const elapsed=Math.max(0,workDaysElapsedV27(proc.createdAt,today()));
    const targetBefore=before(id);
    if(st.days===null) return {text:`Flexible • ${numID(Math.max(0,elapsed-targetBefore))} hari kerja berjalan`,color:"blue"};
    const remain=targetBefore+Number(st.days||0)-elapsed;
    if(remain<0) return {text:`Lewat ${numID(Math.abs(remain))} hari kerja`,color:"red"};
    if(remain<=1) return {text:`Sisa ${numID(remain)} hari kerja`,color:"yellow"};
    return {text:`Sisa ${numID(remain)} hari kerja`,color:"green"};
  };
  contractDuration = function contractDuration(proc){
    const c=proc?.contract||{};
    if(!c.tanggalMulai||!c.tanggalAkhir) return 0;
    const n=workDaysInclusiveV27(c.tanggalMulai,c.tanggalAkhir);
    return Number.isFinite(n)?Math.max(0,n):0;
  };
  contractElapsed = function contractElapsed(proc){
    const c=proc?.contract||{};
    if(!c.tanggalMulai) return 0;
    const end=today()<c.tanggalAkhir?today():c.tanggalAkhir;
    return Math.max(0,workDaysInclusiveV27(c.tanggalMulai,end));
  };
  contractStatus = function contractStatus(proc){
    const c=proc?.contract||{};
    if(!c.tanggalMulai||!c.tanggalAkhir) return {text:"Isi tanggal mulai dan akhir kontrak",color:"yellow"};
    const dur=contractDuration(proc);
    if(today()<c.tanggalMulai){const n=workDaysInclusiveV27(today(),c.tanggalMulai);return {text:`Kontrak mulai ${numID(n)} hari kerja lagi • durasi ${numID(dur)} hari kerja`,color:"blue"};}
    if(today()>c.tanggalAkhir){const n=workDaysInclusiveV27(c.tanggalAkhir,today());return {text:`Kontrak lewat ${numID(n)} hari kerja • durasi ${numID(dur)} hari kerja`,color:"red"};}
    const rem=workDaysInclusiveV27(today(),c.tanggalAkhir), elapsed=contractElapsed(proc);
    return {text:`Sisa ${numID(rem)} hari kerja • ${numID(elapsed)}/${numID(dur)} hari kerja`,color:rem<=3?"yellow":"green"};
  };
  contractOk = function contractOk(proc){const c=proc?.contract||{};return !!(proc?.vendor&&c.noPks&&c.tanggalMulai&&c.tanggalAkhir)};

  input = function input(){
    if(!can("Input Pengadaan")) return denied("Anda tidak memiliki akses ke input pengadaan.");
    return `<div class="card pad"><div class="head" style="margin-top:0"><div><h2>Input Data Pengadaan</h2><small>Form dibuat ringkas sesuai proses awal pengadaan.</small></div></div>${canInput()?`<div class="help ok">Cukup isi Nama Pengadaan, Bidang, dan Jenis Pengadaan. Detail barang, volume, tarif, dan total usulan diisi pada tab Alokasi KPH.</div><form id="procForm" style="margin-top:16px"><div class="formGrid"><div class="field"><label>Nama Pengadaan</label><input name="nama" required placeholder="Contoh: Pengadaan APAR KPH Bandung"></div><div class="field"><label>Bidang</label><input name="bidang" value="${esc(bidang()?cur().bidang:"")}" ${bidang()?"readonly":""} required placeholder="IT / Umum / Sarpra"></div><div class="field"><label>Jenis Pengadaan</label><select name="jenisPengadaan"><option>Pengadaan Langsung</option><option>Tender Cepat</option><option>Tender Terbuka</option><option>E-Purchasing</option><option>Penunjukan Langsung</option></select></div><div class="field full"><button class="btn primary">Simpan Data Pengadaan</button></div></div></form>`:`<div class="help warn">Role Anda hanya dapat melihat data. Input pengadaan dibatasi untuk Bidang Terkait.</div>`}</div><div class="head"><h2>Data Pengadaan</h2></div>${procTable(vis())}`;
  };
  saveProc = function saveProc(e){
    e.preventDefault();
    if(!canInput()) return toast("Input pengadaan hanya oleh Bidang Terkait atau Admin.");
    const x=fd(e.target), bd=bidang()?cur().bidang:x.bidang;
    db.procurements.push(p(db.nextProcId++,x.nama,bd,x.jenisPengadaan,"","",0,"",0,today()));
    save(); toast("Data pengadaan berhasil disimpan."); state.page="procurements"; render();
  };

  procTable = function procTable(rows){
    if(!rows.length) return `<div class="card empty">Belum ada data pengadaan.</div>`;
    return `<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Jenis Pengadaan</th><th>Total Usulan</th><th>Barang Diterima</th><th>Vendor</th><th>Progress</th><th>Posisi Terakhir</th><th>Tata Waktu</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${rows.map(proc=>{const st=STEPS[proc.currentStep],ps=status(proc),du=due(proc),vendor=spmk(proc)?(proc.vendor||`<span class="badge yellow">Belum diisi</span>`):`<span class="badge gray">Terkunci sampai SPMK</span>`;const us=totalUsulanV27(proc),rec=recTotal(proc);return `<tr><td data-label="Pengadaan"><button type="button" class="linkBtn" data-detail="${proc.id}"><b>${esc(proc.nama)}</b></button><br><small>Nama barang: ${esc(namaBarangListV27(proc))}</small></td><td data-label="Bidang">${esc(proc.bidang)}</td><td data-label="Jenis Pengadaan">${esc(proc.jenisPengadaan)}</td><td data-label="Total Usulan"><b>${numID(us)}</b><br><small>${esc(proc.satuan||"Unit")}</small></td><td data-label="Barang Diterima"><b>${numID(rec)}</b><br><small>${pct(rec,us)}%</small></td><td data-label="Vendor">${vendor}</td><td data-label="Progress"><div class="progress"><span style="width:${prog(proc)}%"></span></div><small>${prog(proc)}%</small></td><td data-label="Posisi Terakhir">${st?`<b>${esc(st.title)}</b><br><small>PIC: ${esc(st.pic)}</small>`:"<b>Selesai</b>"}</td><td data-label="Tata Waktu"><span class="badge ${du.color}">${esc(du.text)}</span></td><td data-label="Status"><span class="badge ${ps.color}">${esc(ps.text)}</span></td><td data-label="Aksi"><div class="tools"><button type="button" class="btn primary small" data-detail="${proc.id}">Detail</button>${canEditProc(proc)?`<button type="button" class="btn ghost small" data-edit="${proc.id}">Edit</button>`:""}</div></td></tr>`}).join("")}</tbody></table></div>`;
  };
  dashboard = function dashboard(){
    const rows=vis(),done=rows.filter(x=>x.currentStep>=STEPS.length).length,run=rows.filter(x=>x.currentStep<STEPS.length).length,need=rows.filter(x=>isPic(STEPS[x.currentStep])).length;
    return `<div class="grid cards">${stat("all","Total Pengadaan",rows.length,"Seluruh pengadaan yang dapat Anda akses")}${stat("done","Selesai",done,"Pengadaan selesai")}${stat("running","Sedang Berlangsung",run,"Klik untuk melihat proses berjalan")}${stat("need","Perlu Approval",need,"Tahapan sesuai PIC login")}</div><div class="head"><h2>Daftar Pengadaan</h2><div class="tools">${canInput()?`<button class="btn primary small" data-go="input">+ Input Pengadaan</button>`:""}<button class="btn ghost small" data-reset>Reset Data Demo</button></div></div>${procTable(filtered())}`;
  };

  function editProcModalV27(proc){
    return `<div class="modalBack"><div class="modal"><div class="modalHead"><div><h2>Edit Data Pengadaan</h2><small>${esc(proc.nama)}</small></div><button type="button" class="btn ghost small" id="closeEditProc">Tutup</button></div><div class="modalBody"><form id="editProcForm" data-proc-id="${proc.id}"><div class="formGrid"><div class="field"><label>Nama Pengadaan</label><input name="nama" required value="${esc(proc.nama)}"></div><div class="field"><label>Bidang</label><input name="bidang" required value="${esc(proc.bidang)}" ${bidang()?"readonly":""}></div><div class="field"><label>Jenis Pengadaan</label><select name="jenisPengadaan">${["Pengadaan Langsung","Tender Cepat","Tender Terbuka","E-Purchasing","Penunjukan Langsung"].map(v=>`<option ${proc.jenisPengadaan===v?"selected":""}>${esc(v)}</option>`).join("")}</select></div><div class="field full"><button class="btn primary">Simpan Perubahan</button></div></div></form><div class="help" style="margin-top:14px">Detail barang, volume, tarif, pengiriman, dan penerimaan tetap dikelola pada tab operasional masing-masing.</div></div></div></div>`;
  }
  editProc = function editProc(id){
    const proc=db.procurements.find(p=>p.id===+id);
    if(!proc||!canEditProc(proc)) return toast("Anda tidak berwenang mengedit data ini.");
    document.getElementById("modalRoot").innerHTML=editProcModalV27(proc);
    document.getElementById("closeEditProc").onclick=()=>document.getElementById("modalRoot").innerHTML="";
    document.getElementById("editProcForm").onsubmit=saveEditProcV27;
  };
  window.saveEditProcV27=function saveEditProcV27(e){
    e.preventDefault();
    const proc=db.procurements.find(p=>p.id===+e.target.dataset.procId),x=fd(e.target);
    if(!proc) return toast("Data pengadaan tidak ditemukan.");
    proc.nama=x.nama.trim(); proc.bidang=bidang()?cur().bidang:x.bidang.trim(); proc.jenisPengadaan=x.jenisPengadaan;
    save(); document.getElementById("modalRoot").innerHTML=""; toast("Data pengadaan berhasil diperbarui."); render();
  };

  contractOptionData = function contractOptionData(proc){const c=proc.contract||{};return `data-vendor="${esc(proc.vendor||"")}" data-nopks="${esc(c.noPks||"")}" data-tglpks="${esc(isoToID(c.tanggalPks)||"")}" data-tglmulai="${esc(isoToID(c.tanggalMulai)||"")}" data-tglakhir="${esc(isoToID(c.tanggalAkhir)||"")}" data-keterangan="${esc(c.keterangan||"")}"`};
  contractForm = function contractForm(rows,selectedId=""){
    if(!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
    return `<form id="contractForm"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" id="contractProc" required>${rows.map(proc=>`<option value="${proc.id}" ${+selectedId===proc.id?"selected":""} ${contractOptionData(proc)}>${esc(proc.nama)}</option>`).join("")}</select></div><div class="field"><label>Vendor Bertanggung Jawab</label><input name="vendor" id="contractVendor" required placeholder="Nama vendor"></div><div class="field"><label>No PKS</label><input name="noPks" id="contractNoPks" required placeholder="Nomor PKS"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" id="contractTanggalPks" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY"></div><div class="field"><label>Tanggal Mulai Kontrak</label><input name="tanggalMulai" id="contractTanggalMulai" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Tanggal Akhir Kontrak</label><input name="tanggalAkhir" id="contractTanggalAkhir" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Durasi Hari Efektif</label><input id="contractDurasi" disabled placeholder="Otomatis Senin-Jumat, libur tidak dihitung"></div><div class="field"><label>Status Tata Waktu</label><input id="contractStatusText" disabled placeholder="Otomatis hari kerja efektif"></div><div class="field full"><label>Keterangan Masa Pelaksanaan</label><textarea name="keterangan" id="contractKeterangan" placeholder="Catatan masa pelaksanaan pekerjaan"></textarea></div><div class="field full"><button class="btn primary">Simpan Masa Pelaksanaan</button></div></div></form>`;
  };
  refreshContractForm = function refreshContractForm(){
    const opt=document.getElementById("contractProc")?.selectedOptions?.[0]; if(!opt) return;
    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v||""};
    set("contractVendor",opt.dataset.vendor); set("contractNoPks",opt.dataset.nopks); set("contractTanggalPks",opt.dataset.tglpks); set("contractTanggalMulai",opt.dataset.tglmulai); set("contractTanggalAkhir",opt.dataset.tglakhir); set("contractKeterangan",opt.dataset.keterangan); updateContractPreview(); bindFormattedInputs(document.getElementById("contractForm"));
  };
  updateContractPreview = function updateContractPreview(){
    const mulai=idToISO(document.getElementById("contractTanggalMulai")?.value), akhir=idToISO(document.getElementById("contractTanggalAkhir")?.value), dur=document.getElementById("contractDurasi"), stat=document.getElementById("contractStatusText");
    if(!dur||!stat) return; if(!mulai||!akhir){dur.value="";stat.value="Lengkapi tanggal mulai dan akhir format DD/MM/YYYY";return;}
    const n=workDaysInclusiveV27(mulai,akhir); dur.value=n>=0?`${numID(n)} hari kerja efektif`:"Tanggal akhir harus setelah/sama dengan mulai"; stat.value=contractStatus({contract:{tanggalMulai:mulai,tanggalAkhir:akhir}}).text;
  };
  saveContractForm = function saveContractForm(e){
    e.preventDefault();
    const data=fd(e.target), proc=db.procurements.find(p=>p.id===+data.procId);
    if(!proc) return toast("Pengadaan tidak ditemukan.");
    if(!spmk(proc)) return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");
    const tanggalPks=idToISO(data.tanggalPks), tanggalMulai=idToISO(data.tanggalMulai), tanggalAkhir=idToISO(data.tanggalAkhir);
    if(!data.vendor||!data.noPks||!tanggalMulai||!tanggalAkhir) return toast("Vendor, No PKS, tanggal mulai, dan tanggal akhir wajib diisi format DD/MM/YYYY.");
    if(calendarDiffV27(tanggalMulai,tanggalAkhir)<0) return toast("Tanggal akhir kontrak tidak boleh sebelum tanggal mulai.");
    proc.vendor=data.vendor.trim(); proc.contract={...(proc.contract||{}),noPks:data.noPks.trim(),tanggalPks,tanggalMulai,tanggalAkhir,keterangan:data.keterangan||""}; delete proc.contract.tanggalPerjanjian;
    save(); toast("Masa Pelaksanaan berhasil disimpan. Tata waktu memakai hari kerja efektif."); document.getElementById("modalRoot").innerHTML=""; render();
  };
  masa = function masa(){
    const rows=vis().filter(spmk);
    return `<div class="help">Masa Pelaksanaan dibuka setelah SPMK. Tanggal Perjanjian Sesuai Kontrak dihapus. Tata waktu dihitung berdasarkan hari kerja efektif Senin-Jumat dan daftar hari libur.</div><div class="card pad" style="margin-top:14px"><div class="head" style="margin-top:0"><h2>Input Masa Pelaksanaan Pekerjaan</h2></div>${can("Masa Pelaksanaan","edit")?contractForm(rows):`<div class="help warn">Role Anda tidak dapat mengisi masa pelaksanaan.</div>`}</div><div class="head"><h2>Pengadaan Setelah SPMK</h2></div>${rows.length?`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Tanggal PKS</th><th>Mulai</th><th>Akhir</th><th>Durasi Hari Efektif</th><th>Tata Waktu</th><th>Aksi</th></tr></thead><tbody>${rows.map(proc=>{const cs=contractStatus(proc);return `<tr><td data-label="Pengadaan"><b>${esc(proc.nama)}</b><br><small>${esc(proc.bidang)}</small></td><td data-label="Vendor">${esc(proc.vendor||"-")}</td><td data-label="No PKS">${esc(proc.contract.noPks||"-")}</td><td data-label="Tanggal PKS">${d(proc.contract.tanggalPks)}</td><td data-label="Mulai">${d(proc.contract.tanggalMulai)}</td><td data-label="Akhir">${d(proc.contract.tanggalAkhir)}</td><td data-label="Durasi">${numID(contractDuration(proc)||0)} hari kerja</td><td data-label="Tata Waktu"><span class="badge ${cs.color}">${esc(cs.text)}</span></td><td data-label="Aksi">${can("Masa Pelaksanaan","edit")?`<button type="button" class="btn primary small" data-contract="${proc.id}">Isi/Edit</button>`:"-"}</td></tr>`}).join("")}</tbody></table></div>`:`<div class="card empty">Belum ada pengadaan yang mencapai SPMK.</div>`}`;
  };
  contract = function contract(id){
    const rows=vis().filter(spmk), proc=db.procurements.find(p=>p.id===+id);
    if(!proc||!spmk(proc)) return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");
    document.getElementById("modalRoot").innerHTML=`<div class="modalBack"><div class="modal"><div class="modalHead"><div><h2>Input Masa Pelaksanaan Pekerjaan</h2><small>${esc(proc.nama)} • Hari kerja efektif</small></div><button type="button" class="btn ghost small" id="closeContractModal">Tutup</button></div><div class="modalBody"><div class="help">Lengkapi vendor, No PKS, tanggal PKS, tanggal mulai, dan tanggal akhir. Tanggal Perjanjian Sesuai Kontrak tidak digunakan.</div><div style="height:14px"></div>${contractForm(rows,id)}</div></div></div>`;
    document.getElementById("closeContractModal").onclick=()=>document.getElementById("modalRoot").innerHTML=""; bindContractForm(); refreshContractForm();
  };

  function allocationHeaderV27(proc){return `<div class="formGrid allocHeaderV27"><div class="field"><label>Vendor</label><input name="vendor" data-vendor-field readonly value="${esc(proc?.vendor||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>No PKS</label><input name="noPks" data-nopks-field readonly required value="${esc(proc?.contract?.noPks||"")}" placeholder="${esc(noPksReadonlyHelpV27(proc))}"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" data-tglpks-field readonly value="${esc(isoToID(proc?.contract?.tanggalPks)||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div></div>`;}
  multiAllocationForm = function multiAllocationForm(proc=null, formId="allocMultiForm"){
    const rows=proc?[proc]:vis().filter(spmk);
    if(!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
    const selected=proc?.id||rows[0].id, p0=proc||rows[0];
    return `<form id="${formId}" class="multiForm" data-kind="allocation"><div class="formGrid"><div class="field full"><label>Pengadaan</label><select name="procId" data-proc-select ${proc?"disabled":""}>${rows.map(p=>`<option value="${p.id}" ${p.id===selected?"selected":""}>${esc(p.nama)}</option>`).join("")}</select>${proc?`<input type="hidden" name="procId" value="${proc.id}">`:""}</div></div>${allocationHeaderV29(p0)}<div class="multiRows" data-container="allocation">${allocationRowTemplate()}</div><div class="multiToolbar"><button type="button" class="btn ghost small" data-add-allocation-row>+ Tambah Barang KPH</button><button class="btn primary" type="submit">Simpan Semua Alokasi</button></div></form>`;
  };
  allocationRowTemplate = function allocationRowTemplate(values={}){
    return `<div class="multiRow allocationRow"><div class="rowHeader"><b>Baris Barang Alokasi</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div><div class="formGrid"><div class="field"><label>Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja||"")}" placeholder="KPH Bandung"></div><div class="field"><label>Termin</label><select name="termin">${["Langsung","Termin I","Termin II","Termin III"].map(t=>`<option ${values.termin===t?"selected":""}>${esc(t)}</option>`).join("")}</select></div><div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggalMulai)||"")}" placeholder="DD/MM/YYYY"></div><div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggalAkhir)||"")}" placeholder="DD/MM/YYYY"></div><div class="field"><label>Nama Barang</label><input name="jenisBarang" required value="${esc(values.jenisBarang||"")}" placeholder="Contoh: APAR"></div><div class="field"><label>Satuan</label><input name="satuan" required value="${esc(values.satuan||"Unit")}"></div><div class="field"><label>Tarif (Rp)</label><input name="tarif" class="num-id" inputmode="numeric" required value="${values.tarif?numID(values.tarif):""}"></div><div class="field"><label>Volume Barang</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}"></div><div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div></div></div>`;
  };
  function syncAllocationHeaderV27(form){
    const proc=selectedProcFromForm(form); if(!proc) return;
    const set=(sel,v)=>{const el=form.querySelector(sel); if(el) el.value=v||""};
    set('[data-vendor-field]',proc.vendor||""); set('[data-nopks-field]',proc.contract?.noPks||""); set('[data-tglpks-field]',isoToID(proc.contract?.tanggalPks)||"");
  }
  saveMultiAllocation = function saveMultiAllocation(e){
    e.preventDefault();
    const form=e.target,data=fd(form),proc=db.procurements.find(p=>p.id===+data.procId);
    if(!proc) return toast("Pengadaan tidak ditemukan.");
    if(!spmk(proc)) return toast("Alokasi hanya dapat diisi setelah SPMK.");
    if(!contractOk(proc)) return toast("Lengkapi Masa Pelaksanaan terlebih dahulu agar No PKS tersedia.");
    if(!can("Alokasi KPH","tambah")&&!isPic(STEPS[proc.currentStep])) return toast("Anda tidak dapat mengisi alokasi.");
    const rows=readRows(form,".allocationRow");
    if(!rows.length) return toast("Minimal isi satu baris barang alokasi.");
    for(const r of rows){if(!r.satuanKerja||!r.termin||!r.tanggalMulai||!r.tanggalAkhir||!r.jenisBarang||!r.satuan||!r.tarif||!r.volume) return toast("Setiap baris alokasi wajib memiliki satuan kerja, termin, tanggal mulai/akhir, nama barang, satuan, tarif, dan volume."); if(dateDiffV29(r.tanggalMulai,r.tanggalAkhir)<0) return toast("Tanggal akhir alokasi tidak boleh sebelum tanggal mulai.");}
    rows.forEach(r=>proc.allocations.push(alloc(proc.vendor,proc.contract.noPks,proc.contract.tanggalPks,r.termin,r.tanggalMulai,r.tanggalAkhir,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,parseNumID(data.tahunPks)||new Date().getFullYear())));
    proc.totalUsulan=proc.allocations.reduce((a,b)=>a+(Number(b.volume)||0),0); proc.satuan=proc.allocations[0]?.satuan||proc.satuan||"Unit"; proc.jenisBarang=namaBarangListV29(proc);
    save(); toast(`${numID(rows.length)} baris barang alokasi berhasil disimpan.`); modalOpenV29()?detail(proc.id):render();
  };
  allocation = function allocation(){const rows=vis().filter(spmk);return `<div class="help">No PKS otomatis diambil dari Masa Pelaksanaan. Satu KPH dapat memiliki lebih dari satu nama barang melalui tombol Tambah Barang KPH.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Alokasi Barang Per KPH</h2>${can("Alokasi KPH","tambah")?multiAllocationForm(null,"allocMultiForm"):`<div class="help warn">Role Anda tidak dapat menambah alokasi.</div>`}</div><div class="head"><h2>Data Alokasi</h2></div>${allocTable(rows)}`;};
  allocTable = function allocTable(rows){let list=[];rows.forEach(proc=>(proc.allocations||[]).forEach((a,i)=>list.push({proc,_idx:i,...a})));if(!list.length)return`<div class="card empty">Belum ada alokasi.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Termin</th><th>Tgl Mulai</th><th>Tgl Akhir</th><th>Satuan Kerja</th><th>Nama Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th></tr></thead><tbody>${list.map(x=>`<tr><td data-label="Pengadaan"><b>${esc(x.proc.nama)}</b></td><td data-label="Vendor">${esc(x.vendor)}</td><td data-label="No PKS">${esc(x.noPks)}</td><td data-label="Termin">${esc(x.termin)}</td><td data-label="Tgl Mulai">${d(x.tanggalMulai)}</td><td data-label="Tgl Akhir">${d(x.tanggalAkhir)}</td><td data-label="Satuan Kerja">${esc(x.satuanKerja)}</td><td data-label="Nama Barang">${esc(x.jenisBarang)}</td><td data-label="Tarif">${rp(x.tarif)}</td><td data-label="Volume">${numID(x.volume)} ${esc(x.satuan||"")}</td><td data-label="Nilai">${rp(x.nilai)}</td></tr>`).join("")}</tbody></table></div>`};

  function allocationOptionsV27(proc){return (proc?.allocations||[]).map((a,i)=>({value:i,label:`${a.satuanKerja||"-"} • ${a.jenisBarang||"Barang"} • ${a.termin||"-"} • ${numID(a.volume||0)} ${a.satuan||""}`,row:a}));}
  function selectedAllocationV27(proc,idx){const arr=proc?.allocations||[];return arr[Number(idx)]||arr[0]||{};}
  movementRowTemplate = function movementRowTemplate(values={}, isReceipt=false, procId=null){
    const proc=db.procurements.find(p=>p.id===+(procId||values.procId||0)) || vis().find(p=>spmk(p)&&p.allocations.length) || null;
    const opts=allocationOptionsV27(proc), selected=values.allocationIndex!=null?Number(values.allocationIndex):0, src=selectedAllocationV27(proc,selected);
    const labelTanggal=isReceipt?"Tanggal Penerimaan":"Tanggal Pengiriman", labelVolume=isReceipt?"Volume Diterima":"Volume Terkirim";
    return `<div class="multiRow movementRow"><div class="rowHeader"><b>Baris ${isReceipt?"Penerimaan":"Pengiriman"}</b><button type="button" class="btn danger small" data-remove-row>Hapus</button></div><div class="formGrid"><div class="field"><label>${labelTanggal}</label><input name="tanggal" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggal)||"")}" placeholder="DD/MM/YYYY"></div><div class="field full"><label>Pilih Barang dari Alokasi KPH</label><select name="allocationIndex" data-allocation-select required>${opts.map(o=>`<option value="${o.value}" ${selected===o.value?"selected":""}>${esc(o.label)}</option>`).join("")}</select></div><div class="field"><label>Satuan Kerja</label><input name="satuanKerja" readonly required value="${esc(values.satuanKerja||src.satuanKerja||"")}"></div><div class="field"><label>Termin</label><input name="termin" readonly required value="${esc(values.termin||src.termin||"")}"></div><div class="field"><label>Nama Barang</label><input name="jenisBarang" readonly required value="${esc(values.jenisBarang||src.jenisBarang||"")}"></div><div class="field"><label>Satuan</label><input name="satuan" readonly required value="${esc(values.satuan||src.satuan||"")}"></div><div class="field"><label>Tarif (Rp)</label><input name="tarif" readonly class="num-id" value="${src.tarif?numID(src.tarif):""}"></div><div class="field"><label>${labelVolume}</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}"></div><div class="field full"><label>Upload DP / File Dokumen</label>${typeof uploadDpFileDokumenHtmlV9==="function"?uploadDpFileDokumenHtmlV9("dpCameraName","dpFile"):`<input name="dpFile" type="file">`}</div><div class="field"><label>Nilai</label><input disabled placeholder="Otomatis = tarif x volume"></div></div></div>`;
  };
  multiMovementForm = function multiMovementForm(proc=null, formId, type){
    const allowed=type==="receipts"?vis().filter(p=>spmk(p)&&p.shipments.length&&p.allocations.length):vis().filter(p=>spmk(p)&&p.allocations.length);
    const rows=proc?[proc]:allowed; if(!rows.length) return `<div class="empty">${type==="receipts"?"Belum ada pengiriman/alokasi, sehingga penerimaan belum dapat diinput.":"Belum ada pengadaan yang sudah SPMK dan memiliki alokasi."}</div>`;
    const p0=proc||rows[0], isReceipt=type==="receipts";
    return `<form id="${formId}" class="multiForm" data-kind="${type}"><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" data-proc-select ${proc?"disabled":""}>${rows.map(p=>`<option value="${p.id}" ${p.id===p0.id?"selected":""}>${esc(p.nama)}</option>`).join("")}</select>${proc?`<input type="hidden" name="procId" value="${proc.id}">`:""}</div><div class="field"><label>No PKS</label><input name="noPks" data-nopks-field readonly required value="${esc(p0?.contract?.noPks||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div></div><div class="multiRows" data-container="${type}">${movementRowTemplate({},isReceipt,p0.id)}</div><div class="multiToolbar"><button type="button" class="btn ghost small" data-add-movement-row="${type}">+ Tambah ${isReceipt?"Penerimaan":"Pengiriman"} Barang</button><button class="btn primary" type="submit">Simpan Semua ${isReceipt?"Penerimaan":"Pengiriman"}</button></div></form>`;
  };
  function updateMovementRowByAllocationV27(row,proc){
    const idx=row.querySelector('[name="allocationIndex"]')?.value || 0, src=selectedAllocationV27(proc,idx);
    const set=(name,v)=>{const el=row.querySelector(`[name="${name}"]`); if(el) el.value=v||""};
    set("satuanKerja",src.satuanKerja); set("termin",src.termin); set("jenisBarang",src.jenisBarang); set("satuan",src.satuan); set("tarif",src.tarif?numID(src.tarif):"");
  }
  function bindMovementAutoV27(form,type){
    const syncHeader=()=>{const proc=selectedProcFromForm(form);const no=form.querySelector('[data-nopks-field]');if(no)no.value=proc?.contract?.noPks||"";return proc};
    form.querySelector('[data-proc-select]')?.addEventListener('change',()=>{const proc=syncHeader(),box=form.querySelector(`[data-container="${type}"]`);box.innerHTML=movementRowTemplate({},type==="receipts",proc?.id);bindMultiForms();});
    const proc=syncHeader();
    form.querySelectorAll('.movementRow').forEach(row=>{row.querySelector('[data-allocation-select]')?.addEventListener('change',()=>updateMovementRowByAllocationV27(row,proc));updateMovementRowByAllocationV27(row,proc);});
  }
  readRows = function readRows(form,selector){return [...form.querySelectorAll(selector)].map(row=>{const q=name=>row.querySelector(`[name="${name}"]`)?.value?.trim()||"";const files=typeof fileInputsForRow==="function"?fileInputsForRow(row):{dpUnified:""};return {allocationIndex:q("allocationIndex"),satuanKerja:q("satuanKerja"),termin:q("termin"),tanggal:idToISO(q("tanggal")),tanggalMulai:idToISO(q("tanggalMulai")),tanggalAkhir:idToISO(q("tanggalAkhir")),jenisBarang:q("jenisBarang"),satuan:q("satuan"),tarif:parseNumID(q("tarif")),volume:parseNumID(q("volume")),dp:files.dpUnified||q("dp"),noPks:q("noPks")}}).filter(r=>r.satuanKerja||r.volume||r.jenisBarang)};
  saveMultiMovement = function saveMultiMovement(e,type){
    e.preventDefault(); const form=e.target,data=fd(form),proc=db.procurements.find(p=>p.id===+data.procId); if(!proc)return toast("Pengadaan tidak ditemukan.");
    if(!spmk(proc)) return toast("Data hanya dapat diinput setelah SPMK."); if(!contractOk(proc)) return toast("Lengkapi Masa Pelaksanaan terlebih dahulu agar No PKS tersedia.");
    if(type==="shipments"&&!proc.allocations.length) return toast("Pengiriman membutuhkan alokasi barang terlebih dahulu."); if(type==="receipts"&&!proc.shipments.length) return toast("Penerimaan baru dapat diinput setelah pengiriman tersimpan.");
    const rows=readRows(form,".movementRow"); if(!rows.length)return toast("Minimal isi satu baris data.");
    for(const r of rows){if(!r.tanggal||!r.satuanKerja||!r.termin||!r.jenisBarang||!r.satuan||!r.volume) return toast("Setiap baris wajib memiliki tanggal, barang alokasi, satuan kerja, termin, nama barang, satuan, dan volume."); if(!r.dp) return toast("Setiap baris wajib memiliki Upload DP / File Dokumen: pilih file atau ambil foto langsung.");}
    rows.forEach(r=>proc[type].push(mov(r.tanggal,proc.contract.noPks,r.termin,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,parseNumID(data.tahunPks)||new Date().getFullYear(),r.dp)));
    save(); toast(`${numID(rows.length)} baris ${type==="shipments"?"pengiriman":"penerimaan"} berhasil disimpan.`); modalOpenV29()?detail(proc.id):render();
  };
  shipping = function shipping(){const rows=vis().filter(x=>spmk(x)&&x.allocations.length);return `<div class="help">Nomor PKS otomatis dari Masa Pelaksanaan. Nama Barang diambil dari data Alokasi KPH.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Pengiriman Barang</h2>${can("Pengiriman Barang","tambah")?multiMovementForm(null,"shipMultiForm","shipments"):`<div class="help warn">Role Anda tidak dapat menambah pengiriman.</div>`}</div><div class="head"><h2>Data Pengiriman</h2></div>${movTable("shipments")}`;};
  receiving = function receiving(){const rows=vis().filter(x=>spmk(x)&&x.shipments.length);return `<div class="help ${rows.length?"":"warn"}">Nomor PKS otomatis dari Masa Pelaksanaan. Nama Barang diambil dari data Alokasi KPH.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Penerimaan Barang</h2>${can("Penerimaan Barang","tambah")?multiMovementForm(null,"recMultiForm","receipts"):`<div class="help warn">Role Anda tidak dapat menambah penerimaan.</div>`}</div><div class="head"><h2>Data Penerimaan</h2></div>${movTable("receipts")}`;};
  existingDataTable = function existingDataTable(proc,type){const data=proc[type]||[],isAlloc=type==="allocations";if(!data.length)return`<div class="help" style="margin-top:12px">Belum ada data ${labelDataType(type)}.</div>`;return `<div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Satuan Kerja</th><th>Termin</th>${isAlloc?"<th>Tgl Mulai</th><th>Tgl Akhir</th>":"<th>Tanggal</th>"}<th>Nama Barang</th><th>Volume</th><th>Tarif</th><th>Nilai</th><th>Upload DP / File Dokumen</th></tr></thead><tbody>${data.map(r=>`<tr><td data-label="Satuan Kerja">${esc(r.satuanKerja||"-")}</td><td data-label="Termin">${esc(r.termin||"-")}</td>${isAlloc?`<td data-label="Tgl Mulai">${d(r.tanggalMulai)}</td><td data-label="Tgl Akhir">${d(r.tanggalAkhir)}</td>`:`<td data-label="Tanggal">${d(r.tanggal)}</td>`}<td data-label="Nama Barang">${esc(r.jenisBarang||"-")}</td><td data-label="Volume">${numID(r.volume||0)} ${esc(r.satuan||"")}</td><td data-label="Tarif">${rp(r.tarif||0)}</td><td data-label="Nilai">${rp(r.nilai||0)}</td><td data-label="Upload">${esc(r.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`};
  movTable = function movTable(type){let list=[];vis().forEach(proc=>(proc[type]||[]).forEach(row=>list.push({proc,...row})));if(!list.length)return`<div class="card empty">Belum ada data.</div>`;return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Tanggal</th><th>No PKS</th><th>Termin</th><th>Satuan Kerja</th><th>Nama Barang</th><th>Tarif</th><th>Volume</th><th>Nilai</th><th>Upload DP / File Dokumen</th></tr></thead><tbody>${list.map(x=>`<tr><td data-label="Pengadaan"><b>${esc(x.proc.nama)}</b></td><td data-label="Tanggal">${d(x.tanggal)}</td><td data-label="No PKS">${esc(x.noPks)}</td><td data-label="Termin">${esc(x.termin)}</td><td data-label="Satuan Kerja">${esc(x.satuanKerja)}</td><td data-label="Nama Barang">${esc(x.jenisBarang)}</td><td data-label="Tarif">${rp(x.tarif)}</td><td data-label="Volume">${numID(x.volume)} ${esc(x.satuan||"")}</td><td data-label="Nilai">${rp(x.nilai)}</td><td data-label="Upload">${esc(x.dp||"-")}</td></tr>`).join("")}</tbody></table></div>`};

  function quickUploadHtmlV27(){return typeof uploadDokumenTahapanHtmlV9==="function"?uploadDokumenTahapanHtmlV9():`<input name="fileUpload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,image/*">`;}
  function fileInputsV27(form){const raw=typeof fileInputsForForm==="function"?fileInputsForForm(form):{file:fileLabel(form.querySelector('[name="fileUpload"]')),camera:""};return {file:raw.unified||[raw.file,raw.camera].filter(Boolean).join(" | "),camera:raw.camera||""};}
  function operationalNeedButtonV27(proc){
    const id=proc.currentStep;
    if(id===IDX.MASA&&!contractOk(proc)) return `<button type="button" class="btn ghost small" data-contract="${proc.id}">Lengkapi Masa Pelaksanaan</button>`;
    if(id===IDX.ALOKASI&&!proc.allocations.length) return `<button type="button" class="btn ghost small" data-open-operational="allocation">Lengkapi Alokasi KPH</button>`;
    if(id===IDX.KIRIM&&!proc.shipments.length) return `<button type="button" class="btn ghost small" data-open-operational="shipping">Lengkapi Pengiriman</button>`;
    if(id===IDX.TERIMA&&!proc.receipts.length) return `<button type="button" class="btn ghost small" data-open-operational="receiving">Lengkapi Penerimaan</button>`;
    return "";
  }
  function quickApprovalCardV27(proc){
    const st=STEPS[proc.currentStep]; if(!st) return "";
    const g=gate(proc,proc.currentStep), docs=(proc.documents||[]).filter(d=>+d.stepId===+proc.currentStep);
    const canApprove=isPic(st), hasDoc=docs.length>0, opBtn=operationalNeedButtonV27(proc);
    return `<div class="card pad quickApprovalCard"><div class="quickApprovalHead"><button type="button" class="approvalNameClick" data-detail="${proc.id}"><b>${esc(proc.nama)}</b><span>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)}</span></button><div class="tools"><span class="badge teal">PIC: ${esc(st.pic)}</span><span class="badge ${due(proc).color}">${esc(due(proc).text)}</span></div></div><div class="quickStep"><small>Tahapan aktif</small><b>${esc(st.title)}</b><span>${esc(st.detail||"")}</span></div><div class="help ${g.ok?"ok":"warn"}" style="margin-top:12px">${g.ok?"Syarat approval sudah lengkap. PIC dapat approve langsung dari kartu ini.":`Belum bisa approve: ${esc(g.msg)}`}</div>${opBtn?`<div class="quickOperationalAction">${opBtn}</div>`:""}<form class="quickApprovalForm" data-proc-id="${proc.id}"><div class="formGrid compactApprovalGrid"><div class="field"><label>Nama Dokumen</label><input name="name" value="Dokumen ${esc(st.title)}" required></div><div class="field full"><label>Upload Dokumen / Foto</label>${quickUploadHtmlV27()}</div><div class="field full"><label>Catatan</label><textarea name="note" placeholder="Catatan dokumen approval"></textarea></div><div class="field full"><button class="btn primary" ${canApprove?"":"disabled"}>${hasDoc?"Tambah Dokumen & Approve":"Simpan Dokumen & Approve"}</button></div></div></form>${docs.length?`<div class="quickDocList">${docs.map(d=>`<span class="badge blue">${esc(d.name||"Dokumen")} • ${esc(d.file||d.camera||"File")}</span>`).join("")}</div>`:""}</div>`;
  }
  approval = function approval(){
    const apps=vis().filter(proc=>proc.currentStep<STEPS.length&&isPic(STEPS[proc.currentStep]));
    return `<div class="head" style="margin-top:0"><div><h2>Antrian Approval Anda</h2><small>Ringkas: tidak menampilkan seluruh Alur Approval Pengadaan. PIC dapat upload dokumen dan approve langsung di kartu aktif.</small></div></div><div class="help ok">Klik nama pengadaan hanya untuk membuka detail. Proses approve harian dilakukan dari kartu antrian agar tidak panjang ke bawah.</div><div class="quickApprovalList">${apps.length?apps.map(quickApprovalCardV27).join(""):`<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`}</div>`;
  };
  window.quickApprovalSubmitV27=function quickApprovalSubmitV27(e){
    e.preventDefault();
    const form=e.target, proc=db.procurements.find(p=>p.id===+form.dataset.procId); if(!proc)return toast("Pengadaan tidak ditemukan.");
    const files=fileInputsV27(form), data=fd(form); if(!files.file) return toast("Pilih file dokumen atau ambil foto langsung terlebih dahulu.");
    proc.documents=proc.documents||[]; proc.documents.push({stepId:proc.currentStep,stepTitle:STEPS[proc.currentStep]?.title||"-",name:data.name||`Dokumen ${STEPS[proc.currentStep]?.title||"Approval"}`,file:files.file,camera:files.camera,note:data.note||"",by:session.name,role:session.role,at:new Date().toISOString()});
    save(); approve(proc.id);
  };
  approve = function approve(id){
    const proc=db.procurements.find(p=>p.id===+id); if(!proc)return;
    proc.stepStartedAt=proc.stepStartedAt||{}; const current=proc.currentStep; if(!proc.stepStartedAt[current]) proc.stepStartedAt[current]=stepStartISO(proc,current);
    const g=gate(proc,current); if(!g.ok)return toast(g.msg);
    if(!proc.completedSteps.includes(current)) proc.completedSteps.push(current);
    proc.approvals=proc.approvals||[]; proc.approvals.push({stepId:current,stepTitle:STEPS[current].title,pic:STEPS[current].pic,startedAt:proc.stepStartedAt[current],approvedBy:session.name,approvedRole:session.role,approvedAt:new Date().toISOString(),workDays:workDaysElapsedV27(proc.stepStartedAt[current],today())});
    proc.currentStep=Math.min(STEPS.length,current+1); if(proc.currentStep<STEPS.length) proc.stepStartedAt[proc.currentStep]=today(); save(); toast("Approval berhasil disimpan.");
    if(document.querySelector('.approvalDetailModal')) detail(proc.id); else render();
  };
  gate = function gate(proc,id){
    const st=STEPS[id]; if(!isPic(st)) return {ok:false,msg:"Role login bukan PIC tahapan ini."};
    if(id===IDX.MASA&&!contractOk(proc)) return {ok:false,msg:"Masa Pelaksanaan wajib dilengkapi terlebih dahulu."};
    if(id===IDX.ALOKASI&&!proc.allocations.length) return {ok:false,msg:"Alokasi KPH wajib diisi terlebih dahulu."};
    if(id===IDX.KIRIM&&!proc.shipments.length) return {ok:false,msg:"Pengiriman wajib diisi terlebih dahulu."};
    if(id===IDX.TERIMA&&!proc.receipts.length) return {ok:false,msg:"Penerimaan wajib diisi setelah pengiriman."};
    if(id===IDX.TPHP&&pct(recTotal(proc),totalUsulanV27(proc))<100) return {ok:false,msg:"TPHP aktif setelah barang diterima 100%."};
    if(!(proc.documents||[]).some(d=>+d.stepId===+id) && !hasStepDocument(proc,id)) return {ok:false,msg:"Upload dokumen/foto wajib sebelum approve."};
    return {ok:true,msg:"Dapat di-approve."};
  };

  bindMultiForms = function bindMultiForms(){
    document.querySelectorAll("[data-add-allocation-row]").forEach(btn=>{btn.onclick=()=>{const form=btn.closest("form"),box=form.querySelector('[data-container="allocation"]');box.insertAdjacentHTML("beforeend",allocationRowTemplate());bindMultiForms();bindFormattedInputs(form)}});
    document.querySelectorAll("[data-add-movement-row]").forEach(btn=>{btn.onclick=()=>{const form=btn.closest("form"),type=btn.dataset.addMovementRow,proc=selectedProcFromForm(form),box=form.querySelector(`[data-container="${type}"]`);box.insertAdjacentHTML("beforeend",movementRowTemplate({},type==="receipts",proc?.id));bindMultiForms();bindFormattedInputs(form)}});
    document.querySelectorAll("[data-remove-row]").forEach(btn=>{btn.onclick=()=>{const wrap=btn.closest(".multiRows");if(wrap&&wrap.querySelectorAll(".multiRow").length<=1)return toast("Minimal harus ada satu baris.");btn.closest(".multiRow")?.remove();}});
    document.querySelectorAll('form[data-kind="allocation"] [data-proc-select]').forEach(sel=>{sel.onchange=()=>syncAllocationHeaderV27(sel.closest('form'));syncAllocationHeaderV27(sel.closest('form'));});
    [["approvalAllocForm","allocation"],["allocMultiForm","allocation"]].forEach(([id])=>{const f=document.getElementById(id);if(f)f.onsubmit=saveMultiAllocation});
    [["approvalShipForm","shipments"],["shipMultiForm","shipments"],["approvalRecForm","receipts"],["recMultiForm","receipts"]].forEach(([id,type])=>{const f=document.getElementById(id);if(f){f.onsubmit=e=>saveMultiMovement(e,type);bindMovementAutoV27(f,type)}});
    bindFormattedInputs();
  };
  const prevBindPageV27=bindPage;
  bindPage = function bindPage(){
    try{prevBindPageV27();}catch(e){console.warn(e);}
    document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProc(+b.dataset.edit));
    document.querySelectorAll(".quickApprovalForm").forEach(f=>f.onsubmit=quickApprovalSubmitV27);
    document.querySelectorAll("[data-open-operational]").forEach(b=>b.onclick=()=>{state.page=b.dataset.openOperational;document.getElementById("modalRoot").innerHTML="";render();});
    bindMultiForms();
  };
  const prevBindApprovalFormsV27=bindApprovalForms;
  bindApprovalForms = function bindApprovalForms(){
    try{prevBindApprovalFormsV27();}catch(e){console.warn(e);}
    document.querySelectorAll(".quickApprovalForm").forEach(f=>f.onsubmit=quickApprovalSubmitV27);
    bindMultiForms();
  };

  try{window.dashboard=dashboard;window.input=input;window.saveProc=saveProc;window.procTable=procTable;window.editProc=editProc;window.masa=masa;window.contract=contract;window.contractForm=contractForm;window.allocation=allocation;window.shipping=shipping;window.receiving=receiving;window.approval=approval;window.bindPage=bindPage;window.bindApprovalForms=bindApprovalForms;window.approve=approve;render();}catch(e){console.error("Patch v27 gagal",e);}
})();

/* === PATCH v28: restore Approval tab display to v26 style while keeping v27 operational flow === */
(function(){
  function totalUsulanV28(proc){
    const stored=Number(proc?.totalUsulan||0);
    if(stored>0) return stored;
    return (proc?.allocations||[]).reduce((a,b)=>a+(Number(b.volume)||0),0);
  }
  function satuanV28(proc){
    const fromAlloc=(proc?.allocations||[]).find(a=>a.satuan)?.satuan;
    return proc?.satuan || fromAlloc || "Unit";
  }
  function namaBarangV28(proc){
    const names=[...(proc?.allocations||[]).map(a=>a.jenisBarang||a.namaBarang), proc?.jenisBarang].filter(Boolean);
    return [...new Set(names)].join(", ") || "Belum ada barang";
  }
  function currentGateV28(proc){
    try{return gate(proc,proc.currentStep);}catch(e){return {ok:false,msg:"Tahapan belum siap."};}
  }
  function currentActionV28(proc){
    if(!proc || proc.currentStep>=STEPS.length) return `<span class="badge green">Selesai</span>`;
    const st=STEPS[proc.currentStep], g=currentGateV28(proc);
    if(!isPic(st)) return `<span class="badge gray">PIC: ${esc(st?.pic||"-")}</span>`;
    if(g.ok) return `<button type="button" class="btn primary small" data-approve="${proc.id}">Approve</button>`;
    return `<button type="button" class="btn secondary small" data-approval-detail="${proc.id}">Lengkapi</button>`;
  }
  function approvalCompactListV28(rows){
    if(!rows.length) return `<div class="card empty">Tidak ada approval yang menjadi PIC Anda saat ini.</div>`;
    return `<div class="approvalCompactList approvalV26Restored">${rows.map(proc=>{
      const st=STEPS[proc.currentStep], ps=status(proc), du=due(proc);
      return `<div class="approvalCompactRow">
        <button type="button" class="approvalNameClick" data-approval-detail="${proc.id}" title="Klik untuk membuka detail approval">
          <b>${esc(proc.nama)}</b>
          <span>${esc(proc.bidang)} • ${esc(proc.jenisPengadaan)} • Total usulan ${numID(totalUsulanV28(proc))} ${esc(satuanV28(proc))}</span>
          <small>Nama barang: ${esc(namaBarangV28(proc))}</small>
        </button>
        <div class="approvalMeta"><span class="badge ${ps.color}">${esc(ps.text)}</span><span class="badge ${du.color}">${esc(du.text)}</span></div>
        <div class="approvalStepNow"><small>Tahapan aktif</small><b>${st?esc(st.title):"Selesai"}</b><span>PIC: ${st?esc(st.pic):"-"}</span></div>
        <div class="approvalCompactAction">${currentActionV28(proc)}</div>
      </div>`;
    }).join("")}</div>`;
  }

  approval = function approval(){
    const apps=vis().filter(x=>x.currentStep<STEPS.length && isPic(STEPS[x.currentStep]));
    return `<div class="head" style="margin-top:0"><div><h2>Antrian Approval Anda</h2><small>Tampilan dikembalikan seperti v26: daftar ringkas, nama pengadaan klikable, dan detail approval memakai alur vertikal/minimize.</small></div></div>
      <div class="help ok"><b>Mode v26:</b> klik nama pengadaan untuk membuka detail approval. Gunakan tombol Lengkapi untuk upload dokumen/foto, atau tombol Approve jika syarat tahapan sudah lengkap.</div>
      <br>${approvalCompactListV28(apps)}`;
  };

  const prevBindPageV28=bindPage;
  bindPage=function bindPage(){
    try{prevBindPageV28();}catch(e){console.warn(e);}
    document.querySelectorAll('[data-approval-detail]').forEach(btn=>{
      btn.onclick=()=>detail(+btn.dataset.approvalDetail);
    });
    document.querySelectorAll('[data-approve]').forEach(btn=>{
      btn.onclick=()=>approve(+btn.dataset.approve);
    });
  };

  const prevBindApprovalFormsV28=bindApprovalForms;
  bindApprovalForms=function bindApprovalForms(){
    try{prevBindApprovalFormsV28();}catch(e){console.warn(e);}
    document.querySelectorAll('[data-approval-detail]').forEach(btn=>{
      btn.onclick=()=>detail(+btn.dataset.approvalDetail);
    });
    document.querySelectorAll('[data-approve]').forEach(btn=>{
      btn.onclick=()=>approve(+btn.dataset.approve);
    });
  };

  try{
    window.approval=approval;
    window.bindPage=bindPage;
    window.bindApprovalForms=bindApprovalForms;
    render();
  }catch(e){console.error('Patch v28 approval v26 style gagal', e);}
})();

/* === PATCH v29: Alokasi KPH berbasis Satuan Kerja dengan multi Nama Barang === */
(function(){
  function termOptionsV29(selected="Termin I"){
    return ["Langsung","Termin I","Termin II","Termin III"].map(t=>`<option ${selected===t?"selected":""}>${esc(t)}</option>`).join("");
  }
  function allocationHeaderV29(proc){return `<div class="formGrid allocHeaderV27"><div class="field"><label>Vendor</label><input name="vendor" data-vendor-field readonly value="${esc(proc?.vendor||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>No PKS</label><input name="noPks" data-nopks-field readonly required value="${esc(proc?.contract?.noPks||"")}" placeholder="${esc(proc?.contract?.noPks?"Otomatis dari Masa Pelaksanaan":"Isi No PKS terlebih dahulu di Masa Pelaksanaan")}"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" data-tglpks-field readonly value="${esc(isoToID(proc?.contract?.tanggalPks)||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div></div>`;}
  function dateDiffV29(a,b){return Math.floor((new Date(b)-new Date(a))/(864e5));}
  function modalOpenV29(){return !!document.querySelector('.modalBack');}
  function namaBarangListV29(proc){const names=[...(proc?.allocations||[]).map(a=>a.jenisBarang||a.namaBarang),proc?.jenisBarang].filter(Boolean);return [...new Set(names)].join(', ')||'';}
  function allocationItemTemplateV29(values={}){
    return `<div class="allocationItemRow multiRowInner">
      <div class="rowHeader compact"><b>Nama Barang</b><button type="button" class="btn danger small" data-remove-allocation-item>Hapus Barang</button></div>
      <div class="formGrid">
        <div class="field"><label>Nama Barang</label><input name="jenisBarang" required value="${esc(values.jenisBarang||values.namaBarang||"")}" placeholder="Contoh: APAR / Laptop / Printer"></div>
        <div class="field"><label>Satuan</label><input name="satuan" required value="${esc(values.satuan||"Unit")}" placeholder="Unit / Set / Paket"></div>
        <div class="field"><label>Tarif (Rp)</label><input name="tarif" class="num-id" inputmode="numeric" required value="${values.tarif?numID(values.tarif):""}" placeholder="0"></div>
        <div class="field"><label>Volume Barang</label><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}" placeholder="0"></div>
        <div class="field"><label>Nilai</label><input disabled data-nilai-preview placeholder="Otomatis = Tarif x Volume"></div>
      </div>
    </div>`;
  }
  function allocationGroupTemplateV29(values={}){
    const items=(values.items&&values.items.length?values.items:[values]).filter(Boolean);
    return `<div class="multiRow allocationGroup" data-allocation-group>
      <div class="rowHeader allocationGroupHeader">
        <div><b>Satuan Kerja</b><small>Isi nama satuan kerja, lalu tambahkan satu atau lebih Nama Barang di bawahnya.</small></div>
        <button type="button" class="btn danger small" data-remove-allocation-group>Hapus Satuan Kerja</button>
      </div>
      <div class="formGrid allocationGroupFields">
        <div class="field full"><label>Nama Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja||"")}" placeholder="Contoh: KPH Bandung / KPH Bogor"></div>
        <div class="field"><label>Termin</label><select name="termin">${termOptionsV29(values.termin||"Termin I")}</select></div>
        <div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggalMulai)||"")}" placeholder="DD/MM/YYYY"></div>
        <div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggalAkhir)||"")}" placeholder="DD/MM/YYYY"></div>
      </div>
      <div class="allocationItems" data-allocation-items>${items.map(it=>allocationItemTemplateV29(it)).join("")}</div>
      <div class="multiToolbar innerToolbar"><button type="button" class="btn ghost small" data-add-allocation-item>+ Tambah Nama Barang pada Satuan Kerja Ini</button></div>
    </div>`;
  }
  function selectedProcForAllocationV29(form){return selectedProcFromForm(form) || vis().filter(spmk)[0] || null;}
  function allocationHeaderHelpV29(proc){
    if(!proc) return "Pilih pengadaan terlebih dahulu.";
    return proc.contract?.noPks ? `No PKS ${proc.contract.noPks} otomatis dari Masa Pelaksanaan.` : "Lengkapi Masa Pelaksanaan agar No PKS tersedia.";
  }
  multiAllocationForm = function multiAllocationForm(proc=null, formId="allocMultiForm"){
    const rows=proc?[proc]:vis().filter(spmk);
    if(!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
    const selected=proc?.id||rows[0].id, p0=proc||rows[0];
    return `<form id="${formId}" class="multiForm allocationSatkerForm" data-kind="allocation">
      <div class="formGrid">
        <div class="field full"><label>Pengadaan</label><select name="procId" data-proc-select ${proc?"disabled":""}>${rows.map(p=>`<option value="${p.id}" ${p.id===selected?"selected":""}>${esc(p.nama)}</option>`).join("")}</select>${proc?`<input type="hidden" name="procId" value="${proc.id}">`:""}</div>
      </div>
      ${allocationHeaderV29(p0)}
      <div class="help ok allocationSatkerHelp"><b>Format baru:</b> isi satu Nama Satuan Kerja, lalu tambahkan beberapa Nama Barang di dalam satuan kerja tersebut. Setiap barang memiliki Satuan, Tarif, Volume Barang, dan Nilai otomatis.</div>
      <div class="multiRows allocationGroupRows" data-container="allocation">${allocationGroupTemplateV29()}</div>
      <div class="multiToolbar"><button type="button" class="btn ghost small" data-add-allocation-group>+ Tambah Satuan Kerja</button><button class="btn primary" type="submit">Simpan Semua Alokasi</button></div>
      <div class="help" style="margin-top:12px">${esc(allocationHeaderHelpV29(p0))}</div>
    </form>`;
  };
  allocationRowTemplate = allocationGroupTemplateV29;

  function updateAllocationItemNilaiV29(item){
    const tarif=parseNumID(item.querySelector('[name="tarif"]')?.value||0);
    const volume=parseNumID(item.querySelector('[name="volume"]')?.value||0);
    const nilai=item.querySelector('[data-nilai-preview]');
    if(nilai) nilai.value=tarif&&volume?rp(tarif*volume):"";
  }
  function bindAllocationNilaiV29(scope=document){
    scope.querySelectorAll?.('.allocationItemRow').forEach(item=>{
      ['input','change'].forEach(ev=>{
        item.querySelector('[name="tarif"]')?.addEventListener(ev,()=>updateAllocationItemNilaiV29(item));
        item.querySelector('[name="volume"]')?.addEventListener(ev,()=>updateAllocationItemNilaiV29(item));
      });
      updateAllocationItemNilaiV29(item);
    });
  }
  function readAllocationGroupsV29(form){
    return [...form.querySelectorAll('[data-allocation-group]')].flatMap(group=>{
      const groupValue=name=>group.querySelector(`.allocationGroupFields [name="${name}"]`)?.value?.trim()||"";
      const satuanKerja=groupValue('satuanKerja');
      const termin=groupValue('termin')||"Termin I";
      const tanggalMulai=idToISO(groupValue('tanggalMulai'));
      const tanggalAkhir=idToISO(groupValue('tanggalAkhir'));
      return [...group.querySelectorAll('.allocationItemRow')].map(item=>{
        const q=name=>item.querySelector(`[name="${name}"]`)?.value?.trim()||"";
        return {satuanKerja,termin,tanggalMulai,tanggalAkhir,jenisBarang:q('jenisBarang'),namaBarang:q('jenisBarang'),satuan:q('satuan'),tarif:parseNumID(q('tarif')),volume:parseNumID(q('volume'))};
      });
    }).filter(r=>r.satuanKerja||r.jenisBarang||r.volume||r.tarif);
  }
  const readRowsBeforeV29=readRows;
  readRows = function readRows(form,selector){
    if(selector===".allocationRow" || form?.dataset?.kind==="allocation") return readAllocationGroupsV29(form);
    return readRowsBeforeV29(form,selector);
  };
  saveMultiAllocation = function saveMultiAllocation(e){
    e.preventDefault();
    const form=e.target, data=fd(form), proc=db.procurements.find(p=>p.id===+data.procId);
    if(!proc) return toast("Pengadaan tidak ditemukan.");
    if(!spmk(proc)) return toast("Alokasi hanya dapat diisi setelah SPMK.");
    if(!contractOk(proc)) return toast("Lengkapi Masa Pelaksanaan terlebih dahulu agar No PKS tersedia.");
    if(!can("Alokasi KPH","tambah")&&!isPic(STEPS[proc.currentStep])) return toast("Anda tidak dapat mengisi alokasi.");
    const rows=readAllocationGroupsV29(form);
    if(!rows.length) return toast("Minimal isi satu Satuan Kerja dan satu Nama Barang.");
    for(const r of rows){
      if(!r.satuanKerja||!r.termin||!r.tanggalMulai||!r.tanggalAkhir) return toast("Setiap Satuan Kerja wajib memiliki Nama Satuan Kerja, Termin, Tanggal Mulai, dan Tanggal Akhir.");
      if(!r.jenisBarang||!r.satuan||!r.tarif||!r.volume) return toast("Setiap Nama Barang wajib memiliki Nama Barang, Satuan, Tarif, dan Volume Barang.");
      if(dateDiffV29(r.tanggalMulai,r.tanggalAkhir)<0) return toast("Tanggal akhir alokasi tidak boleh sebelum tanggal mulai.");
    }
    rows.forEach(r=>proc.allocations.push(alloc(proc.vendor,proc.contract.noPks,proc.contract.tanggalPks,r.termin,r.tanggalMulai,r.tanggalAkhir,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,parseNumID(data.tahunPks)||new Date().getFullYear())));
    proc.totalUsulan=proc.allocations.reduce((a,b)=>a+(Number(b.volume)||0),0);
    proc.satuan=proc.allocations[0]?.satuan||proc.satuan||"Unit";
    proc.jenisBarang=namaBarangListV29(proc);
    save();
    const satkerCount=new Set(rows.map(r=>r.satuanKerja)).size;
    toast(`${numID(rows.length)} barang dari ${numID(satkerCount)} satuan kerja berhasil disimpan.`);
    modalOpenV29()?detail(proc.id):render();
  };
  allocation = function allocation(){
    const rows=vis().filter(spmk);
    return `<div class="help ok"><b>Alokasi berbasis Satuan Kerja:</b> No PKS otomatis dari Masa Pelaksanaan. Di setiap Satuan Kerja, pengguna dapat mengisi lebih dari satu Nama Barang lengkap dengan Satuan, Tarif, Volume Barang, dan Nilai.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Alokasi Barang Per Satuan Kerja</h2>${can("Alokasi KPH","tambah")?multiAllocationForm(null,"allocMultiForm"):`<div class="help warn">Role Anda tidak dapat menambah alokasi.</div>`}</div><div class="head"><h2>Data Alokasi</h2></div>${allocTable(rows)}`;
  };
  allocTable = function allocTable(rows){
    let list=[];rows.forEach(proc=>(proc.allocations||[]).forEach((a,i)=>list.push({proc,_idx:i,...a})));
    if(!list.length)return`<div class="card empty">Belum ada alokasi.</div>`;
    return`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Satuan Kerja</th><th>Termin</th><th>Tgl Mulai</th><th>Tgl Akhir</th><th>Nama Barang</th><th>Satuan</th><th>Tarif</th><th>Volume</th><th>Nilai</th></tr></thead><tbody>${list.map(x=>`<tr><td data-label="Pengadaan"><b>${esc(x.proc.nama)}</b></td><td data-label="Vendor">${esc(x.vendor)}</td><td data-label="No PKS">${esc(x.noPks)}</td><td data-label="Satuan Kerja"><b>${esc(x.satuanKerja)}</b></td><td data-label="Termin">${esc(x.termin)}</td><td data-label="Tgl Mulai">${d(x.tanggalMulai)}</td><td data-label="Tgl Akhir">${d(x.tanggalAkhir)}</td><td data-label="Nama Barang">${esc(x.jenisBarang)}</td><td data-label="Satuan">${esc(x.satuan||"")}</td><td data-label="Tarif">${rp(x.tarif)}</td><td data-label="Volume">${numID(x.volume)} ${esc(x.satuan||"")}</td><td data-label="Nilai">${rp(x.nilai)}</td></tr>`).join("")}</tbody></table></div>`;
  };
  function bindAllocationGroupsV29(){
    document.querySelectorAll('[data-add-allocation-group]').forEach(btn=>{btn.onclick=()=>{const form=btn.closest('form'),box=form.querySelector('[data-container="allocation"]');box.insertAdjacentHTML('beforeend',allocationGroupTemplateV29());bindMultiForms();bindFormattedInputs(form);bindAllocationNilaiV29(form);};});
    document.querySelectorAll('[data-add-allocation-item]').forEach(btn=>{btn.onclick=()=>{const group=btn.closest('[data-allocation-group]'),box=group.querySelector('[data-allocation-items]');box.insertAdjacentHTML('beforeend',allocationItemTemplateV29());bindMultiForms();bindFormattedInputs(group);bindAllocationNilaiV29(group);};});
    document.querySelectorAll('[data-remove-allocation-item]').forEach(btn=>{btn.onclick=()=>{const group=btn.closest('[data-allocation-group]');if(group.querySelectorAll('.allocationItemRow').length<=1)return toast('Minimal satu barang pada setiap Satuan Kerja.');btn.closest('.allocationItemRow')?.remove();};});
    document.querySelectorAll('[data-remove-allocation-group]').forEach(btn=>{btn.onclick=()=>{const wrap=btn.closest('.multiRows');if(wrap&&wrap.querySelectorAll('[data-allocation-group]').length<=1)return toast('Minimal harus ada satu Satuan Kerja.');btn.closest('[data-allocation-group]')?.remove();};});
    document.querySelectorAll('form[data-kind="allocation"] [data-proc-select]').forEach(sel=>{sel.onchange=()=>syncAllocationHeaderV27(sel.closest('form'));syncAllocationHeaderV27(sel.closest('form'));});
    bindAllocationNilaiV29(document);
  }
  const bindMultiFormsBeforeV29=bindMultiForms;
  bindMultiForms = function bindMultiForms(){
    try{bindMultiFormsBeforeV29();}catch(e){console.warn(e);}
    document.querySelectorAll('[data-add-allocation-row]').forEach(btn=>{btn.onclick=()=>{const form=btn.closest('form'),box=form.querySelector('[data-container="allocation"]');box.insertAdjacentHTML('beforeend',allocationGroupTemplateV29());bindMultiForms();bindFormattedInputs(form);bindAllocationNilaiV29(form);};});
    [["approvalAllocForm","allocation"],["allocMultiForm","allocation"]].forEach(([id])=>{const f=document.getElementById(id);if(f)f.onsubmit=saveMultiAllocation;});
    bindAllocationGroupsV29();
  };
  const bindPageBeforeV29=bindPage;
  bindPage = function bindPage(){
    try{bindPageBeforeV29();}catch(e){console.warn(e);}
    bindMultiForms();
  };
  const bindApprovalFormsBeforeV29=bindApprovalForms;
  bindApprovalForms = function bindApprovalForms(){
    try{bindApprovalFormsBeforeV29();}catch(e){console.warn(e);}
    bindMultiForms();
  };
  try{window.multiAllocationForm=multiAllocationForm;window.allocationRowTemplate=allocationRowTemplate;window.saveMultiAllocation=saveMultiAllocation;window.allocation=allocation;window.allocTable=allocTable;window.bindMultiForms=bindMultiForms;window.bindPage=bindPage;window.bindApprovalForms=bindApprovalForms;render();}catch(e){console.error('Patch v29 Alokasi Satuan Kerja Multi Barang gagal',e);}
})();


/* === PATCH v31: hapus Data Pengadaan, edit Masa Pelaksanaan auto-load, tabel barang Alokasi KPH === */
(function(){
  const PROCUREMENT_TYPES_V31=["Pengadaan Langsung","Tender Cepat","Tender Terbuka","E-Purchasing","Penunjukan Langsung"];

  function dateDiffV31(a,b){
    const da=new Date(`${a}T00:00:00`), dbb=new Date(`${b}T00:00:00`);
    return Math.floor((dbb-da)/864e5);
  }
  function modalOpenV31(){return !!document.querySelector('.modalBack');}
  function contractForV31(proc){proc.contract=proc.contract||{noPks:"",tanggalPks:"",tanggalMulai:"",tanggalAkhir:"",keterangan:""};return proc.contract;}
  function namaBarangListV31(proc){const names=[...(proc?.allocations||[]).map(a=>a.jenisBarang||a.namaBarang),proc?.jenisBarang].filter(Boolean);return [...new Set(names)].join(', ')||'-';}
  function totalUsulanV31(proc){const stored=Number(proc?.totalUsulan||0);return stored>0?stored:(proc?.allocations||[]).reduce((a,b)=>a+(Number(b.volume)||0),0);}
  function canDeleteProcV31(proc){return !!proc && accessProc(proc) && (admin() || can("Data Pengadaan","hapus") || can("Input Pengadaan","hapus"));}

  procTable = function procTable(rows){
    if(!rows.length) return `<div class="card empty">Belum ada data pengadaan.</div>`;
    return `<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Bidang</th><th>Jenis Pengadaan</th><th>Total Usulan</th><th>Barang Diterima</th><th>Vendor</th><th>Progress</th><th>Posisi Terakhir</th><th>Tata Waktu</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${rows.map(proc=>{
      const st=STEPS[proc.currentStep], ps=status(proc), du=due(proc), vendor=spmk(proc)?(proc.vendor||`<span class="badge yellow">Belum diisi</span>`):`<span class="badge gray">Terkunci sampai SPMK</span>`;
      const us=totalUsulanV31(proc), rec=recTotal(proc), showDelete=state.page==="procurements"&&canDeleteProcV31(proc);
      return `<tr><td data-label="Pengadaan"><button type="button" class="linkBtn" data-detail="${proc.id}"><b>${esc(proc.nama)}</b></button><br><small>Nama barang: ${esc(namaBarangListV31(proc))}</small></td><td data-label="Bidang">${esc(proc.bidang)}</td><td data-label="Jenis Pengadaan">${esc(proc.jenisPengadaan)}</td><td data-label="Total Usulan"><b>${numID(us)}</b><br><small>${esc(proc.satuan||"Unit")}</small></td><td data-label="Barang Diterima"><b>${numID(rec)}</b><br><small>${pct(rec,us)}%</small></td><td data-label="Vendor">${vendor}</td><td data-label="Progress"><div class="progress"><span style="width:${prog(proc)}%"></span></div><small>${prog(proc)}%</small></td><td data-label="Posisi Terakhir">${st?`<b>${esc(st.title)}</b><br><small>PIC: ${esc(st.pic)}</small>`:"<b>Selesai</b>"}</td><td data-label="Tata Waktu"><span class="badge ${du.color}">${esc(du.text)}</span></td><td data-label="Status"><span class="badge ${ps.color}">${esc(ps.text)}</span></td><td data-label="Aksi"><div class="tools"><button type="button" class="btn primary small" data-detail="${proc.id}">Detail</button>${canEditProc(proc)?`<button type="button" class="btn ghost small" data-edit="${proc.id}">Edit</button>`:""}${showDelete?`<button type="button" class="btn danger small" data-delete-proc="${proc.id}">Hapus</button>`:""}</div></td></tr>`;
    }).join("")}</tbody></table></div>`;
  };

  function deleteProcV31(id){
    const proc=db.procurements.find(p=>p.id===+id);
    if(!proc) return toast("Data pengadaan tidak ditemukan.");
    if(!canDeleteProcV31(proc)) return toast("Anda tidak berwenang menghapus data ini.");
    const ok=window.confirm(`Hapus data pengadaan "${proc.nama}"?\n\nSeluruh data terkait, termasuk dokumen, masa pelaksanaan, alokasi, pengiriman, dan penerimaan, ikut terhapus.`);
    if(!ok) return;
    db.procurements=db.procurements.filter(p=>p.id!==proc.id);
    save();
    const modal=document.getElementById("modalRoot"); if(modal) modal.innerHTML="";
    toast("Data pengadaan berhasil dihapus.");
    render();
  }

  contractOptionData = function contractOptionData(proc){
    const c=contractForV31(proc);
    return `data-vendor="${esc(proc.vendor||"")}" data-nopks="${esc(c.noPks||"")}" data-tglpks="${esc(isoToID(c.tanggalPks)||"")}" data-tglmulai="${esc(isoToID(c.tanggalMulai)||"")}" data-tglakhir="${esc(isoToID(c.tanggalAkhir)||"")}" data-keterangan="${esc(c.keterangan||"")}"`;
  };
  contractForm = function contractForm(rows,selectedId=""){
    if(!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
    const selected=+selectedId||rows[0].id;
    return `<form id="contractForm" data-contract-form-v31><div class="formGrid"><div class="field"><label>Pengadaan</label><select name="procId" id="contractProc" required>${rows.map(proc=>`<option value="${proc.id}" ${+selected===proc.id?"selected":""} ${contractOptionData(proc)}>${esc(proc.nama)}</option>`).join("")}</select></div><div class="field"><label>Vendor Bertanggung Jawab</label><input name="vendor" id="contractVendor" required placeholder="Nama vendor"></div><div class="field"><label>No PKS</label><input name="noPks" id="contractNoPks" required placeholder="Nomor PKS"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" id="contractTanggalPks" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY"></div><div class="field"><label>Tanggal Mulai Kontrak</label><input name="tanggalMulai" id="contractTanggalMulai" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Tanggal Akhir Kontrak</label><input name="tanggalAkhir" id="contractTanggalAkhir" class="date-id" inputmode="numeric" placeholder="DD/MM/YYYY" required></div><div class="field"><label>Durasi Hari Efektif</label><input id="contractDurasi" disabled placeholder="Otomatis Senin-Jumat, libur tidak dihitung"></div><div class="field"><label>Status Tata Waktu</label><input id="contractStatusText" disabled placeholder="Otomatis hari kerja efektif"></div><div class="field full"><label>Keterangan Masa Pelaksanaan</label><textarea name="keterangan" id="contractKeterangan" placeholder="Catatan masa pelaksanaan pekerjaan"></textarea></div><div class="field full"><button class="btn primary">Simpan Masa Pelaksanaan</button></div></div></form>`;
  };
  refreshContractForm = function refreshContractForm(){
    const sel=document.getElementById("contractProc");
    if(!sel) return;
    const proc=db.procurements.find(p=>p.id===+sel.value);
    if(!proc) return;
    const c=contractForV31(proc);
    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v||"";};
    set("contractVendor",proc.vendor||"");
    set("contractNoPks",c.noPks||"");
    set("contractTanggalPks",isoToID(c.tanggalPks)||"");
    set("contractTanggalMulai",isoToID(c.tanggalMulai)||"");
    set("contractTanggalAkhir",isoToID(c.tanggalAkhir)||"");
    set("contractKeterangan",c.keterangan||"");
    updateContractPreview();
    bindFormattedInputs(document.getElementById("contractForm")||document);
  };
  updateContractPreview = function updateContractPreview(){
    const mulai=idToISO(document.getElementById("contractTanggalMulai")?.value), akhir=idToISO(document.getElementById("contractTanggalAkhir")?.value), dur=document.getElementById("contractDurasi"), stat=document.getElementById("contractStatusText");
    if(!dur||!stat) return;
    if(!mulai||!akhir){dur.value="";stat.value="Lengkapi tanggal mulai dan akhir format DD/MM/YYYY";return;}
    const fake={contract:{tanggalMulai:mulai,tanggalAkhir:akhir}};
    const n=contractDuration(fake);
    dur.value=dateDiffV31(mulai,akhir)>=0?`${numID(n)} hari kerja efektif`:"Tanggal akhir harus setelah/sama dengan mulai";
    stat.value=contractStatus(fake).text;
  };
  saveContractForm = function saveContractForm(e){
    e.preventDefault();
    const data=fd(e.target), proc=db.procurements.find(p=>p.id===+data.procId);
    if(!proc) return toast("Pengadaan tidak ditemukan.");
    if(!spmk(proc)) return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");
    const tanggalPks=idToISO(data.tanggalPks), tanggalMulai=idToISO(data.tanggalMulai), tanggalAkhir=idToISO(data.tanggalAkhir);
    if(!data.vendor||!data.noPks||!tanggalMulai||!tanggalAkhir) return toast("Vendor, No PKS, tanggal mulai, dan tanggal akhir wajib diisi format DD/MM/YYYY.");
    if(dateDiffV31(tanggalMulai,tanggalAkhir)<0) return toast("Tanggal akhir kontrak tidak boleh sebelum tanggal mulai.");
    proc.vendor=data.vendor.trim();
    proc.contract={...(proc.contract||{}),noPks:data.noPks.trim(),tanggalPks,tanggalMulai,tanggalAkhir,keterangan:data.keterangan||""};
    delete proc.contract.tanggalPerjanjian;
    save(); toast("Masa Pelaksanaan berhasil disimpan. Data lama akan otomatis tampil saat diedit kembali.");
    const modal=document.getElementById("modalRoot"); if(modal) modal.innerHTML="";
    render();
  };
  bindContractForm = function bindContractForm(){
    const cf=document.getElementById("contractForm");
    if(!cf) return;
    cf.onsubmit=saveContractForm;
    const sel=document.getElementById("contractProc");
    if(sel) sel.onchange=refreshContractForm;
    ["contractTanggalPks","contractTanggalMulai","contractTanggalAkhir"].forEach(id=>{const el=document.getElementById(id); if(el) el.oninput=()=>{maskDateInput(el); updateContractPreview();};});
    refreshContractForm();
  };
  masa = function masa(){
    const rows=vis().filter(spmk);
    return `<div class="help">Masa Pelaksanaan dibuka setelah SPMK. Popup edit sekarang otomatis memuat data lama berdasarkan pengadaan yang dipilih.</div><div class="card pad" style="margin-top:14px"><div class="head" style="margin-top:0"><h2>Input Masa Pelaksanaan Pekerjaan</h2></div>${can("Masa Pelaksanaan","edit")?contractForm(rows):`<div class="help warn">Role Anda tidak dapat mengisi masa pelaksanaan.</div>`}</div><div class="head"><h2>Pengadaan Setelah SPMK</h2></div>${rows.length?`<div class="tableWrap"><table><thead><tr><th>Pengadaan</th><th>Vendor</th><th>No PKS</th><th>Tanggal PKS</th><th>Mulai</th><th>Akhir</th><th>Durasi Hari Efektif</th><th>Tata Waktu</th><th>Aksi</th></tr></thead><tbody>${rows.map(proc=>{const c=contractForV31(proc), cs=contractStatus(proc);return `<tr><td data-label="Pengadaan"><b>${esc(proc.nama)}</b><br><small>${esc(proc.bidang)}</small></td><td data-label="Vendor">${esc(proc.vendor||"-")}</td><td data-label="No PKS">${esc(c.noPks||"-")}</td><td data-label="Tanggal PKS">${d(c.tanggalPks)}</td><td data-label="Mulai">${d(c.tanggalMulai)}</td><td data-label="Akhir">${d(c.tanggalAkhir)}</td><td data-label="Durasi">${numID(contractDuration(proc)||0)} hari kerja</td><td data-label="Tata Waktu"><span class="badge ${cs.color}">${esc(cs.text)}</span></td><td data-label="Aksi">${can("Masa Pelaksanaan","edit")?`<button type="button" class="btn primary small" data-contract="${proc.id}">Isi/Edit</button>`:"-"}</td></tr>`}).join("")}</tbody></table></div>`:`<div class="card empty">Belum ada pengadaan yang mencapai SPMK.</div>`}`;
  };
  contract = function contract(id){
    const rows=vis().filter(spmk), proc=db.procurements.find(p=>p.id===+id);
    if(!proc||!spmk(proc)) return toast("Masa Pelaksanaan baru dapat diisi setelah SPMK.");
    document.getElementById("modalRoot").innerHTML=`<div class="modalBack"><div class="modal"><div class="modalHead"><div><h2>Edit Masa Pelaksanaan Pekerjaan</h2><small>${esc(proc.nama)} • Data lama dimuat otomatis</small></div><button type="button" class="btn ghost small" id="closeContractModal">Tutup</button></div><div class="modalBody"><div class="help ok">Data vendor, No PKS, tanggal PKS, tanggal mulai, tanggal akhir, dan keterangan akan langsung mengikuti data lama pengadaan ini.</div><div style="height:14px"></div>${contractForm(rows,id)}</div></div></div>`;
    document.getElementById("closeContractModal").onclick=()=>document.getElementById("modalRoot").innerHTML="";
    bindContractForm();
  };

  function allocationHeaderV31(proc){return `<div class="formGrid allocHeaderV27"><div class="field"><label>Vendor</label><input name="vendor" data-vendor-field readonly value="${esc(proc?.vendor||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>No PKS</label><input name="noPks" data-nopks-field readonly required value="${esc(proc?.contract?.noPks||"")}" placeholder="${esc(proc?.contract?.noPks?"Otomatis dari Masa Pelaksanaan":"Isi No PKS terlebih dahulu di Masa Pelaksanaan")}"></div><div class="field"><label>Tanggal PKS</label><input name="tanggalPks" data-tglpks-field readonly value="${esc(isoToID(proc?.contract?.tanggalPks)||"")}" placeholder="Otomatis dari Masa Pelaksanaan"></div><div class="field"><label>Tahun PKS</label><input name="tahunPks" class="num-id" inputmode="numeric" value="${new Date().getFullYear()}"></div></div>`;}
  function termOptionsV31(selected="Termin I"){return ["Langsung","Termin I","Termin II","Termin III"].map(t=>`<option ${selected===t?"selected":""}>${esc(t)}</option>`).join("");}
  function allocationItemRowTemplateV31(values={}){
    return `<tr class="allocationItemRow">
      <td data-label="Nama Barang"><input name="jenisBarang" required value="${esc(values.jenisBarang||values.namaBarang||"")}" placeholder="Contoh: APAR / Laptop"></td>
      <td data-label="Satuan"><input name="satuan" required value="${esc(values.satuan||"Unit")}" placeholder="Unit / Set / Paket"></td>
      <td data-label="Tarif"><input name="tarif" class="num-id" inputmode="numeric" required value="${values.tarif?numID(values.tarif):""}" placeholder="0"></td>
      <td data-label="Volume Barang"><input name="volume" class="num-id" inputmode="numeric" required value="${values.volume?numID(values.volume):""}" placeholder="0"></td>
      <td data-label="Nilai"><input disabled data-nilai-preview placeholder="Otomatis" value="${values.tarif&&values.volume?rp(Number(values.tarif)*Number(values.volume)):""}"></td>
      <td data-label="Aksi"><button type="button" class="btn danger small" data-remove-allocation-item>Hapus</button></td>
    </tr>`;
  }
  function allocationGroupTemplateV31(values={}){
    const items=(values.items&&values.items.length?values.items:[values]).filter(Boolean);
    return `<div class="multiRow allocationGroup allocationTableGroup" data-allocation-group>
      <div class="rowHeader allocationGroupHeader"><div><b>Satuan Kerja</b><small>Isi identitas satuan kerja, lalu input barang dalam tabel.</small></div><button type="button" class="btn danger small" data-remove-allocation-group>Hapus Satuan Kerja</button></div>
      <div class="formGrid allocationGroupFields">
        <div class="field full"><label>Nama Satuan Kerja</label><input name="satuanKerja" required value="${esc(values.satuanKerja||"")}" placeholder="Contoh: KPH Bandung / KPH Bogor"></div>
        <div class="field"><label>Termin</label><select name="termin">${termOptionsV31(values.termin||"Termin I")}</select></div>
        <div class="field"><label>Tanggal Mulai</label><input name="tanggalMulai" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggalMulai)||"")}" placeholder="DD/MM/YYYY"></div>
        <div class="field"><label>Tanggal Akhir</label><input name="tanggalAkhir" class="date-id" inputmode="numeric" required value="${esc(isoToID(values.tanggalAkhir)||"")}" placeholder="DD/MM/YYYY"></div>
      </div>
      <div class="allocationItemTableWrap"><table class="allocationItemTable"><thead><tr><th>Nama Barang</th><th>Satuan</th><th>Tarif</th><th>Volume Barang</th><th>Nilai otomatis</th><th>Aksi</th></tr></thead><tbody data-allocation-items>${items.map(it=>allocationItemRowTemplateV31(it)).join("")}</tbody></table></div>
      <div class="multiToolbar innerToolbar"><button type="button" class="btn ghost small" data-add-allocation-item>+ Tambah Barang</button></div>
    </div>`;
  }
  function selectedProcForAllocationV31(form){return selectedProcFromForm(form)||vis().filter(spmk)[0]||null;}
  function allocationHeaderHelpV31(proc){if(!proc) return "Pilih pengadaan terlebih dahulu."; return proc.contract?.noPks?`No PKS ${proc.contract.noPks} otomatis dari Masa Pelaksanaan.`:"Lengkapi Masa Pelaksanaan agar No PKS tersedia.";}
  function syncAllocationHeaderV31(form){
    const proc=selectedProcForAllocationV31(form); if(!proc||!form) return;
    const set=(sel,v)=>{const el=form.querySelector(sel);if(el)el.value=v||"";};
    set('[data-vendor-field]',proc.vendor||"");
    set('[data-nopks-field]',proc.contract?.noPks||"");
    set('[data-tglpks-field]',isoToID(proc.contract?.tanggalPks)||"");
    const help=form.querySelector('[data-allocation-header-help]'); if(help) help.textContent=allocationHeaderHelpV31(proc);
  }
  multiAllocationForm = function multiAllocationForm(proc=null,formId="allocMultiForm"){
    const rows=proc?[proc]:vis().filter(spmk);
    if(!rows.length) return `<div class="empty">Belum ada pengadaan yang mencapai SPMK.</div>`;
    const selected=proc?.id||rows[0].id, p0=proc||rows[0];
    return `<form id="${formId}" class="multiForm" data-kind="allocation"><div class="formGrid"><div class="field full"><label>Pengadaan</label><select name="procId" data-proc-select ${proc?"disabled":""}>${rows.map(p=>`<option value="${p.id}" ${p.id===selected?"selected":""}>${esc(p.nama)}</option>`).join("")}</select>${proc?`<input type="hidden" name="procId" value="${proc.id}">`:""}</div></div>${allocationHeaderV31(p0)}<div class="help ok allocationSatkerHelp"><b>Format v31:</b> barang Alokasi KPH diinput dalam tabel dengan kolom Nama Barang, Satuan, Tarif, Volume Barang, Nilai otomatis, dan Aksi.</div><div class="multiRows allocationGroupRows" data-container="allocation">${allocationGroupTemplateV31()}</div><div class="multiToolbar"><button type="button" class="btn ghost small" data-add-allocation-group>+ Tambah Satuan Kerja</button><button class="btn primary" type="submit">Simpan Semua Alokasi</button></div><div class="help" data-allocation-header-help style="margin-top:12px">${esc(allocationHeaderHelpV31(p0))}</div></form>`;
  };
  allocationRowTemplate = allocationGroupTemplateV31;
  function updateAllocationItemNilaiV31(item){
    const tarif=parseNumID(item.querySelector('[name="tarif"]')?.value||0), volume=parseNumID(item.querySelector('[name="volume"]')?.value||0), nilai=item.querySelector('[data-nilai-preview]');
    if(nilai) nilai.value=tarif&&volume?rp(tarif*volume):"";
  }
  function bindAllocationNilaiV31(scope=document){
    scope.querySelectorAll?.('.allocationItemRow').forEach(item=>{
      ['input','change'].forEach(ev=>{
        item.querySelector('[name="tarif"]')?.addEventListener(ev,()=>updateAllocationItemNilaiV31(item));
        item.querySelector('[name="volume"]')?.addEventListener(ev,()=>updateAllocationItemNilaiV31(item));
      });
      updateAllocationItemNilaiV31(item);
    });
  }
  function readAllocationGroupsV31(form){
    return [...form.querySelectorAll('[data-allocation-group]')].flatMap(group=>{
      const groupValue=name=>group.querySelector(`.allocationGroupFields [name="${name}"]`)?.value?.trim()||"";
      const satuanKerja=groupValue('satuanKerja'), termin=groupValue('termin')||"Termin I", tanggalMulai=idToISO(groupValue('tanggalMulai')), tanggalAkhir=idToISO(groupValue('tanggalAkhir'));
      return [...group.querySelectorAll('.allocationItemRow')].map(item=>{
        const q=name=>item.querySelector(`[name="${name}"]`)?.value?.trim()||"";
        return {satuanKerja,termin,tanggalMulai,tanggalAkhir,jenisBarang:q('jenisBarang'),namaBarang:q('jenisBarang'),satuan:q('satuan'),tarif:parseNumID(q('tarif')),volume:parseNumID(q('volume'))};
      });
    }).filter(r=>r.satuanKerja||r.jenisBarang||r.volume||r.tarif);
  }
  const readRowsBeforeV31=readRows;
  readRows = function readRows(form,selector){
    if(selector===".allocationRow" || form?.dataset?.kind==="allocation") return readAllocationGroupsV31(form);
    return readRowsBeforeV31(form,selector);
  };
  saveMultiAllocation = function saveMultiAllocation(e){
    e.preventDefault();
    const form=e.target, data=fd(form), proc=db.procurements.find(p=>p.id===+data.procId);
    if(!proc) return toast("Pengadaan tidak ditemukan.");
    if(!spmk(proc)) return toast("Alokasi hanya dapat diisi setelah SPMK.");
    if(!contractOk(proc)) return toast("Lengkapi Masa Pelaksanaan terlebih dahulu agar No PKS tersedia.");
    if(!can("Alokasi KPH","tambah")&&!isPic(STEPS[proc.currentStep])) return toast("Anda tidak dapat mengisi alokasi.");
    const rows=readAllocationGroupsV31(form);
    if(!rows.length) return toast("Minimal isi satu Satuan Kerja dan satu baris Barang pada tabel.");
    for(const r of rows){
      if(!r.satuanKerja||!r.termin||!r.tanggalMulai||!r.tanggalAkhir) return toast("Setiap Satuan Kerja wajib memiliki Nama Satuan Kerja, Termin, Tanggal Mulai, dan Tanggal Akhir.");
      if(!r.jenisBarang||!r.satuan||!r.tarif||!r.volume) return toast("Setiap baris tabel barang wajib memiliki Nama Barang, Satuan, Tarif, dan Volume Barang.");
      if(dateDiffV31(r.tanggalMulai,r.tanggalAkhir)<0) return toast("Tanggal akhir alokasi tidak boleh sebelum tanggal mulai.");
    }
    rows.forEach(r=>proc.allocations.push(alloc(proc.vendor,proc.contract.noPks,proc.contract.tanggalPks,r.termin,r.tanggalMulai,r.tanggalAkhir,r.satuanKerja,r.jenisBarang,r.satuan,r.tarif,r.volume,parseNumID(data.tahunPks)||new Date().getFullYear())));
    proc.totalUsulan=proc.allocations.reduce((a,b)=>a+(Number(b.volume)||0),0);
    proc.satuan=proc.allocations[0]?.satuan||proc.satuan||"Unit";
    proc.jenisBarang=namaBarangListV31(proc);
    save();
    const satkerCount=new Set(rows.map(r=>r.satuanKerja)).size;
    toast(`${numID(rows.length)} barang dari ${numID(satkerCount)} satuan kerja berhasil disimpan.`);
    modalOpenV31()?detail(proc.id):render();
  };
  allocation = function allocation(){
    const rows=vis().filter(spmk);
    return `<div class="help ok"><b>Alokasi KPH v31:</b> input barang sekarang berbentuk tabel dengan kolom Nama Barang, Satuan, Tarif, Volume Barang, Nilai otomatis, dan Aksi.</div><div class="card pad" style="margin-top:14px"><h2 style="margin-top:0">Form Alokasi Barang Per Satuan Kerja</h2>${can("Alokasi KPH","tambah")?multiAllocationForm(null,"allocMultiForm"):`<div class="help warn">Role Anda tidak dapat menambah alokasi.</div>`}</div><div class="head"><h2>Data Alokasi</h2></div>${allocTable(rows)}`;
  };
  function bindAllocationGroupsV31(){
    document.querySelectorAll('[data-add-allocation-group]').forEach(btn=>{btn.onclick=()=>{const form=btn.closest('form'), box=form.querySelector('[data-container="allocation"]'); box.insertAdjacentHTML('beforeend',allocationGroupTemplateV31()); bindMultiForms(); bindFormattedInputs(form); bindAllocationNilaiV31(form);};});
    document.querySelectorAll('[data-add-allocation-item]').forEach(btn=>{btn.onclick=()=>{const group=btn.closest('[data-allocation-group]'), box=group.querySelector('[data-allocation-items]'); box.insertAdjacentHTML('beforeend',allocationItemRowTemplateV31()); bindMultiForms(); bindFormattedInputs(group); bindAllocationNilaiV31(group);};});
    document.querySelectorAll('[data-remove-allocation-item]').forEach(btn=>{btn.onclick=()=>{const group=btn.closest('[data-allocation-group]'); if(group.querySelectorAll('.allocationItemRow').length<=1) return toast('Minimal satu barang pada setiap Satuan Kerja.'); btn.closest('.allocationItemRow')?.remove();};});
    document.querySelectorAll('[data-remove-allocation-group]').forEach(btn=>{btn.onclick=()=>{const wrap=btn.closest('.multiRows'); if(wrap&&wrap.querySelectorAll('[data-allocation-group]').length<=1) return toast('Minimal harus ada satu Satuan Kerja.'); btn.closest('[data-allocation-group]')?.remove();};});
    document.querySelectorAll('form[data-kind="allocation"] [data-proc-select]').forEach(sel=>{sel.onchange=()=>syncAllocationHeaderV31(sel.closest('form')); syncAllocationHeaderV31(sel.closest('form'));});
    bindAllocationNilaiV31(document);
  }
  const bindMultiFormsBeforeV31=bindMultiForms;
  bindMultiForms = function bindMultiForms(){
    try{bindMultiFormsBeforeV31();}catch(e){console.warn(e);}
    [["approvalAllocForm","allocation"],["allocMultiForm","allocation"]].forEach(([id])=>{const f=document.getElementById(id); if(f) f.onsubmit=saveMultiAllocation;});
    bindAllocationGroupsV31();
  };
  const bindPageBeforeV31=bindPage;
  bindPage = function bindPage(){
    try{bindPageBeforeV31();}catch(e){console.warn(e);}
    document.querySelectorAll('[data-delete-proc]').forEach(btn=>{btn.onclick=()=>deleteProcV31(+btn.dataset.deleteProc);});
    document.querySelectorAll('[data-contract]').forEach(btn=>{btn.onclick=()=>contract(+btn.dataset.contract);});
    bindContractForm();
    bindMultiForms();
  };
  const bindApprovalFormsBeforeV31=bindApprovalForms;
  bindApprovalForms = function bindApprovalForms(){
    try{bindApprovalFormsBeforeV31();}catch(e){console.warn(e);}
    bindContractForm();
    bindMultiForms();
  };
  try{
    window.deleteProcV31=deleteProcV31;
    window.procTable=procTable;
    window.masa=masa;
    window.contract=contract;
    window.contractForm=contractForm;
    window.refreshContractForm=refreshContractForm;
    window.bindContractForm=bindContractForm;
    window.multiAllocationForm=multiAllocationForm;
    window.allocationRowTemplate=allocationRowTemplate;
    window.saveMultiAllocation=saveMultiAllocation;
    window.allocation=allocation;
    window.bindMultiForms=bindMultiForms;
    window.bindPage=bindPage;
    window.bindApprovalForms=bindApprovalForms;
    render();
  }catch(e){console.error('Patch v31 gagal',e);}
})();
