# 🚀 Panduan Deploy BMU DisnakerKUKM ke Vercel

## ✅ Status: Sistem Siap Deploy
- ✅ Fungsi export Excel/CSV sudah diperbaiki
- ✅ Sistem kredensial sudah optimal
- ✅ Semua fitur BMU berfungsi dengan baik

## 📋 Langkah 1: Persiapan Supabase Database

### 1.1 Buat Project Supabase
1. **Kunjungi** https://supabase.com
2. **Login** dengan akun GitHub/Google
3. **Klik** "New Project"
4. **Isi data project**:
   - Organization: Pilih personal atau buat baru
   - Name: `BMU-DisnakerKUKM-Madiun`
   - Database Password: Buat password yang kuat
   - Region: Southeast Asia (Singapore) - terdekat dengan Indonesia
5. **Tunggu** hingga project selesai dibuat (~2 menit)

### 1.2 Setup Database BMU
1. **Buka** SQL Editor di dashboard Supabase
2. **Copy dan jalankan** script dari file `supabase-sql-setup.sql`
3. **Jalankan** script data dummy dari `supabase-sql-data.sql`
4. **Verifikasi** dengan script `supabase-sql-verify.sql`

### 1.3 Dapatkan Kredensial Supabase
1. **Buka** Settings > API di dashboard Supabase
2. **Copy** informasi berikut:
   - Project URL: `https://xxxxx.supabase.co`
   - anon public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. **Simpan** untuk langkah selanjutnya

## 📋 Langkah 2: Persiapan File untuk Deploy

### 2.1 Cek File Konfigurasi
Pastikan file `vercel.json` sudah ada dan benar (format terbaru tanpa builds):

```json
{
  "rewrites": [
    {
      "source": "/",
      "destination": "/bmu-login.html"
    },
    {
      "source": "/login",
      "destination": "/bmu-login.html"
    },
    {
      "source": "/dashboard",
      "destination": "/bmu-index.html"
    },
    {
      "source": "/demo",
      "destination": "/index.html"
    }
  ]
}
```

### 2.2 Update File Environment
1. **Buat** file `.env` di root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Pastikan** file `.env` sudah ada di `.gitignore`:
```gitignore
.env
.env.local
.env.production
node_modules/
```

### 2.3 Hapus File Test (Opsional)
Untuk production yang bersih, hapus file test:
- `test-export.html`
- `test-credentials.html`
- `test.html`

## 📋 Langkah 3: Deploy ke Vercel

### 3.1 Upload ke GitHub
1. **Buat** repository baru di GitHub
2. **Upload** semua file project
3. **Pastikan** struktur folder seperti ini:
```
bmu-disnakerkukm/
├── bmu-login.html          # Entry point
├── bmu-index.html          # Dashboard BMU
├── bmu-script.js           # Logic BMU
├── bmu-login-script.js     # Logic login
├── bmu-styles.css          # Style BMU
├── bmu-supabase-config.js  # Config Supabase
├── vercel.json             # Config Vercel
├── .env                    # Environment variables
├── .gitignore              # Git ignore
└── README.md               # Dokumentasi
```

### 3.2 Deploy dengan Vercel
1. **Kunjungi** https://vercel.com
2. **Login** dengan akun GitHub
3. **Klik** "New Project"
4. **Import** repository GitHub Anda
5. **Konfigurasi** project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)
6. **Tambahkan** Environment Variables:
   - `VITE_SUPABASE_URL`: Project URL dari Supabase
   - `VITE_SUPABASE_ANON_KEY`: Anon key dari Supabase
7. **Klik** "Deploy"

### 3.3 Konfigurasi Environment Variables
1. **Setelah** deploy berhasil, buka project di Vercel dashboard
2. **Klik** tab "Settings"
3. **Pilih** "Environment Variables"
4. **Tambahkan** variabel:
   ```
   Name: VITE_SUPABASE_URL
   Value: https://xxxxx.supabase.co
   
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. **Klik** "Save"
6. **Redeploy** dengan klik "Deployments" > "Redeploy"

## 📋 Langkah 4: Testing Production

### 4.1 Test Akses Website
1. **Akses** URL Vercel: `https://your-project.vercel.app`
2. **Pastikan** redirect ke halaman login
3. **Login** dengan kredensial default:
   - Username: `BMU-Madiun08`
   - Password: `BMU-Madiun08`

