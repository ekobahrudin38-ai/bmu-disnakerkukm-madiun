# 🔧 Setup Git Repository dari Awal

## Masalah Anda:
```
fatal: not a git repository (or any of the parent directories): .git
```

**Artinya:** Folder D:\DataBMU belum pernah di-setup sebagai Git repository.

---

## ✅ SOLUSI: Setup Git Repository

Ikuti perintah ini **satu per satu** di Command Prompt:

### 1️⃣ Pastikan Anda di Folder yang Benar
```bash
D:
cd DataBMU
```

### 2️⃣ Inisialisasi Git Repository
```bash
git init
```

**Akan muncul:**
```
Initialized empty Git repository in D:/DataBMU/.git/
```
✅ Ini artinya Git repository sudah dibuat!

### 3️⃣ Tambahkan Remote GitHub
**PENTING:** Ganti `[USERNAME]` dan `[REPO-NAME]` dengan milik Anda!

```bash
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git
```

**Contoh:**
```bash
git remote add origin https://github.com/johndoe/bmu-disnaker.git
```

**Cara tahu URL GitHub Anda:**
1. Buka https://github.com
2. Login
3. Buka repository BMU Anda
4. Klik tombol hijau "Code"
5. Copy URL HTTPS

### 4️⃣ Cek Remote Sudah Benar
```bash
git remote -v
```

**Akan muncul:**
```
origin  https://github.com/[USERNAME]/[REPO-NAME].git (fetch)
origin  https://github.com/[USERNAME]/[REPO-NAME].git (push)
```

### 5️⃣ Tambahkan Semua File
```bash
git add .
```

### 6️⃣ Commit Pertama
```bash
git commit -m "Initial commit - Fix mobile navigation"
```

### 7️⃣ Set Branch ke Main
```bash
git branch -M main
```

### 8️⃣ Push ke GitHub
```bash
git push -u origin main
```

**Jika diminta login:**
- Username: [username GitHub Anda]
- Password: [Personal Access Token, bukan password biasa]

### 9️⃣ Tunggu Deploy
Vercel akan otomatis deploy (2-3 menit)

### 🔟 Test di HP
Login dengan kode 0016 dan test menu!

---

## 🔑 CARA BUAT PERSONAL ACCESS TOKEN (Jika Diminta)

Jika diminta password dan password GitHub tidak diterima, buat token:

**1. Buka GitHub:**
```
https://github.com/settings/tokens
```

**2. Klik "Generate new token" → "Generate new token (classic)"**

**3. Isi Form:**
- Note: `BMU Deploy Token`
- Expiration: `90 days`
- Centang: `repo` (semua)

**4. Klik "Generate token"**

**5. Copy Token (hanya muncul sekali!)**
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**6. Gunakan Token sebagai Password**
```
Username: [username GitHub]
Password: [paste token yang di-copy]
```

---

## 📋 RINGKASAN PERINTAH LENGKAP

Copy-paste perintah ini **satu per satu**:

```bash
# 1. Masuk folder
D:
cd DataBMU

# 2. Init Git
git init

# 3. Add remote (GANTI URL!)
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git

# 4. Cek remote
git remote -v

# 5. Add files
git add .

# 6. Commit
git commit -m "Initial commit - Fix mobile navigation"

# 7. Set branch
git branch -M main

# 8. Push
git push -u origin main
```

---

## ❓ JIKA ANDA BELUM PUNYA REPOSITORY GITHUB

Jika Anda belum punya repository di GitHub, buat dulu:

**1. Buka GitHub:**
```
https://github.com/new
```

**2. Isi Form:**
- Repository name: `bmu-disnaker` (atau nama lain)
- Description: `Database BMU DisnakerKUKM`
- Public atau Private: Pilih sesuai kebutuhan
- **JANGAN** centang "Initialize with README"

**3. Klik "Create repository"**

**4. Copy URL yang muncul:**
```
https://github.com/[USERNAME]/bmu-disnaker.git
```

**5. Gunakan URL ini di perintah `git remote add origin`**

---

## 🆘 TROUBLESHOOTING

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git
```

### Error: "failed to push"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "Authentication failed"
```
Gunakan Personal Access Token, bukan password biasa
Lihat cara buat token di atas
```

---

## ✅ SETELAH BERHASIL PUSH

**1. Cek GitHub:**
- Buka repository Anda di GitHub
- File-file harus sudah muncul

**2. Cek Vercel:**
- Buka https://vercel.com/dashboard
- Pilih project BMU
- Status harus "Building" atau "Ready"

**3. Test di HP:**
- Buka website
- Login: 0016
- Test menu

---

**Ikuti langkah-langkah di atas, dan beri tahu saya jika ada error!** 🚀
