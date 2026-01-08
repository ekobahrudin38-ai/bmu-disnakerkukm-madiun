# 🎯 Langkah Demi Langkah Deploy Perbaikan Mobile

## Panduan Interaktif untuk Pemula

---

## 📍 ANDA SEKARANG DI SINI

Anda baru saja memperbaiki kode untuk mobile navigation. Sekarang kode tersebut ada di komputer Anda (lokal), dan perlu dipindahkan ke internet (deploy) agar website yang sudah online bisa menggunakan perbaikan ini.

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  KOMPUTER ANDA          →         INTERNET         │
│  (Kode Baru)                    (Website Online)   │
│                                                     │
│  Kode sudah              →      Kode masih lama    │
│  diperbaiki                     (belum update)     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**TUJUAN:** Memindahkan kode baru dari komputer Anda ke internet.

---

## 🔍 LANGKAH 0: PERSIAPAN (Cek Dulu!)

### A. Pastikan Anda Punya Akses

**1. Akses ke Folder Project**
- Anda tahu di mana folder project BMU disimpan?
- Contoh lokasi: `C:\Users\NamaAnda\Documents\bmu-disnaker`

**2. Akses ke GitHub**
- Anda punya akun GitHub?
- Anda tahu username dan password GitHub?

**3. Akses ke Vercel**
- Anda punya akun Vercel?
- Anda tahu username dan password Vercel?

**Jika semua ✅, lanjut ke Langkah 1!**

---

## 📂 LANGKAH 1: BUKA FOLDER PROJECT

### Cara 1: Lewat File Explorer (Mudah)

**Windows:**
```
1. Buka File Explorer (tekan Windows + E)
2. Cari folder project Anda
   Contoh: C:\Users\NamaAnda\Documents\bmu-disnaker
3. Klik kanan di dalam folder (area kosong)
4. Pilih "Open in Terminal" atau "Git Bash Here"
```

**Mac:**
```
1. Buka Finder
2. Cari folder project Anda
3. Klik kanan folder
4. Pilih "New Terminal at Folder"
```

### Cara 2: Lewat Command Prompt (Manual)

**Windows:**
```
1. Tekan Windows + R
2. Ketik: cmd
3. Tekan Enter
4. Ketik: cd C:\Users\NamaAnda\Documents\bmu-disnaker
   (Ganti dengan lokasi folder Anda)
5. Tekan Enter
```

**Mac/Linux:**
```
1. Tekan Cmd + Space
2. Ketik: terminal
3. Tekan Enter
4. Ketik: cd ~/Documents/bmu-disnaker
   (Ganti dengan lokasi folder Anda)
5. Tekan Enter
```

### ✅ Cara Tahu Sudah Benar?

Setelah masuk folder, ketik:
```bash
dir
```
(Windows) atau
```bash
ls
```
(Mac/Linux)

**Anda harus melihat file-file ini:**
```
bmu-index.html
bmu-script.js
bmu-styles.css
bmu-login.html
package.json
vercel.json
... dan file lainnya
```

**Jika file-file ini muncul = ✅ BENAR!**

---

## 🔍 LANGKAH 2: CEK STATUS FILE

### Ketik Perintah Ini:
```bash
git status
```

### Apa yang Akan Muncul?

**Tampilan Normal (Baik):**
```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   bmu-index.html
        modified:   bmu-script.js
        modified:   bmu-styles.css

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        PERBAIKAN-MOBILE-NAVIGATION.md
        PANDUAN-DEPLOY-PERBAIKAN-MOBILE.md
        CARA-CEPAT-DEPLOY-MOBILE-FIX.md
        PANDUAN-VISUAL-DEPLOY-MOBILE.md

no changes added to commit (use "git add" and/or "git commit -a")
```

### 📖 Penjelasan:

**"modified:"** = File yang sudah ada dan diubah
- `bmu-index.html` → File HTML diperbaiki
- `bmu-script.js` → File JavaScript diperbaiki
- `bmu-styles.css` → File CSS diperbaiki

**"Untracked files:"** = File baru yang belum pernah di-commit
- File-file panduan yang baru dibuat

### ✅ Ini Artinya:
- Git mendeteksi ada perubahan ✅
- File siap untuk di-commit ✅
- Tidak ada error ✅

**Jika muncul seperti ini = LANJUT KE LANGKAH 3!**

---

