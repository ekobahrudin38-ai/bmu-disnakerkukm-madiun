# 🌐 PANDUAN KONEKSI WEB YANG SUDAH DI-DEPLOY

## 🎯 TUJUAN
Menghubungkan aplikasi lokal Anda dengan web yang sudah di-deploy di Vercel agar data tersinkronisasi.

---

## 📋 INFORMASI YANG ANDA BUTUHKAN

Sebelum mulai, siapkan informasi ini:

### 1️⃣ URL Web yang Sudah Di-Deploy
```
Contoh: https://bmu-disnakerkukm.vercel.app
Atau: https://your-project-name.vercel.app

❓ Dimana menemukannya?
→ Buka dashboard Vercel
→ Pilih project Anda
→ Copy URL di bagian "Domains"
```

### 2️⃣ Kredensial Supabase (SUDAH ADA)
```
✅ URL: https://vxxkawcjspxunmotcnve.supabase.co
✅ Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
(Sudah tersimpan di file .env Anda)
```

---

## 🔧 LANGKAH-LANGKAH KONEKSI

### OPSI A: Jika Web Sudah Di-Deploy di Vercel ✅ RECOMMENDED

#### Step 1: Cek URL Deployment Anda

```bash
# Buka terminal dan jalankan:
vercel ls

# Atau buka browser:
https://vercel.com/dashboard
```

**Catat URL deployment Anda**, contoh:
- `https://bmu-disnakerkukm.vercel.app`
- `https://database-bmu.vercel.app`

#### Step 2: Verifikasi Environment Variables di Vercel

```bash
1. Buka https://vercel.com/dashboard
2. Pilih project BMU Anda
3. Klik "Settings" → "Environment Variables"
4. Pastikan ada 4 variables ini:
```

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://vxxkawcjspxunmotcnve.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `VITE_DEMO_MODE` | `false` | Production, Preview, Development |

**❌ Jika belum ada**, tambahkan sekarang:
1. Klik "Add New"
2. Masukkan Name dan Value
3. Pilih semua Environment (Production, Preview, Development)
4. Klik "Save"

#### Step 3: Redeploy Aplikasi (Jika Perlu)

```bash
# Jika Anda baru menambahkan environment variables:
1. Kembali ke tab "Deployments"
2. Klik deployment terakhir
3. Klik "..." → "Redeploy"
4. Tunggu build selesai (~2 menit)
```

#### Step 4: Test Koneksi Web Deploy

```bash
1. Buka URL deployment Anda di browser
   Contoh: https://bmu-disnakerkukm.vercel.app

2. Buka Console Browser (tekan F12)

3. Cek koneksi Supabase:
```

```javascript
// Paste di Console Browser:
console.log('Supabase URL:', window.getBMUConfig().supabaseUrl);
console.log('Supabase Client:', window.bmuSupabase);
console.log('Demo Mode:', window.getBMUConfig().isDemoMode);

// Test query:
window.BMUDatabase.getJenisBantuan().then(data => {
    console.log('✅ Koneksi berhasil! Data:', data);
}).catch(error => {
    console.error('❌ Koneksi gagal:', error);
});
```

**✅ Jika berhasil**, Anda akan melihat:
```
✅ Koneksi berhasil! Data: Array(4) [...]
```

**❌ Jika gagal**, lanjut ke troubleshooting di bawah.

---

### OPSI B: Jika Belum Deploy ke Vercel

#### Step 1: Deploy Sekarang

```bash
# Di terminal, masuk ke folder project:
cd path/to/project

# Login ke Vercel (jika belum):
vercel login

# Deploy:
vercel

# Ikuti prompt:
? Set up and deploy "~/path/to/project"? [Y/n] Y
? Which scope do you want to deploy to? [pilih account Anda]
? Link to existing project? [N/y] N
? What's your project's name? bmu-disnakerkukm
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

#### Step 2: Tambahkan Environment Variables

```bash
# Setelah deploy, tambahkan env vars:
vercel env add VITE_SUPABASE_URL

# Paste value:
https://vxxkawcjspxunmotcnve.supabase.co

# Pilih environment: Production, Preview, Development (pilih semua)

