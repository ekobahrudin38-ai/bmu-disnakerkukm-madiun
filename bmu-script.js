// Database Penerima Bantuan Modal Usaha (BMU) - Enhanced Version with Supabase
console.log('Initializing Enhanced BMU Database System with Supabase...');

// Mobile Sidebar Functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Show/hide overlay
    if (sidebar.classList.contains('active')) {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    } else {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    menuBtn.classList.remove('active');
    
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
    document.body.style.overflow = '';
}

// Close sidebar when clicking on nav links (mobile)
function setupMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeSidebar();
        });
        
        // Add touch event for better mobile response
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Close sidebar when clicking overlay
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
        overlay.addEventListener('touchstart', closeSidebar);
    }
}

// State Management
let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 0;
let allData = [];
let filteredData = [];
let editingId = null;
let editingType = null; // 'bantuan' or 'ikm'

// Data Storage (will be loaded from Supabase)
let jenisBantuanData = [];
let ikmData = [];
let recycleData = [];
let filteredIKMData = [];

// Supabase Integration Flag
let useSupabase = false;

// DOM Elements (akan diinisialisasi setelah DOM ready)
let sections;
let navLinks;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced BMU system...');
    
    // Initialize DOM elements AFTER DOM is ready with retry
    let initRetry = 0;
    const maxRetries = 5;
    
    function initializeDOMElements() {
        sections = document.querySelectorAll('.section');
        navLinks = document.querySelectorAll('.nav-link');
        
        console.log('DOM elements initialized:', {
            sections: sections.length,
            navLinks: navLinks.length,
            retry: initRetry
        });
        
        if (sections.length === 0 || navLinks.length === 0) {
            initRetry++;
            if (initRetry < maxRetries) {
                console.log('Retrying DOM initialization...', initRetry);
                setTimeout(initializeDOMElements, 200);
                return false;
            } else {
                console.error('Failed to initialize DOM elements after', maxRetries, 'retries');
                return false;
            }
        }
        
        return true;
    }
    
    if (!initializeDOMElements()) {
        return;
    }
    
    // Check authentication
    if (!checkAuthentication()) {
        return;
    }
    
    // Initialize Supabase connection
    initializeSupabaseConnection();
    
    // Initialize data (from Supabase or dummy)
    initializeData();
    
    setupEventListeners();
    
    // Setup navigation with delay to ensure DOM is ready
    setTimeout(() => {
        setupNavigation();
        console.log('Navigation setup with delay completed');
    }, 300);
    
    populateYearOptions();
    updateUserInfo();
    
    // Setup auto-refresh for real-time sync
    setupAutoRefresh();
    
    console.log('Enhanced BMU system initialized successfully');
});

// Auto-refresh setup for real-time sync
function setupAutoRefresh() {
    // Refresh data every 10 seconds for better real-time sync
    setInterval(async () => {
        if (useSupabase && window.BMUDatabase) {
            try {
                await refreshDataFromDatabase();
            } catch (error) {
                console.error('Auto-refresh error:', error);
            }
        }
    }, 10000); // 10 seconds - lebih cepat untuk sinkronisasi real-time
    
    // Also refresh when window gains focus (user switches back to tab)
    window.addEventListener('focus', async () => {
        if (useSupabase && window.BMUDatabase) {
            try {
                await refreshDataFromDatabase();
            } catch (error) {
                console.error('Focus refresh error:', error);
            }
        }
    });
    
    // Refresh when user becomes active (mouse movement, keyboard)
    let lastActivity = Date.now();
    let activityTimer = null;
    
    function handleUserActivity() {
        const now = Date.now();
        if (now - lastActivity > 30000) { // If inactive for 30 seconds
            if (useSupabase && window.BMUDatabase) {
                refreshDataFromDatabase().catch(error => {
                    console.error('Activity refresh error:', error);
                });
            }
        }
        lastActivity = now;
        
        // Clear existing timer
        if (activityTimer) {
            clearTimeout(activityTimer);
        }
        
        // Set new timer for next check
        activityTimer = setTimeout(() => {
            if (useSupabase && window.BMUDatabase) {
                refreshDataFromDatabase().catch(error => {
                    console.error('Delayed activity refresh error:', error);
                });
            }
        }, 5000);
    }
    
    // Listen for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('click', handleUserActivity);
}

// Refresh data from database for real-time sync
async function refreshDataFromDatabase() {
    try {
        console.log('Refreshing data for real-time sync...');
        
        const refreshedData = await window.BMUDatabase.refreshAllData();
        
        // Update jenis bantuan dengan force refresh
        const oldBantuanCount = jenisBantuanData.length;
        const oldBantuanIds = jenisBantuanData.map(item => item.id);
        jenisBantuanData = refreshedData.jenisBantuan;
        const newBantuanIds = jenisBantuanData.map(item => item.id);
        
        // Update penerima BMU dengan force refresh
        const oldIkmCount = ikmData.length;
        const oldIkmIds = ikmData.map(item => item.id);
        ikmData = refreshedData.penerimaBMU.map(item => ({
            id: item.id,
            nib: item.nib,
            nik: item.nik,
            kk: item.kk,
            nama: item.nama,
            alamat: item.alamat,
            tempatLahir: item.tempat_lahir,
            tanggalLahir: item.tanggal_lahir,
            jenisKelamin: item.jenis_kelamin,
            namaUsaha: item.nama_usaha,
            bantuan: item.bantuan,
            tahun: item.tahun,
            status: item.status || 'active',
            isDuplicate: item.is_duplicate || false
        }));
        const newIkmIds = ikmData.map(item => item.id);
        
        // Update recycle bin dengan force refresh - PERBAIKAN UTAMA
        const oldRecycleCount = recycleData.length;
        const oldRecycleIds = recycleData.map(item => item.recycleBinId || item.id);
        recycleData = refreshedData.recycleBin.map(item => {
            const originalData = item.data_json;
            return {
                id: originalData.id,
                nib: originalData.nib,
                nik: originalData.nik,
                kk: originalData.kk,
                nama: originalData.nama,
                alamat: originalData.alamat,
                tempatLahir: originalData.tempatLahir,
                tanggalLahir: originalData.tanggalLahir,
                jenisKelamin: originalData.jenisKelamin,
                namaUsaha: originalData.namaUsaha,
                bantuan: originalData.bantuan,
                tahun: originalData.tahun,
                status: originalData.status,
                isDuplicate: originalData.isDuplicate,
                deletedAt: item.deleted_at,
                originalType: item.original_table,
                recycleBinId: item.id // Store recycle bin ID for deletion
            };
        });
        const newRecycleIds = recycleData.map(item => item.recycleBinId || item.id);
        
        // Update filtered data
        filteredIKMData = [...ikmData];
        totalItems = ikmData.length;
        
        // Check if data changed and update UI accordingly
        const bantuanChanged = (
            oldBantuanCount !== jenisBantuanData.length ||
            JSON.stringify(oldBantuanIds.sort()) !== JSON.stringify(newBantuanIds.sort())
        );
        
        const ikmChanged = (
            oldIkmCount !== ikmData.length ||
            JSON.stringify(oldIkmIds.sort()) !== JSON.stringify(newIkmIds.sort())
        );
        
        const recycleChanged = (
            oldRecycleCount !== recycleData.length ||
            JSON.stringify(oldRecycleIds.sort()) !== JSON.stringify(newRecycleIds.sort())
        );
        
        const dataChanged = bantuanChanged || ikmChanged || recycleChanged;
        
        if (dataChanged) {
            console.log('Data changed, updating UI...', {
                bantuanChanged,
                ikmChanged, 
                recycleChanged,
                oldCounts: { bantuan: oldBantuanCount, ikm: oldIkmCount, recycle: oldRecycleCount },
                newCounts: { bantuan: jenisBantuanData.length, ikm: ikmData.length, recycle: recycleData.length }
            });
            
            // Update current visible section
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                const sectionId = activeSection.id;
                switch(sectionId) {
                    case 'jenis-bantuan':
                        if (bantuanChanged) {
                            renderBantuanTable();
                            updateBantuanOptions();
                        }
                        break;
                    case 'data-ikm':
                        if (ikmChanged) {
                            renderIKMTable();
                        }
                        break;
                    case 'recycle-bin':
                        if (recycleChanged) {
                            renderRecycleTable();
                        }
                        break;
                    case 'dashboard':
                        updateDashboard();
                        break;
                }
            }
            
            // Always update dashboard stats
            updateDashboard();
            
            // Show notification for significant changes
            if (bantuanChanged || ikmChanged) {
                showSyncNotification('Data telah disinkronkan dengan database');
            }
        }
        
    } catch (error) {
        console.error('Error refreshing data:', error);
        showSyncNotification('Gagal sinkronisasi data', 'error');
    }
}

