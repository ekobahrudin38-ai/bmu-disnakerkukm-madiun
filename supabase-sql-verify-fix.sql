-- ========================================
-- VERIFIKASI PERBAIKAN DATABASE BMU
-- PASTIKAN SEMUA TABEL DAN PERMISSIONS BENAR
-- ========================================

-- 1. Cek struktur semua tabel
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name IN ('jenis_bantuan', 'penerima_bmu', 'recycle_bin')
ORDER BY table_name, ordinal_position;

-- 2. Cek RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('jenis_bantuan', 'penerima_bmu', 'recycle_bin');

-- 3. Cek policies yang ada
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN ('jenis_bantuan', 'penerima_bmu', 'recycle_bin');

-- 4. Cek permissions untuk anon dan authenticated
SELECT 
    table_name,
    grantee,
    privilege_type
FROM information_schema.table_privileges 
WHERE table_name IN ('jenis_bantuan', 'penerima_bmu', 'recycle_bin')
AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee;

-- 5. Cek sequence permissions
SELECT 
    sequence_name,
    privilege_type,
    grantee
FROM information_schema.usage_privileges 
WHERE object_name LIKE '%_id_seq'
AND grantee IN ('anon', 'authenticated')
ORDER BY sequence_name;

-- 6. Test insert ke recycle_bin (untuk memastikan berfungsi)
INSERT INTO recycle_bin (original_id, original_table, data_json, deleted_by) 
VALUES (999, 'test_verification', '{"test": "verification", "timestamp": "' || NOW() || '"}', 'system_verification');

-- 7. Cek apakah insert berhasil
SELECT 
    id,
    original_id,
    original_table,
    data_json,
    deleted_at,
    deleted_by
FROM recycle_bin 
WHERE original_table = 'test_verification'
ORDER BY id DESC
LIMIT 1;

-- 8. Cleanup test data
DELETE FROM recycle_bin WHERE original_table = 'test_verification';

-- 9. Tampilkan statistik data
SELECT 
    'jenis_bantuan' as table_name,
    COUNT(*) as total_records
FROM jenis_bantuan
UNION ALL
SELECT 
    'penerima_bmu' as table_name,
    COUNT(*) as total_records
FROM penerima_bmu
UNION ALL
SELECT 
    'recycle_bin' as table_name,
    COUNT(*) as total_records
FROM recycle_bin;

-- 10. Cek index yang ada
SELECT 
    indexname,
    tablename,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('jenis_bantuan', 'penerima_bmu', 'recycle_bin')
ORDER BY tablename, indexname;

-- 11. Test query performance (optional)
EXPLAIN ANALYZE SELECT * FROM penerima_bmu WHERE nib = '1234567890123';
EXPLAIN ANALYZE SELECT * FROM recycle_bin WHERE original_table = 'penerima_bmu';

-- 12. Tampilkan hasil verifikasi
SELECT 
    'VERIFIKASI SELESAI' as status,
    NOW() as timestamp,
    'Semua tabel, RLS, dan permissions telah dicek' as message;

COMMIT;