## ➕ LANGKAH 3: TAMBAHKAN FILE KE GIT

### Apa yang Akan Kita Lakukan?

Kita akan memberitahu Git: "Saya mau simpan semua perubahan ini!"

### Ketik Perintah Ini:
```bash
git add .
```

### 📖 Penjelasan Perintah:

- `git` = Program Git
- `add` = Tambahkan file
- `.` = Semua file yang berubah (titik = semua)

### Apa yang Terjadi?

**Tidak ada output = BERHASIL!** ✅

Git diam saja artinya perintah berhasil. Jika ada error, Git akan bilang.

### Cek Apakah Berhasil:

Ketik lagi:
```bash
git status
```

**Sekarang akan muncul:**
```
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   bmu-index.html
        modified:   bmu-script.js
        modified:   bmu-styles.css
        new file:   PERBAIKAN-MOBILE-NAVIGATION.md
        new file:   PANDUAN-DEPLOY-PERBAIKAN-MOBILE.md
        new file:   CARA-CEPAT-DEPLOY-MOBILE-FIX.md
        new file:   PANDUAN-VISUAL-DEPLOY-MOBILE.md
```

### ✅ Perhatikan Perubahan:

**Sebelum:** "Changes not staged for commit" (belum siap)
**Sesudah:** "Changes to be committed" (sudah siap!)

**Warna di terminal:**
- Merah = Belum di-add
- Hijau = Sudah di-add ✅

**Jika sudah hijau = LANJUT KE LANGKAH 4!**

---

## 💾 LANGKAH 4: COMMIT PERUBAHAN

### Apa yang Akan Kita Lakukan?

Kita akan "menyimpan" perubahan dengan pesan/catatan apa yang kita ubah.

### Ketik Perintah Ini:
```bash
git commit -m "Fix: Perbaikan navigasi mobile untuk handphone"
```

### 📖 Penjelasan Perintah:

- `git commit` = Simpan perubahan
- `-m` = Dengan pesan (message)
- `"Fix: ..."` = Pesan yang menjelaskan apa yang diubah

### Apa yang Akan Muncul?

```
[main abc1234] Fix: Perbaikan navigasi mobile untuk handphone
 7 files changed, 450 insertions(+), 120 deletions(-)
 create mode 100644 PERBAIKAN-MOBILE-NAVIGATION.md
 create mode 100644 PANDUAN-DEPLOY-PERBAIKAN-MOBILE.md
 create mode 100644 CARA-CEPAT-DEPLOY-MOBILE-FIX.md
 create mode 100644 PANDUAN-VISUAL-DEPLOY-MOBILE.md
```

### 📖 Penjelasan Output:

- `[main abc1234]` = Commit ID (kode unik)
- `7 files changed` = 7 file berubah
- `450 insertions(+)` = 450 baris ditambah
- `120 deletions(-)` = 120 baris dihapus
- `create mode 100644` = File baru dibuat

### ✅ Ini Artinya:

- Perubahan sudah disimpan di Git lokal ✅
- Commit berhasil ✅
- Siap untuk di-push ke GitHub ✅

**Jika muncul seperti ini = LANJUT KE LANGKAH 5!**

---

## 🚀 LANGKAH 5: PUSH KE GITHUB

### Apa yang Akan Kita Lakukan?

Kita akan mengirim perubahan dari komputer kita ke GitHub (cloud).

```
┌─────────────────────────────────────────┐
│  KOMPUTER ANDA    →    GITHUB (Cloud)   │
│  (Git Lokal)          (Git Remote)      │
└─────────────────────────────────────────┘
```

### Ketik Perintah Ini:
```bash
git push origin main
```

**CATATAN:** Jika branch Anda `master`, gunakan:
```bash
git push origin master
```

### 📖 Penjelasan Perintah:

- `git push` = Kirim perubahan
- `origin` = Nama remote (GitHub)
- `main` = Nama branch

### Apa yang Akan Muncul?

**Jika Diminta Login:**
```
Username for 'https://github.com': [ketik username Anda]
Password for 'https://[username]@github.com': [ketik password/token]
```

**Setelah Login, Proses Push:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 8.45 KiB | 8.45 MiB/s, done.
Total 10 (delta 6), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (6/6), completed with 4 local objects.
To https://github.com/username/bmu-disnaker.git
   abc1234..def5678  main -> main
