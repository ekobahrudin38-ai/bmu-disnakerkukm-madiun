# Panduan Database BMU DisnakerKUKM Kota Madiun - Enhanced Version

## 🚀 Quick Start

### Langkah 1: Login ke Sistem DisnakerKUKM
1. **Buka file `bmu-login.html`** di browser Chrome
2. **Gunakan kredensial yang telah diberikan oleh admin**
3. **Klik "Masuk ke Dashboard"**
4. Sistem akan mengalihkan ke dashboard utama DisnakerKUKM

### Langkah 2: Eksplorasi Fitur
1. **Dashboard** - Lihat statistik real-time
2. **Jenis Bantuan** - Kelola jenis bantuan dengan jumlah penerima
3. **Data IKM** - Kelola data penerima BMU
4. **Pencarian** - Cari data berdasarkan NIB/NIK/Nama
5. **Recycle Bin** - Kelola data yang dihapus
6. **Pengaturan** - Kelola kredensial login

## 📋 Fitur Baru yang Ditambahkan

### 🔐 **Sistem Login & Keamanan**
- ✅ **Halaman login** dengan autentikasi
- ✅ **Session management** (8 jam)
- ✅ **Kredensial default**: BMU-Madiun08 / BMU-Madiun08
- ✅ **Logout otomatis** jika session expired

### 👥 **Enhanced Jenis Bantuan**
- ✅ **Jumlah penerima** ditampilkan untuk setiap jenis bantuan
- ✅ **Symbol mata (👁️)** untuk melihat daftar penerima
- ✅ **Modal detail penerima** dengan data lengkap
- ✅ **Edit/hapus langsung** dari modal penerima

### ⚙️ **Pengaturan Sistem**
- ✅ **Kelola kredensial login** - tambah username/password baru
- ✅ **Informasi user aktif** dan waktu login
- ✅ **Backup data** ke file JSON
- ✅ **Reset data** ke kondisi awal

## 🎯 Cara Penggunaan Fitur Baru

### 1. Mengelola Kredensial Login
1. Login ke sistem
2. Klik menu **"⚙️ Pengaturan"**
3. Klik **"Kelola Kredensial"**
4. **Tambah kredensial baru:**
   - Masukkan username baru
   - Masukkan password baru (min. 6 karakter)
   - Konfirmasi password
   - Klik **"➕ Tambah Kredensial"**
5. **Hapus kredensial:** Klik tombol 🗑️ pada kredensial yang ingin dihapus

### 2. Melihat Daftar Penerima BMU
1. Klik menu **"🏷️ Jenis Bantuan"**
2. Lihat kolom **"Jumlah Penerima"** - menampilkan jumlah real-time
3. Klik tombol **"👁️ Lihat Penerima"** pada jenis bantuan yang diinginkan
4. **Modal akan menampilkan:**
   - Informasi jenis bantuan dan tahun
   - Total penerima
   - Daftar lengkap penerima dengan NIB, NIK, nama, dan usaha
   - Opsi edit/hapus langsung dari modal

### 3. Backup & Restore Data
1. Di menu **"⚙️ Pengaturan"**
2. **Backup Data:** Klik **"Backup Data"** - file JSON akan terdownload
3. **Reset Data:** Klik **"Reset Data"** - mengembalikan ke data dummy awal

## 📊 Data Dummy yang Tersedia

### Kredensial Login:
- **Default:** Hubungi admin DisnakerKUKM untuk kredensial

### Jenis Bantuan (dengan jumlah penerima):
- **Bantuan Modal UMKM Tahap 1 (2023)** - 2 penerima
- **Bantuan Modal Usaha Mikro (2023)** - 1 penerima  
- **Bantuan Modal Koperasi (2024)** - 1 penerima
- **Bantuan Modal Industri Kecil (2024)** - 1 penerima

### Data IKM (5 data lengkap):
1. **AHMAD SURYADI** - Toko Sembako Berkah (UMKM Tahap 1, 2023)
2. **SITI NURHALIZA** - Warung Makan Sederhana (Usaha Mikro, 2023)
3. **BUDI SANTOSO** - Bengkel Motor Jaya (Koperasi, 2024)
4. **DEWI SARTIKA** - Salon Kecantikan Dewi (Industri Kecil, 2024)
5. **RUDI HERMAWAN** - Toko Elektronik Rudi (UMKM Tahap 1, 2023)

*Data dummy untuk testing sistem DisnakerKUKM Kota Madiun*

## 🔧 Testing Checklist Enhanced

### Login & Security:
- [ ] Buka `bmu-login.html` di Chrome
- [ ] Login dengan kredensial default
- [ ] Test session timeout (8 jam)
- [ ] Test logout manual

### Jenis Bantuan Enhanced:
- [ ] Lihat jumlah penerima di tabel jenis bantuan
- [ ] Klik tombol "👁️ Lihat Penerima"
- [ ] Verifikasi data penerima di modal
- [ ] Test edit/hapus dari modal penerima

### Pengaturan Sistem:
- [ ] Tambah kredensial login baru
- [ ] Test login dengan kredensial baru
- [ ] Hapus kredensial (selain default)
- [ ] Backup data ke JSON
- [ ] Reset data sistem

