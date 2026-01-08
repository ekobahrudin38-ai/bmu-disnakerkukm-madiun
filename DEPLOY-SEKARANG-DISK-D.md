# ⚡ Deploy Sekarang - File di Disk D:

## Copy-Paste Perintah Ini Satu per Satu!

---

## 🚀 LANGKAH 1: BUKA COMMAND PROMPT

**Tekan:** `Windows + R`
**Ketik:** `cmd`
**Tekan:** `Enter`

---

## 🚀 LANGKAH 2: PINDAH KE DISK D:

Copy-paste perintah ini:

```bash
D:
```

Tekan Enter. Sekarang Anda di:
```
D:\>_
```

---

## 🚀 LANGKAH 3: MASUK KE FOLDER PROJECT

**Pilih salah satu yang sesuai dengan lokasi folder Anda:**

### Jika folder langsung di D:\bmu-disnaker:
```bash
cd bmu-disnaker
```

### Jika folder di D:\Projects\bmu-disnaker:
```bash
cd Projects\bmu-disnaker
```

### Jika folder di D:\Documents\bmu-disnaker:
```bash
cd Documents\bmu-disnaker
```

### Jika tidak tahu lokasi pastinya:
```bash
dir /s /b bmu-disnaker
```
Lihat hasilnya, lalu:
```bash
cd [lokasi-yang-muncul]
```

---

## 🚀 LANGKAH 4: CEK LOKASI SUDAH BENAR

```bash
dir
```

**Harus muncul file:**
- bmu-index.html
- bmu-script.js
- bmu-styles.css
- package.json

**Jika muncul = ✅ Lanjut!**

---

## 🚀 LANGKAH 5: DEPLOY (Copy-Paste 4 Perintah Ini)

### Perintah 1:
```bash
git add .
```
Tekan Enter. (Tidak ada output = berhasil)

### Perintah 2:
```bash
git commit -m "Fix mobile navigation"
```
Tekan Enter. (Akan muncul konfirmasi)

### Perintah 3:
```bash
git push origin main
```
Tekan Enter. (Akan upload ke GitHub)

**Jika diminta login GitHub:**
- Masukkan username
- Masukkan password/token

**Jika branch Anda `master`, gunakan:**
```bash
git push origin master
```

### Perintah 4: Tunggu!
```
Tunggu 2-3 menit untuk Vercel deploy otomatis
```

---

## 🚀 LANGKAH 6: CEK STATUS DEPLOY

1. Buka browser
2. Akses: https://vercel.com/dashboard
3. Login
4. Pilih project BMU
5. Tunggu status: **✅ Ready**

---

## 🚀 LANGKAH 7: TEST DI HP

1. Buka browser di HP
2. Akses website Anda
3. Login: **0016**
4. Tap menu (☰)
5. Pilih menu → **Data harus muncul!** ✅

---

## ✅ SELESAI!

Jika data muncul di HP = **BERHASIL!** 🎉

---

## 🆘 JIKA ADA ERROR

### Error: "not a git repository"
```bash
git init
git remote add origin [URL-GitHub-Anda]
git add .
git commit -m "Fix mobile navigation"
git push origin main
```

### Error: "push rejected"
```bash
git pull origin main --rebase
git push origin main
```

### Error: "cannot find path"
```bash
# Cari lokasi folder
D:
dir /s /b bmu-disnaker

# Masuk ke lokasi yang ditemukan
cd [hasil-pencarian]
```

---

## 📋 RINGKASAN PERINTAH LENGKAP

Copy semua ini dan paste satu per satu:

```bash
D:
cd bmu-disnaker
dir
git add .
git commit -m "Fix mobile navigation"
git push origin main
```

**Sesuaikan `cd bmu-disnaker` dengan lokasi folder Anda!**

---

## 💡 TIPS

- Jika nama folder ada spasi, gunakan tanda kutip:
  ```bash
  cd "My Projects\bmu-disnaker"
  ```

- Jika lupa lokasi folder, cari dulu:
  ```bash
  D:
  dir /s /b bmu-disnaker
  ```

- Jika Command Prompt tidak bisa akses D:, buka sebagai Administrator:
  ```
  Klik kanan Command Prompt → Run as administrator
  ```

---

**Total waktu: 5 menit** ⏱️
**Status:** Ready to Deploy ✅
