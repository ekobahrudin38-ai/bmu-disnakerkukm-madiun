-- ========================================
-- SETUP DATABASE BMU DISNAKERKUKM MADIUN
-- LANGKAH 3: SETUP RLS DAN PERMISSIONS
-- ========================================

-- 6. Enable Row Level Security (RLS)
ALTER TABLE jenis_bantuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE penerima_bmu ENABLE ROW LEVEL SECURITY;
ALTER TABLE recycle_bin ENABLE ROW LEVEL SECURITY;

-- 7. Buat policy untuk akses publik (untuk demo)
CREATE POLICY "Allow all operations on jenis_bantuan" ON jenis_bantuan FOR ALL USING (true);
CREATE POLICY "Allow all operations on penerima_bmu" ON penerima_bmu FOR ALL USING (true);
CREATE POLICY "Allow all operations on recycle_bin" ON recycle_bin FOR ALL USING (true);

-- 8. Grant permissions
GRANT ALL ON jenis_bantuan TO anon, authenticated;
GRANT ALL ON penerima_bmu TO anon, authenticated;
GRANT ALL ON recycle_bin TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE jenis_bantuan_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE penerima_bmu_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE recycle_bin_id_seq TO anon, authenticated;