// Show sync notification
function showSyncNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.sync-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `sync-notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        max-width: 300px;
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Initialize Supabase Connection
function initializeSupabaseConnection() {
    if (typeof window.initializeBMUSupabase === 'function') {
        useSupabase = window.initializeBMUSupabase();
        console.log('Supabase integration:', useSupabase ? 'ENABLED' : 'DISABLED (using dummy data)');
    } else {
        console.log('BMU Supabase config not found, using dummy data');
        useSupabase = false;
    }
}

// Authentication Check
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('bmu_logged_in');
    const loginTime = sessionStorage.getItem('bmu_login_time');
    
    if (!isLoggedIn || !loginTime) {
        window.location.href = 'bmu-login.html';
        return false;
    }
    
    const currentTime = new Date().getTime();
    const sessionDuration = 8 * 60 * 60 * 1000; // 8 hours
    
    if (currentTime - parseInt(loginTime) > sessionDuration) {
        alert('Sesi login telah berakhir. Silakan login kembali.');
        logout();
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('bmu_logged_in');
        sessionStorage.removeItem('bmu_login_time');
        sessionStorage.removeItem('bmu_username');
        window.location.href = 'bmu-login.html';
    }
}

// Update user info
function updateUserInfo() {
    const username = sessionStorage.getItem('bmu_username') || 'Unknown';
    const loginTime = sessionStorage.getItem('bmu_login_time');
    
    document.getElementById('currentUser').textContent = username;
    
    if (loginTime) {
        const loginDate = new Date(parseInt(loginTime));
        document.getElementById('lastLogin').textContent = formatDateTime(loginDate);
    }
}

// Navigation Setup
function setupNavigation() {
    // Force re-query DOM elements
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('.section');
    
    if (!navLinks || navLinks.length === 0) {
        console.error('Navigation links not found! DOM might not be ready.');
        return;
    }
    
    console.log('Setting up navigation for', navLinks.length, 'links');
    
    navLinks.forEach(link => {
        // Remove old listeners by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
    
    // Re-query after cloning
    navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetSection = this.getAttribute('data-section');
            console.log('Navigation clicked:', targetSection);
            
            // Force show section
            showSection(targetSection);
            
            // Update active nav
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile sidebar after navigation
            closeSidebar();
        });
    });
    
    // Also handle hash navigation for mobile
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
            const activeLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
            if (activeLink) {
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });
    
    console.log('Navigation setup completed');
}

function showSection(sectionId) {
    // Force re-query sections
    sections = document.querySelectorAll('.section');
    
    if (!sections || sections.length === 0) {
        console.error('Sections not found! DOM might not be ready.');
        return;
    }
    
    console.log('Showing section:', sectionId);
    
    // Hide all sections with force
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section with force
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        console.log('Section activated:', sectionId);
        
        // Scroll to top on mobile
        if (window.innerWidth <= 1024) {
            window.scrollTo(0, 0);
        }
        
        // Load section-specific data with delay for mobile
        setTimeout(() => {
            switch(sectionId) {
                case 'jenis-bantuan':
                    console.log('Loading jenis bantuan data...');
                    renderBantuanTable();
                    updateBantuanOptions();
                    break;
                case 'data-ikm':
                    console.log('Loading data IKM...');
                    renderIKMTable();
                    break;
                case 'recycle-bin':
                    console.log('Loading recycle bin...');
                    renderRecycleTable();
                    break;
                case 'pengaturan':
                    console.log('Loading pengaturan...');
                    loadCredentialList();
                    break;
                case 'dashboard':
                    console.log('Loading dashboard...');
                    updateDashboard();
                    break;
                case 'pencarian':
                    console.log('Loading pencarian...');
                    // Clear previous search results
                    document.getElementById('searchResults').innerHTML = '';
                    break;
                case 'laporan':
                    console.log('Loading laporan...');
                    // Clear previous report results
                    document.getElementById('reportResults').innerHTML = '';
                    break;
            }
        }, 100);
    } else {
        console.error('Target section not found:', sectionId);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile navigation
    setupMobileNavigation();
    
    // Form submissions
    document.getElementById('bantuanForm').addEventListener('submit', handleBantuanSubmit);
    document.getElementById('ikmForm').addEventListener('submit', handleIKMSubmit);
    document.getElementById('credentialForm').addEventListener('submit', handleCredentialSubmit);
    
    // Search functionality
    document.getElementById('ikmSearchInput').addEventListener('input', handleIKMSearch);
    
    // NIB and NIK validation
    document.getElementById('nomorNIB').addEventListener('input', validateNIB);
    document.getElementById('nomorNIK').addEventListener('input', validateNIK);
    
    // Pagination
    document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changePage(1));
    
    // Close sidebar on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });
}

// Initialize Data (from Supabase or Dummy)
async function initializeData() {
    console.log('Loading data...', useSupabase ? 'from Supabase' : 'dummy data');
    
    if (useSupabase && window.BMUDatabase) {
        try {
            // Load data from Supabase
            await loadDataFromSupabase();
        } catch (error) {
            console.error('Error loading from Supabase, falling back to dummy data:', error);
            loadDummyData();
        }
    } else {
        // Load dummy data
        loadDummyData();
    }
    
    // Update UI
    filteredIKMData = [...ikmData];
    totalItems = ikmData.length;
    updateDashboard();
    
    console.log('Data loaded:', {
        jenisBantuan: jenisBantuanData.length,
        penerimaBMU: ikmData.length,
        useSupabase: useSupabase
    });
}

// Load Data from Supabase
async function loadDataFromSupabase() {
    console.log('Loading data from Supabase...');
    
    // Load Jenis Bantuan
    jenisBantuanData = await window.BMUDatabase.getJenisBantuan();
    console.log('Loaded jenis bantuan:', jenisBantuanData.length);
    
    // Load Penerima BMU
    const penerimaBMU = await window.BMUDatabase.getPenerimaBMU();
    
    // Convert Supabase data to BMU format
    ikmData = penerimaBMU.map(item => ({
        id: item.id,
        nib: item.nib,
        nik: item.nik,
        kk: item.kk,
        nama: item.nama,
        alamat: item.alamat,
        tempatLahir: item.tempat_lahir,
        tanggalLahir: item.tanggal_lahir,
        jenisKelamin: item.jenis_kelamin,
        namaUsaha: item.nama_usaha,
        bantuan: item.bantuan,
        tahun: item.tahun,
        status: item.status || 'active',
        isDuplicate: item.is_duplicate || false
    }));
    
    console.log('Loaded penerima BMU:', ikmData.length);
    
    // Load Recycle Bin
    const recycleBinData = await window.BMUDatabase.getRecycleBin();
    
    // Convert recycle bin data to local format
    recycleData = recycleBinData.map(item => {
        const originalData = item.data_json;
        return {
            id: originalData.id,
            nib: originalData.nib,
            nik: originalData.nik,
            kk: originalData.kk,
            nama: originalData.nama,
            alamat: originalData.alamat,
            tempatLahir: originalData.tempatLahir,
            tanggalLahir: originalData.tanggalLahir,
            jenisKelamin: originalData.jenisKelamin,
            namaUsaha: originalData.namaUsaha,
            bantuan: originalData.bantuan,
            tahun: originalData.tahun,
            status: originalData.status,
            isDuplicate: originalData.isDuplicate,
            deletedAt: item.deleted_at,
            originalType: item.original_table,
            recycleBinId: item.id // Store recycle bin ID for deletion
        };
    });
    
    console.log('Loaded recycle bin:', recycleData.length);
}

// Load Dummy Data (fallback)
function loadDummyData() {
    console.log('Loading dummy data...');
    
    // Dummy Jenis Bantuan
    jenisBantuanData = [
        { id: 1, jenis: 'Bantuan Modal UMKM Tahap 1', tahun: 2023, status: 'active' },
        { id: 2, jenis: 'Bantuan Modal Usaha Mikro', tahun: 2023, status: 'active' },
        { id: 3, jenis: 'Bantuan Modal Koperasi', tahun: 2024, status: 'active' },
        { id: 4, jenis: 'Bantuan Modal Industri Kecil', tahun: 2024, status: 'active' }
    ];
    
    // Dummy IKM Data
    ikmData = [
        {
            id: 1,
            nib: '1234567890123',
            nik: '3201234567890123',
            kk: '3201234567890123',
            nama: 'AHMAD SURYADI',
            alamat: 'Jl. Merdeka No. 123, Kelurahan Sukamaju, Kecamatan Bandung Utara, Kota Bandung, Jawa Barat 40123',
            tempatLahir: 'Bandung',
            tanggalLahir: '1985-05-15',
            jenisKelamin: 'L',
            namaUsaha: 'Toko Sembako Berkah',
            bantuan: 'Bantuan Modal UMKM Tahap 1',
            tahun: 2023,
            status: 'active',
            isDuplicate: false
        },
        {
            id: 2,
            nib: '2345678901234',
            nik: '3201234567890124',
            kk: '3201234567890124',
            nama: 'SITI NURHALIZA',
            alamat: 'Jl. Sudirman No. 456, Kelurahan Cibadak, Kecamatan Bandung Selatan, Kota Bandung, Jawa Barat 40234',
            tempatLahir: 'Jakarta',
            tanggalLahir: '1990-08-22',
            jenisKelamin: 'P',
            namaUsaha: 'Warung Makan Sederhana',
            bantuan: 'Bantuan Modal Usaha Mikro',
            tahun: 2023,
            status: 'active',
            isDuplicate: false
        },
        {
            id: 3,
            nib: '3456789012345',
            nik: '3201234567890125',
            kk: '3201234567890125',
            nama: 'BUDI SANTOSO',
            alamat: 'Jl. Ahmad Yani No. 789, Kelurahan Margahayu, Kecamatan Bandung Timur, Kota Bandung, Jawa Barat 40345',
            tempatLahir: 'Surabaya',
            tanggalLahir: '1988-12-10',
            jenisKelamin: 'L',
            namaUsaha: 'Bengkel Motor Jaya',
            bantuan: 'Bantuan Modal Koperasi',
            tahun: 2024,
            status: 'active',
            isDuplicate: false
        },
        {
            id: 4,
            nib: '4567890123456',
            nik: '3201234567890126',
            kk: '3201234567890126',
            nama: 'DEWI SARTIKA',
            alamat: 'Jl. Gatot Subroto No. 321, Kelurahan Babakan, Kecamatan Bandung Barat, Kota Bandung, Jawa Barat 40456',
            tempatLahir: 'Medan',
            tanggalLahir: '1992-03-18',
            jenisKelamin: 'P',
            namaUsaha: 'Salon Kecantikan Dewi',
            bantuan: 'Bantuan Modal Industri Kecil',
            tahun: 2024,
            status: 'active',
            isDuplicate: false
        },
        {
            id: 5,
            nib: '5678901234567',
            nik: '3201234567890127',
            kk: '3201234567890127',
            nama: 'RUDI HERMAWAN',
            alamat: 'Jl. Diponegoro No. 654, Kelurahan Ciumbuleuit, Kecamatan Cidadap, Kota Bandung, Jawa Barat 40567',
            tempatLahir: 'Yogyakarta',
            tanggalLahir: '1987-07-25',
            jenisKelamin: 'L',
            namaUsaha: 'Toko Elektronik Rudi',
            bantuan: 'Bantuan Modal UMKM Tahap 1',
            tahun: 2023,
            status: 'active',
            isDuplicate: false
        }
    ];
}

// Populate Year Options
function populateYearOptions() {
    const yearSelects = ['tahunBantuan', 'tahunBMU', 'reportYear'];
    const currentYear = new Date().getFullYear();
    
    yearSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">Pilih Tahun</option>';
            for (let year = 2020; year <= 2030; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                if (year === currentYear) option.selected = true;
                select.appendChild(option);
            }
        }
    });
}

// Update Dashboard Statistics
function updateDashboard() {
    document.getElementById('totalIKM').textContent = ikmData.length;
    document.getElementById('totalBantuan').textContent = jenisBantuanData.length;
    document.getElementById('tahunAktif').textContent = new Date().getFullYear();
    document.getElementById('totalRecycle').textContent = recycleData.length;
}

// Jenis Bantuan Functions
function openBantuanModal(bantuan = null) {
    editingId = bantuan ? bantuan.id : null;
    editingType = 'bantuan';
    
    const modal = document.getElementById('bantuanModal');
    const title = document.getElementById('bantuanModalTitle');
    
    title.textContent = bantuan ? 'Edit Jenis Bantuan' : 'Tambah Jenis Bantuan';
    
    if (bantuan) {
        document.getElementById('jenisBantuan').value = bantuan.jenis;
        document.getElementById('tahunBantuan').value = bantuan.tahun;
    } else {
        document.getElementById('bantuanForm').reset();
    }
    
    modal.style.display = 'block';
}

function closeBantuanModal() {
    document.getElementById('bantuanModal').style.display = 'none';
    document.getElementById('bantuanForm').reset();
    editingId = null;
    editingType = null;
}

async function handleBantuanSubmit(e) {
    e.preventDefault();
    
    const bantuanData = {
        jenis: document.getElementById('jenisBantuan').value,
        tahun: parseInt(document.getElementById('tahunBantuan').value),
        status: 'active'
    };
    
    try {
        if (editingId) {
            // Update existing
            if (useSupabase && window.BMUDatabase) {
                await window.BMUDatabase.updateJenisBantuan(editingId, bantuanData);
            }
            
            const index = jenisBantuanData.findIndex(item => item.id === editingId);
            if (index !== -1) {
                jenisBantuanData[index] = { ...jenisBantuanData[index], ...bantuanData };
            }
        } else {
            // Add new
            let newData;
            if (useSupabase && window.BMUDatabase) {
                newData = await window.BMUDatabase.saveJenisBantuan(bantuanData);
                jenisBantuanData.push(newData);
            } else {
                const newId = jenisBantuanData.length > 0 ? Math.max(...jenisBantuanData.map(item => item.id)) + 1 : 1;
                newData = { id: newId, ...bantuanData };
                jenisBantuanData.push(newData);
            }
        }
        
        renderBantuanTable();
        updateBantuanOptions();
        updateDashboard();
        closeBantuanModal();
        
        alert(editingId ? 'Jenis bantuan berhasil diupdate dan disimpan!' : 'Jenis bantuan berhasil ditambahkan dan disimpan!');
        
    } catch (error) {
        console.error('Error saving jenis bantuan:', error);
        alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
}

function renderBantuanTable() {
    const tbody = document.getElementById('bantuanTableBody');
    tbody.innerHTML = '';
    
    jenisBantuanData.forEach((bantuan, index) => {
        const jumlahPenerima = getJumlahPenerima(bantuan.jenis, bantuan.tahun);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bantuan.jenis}</td>
            <td>${bantuan.tahun}</td>
            <td>
                <span class="recipient-count ${jumlahPenerima === 0 ? 'zero' : ''}">
                    👥 ${jumlahPenerima} orang
                </span>
            </td>
            <td><span class="status-badge status-${bantuan.status}">${bantuan.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span></td>
            <td>
                <div class="action-btn-group">
                    <button class="view-recipients-btn" onclick="viewRecipients('${bantuan.jenis}', ${bantuan.tahun})">
                        👁️ Lihat Penerima
                    </button>
                    <button class="action-btn edit-btn" onclick="editBantuan(${bantuan.id})">✏️</button>
                    <button class="action-btn delete-btn" onclick="deleteBantuan(${bantuan.id})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get jumlah penerima untuk jenis bantuan tertentu
function getJumlahPenerima(jenisBantuan, tahun) {
    return ikmData.filter(ikm => 
        ikm.bantuan === jenisBantuan && ikm.tahun === tahun && ikm.status === 'active'
    ).length;
}

// View recipients modal
function viewRecipients(jenisBantuan, tahun) {
    const recipients = ikmData.filter(ikm => 
        ikm.bantuan === jenisBantuan && ikm.tahun === tahun && ikm.status === 'active'
    );
    
    document.getElementById('modalJenisBantuan').textContent = jenisBantuan;
    document.getElementById('modalTahun').textContent = tahun;
    document.getElementById('modalTotalPenerima').textContent = recipients.length;
    
    const tbody = document.getElementById('penerimaTableBody');
    tbody.innerHTML = '';
    
    if (recipients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Belum ada penerima untuk bantuan ini</td></tr>';
    } else {
        recipients.forEach((recipient, index) => {
            const row = document.createElement('tr');
            const duplicateIcon = recipient.isDuplicate ? ' ⚠️' : '';
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${recipient.nib}${duplicateIcon}</td>
                <td>${recipient.nik}${duplicateIcon}</td>
                <td>${recipient.nama}</td>
                <td>${recipient.namaUsaha}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editIKMFromModal(${recipient.id})">✏️ Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteIKMFromModal(${recipient.id})">🗑️ Hapus</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    document.getElementById('penerimaModal').style.display = 'block';
}

function closePenerimaModal() {
    document.getElementById('penerimaModal').style.display = 'none';
}

function editIKMFromModal(id) {
    closePenerimaModal();
    showSection('data-ikm');
    // Update active nav
    navLinks.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="data-ikm"]').classList.add('active');
    
    setTimeout(() => {
        editIKM(id);
    }, 100);
}

function deleteIKMFromModal(id) {
    if (deleteIKM(id)) {
        // Refresh modal content
        const jenisBantuan = document.getElementById('modalJenisBantuan').textContent;
        const tahun = parseInt(document.getElementById('modalTahun').textContent);
        viewRecipients(jenisBantuan, tahun);
        
        // Update main table
        renderBantuanTable();
    }
}

function editBantuan(id) {
    const bantuan = jenisBantuanData.find(item => item.id === id);
    if (bantuan) {
        openBantuanModal(bantuan);
    }
}

async function deleteBantuan(id) {
    if (confirm('Apakah Anda yakin ingin menghapus jenis bantuan ini?')) {
        try {
            // Delete from Supabase database FIRST
            if (useSupabase && window.BMUDatabase) {
                await window.BMUDatabase.deleteJenisBantuan(id);
                console.log('Jenis bantuan deleted from database:', id);
            }
            
            // Remove from local data
            jenisBantuanData = jenisBantuanData.filter(item => item.id !== id);
            renderBantuanTable();
            updateBantuanOptions();
            updateDashboard();
            
            // Force refresh to ensure consistency
            if (useSupabase && window.BMUDatabase) {
                setTimeout(async () => {
                    try {
                        await refreshDataFromDatabase();
                    } catch (error) {
                        console.error('Error in post-delete refresh:', error);
                    }
                }, 1000);
            }
            
            alert('Jenis bantuan berhasil dihapus dari database!');
            
        } catch (error) {
            console.error('Error deleting jenis bantuan:', error);
            alert('Terjadi kesalahan saat menghapus data dari database. Silakan coba lagi.');
            
            // Refresh data to restore consistency
            if (useSupabase && window.BMUDatabase) {
                await refreshDataFromDatabase();
            }
        }
    }
}

// Update Bantuan Options in IKM Form
function updateBantuanOptions() {
    const select = document.getElementById('bantuanModalUsaha');
    const reportSelect = document.getElementById('reportBantuan');
    
    [select, reportSelect].forEach(sel => {
        if (sel) {
            sel.innerHTML = '<option value="">Pilih Jenis Bantuan</option>';
            jenisBantuanData.forEach(bantuan => {
                if (bantuan.status === 'active') {
                    const option = document.createElement('option');
                    option.value = bantuan.jenis;
                    option.textContent = `${bantuan.jenis} (${bantuan.tahun})`;
                    sel.appendChild(option);
                }
            });
        }
    });
}

// IKM Functions
function openIKMModal(ikm = null) {
    editingId = ikm ? ikm.id : null;
    editingType = 'ikm';
    
    const modal = document.getElementById('ikmModal');
    const title = document.getElementById('ikmModalTitle');
    
    title.textContent = ikm ? 'Edit Data IKM Binaan' : 'Tambah Data IKM Binaan';
    
    // Update bantuan options
    updateBantuanOptions();
    
    if (ikm) {
        document.getElementById('nomorNIB').value = ikm.nib;
        document.getElementById('nomorNIK').value = ikm.nik;
        document.getElementById('nomorKK').value = ikm.kk;
        document.getElementById('namaLengkap').value = ikm.nama;
        document.getElementById('alamatLengkap').value = ikm.alamat;
        document.getElementById('tempatLahir').value = ikm.tempatLahir;
        document.getElementById('tanggalLahir').value = ikm.tanggalLahir;
        document.getElementById('jenisKelamin').value = ikm.jenisKelamin;
        document.getElementById('namaUsaha').value = ikm.namaUsaha;
        document.getElementById('bantuanModalUsaha').value = ikm.bantuan;
        document.getElementById('tahunBMU').value = ikm.tahun;
    } else {
        document.getElementById('ikmForm').reset();
        updateBantuanOptions();
    }
    
    modal.style.display = 'block';
}

function closeIKMModal() {
    document.getElementById('ikmModal').style.display = 'none';
    document.getElementById('ikmForm').reset();
    editingId = null;
    editingType = null;
    
    // Clear warnings
    document.getElementById('nibWarning').classList.remove('show');
    document.getElementById('nikWarning').classList.remove('show');
}

async function handleIKMSubmit(e) {
    e.preventDefault();
    
    const ikmData_new = {
        nib: document.getElementById('nomorNIB').value,
        nik: document.getElementById('nomorNIK').value,
        kk: document.getElementById('nomorKK').value,
        nama: document.getElementById('namaLengkap').value.toUpperCase(),
        alamat: document.getElementById('alamatLengkap').value,
        tempatLahir: document.getElementById('tempatLahir').value,
        tanggalLahir: document.getElementById('tanggalLahir').value,
        jenisKelamin: document.getElementById('jenisKelamin').value,
        namaUsaha: document.getElementById('namaUsaha').value,
        bantuan: document.getElementById('bantuanModalUsaha').value,
        tahun: parseInt(document.getElementById('tahunBMU').value),
        status: 'active',
        isDuplicate: checkDuplicates(document.getElementById('nomorNIB').value, document.getElementById('nomorNIK').value, editingId)
    };
    
    try {
        if (editingId) {
            // Update existing
            if (useSupabase && window.BMUDatabase) {
                // Convert to Supabase format
                const supabaseData = {
                    nib: ikmData_new.nib,
                    nik: ikmData_new.nik,
                    kk: ikmData_new.kk,
                    nama: ikmData_new.nama,
                    alamat: ikmData_new.alamat,
                    tempat_lahir: ikmData_new.tempatLahir,
                    tanggal_lahir: ikmData_new.tanggalLahir,
                    jenis_kelamin: ikmData_new.jenisKelamin,
                    nama_usaha: ikmData_new.namaUsaha,
                    bantuan: ikmData_new.bantuan,
                    tahun: ikmData_new.tahun,
                    status: ikmData_new.status,
                    is_duplicate: ikmData_new.isDuplicate
                };
                
                await window.BMUDatabase.updatePenerimaBMU(editingId, supabaseData);
            }
            
            const index = ikmData.findIndex(item => item.id === editingId);
            if (index !== -1) {
                ikmData[index] = { ...ikmData[index], ...ikmData_new };
            }
        } else {
            // Add new
            let newData;
            if (useSupabase && window.BMUDatabase) {
                // Convert to Supabase format
                const supabaseData = {
                    nib: ikmData_new.nib,
                    nik: ikmData_new.nik,
                    kk: ikmData_new.kk,
                    nama: ikmData_new.nama,
                    alamat: ikmData_new.alamat,
                    tempat_lahir: ikmData_new.tempatLahir,
                    tanggal_lahir: ikmData_new.tanggalLahir,
                    jenis_kelamin: ikmData_new.jenisKelamin,
                    nama_usaha: ikmData_new.namaUsaha,
                    bantuan: ikmData_new.bantuan,
                    tahun: ikmData_new.tahun,
                    status: ikmData_new.status,
                    is_duplicate: ikmData_new.isDuplicate
                };
                
                const savedData = await window.BMUDatabase.savePenerimaBMU(supabaseData);
                
                // Convert back to local format
                newData = {
                    id: savedData.id,
                    nib: savedData.nib,
                    nik: savedData.nik,
                    kk: savedData.kk,
                    nama: savedData.nama,
                    alamat: savedData.alamat,
                    tempatLahir: savedData.tempat_lahir,
                    tanggalLahir: savedData.tanggal_lahir,
                    jenisKelamin: savedData.jenis_kelamin,
                    namaUsaha: savedData.nama_usaha,
                    bantuan: savedData.bantuan,
                    tahun: savedData.tahun,
                    status: savedData.status || 'active',
                    isDuplicate: savedData.is_duplicate || false
                };
                
                ikmData.push(newData);
            } else {
                const newId = ikmData.length > 0 ? Math.max(...ikmData.map(item => item.id)) + 1 : 1;
                newData = { id: newId, ...ikmData_new };
                ikmData.push(newData);
            }
        }
        
        filteredIKMData = [...ikmData];
        totalItems = ikmData.length;
        renderIKMTable();
        updateDashboard();
        closeIKMModal();
        
        alert(editingId ? 'Data IKM berhasil diupdate dan disimpan ke database!' : 'Data IKM berhasil ditambahkan dan disimpan ke database!');
        
    } catch (error) {
        console.error('Error saving IKM data:', error);
        alert('Terjadi kesalahan saat menyimpan data ke database. Silakan coba lagi.');
    }
}

// Validation Functions
function validateNIB() {
    const nib = document.getElementById('nomorNIB').value;
    const warning = document.getElementById('nibWarning');
    
    if (nib.length !== 13) {
        warning.textContent = '⚠️ NIB harus 13 digit';
        warning.className = 'warning error show';
        return;
    }
    
    const isDuplicate = checkNIBDuplicate(nib, editingId);
    if (isDuplicate) {
        warning.textContent = '⚠️ NIB sudah terdaftar dalam database';
        warning.className = 'warning duplicate show';
    } else {
        warning.classList.remove('show');
    }
}

function validateNIK() {
    const nik = document.getElementById('nomorNIK').value;
    const warning = document.getElementById('nikWarning');
    
    if (nik.length !== 16) {
        warning.textContent = '⚠️ NIK harus 16 digit';
        warning.className = 'warning error show';
        return;
    }
    
    const isDuplicate = checkNIKDuplicate(nik, editingId);
    if (isDuplicate) {
        warning.textContent = '⚠️ NIK sudah terdaftar dalam database';
        warning.className = 'warning duplicate show';
    } else {
        warning.classList.remove('show');
    }
}

function checkNIBDuplicate(nib, excludeId = null) {
    return ikmData.some(item => item.nib === nib && item.id !== excludeId);
}

function checkNIKDuplicate(nik, excludeId = null) {
    return ikmData.some(item => item.nik === nik && item.id !== excludeId);
}

function checkDuplicates(nib, nik, excludeId = null) {
    return checkNIBDuplicate(nib, excludeId) || checkNIKDuplicate(nik, excludeId);
}

// Render IKM Table
function renderIKMTable() {
    const tbody = document.getElementById('ikmTableBody');
    tbody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredIKMData.slice(startIndex, endIndex);
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px;">Tidak ada data IKM</td></tr>';
        return;
    }
    
    pageData.forEach((ikm, index) => {
        const row = document.createElement('tr');
        const duplicateIcon = ikm.isDuplicate ? ' ⚠️' : '';
        
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${ikm.nib}${duplicateIcon}</td>
            <td>${ikm.nik}${duplicateIcon}</td>
            <td>${ikm.nama}</td>
            <td>${ikm.namaUsaha}</td>
            <td>${ikm.bantuan}</td>
            <td>${ikm.tahun}</td>
            <td><span class="status-badge status-${ikm.status}">${ikm.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editIKM(${ikm.id})">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteIKM(${ikm.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updatePagination();
}

function editIKM(id) {
    const ikm = ikmData.find(item => item.id === id);
    if (ikm) {
        openIKMModal(ikm);
    }
}

async function deleteIKM(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data IKM ini? Data akan dipindahkan ke Recycle Bin.')) {
        const ikm = ikmData.find(item => item.id === id);
        if (ikm) {
            try {
                // Save to recycle bin in database FIRST
                if (useSupabase && window.BMUDatabase) {
                    const currentUser = sessionStorage.getItem('bmu_username') || 'Unknown';
                    const recycleBinEntry = await window.BMUDatabase.saveToRecycleBin(
                        id, 
                        'penerima_bmu', 
                        ikm, 
                        currentUser
                    );
                    console.log('Data saved to recycle bin:', recycleBinEntry);
                }
                
                // Delete from Supabase database
                if (useSupabase && window.BMUDatabase) {
                    await window.BMUDatabase.deletePenerimaBMU(id);
                    console.log('Data deleted from main table:', id);
                }
                
                // Move to local recycle bin (for immediate UI update)
                recycleData.push({
                    ...ikm,
                    deletedAt: new Date().toISOString(),
                    originalType: 'ikm',
                    recycleBinId: recycleBinEntry?.id // Store the recycle bin ID
                });
                
                // Remove from main data
                ikmData = ikmData.filter(item => item.id !== id);
                filteredIKMData = [...ikmData];
                totalItems = ikmData.length;
                
                renderIKMTable();
                updateDashboard();
                
                // Force refresh to ensure consistency across browsers
                if (useSupabase && window.BMUDatabase) {
                    setTimeout(async () => {
                        try {
                            await refreshDataFromDatabase();
                        } catch (error) {
                            console.error('Error in post-delete refresh:', error);
                        }
                    }, 1000);
                }
                
                alert('Data IKM berhasil dipindahkan ke Recycle Bin dan disimpan ke database!');
                return true;
                
            } catch (error) {
                console.error('Error deleting IKM data:', error);
                alert('Terjadi kesalahan saat menghapus data dari database. Silakan coba lagi.');
                
                // Refresh data to restore consistency
                if (useSupabase && window.BMUDatabase) {
                    await refreshDataFromDatabase();
                }
                return false;
            }
        }
    }
    return false;
}

// Search Functions
function handleIKMSearch() {
    const searchTerm = document.getElementById('ikmSearchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredIKMData = [...ikmData];
    } else {
        filteredIKMData = ikmData.filter(ikm => 
            ikm.nib.toLowerCase().includes(searchTerm) ||
            ikm.nik.toLowerCase().includes(searchTerm) ||
            ikm.nama.toLowerCase().includes(searchTerm) ||
            ikm.namaUsaha.toLowerCase().includes(searchTerm)
        );
    }
    
    totalItems = filteredIKMData.length;
    currentPage = 1;
    renderIKMTable();
}

function searchIKM() {
    handleIKMSearch();
}

function performSearch() {
    const nib = document.getElementById('searchNIB').value;
    const nik = document.getElementById('searchNIK').value;
    const nama = document.getElementById('searchNama').value.toLowerCase();
    
    let results = [];
    
    if (nib) {
        results = ikmData.filter(ikm => ikm.nib === nib);
    } else if (nik) {
        results = ikmData.filter(ikm => ikm.nik === nik);
    } else if (nama) {
        results = ikmData.filter(ikm => ikm.nama.toLowerCase().includes(nama));
    }
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-results empty">Tidak ada data yang ditemukan</div>';
        return;
    }
    
    let html = '<div class="table-container"><table><thead><tr>';
    html += '<th>NIB</th><th>NIK</th><th>Nama Lengkap</th><th>Nama Usaha</th><th>Bantuan</th><th>Tahun</th><th>Action</th>';
    html += '</tr></thead><tbody>';
    
    results.forEach(ikm => {
        const duplicateIcon = ikm.isDuplicate ? ' ⚠️' : '';
        html += `<tr>
            <td>${ikm.nib}${duplicateIcon}</td>
            <td>${ikm.nik}${duplicateIcon}</td>
            <td>${ikm.nama}</td>
            <td>${ikm.namaUsaha}</td>
            <td>${ikm.bantuan}</td>
            <td>${ikm.tahun}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editIKM(${ikm.id})">✏️ Edit</button>
                <button class="action-btn delete-btn" onclick="deleteIKM(${ikm.id})">🗑️ Hapus</button>
            </td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// Recycle Bin Functions
