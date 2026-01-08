// Konfigurasi Supabase untuk BMU DisnakerKUKM
console.log('Loading BMU Supabase Configuration...');

// Environment variables configuration
function getBMUConfig() {
    // Konfigurasi langsung untuk production
    const config = {
        supabaseUrl: 'https://vxxkawcjspxunmotcnve.supabase.co',
        supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg',
        isDemoMode: false
    };
    
    console.log('BMU Config loaded:', {
        supabaseUrl: config.supabaseUrl.substring(0, 30) + '...',
        isDemoMode: config.isDemoMode
    });
    
    return config;
}

// Initialize Supabase client for BMU
let bmuSupabase = null;

function initializeBMUSupabase() {
    const config = getBMUConfig();
    
    if (typeof window.supabase !== 'undefined') {
        try {
            bmuSupabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
            console.log('BMU Supabase client initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing BMU Supabase client:', error);
            return false;
        }
    } else {
        console.log('Supabase library not loaded');
        return false;
    }
}

// Initialize immediately
initializeBMUSupabase();

// BMU Database Operations
const BMUDatabase = {
    // Jenis Bantuan Operations
    async getJenisBantuan() {
        if (!bmuSupabase) return [];
        
        try {
            const { data, error } = await bmuSupabase
                .from('jenis_bantuan')
                .select('*')
                .order('tahun', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching jenis bantuan:', error);
            return [];
        }
    },

    async saveJenisBantuan(bantuanData) {
        if (!bmuSupabase) return null;
        
        try {
            const { data, error } = await bmuSupabase
                .from('jenis_bantuan')
                .insert([bantuanData])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error saving jenis bantuan:', error);
            throw error;
        }
    },

    async updateJenisBantuan(id, bantuanData) {
        if (!bmuSupabase) return null;
        
        try {
            const { data, error } = await bmuSupabase
                .from('jenis_bantuan')
                .update(bantuanData)
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error updating jenis bantuan:', error);
            throw error;
        }
    },

    async deleteJenisBantuan(id) {
        if (!bmuSupabase) return false;
        
        try {
            const { error } = await bmuSupabase
                .from('jenis_bantuan')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting jenis bantuan:', error);
            throw error;
        }
    },

    // Penerima BMU Operations
    async getPenerimaBMU() {
        if (!bmuSupabase) return [];
        
        try {
            const { data, error } = await bmuSupabase
                .from('penerima_bmu')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching penerima BMU:', error);
            return [];
        }
    },

    async savePenerimaBMU(penerima) {
        if (!bmuSupabase) return null;
        
        try {
            const { data, error } = await bmuSupabase
                .from('penerima_bmu')
                .insert([penerima])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error saving penerima BMU:', error);
            throw error;
        }
    },

    async updatePenerimaBMU(id, penerima) {
        if (!bmuSupabase) return null;
        
        try {
            const { data, error } = await bmuSupabase
                .from('penerima_bmu')
                .update(penerima)
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error updating penerima BMU:', error);
            throw error;
        }
    },

    async deletePenerimaBMU(id) {
        if (!bmuSupabase) return false;
        
        try {
            const { error } = await bmuSupabase
                .from('penerima_bmu')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting penerima BMU:', error);
            throw error;
        }
    },

// Recycle Bin Operations
    async getRecycleBin() {
        if (!bmuSupabase) return [];
        
        try {
            const { data, error } = await bmuSupabase
                .from('recycle_bin')
                .select('*')
                .order('deleted_at', { ascending: false });
            
            if (error) throw error;
            console.log('Recycle bin data loaded from database:', data?.length || 0);
            return data || [];
        } catch (error) {
            console.error('Error fetching recycle bin:', error);
            return [];
        }
    },

    async saveToRecycleBin(originalId, originalTable, dataJson, deletedBy) {
        if (!bmuSupabase) return null;
        
        try {
            const { data, error } = await bmuSupabase
                .from('recycle_bin')
                .insert([{
                    original_id: originalId,
                    original_table: originalTable,
                    data_json: dataJson,
                    deleted_by: deletedBy
                }])
                .select();
            
            if (error) throw error;
            console.log('Data saved to recycle bin database:', data[0]);
            return data[0];
        } catch (error) {
            console.error('Error saving to recycle bin:', error);
            throw error;
        }
    },

    async deleteFromRecycleBin(id) {
        if (!bmuSupabase) return false;
        
        try {
            const { error } = await bmuSupabase
                .from('recycle_bin')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            console.log('Data permanently deleted from recycle bin:', id);
            return true;
        } catch (error) {
            console.error('Error deleting from recycle bin:', error);
            throw error;
        }
    },

    async emptyRecycleBin() {
        if (!bmuSupabase) return false;
        
        try {
            const { error } = await bmuSupabase
                .from('recycle_bin')
                .delete()
                .neq('id', 0); // Delete all records
            
            if (error) throw error;
            console.log('Recycle bin emptied successfully');
            return true;
        } catch (error) {
            console.error('Error emptying recycle bin:', error);
            throw error;
        }
    },

    // Search Operations
    async searchPenerimaBMU(searchTerm) {
        if (!bmuSupabase) return [];
        
        try {
            const { data, error } = await bmuSupabase
                .from('penerima_bmu')
                .select('*')
                .or(`nib.ilike.%${searchTerm}%,nik.ilike.%${searchTerm}%,nama.ilike.%${searchTerm}%,nama_usaha.ilike.%${searchTerm}%`)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error searching penerima BMU:', error);
            return [];
        }
    },

    // Real-time sync operations
    async refreshAllData() {
        if (!bmuSupabase) return { jenisBantuan: [], penerimaBMU: [], recycleBin: [] };
        
        try {
            const [jenisBantuan, penerimaBMU, recycleBin] = await Promise.all([
                this.getJenisBantuan(),
                this.getPenerimaBMU(),
                this.getRecycleBin()
            ]);
            
            return { jenisBantuan, penerimaBMU, recycleBin };
        } catch (error) {
            console.error('Error refreshing all data:', error);
            return { jenisBantuan: [], penerimaBMU: [], recycleBin: [] };
        }
    }
};

// Export untuk digunakan di script lain
window.getBMUConfig = getBMUConfig;
window.initializeBMUSupabase = initializeBMUSupabase;
window.BMUDatabase = BMUDatabase;
window.bmuSupabase = bmuSupabase;

console.log('BMU Supabase Configuration loaded successfully');