```

### 📖 Penjelasan Output:

- `Enumerating objects` = Menghitung file
- `Compressing objects` = Mengompres file
- `Writing objects` = Mengirim file
- `main -> main` = Berhasil push ke branch main ✅

### ✅ Ini Artinya:

- Perubahan sudah di GitHub ✅
- Vercel akan otomatis mendeteksi ✅
- Deploy akan dimulai otomatis ✅

**Jika muncul seperti ini = LANJUT KE LANGKAH 6!**

---

## ⏳ LANGKAH 6: TUNGGU VERCEL DEPLOY

### Apa yang Terjadi Sekarang?

Vercel akan otomatis:
1. Mendeteksi perubahan di GitHub
2. Download kode baru
3. Build aplikasi
4. Deploy ke production

**Proses ini memakan waktu 2-3 menit.**

### Cara Memantau Deploy:

**1. Buka Browser**

**2. Akses Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**3. Login** dengan akun Anda

**4. Pilih Project** BMU DisnakerKUKM

**5. Lihat Tab "Deployments"**

### Status yang Akan Anda Lihat:

**Status 1: Building (Sedang Proses)**
```
┌────────────────────────────────────┐
│  ● Building...                     │
│  Started 10 seconds ago            │
│  Estimated time: 2 minutes         │
└────────────────────────────────────┘
```
**Artinya:** Vercel sedang build aplikasi. **TUNGGU!**

**Status 2: Ready (Selesai)**
```
┌────────────────────────────────────┐
│  ✅ Ready                          │
│  Deployed 1 minute ago             │
│  Production                        │
└────────────────────────────────────┘
```
**Artinya:** Deploy berhasil! **LANJUT TEST!**

**Status 3: Error (Gagal)**
```
┌────────────────────────────────────┐
│  ❌ Failed                         │
│  Build failed                      │
│  View logs                         │
└────────────────────────────────────┘
```
**Artinya:** Ada error. **LIHAT LOG ERROR!**

### ✅ Jika Status "Ready":

**LANJUT KE LANGKAH 7 - TEST DI HANDPHONE!**

---

## 📱 LANGKAH 7: TEST DI HANDPHONE

### A. Persiapan

**1. Ambil Handphone Anda**

**2. Buka Browser:**
- Chrome (Android)
- Safari (iOS)
- Firefox
- Atau browser lainnya

**3. Pastikan Koneksi Internet Aktif**

### B. Akses Website

**Ketik URL Website Anda:**
```
https://[nama-project-anda].vercel.app/bmu-login.html
```

**Contoh:**
```
https://bmu-disnaker-kukm.vercel.app/bmu-login.html
```

**Cara Tahu URL Anda:**
1. Buka Vercel dashboard
2. Klik project Anda
3. Lihat "Domains" di bagian atas
4. Copy URL tersebut

### C. Login

**Halaman Login Akan Muncul:**
```
┌─────────────────────────────────┐
│  Database BMU DisnakerKUKM      │
│  Kota Madiun                    │
│                                 │
│  Masukkan Kode Akses:           │
│  ┌───────────────────────────┐  │
│  │ [Ketik: 0016]             │  │
│  └───────────────────────────┘  │
│                                 │
│  [      Masuk      ]            │
└─────────────────────────────────┘
```

**Ketik:** `0016`
**Tap:** Tombol "Masuk"

### D. Test Menu Navigasi

**Setelah Login, Anda Akan Melihat Dashboard:**

**1. Lihat Tombol Menu di Kiri Atas:**
```
┌─────────────────────────────────┐
│  ☰  Database BMU DisnakerKUKM   │  ← Tap ini!
└─────────────────────────────────┘
```

**2. Tap Tombol Hamburger (☰)**

**3. Menu Akan Muncul dari Kiri:**
```
┌─────────────────────────────────┐
│  📊 Dashboard                   │
│  🏷️ Jenis Bantuan               │
│  🏢 Data IKM Binaan             │
│  🔍 Pencarian Data              │
│  🗑️ Recycle Bin                 │
│  📋 Laporan                     │
│  ⚙️ Pengaturan                  │
│                                 │
│  🚪 Logout                      │
└─────────────────────────────────┘
```

### E. Test Setiap Menu

**TEST 1: Dashboard**
```
1. Tap "📊 Dashboard"
2. Menu harus tertutup otomatis
3. Lihat data statistik:
   - Total IKM Binaan: [angka]
   - Jenis Bantuan: [angka]
   - Tahun Aktif: 2026
   - Recycle Bin: [angka]
