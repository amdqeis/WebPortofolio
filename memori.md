# Memori Implementasi

## 2026-07-15 — Dark/Light Mode dan Parallax

- Stack terverifikasi: Next.js 16.2.4 App Router, React 19.2.4, Tailwind CSS 4,
  dan Framer Motion 12.38.0.
- Tema tetap menggunakan nama `coffee` dan `dark-coffee`, disimpan pada
  `localStorage` dengan key `portfolio-theme`, serta diinisialisasi sebelum
  hydration melalui script di `app/layout.tsx` untuk mencegah flash tema.
- Transisi tema ditingkatkan dengan interpolasi CSS custom properties selama
  480ms, circular reveal 560ms dari posisi tombol, dan animasi icon/orbit.
- Parallax reusable tiga layer ditambahkan ke `MotionSection`; hero dan panel
  project memakai layer dengan arah/kecepatan berbeda.
- Intensitas parallax layar di bawah 768px diperkecil menjadi 45%. Seluruh
  animasi scroll dan reveal dinonaktifkan/disederhanakan saat
  `prefers-reduced-motion: reduce` aktif.
- Validasi: `npm run lint` berhasil dan `npm run build` berhasil. Build pertama
  gagal karena sandbox tidak dapat mengambil Google Fonts; build dengan akses
  jaringan berhasil tanpa error aplikasi.
