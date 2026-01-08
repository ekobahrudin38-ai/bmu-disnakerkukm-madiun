# 🔧 QUICK FIX - Masalah Umum Database BMU

## 🎯 PANDUAN CEPAT PERBAIKAN

### 1️⃣ LOGIN TIDAK BERFUNGSI

#### Gejala:
- Username/password ditolak
- Stuck di halaman login
- Error "Username atau password salah"

#### Solusi Cepat:
```javascript
// Buka Console Browser (F12) dan paste kode ini:

// Reset kredensial ke default
localStorage.removeItem('bmu_credentials');

// Set kredensial default
const defaultCreds = [{
    username: 'BMU-Madiun08',
    password: 'BMU-Madiun08',
    createdAt: new Date().toISOString(),
    createdBy: 'System',
    isDefault: true
}];
localStorage.setItem('bmu_credentials', JSON.stringify(defaultCreds));

// Reload halaman
location.reload();

// Login dengan: BMU-Madiun08 / BMU-Madiun08
```

---

### 2️⃣ DATA TIDAK MUNCUL SETELAH LOGIN

#### Gejala:
- Dashboard kosong
- Tabel tidak ada data
- Loading terus-menerus

#### Solusi Cepat:
```javascript
// Buka Console Browser (F12) dan cek:

// 1. Cek koneksi Supabase
console.log('Supabase Client:', window.bmuSupabase);
console.log('BMU Database:', window.BMUDatabase);

// 2. Test query manual
window.BMUDatabase.getJenisBantuan().then(data => {
    console.log('Jenis Bantuan:', data);
    if (data.length === 0) {
        console.error('❌ Database kosong atau RLS bermasalah');
    } else {
        console.log('✅ Database OK, ada', data.length, 'data');
    }
});

window.BMUDatabase.getPenerimaBMU().then(data => {
    console.log('Penerima BMU:', data);
    if (data.length === 0) {
        console.error('❌ Database kosong atau RLS bermasalah');
    } else {
        console.log('✅ Database OK, ada', data.length, 'data');
    }
});

// 3. Jika error, cek RLS di Supabase
```

#### Jika Database Kosong:
```sql
-- Buka Supabase SQL Editor dan jalankan:

-- Insert data jenis bantuan
INSERT INTO jenis_bantuan (jenis, tahun, status) VALUES
('Bantuan Modal UMKM Tahap 1', 2023, 'active'),
('Bantuan Modal Usaha Mikro', 2023, 'active'),
('Bantuan Modal Koperasi', 2024, 'active'),
('Bantuan Modal Industri Kecil', 2024, 'active');

-- Insert data penerima BMU (contoh)
INSERT INTO penerima_bmu (nib, nik, kk, nama, alamat, tempat_lahir, tanggal_lahir, jenis_kelamin, nama_usaha, bantuan, tahun) VALUES
('1234567890123', '3201234567890123', '3201234567890123', 'AHMAD SURYADI', 'Jl. Merdeka No. 123', 'Bandung', '1985-05-15', 'L', 'Toko Sembako Berkah', 'Bantuan Modal UMKM Tahap 1', 2023);

-- Cek data
SELECT COUNT(*) FROM jenis_bantuan;
SELECT COUNT(*) FROM penerima_bmu;
```

---

### 3️⃣ ERROR RLS (Row Level Security)

#### Gejala:
- Error "new row violates row-level security policy"
- Tidak bisa insert/update/delete data
- Permission denied

#### Solusi Cepat:
```sql
-- Buka Supabase SQL Editor dan jalankan:

-- 1. Cek status RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('jenis_bantuan', 'penerima_bmu', 'recycle_bin');

-- 2. Enable RLS jika belum aktif
ALTER TABLE jenis_bantuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE penerima_bmu ENABLE ROW LEVEL SECURITY;
ALTER TABLE recycle_bin ENABLE ROW LEVEL SECURITY;

-- 3. Hapus policy lama (jika ada error)
DROP POLICY IF EXISTS "Allow all operations on jenis_bantuan" ON jenis_bantuan;
DROP POLICY IF EXISTS "Allow all operations on penerima_bmu" ON penerima_bmu;
DROP POLICY IF EXISTS "Allow all operations on recycle_bin" ON recycle_bin;

-- 4. Buat policy baru
CREATE POLICY "Allow all operations on jenis_bantuan" 
ON jenis_bantuan FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on penerima_bmu" 
ON penerima_bmu FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on recycle_bin" 
ON recycle_bin FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Grant permissions
GRANT ALL ON jenis_bantuan TO anon, authenticated;
GRANT ALL ON penerima_bmu TO anon, authenticated;
GRANT ALL ON recycle_bin TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
```

---

### 4️⃣ DATA TIDAK SINKRON ANTAR BROWSER

