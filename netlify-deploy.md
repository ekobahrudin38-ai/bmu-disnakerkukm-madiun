# Deploy ke Netlify

## Persiapan
1. Pastikan semua file sudah siap:
   - index.html
   - styles.css
   - script.js
   - File lainnya

2. Update konfigurasi Supabase di `script.js` dengan kredensial yang benar

## Cara Deploy

### Opsi 1: Drag & Drop (Paling Mudah)
1. Kunjungi https://netlify.com
2. Daftar/login ke akun Netlify
3. Drag semua file project ke area "Deploy" di dashboard
4. Website langsung online!

### Opsi 2: GitHub Integration (Recommended)
1. Upload project ke GitHub repository
2. Di Netlify, klik "New site from Git"
3. Connect ke GitHub dan pilih repository
4. Set build settings:
   - Build command: (kosongkan)
   - Publish directory: (kosongkan atau "/")
5. Klik "Deploy site"

### Opsi 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy dari folder project
netlify deploy

# Deploy production
netlify deploy --prod
```

## Konfigurasi Domain
1. Di dashboard Netlify, buka "Domain settings"
2. Untuk custom domain:
   - Klik "Add custom domain"
   - Masukkan domain Anda
   - Update DNS records sesuai instruksi

## Environment Variables (Jika Diperlukan)
1. Di dashboard Netlify, buka "Site settings" > "Environment variables"
2. Tambahkan variabel jika ada konfigurasi sensitif
3. Update script.js untuk menggunakan environment variables

## SSL Certificate
- Netlify otomatis menyediakan SSL certificate
- Website akan accessible via HTTPS

## Continuous Deployment
- Jika menggunakan GitHub integration
- Setiap push ke repository akan trigger auto-deploy
- Sangat praktis untuk update website

## Tips Optimasi
1. Minify CSS dan JavaScript untuk performa lebih baik
2. Compress gambar sebelum upload
3. Gunakan CDN untuk library eksternal
4. Enable caching di Netlify headers

## Troubleshooting
- Jika ada error, check "Deploy log" di dashboard
- Pastikan semua file path sudah benar
- Test website di local dulu sebelum deploy