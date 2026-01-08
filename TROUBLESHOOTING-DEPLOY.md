# 🔧 Troubleshooting Deploy BMU ke Vercel

## ⚠️ **Warning: Builds Configuration Deprecated**

### **Gejala:**
- Warning di build log: "Due to 'builds' existing in your configuration file, the Build and Development Settings defined in your Project Settings will be ignored"
- Build berhasil tapi ada peringatan kuning

### **Penyebab:**
- Konfigurasi `builds` di `vercel.json` sudah deprecated
- Vercel sekarang otomatis mendeteksi static files

### **Solusi:**
Update `vercel.json` ke format terbaru tanpa `builds`:

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

---

## 🚨 **MASALAH KRITIS: Data Hilang Setelah Logout**

### **Gejala:**
- Admin input data lengkap dengan benar
- Data tampil normal di dashboard
- Setelah logout dan login kembali, data yang diinput hilang
- Data tidak tersimpan permanen

### **Penyebab:**
- Fungsi `handleIKMSubmit` TIDAK menyimpan data ke database Supabase
- Data hanya disimpan ke memori JavaScript (variabel `ikmData`)
- Saat logout/refresh, memori JavaScript direset
- Data hilang karena tidak ada di database

### **Solusi:**
**✅ SUDAH DIPERBAIKI** - Fungsi `handleIKMSubmit` telah diupdate untuk:

1. **Menyimpan ke Supabase Database**:
   ```javascript
   await window.BMUDatabase.savePenerimaBMU(supabaseData);
   ```

2. **Format Data Conversion**:
   - Convert dari format form ke format Supabase
   - Convert kembali dari Supabase ke format lokal

3. **Error Handling**:
   - Try-catch untuk menangani error database
   - Alert yang informatif untuk user

4. **Konsistensi dengan Jenis Bantuan**:
   - Menggunakan pola yang sama dengan `handleBantuanSubmit`
   - Async/await untuk operasi database

### **Verifikasi Perbaikan:**
1. **Input data baru** → Harus muncul pesan "disimpan ke database"
2. **Logout dan login kembali** → Data masih ada
3. **Cek Supabase dashboard** → Data muncul di tabel `penerima_bmu`

---

## ❌ **Masalah: Tampilan Salah Setelah Deploy**

### **Gejala:**
- Website menampilkan halaman demo/siswa bukan halaman login BMU
- Login tidak berfungsi
- Fitur BMU tidak bisa diakses
- URL menunjukkan halaman yang salah

### **Penyebab:**
1. **Routing salah**: Vercel membuka `index.html` (demo) bukan `bmu-login.html` (BMU)
2. **File prioritas**: `index.html` selalu diprioritaskan sebagai homepage
3. **Konfigurasi `vercel.json`** tidak tepat

---

## ✅ **Solusi 1: Update vercel.json (RECOMMENDED)**

### **File: vercel.json**
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

**⚠️ Perubahan Penting:**
- Menghapus `builds` dan `version` (deprecated)
- Menggunakan `rewrites` dengan `source`/`destination` (format terbaru)
- Menghilangkan warning "builds existing in configuration file"

### **Langkah:**
1. Update file `vercel.json` dengan konfigurasi di atas
2. Commit ke GitHub
3. Redeploy di Vercel
4. Test akses website

---

## ✅ **Solusi 2: Buat index.html Redirect**

### **File: index.html (baru)**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database BMU DisnakerKUKM Kota Madiun</title>
</head>
<body>
    <script>
        // Redirect to BMU login page
        window.location.replace('bmu-login.html');
    </script>
    
    <div style="text-align: center; padding: 50px;">
        <h1>Database BMU DisnakerKUKM</h1>
        <p>Mengalihkan ke sistem login...</p>
        <a href="bmu-login.html">Klik di sini jika tidak teralihkan</a>
    </div>
</body>
</html>
```

### **Langkah:**
1. Hapus atau rename `index.html` lama (demo)
2. Buat `index.html` baru dengan kode di atas
3. Commit ke GitHub
4. Redeploy di Vercel

---

## ✅ **Solusi 3: Rename File Demo**

### **Langkah:**
1. **Rename** `index.html` → `demo.html`
2. **Rename** `index-demo.html` → `demo-siswa.html`
3. **Buat** `index.html` baru yang redirect ke BMU
4. **Update** link di dokumentasi

---

## 🔄 **Cara Redeploy di Vercel**

### **Opsi A: Auto Deploy (GitHub)**
1. Commit perubahan ke GitHub
2. Push ke branch main
3. Vercel otomatis deploy ulang

### **Opsi B: Manual Redeploy**
1. Buka dashboard Vercel
2. Pilih project BMU
3. Tab "Deployments"
4. Klik "Redeploy" pada deployment terakhir
5. Pilih "Use existing Build Cache" atau "Redeploy"

---

## 🧪 **Testing Setelah Perbaikan**

### **1. Test URL Utama**
- Akses: `https://your-project.vercel.app`
- Harus redirect ke halaman login BMU
- Tidak boleh menampilkan halaman demo

