// Configuration helper untuk environment variables
function getConfig() {
    // Prioritas: Environment Variables → Hardcoded (untuk production)
    const config = {
        supabaseUrl: 
            (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
            (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
            'https://vxxkawcjspxunmotcnve.supabase.co', // Fallback untuk production
        
        supabaseAnonKey: 
            (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
            (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eGthd2Nqc3B4dW5tb3RjbnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjUzOTUsImV4cCI6MjA4MzI0MTM5NX0.iqeMIoLOPs8r0Q8dVdahG8MexLRasm0WiHsr0Os7Mcg', // Fallback untuk production
        
        isDemoMode: false // Selalu false untuk production
    };
    
    console.log('Config loaded:', {
        supabaseUrl: config.supabaseUrl.substring(0, 30) + '...',
        isDemoMode: config.isDemoMode,
        timestamp: new Date().toISOString()
    });
    
    return config;
}

// Export untuk digunakan di script.js
window.getConfig = getConfig;

// Auto-initialize
if (typeof window !== 'undefined') {
    window.getConfig = getConfig;
}