function renderRecycleTable() {
    const tbody = document.getElementById('recycleTableBody');
    tbody.innerHTML = '';
    
    if (recycleData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">Recycle Bin kosong</td></tr>';
        return;
    }
    
    recycleData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nib}</td>
            <td>${item.nik}</td>
            <td>${item.nama}</td>
            <td>${item.namaUsaha}</td>
            <td>${formatDate(item.deletedAt)}</td>
            <td>
                <button class="action-btn restore-btn" onclick="restoreData(${item.id})">↩️ Restore</button>
                <button class="action-btn permanent-delete-btn" onclick="permanentDelete(${item.id})">🗑️ Hapus Permanen</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function restoreData(id) {
    if (confirm('Apakah Anda yakin ingin mengembalikan data ini?')) {
        const item = recycleData.find(data => data.id === id);
        if (item) {
            try {
                // Remove from recycle bin database
                if (useSupabase && window.BMUDatabase && item.recycleBinId) {
                    await window.BMUDatabase.deleteFromRecycleBin(item.recycleBinId);
                }
                
                // Remove from local recycle
                recycleData = recycleData.filter(data => data.id !== id);
                
                // Add back to main data
                const { deletedAt, originalType, recycleBinId, ...restoredData } = item;
                
                // Save back to Supabase database
                if (useSupabase && window.BMUDatabase) {
                    const supabaseData = {
                        nib: restoredData.nib,
                        nik: restoredData.nik,
                        kk: restoredData.kk,
                        nama: restoredData.nama,
                        alamat: restoredData.alamat,
                        tempat_lahir: restoredData.tempatLahir,
                        tanggal_lahir: restoredData.tanggalLahir,
                        jenis_kelamin: restoredData.jenisKelamin,
                        nama_usaha: restoredData.namaUsaha,
                        bantuan: restoredData.bantuan,
                        tahun: restoredData.tahun,
                        status: restoredData.status,
                        is_duplicate: restoredData.isDuplicate
                    };
                    
                    await window.BMUDatabase.savePenerimaBMU(supabaseData);
                }
                
                ikmData.push(restoredData);
                
                filteredIKMData = [...ikmData];
                totalItems = ikmData.length;
                
                renderRecycleTable();
                updateDashboard();
                alert('Data berhasil dikembalikan dan disimpan ke database!');
                
            } catch (error) {
                console.error('Error restoring data:', error);
                alert('Terjadi kesalahan saat mengembalikan data ke database. Silakan coba lagi.');
            }
        }
    }
}

