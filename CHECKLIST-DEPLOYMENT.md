# ✅ CHECKLIST DEPLOYMENT - Database BMU DisnakerKUKM

## 🎯 LANGKAH CEPAT DEPLOYMENT

### FASE 1: PERSIAPAN LOKAL (15 menit)

#### ✅ Step 1: Verifikasi File Utama
```bash
# Pastikan file-file ini ada dan benar:
□ index.html (redirect ke login) ✅ SUDAH DIPERBAIKI
□ bmu-login.html (halaman login)
□ bmu-index.html (dashboard)
□ bmu-script.js (logic utama)
□ bmu-supabase-config.js (koneksi database)
□ config.js ✅ SUDAH DIPERBAIKI
□ vercel.json (routing)
□ .env (jangan commit!)
□ .env.example (template)
□ .gitignore (sudah benar)
```

#### ✅ Step 2: Test Login Lokal
```bash
# Buka di browser:
1. Buka file: bmu-login.html
2. Login dengan:
   Username: BMU-Madiun08
   Password: BMU-Madiun08
3. Pastikan masuk ke dashboard
4. Cek console browser (F12) - tidak ada error
```

#### ✅ Step 3: Test CRUD Lokal
```bash
□ Tambah jenis bantuan baru
□ Tambah data penerima BMU
□ Edit data yang sudah ada
□ Hapus data (cek masuk recycle bin)
□ Restore dari recycle bin
□ Export data ke CSV
```

#### ✅ Step 4: Verifikasi Supabase
```bash
# Buka Supabase Dashboard:
1. Login ke https://supabase.com
2. Pilih project: BMU DisnakerKUKM Madiun
3. Cek Table Editor:
   □ jenis_bantuan (ada data)
   □ penerima_bmu (ada data)
   □ recycle_bin (bisa kosong)
4. Cek SQL Editor - jalankan:
   SELECT COUNT(*) FROM jenis_bantuan;
   SELECT COUNT(*) FROM penerima_bmu;
   SELECT COUNT(*) FROM recycle_bin;
```

---

### FASE 2: PUSH KE GITHUB (5 menit)

#### ✅ Step 5: Verifikasi .gitignore
```bash
# Pastikan .env tidak ter-commit
git status

# Jika .env muncul di list, hapus dari tracking:
git rm --cached .env
```

#### ✅ Step 6: Commit & Push
```bash
# Add semua file
git add .

# Commit dengan pesan jelas
git commit -m "Fix: Optimalisasi aplikasi BMU dengan struktur yang benar"

# Push ke GitHub
git push origin main

# Atau jika branch lain:
git push origin master
```

#### ✅ Step 7: Verifikasi di GitHub
```bash
# Buka repository di GitHub
□ File index.html sudah yang baru (redirect)
□ File config.js sudah yang baru
□ File .env TIDAK ada (sudah di-ignore)
□ File .env.example ada (template)
□ Semua file BMU ada
```

---

### FASE 3: DEPLOY KE VERCEL (10 menit)

#### ✅ Step 8: Import Repository
```bash
1. Login ke https://vercel.com
2. Klik "Add New" → "Project"
3. Import GitHub repository
4. Pilih repository BMU Anda
5. Klik "Import"
```

#### ✅ Step 9: Konfigurasi Project
```bash
Framework Preset: Other
Root Directory: ./
Build Command: (kosongkan)
Output Directory: (kosongkan)
Install Command: (kosongkan)
```

#### ✅ Step 10: Environment Variables
```bash
# Klik "Environment Variables"
# Tambahkan 4 variables ini:

Name: VITE_SUPABASE_URL
Value: https://vxxkawcjspxunmotcnve.supabase.co
Environment: Production, Preview, Development

Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg
Environment: Production, Preview, Development

Name: NODE_ENV
Value: production
Environment: Production

Name: VITE_DEMO_MODE
Value: false
Environment: Production, Preview, Development
```

#### ✅ Step 11: Deploy
```bash
1. Klik "Deploy"
2. Tunggu build selesai (1-2 menit)
3. Jika sukses, akan muncul "Congratulations!"
4. Klik "Visit" untuk buka aplikasi
```

---

### FASE 4: TESTING PRODUCTION (15 menit)