### Fitur Existing:
- [ ] CRUD data IKM dengan validasi
- [ ] Pencarian berdasarkan NIB/NIK/Nama
- [ ] Recycle bin (restore/hapus permanen)
- [ ] Export data ke CSV
- [ ] Deteksi duplikat NIB/NIK

## 🚀 Deployment Enhanced

### File Structure Lengkap:
```
├── bmu-login.html          ← Halaman login
├── bmu-login-styles.css    ← Styling login
├── bmu-login-script.js     ← Logic login
├── bmu-index.html          ← Dashboard utama
├── bmu-styles.css          ← Styling dashboard
├── bmu-script.js           ← Logic dashboard
├── BMU-GUIDE.md            ← Panduan ini
└── README.md               ← Dokumentasi umum
```

### Local Testing:
```bash
# Buka halaman login
double-click bmu-login.html

# Atau gunakan local server
python -m http.server 8000
# Akses: http://localhost:8000/bmu-login.html
```

### Production Deployment:
1. **Upload semua file BMU** ke hosting
2. **Set bmu-login.html** sebagai index/landing page
3. **Konfigurasi redirect** dari bmu-index.html ke bmu-login.html jika belum login
4. **Untuk database real**, integrasikan dengan Supabase/Firebase

## 🎨 Fitur UI/UX Enhanced

### Login Page:
- **Modern gradient background** dengan animasi floating shapes
- **Glassmorphism design** dengan backdrop blur
- **Smooth animations** dan transitions
- **Responsive layout** untuk semua device
- **Auto-fill kredensial** untuk testing

### Dashboard Enhanced:
- **Session indicator** di header
- **Logout button** di sidebar
- **Real-time recipient count** di tabel jenis bantuan
- **Enhanced modals** dengan informasi lengkap
- **Professional settings page** dengan card layout

## 🔮 Security Features

### Authentication:
- ✅ **Session-based login** dengan timeout
- ✅ **Multiple credentials** support
- ✅ **Secure password storage** (localStorage)
- ✅ **Auto-redirect** jika tidak login

### Data Protection:
- ✅ **Local data backup** ke JSON
- ✅ **Credential management** dengan validasi
- ✅ **Session expiry** otomatis
- ✅ **Confirmation dialogs** untuk aksi penting

## 📞 Support Enhanced

### Troubleshooting Login:
1. **Tidak bisa login:** Hubungi admin DisnakerKUKM untuk kredensial yang benar
2. **Session expired:** Login ulang, session berlaku 8 jam
3. **Lupa password:** Hubungi admin untuk reset kredensial

### Troubleshooting Fitur:
1. **Jumlah penerima tidak update:** Refresh halaman atau klik menu lain lalu kembali
2. **Modal tidak muncul:** Pastikan JavaScript enabled
3. **Data hilang:** Gunakan fitur backup/restore di pengaturan

---

**Selamat menggunakan Database BMU DisnakerKUKM Kota Madiun! 🎉**

**Login:** bmu-login.html → **Dashboard:** bmu-index.html

**Dinas Tenaga Kerja dan Usaha Kecil Menengah Kota Madiun**

## 📋 Fitur Utama Sistem

### 1. Dashboard
- **Statistik Real-time**: Total IKM, Jenis Bantuan, Tahun Aktif, Data di Recycle Bin
- **Overview sistem** dengan tampilan yang informatif

### 2. Kelola Jenis Bantuan Modal Usaha
- ✅ **Tambah jenis bantuan** dengan tahun (2020-2030)
- ✅ **Edit dan hapus** jenis bantuan
- ✅ **Status aktif/tidak aktif** untuk setiap jenis bantuan

### 3. Data IKM Binaan
- ✅ **Form lengkap** dengan validasi:
  - Nomor NIB (13 digit) - dengan deteksi duplikat
  - Nomor NIK (16 digit) - dengan deteksi duplikat  
  - Nomor KK (16 digit)
  - Nama Lengkap
  - Alamat Lengkap (KTP)
  - Tempat & Tanggal Lahir
  - Jenis Kelamin
  - Nama Usaha
  - Bantuan Modal Usaha (dropdown dari data point 1)
  - Tahun (dropdown dari data point 1)

### 4. Pencarian Data
- ✅ **Pencarian berdasarkan**:
  - Nomor NIB
  - Nomor NIK  
  - Nama Lengkap
- ✅ **Hasil pencarian lengkap** dengan semua data

### 5. Edit & Hapus Data
- ✅ **Edit data** dengan form yang sama
- ✅ **Hapus data** dengan konfirmasi
- ✅ **Data terhapus masuk Recycle Bin** otomatis

### 6. Recycle Bin
- ✅ **Restore data** kembali ke tempat semula
- ✅ **Hapus permanen** dengan konfirmasi
- ✅ **Kosongkan Recycle Bin** sekaligus

### 7. Deteksi Duplikat
- ✅ **Peringatan NIB sama** dengan symbol ⚠️
- ✅ **Peringatan NIK sama** dengan symbol ⚠️
- ✅ **Data tetap bisa disimpan** meski ada duplikat

