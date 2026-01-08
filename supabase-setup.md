# Setup Supabase untuk Database Penerima BMU DisnakerKUKM

## 1. Buat Akun Supabase
1. Kunjungi https://supabase.com
2. Daftar dengan email atau GitHub
3. Buat project baru: "BMU DisnakerKUKM Madiun"

# Setup Supabase untuk Database Penerima BMU DisnakerKUKM

## 1. Buat Akun Supabase
1. Kunjungi https://supabase.com
2. Daftar dengan email atau GitHub
3. Buat project baru: "BMU DisnakerKUKM Madiun"

## 2. Setup Database (4 Langkah)

⚠️ **PENTING**: Jangan copy-paste file markdown ini ke SQL Editor! 
Gunakan file SQL terpisah yang sudah disediakan.

### Langkah 2A: Buat Tabel dan Index
1. Buka **SQL Editor** di Supabase
2. Klik **"New query"**
3. Buka file `supabase-sql-setup.sql` di project Anda
4. **Copy seluruh isi file** `supabase-sql-setup.sql`
5. **Paste ke SQL Editor** Supabase
6. Klik **"Run"**

### Langkah 2B: Insert Data
1. Buka file `supabase-sql-data.sql`
2. **Copy seluruh isi file** `supabase-sql-data.sql`
3. **Paste ke SQL Editor** Supabase (query baru)
4. Klik **"Run"**

### Langkah 2C: Setup RLS dan Permissions
1. Buka file `supabase-sql-security.sql`
2. **Copy seluruh isi file** `supabase-sql-security.sql`
3. **Paste ke SQL Editor** Supabase (query baru)
4. Klik **"Run"**

### Langkah 2D: Verifikasi Setup
1. Buka file `supabase-sql-verify.sql`
2. **Copy seluruh isi file** `supabase-sql-verify.sql`
3. **Paste ke SQL Editor** Supabase (query baru)
4. Klik **"Run"**

**Hasil yang diharapkan:**
```
tabel          | jumlah_data
---------------|------------
jenis_bantuan  | 4
penerima_bmu   | 5
```

## 3. Konfigurasi Project
1. Di dashboard Supabase, buka **Settings > API**
2. Copy **Project URL** dan **anon public key**
3. Simpan kredensial untuk langkah deployment

### Contoh Kredensial:
```
Project URL: https://vxxkawcjspxunmotcnve.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg...
```

## 4. Test Koneksi Database
1. Di Supabase, buka **Table Editor**
2. Pastikan terlihat 2 tabel:
   - `jenis_bantuan` (4 rows)
   - `penerima_bmu` (5 rows)
3. Klik pada tabel untuk melihat data

## 5. Test API Endpoint
1. Buka **API Docs** di sidebar Supabase
2. Pilih tabel `penerima_bmu`
3. Klik **"Send Request"** pada GET method
4. Pastikan return JSON dengan 5 data penerima BMU

## 6. Troubleshooting

### Jika ada error "relation already exists":
- Gunakan script yang sudah diperbaiki dengan `IF NOT EXISTS`
- Script akan skip tabel yang sudah ada

### Jika RLS warning muncul:
- Pastikan semua script di Langkah 2C sudah dijalankan
- Refresh Security Advisor di Supabase

### Jika data tidak muncul:
- Cek di Table Editor apakah data sudah ada
- Jalankan script verifikasi di Langkah 2D

## 7. Siap untuk Deployment
Setelah setup Supabase selesai:
- ✅ Database BMU DisnakerKUKM siap
- ✅ 2 tabel dengan data sample
- ✅ RLS dikonfigurasi
- ✅ API endpoint aktif
- ✅ Kredensial tersedia

**Lanjutkan ke deployment Vercel!**