#### ✅ Step 12: Test URL Production
```bash
# URL utama (akan redirect ke login)
https://your-app.vercel.app/

# URL login langsung
https://your-app.vercel.app/login
https://your-app.vercel.app/bmu-login.html

# URL dashboard langsung (harus login dulu)
https://your-app.vercel.app/dashboard
https://your-app.vercel.app/bmu-index.html
```

#### ✅ Step 13: Test Login Production
```bash
1. Buka URL production
2. Login dengan:
   Username: BMU-Madiun08
   Password: BMU-Madiun08
3. Pastikan masuk ke dashboard
4. Cek console browser (F12):
   □ Tidak ada error merah
   □ Ada log "Supabase client initialized"
   □ Ada log "Data loaded from Supabase"
```

#### ✅ Step 14: Test CRUD Production
```bash
□ Dashboard menampilkan statistik yang benar
□ Tambah jenis bantuan baru → Berhasil
□ Lihat daftar jenis bantuan → Data muncul
□ Tambah data penerima BMU → Berhasil
□ Lihat daftar penerima → Data muncul
□ Edit data penerima → Berhasil
□ Hapus data penerima → Masuk recycle bin
□ Lihat recycle bin → Data yang dihapus muncul
□ Restore dari recycle bin → Berhasil
□ Export data ke CSV → File terdownload
```

#### ✅ Step 15: Test Sinkronisasi Real-time
```bash
# Buka 2 browser berbeda (Chrome & Firefox):

Browser 1:
1. Login ke aplikasi
2. Buka halaman "Data IKM Binaan"

Browser 2:
1. Login ke aplikasi (user yang sama)
2. Buka halaman "Data IKM Binaan"
3. Tambah data baru

Browser 1:
4. Tunggu 10 detik
5. Data baru harus muncul otomatis (auto-refresh)

□ Data sinkron antar browser
□ Tidak perlu refresh manual
□ Notifikasi sinkronisasi muncul
```

#### ✅ Step 16: Test Responsive Mobile
```bash
# Buka di mobile atau gunakan DevTools (F12):
1. Klik icon mobile di DevTools
2. Pilih device: iPhone 12 Pro
3. Test navigasi:
   □ Menu sidebar bisa dibuka/tutup
   □ Form input bisa diisi
   □ Tabel bisa di-scroll horizontal
   □ Button bisa diklik
   □ Modal muncul dengan benar
```

#### ✅ Step 17: Test Pencarian & Filter
```bash
□ Pencarian berdasarkan NIB → Hasil benar
□ Pencarian berdasarkan NIK → Hasil benar
□ Pencarian berdasarkan Nama → Hasil benar
□ Filter per tahun → Hasil benar
□ Filter per jenis bantuan → Hasil benar
□ Pagination berfungsi
```

#### ✅ Step 18: Test Export Data
```bash
□ Export CSV → File terdownload, data lengkap
□ Export Excel → File terdownload, data lengkap
□ Export PDF → Notifikasi "dalam pengembangan"
□ Print → Preview print muncul
```

---

### FASE 5: VERIFIKASI DATABASE (5 menit)

#### ✅ Step 19: Cek Data di Supabase
```bash
# Buka Supabase Dashboard:
1. Table Editor → jenis_bantuan
   □ Data yang ditambah dari production ada
   
2. Table Editor → penerima_bmu
   □ Data yang ditambah dari production ada
   □ Data yang diedit sudah terupdate
   
3. Table Editor → recycle_bin
   □ Data yang dihapus ada di sini
   □ Field data_json berisi data lengkap
```

#### ✅ Step 20: Test SQL Query
```sql
-- Jalankan di SQL Editor Supabase:

-- Total jenis bantuan
SELECT COUNT(*) as total FROM jenis_bantuan;

-- Total penerima BMU
SELECT COUNT(*) as total FROM penerima_bmu;

-- Total di recycle bin
SELECT COUNT(*) as total FROM recycle_bin;

-- Data terbaru
SELECT * FROM penerima_bmu 
ORDER BY created_at DESC 
LIMIT 5;

-- Data di recycle bin
SELECT 
    id,
    original_table,
    data_json->>'nama' as nama,
    deleted_at,
    deleted_by
FROM recycle_bin
ORDER BY deleted_at DESC;
```

---

