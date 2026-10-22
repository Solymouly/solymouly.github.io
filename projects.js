/* =========================================================
   DAFTAR PROYEK — cukup edit file ini untuk menambah proyek
   ---------------------------------------------------------
   Cara menambah proyek baru:
   1. Salin salah satu blok { ... } di bawah.
   2. Tempel di dalam tanda [ ], pisahkan dengan koma.
   3. Ubah isinya, simpan, lalu refresh browser.

   Keterangan isian:
   id        : nama unik tanpa spasi, misalnya "toko-online"
   judul     : nama proyek
   jenis     : misalnya "Riset", "Proyek klien", "Tugas kuliah", "Proyek pribadi"
   tahun     : tahun pengerjaan
   status    : "Deployed" | "Selesai" | "Dalam pengerjaan" | "Diterima"
   kategori  : satu atau lebih dari "fullstack", "frontend"  (dipakai filter)
   warna     : warna sampul jika tidak ada gambar: "biru" | "navy" | "krem"
   gambar    : path screenshot, misalnya "img/toko.jpg" (kosongkan "" jika belum ada)
   ringkas   : 1–2 kalimat yang tampil di kartu
   detail    : poin-poin yang tampil saat kartu diklik
   tags      : teknologi yang dipakai
   link      : demo = link website/aplikasi, kode = link GitHub (kosongkan "" jika tidak ada)
   unggulan  : true agar tampil paling depan
   ========================================================= */

const PROJECTS = [
  /* ===== Proyek dari GitHub (github.com/Solymouly) ===== */
  {
    id: "fintrack-umkm",
    judul: "Fintrack UMKM",
    jenis: "Full stack web",
    tahun: 2026,
    status: "Selesai",
    kategori: ["fullstack"],
    warna: "krem",
    gambar: "",
    ringkas: "Aplikasi web pengelolaan keuangan untuk UMKM dengan autentikasi, manajemen transaksi, laporan PDF, dan panel admin.",
    detail: [
      "Login dan manajemen akun pengguna, termasuk alur lupa password",
      "Pencatatan transaksi pemasukan dan pengeluaran (CRUD) dengan dashboard",
      "Ekspor laporan transaksi ke PDF",
      "Panel admin untuk mengaktifkan akun dan menyetujui permintaan reset password"
    ],
    tags: ["Laravel", "PHP", "Tailwind CSS", "Bootstrap"],
    link: { demo: "", kode: "https://github.com/Solymouly/Fintrack-UMKM" },
    unggulan: true
  },
  {
    id: "event-registration",
    judul: "Event Registration Platform",
    jenis: "Full stack web",
    tahun: 2025,
    status: "Selesai",
    kategori: ["fullstack"],
    warna: "biru",
    gambar: "",
    ringkas: "Website pendaftaran acara dengan fitur sign-up, login, dan registrasi event.",
    detail: [
      "Sign-up dan login dengan autentikasi berbasis session",
      "Pendaftaran ke beberapa event dengan formulir terpisah",
      "Halaman profil dan daftar event yang sudah didaftarkan pengguna"
    ],
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    link: { demo: "", kode: "https://github.com/Solymouly/005-project-UTS-" },
    unggulan: false
  },
  {
    id: "inventory-app",
    judul: "Inventory Management App",
    jenis: "Web app",
    tahun: 2025,
    status: "Selesai",
    kategori: ["fullstack"],
    warna: "navy",
    gambar: "",
    ringkas: "Aplikasi CRUD untuk mengelola produk, stok, serta harga beli dan jual.",
    detail: [
      "Tambah, lihat, ubah, dan hapus data barang",
      "Menyimpan kategori, jumlah stok, harga beli, dan harga jual",
      "Akses database lewat Prisma ORM"
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "SQLite"],
    link: { demo: "", kode: "https://github.com/Solymouly/KuisFrontEnd" },
    unggulan: false
  },
  {
    id: "company-profile",
    judul: "Company Profile & Landing Pages",
    jenis: "Frontend web",
    tahun: 2025,
    status: "Selesai",
    kategori: ["frontend"],
    warna: "krem",
    gambar: "",
    ringkas: "Website company profile dan landing page yang responsif.",
    detail: [
      "Desain berbasis komponen dengan Next.js dan React",
      "Tampilan responsif untuk desktop dan mobile",
      "Memakai Tailwind CSS, Material UI, dan React Bootstrap"
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Material UI"],
    link: { demo: "", kode: "https://github.com/Solymouly/Company-Profile-Tugas" },
    unggulan: false
  },
  {
    id: "portfolio-website",
    judul: "Personal Portfolio Website",
    jenis: "Frontend web",
    tahun: 2026,
    status: "Deployed",
    kategori: ["frontend"],
    warna: "biru",
    gambar: "",
    ringkas: "Website portofolio pribadi yang responsif dengan animasi, di-deploy lewat GitHub Pages.",
    detail: [
      "Dibangun dengan Next.js, React, dan TypeScript",
      "Animasi halus dengan Framer Motion dan styling Tailwind CSS",
      "Di-deploy otomatis ke GitHub Pages"
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: { demo: "", kode: "https://github.com/Solymouly/portfolio-landing" },
    unggulan: false
  }

  /* ---- CONTOH PROYEK BARU: hapus baris ini dan baris penutup di bawah, lalu isi ----
  ,{
    id: "proyek-baru",
    judul: "Nama Proyek",
    jenis: "Proyek pribadi",
    tahun: 2026,
    status: "Deployed",
    kategori: ["fullstack"],
    warna: "krem",
    gambar: "img/proyek.jpg",
    ringkas: "Deskripsi singkat proyek.",
    detail: ["Poin pertama", "Poin kedua"],
    tags: ["HTML", "CSS", "JavaScript"],
    link: { demo: "https://...", kode: "https://github.com/..." },
    unggulan: false
  }
  ---- */
];

/* Nama tombol filter. Tambahkan di sini jika membuat kategori baru. */
const KATEGORI = {
  fullstack: "Full stack",
  frontend: "Frontend"
};