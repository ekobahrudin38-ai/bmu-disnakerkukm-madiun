# Setup Otomatis Database Siswa

## Ringkasan Langkah

### 🔧 Persiapan
1. **Supabase Account**: Daftar di https://supabase.com
2. **GitHub Account**: Untuk repository dan Vercel integration
3. **Vercel Account**: Daftar di https://vercel.com dengan GitHub

### 📊 Setup Database (5 menit)
1. Buat project baru di Supabase
2. Copy-paste SQL dari `supabase-setup.md` ke SQL Editor
3. Jalankan query untuk membuat tabel dan data sample
4. Copy Project URL dan anon key dari Settings > API

### 🚀 Deploy ke Vercel (3 menit)
1. Push project ke GitHub repository
2. Import repository di Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### ✅ Verifikasi
- [ ] Data siswa muncul di website
- [ ] Bisa tambah data baru
- [ ] Bisa edit data existing
- [ ] Bisa hapus data
- [ ] Search berfungsi
- [ ] Export berfungsi

## Checklist Deployment

### Pre-deployment
- [ ] File `vercel.json` ada
- [ ] File `.env.example` ada
- [ ] Supabase project sudah dibuat
- [ ] Database table sudah dibuat
- [ ] Sample data sudah diinsert

### Deployment
- [ ] Repository di-push ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Environment variables di-set
- [ ] Deploy berhasil
- [ ] Website bisa diakses

### Post-deployment
- [ ] Test semua fitur CRUD
- [ ] Verifikasi data tersimpan di Supabase
- [ ] Test responsive design
- [ ] Test export functions
- [ ] Setup custom domain (opsional)

## Troubleshooting Cepat

### Website tidak load
```bash
# Cek console browser untuk error
# Pastikan Supabase URL dan key benar
# Verifikasi environment variables di Vercel
```

### Data tidak muncul
```sql
-- Cek di Supabase SQL Editor
SELECT * FROM siswa;

-- Pastikan RLS policy benar
SELECT * FROM pg_policies WHERE tablename = 'siswa';
```

### Error saat deploy
```bash
# Cek build logs di Vercel
# Pastikan vercel.json syntax benar
# Verifikasi semua file ter-commit
```

## Estimasi Waktu Total: 10-15 menit

Dengan mengikuti panduan ini, website Database Siswa Anda akan online dalam waktu kurang dari 15 menit!