async function permanentDelete(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini secara permanen? Tindakan ini tidak dapat dibatalkan!')) {
        const item = recycleData.find(data => data.id === id);
        if (item) {
            try {
                // Delete from recycle bin database
                if (useSupabase && window.BMUDatabase && item.recycleBinId) {
                    await window.BMUDatabase.deleteFromRecycleBin(item.recycleBinId);
                }
                
                // Remove from local recycle
                recycleData = recycleData.filter(data => data.id !== id);
                renderRecycleTable();
                updateDashboard();
                alert('Data berhasil dihapus secara permanen dari database!');
                
            } catch (error) {
                console.error('Error permanently deleting data:', error);
                alert('Terjadi kesalahan saat menghapus data permanen. Silakan coba lagi.');
            }
        }
    }
}

async function emptyRecycleBin() {
    if (confirm('Apakah Anda yakin ingin mengosongkan seluruh Recycle Bin? Tindakan ini tidak dapat dibatalkan!')) {
        try {
            // Empty recycle bin in database
            if (useSupabase && window.BMUDatabase) {
                await window.BMUDatabase.emptyRecycleBin();
            }
            
            // Empty local recycle bin
            recycleData = [];
            renderRecycleTable();
            updateDashboard();
            alert('Recycle Bin berhasil dikosongkan dari database!');
            
        } catch (error) {
            console.error('Error emptying recycle bin:', error);
            alert('Terjadi kesalahan saat mengosongkan Recycle Bin. Silakan coba lagi.');
        }
    }
}