```
**✅ Jika angka muncul = BERHASIL!**

**TEST 2: Jenis Bantuan**
```
1. Buka menu lagi (☰)
2. Tap "🏷️ Jenis Bantuan"
3. Menu harus tertutup otomatis
4. Lihat tabel jenis bantuan
```
**✅ Jika tabel muncul = BERHASIL!**

**TEST 3: Data IKM Binaan**
```
1. Buka menu lagi (☰)
2. Tap "🏢 Data IKM Binaan"
3. Menu harus tertutup otomatis
4. Lihat tabel data IKM
```
**✅ Jika tabel muncul = BERHASIL!**

**TEST 4: Pencarian Data**
```
1. Buka menu lagi (☰)
2. Tap "🔍 Pencarian Data"
3. Menu harus tertutup otomatis
4. Lihat form pencarian
```
**✅ Jika form muncul = BERHASIL!**

**TEST 5: Recycle Bin**
```
1. Buka menu lagi (☰)
2. Tap "🗑️ Recycle Bin"
3. Menu harus tertutup otomatis
4. Lihat tabel recycle bin
```
**✅ Jika tabel muncul = BERHASIL!**

### F. Test Fitur Tambahan

**TEST 6: Overlay**
```
1. Buka menu (☰)
2. Tap area gelap di luar menu
3. Menu harus tertutup
```
**✅ Jika menu tertutup = BERHASIL!**

**TEST 7: Touch Feedback**
```
1. Buka menu (☰)
2. Tap dan tahan menu item
3. Harus ada efek visual (opacity berubah)
```
**✅ Jika ada efek = BERHASIL!**

**TEST 8: Scroll Lock**
```
1. Buka menu (☰)
2. Coba scroll halaman
3. Halaman tidak boleh bisa di-scroll
4. Tutup menu
5. Sekarang halaman bisa di-scroll lagi
```
**✅ Jika scroll lock berfungsi = BERHASIL!**

---

## ✅ LANGKAH 8: VERIFIKASI FINAL

### Checklist Lengkap:

```
DEPLOY:
□ Git status menampilkan file yang berubah
□ Git add berhasil (tidak ada error)
□ Git commit berhasil (ada konfirmasi)
□ Git push berhasil (tidak ada error)
□ Vercel dashboard status "Ready"

AKSES:
□ Website bisa dibuka di HP
□ Login dengan kode 0016 berhasil
□ Halaman dashboard muncul

NAVIGASI:
□ Tombol menu (☰) bisa dibuka
□ Menu muncul dari kiri
□ Setiap menu item bisa di-tap
□ Menu tertutup otomatis setelah pilih

DATA:
□ Dashboard: Statistik muncul
□ Jenis Bantuan: Tabel muncul
□ Data IKM: Tabel muncul
□ Pencarian: Form muncul
□ Recycle Bin: Tabel muncul

FITUR:
□ Overlay berfungsi (tap area gelap)
□ Touch feedback ada
□ Scroll lock berfungsi
□ Tidak ada error di console
```

### Jika Semua ✅:

```
┌─────────────────────────────────────────┐
│                                         │
│  🎉 SELAMAT! DEPLOY BERHASIL! 🎉       │
│                                         │
│  ✅ Website mobile-friendly             │
│  ✅ Menu navigasi berfungsi sempurna    │
│  ✅ Data muncul dengan benar            │
│  ✅ Kode 0016 tetap berfungsi           │
│  ✅ Production ready!                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 TROUBLESHOOTING

### Masalah 1: "git push rejected"

**Error yang Muncul:**
```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/...'
```

**Penyebab:**
Ada perubahan di GitHub yang belum Anda download.

**Solusi:**
```bash
# Download perubahan dari GitHub
git pull origin main --rebase

# Push lagi
git push origin main
```

---

### Masalah 2: "Vercel build failed"

**Error yang Muncul:**
Status di Vercel: ❌ Failed

**Solusi:**

**1. Lihat Log Error:**
```
- Klik deployment yang failed
- Klik "View Build Logs"
- Cari baris yang ada "Error:"
- Screenshot error tersebut
```

**2. Error Umum:**

**Error: "Module not found"**
```bash
# Install dependencies
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push origin main
```

