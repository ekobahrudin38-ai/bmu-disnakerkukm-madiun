-- ========================================
-- SETUP DATABASE BMU DISNAKERKUKM MADIUN
-- LANGKAH 1: BUAT TABEL DAN INDEX
-- ========================================

-- 1. Buat tabel jenis_bantuan (jika belum ada)
CREATE TABLE IF NOT EXISTS jenis_bantuan (
    id SERIAL PRIMARY KEY,
    jenis VARCHAR(200) NOT NULL,
    tahun INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Buat tabel penerima_bmu (jika belum ada)
CREATE TABLE IF NOT EXISTS penerima_bmu (
    id SERIAL PRIMARY KEY,
    nib VARCHAR(13) NOT NULL,
    nik VARCHAR(16) NOT NULL,
    kk VARCHAR(16) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL,
    tempat_lahir VARCHAR(50) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin CHAR(1) CHECK (jenis_kelamin IN ('L', 'P')),
    nama_usaha VARCHAR(200) NOT NULL,
    bantuan VARCHAR(200) NOT NULL,
    tahun INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    is_duplicate BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Buat tabel recycle_bin untuk data yang dihapus
CREATE TABLE IF NOT EXISTS recycle_bin (
    id SERIAL PRIMARY KEY,
    original_id INTEGER NOT NULL,
    original_table VARCHAR(50) NOT NULL,
    data_json JSONB NOT NULL,
    deleted_at TIMESTAMP DEFAULT NOW(),
    deleted_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Buat index untuk performa (jika belum ada)
CREATE INDEX IF NOT EXISTS idx_penerima_bmu_nib ON penerima_bmu(nib);
CREATE INDEX IF NOT EXISTS idx_penerima_bmu_nik ON penerima_bmu(nik);
CREATE INDEX IF NOT EXISTS idx_penerima_bmu_nama ON penerima_bmu(nama);
CREATE INDEX IF NOT EXISTS idx_penerima_bmu_bantuan ON penerima_bmu(bantuan, tahun);
CREATE INDEX IF NOT EXISTS idx_recycle_bin_table ON recycle_bin(original_table);
CREATE INDEX IF NOT EXISTS idx_recycle_bin_deleted_at ON recycle_bin(deleted_at);