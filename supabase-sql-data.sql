-- ========================================
-- SETUP DATABASE BMU DISNAKERKUKM MADIUN
-- LANGKAH 2: INSERT DATA
-- ========================================

-- 4. Insert data jenis bantuan (hindari duplikat)
INSERT INTO jenis_bantuan (jenis, tahun, status) 
SELECT jenis, tahun, status FROM (VALUES
    ('Bantuan Modal UMKM Tahap 1', 2023, 'active'),
    ('Bantuan Modal Usaha Mikro', 2023, 'active'),
    ('Bantuan Modal Koperasi', 2024, 'active'),
    ('Bantuan Modal Industri Kecil', 2024, 'active')
) AS new_data(jenis, tahun, status)
WHERE NOT EXISTS (
    SELECT 1 FROM jenis_bantuan 
    WHERE jenis_bantuan.jenis = new_data.jenis 
    AND jenis_bantuan.tahun = new_data.tahun
);

-- 5. Insert data penerima BMU (hindari duplikat berdasarkan NIB)
INSERT INTO penerima_bmu (nib, nik, kk, nama, alamat, tempat_lahir, tanggal_lahir, jenis_kelamin, nama_usaha, bantuan, tahun, is_duplicate) 
SELECT nib, nik, kk, nama, alamat, tempat_lahir, tanggal_lahir::date, jenis_kelamin, nama_usaha, bantuan, tahun, is_duplicate 
FROM (VALUES
    ('1234567890123', '3201234567890123', '3201234567890123', 'AHMAD SURYADI', 'Jl. Merdeka No. 123, Kelurahan Sukamaju, Kecamatan Bandung Utara, Kota Bandung, Jawa Barat 40123', 'Bandung', '1985-05-15', 'L', 'Toko Sembako Berkah', 'Bantuan Modal UMKM Tahap 1', 2023, false),
    ('2345678901234', '3201234567890124', '3201234567890124', 'SITI NURHALIZA', 'Jl. Sudirman No. 456, Kelurahan Cibadak, Kecamatan Bandung Selatan, Kota Bandung, Jawa Barat 40234', 'Jakarta', '1990-08-22', 'P', 'Warung Makan Sederhana', 'Bantuan Modal Usaha Mikro', 2023, false),
    ('3456789012345', '3201234567890125', '3201234567890125', 'BUDI SANTOSO', 'Jl. Ahmad Yani No. 789, Kelurahan Margahayu, Kecamatan Bandung Timur, Kota Bandung, Jawa Barat 40345', 'Surabaya', '1988-12-10', 'L', 'Bengkel Motor Jaya', 'Bantuan Modal Koperasi', 2024, false),
    ('4567890123456', '3201234567890126', '3201234567890126', 'DEWI SARTIKA', 'Jl. Gatot Subroto No. 321, Kelurahan Babakan, Kecamatan Bandung Barat, Kota Bandung, Jawa Barat 40456', 'Medan', '1992-03-18', 'P', 'Salon Kecantikan Dewi', 'Bantuan Modal Industri Kecil', 2024, false),
    ('5678901234567', '3201234567890127', '3201234567890127', 'RUDI HERMAWAN', 'Jl. Diponegoro No. 654, Kelurahan Ciumbuleuit, Kecamatan Cidadap, Kota Bandung, Jawa Barat 40567', 'Yogyakarta', '1987-07-25', 'L', 'Toko Elektronik Rudi', 'Bantuan Modal UMKM Tahap 1', 2023, false)
) AS new_data(nib, nik, kk, nama, alamat, tempat_lahir, tanggal_lahir, jenis_kelamin, nama_usaha, bantuan, tahun, is_duplicate)
WHERE NOT EXISTS (
    SELECT 1 FROM penerima_bmu 
    WHERE penerima_bmu.nib = new_data.nib
);