#### Gejala:
- Tambah data di browser A, tidak muncul di browser B
- Harus refresh manual untuk lihat data baru
- Auto-refresh tidak berfungsi

#### Solusi Cepat:
```javascript
// Buka Console Browser (F12) di kedua browser:

// 1. Cek auto-refresh berjalan
console.log('Auto-refresh interval:', 10000, 'ms (10 detik)');

// 2. Force refresh manual
if (window.refreshDataFromDatabase) {
    window.refreshDataFromDatabase().then(() => {
        console.log('✅ Data refreshed manually');
    });
}

// 3. Cek timestamp terakhir
console.log('Last refresh:', new Date().toISOString());

// 4. Restart auto-refresh (jika perlu)
location.reload();
```

#### Jika Masih Tidak Sinkron:
```javascript
// Tambahkan interval refresh lebih cepat (sementara)
setInterval(async () => {
    if (window.BMUDatabase && window.refreshDataFromDatabase) {
        await window.refreshDataFromDatabase();
        console.log('Force refresh:', new Date().toLocaleTimeString());
    }
}, 5000); // Setiap 5 detik
```

---

### 5️⃣ RECYCLE BIN TIDAK MUNCUL

#### Gejala:
- Data dihapus tapi tidak masuk recycle bin
- Recycle bin selalu kosong
- Error saat restore data

#### Solusi Cepat:
```javascript
// Buka Console Browser (F12):

// 1. Cek data recycle bin
window.BMUDatabase.getRecycleBin().then(data => {
    console.log('Recycle Bin Data:', data);
    if (data.length === 0) {
        console.log('⚠️ Recycle bin kosong');
    } else {
        console.log('✅ Ada', data.length, 'data di recycle bin');
    }
});

// 2. Test save to recycle bin
const testData = {
    id: 999,
    nib: '9999999999999',
    nik: '9999999999999999',
    nama: 'TEST DATA',
    namaUsaha: 'Test Usaha'
};

window.BMUDatabase.saveToRecycleBin(999, 'penerima_bmu', testData, 'Test User')
    .then(result => {
        console.log('✅ Test save berhasil:', result);
    })
    .catch(error => {
        console.error('❌ Test save gagal:', error);
    });
```

#### Cek Database Langsung:
```sql
-- Buka Supabase SQL Editor:

-- Cek data recycle bin
SELECT * FROM recycle_bin ORDER BY deleted_at DESC;

-- Cek struktur tabel
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'recycle_bin';

-- Jika tabel tidak ada, buat ulang:
CREATE TABLE IF NOT EXISTS recycle_bin (
    id SERIAL PRIMARY KEY,
    original_id INTEGER NOT NULL,
    original_table VARCHAR(50) NOT NULL,
    data_json JSONB NOT NULL,
    deleted_at TIMESTAMP DEFAULT NOW(),
    deleted_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE recycle_bin ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on recycle_bin" 
ON recycle_bin FOR ALL 
USING (true) 
WITH CHECK (true);

-- Grant permissions
GRANT ALL ON recycle_bin TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE recycle_bin_id_seq TO anon, authenticated;
```

---

### 6️⃣ ERROR 404 SETELAH DEPLOY

#### Gejala:
- URL production menampilkan 404
- Halaman tidak ditemukan
- Routing tidak berfungsi

#### Solusi Cepat:

**Opsi 1: Akses Langsung**
```
# Gunakan URL langsung:
https://your-app.vercel.app/bmu-login.html
https://your-app.vercel.app/bmu-index.html
```

**Opsi 2: Cek vercel.json**
```json
// Pastikan file vercel.json ada di root project:
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

**Opsi 3: Redeploy**
```bash
# Di Vercel Dashboard:
1. Deployments → Latest Deployment
2. Klik "..." → Redeploy
3. Tunggu build selesai
4. Test URL lagi
```

---

### 7️⃣ ENVIRONMENT VARIABLES TIDAK TERLOAD

#### Gejala:
- Error "YOUR_SUPABASE_URL"
- Koneksi database gagal
- Config tidak terbaca

#### Solusi Cepat:

**Cek di Browser Console:**
```javascript
// Buka Console (F12):
console.log('Config:', window.getBMUConfig());
console.log('Supabase URL:', window.getBMUConfig().supabaseUrl);
console.log('Demo Mode:', window.getBMUConfig().isDemoMode);
```

**Jika Masih Error:**
```javascript
// Hardcode sementara di bmu-supabase-config.js:
function getBMUConfig() {
    return {
        supabaseUrl: 'https://vxxkawcjspxunmotcnve.supabase.co',
        supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg',
        isDemoMode: false
    };
}
```

**Di Vercel:**
```bash
1. Vercel Dashboard → Settings → Environment Variables
2. Pastikan ada:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - NODE_ENV
   - VITE_DEMO_MODE