### 4.2 Test Fitur BMU
1. **Dashboard**: Lihat statistik BMU
2. **Jenis Bantuan**: Tambah, edit, hapus jenis bantuan
3. **Data IKM**: Tambah, edit, hapus data penerima
4. **Export**: Test export Excel/CSV
5. **Laporan**: Generate dan export laporan
6. **Pencarian**: Test search dan filter
7. **Kredensial**: Tambah user login baru

### 4.3 Test Integrasi Supabase
1. **Buka** Supabase dashboard
2. **Cek** Table Editor untuk melihat data
3. **Tambah** data di website, pastikan muncul di Supabase
4. **Edit** data di website, pastikan terupdate di Supabase

## 🔧 Troubleshooting

### ❌ Error: Supabase connection failed
**Solusi**:
- Periksa URL dan API key di environment variables
- Pastikan RLS policy sudah dikonfigurasi
- Cek network tab di browser developer tools
- Verifikasi Supabase project masih aktif

### ❌ Error: Login gagal
**Solusi**:
- Gunakan kredensial: `BMU-Madiun08` / `BMU-Madiun08`
- Clear browser cache dan localStorage
- Cek console browser untuk error JavaScript
- Test dengan browser incognito

### ❌ Data tidak muncul
**Solusi**:
- Pastikan tabel sudah dibuat di Supabase
- Cek apakah ada data di Table Editor Supabase
- Verifikasi environment variables sudah benar
- Periksa RLS policies di Supabase

### ❌ Export tidak berfungsi
**Solusi**:
- Pastikan ada data untuk diekspor
- Cek console browser untuk error
- Test dengan browser yang mendukung download
- Verifikasi fungsi export sudah diperbaiki

## 🔒 Keamanan Production

### Untuk DisnakerKUKM yang lebih aman:

1. **Custom Domain**:
   - Beli domain: `bmu-disnakerkukm-madiun.id`
   - Setup di Vercel > Domains
   - Update DNS records

2. **SSL Certificate**:
   - Otomatis dari Vercel
   - Pastikan HTTPS aktif

3. **Environment Security**:
   - Jangan commit file `.env`
   - Gunakan environment variables Vercel
   - Rotate API keys secara berkala

## 📊 Monitoring & Maintenance

### 1. Vercel Analytics
- Aktifkan di project settings
- Monitor traffic dan performance
- Lihat error logs di Functions tab

### 2. Supabase Monitoring
- Pantau database usage
- Monitor API requests
- Setup alerts untuk limit usage

### 3. Backup Data
- Export data BMU secara berkala
- Backup database Supabase
- Simpan backup di multiple locations

## 🎉 Selesai!

**✅ Sistem BMU DisnakerKUKM Kota Madiun sudah online!**

**🔗 URL Production**: `https://your-project.vercel.app`
**👤 Login Default**: `BMU-Madiun08` / `BMU-Madiun08`
**📊 Database**: Supabase (Real-time)
**🚀 Hosting**: Vercel (Global CDN)

### Fitur yang Tersedia:
- ✅ Manajemen Jenis Bantuan Modal Usaha
- ✅ Database Penerima BMU dengan validasi NIB/NIK
- ✅ Export data ke Excel/CSV dengan timestamp
- ✅ Laporan BMU DisnakerKUKM dengan filter
- ✅ Sistem login multi-user dengan kredensial custom
- ✅ Pencarian dan filter data penerima
- ✅ Recycle bin untuk restore data
- ✅ Responsive design untuk semua device
- ✅ Real-time database dengan Supabase

**🎯 Siap digunakan untuk DisnakerKUKM Kota Madiun!**