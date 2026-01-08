# 📝 FILE YANG PERLU DISESUAIKAN UNTUK KONEKSI WEB DEPLOY

## 🎯 OVERVIEW

Untuk menghubungkan aplikasi lokal dengan web yang sudah di-deploy, Anda **TIDAK PERLU** mengubah file apapun jika:
- ✅ Kredensial Supabase sudah benar di `.env`
- ✅ File `bmu-supabase-config.js` sudah benar
- ✅ Environment variables sudah di-set di Vercel

**Aplikasi sudah otomatis terkoneksi ke database yang sama!**

---

## ✅ FILE YANG SUDAH BENAR (TIDAK PERLU DIUBAH)

### 1. `.env` (Lokal)
```env
# File ini SUDAH BENAR, tidak perlu diubah
VITE_SUPABASE_URL=https://vxxkawcjspxunmotcnve.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg
NODE_ENV=production
VITE_DEMO_MODE=false
```

**✅ Status**: SUDAH BENAR
**❌ Jangan**: Commit file ini ke GitHub!

---

### 2. `bmu-supabase-config.js`
```javascript
// File ini SUDAH BENAR, tidak perlu diubah
function getBMUConfig() {
    const config = {
        supabaseUrl: 'https://vxxkawcjspxunmotcnve.supabase.co',
        supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        isDemoMode: false
    };
    return config;
}
```

**✅ Status**: SUDAH BENAR
**✅ Boleh**: Commit file ini ke GitHub (kredensial public anon key)

---

### 3. `config.js`
```javascript
// File ini SUDAH DIPERBAIKI, tidak perlu diubah
function getConfig() {
    const config = {
        supabaseUrl: 'https://vxxkawcjspxunmotcnve.supabase.co',
        supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        isDemoMode: false
    };
    return config;
}
```

**✅ Status**: SUDAH DIPERBAIKI
**✅ Boleh**: Commit file ini ke GitHub

---

### 4. `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/",
      "destination": "/index.html"
    },
    {
      "source": "/login",
      "destination": "/bmu-login.html"
    },
    {
      "source": "/dashboard",
      "destination": "/bmu-index.html"
    }
  ]
}
```

**✅ Status**: SUDAH BENAR
**✅ Boleh**: Commit file ini ke GitHub

---

## ⚙️ YANG PERLU DISESUAIKAN DI VERCEL (BUKAN FILE)

### Environment Variables di Vercel Dashboard

**Lokasi**: Vercel Dashboard → Settings → Environment Variables

Pastikan ada 4 variables ini:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://vxxkawcjspxunmotcnve.supabase.co` | ✅ Production<br>✅ Preview<br>✅ Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg` | ✅ Production<br>✅ Preview<br>✅ Development |
| `NODE_ENV` | `production` | ✅ Production |
| `VITE_DEMO_MODE` | `false` | ✅ Production<br>✅ Preview<br>✅ Development |

**Cara Menambahkan**:
```bash
1. Login ke https://vercel.com
2. Pilih project BMU Anda
3. Klik "Settings"
4. Klik "Environment Variables"
5. Klik "Add New"
6. Masukkan Name dan Value
7. Pilih Environment (Production, Preview, Development)
8. Klik "Save"
9. Ulangi untuk semua variables
10. Redeploy aplikasi
```

---

## 🔍 VERIFIKASI KONEKSI

### Test 1: Cek di Aplikasi Lokal

```bash
1. Buka file: bmu-login.html di browser
2. Tekan F12 untuk buka Console
3. Paste code ini:
```

```javascript
// Test koneksi lokal
console.log('=== TEST KONEKSI LOKAL ===');
console.log('Config:', window.getBMUConfig());
console.log('Supabase Client:', window.bmuSupabase);

// Test query
window.BMUDatabase.getPenerimaBMU().then(data => {
    console.log('✅ Koneksi lokal berhasil!');
    console.log('Total data:', data.length);
}).catch(error => {
    console.error('❌ Koneksi lokal gagal:', error);
});
```

**✅ Hasil yang diharapkan**:
```
=== TEST KONEKSI LOKAL ===
Config: {supabaseUrl: "https://vxxkawcjspxunmotcnve.supabase.co", ...}
Supabase Client: SupabaseClient {...}
✅ Koneksi lokal berhasil!
Total data: 5
```

---

### Test 2: Cek di Web Deploy

```bash
1. Buka URL web deploy: https://your-app.vercel.app
2. Tekan F12 untuk buka Console
3. Paste code yang sama:
```

```javascript
// Test koneksi web deploy
console.log('=== TEST KONEKSI WEB DEPLOY ===');
console.log('Config:', window.getBMUConfig());
console.log('Supabase Client:', window.bmuSupabase);

// Test query
window.BMUDatabase.getPenerimaBMU().then(data => {
    console.log('✅ Koneksi web deploy berhasil!');
    console.log('Total data:', data.length);
}).catch(error => {
    console.error('❌ Koneksi web deploy gagal:', error);
});
```

**✅ Hasil yang diharapkan**:
```
=== TEST KONEKSI WEB DEPLOY ===
Config: {supabaseUrl: "https://vxxkawcjspxunmotcnve.supabase.co", ...}
Supabase Client: SupabaseClient {...}
✅ Koneksi web deploy berhasil!
Total data: 5
```

**📊 Total data harus SAMA antara lokal dan web deploy!**

---

### Test 3: Cek Sinkronisasi

```bash
# Test sinkronisasi real-time:

