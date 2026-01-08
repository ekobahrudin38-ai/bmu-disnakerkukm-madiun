# 🎯 LANGKAH MUDAH DEPLOY - UNTUK PEMULA

## 📋 YANG ANDA BUTUHKAN

- ✅ Akun GitHub (https://github.com)
- ✅ Akun Vercel (https://vercel.com)
- ✅ File project BMU yang sudah diperbaiki

---

## 🚀 LANGKAH 1: UPLOAD KE GITHUB

### **Cara 1: Via GitHub Website (PALING MUDAH)**

1. **Buka GitHub:** https://github.com
2. **Login** dengan akun Anda
3. **Klik tombol "+" di pojok kanan atas**
4. **Pilih "New repository"**
5. **Isi form:**
   - Repository name: `bmu-disnakerkukm-madiun`
   - Description: `Database BMU DisnakerKUKM Kota Madiun`
   - Public atau Private: **Public**
   - ✅ Centang "Add a README file"
6. **Klik "Create repository"**

7. **Upload file:**
   - Klik tombol **"Add file"** > **"Upload files"**
   - **Drag & drop** semua file project BMU
   - Atau klik **"choose your files"** dan pilih semua file
   - Tunggu upload selesai
   - Scroll ke bawah, klik **"Commit changes"**

✅ **SELESAI!** File sudah di GitHub

---

### **Cara 2: Via GitHub Desktop (ALTERNATIF)**

1. **Download GitHub Desktop:** https://desktop.github.com
2. **Install dan login**
3. **Klik "File" > "New repository"**
4. **Isi:**
   - Name: `bmu-disnakerkukm-madiun`
   - Local path: Pilih folder project BMU
5. **Klik "Create repository"**
6. **Klik "Publish repository"**
7. **Pilih "Public"**
8. **Klik "Publish repository"**

✅ **SELESAI!** File sudah di GitHub

---

## 🚀 LANGKAH 2: DEPLOY KE VERCEL

### **Langkah 2.1: Connect GitHub ke Vercel**

1. **Buka Vercel:** https://vercel.com
2. **Klik "Sign Up"** atau **"Login"**
3. **Pilih "Continue with GitHub"**
4. **Authorize Vercel** untuk akses GitHub
5. **Klik "Import Project"**

### **Langkah 2.2: Import Repository**

1. **Di halaman Import, cari repository:** `bmu-disnakerkukm-madiun`
2. **Klik "Import"**
3. **Configure Project:**
   - Project Name: `bmu-disnakerkukm-madiun`
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)
4. **Klik "Deploy"**

### **Langkah 2.3: Tunggu Deployment**

1. **Vercel akan build project** (2-3 menit)
2. **Status akan berubah:**
   - Building... ⏳
   - Ready ✅
3. **Klik "Visit"** untuk lihat website

✅ **SELESAI!** Website sudah online!

---

## 🎯 LANGKAH 3: TEST WEBSITE

### **Test 1: Buka Website**

```
URL: https://bmu-disnakerkukm-madiun.vercel.app/
```

**Yang harus muncul:**
- ✅ Halaman login dengan form
- ✅ Input username dan password
- ✅ Tombol "Masuk ke Dashboard"
- ✅ Background animasi

**Jika tidak muncul:**
- Tekan **Ctrl + Shift + R** untuk clear cache
- Atau buka di **Incognito mode**

### **Test 2: Login**

```
Username: BMU-Madiun08
Password: BMU-Madiun08
```

**Klik "Masuk ke Dashboard"**

**Yang harus terjadi:**
- ✅ Redirect ke dashboard
- ✅ Menu sidebar muncul
- ✅ Data muncul di tabel

---

## 🔧 LANGKAH 4: UPDATE FILE (JIKA PERLU)

### **Cara Update via GitHub Website:**

1. **Buka repository di GitHub**
2. **Klik file yang mau diupdate** (misal: `bmu-script.js`)
3. **Klik icon pensil** (Edit this file)
4. **Edit file**
5. **Scroll ke bawah**
6. **Klik "Commit changes"**

✅ **Vercel akan auto-deploy** dalam 2-3 menit

### **Cara Update via GitHub Desktop:**

1. **Buka GitHub Desktop**
2. **Pilih repository BMU**
3. **Edit file di text editor** (Notepad++, VS Code, dll)
4. **Save file**
5. **Kembali ke GitHub Desktop**
6. **Lihat perubahan di tab "Changes"**
7. **Tulis commit message:** "Update file"
8. **Klik "Commit to main"**
9. **Klik "Push origin"**

✅ **Vercel akan auto-deploy** dalam 2-3 menit

---

## 🚨 TROUBLESHOOTING MUDAH

### ❌ **Problem: Halaman blank/kosong**

**Solusi:**
```
1. Tekan Ctrl + Shift + R (clear cache)
2. Atau buka Incognito mode (Ctrl + Shift + N)
3. Tunggu 5 menit, coba lagi
```

### ❌ **Problem: Login tidak berfungsi**

**Solusi:**
```
1. Pastikan username: BMU-Madiun08
2. Pastikan password: BMU-Madiun08
3. Tekan F12, lihat error di Console
4. Screenshot error, minta bantuan
```

### ❌ **Problem: Vercel build failed**

**Solusi:**
```
1. Buka Vercel Dashboard
2. Klik project BMU
3. Klik tab "Deployments"
4. Klik deployment yang failed
5. Lihat "Build Logs"
6. Screenshot error, minta bantuan
```

### ❌ **Problem: File tidak ter-upload**

**Solusi:**
```
1. Cek di GitHub repository
2. Pastikan semua file ada
3. Jika tidak ada, upload ulang
4. Vercel akan auto-deploy
```

---

## 📱 LANGKAH 5: SHARE WEBSITE

Setelah website online, Anda bisa share:

```
URL: https://bmu-disnakerkukm-madiun.vercel.app/

Credentials:
Username: BMU-Madiun08
Password: BMU-Madiun08
```

**Cara share:**
- Copy URL
- Kirim via WhatsApp/Email
- User bisa langsung akses

---

## 🎯 CHECKLIST DEPLOYMENT BERHASIL

- [ ] Repository dibuat di GitHub
- [ ] File ter-upload ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Deployment status "Ready"
- [ ] Website bisa diakses
- [ ] Halaman login muncul
- [ ] Login berfungsi
- [ ] Dashboard bisa diakses

---

## 📞 BUTUH BANTUAN?

### **Jika ada masalah:**

1. **Screenshot error**
2. **Catat langkah yang menyebabkan error**
3. **Cek dokumentasi:**
   - QUICK-FIX-GUIDE.md
   - FIX-VERCEL-DEPLOYMENT.md
   - DEPLOY-ULANG-VERCEL.md

### **Resources:**

- **GitHub Help:** https://docs.github.com
- **Vercel Docs:** https://vercel.com/docs
- **Video Tutorial:** Search "deploy to vercel" di YouTube

---

## 🎉 SELESAI!

Selamat! Website BMU Anda sudah online dan bisa diakses dari mana saja!

**URL Website:** https://bmu-disnakerkukm-madiun.vercel.app/

**Next Steps:**
1. ✅ Test semua functionality
2. ✅ Share ke user
3. ✅ Monitor performance
4. ✅ Update jika perlu

---

## 💡 TIPS

### **Auto-Deploy:**
- Setiap kali Anda update file di GitHub
- Vercel akan otomatis deploy ulang
- Tidak perlu setting manual

### **Custom Domain:**
- Bisa pakai domain sendiri (misal: bmu.madiun.go.id)
- Setting di Vercel Dashboard > Domains
- Ikuti instruksi Vercel

### **Monitoring:**
- Cek Vercel Dashboard untuk analytics
- Lihat jumlah visitor
- Monitor error logs

---

**Semoga berhasil! 🚀**