3. Redeploy aplikasi
```

---

### 8️⃣ EXPORT DATA TIDAK BERFUNGSI

#### Gejala:
- Klik export tidak ada respon
- File tidak terdownload
- Error di console

#### Solusi Cepat:
```javascript
// Buka Console (F12):

// 1. Cek data tersedia
console.log('Filtered Data:', window.filteredIKMData);
console.log('Total Data:', window.filteredIKMData?.length);

// 2. Test export manual
if (window.exportToExcel) {
    window.exportToExcel();
} else {
    console.error('❌ Function exportToExcel tidak ditemukan');
}

// 3. Export manual dengan code:
const data = window.filteredIKMData || window.ikmData || [];
const csv = data.map((item, index) => {
    return `${index + 1},${item.nib},${item.nik},${item.nama},${item.namaUsaha},${item.bantuan},${item.tahun}`;
}).join('\n');

const header = 'No,NIB,NIK,Nama,Nama Usaha,Bantuan,Tahun\n';
const fullCsv = header + csv;

const blob = new Blob([fullCsv], { type: 'text/csv' });
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'data-bmu-' + new Date().toISOString().slice(0,10) + '.csv';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
window.URL.revokeObjectURL(url);

console.log('✅ Export manual berhasil');
```

---

### 9️⃣ SESSION EXPIRED / AUTO LOGOUT

#### Gejala:
- Tiba-tiba logout sendiri
- Harus login ulang terus
- Session tidak bertahan

#### Solusi Cepat:
```javascript
// Buka Console (F12):

// 1. Cek session
console.log('Logged In:', sessionStorage.getItem('bmu_logged_in'));
console.log('Login Time:', sessionStorage.getItem('bmu_login_time'));
console.log('Username:', sessionStorage.getItem('bmu_username'));

// 2. Perpanjang session (8 jam)
sessionStorage.setItem('bmu_logged_in', 'true');
sessionStorage.setItem('bmu_login_time', new Date().getTime().toString());
sessionStorage.setItem('bmu_username', 'BMU-Madiun08');

console.log('✅ Session diperpanjang');

// 3. Reload halaman
location.reload();
```

#### Ubah Durasi Session:
```javascript
// Edit di bmu-login-script.js dan bmu-script.js:
// Cari: const sessionDuration = 8 * 60 * 60 * 1000; // 8 hours
// Ubah jadi: const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
```

---

### 🔟 MOBILE RESPONSIVE BERMASALAH

#### Gejala:
- Tampilan berantakan di mobile
- Sidebar tidak bisa dibuka
- Button terlalu kecil

#### Solusi Cepat:
```javascript
// Buka Console di Mobile atau DevTools (F12):

// 1. Cek viewport
console.log('Window Width:', window.innerWidth);
console.log('Window Height:', window.innerHeight);

// 2. Force mobile mode
document.body.style.width = '100%';
document.body.style.overflow = 'auto';

// 3. Test sidebar
const sidebar = document.getElementById('sidebar');
if (sidebar) {
    sidebar.classList.toggle('active');
    console.log('Sidebar toggled');
}

// 4. Zoom reset
document.body.style.zoom = '100%';
```

#### Jika Masih Bermasalah:
```css
/* Tambahkan di bmu-styles.css: */
@media (max-width: 768px) {
    body {
        font-size: 14px !important;
    }
    
    .btn {
        padding: 10px 15px !important;
        font-size: 14px !important;
    }
    
    table {
        font-size: 12px !important;
    }
    
    .sidebar {
        width: 100% !important;
    }
}
```

---

## 🆘 EMERGENCY RESET

Jika semua solusi di atas tidak berhasil, lakukan EMERGENCY RESET:

```javascript
// PERINGATAN: Ini akan menghapus SEMUA data lokal!

// 1. Clear semua storage
localStorage.clear();
sessionStorage.clear();

// 2. Clear cache
if ('caches' in window) {
    caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
    });
}

// 3. Reload dengan force refresh
location.reload(true);

// 4. Login ulang dengan kredensial default
// Username: BMU-Madiun08
// Password: BMU-Madiun08
```

---

## 📞 KONTAK SUPPORT

Jika masih ada masalah setelah mencoba semua solusi:

1. **Screenshot Error**: Ambil screenshot error di console
2. **Copy Error Message**: Copy full error message
3. **Catat Langkah**: Catat langkah-langkah yang sudah dicoba
4. **Cek Logs**: 
   - Browser Console (F12)
   - Supabase Logs (Dashboard → Logs)
   - Vercel Logs (Dashboard → Deployments → Function Logs)

---

**Dibuat**: 8 Januari 2026
**Update Terakhir**: 8 Januari 2026
**Untuk**: Database BMU DisnakerKUKM Kota Madiun