### **2. Test Login BMU**
- Username: `BMU-Madiun08`
- Password: `BMU-Madiun08`
- Harus berhasil masuk ke dashboard

### **3. Test Fitur BMU**
- Dashboard: Statistik muncul
- Jenis Bantuan: CRUD berfungsi
- Data IKM: CRUD berfungsi
- Export: Download CSV berhasil

### **4. Test URL Alternatif**
- `/login` → Halaman login BMU
- `/dashboard` → Dashboard BMU (setelah login)
- `/demo` → Halaman demo (jika masih ada)

### **5. 🔥 Test Data Persistence (PENTING!)**
1. **Login** ke sistem BMU
2. **Tambah data IKM baru** dengan lengkap
3. **Verifikasi** data muncul di tabel
4. **Logout** dari sistem
5. **Login kembali**
6. **Cek data** → Harus masih ada (tidak hilang)
7. **Buka Supabase dashboard** → Data harus ada di tabel `penerima_bmu`

### **6. Test Database Integration**
1. **Buka Supabase Dashboard** → Table Editor
2. **Tambah data di website** → Harus muncul di Supabase
3. **Edit data di website** → Harus terupdate di Supabase  
4. **Hapus data di website** → Harus terhapus di Supabase

---

## 🔧 **Troubleshooting Lanjutan**

### **❌ Masih menampilkan halaman salah**

**Solusi:**
1. Clear browser cache (Ctrl+F5)
2. Test dengan incognito mode
3. Cek file structure di GitHub
4. Verifikasi `vercel.json` sudah terupdate

### **❌ Error 404 Not Found**

**Solusi:**
1. Pastikan file `bmu-login.html` ada di repository
2. Cek case-sensitive filename
3. Verifikasi routing di `vercel.json`

### **❌ Environment Variables tidak terbaca**

**Solusi:**
1. Cek Settings > Environment Variables di Vercel
2. Pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` ada
3. Redeploy setelah update environment variables

### **❌ CSS/JS tidak terbaca**

**Solusi:**
1. Cek path file CSS/JS di HTML
2. Pastikan file ada di repository
3. Verifikasi tidak ada typo di nama file

---

## 📋 **Checklist Verifikasi**

Setelah perbaikan, pastikan:

- [ ] ✅ URL utama redirect ke login BMU
- [ ] ✅ Halaman login BMU tampil dengan benar
- [ ] ✅ CSS styling terbaca
- [ ] ✅ Login berhasil dengan kredensial default
- [ ] ✅ Dashboard BMU muncul setelah login
- [ ] ✅ Semua menu navigasi berfungsi
- [ ] ✅ Fitur CRUD BMU berfungsi
- [ ] ✅ Export Excel/CSV berfungsi
- [ ] ✅ Tidak ada error di browser console
- [ ] 🔥 **DATA TIDAK HILANG SETELAH LOGOUT** (KRITIS!)
- [ ] 🔥 **Data tersimpan di Supabase database** (KRITIS!)
- [ ] 🔥 **Pesan konfirmasi "disimpan ke database"** (KRITIS!)

### **🚨 Checklist Khusus Data Persistence:**
- [ ] Input data baru → Muncul pesan "disimpan ke database"
- [ ] Logout → Login kembali → Data masih ada
- [ ] Cek Supabase Table Editor → Data ada di `penerima_bmu`
- [ ] Edit data → Terupdate di Supabase
- [ ] Hapus data → Terhapus di Supabase
- [ ] Restore data → Kembali ke Supabase

---

## 🆘 **Jika Masih Bermasalah**

### **Reset Complete:**
1. Hapus deployment di Vercel
2. Buat project Vercel baru
3. Import repository GitHub ulang
4. Set environment variables ulang
5. Deploy dari awal

### **Alternatif Platform:**
- Netlify (alternatif hosting)
- GitHub Pages (untuk static site)
- Firebase Hosting

---

**💡 Tips:** Selalu test di local environment dulu sebelum deploy ke production!

---

## 📱 **Masalah: Menu Sidebar Tidak Tampil di Mobile**

### **Gejala:**
- Menu navigasi sebelah kiri tidak terlihat di tampilan handphone
- Tidak ada cara untuk mengakses menu navigasi di mobile
- Hanya dashboard yang terlihat tanpa navigasi

### **Penyebab:**
- Sidebar disembunyikan di tampilan mobile tanpa tombol toggle
- Tidak ada hamburger menu untuk membuka sidebar
- CSS responsive tidak lengkap untuk mobile navigation

### **Solusi:**
Sudah diperbaiki dengan menambahkan:

1. **Tombol Hamburger Menu** di header
2. **Overlay backdrop** untuk menutup sidebar
3. **Touch-friendly navigation** untuk mobile
4. **Auto-close** saat memilih menu atau resize window

**Fitur Mobile Menu:**
- ☰ Tombol hamburger di kiri atas header
- Tap tombol untuk buka/tutup sidebar
- Tap di luar sidebar untuk menutup
- Menu otomatis tertutup setelah pilih navigasi
- Responsive untuk semua ukuran layar