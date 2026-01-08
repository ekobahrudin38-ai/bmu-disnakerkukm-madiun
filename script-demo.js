// Database Siswa - Demo Version (Tanpa Supabase)
console.log('Initializing Database Siswa Demo...');

// State management
let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 0;
let allData = [];
let filteredData = [];
let editingId = null;

// DOM Elements
const siswaTableBody = document.getElementById('siswaTableBody');
const searchInput = document.getElementById('searchInput');
const siswaModal = document.getElementById('siswaModal');
const siswaForm = document.getElementById('siswaForm');
const modalTitle = document.getElementById('modalTitle');

// Data Dummy
function getDummyData() {
    return [
        {
            id: 1,
            nama_siswa: 'ABDUL LATIF',
            jenis_kelamin: 'L',
            tempat_lahir: 'BLRAU',
            tanggal_lahir: '2004-04-16',
            nis_lokal: '131265010003190',
            no_nisn: '0014451499',
            kelas: '12-IPS'
        },
        {
            id: 2,
            nama_siswa: 'BADARIANSYAH',
            jenis_kelamin: 'L',
            tempat_lahir: 'Tanjung Palas',
            tanggal_lahir: '2003-12-26',
            nis_lokal: '131265010003191',
            no_nisn: '0037436759',
            kelas: '12-IPS'
        },
        {
            id: 3,
            nama_siswa: 'GINA NOVITA SARI',
            jenis_kelamin: 'P',
            tempat_lahir: 'Gunung Sari',
            tanggal_lahir: '2003-05-11',
            nis_lokal: '131265010003192',
            no_nisn: '0035570648',
            kelas: '12-IPS'
        },
        {
            id: 4,
            nama_siswa: 'M.ALI SAPUTRA',
            jenis_kelamin: 'L',
            tempat_lahir: 'Gunung Sari',
            tanggal_lahir: '2004-05-15',
            nis_lokal: '131265010003193',
            no_nisn: '0042981588',
            kelas: 'Null'
        },
        {
            id: 5,
            nama_siswa: 'MUHAMAD JAMIL',
            jenis_kelamin: 'L',
            tempat_lahir: 'Ruhui Rahayu',
            tanggal_lahir: '2004-05-21',
            nis_lokal: '131265010003194',
            no_nisn: '0043921564',
            kelas: '12-IPS'
        },
        {
            id: 6,
            nama_siswa: 'SITI SOFIYATI MAULIA',
            jenis_kelamin: 'P',
            tempat_lahir: 'Pringga Baya',
            tanggal_lahir: '2004-03-07',
            nis_lokal: '131265010003195',
            no_nisn: '0044726680',
            kelas: '12-IPS'
        },
        {
            id: 7,
            nama_siswa: 'SUKRON ZAILANI',
            jenis_kelamin: 'L',
            tempat_lahir: 'Gunung Sari',
            tanggal_lahir: '2003-12-20',
            nis_lokal: '131265010003196',
            no_nisn: '0035570653',
            kelas: '12-IPS'
        },
        {
            id: 8,
            nama_siswa: 'ULFA EDA',
            jenis_kelamin: 'P',
            tempat_lahir: 'Tarakan',
            tanggal_lahir: '2003-07-13',
            nis_lokal: '131265010003197',
            no_nisn: '0035571480',
            kelas: '12-IPS'
        },
        {
            id: 9,
            nama_siswa: 'ZAENUR ARI RAHMAN',
            jenis_kelamin: 'L',
            tempat_lahir: 'Aik Bukak',
            tanggal_lahir: '2002-09-07',
            nis_lokal: '131265010003198',
            no_nisn: '3025696247',
            kelas: '12-IPS'
        }
    ];
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing demo...');
    loadSiswaData();
    setupEventListeners();
    console.log('Demo initialized successfully');
});

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Modal controls
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('addBtn').addEventListener('click', () => openModal());
    
    // Form submission
    siswaForm.addEventListener('submit', handleFormSubmit);
    
    // Pagination
    document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changePage(1));
    
    // Select all checkbox
    document.getElementById('selectAll').addEventListener('change', handleSelectAll);
    
    // Export buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', (e) => handleExport(e.target.textContent));
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === siswaModal) {
            closeModal();
        }
    });
}

// Data Operations
function loadSiswaData() {
    console.log('Loading dummy data...');
    allData = getDummyData();
    filteredData = [...allData];
    totalItems = allData.length;
    console.log('Data loaded:', allData);
    renderTable();
    updatePagination();
}

function saveSiswa(siswaData) {
    if (editingId) {
        // Update existing record
        const index = allData.findIndex(item => item.id === editingId);
        if (index !== -1) {
            allData[index] = { ...allData[index], ...siswaData };
        }
    } else {
        // Insert new record
        const newId = allData.length > 0 ? Math.max(...allData.map(item => item.id)) + 1 : 1;
        allData.push({ id: newId, ...siswaData });
    }
    
    filteredData = [...allData];
    totalItems = allData.length;
    renderTable();
    updatePagination();
    closeModal();
    
    alert(editingId ? 'Data berhasil diupdate!' : 'Data berhasil ditambahkan!');
}

function deleteSiswa(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        return;
    }
    
    allData = allData.filter(item => item.id !== id);
    filteredData = [...allData];
    totalItems = allData.length;
    renderTable();
    updatePagination();
    
    alert('Data berhasil dihapus!');
}

