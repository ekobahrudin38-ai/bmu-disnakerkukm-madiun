# ⚠️ Solusi: Git Tidak Terinstall

## Error yang Anda Alami:
```
'git' is not recognized as an internal or external command,
operable program or batch file.
```

**Artinya:** Git belum terinstall atau belum terdaftar di PATH Windows.

---

## 🎯 SOLUSI 1: Install Git (Direkomendasikan)

### Langkah Install Git:

**1. Download Git**
- Buka browser
- Akses: https://git-scm.com/download/win
- Klik "Click here to download" atau "64-bit Git for Windows Setup"
- File akan terdownload (sekitar 50MB)

**2. Install Git**
```
1. Buka file yang didownload (Git-2.xx.x-64-bit.exe)
2. Klik "Next" beberapa kali (gunakan setting default)
3. PENTING: Pastikan centang "Git from the command line and also from 3rd-party software"
4. Klik "Next" sampai selesai
5. Klik "Finish"
```

**3. Restart Command Prompt**
```
1. Tutup Command Prompt yang sedang terbuka
2. Buka Command Prompt baru (Windows + R → cmd → Enter)
3. Test Git dengan ketik: git --version
```

**4. Jika Berhasil, Akan Muncul:**
```
git version 2.43.0.windows.1
```

**5. Lanjutkan Deploy:**
```bash
D:
cd DataBMU
git status
git add .
git commit -m "Fix mobile navigation"
git push origin main
```

---

## 🎯 SOLUSI 2: Gunakan GitHub Desktop (Lebih Mudah)

Jika tidak mau install Git via command line, gunakan GitHub Desktop (GUI).

### Langkah Install GitHub Desktop:

**1. Download GitHub Desktop**
- Buka: https://desktop.github.com/
- Klik "Download for Windows"
- File akan terdownload

**2. Install GitHub Desktop**
```
1. Buka file yang didownload
2. Tunggu proses install otomatis
3. Login dengan akun GitHub Anda
```

**3. Buka Project di GitHub Desktop**
```
1. Klik "File" → "Add local repository"
2. Pilih folder: D:\DataBMU
3. Klik "Add repository"
```

**4. Commit dan Push**
```
1. Anda akan melihat file yang berubah di sebelah kiri
2. Di bawah, ada kotak "Summary" → Ketik: Fix mobile navigation
3. Klik tombol biru "Commit to main"
4. Klik tombol "Push origin" di atas
```

**5. Tunggu Deploy**
```
Vercel akan otomatis deploy (2-3 menit)
```

---

## 🎯 SOLUSI 3: Gunakan Git Bash (Alternatif)

Jika Git sudah terinstall tapi tidak terdeteksi di CMD, gunakan Git Bash.

### Cara Buka Git Bash:

**Cara 1: Lewat File Explorer**
```
1. Buka File Explorer (Windows + E)
2. Masuk ke D:\DataBMU
3. Klik kanan di area kosong
4. Pilih "Git Bash Here"
```

**Cara 2: Lewat Start Menu**
```
1. Tekan Windows
2. Ketik: Git Bash
3. Klik "Git Bash"
4. Ketik: cd /d/DataBMU
```

**Lalu Jalankan Perintah:**
```bash
git status
git add .
git commit -m "Fix mobile navigation"
git push origin main
```

---

## 🎯 SOLUSI 4: Gunakan Kiro Terminal (Paling Mudah!)

Karena Anda sudah menggunakan Kiro (editor ini), gunakan terminal bawaan Kiro.

### Cara Buka Terminal di Kiro:

**1. Buka Terminal**
```
- Tekan: Ctrl + ` (backtick, tombol di sebelah kiri angka 1)
- Atau: Menu "Terminal" → "New Terminal"
```

**2. Pastikan Lokasi Benar**
```
Terminal akan otomatis membuka di folder project (D:\DataBMU)
```

**3. Jalankan Perintah Git:**
```bash
git status
git add .
git commit -m "Fix mobile navigation"
git push origin main
```

---

## ✅ REKOMENDASI SAYA

**Gunakan Terminal di Kiro (Solusi 4)** karena:
- ✅ Paling mudah
- ✅ Tidak perlu install apa-apa
- ✅ Sudah terintegrasi dengan editor
- ✅ Lokasi folder otomatis benar

### Cara Cepat:

**1. Di Kiro, tekan:** `Ctrl + ~` (atau Ctrl + backtick)

**2. Terminal akan muncul di bawah**

**3. Ketik perintah ini satu per satu:**
```bash
git status
```
```bash
git add .
```
```bash
git commit -m "Fix mobile navigation"
```
```bash
git push origin main
```

**4. Tunggu 2-3 menit untuk Vercel deploy**

**5. Test di HP dengan kode 0016**

---

## 🔍 CEK APAKAH GIT SUDAH TERINSTALL

### Test di Command Prompt:
```bash
git --version
```

**Jika Muncul:**
```
git version 2.43.0
```
**= Git sudah terinstall ✅**

**Jika Muncul:**
```
'git' is not recognized...
```
**= Git belum terinstall ❌ (Install dulu!)**

---

## 📋 LANGKAH SELANJUTNYA UNTUK ANDA

Berdasarkan screenshot Anda, saya sarankan:

### Opsi A: Gunakan Terminal Kiro (Tercepat)
```
1. Di Kiro, tekan Ctrl + `
2. Ketik: git status
3. Jika berhasil, lanjut deploy
4. Jika error, pilih Opsi B
```

### Opsi B: Install Git Dulu
```
1. Download: https://git-scm.com/download/win
2. Install dengan setting default
3. Restart Command Prompt
4. Test: git --version
5. Lanjut deploy
```

### Opsi C: Gunakan GitHub Desktop
```
1. Download: https://desktop.github.com/
2. Install dan login
3. Add repository: D:\DataBMU
4. Commit dan push lewat GUI
```

---

## 💡 TIPS

**Jika Anda sudah pernah push ke GitHub sebelumnya:**
- Git pasti sudah terinstall
- Mungkin hanya perlu restart Command Prompt
- Atau gunakan Git Bash / Terminal Kiro

**Jika ini pertama kali:**
- Install Git dulu (Opsi B)
- Atau gunakan GitHub Desktop (lebih mudah untuk pemula)

---

## 🆘 BANTUAN CEPAT

**Saya di Kiro sekarang, mau coba Terminal Kiro:**
```
Tekan: Ctrl + `
Ketik: git status
```

**Saya mau install Git:**
```
Download: https://git-scm.com/download/win
Install → Next → Next → Finish
Restart CMD
```

**Saya mau pakai GitHub Desktop:**
```
Download: https://desktop.github.com/
Install → Login → Add repo → Commit → Push
```

---

**Pilih salah satu solusi di atas, lalu lanjutkan deploy!** 🚀

Mana yang mau Anda coba? Saya rekomendasikan **Terminal Kiro** (Ctrl + `) karena paling cepat!