// Export Functions
function exportToExcel() {
    if (!filteredIKMData || filteredIKMData.length === 0) {
        alert('Tidak ada data untuk diekspor. Pastikan ada data IKM yang tersedia.');
        return;
    }
    
    const data = filteredIKMData.map((ikm, index) => ({
        'No': index + 1,
        'NIB': ikm.nib,
        'NIK': ikm.nik,
        'Nomor KK': ikm.kk,
        'Nama Lengkap': ikm.nama,
        'Alamat Lengkap': ikm.alamat,
        'Tempat Lahir': ikm.tempatLahir,
        'Tanggal Lahir': formatDate(ikm.tanggalLahir),
        'Jenis Kelamin': ikm.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
        'Nama Usaha': ikm.namaUsaha,
        'Bantuan Modal Usaha': ikm.bantuan,
        'Tahun': ikm.tahun,
        'Status': ikm.isDuplicate ? 'Duplikat' : 'Normal'
    }));
    
    const csv = convertToCSV(data);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    downloadFile(csv, `data-ikm-binaan-${timestamp}.csv`, 'text/csv');
    alert(`Data berhasil diekspor ke Excel! Total: ${data.length} data`);
}

function exportToPDF() {
    alert('Fitur export PDF sedang dalam pengembangan. Silakan gunakan export Excel terlebih dahulu.');
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
        headers.map(header => {
            const value = row[header];
            // Handle values with commas, quotes, or newlines
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',')
    );
    
    // Add BOM for UTF-8 encoding to support Indonesian characters
    const BOM = '\uFEFF';
    return BOM + [csvHeaders, ...csvRows].join('\n');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType + ';charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Pagination Functions
function changePage(direction) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderIKMTable();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    document.getElementById('showingStart').textContent = totalItems > 0 ? startItem : 0;
    document.getElementById('showingEnd').textContent = endItem;
    document.getElementById('totalEntries').textContent = totalItems;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;
}

