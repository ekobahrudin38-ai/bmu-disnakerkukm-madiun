# Panduan Demo Database Siswa

## 🚀 Quick Start - Demo Version

Untuk melihat website dengan data dummy yang pasti tampil:

### Buka File Demo:
**`index-demo.html`** - Versi demo tanpa dependency Supabase

File ini dijamin akan menampilkan data dummy siswa seperti:
- ABDUL LATIF
- BADARIANSYAH  
- GINA NOVITA SARI
- M.ALI SAPUTRA
- MUHAMAD JAMIL
- SITI SOFIYATI MAULIA
- SUKRON ZAILANI
- ULFA EDA
- ZAENUR ARI RAHMAN

## 📁 File Structure

```
├── index-demo.html     ← BUKA INI UNTUK DEMO
├── script-demo.js      ← JavaScript untuk demo
├── index.html          ← Versi dengan Supabase
├── script.js           ← JavaScript dengan Supabase
├── styles.css          ← CSS styling
├── test.html           ← File test sederhana
└── README.md           ← Dokumentasi lengkap
```

## ✅ Fitur Demo yang Berfungsi

### Data Management
- ✅ Tampil data dummy 9 siswa
- ✅ Tambah data siswa baru
- ✅ Edit data siswa existing  
- ✅ Hapus data siswa
- ✅ Search/filter data

### Export Features
- ✅ Copy to clipboard
- ✅ Export to CSV
- ✅ Print table
- ⏳ Excel & PDF (coming soon)

### UI Features
- ✅ Responsive design
- ✅ Modal form
- ✅ Pagination
- ✅ Select all checkbox
- ✅ Modern styling

## 🔧 Cara Menggunakan

### 1. Demo Langsung
```bash
# Buka file di browser
double-click index-demo.html
# atau
right-click → Open with → Chrome
```

### 2. Local Server (Optional)
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# Akses: http://localhost:8000/index-demo.html
```

## 🎯 Testing Checklist

- [ ] Buka `index-demo.html` di Chrome
- [ ] Pastikan 9 data siswa tampil di tabel
- [ ] Test tombol "Tambah" untuk add data
- [ ] Test tombol edit (✏️) di setiap row
- [ ] Test tombol delete (🗑️) di setiap row
- [ ] Test search box
- [ ] Test export CSV
- [ ] Test print function

## 🚀 Next Steps

Setelah demo berfungsi:

1. **Setup Supabase** (jika ingin database real)
   - Ikuti panduan di `supabase-setup.md`
   - Update konfigurasi di `script.js`
   - Gunakan `index.html`

2. **Deploy ke Netlify**
   - Ikuti panduan di `netlify-deploy.md`
   - Upload semua file ke repository
   - Connect ke Netlify

## 🐛 Troubleshooting

### Data Tidak Tampil?
- Pastikan menggunakan `index-demo.html`
- Buka Developer Tools (F12) untuk cek error
- Pastikan JavaScript enabled di browser

### Styling Rusak?
- Pastikan file `styles.css` ada di folder yang sama
- Refresh browser (Ctrl+F5)

### Modal Tidak Buka?
- Cek console untuk JavaScript errors
- Pastikan menggunakan `script-demo.js`

## 📞 Support

Jika masih ada masalah:
1. Buka Developer Tools (F12)
2. Lihat tab Console untuk error messages
3. Screenshot error dan kirim untuk bantuan

---

**Happy Testing! 🎉**