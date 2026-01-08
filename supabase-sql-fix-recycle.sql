-- ========================================
-- PERBAIKAN RECYCLE BIN BMU DISNAKERKUKM
-- MENGATASI MASALAH DATA HILANG SETELAH REFRESH
-- ========================================

-- 1. Pastikan tabel recycle_bin ada dan memiliki struktur yang benar
CREATE TABLE IF NOT EXISTS recycle_bin (
    id SERIAL PRIMARY KEY,
    original_id INTEGER NOT NULL,
    original_table VARCHAR(50) NOT NULL,
    data_json JSONB NOT NULL,
    deleted_at TIMESTAMP DEFAULT NOW(),
    deleted_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tambahkan index untuk performa
CREATE INDEX IF NOT EXISTS idx_recycle_bin_table ON recycle_bin(original_table);
CREATE INDEX IF NOT EXISTS idx_recycle_bin_deleted_at ON recycle_bin(deleted_at);
CREATE INDEX IF NOT EXISTS idx_recycle_bin_original_id ON recycle_bin(original_id, original_table);

-- 3. Enable RLS untuk recycle_bin
ALTER TABLE recycle_bin ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policy jika ada
DROP POLICY IF EXISTS "Allow all operations on recycle_bin" ON recycle_bin;

-- 5. Buat policy baru untuk akses penuh
CREATE POLICY "Allow all operations on recycle_bin" ON recycle_bin FOR ALL USING (true);

-- 6. Grant permissions untuk recycle_bin
GRANT ALL ON recycle_bin TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE recycle_bin_id_seq TO anon, authenticated;

-- 7. Verifikasi struktur tabel
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'recycle_bin' 
ORDER BY ordinal_position;

-- 8. Test insert untuk memastikan tabel berfungsi
-- (Uncomment untuk test)
-- INSERT INTO recycle_bin (original_id, original_table, data_json, deleted_by) 
-- VALUES (999, 'test_table', '{"test": "data"}', 'system_test');

-- 9. Cleanup test data (jika ada)
-- DELETE FROM recycle_bin WHERE original_table = 'test_table';

-- 10. Tampilkan jumlah data di recycle_bin
SELECT COUNT(*) as total_recycle_items FROM recycle_bin;

COMMIT;