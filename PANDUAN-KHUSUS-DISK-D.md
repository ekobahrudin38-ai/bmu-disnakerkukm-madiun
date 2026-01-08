# 🎯 Panduan Khusus untuk File di Disk D:

## Untuk Project BMU DisnakerKUKM di Local Disk (D:)

---

## 📍 LOKASI FILE ANDA

File project Anda ada di **Local Disk (D:)**

Kemungkinan lokasi lengkapnya:
```
D:\bmu-disnaker
atau
D:\Projects\bmu-disnaker
atau
D:\Documents\bmu-disnaker
atau
D:\[nama-folder-lain]\bmu-disnaker
```

---

## 🚀 LANGKAH CEPAT (Copy-Paste Langsung!)

### 1️⃣ Buka Command Prompt

**Cara 1 (Paling Mudah):**
```
1. Buka File Explorer (Windows + E)
2. Klik "This PC" atau "Computer"
3. Klik "Local Disk (D:)"
4. Cari folder project Anda (bmu-disnaker atau nama lainnya)
5. Klik kanan di dalam folder (area kosong)
6. Pilih "Open in Terminal" atau "Git Bash Here"
```

**Cara 2 (Manual):**
```
1. Tekan Windows + R
2. Ketik: cmd
3. Tekan Enter
```

### 2️⃣ Masuk ke Disk D:

Ketik perintah ini di Command Prompt:

```bash
D:
```

Tekan Enter. Sekarang Anda di Disk D:

```
D:\>_
```

### 3️⃣ Masuk ke Folder Project

**Jika folder langsung di D:\bmu-disnaker:**
```bash
cd bmu-disnaker
```

**Jika folder di D:\Projects\bmu-disnaker:**
```bash
cd Projects\bmu-disnaker
```

**Jika folder di D:\Documents\bmu-disnaker:**
```bash
cd Documents\bmu-disnaker
```

**Jika tidak tahu lokasi pastinya:**
```bash
dir /s /b bmu-disnaker
```
Perintah ini akan mencari folder bmu-disnaker di seluruh Disk D:

### 4️⃣ Cek Sudah Benar Belum

Ketik:
```bash
dir
```

Anda harus melihat file-file ini:
```
bmu-index.html
bmu-script.js
bmu-styles.css
bmu-login.html
package.json
vercel.json
```

**Jika file-file ini muncul = ✅ BENAR! Lanjut ke langkah 5!**

### 5️⃣ Cek Status Git

```bash
git status
```

Anda akan melihat file yang berubah:
```
modified:   bmu-index.html
modified:   bmu-script.js
modified:   bmu-styles.css
```

### 6️⃣ Tambahkan File

```bash
git add .
```

### 7️⃣ Commit

```bash
git commit -m "Fix: Perbaikan navigasi mobile untuk handphone"
```

### 8️⃣ Push ke GitHub

```bash
git push origin main
```

**Jika branch Anda `master`:**
```bash
git push origin master
```

### 9️⃣ Tunggu Deploy (2-3 menit)

Buka browser, akses:
```
https://vercel.com/dashboard
```

Tunggu hingga status "Ready" ✅

### 🔟 Test di Handphone

1. Buka browser di HP
2. Akses website Anda
3. Login dengan kode **0016**
4. Test menu → Data harus muncul! ✅

---

## 📋 CONTOH LENGKAP (Copy-Paste Semua!)

Berikut perintah lengkap yang bisa Anda copy-paste satu per satu:

```bash
# 1. Pindah ke Disk D:
D:

# 2. Masuk ke folder project (sesuaikan dengan lokasi Anda)
cd bmu-disnaker

# 3. Cek lokasi sudah benar
dir

# 4. Cek status Git
git status

# 5. Tambah semua file
git add .

# 6. Commit dengan pesan
git commit -m "Fix: Perbaikan navigasi mobile untuk handphone"

# 7. Push ke GitHub
git push origin main
```

---

## 🔍 CARA MENCARI LOKASI FOLDER YANG TEPAT

### Jika Tidak Tahu Lokasi Pastinya:

**Cara 1: Lewat File Explorer**
```
1. Buka File Explorer (Windows + E)
2. Klik "Local Disk (D:)"
3. Di kotak pencarian (kanan atas), ketik: bmu-disnaker
4. Tunggu hasil pencarian
5. Klik kanan folder yang ditemukan
6. Pilih "Properties"
7. Lihat "Location:" → Itu lokasi lengkapnya
```

**Cara 2: Lewat Command Prompt**
```bash
# Pindah ke D:
D:

# Cari folder bmu-disnaker
dir /s /b bmu-disnaker

# Hasilnya akan menampilkan lokasi lengkap, contoh:
# D:\Projects\bmu-disnaker
# atau
# D:\bmu-disnaker
```