**Error: "Syntax error"**
```
- Cek file yang error
- Perbaiki syntax
- Commit dan push lagi
```

---

### Masalah 3: "Perubahan tidak muncul di website"

**Penyebab:**
Browser cache masih menyimpan versi lama.

**Solusi:**

**Di HP (Chrome):**
```
1. Tap titik tiga (⋮) di kanan atas
2. Tap "Settings"
3. Tap "Privacy and security"
4. Tap "Clear browsing data"
5. Centang "Cached images and files"
6. Tap "Clear data"
7. Buka website lagi
```

**Di HP (Safari):**
```
1. Buka Settings (Pengaturan)
2. Scroll ke bawah, tap "Safari"
3. Tap "Clear History and Website Data"
4. Tap "Clear History and Data"
5. Buka website lagi
```

**Cara Cepat:**
```
Buka website di mode Incognito/Private:
- Chrome: Tap titik tiga → "New incognito tab"
- Safari: Tap tab icon → "Private"
```

---

### Masalah 4: "Menu masih tidak berfungsi"

**Solusi:**

**1. Hard Refresh:**
```
- Tutup browser sepenuhnya (swipe dari recent apps)
- Buka browser lagi
- Akses website
```

**2. Cek Console Error:**
```
- Buka Chrome di HP
- Akses website
- Tap titik tiga (⋮)
- Centang "Desktop site"
- Tap titik tiga lagi → "More tools" → "Developer tools"
- Lihat tab "Console"
- Screenshot error yang muncul
```

**3. Tunggu Lebih Lama:**
```
- Deploy mungkin belum selesai sepenuhnya
- Tunggu 5-10 menit
- Clear cache
- Coba lagi
```

---

## 📞 BANTUAN LEBIH LANJUT

### Jika Masih Ada Masalah:

**1. Kumpulkan Informasi:**
```
□ Screenshot error (jika ada)
□ Device: [Merk & model HP]
□ Browser: [Chrome/Safari/dll]
□ OS: [Android/iOS versi berapa]
□ Langkah yang menyebabkan error
```

**2. Cek Log:**
```
□ Vercel deployment log
□ Browser console log
□ Network tab (untuk cek request failed)
```

**3. File Dokumentasi:**
```
□ PERBAIKAN-MOBILE-NAVIGATION.md
□ TROUBLESHOOTING-DEPLOY.md
□ QUICK-FIX-COMMON-ISSUES.md
```

---

## 🎓 PENJELASAN TEKNIS (Opsional)

### Apa yang Terjadi di Balik Layar?

**1. Git Add:**
```
Menandai file yang akan di-commit
File masuk ke "staging area"
```

**2. Git Commit:**
```
Menyimpan snapshot perubahan
Membuat commit ID unik
Menyimpan di Git lokal
```

**3. Git Push:**
```
Mengirim commit ke GitHub
GitHub menerima dan menyimpan
Trigger webhook ke Vercel
```

**4. Vercel Deploy:**
```
Vercel menerima notifikasi dari GitHub
Download kode terbaru
Install dependencies (npm install)
Build aplikasi
Deploy ke CDN global
Update DNS
Website live dengan kode baru
```

**5. Browser Access:**
```
User akses website
CDN serve file terbaru
Browser download dan render
User lihat perubahan
```

---

## 📊 MONITORING

### Hal yang Perlu Dipantau:

**1. Performa:**
```
□ Loading time < 3 detik
□ Menu responsif
□ Data muncul cepat
□ Tidak ada lag
```

**2. Kompatibilitas:**
```
□ Test di Chrome (Android)
□ Test di Safari (iOS)
□ Test di berbagai ukuran layar
□ Test di tablet
```

**3. Fungsionalitas:**
```
□ Semua menu berfungsi
□ Data muncul benar
□ Form input berfungsi
□ Button action berfungsi
```

---

## 🎉 SELAMAT!

Anda telah berhasil:
- ✅ Memahami proses deploy
- ✅ Menggunakan Git dengan benar
- ✅ Deploy ke production
- ✅ Test di mobile
- ✅ Verifikasi semua fitur

**Website BMU DisnakerKUKM Anda sekarang mobile-friendly!** 📱

---

**Dibuat:** 8 Januari 2026
**Versi:** 1.1 (Mobile Navigation Fix)
**Status:** Production Ready ✅