### 8. Export Data
- ✅ **Export ke Excel/CSV** format lengkap
- ⏳ **Export ke PDF** (dalam pengembangan)

## 🎯 Cara Penggunaan

### Langkah 1: Setup Jenis Bantuan
1. Klik menu **"Jenis Bantuan"**
2. Klik tombol **"➕ Tambah Jenis Bantuan"**
3. Isi form:
   - Jenis Bantuan: "Bantuan Modal UMKM Tahap 1"
   - Tahun: 2024
4. Klik **"💾 Simpan"**

### Langkah 2: Tambah Data IKM
1. Klik menu **"Data IKM Binaan"**
2. Klik tombol **"➕ Tambah IKM"**
3. Isi semua field yang wajib (bertanda *)
4. Sistem akan otomatis mendeteksi duplikat NIB/NIK
5. Pilih jenis bantuan dari dropdown (data dari langkah 1)
6. Klik **"💾 Simpan Data"**

### Langkah 3: Pencarian Data
1. Klik menu **"Pencarian Data"**
2. Masukkan salah satu:
   - NIB (13 digit)
   - NIK (16 digit)
   - Nama Lengkap
3. Klik **"🔍 Cari Data"**
4. Hasil akan ditampilkan dengan opsi edit/hapus

### Langkah 4: Export Data
1. Di menu **"Data IKM Binaan"**
2. Klik **"📊 Export Excel"** untuk download CSV
3. File akan otomatis terdownload

## 📊 Data Dummy yang Tersedia

Sistem sudah dilengkapi dengan data dummy untuk testing:

### Jenis Bantuan:
- Bantuan Modal UMKM Tahap 1 (2023)
- Bantuan Modal Usaha Mikro (2023)
- Bantuan Modal Koperasi (2024)
- Bantuan Modal Industri Kecil (2024)

### Data IKM (5 data):
1. **AHMAD SURYADI** - Toko Sembako Berkah
2. **SITI NURHALIZA** - Warung Makan Sederhana
3. **BUDI SANTOSO** - Bengkel Motor Jaya
4. **DEWI SARTIKA** - Salon Kecantikan Dewi
5. **RUDI HERMAWAN** - Toko Elektronik Rudi

## ⚠️ Fitur Validasi & Peringatan

### Validasi Input:
- **NIB**: Harus tepat 13 digit
- **NIK**: Harus tepat 16 digit
- **KK**: Harus tepat 16 digit
- **Semua field wajib**: Tidak boleh kosong

### Deteksi Duplikat:
- **Symbol ⚠️** muncul jika NIB/NIK sudah ada
- **Peringatan kuning** di form input
- **Data tetap bisa disimpan** untuk fleksibilitas

## 🔧 Testing Checklist

- [ ] Buka `bmu-index.html` di Chrome
- [ ] Dashboard menampilkan statistik
- [ ] Tambah jenis bantuan baru
- [ ] Tambah data IKM dengan validasi
- [ ] Test pencarian berdasarkan NIB/NIK/Nama
- [ ] Edit data IKM existing
- [ ] Hapus data (masuk recycle bin)
- [ ] Restore data dari recycle bin
- [ ] Export data ke CSV
- [ ] Test deteksi duplikat NIB/NIK

## 🚀 Deployment

### Local Testing:
```bash
# Buka langsung di browser
double-click bmu-index.html

# Atau gunakan local server
python -m http.server 8000
# Akses: http://localhost:8000/bmu-index.html
```

### Production Deployment:
1. Upload semua file BMU ke hosting
2. Untuk database real, integrasikan dengan Supabase
3. Deploy ke Netlify/Vercel untuk akses online

## 📁 File Structure

```
├── bmu-index.html      ← Halaman utama BMU
├── bmu-styles.css      ← Styling khusus BMU
├── bmu-script.js       ← Logic JavaScript BMU
├── BMU-GUIDE.md        ← Panduan ini
└── README.md           ← Dokumentasi umum
```

## 🎨 Fitur UI/UX

- **Modern Design** dengan gradient dan shadow
- **Responsive Layout** untuk mobile & desktop
- **Smooth Animations** pada hover dan transition
- **Color-coded Status** untuk berbagai kondisi
- **Modal Forms** yang user-friendly
- **Real-time Validation** dengan feedback visual

## 🔮 Roadmap Pengembangan

### Phase 1 (Selesai):
- ✅ CRUD Jenis Bantuan
- ✅ CRUD Data IKM
- ✅ Pencarian & Filter
- ✅ Recycle Bin
- ✅ Export CSV
- ✅ Deteksi Duplikat

### Phase 2 (Future):
- 🔄 Export PDF dengan template
- 🔄 Import data dari Excel
- 🔄 Laporan statistik advanced
- 🔄 User management & authentication
- 🔄 Backup & restore database
- 🔄 API integration

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Buka Developer Tools (F12) untuk cek error
2. Screenshot error dan kirim untuk bantuan
3. Pastikan menggunakan browser modern (Chrome/Firefox)

---

**Selamat menggunakan Database BMU! 🎉**