**Cara 3: Lewat Kiro (Editor Anda)**
```
1. Lihat di bagian bawah Kiro
2. Ada path lengkap folder yang sedang dibuka
3. Copy path tersebut
```

---

## 💡 TIPS PENTING

### Jika Folder Ada di Subfolder:

**Contoh: D:\Projects\Web\bmu-disnaker**
```bash
D:
cd Projects\Web\bmu-disnaker
```

**Contoh: D:\Documents\Kerja\BMU\bmu-disnaker**
```bash
D:
cd Documents\Kerja\BMU\bmu-disnaker
```

### Jika Nama Folder Ada Spasi:

**Contoh: D:\My Projects\bmu-disnaker**
```bash
D:
cd "My Projects\bmu-disnaker"
```
**Catatan:** Gunakan tanda kutip (") jika ada spasi!

---

## 🎯 VERIFIKASI LOKASI YANG BENAR

Setelah masuk folder, ketik:
```bash
dir
```

**Anda HARUS melihat file-file ini:**
```
Directory of D:\[lokasi-folder]\bmu-disnaker

08/01/2026  10:00    <DIR>          .
08/01/2026  10:00    <DIR>          ..
08/01/2026  09:30             1,234 .env
08/01/2026  09:30               456 .gitignore
08/01/2026  10:15            12,345 bmu-index.html
08/01/2026  10:15            45,678 bmu-script.js
08/01/2026  10:15            23,456 bmu-styles.css
08/01/2026  09:30             3,456 bmu-login.html
08/01/2026  09:30               789 package.json
08/01/2026  09:30               234 vercel.json
... dan file lainnya
```

**Jika file-file ini muncul = ✅ LOKASI BENAR!**

---

## 🔧 TROUBLESHOOTING KHUSUS DISK D:

### Error: "The system cannot find the path specified"

**Penyebab:** Lokasi folder salah

**Solusi:**
```bash
# Cari dulu lokasi yang benar
D:
dir /s /b bmu-disnaker

# Setelah ketemu, masuk ke folder tersebut
cd [hasil-pencarian]
```

### Error: "D: is not recognized"

**Penyebab:** Disk D: tidak ada atau tidak terdeteksi

**Solusi:**
```
1. Buka File Explorer
2. Cek apakah Disk D: ada
3. Jika tidak ada, mungkin file Anda di Disk C: atau E:
4. Ganti perintah sesuai disk yang benar
```

### Error: "Access is denied"

**Penyebab:** Tidak punya permission

**Solusi:**
```
1. Klik kanan Command Prompt
2. Pilih "Run as administrator"
3. Ulangi perintah
```

---

## 📱 SETELAH PUSH, TEST DI HP

### Langkah Test:

**1. Tunggu Deploy Selesai (2-3 menit)**
```
Cek di: https://vercel.com/dashboard
Status harus: ✅ Ready
```

**2. Buka Website di HP**
```
URL: https://[nama-project].vercel.app/bmu-login.html
```

**3. Login**
```
Kode: 0016
```

**4. Test Menu**
```
Tap menu (☰) → Pilih menu → Data harus muncul ✅
```

---

## ✅ CHECKLIST LENGKAP

```
PERSIAPAN:
□ Sudah tahu lokasi folder di Disk D:
□ Command Prompt sudah dibuka
□ Sudah masuk ke Disk D: (ketik: D:)
□ Sudah masuk ke folder project
□ File-file project terlihat (ketik: dir)

GIT COMMANDS:
□ git status → File yang berubah terlihat
□ git add . → Tidak ada error
□ git commit → Ada konfirmasi
□ git push → Tidak ada error

VERCEL:
□ Dashboard Vercel dibuka
□ Status deploy: Ready ✅
□ Tidak ada error

TEST HP:
□ Website bisa dibuka
□ Login berhasil (kode 0016)
□ Menu bisa dibuka (☰)
□ Data muncul saat klik menu
```

---

## 🎉 SELESAI!

Jika semua checklist ✅, maka:
- Deploy berhasil! 🚀
- Website mobile-friendly! 📱
- Menu navigasi berfungsi sempurna! ✨

---

## 📞 BANTUAN CEPAT

### Jika Masih Bingung:

**Screenshot ini dan kirim:**
1. Hasil perintah `dir` di folder project
2. Hasil perintah `git status`
3. Error message (jika ada)

**Atau coba:**
```bash
# Tampilkan lokasi folder saat ini
cd

# Tampilkan isi folder
dir

# Tampilkan path lengkap
echo %cd%
```

---

**Dibuat khusus untuk file di Local Disk (D:)**
**Tanggal:** 8 Januari 2026
**Status:** Ready to Deploy ✅