// Report Functions
function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const reportYear = document.getElementById('reportYear').value;
    const reportBantuan = document.getElementById('reportBantuan').value;
    
    let filteredData = [...ikmData];
    
    if (reportType === 'by-year' && reportYear) {
        filteredData = filteredData.filter(ikm => ikm.tahun.toString() === reportYear);
    } else if (reportType === 'by-bantuan' && reportBantuan) {
        filteredData = filteredData.filter(ikm => ikm.bantuan === reportBantuan);
    }
    
    displayReportResults(filteredData, reportType);
}

function displayReportResults(data, reportType) {
    const container = document.getElementById('reportResults');
    
    if (data.length === 0) {
        container.innerHTML = '<div class="search-results empty">Tidak ada data untuk laporan ini</div>';
        return;
    }
    
    let html = `<h3>Laporan Data Penerima BMU</h3>`;
    html += `<p>Total Data: ${data.length} penerima</p>`;
    
    // Add export buttons
    html += `<div class="report-actions" style="margin: 20px 0;">
        <button class="btn btn-success" onclick="exportReportToExcel()">📊 Export ke Excel</button>
        <button class="btn btn-info" onclick="exportReportToCSV()">📄 Export ke CSV</button>
        <button class="btn btn-warning" onclick="exportReportToPDF()">📋 Export ke PDF</button>
    </div>`;
    
    html += '<div class="table-container"><table><thead><tr>';
    html += '<th>No</th><th>NIB</th><th>NIK</th><th>Nama Lengkap</th><th>Nama Usaha</th><th>Bantuan</th><th>Tahun</th>';
    html += '</tr></thead><tbody>';
    
    data.forEach((ikm, index) => {
        html += `<tr>
            <td>${index + 1}</td>
            <td>${ikm.nib}</td>
            <td>${ikm.nik}</td>
            <td>${ikm.nama}</td>
            <td>${ikm.namaUsaha}</td>
            <td>${ikm.bantuan}</td>
            <td>${ikm.tahun}</td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    
    container.innerHTML = html;
    
    // Store current report data for export
    window.currentReportData = data;
}

function exportReportToCSV() {
    if (!window.currentReportData || window.currentReportData.length === 0) {
        alert('Tidak ada data laporan untuk diekspor. Silakan generate laporan terlebih dahulu.');
        return;
    }
    
    const data = window.currentReportData.map((ikm, index) => ({
        'No': index + 1,
        'NIB': ikm.nib,
        'NIK': ikm.nik,
        'Nomor KK': ikm.kk,
        'Nama Lengkap': ikm.nama,
        'Alamat Lengkap': ikm.alamat,
        'Tempat Lahir': ikm.tempatLahir,
        'Tanggal Lahir': formatDate(ikm.tanggalLahir),
        'Jenis Kelamin': ikm.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
        'Nama Usaha': ikm.namaUsaha,
        'Bantuan Modal Usaha': ikm.bantuan,
        'Tahun': ikm.tahun,
        'Status': ikm.isDuplicate ? 'Duplikat' : 'Normal'
    }));
    
    const csv = convertToCSV(data);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    downloadFile(csv, `laporan-bmu-disnakerkukm-${timestamp}.csv`, 'text/csv');
    alert('Laporan berhasil diekspor ke CSV!');
}

function exportReportToExcel() {
    if (!window.currentReportData || window.currentReportData.length === 0) {
        alert('Tidak ada data laporan untuk diekspor. Silakan generate laporan terlebih dahulu.');
        return;
    }
    
    const data = window.currentReportData.map((ikm, index) => ({
        'No': index + 1,
        'NIB': ikm.nib,
        'NIK': ikm.nik,
        'Nomor KK': ikm.kk,
        'Nama Lengkap': ikm.nama,
        'Alamat Lengkap': ikm.alamat,
        'Tempat Lahir': ikm.tempatLahir,
        'Tanggal Lahir': formatDate(ikm.tanggalLahir),
        'Jenis Kelamin': ikm.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
        'Nama Usaha': ikm.namaUsaha,
        'Bantuan Modal Usaha': ikm.bantuan,
        'Tahun': ikm.tahun,
        'Status': ikm.isDuplicate ? 'Duplikat' : 'Normal'
    }));
    
    const csv = convertToCSV(data);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    downloadFile(csv, `laporan-bmu-disnakerkukm-${timestamp}.csv`, 'text/csv');
    alert('Laporan berhasil diekspor ke Excel (format CSV)!');
}

function exportReportToPDF() {
    if (!window.currentReportData || window.currentReportData.length === 0) {
        alert('Tidak ada data laporan untuk diekspor. Silakan generate laporan terlebih dahulu.');
        return;
    }
    
    alert('Fitur export PDF sedang dalam pengembangan. Silakan gunakan export Excel/CSV terlebih dahulu.');
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
}

// Initialize on load
console.log('BMU Script loaded successfully!');

// Credential Management Functions
function openCredentialModal() {
    document.getElementById('credentialModal').style.display = 'block';
    loadCredentialList();
}

function closeCredentialModal() {
    document.getElementById('credentialModal').style.display = 'none';
    document.getElementById('credentialForm').reset();
}

function handleCredentialSubmit(e) {
    e.preventDefault();
    
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    if (!newUsername || !newPassword || !confirmPassword) {
        alert('Semua field harus diisi!');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('Password dan konfirmasi password tidak sama!');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password minimal 6 karakter!');
        return;
    }
    
    // Get existing credentials
    const credentials = getStoredCredentials();
    
    // Check if username already exists
    if (credentials.some(cred => cred.username === newUsername)) {
        alert('Username sudah ada! Gunakan username lain.');
        return;
    }
    
    // Add new credential
    const newCredential = {
        username: newUsername,
        password: newPassword,
        createdAt: new Date().toISOString(),
        createdBy: sessionStorage.getItem('bmu_username') || 'Admin',
        isDefault: false
    };
    
    credentials.push(newCredential);
    
    // Save to localStorage
    saveCredentials(credentials);
    
    // Verify the credential was saved correctly
    const verifyCredentials = getStoredCredentials();
    const savedCredential = verifyCredentials.find(cred => cred.username === newUsername);
    
    if (savedCredential) {
        console.log('Credential saved successfully:', { username: newUsername, password: '***' });
        
        // Reset form and reload list
        document.getElementById('credentialForm').reset();
        loadCredentialList();
        
        alert(`Kredensial baru berhasil ditambahkan!\nUsername: ${newUsername}\nSekarang Anda dapat login dengan kredensial ini.`);
    } else {
        alert('Terjadi kesalahan saat menyimpan kredensial. Silakan coba lagi.');
    }
}

function getStoredCredentials() {
    const stored = localStorage.getItem('bmu_credentials');
    if (stored) {
        try {
            const credentials = JSON.parse(stored);
            // Ensure all credentials have required properties
            return credentials.map(cred => ({
                username: cred.username,
                password: cred.password,
                createdAt: cred.createdAt || new Date().toISOString(),
                createdBy: cred.createdBy || 'System',
                isDefault: cred.isDefault || false
            }));
        } catch (e) {
            console.error('Error parsing stored credentials:', e);
        }
    }
    
    // Return default credentials if none stored
    const defaultCreds = [{
        username: 'BMU-Madiun08',
        password: 'BMU-Madiun08',
        createdAt: new Date().toISOString(),
        createdBy: 'System',
        isDefault: true
    }];
    
    // Save default credentials to localStorage
    saveCredentials(defaultCreds);
    return defaultCreds;
}

function saveCredentials(credentials) {
    localStorage.setItem('bmu_credentials', JSON.stringify(credentials));
}

function loadCredentialList() {
    const credentials = getStoredCredentials();
    const container = document.getElementById('credentialList');
    
    console.log('Loading credential list:', credentials);
    
    if (credentials.length === 0) {
        container.innerHTML = '<p>Tidak ada kredensial tersimpan.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    credentials.forEach((cred, index) => {
        const item = document.createElement('div');
        item.className = `credential-item ${cred.isDefault ? 'default' : ''}`;
        
        const createdDate = cred.createdAt ? formatDateTime(new Date(cred.createdAt)) : 'Tidak diketahui';
        const createdBy = cred.createdBy || 'System';
        
        item.innerHTML = `
            <div class="credential-info">
                <h5>${cred.username} ${cred.isDefault ? '(Default)' : ''}</h5>
                <p>Dibuat: ${createdDate} oleh ${createdBy}</p>
                <small style="color: #6c757d;">Status: Aktif ✅</small>
            </div>
            <div class="credential-actions">
                ${!cred.isDefault ? `<button class="action-btn delete-btn" onclick="deleteCredential(${index})">🗑️ Hapus</button>` : ''}
                <button class="action-btn test-btn" onclick="testCredential('${cred.username}')">🧪 Test</button>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function deleteCredential(index) {
    if (confirm('Apakah Anda yakin ingin menghapus kredensial ini?')) {
        const credentials = getStoredCredentials();
        const deletedCred = credentials[index];
        credentials.splice(index, 1);
        saveCredentials(credentials);
        loadCredentialList();
        alert(`Kredensial "${deletedCred.username}" berhasil dihapus!`);
    }
}

function testCredential(username) {
    const credentials = getStoredCredentials();
    const credential = credentials.find(cred => cred.username === username);
    
    if (credential) {
        alert(`Kredensial ditemukan!\nUsername: ${credential.username}\nPassword: ${credential.password}\nStatus: Aktif ✅\n\nAnda dapat menggunakan kredensial ini untuk login.`);
    } else {
        alert(`Kredensial "${username}" tidak ditemukan!`);
    }
}

function resetCredentials() {
    if (confirm('Apakah Anda yakin ingin mereset semua kredensial ke default?\nSemua kredensial custom akan dihapus!')) {
        localStorage.removeItem('bmu_credentials');
        
        // Reinitialize with default credentials
        const defaultCreds = [{
            username: 'BMU-Madiun08',
            password: 'BMU-Madiun08',
            createdAt: new Date().toISOString(),
            createdBy: 'System',
            isDefault: true
        }];
        
        saveCredentials(defaultCreds);
        loadCredentialList();
        
        alert('Kredensial berhasil direset ke default!\nUsername: BMU-Madiun08\nPassword: BMU-Madiun08');
    }
}

// System Management Functions
function exportAllData() {
    const allData = {
        jenisBantuan: jenisBantuanData,
        ikmData: ikmData,
        recycleData: recycleData,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmu-backup-${formatDateForFilename(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Data berhasil dibackup!');
}

function resetAllData() {
    if (confirm('PERINGATAN: Ini akan menghapus SEMUA data sistem!\n\nApakah Anda yakin ingin melanjutkan?')) {
        if (confirm('Konfirmasi sekali lagi: Semua data akan hilang dan tidak dapat dikembalikan!')) {
            // Reset all data
            jenisBantuanData = [];
            ikmData = [];
            recycleData = [];
            filteredIKMData = [];
            
            // Reinitialize with dummy data
            initializeData();
            
            // Update all displays
            updateDashboard();
            renderBantuanTable();
            renderIKMTable();
            renderRecycleTable();
            
            alert('Semua data telah direset ke data dummy awal!');
        }
    }
}

// Utility Functions
function formatDateTime(date) {
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateForFilename(date) {
    return date.toISOString().split('T')[0];
}

console.log('Enhanced BMU Script loaded successfully!');