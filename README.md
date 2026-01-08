# Database Penerima BMU - DisnakerKUKM Kota Madiun

Aplikasi web untuk mengelola data penerima Bantuan Modal Usaha (BMU) DisnakerKUKM Kota Madiun dengan fitur CRUD lengkap, menggunakan Supabase sebagai backend database dan dapat di-deploy ke Vercel.

## Fitur Utama

- ✅ **Dashboard Admin** - Interface yang user-friendly untuk DisnakerKUKM
- ✅ **CRUD Operations** - Create, Read, Update, Delete data penerima BMU
- ✅ **Kelola Jenis Bantuan** - Manajemen jenis bantuan modal usaha
- ✅ **Search & Filter** - Pencarian data penerima berdasarkan NIB, NIK, nama
- ✅ **Export Data** - Export ke CSV, Excel, PDF, Print
- ✅ **Responsive Design** - Tampilan optimal di semua device
- ✅ **Real-time Database** - Menggunakan Supabase REST API
- ✅ **Authentication System** - Login system untuk keamanan
- ✅ **Recycle Bin** - Restore data yang terhapus

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **UI Framework**: Custom CSS dengan design modern DisnakerKUKM

## Quick Start

## Quick Start

### 1. Setup Supabase
1. Buat akun di https://supabase.com
2. Buat project baru: "BMU DisnakerKUKM Madiun"
3. Jalankan SQL dari `supabase-setup.md`
4. Copy URL dan API key dari Settings > API

### 2. Konfigurasi Local
```bash
# Copy environment template
cp .env.example .env

# Edit .env dengan kredensial Supabase Anda
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Test Local
```bash
# Buka bmu-login.html di browser atau gunakan live server
python -m http.server 8000
# Akses http://localhost:8000/bmu-login.html
```

### 4. Deploy ke Vercel
```bash
# Push ke GitHub repository
git add .
git commit -m "BMU DisnakerKUKM system"
git push origin main

# Deploy di vercel.com:
# 1. Import GitHub repository
# 2. Set environment variables
# 3. Deploy!
```

**Panduan lengkap ada di `vercel-deploy.md`**

## Struktur Project

```
├── bmu-login.html          # Halaman login DisnakerKUKM
├── bmu-login-styles.css    # Styling login
├── bmu-login-script.js     # Logic login
├── bmu-index.html          # Dashboard utama BMU
├── bmu-styles.css          # Styling dashboard
├── bmu-script.js           # Logic JavaScript BMU
├── config.js               # Configuration helper
├── vercel.json             # Konfigurasi Vercel
├── supabase-setup.md       # Panduan setup database
├── vercel-deploy.md        # Panduan deployment
└── README.md               # Dokumentasi
```

## Fitur Detail

### Data Management
- Tambah data siswa baru
- Edit data siswa existing
- Hapus data siswa
- Bulk operations (select multiple)

### Search & Export
- Real-time search
- Export ke berbagai format
- Print-friendly layout
- Pagination untuk performa optimal

### UI/UX
- Modern dashboard design
- Responsive untuk mobile & desktop
- Loading states & error handling
- Intuitive navigation

## Database Schema

```sql
-- Tabel Jenis Bantuan
CREATE TABLE jenis_bantuan (
    id SERIAL PRIMARY KEY,
    jenis VARCHAR(200) NOT NULL,
    tahun INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel Penerima BMU (IKM)
CREATE TABLE penerima_bmu (
    id SERIAL PRIMARY KEY,
    nib VARCHAR(13) UNIQUE NOT NULL,
    nik VARCHAR(16) UNIQUE NOT NULL,
    kk VARCHAR(16) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL,
    tempat_lahir VARCHAR(50) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin CHAR(1) CHECK (jenis_kelamin IN ('L', 'P')),
    nama_usaha VARCHAR(200) NOT NULL,
    bantuan VARCHAR(200) NOT NULL,
    tahun INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    is_duplicate BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Development

### Prerequisites
- Browser modern (Chrome, Firefox, Safari, Edge)
- Akun Supabase (gratis)
- Akun Netlify (gratis)

### Local Development
1. Clone atau download project
2. Setup Supabase sesuai panduan
3. Update konfigurasi di script.js
4. Buka index.html di browser

### Production Deployment
1. Test semua fitur di local
2. Push ke GitHub repository
3. Connect repository ke Netlify
4. Auto-deploy akan berjalan

## Customization

### Menambah Field Baru
1. Update database schema di Supabase
2. Tambah input field di modal form
3. Update JavaScript untuk handle field baru
4. Adjust table columns di HTML

### Styling
- Edit `styles.css` untuk mengubah tampilan
- Gunakan CSS variables untuk konsistensi warna
- Responsive breakpoints sudah tersedia

### Functionality
- Tambah fitur baru di `script.js`
- Gunakan Supabase client untuk database operations
- Implement error handling yang proper

## Security Notes

⚠️ **Penting untuk Production:**
- Implementasikan Row Level Security (RLS) di Supabase
- Tambahkan sistem autentikasi user
- Batasi akses berdasarkan role
- Validasi input di client dan server side

## Support & Contribution

Jika ada pertanyaan atau ingin berkontribusi:
1. Buat issue untuk bug report
2. Fork repository untuk feature request
3. Submit pull request dengan deskripsi yang jelas

## License

MIT License - bebas digunakan untuk project personal maupun komersial.

---

**Happy Coding! 🚀**