# Ulangi untuk variables lainnya:
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add NODE_ENV
vercel env add VITE_DEMO_MODE
```

#### Step 3: Redeploy dengan Environment Variables

```bash
vercel --prod
```

---

## 🔄 SINKRONISASI DATA LOKAL ↔ WEB DEPLOY

### Cara Kerja Sinkronisasi:

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Aplikasi Lokal │ ←────→  │    Supabase     │ ←────→  │   Web Deploy    │
│  (localhost)    │         │    Database     │         │   (Vercel)      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                            │                            │
        │                            │                            │
        └────────────────────────────┴────────────────────────────┘
                    Semua terhubung ke database yang sama!
```

### Test Sinkronisasi:

#### Test 1: Tambah Data di Lokal, Cek di Web Deploy

```bash
1. Buka aplikasi lokal: file:///path/to/bmu-login.html
2. Login dengan: BMU-Madiun08 / BMU-Madiun08
3. Tambah data penerima BMU baru
4. Buka web deploy: https://your-app.vercel.app
5. Login dengan kredensial yang sama
6. Data baru harus muncul (tunggu max 10 detik untuk auto-refresh)
```

#### Test 2: Tambah Data di Web Deploy, Cek di Lokal

```bash
1. Buka web deploy: https://your-app.vercel.app
2. Login dan tambah data baru
3. Buka aplikasi lokal
4. Refresh halaman (F5)
5. Data baru harus muncul
```

#### Test 3: Sinkronisasi Real-time

```bash
1. Buka web deploy di Chrome
2. Buka aplikasi lokal di Firefox
3. Login di kedua browser
4. Tambah data di Chrome
5. Tunggu 10 detik
6. Data otomatis muncul di Firefox (auto-refresh)
```

---

## 📱 AKSES DARI DEVICE LAIN

### Akses dari HP/Tablet:

```bash
1. Buka browser di HP/Tablet
2. Ketik URL: https://your-app.vercel.app
3. Login dengan: BMU-Madiun08 / BMU-Madiun08
4. Semua fitur berfungsi normal
5. Data tersinkron dengan lokal & web deploy
```

### Akses dari Komputer Lain:

```bash
1. Buka browser di komputer lain
2. Ketik URL: https://your-app.vercel.app
3. Login dengan kredensial yang sama
4. Data tersinkron otomatis
```

---

## 🔍 CEK STATUS KONEKSI

### Cek di Aplikasi Lokal:

```javascript
// Buka Console Browser (F12) di aplikasi lokal:

// 1. Cek konfigurasi
console.log('Config:', window.getBMUConfig());

// 2. Cek koneksi Supabase
console.log('Supabase Client:', window.bmuSupabase);

// 3. Test query
window.BMUDatabase.getPenerimaBMU().then(data => {
    console.log('Total data:', data.length);
    console.log('Data:', data);
});

// 4. Cek mode
console.log('Demo Mode:', window.getBMUConfig().isDemoMode);
// Harus: false (production mode)
```

### Cek di Web Deploy:

```javascript
// Buka Console Browser (F12) di web deploy:

// Jalankan command yang sama seperti di atas
// Hasilnya harus identik!
```

### Cek di Supabase Dashboard:

```bash
1. Buka https://supabase.com
2. Login dan pilih project BMU
3. Klik "Table Editor"
4. Pilih tabel "penerima_bmu"
5. Lihat data yang ada
6. Data harus sama dengan yang di aplikasi lokal & web deploy
```

---

## 🔧 TROUBLESHOOTING KONEKSI

### Problem 1: Data Tidak Sinkron

**Gejala**: Data di lokal berbeda dengan web deploy

**Solusi**:
```javascript
// Di Console Browser (F12):

// 1. Force refresh data
if (window.refreshDataFromDatabase) {
    window.refreshDataFromDatabase().then(() => {
        console.log('✅ Data refreshed');
    });
}

// 2. Clear cache dan reload
localStorage.clear();
sessionStorage.clear();
location.reload(true);
```

### Problem 2: Error "Supabase Client Not Initialized"

**Gejala**: Console menampilkan error Supabase

**Solusi**:
```bash
1. Cek file bmu-supabase-config.js sudah ter-load
2. Cek kredensial Supabase benar
3. Cek koneksi internet
4. Reload halaman (F5)
```