// UI Functions
function renderTable() {
    console.log('Rendering table with data:', filteredData);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    console.log('Page data:', pageData);
    siswaTableBody.innerHTML = '';
    
    if (pageData.length === 0) {
        siswaTableBody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px;">Tidak ada data siswa</td></tr>';
        return;
    }
    
    pageData.forEach((siswa, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-id="${siswa.id}"></td>
            <td>${startIndex + index + 1}</td>
            <td>${siswa.nama_siswa || ''}</td>
            <td>${siswa.jenis_kelamin || ''}</td>
            <td>${siswa.tempat_lahir || ''}</td>
            <td>${formatDate(siswa.tanggal_lahir) || ''}</td>
            <td>${siswa.nis_lokal || ''}</td>
            <td>${siswa.no_nisn || ''}</td>
            <td>${siswa.kelas || ''}</td>
            <td>📷</td>
            <td>
                <button class="action-btn edit-btn" onclick="editSiswa(${siswa.id})">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteSiswa(${siswa.id})">🗑️</button>
            </td>
        `;
        siswaTableBody.appendChild(row);
    });
    
    console.log('Table rendered successfully');
}

function openModal(siswa = null) {
    editingId = siswa ? siswa.id : null;
    modalTitle.textContent = siswa ? 'Edit Data Siswa' : 'Tambah Data Siswa';
    
    if (siswa) {
        document.getElementById('namaSiswa').value = siswa.nama_siswa || '';
        document.getElementById('jenisKelamin').value = siswa.jenis_kelamin || '';
        document.getElementById('tempatLahir').value = siswa.tempat_lahir || '';
        document.getElementById('tanggalLahir').value = siswa.tanggal_lahir || '';
        document.getElementById('nisLokal').value = siswa.nis_lokal || '';
        document.getElementById('noNisn').value = siswa.no_nisn || '';
        document.getElementById('kelas').value = siswa.kelas || '';
    } else {
        siswaForm.reset();
    }
    
    siswaModal.style.display = 'block';
}

function closeModal() {
    siswaModal.style.display = 'none';
    siswaForm.reset();
    editingId = null;
}

function editSiswa(id) {
    const siswa = allData.find(item => item.id === id);
    if (siswa) {
        openModal(siswa);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const siswaData = {
        nama_siswa: document.getElementById('namaSiswa').value,
        jenis_kelamin: document.getElementById('jenisKelamin').value,
        tempat_lahir: document.getElementById('tempatLahir').value,
        tanggal_lahir: document.getElementById('tanggalLahir').value,
        nis_lokal: document.getElementById('nisLokal').value,
        no_nisn: document.getElementById('noNisn').value,
        kelas: document.getElementById('kelas').value
    };
    
    saveSiswa(siswaData);
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        filteredData = [...allData];
    } else {
        filteredData = allData.filter(siswa => 
            (siswa.nama_siswa || '').toLowerCase().includes(searchTerm) ||
            (siswa.nis_lokal || '').toLowerCase().includes(searchTerm) ||
            (siswa.no_nisn || '').toLowerCase().includes(searchTerm) ||
            (siswa.kelas || '').toLowerCase().includes(searchTerm)
        );
    }
    
    totalItems = filteredData.length;
    currentPage = 1;
    renderTable();
    updatePagination();
}

function changePage(direction) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderTable();
        updatePagination();
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

function handleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function handleExport(type) {
    switch(type) {
        case 'Copy':
            copyToClipboard();
            break;
        case 'CSV':
            exportToCSV();
            break;
        case 'Excel':
            alert('Fitur export Excel akan segera tersedia!');
            break;
        case 'PDF':
            alert('Fitur export PDF akan segera tersedia!');
            break;
        case 'Print':
            printTable();
            break;
    }
}

function copyToClipboard() {
    const tableText = generateTableText();
    navigator.clipboard.writeText(tableText).then(() => {
        alert('Data berhasil disalin ke clipboard!');
    });
}

function exportToCSV() {
    const csv = generateCSV();
    downloadFile(csv, 'data-siswa.csv', 'text/csv');
}

function generateCSV() {
    const headers = ['No', 'Nama Siswa', 'JK', 'Tempat Lahir', 'Tanggal Lahir', 'NIS Lokal', 'No NISN', 'Kelas'];
    const rows = filteredData.map((siswa, index) => [
        index + 1,
        siswa.nama_siswa || '',
        siswa.jenis_kelamin || '',
        siswa.tempat_lahir || '',
        formatDate(siswa.tanggal_lahir) || '',
        siswa.nis_lokal || '',
        siswa.no_nisn || '',
        siswa.kelas || ''
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

function generateTableText() {
    return filteredData.map((siswa, index) => 
        `${index + 1}\t${siswa.nama_siswa}\t${siswa.jenis_kelamin}\t${siswa.tempat_lahir}\t${formatDate(siswa.tanggal_lahir)}\t${siswa.nis_lokal}\t${siswa.no_nisn}\t${siswa.kelas}`
    ).join('\n');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function printTable() {
    const printWindow = window.open('', '_blank');
    const tableHTML = generatePrintHTML();
    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
}

function generatePrintHTML() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Data Siswa Aktif</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Data Siswa Aktif</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Siswa</th>
                        <th>JK</th>
                        <th>Tempat Lahir</th>
                        <th>Tanggal Lahir</th>
                        <th>NIS Lokal</th>
                        <th>No NISN</th>
                        <th>Kelas</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredData.map((siswa, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${siswa.nama_siswa || ''}</td>
                            <td>${siswa.jenis_kelamin || ''}</td>
                            <td>${siswa.tempat_lahir || ''}</td>
                            <td>${formatDate(siswa.tanggal_lahir) || ''}</td>
                            <td>${siswa.nis_lokal || ''}</td>
                            <td>${siswa.no_nisn || ''}</td>
                            <td>${siswa.kelas || ''}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `;
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
}

console.log('Script demo loaded successfully!');