### FASE 6: KONFIGURASI TAMBAHAN (5 menit)

#### ✅ Step 21: Custom Domain (Opsional)
```bash
# Jika punya domain sendiri:
1. Vercel Dashboard → Settings → Domains
2. Add Domain: bmu.disnakerkukm-madiun.go.id
3. Ikuti instruksi DNS configuration
4. Tunggu propagasi (5-30 menit)
```

#### ✅ Step 22: Setup Monitoring
```bash
# Vercel Dashboard → Analytics:
□ Enable Web Analytics
□ Enable Speed Insights
□ Monitor traffic & performance
```

#### ✅ Step 23: Backup Credentials
```bash
# Simpan kredensial penting:
□ URL Production: https://your-app.vercel.app
□ Supabase URL: https://vxxkawcjspxunmotcnve.supabase.co
□ Login Username: BMU-Madiun08
□ Login Password: BMU-Madiun08
□ GitHub Repo: https://github.com/username/repo
□ Vercel Project: https://vercel.com/username/project
```

---

## 🚨 TROUBLESHOOTING CEPAT

### Problem: Login tidak berfungsi
```javascript
// Buka Console (F12) dan jalankan:
localStorage.removeItem('bmu_credentials');
location.reload();
// Login lagi dengan BMU-Madiun08 / BMU-Madiun08
```

### Problem: Data tidak muncul
```javascript
// Buka Console (F12) dan cek:
console.log('Supabase:', window.bmuSupabase);
console.log('Database:', window.BMUDatabase);

// Test query:
window.BMUDatabase.getPenerimaBMU().then(data => {
    console.log('Data:', data);
});
```

### Problem: Error 404 setelah deploy
```bash
# Solusi:
1. Cek vercel.json ada di root project
2. Redeploy: Vercel Dashboard → Deployments → Redeploy
3. Akses langsung: https://your-app.vercel.app/bmu-login.html
```

### Problem: Environment variables tidak terload
```bash
# Solusi:
1. Vercel Dashboard → Settings → Environment Variables
2. Pastikan semua variables ada
3. Redeploy aplikasi
4. Clear cache browser (Ctrl+Shift+Delete)
```

### Problem: Data tidak sinkron antar browser
```bash
# Solusi:
1. Refresh manual (F5) di kedua browser
2. Tunggu 10 detik untuk auto-refresh
3. Cek console untuk error
4. Pastikan kedua browser login dengan user yang sama
```

---

## 📊 HASIL AKHIR YANG DIHARAPKAN

Setelah semua checklist selesai, Anda harus memiliki:

✅ **Aplikasi Production yang Berfungsi Penuh**
- URL: https://your-app.vercel.app
- Login: BMU-Madiun08 / BMU-Madiun08
- Dashboard lengkap dengan statistik
- CRUD operations berfungsi sempurna
- Real-time sync antar browser
- Export data berfungsi
- Responsive di semua device

✅ **Database Supabase yang Terisi**
- Tabel jenis_bantuan dengan data
- Tabel penerima_bmu dengan data
- Tabel recycle_bin dengan data yang dihapus
- RLS aktif dan berfungsi
- Backup data tersedia

✅ **Repository GitHub yang Rapi**
- Semua file tercommit dengan benar
- .env tidak ter-commit
- README.md lengkap
- Dokumentasi lengkap

✅ **Deployment Vercel yang Stabil**
- Build sukses tanpa error
- Environment variables terkonfigurasi
- Custom domain (jika ada)
- Analytics aktif

---

## 🎉 SELAMAT!

Jika semua checklist di atas sudah ✅, maka aplikasi Database BMU DisnakerKUKM Kota Madiun Anda sudah:

- ✅ **ONLINE** dan bisa diakses dari mana saja
- ✅ **AMAN** dengan sistem login
- ✅ **CEPAT** dengan Supabase database
- ✅ **REAL-TIME** dengan auto-sync
- ✅ **RESPONSIVE** di semua device
- ✅ **PRODUCTION-READY** untuk digunakan

---

**Waktu Total**: ~55 menit
**Tingkat Kesulitan**: Mudah - Menengah
**Status**: ✅ SIAP PRODUCTION

**Dibuat**: 8 Januari 2026
**Untuk**: Database BMU DisnakerKUKM Kota Madiun
