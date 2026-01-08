# ✅ Checklist Deploy BMU ke Vercel

## 📋 Persiapan (15 menit)

### ☐ 1. Setup Supabase
- [ ] Buat account di https://supabase.com
- [ ] Buat project baru: "BMU-DisnakerKUKM-Madiun"
- [ ] Jalankan SQL dari `supabase-sql-setup.sql`
- [ ] Jalankan SQL dari `supabase-sql-data.sql`
- [ ] Copy Project URL dan anon key

### ☐ 2. Persiapan File
- [ ] Pastikan `vercel.json` ada di root
- [ ] Buat file `.env` dengan kredensial Supabase
- [ ] Tambahkan `.env` ke `.gitignore`
- [ ] Hapus file test (opsional): `test-*.html`

## 🚀 Deploy (10 menit)

### ☐ 3. Upload ke GitHub
- [ ] Buat repository baru di GitHub
- [ ] Upload semua file project
- [ ] Pastikan struktur folder benar
- [ ] Commit dan push ke main branch

### ☐ 4. Deploy ke Vercel
- [ ] Login ke https://vercel.com dengan GitHub
- [ ] Klik "New Project"
- [ ] Import repository GitHub
- [ ] Set Framework: "Other"
- [ ] Tambah Environment Variables:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Klik "Deploy"

## 🧪 Testing (5 menit)

### ☐ 5. Test Production
- [ ] Akses URL Vercel
- [ ] Login: `BMU-Madiun08` / `BMU-Madiun08`
- [ ] Test dashboard BMU
- [ ] Test tambah data IKM
- [ ] Test export Excel/CSV
- [ ] Test laporan BMU
- [ ] Verifikasi data di Supabase

## 🎯 Selesai!

**URL Production**: `https://your-project.vercel.app`
**Login**: `BMU-Madiun08` / `BMU-Madiun08`

---

## 🆘 Jika Ada Masalah

### Login Gagal
1. Clear browser cache
2. Cek console browser (F12)
3. Verifikasi kredensial default

### Data Tidak Muncul
1. Cek environment variables di Vercel
2. Verifikasi tabel di Supabase
3. Cek network tab di browser

### Export Tidak Berfungsi
1. Pastikan ada data untuk diekspor
2. Test dengan browser lain
3. Cek console untuk error JavaScript

**📞 Support**: Lihat file `vercel-deploy.md` untuk troubleshooting lengkap