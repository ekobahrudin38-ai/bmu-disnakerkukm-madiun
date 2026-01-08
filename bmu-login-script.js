// BMU Login System
console.log('BMU Login System initialized...');

// Default credentials
const DEFAULT_CREDENTIALS = {
    username: 'BMU-Madiun08',
    password: 'BMU-Madiun08'
};

// Get stored credentials or use default
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

// Save credentials to localStorage
function saveCredentials(credentials) {
    localStorage.setItem('bmu_credentials', JSON.stringify(credentials));
}

// Check if user is already logged in
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('bmu_logged_in');
    const loginTime = sessionStorage.getItem('bmu_login_time');
    
    if (isLoggedIn && loginTime) {
        const currentTime = new Date().getTime();
        const sessionDuration = 8 * 60 * 60 * 1000; // 8 hours
        
        if (currentTime - parseInt(loginTime) < sessionDuration) {
            // Still logged in, redirect to dashboard
            window.location.href = 'bmu-index.html';
            return true;
        } else {
            // Session expired
            logout();
        }
    }
    return false;
}

// Login function
function login(username, password) {
    const credentials = getStoredCredentials();
    
    console.log('Login attempt:', { username, password: '***' });
    console.log('Available credentials:', credentials.map(c => ({ username: c.username, password: '***' })));
    
    const validCredential = credentials.find(cred => 
        cred.username === username && cred.password === password
    );
    
    if (validCredential) {
        console.log('Login successful for:', username);
        // Set session
        sessionStorage.setItem('bmu_logged_in', 'true');
        sessionStorage.setItem('bmu_login_time', new Date().getTime().toString());
        sessionStorage.setItem('bmu_username', username);
        
        return true;
    }
    
    console.log('Login failed for:', username);
    return false;
}

// Logout function
function logout() {
    sessionStorage.removeItem('bmu_logged_in');
    sessionStorage.removeItem('bmu_login_time');
    sessionStorage.removeItem('bmu_username');
    window.location.href = 'bmu-login.html';
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.className = 'login-error error show';
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.className = 'login-error success show';
}

// Handle form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginBtn = document.querySelector('.login-btn');
    
    if (!username || !password) {
        showError('Username dan password harus diisi!');
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.querySelector('.btn-icon').textContent = '⏳';
    
    // Simulate loading delay
    setTimeout(() => {
        if (login(username, password)) {
            showSuccess('Login berhasil! Mengalihkan ke dashboard...');
            
            setTimeout(() => {
                window.location.href = 'bmu-index.html';
            }, 1500);
        } else {
            showError('Username atau password salah!');
            loginBtn.classList.remove('loading');
            loginBtn.querySelector('.btn-icon').textContent = '🚀';
        }
    }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (checkLoginStatus()) {
        return;
    }
    
    // Setup form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
    
    // Setup enter key on inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin(e);
            }
        });
    });
    
    console.log('Login form initialized successfully');
});

// Export functions for use in other scripts
window.BMUAuth = {
    login,
    logout,
    checkLoginStatus,
    getStoredCredentials,
    saveCredentials
};