# 🚀 Perintah Deploy Siap Pakai

## Untuk Repository: ekobahrudin38-ai/bmu-disnakerkukm-madiun

---

## ✅ COPY-PASTE PERINTAH INI SATU PER SATU

Buka Command Prompt di `D:\DataBMU`, lalu ketik perintah ini **satu per satu**:

### 1️⃣ Inisialisasi Git Repository
```bash
git init
```

**Akan muncul:**
```
Initialized empty Git repository in D:/DataBMU/.git/
```
✅ Bagus! Lanjut ke perintah berikutnya.

---

### 2️⃣ Tambahkan Remote GitHub
```bash
git remote add origin https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun.git
```

**Tidak ada output = Berhasil!** ✅

---

### 3️⃣ Cek Remote Sudah Benar
```bash
git remote -v
```

**Akan muncul:**
```
origin  https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun.git (fetch)
origin  https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun.git (push)
```
✅ Bagus! Lanjut.

---

### 4️⃣ Tambahkan Semua File
```bash
git add .
```

**Tidak ada output = Berhasil!** ✅

---

### 5️⃣ Commit Perubahan
```bash
git commit -m "Fix: Perbaikan navigasi mobile untuk handphone"
```

**Akan muncul:**
```
[main (root-commit) abc1234] Fix: Perbaikan navigasi mobile untuk handphone
 71 files changed, 15000 insertions(+)
 create mode 100644 bmu-index.html
 create mode 100644 bmu-script.js
 ...
```
✅ Bagus! Lanjut.

---

### 6️⃣ Set Branch ke Main
```bash
git branch -M main
```

**Tidak ada output = Berhasil!** ✅

---

### 7️⃣ Push ke GitHub
```bash
git push -u origin main
```

**Akan muncul salah satu dari ini:**

**A. Jika Berhasil Langsung:**
```
Enumerating objects: 100, done.
Counting objects: 100% (100/100), done.
...
To https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun.git
 * [new branch]      main -> main
```
✅ **BERHASIL! Lanjut ke langkah 8!**

**B. Jika Diminta Login:**
```
Username for 'https://github.com': 
```
Ketik: `ekobahrudin38-ai`
Tekan Enter

```
Password for 'https://ekobahrudin38-ai@github.com':
```
**PENTING:** Jangan ketik password GitHub biasa!
Gunakan **Personal Access Token** (lihat cara buat di bawah)

---

## 🔑 CARA BUAT PERSONAL ACCESS TOKEN

Jika diminta password dan password GitHub tidak diterima:

**1. Buka browser, akses:**
```
https://github.com/settings/tokens
```

**2. Klik tombol hijau "Generate new token"**
- Pilih "Generate new token (classic)"

**3. Isi form:**
- **Note:** `BMU Deploy Token`
- **Expiration:** `90 days`
- **Select scopes:** Centang `repo` (semua checkbox di bawahnya akan otomatis tercentang)

**4. Scroll ke bawah, klik "Generate token"**

**5. Copy token yang muncul:**
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
**⚠️ PENTING:** Token hanya muncul sekali! Simpan di tempat aman!

**6. Kembali ke Command Prompt, paste token sebagai password**

**7. Ulangi perintah push:**
```bash
git push -u origin main
```

---

## 8️⃣ TUNGGU VERCEL DEPLOY

Setelah push berhasil:

**1. Buka browser**

**2. Akses Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**3. Login dan pilih project BMU**

**4. Lihat tab "Deployments"**

**5. Tunggu status berubah menjadi:**
```
✅ Ready
```

**Waktu: 2-3 menit**

---

## 9️⃣ TEST DI HANDPHONE

**1. Buka browser di HP**

**2. Akses website:**
```
https://bmu-disnakerkukm-madiun.vercel.app/bmu-login.html
```
(Atau URL Vercel Anda yang lain)

**3. Login dengan kode:**
```
0016
```

**4. Test menu navigasi:**
- Tap menu hamburger (☰)
- Pilih "Dashboard" → Data harus muncul ✅
- Pilih "Jenis Bantuan" → Tabel muncul ✅
- Pilih "Data IKM" → Tabel muncul ✅

---

## ✅ CHECKLIST

```
□ git init → Berhasil
□ git remote add origin → Berhasil
□ git remote -v → URL benar
□ git add . → Berhasil
□ git commit → Ada konfirmasi
□ git branch -M main → Berhasil
□ git push → Berhasil (mungkin perlu token)
□ Vercel status "Ready"
□ Test di HP berhasil
```

---

## 🆘 TROUBLESHOOTING

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "Authentication failed"
```
Gunakan Personal Access Token, bukan password
Lihat cara buat token di atas
```

### Error: "Repository not found"
```
Pastikan repository sudah dibuat di GitHub
Cek di: https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun
```

---

## 📋 RINGKASAN PERINTAH (Copy Semua)

Jika mau copy semua sekaligus:

```bash
git init
git remote add origin https://github.com/ekobahrudin38-ai/bmu-disnakerkukm-madiun.git
git remote -v
git add .
git commit -m "Fix: Perbaikan navigasi mobile untuk handphone"
git branch -M main
git push -u origin main
```

**Tapi lebih baik ketik satu per satu agar bisa lihat hasilnya!**

---

## 🎉 SETELAH BERHASIL

Jika semua berhasil:
- ✅ Kode sudah di GitHub
- ✅ Vercel otomatis deploy
- ✅ Website update dengan perbaikan mobile
- ✅ Menu navigasi berfungsi di HP
- ✅ Kode 0016 tetap berfungsi

**Selamat! Website Anda sekarang mobile-friendly!** 📱🎊

---

**Repository:** ekobahrudin38-ai/bmu-disnakerkukm-madiun
**Status:** Ready to Deploy ✅
**Tanggal:** 8 Januari 2026