### Problem 3: Environment Variables Tidak Terload di Vercel

**Gejala**: Web deploy tidak bisa koneksi ke Supabase

**Solusi**:
```bash
1. Vercel Dashboard → Settings → Environment Variables
2. Pastikan semua variables ada
3. Klik "Redeploy" di tab Deployments
4. Tunggu build selesai
5. Test lagi
```

### Problem 4: CORS Error

**Gejala**: Error "CORS policy" di console

**Solusi**:
```bash
1. Buka Supabase Dashboard
2. Settings → API
3. Scroll ke "CORS Configuration"
4. Tambahkan URL web deploy Anda:
   - https://your-app.vercel.app
   - https://*.vercel.app (untuk preview deployments)
5. Save
```

---

## 📊 MONITORING KONEKSI

### Dashboard Supabase:

```bash
1. Buka https://supabase.com
2. Pilih project BMU
3. Klik "Logs" di sidebar
4. Monitor:
   - API Requests
   - Database Queries
   - Errors (jika ada)
```

### Dashboard Vercel:

```bash
1. Buka https://vercel.com/dashboard
2. Pilih project BMU
3. Klik "Analytics"
4. Monitor:
   - Page Views
   - Unique Visitors
   - Performance
```

---

## 🎯 CHECKLIST KONEKSI BERHASIL

Pastikan semua ini ✅:

### Koneksi Lokal:
- [ ] Aplikasi lokal bisa login
- [ ] Data muncul di dashboard
- [ ] Bisa tambah/edit/hapus data
- [ ] Data tersimpan ke Supabase
- [ ] Console tidak ada error

### Koneksi Web Deploy:
- [ ] Web deploy bisa diakses
- [ ] Bisa login dengan kredensial yang sama
- [ ] Data muncul (sama dengan lokal)
- [ ] Bisa tambah/edit/hapus data
- [ ] Console tidak ada error

### Sinkronisasi:
- [ ] Data di lokal = data di web deploy
- [ ] Tambah data di lokal → muncul di web deploy
- [ ] Tambah data di web deploy → muncul di lokal
- [ ] Auto-refresh berfungsi (10 detik)
- [ ] Bisa akses dari device lain

---

## 📱 SHARE URL KE TIM

Setelah semua terkoneksi, share URL ini ke tim:

```
🌐 URL Aplikasi:
https://your-app.vercel.app

🔐 Kredensial Login:
Username: BMU-Madiun08
Password: BMU-Madiun08

📝 Catatan:
- Akses dari browser apa saja
- Data tersinkron real-time
- Bisa diakses dari HP/Tablet
- Session berlaku 8 jam
```

---

## 🔐 KEAMANAN

### Jangan Share Ini:

❌ **JANGAN** share kredensial Supabase:
```
❌ VITE_SUPABASE_URL
❌ VITE_SUPABASE_ANON_KEY
```

✅ **BOLEH** share:
```
✅ URL aplikasi: https://your-app.vercel.app
✅ Username/Password login: BMU-Madiun08 / BMU-Madiun08
```

### Tambah User Baru:

```bash
1. Login ke aplikasi
2. Klik "Pengaturan" di sidebar
3. Klik "Kelola Kredensial Login"
4. Tambah username/password baru untuk tim
5. Share kredensial baru ke tim
```

---

## 🎉 SELESAI!

Aplikasi Anda sekarang:

✅ **TERKONEKSI** - Lokal ↔ Supabase ↔ Web Deploy
✅ **TERSINKRON** - Data real-time antar device
✅ **ACCESSIBLE** - Bisa diakses dari mana saja
✅ **SECURE** - Dengan sistem login
✅ **READY** - Siap digunakan tim

---

## 📞 BANTUAN LEBIH LANJUT

Jika masih ada masalah:

1. **Cek Console Browser** (F12)
2. **Baca QUICK-FIX-COMMON-ISSUES.md**
3. **Cek Supabase Logs**
4. **Cek Vercel Logs**

---

**Dibuat**: 8 Januari 2026
**Untuk**: Database BMU DisnakerKUKM Kota Madiun
**Status**: ✅ READY TO CONNECT
