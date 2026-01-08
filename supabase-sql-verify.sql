-- ========================================
-- SETUP DATABASE BMU DISNAKERKUKM MADIUN
-- LANGKAH 4: VERIFIKASI SETUP
-- ========================================

-- 9. Verifikasi data berhasil diinsert
SELECT 'jenis_bantuan' as tabel, COUNT(*) as jumlah_data FROM jenis_bantuan
UNION ALL
SELECT 'penerima_bmu' as tabel, COUNT(*) as jumlah_data FROM penerima_bmu;

-- 10. Cek sample data jenis bantuan
SELECT 'JENIS BANTUAN' as kategori, jenis as nama, tahun::text as detail FROM jenis_bantuan LIMIT 2;

-- 11. Cek sample data penerima BMU
SELECT 'PENERIMA BMU' as kategori, nama as nama, nama_usaha as detail FROM penerima_bmu LIMIT 2;