1. Buka aplikasi lokal di Chrome
2. Buka web deploy di Firefox
3. Login di kedua browser
4. Tambah data baru di Chrome
5. Tunggu 10 detik
6. Data otomatis muncul di Firefox
```

**✅ Jika berhasil**: Data sinkron otomatis
**❌ Jika gagal**: Cek troubleshooting di bawah

---

## 🚨 TROUBLESHOOTING

### Problem 1: Data Lokal ≠ Data Web Deploy

**Penyebab**: Cache browser atau data belum refresh

**Solusi**:
```javascript
// Di Console Browser (F12):

// 1. Clear cache
localStorage.clear();
sessionStorage.clear();

// 2. Force refresh
location.reload(true);

// 3. Test lagi
window.BMUDatabase.getPenerimaBMU().then(data => {
    console.log('Data setelah refresh:', data.length);
});
```

---

### Problem 2: Web Deploy Error "Supabase Not Initialized"

**Penyebab**: Environment variables belum di-set di Vercel

**Solusi**:
```bash
1. Vercel Dashboard → Settings → Environment Variables
2. Tambahkan semua variables (lihat tabel di atas)
3. Klik "Redeploy" di tab Deployments
4. Tunggu build selesai
5. Test lagi
```

---

### Problem 3: Error CORS di Web Deploy

**Penyebab**: URL web deploy belum ditambahkan ke Supabase CORS

**Solusi**:
```bash
1. Buka https://supabase.com
2. Pilih project BMU
3. Settings → API
4. Scroll ke "CORS Configuration"
5. Tambahkan:
   - https://your-app.vercel.app
   - https://*.vercel.app
6. Save
7. Test lagi
```

---

### Problem 4: Data Tidak Sinkron Real-time

**Penyebab**: Auto-refresh tidak berjalan

**Solusi**:
```javascript
// Di Console Browser (F12):

// 1. Cek auto-refresh
console.log('Auto-refresh interval:', 10000, 'ms');

// 2. Force refresh manual
if (window.refreshDataFromDatabase) {
    window.refreshDataFromDatabase().then(() => {
        console.log('✅ Data refreshed');
    });
}

// 3. Restart auto-refresh
location.reload();
```

---

## 📊 DIAGRAM KONEKSI

```
┌─────────────────────────────────────────────────────────────┐
│                    APLIKASI LOKAL                            │
│                                                              │
│  File: bmu-login.html                                       │
│  Config: bmu-supabase-config.js                             │
│  Kredensial: .env (lokal)                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Koneksi ke Supabase
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  SUPABASE DATABASE                           │
│                                                              │
│  URL: https://vxxkawcjspxunmotcnve.supabase.co             │
│  Tables: jenis_bantuan, penerima_bmu, recycle_bin          │
│  RLS: Enabled                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Koneksi ke Vercel
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    WEB DEPLOY (VERCEL)                       │
│                                                              │
│  URL: https://your-app.vercel.app                           │
│  Config: bmu-supabase-config.js                             │
│  Kredensial: Environment Variables (Vercel)                 │
└─────────────────────────────────────────────────────────────┘

📝 CATATAN:
- Lokal dan Web Deploy terhubung ke DATABASE YANG SAMA
- Data otomatis sinkron karena menggunakan database yang sama
- Tidak perlu konfigurasi tambahan
```

---

## ✅ CHECKLIST FINAL

Pastikan semua ini sudah ✅:

### File Lokal:
- [ ] `.env` ada dan berisi kredensial Supabase
- [ ] `bmu-supabase-config.js` sudah benar
- [ ] `config.js` sudah diperbaiki
- [ ] `vercel.json` sudah ada
- [ ] Aplikasi lokal bisa login dan CRUD

### Vercel:
- [ ] Project sudah di-deploy
- [ ] Environment Variables sudah di-set (4 variables)
- [ ] Build berhasil tanpa error
- [ ] Web deploy bisa diakses
- [ ] Web deploy bisa login dan CRUD

### Koneksi:
- [ ] Test koneksi lokal berhasil
- [ ] Test koneksi web deploy berhasil
- [ ] Data lokal = data web deploy
- [ ] Sinkronisasi real-time berfungsi
- [ ] Bisa akses dari device lain

---

## 🎉 KESIMPULAN

**TIDAK ADA FILE YANG PERLU DIUBAH!**

Semua file sudah benar dan siap digunakan. Yang perlu Anda lakukan:

1. ✅ Pastikan `.env` ada di lokal (jangan commit!)
2. ✅ Set Environment Variables di Vercel
3. ✅ Deploy/Redeploy aplikasi
4. ✅ Test koneksi lokal dan web deploy
5. ✅ Selesai!

Aplikasi lokal dan web deploy akan otomatis tersinkron karena menggunakan **database Supabase yang sama**.

---

**Dibuat**: 8 Januari 2026
**Untuk**: Database BMU DisnakerKUKM Kota Madiun
**Status**: ✅ READY TO USE
