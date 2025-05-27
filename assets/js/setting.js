
// Settings data storage (in memory)
let settingsData = {
    profile: {
        name: 'Administrator',
        email: 'admin@greenwoodacademy.edu',
        phone: '+1 (555) 123-4567',
        bio: ''
    },
    security: {
        twoFactorAuth: true,
        sessionTimeout: 60,
        strongPasswords: true,
        maxLoginAttempts: 5
    },
    appearance: {
        darkMode: false,
        theme: 'default',
        sidebarPosition: 'left'
    },
    notifications: {
        email: true,
        sms: false,
        desktop: true,
        studentUpdates: true,
        paymentAlerts: true,
        maintenanceAlerts: true
    },
    system: {
        academicYear: '2024-2025',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        timeZone: 'UTC-5',
        autoSave: true
    },
    backup: {
        schedule: 'weekly',
        lastBackup: '3 days ago'
    },
    data: {
        retention: 5,
        exportFormat: 'excel'
    },
    email: {
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpSecurity: 'tls',
        smtpUsername: '',
        smtpPassword: '',
        fromEmail: '',
        fromName: 'Greenwood Academy',
        signature: `Best regards,
Greenwood Academy Administration
Phone: +1 (555) 123-4567
Email: admin@greenwoodacademy.edu
Website: www.greenwoodacademy.edu`
    },
    advanced: {
        debugMode: false,
        apiAccess: true
    }
};

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeSidebar();
    loadSettings();
    setupEventListeners();
    requestNotificationPermission();
});

// Sidebar functionality
function initializeSidebar() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('shifted');
            toggleBtn.classList.toggle('shifted');
        });
    }

    // Auto-show sidebar on desktop
    if (window.innerWidth >= 768) {
        sidebar.classList.add('active');
        mainContent.classList.add('shifted');
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            sidebar.classList.add('active');
            mainContent.classList.add('shifted');
        } else {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });
}

// Load settings from memory
function loadSettings() {
    // Profile settings
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileBio = document.getElementById('profileBio');

    if (profileName) profileName.value = settingsData.profile.name;
    if (profileEmail) profileEmail.value = settingsData.profile.email;
    if (profilePhone) profilePhone.value = settingsData.profile.phone;
    if (profileBio) profileBio.value = settingsData.profile.bio;

    // Security settings
    const twoFactorAuth = document.getElementById('twoFactorAuth');
    const strongPasswords = document.getElementById('strongPasswords');

    if (twoFactorAuth) twoFactorAuth.checked = settingsData.security.twoFactorAuth;
    if (strongPasswords) strongPasswords.checked = settingsData.security.strongPasswords;

    // Appearance settings
    const darkMode = document.getElementById('darkMode');
    if (darkMode) {
        darkMode.checked = settingsData.appearance.darkMode;
        applyDarkMode(settingsData.appearance.darkMode);
    }
    updateThemeSelection(settingsData.appearance.theme);

    // Notification settings
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');
    const desktopNotifications = document.getElementById('desktopNotifications');
    const studentUpdates = document.getElementById('studentUpdates');
    const paymentAlerts = document.getElementById('paymentAlerts');
    const maintenanceAlerts = document.getElementById('maintenanceAlerts');

    if (emailNotifications) emailNotifications.checked = settingsData.notifications.email;
    if (smsNotifications) smsNotifications.checked = settingsData.notifications.sms;
    if (desktopNotifications) desktopNotifications.checked = settingsData.notifications.desktop;
    if (studentUpdates) studentUpdates.checked = settingsData.notifications.studentUpdates;
    if (paymentAlerts) paymentAlerts.checked = settingsData.notifications.paymentAlerts;
    if (maintenanceAlerts) maintenanceAlerts.checked = settingsData.notifications.maintenanceAlerts;

    // System settings
    const autoSave = document.getElementById('autoSave');
    if (autoSave) autoSave.checked = settingsData.system.autoSave;

    // Advanced settings
    const debugMode = document.getElementById('debugMode');
    const apiAccess = document.getElementById('apiAccess');

    if (debugMode) debugMode.checked = settingsData.advanced.debugMode;
    if (apiAccess) apiAccess.checked = settingsData.advanced.apiAccess;

    // Email configuration
    const smtpHost = document.getElementById('smtpHost');
    const smtpPort = document.getElementById('smtpPort');
    const smtpSecurity = document.getElementById('smtpSecurity');
    const fromName = document.getElementById('fromName');
    const emailSignature = document.getElementById('emailSignature');

    if (smtpHost) smtpHost.value = settingsData.email.smtpHost;
    if (smtpPort) smtpPort.value = settingsData.email.smtpPort;
    if (smtpSecurity) smtpSecurity.value = settingsData.email.smtpSecurity;
    if (fromName) fromName.value = settingsData.email.fromName;
    if (emailSignature) emailSignature.value = settingsData.email.signature;
}

// Setup event listeners
function setupEventListeners() {
    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');
            updateThemeSelection(theme);
            settingsData.appearance.theme = theme;
            applyTheme(theme);
            if (settingsData.system.autoSave) saveAllSettings();
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkMode');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            settingsData.appearance.darkMode = this.checked;
            applyDarkMode(this.checked);
            if (settingsData.system.autoSave) saveAllSettings();
        });
    }

    // Auto-save for switches
    document.querySelectorAll('.form-check-input').forEach(input => {
        input.addEventListener('change', function () {
            if (settingsData.system.autoSave) {
                setTimeout(() => saveAllSettings(), 500);
            }
        });
    });

    // Sidebar position change
    document.querySelectorAll('input[name="sidebarPosition"]').forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                settingsData.appearance.sidebarPosition = this.id === 'sidebarLeft' ? 'left' : 'right';
                applySidebarPosition(settingsData.appearance.sidebarPosition);
                if (settingsData.system.autoSave) saveAllSettings();
            }
        });
    });
}

// Apply dark mode
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Apply theme
function applyTheme(theme) {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    if (theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
}

// Apply sidebar position
function applySidebarPosition(position) {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (position === 'right') {
        sidebar.classList.add('sidebar-right');
        mainContent.classList.add('content-right');
    } else {
        sidebar.classList.remove('sidebar-right');
        mainContent.classList.remove('content-right');
    }
}

// Update theme selection
function updateThemeSelection(theme) {
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });
}

// Save all settings
function saveAllSettings() {
    updateSettingsFromForm();
    showNotification('Settings saved successfully!', 'success');
    console.log('Settings saved:', settingsData);

    // Animate save button
    const saveBtn = document.querySelector('button[onclick="saveAllSettings()"]');
    if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Saved!';
        saveBtn.classList.add('btn-success');
        saveBtn.classList.remove('btn-primary');

        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fas fa-save me-1"></i>Save All Changes';
            saveBtn.classList.remove('btn-success');
            saveBtn.classList.add('btn-primary');
        }, 2000);
    }
}

// Update settings data from form
function updateSettingsFromForm() {
    // Profile
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileBio = document.getElementById('profileBio');

    if (profileName) settingsData.profile.name = profileName.value;
    if (profileEmail) settingsData.profile.email = profileEmail.value;
    if (profilePhone) settingsData.profile.phone = profilePhone.value;
    if (profileBio) settingsData.profile.bio = profileBio.value;

    // Security
    const twoFactorAuth = document.getElementById('twoFactorAuth');
    const strongPasswords = document.getElementById('strongPasswords');

    if (twoFactorAuth) settingsData.security.twoFactorAuth = twoFactorAuth.checked;
    if (strongPasswords) settingsData.security.strongPasswords = strongPasswords.checked;

    // Appearance
    const darkMode = document.getElementById('darkMode');
    if (darkMode) settingsData.appearance.darkMode = darkMode.checked;

    // Notifications
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');
    const desktopNotifications = document.getElementById('desktopNotifications');
    const studentUpdates = document.getElementById('studentUpdates');
    const paymentAlerts = document.getElementById('paymentAlerts');
    const maintenanceAlerts = document.getElementById('maintenanceAlerts');

    if (emailNotifications) settingsData.notifications.email = emailNotifications.checked;
    if (smsNotifications) settingsData.notifications.sms = smsNotifications.checked;
    if (desktopNotifications) settingsData.notifications.desktop = desktopNotifications.checked;
    if (studentUpdates) settingsData.notifications.studentUpdates = studentUpdates.checked;
    if (paymentAlerts) settingsData.notifications.paymentAlerts = paymentAlerts.checked;
    if (maintenanceAlerts) settingsData.notifications.maintenanceAlerts = maintenanceAlerts.checked;

    // System
    const autoSave = document.getElementById('autoSave');
    if (autoSave) settingsData.system.autoSave = autoSave.checked;

    // Advanced
    const debugMode = document.getElementById('debugMode');
    const apiAccess = document.getElementById('apiAccess');

    if (debugMode) settingsData.advanced.debugMode = debugMode.checked;
    if (apiAccess) settingsData.advanced.apiAccess = apiAccess.checked;

    // Email configuration
    const smtpHost = document.getElementById('smtpHost');
    const smtpPort = document.getElementById('smtpPort');
    const smtpSecurity = document.getElementById('smtpSecurity');
    const smtpUsername = document.getElementById('smtpUsername');
    const smtpPassword = document.getElementById('smtpPassword');
    const fromEmail = document.getElementById('fromEmail');
    const fromName = document.getElementById('fromName');

    if (smtpHost) settingsData.email.smtpHost = smtpHost.value;
    if (smtpPort) settingsData.email.smtpPort = parseInt(smtpPort.value);
    if (smtpSecurity) settingsData.email.smtpSecurity = smtpSecurity.value;
    if (smtpUsername) settingsData.email.smtpUsername = smtpUsername.value;
    if (smtpPassword) settingsData.email.smtpPassword = smtpPassword.value;
    if (fromEmail) settingsData.email.fromEmail = fromEmail.value;
    if (fromName) settingsData.email.fromName = fromName.value;
}

// Reset to defaults
function resetToDefaults() {
    if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
        // Reset to default values
        settingsData = {
            profile: {
                name: 'Administrator',
                email: 'admin@greenwoodacademy.edu',
                phone: '+1 (555) 123-4567',
                bio: ''
            },
            security: {
                twoFactorAuth: false,
                sessionTimeout: 60,
                strongPasswords: true,
                maxLoginAttempts: 5
            },
            appearance: {
                darkMode: false,
                theme: 'default',
                sidebarPosition: 'left'
            },
            notifications: {
                email: true,
                sms: false,
                desktop: true,
                studentUpdates: true,
                paymentAlerts: true,
                maintenanceAlerts: true
            },
            system: {
                academicYear: '2024-2025',
                language: 'en',
                dateFormat: 'MM/DD/YYYY',
                timeZone: 'UTC-5',
                autoSave: true
            },
            backup: {
                schedule: 'weekly',
                lastBackup: '3 days ago'
            },
            data: {
                retention: 5,
                exportFormat: 'excel'
            },
            email: {
                smtpHost: 'smtp.gmail.com',
                smtpPort: 587,
                smtpSecurity: 'tls',
                smtpUsername: '',
                smtpPassword: '',
                fromEmail: '',
                fromName: 'Greenwood Academy',
                signature: `Best regards,
Greenwood Academy Administration
Phone: +1 (555) 123-4567
Email: admin@greenwoodacademy.edu
Website: www.greenwoodacademy.edu`
            },
            advanced: {
                debugMode: false,
                apiAccess: true
            }
        };

        loadSettings();
        applyDarkMode(false);
        applyTheme('default');
        applySidebarPosition('left');
        showNotification('Settings reset to defaults', 'info');
    }
}

// Profile functions
function changeProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showNotification('File size too large. Please select an image under 5MB.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const profileAvatar = document.querySelector('.profile-avatar');
                if (profileAvatar) {
                    profileAvatar.src = e.target.result;
                    showNotification('Profile picture updated', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function saveProfile() {
    const profileForm = document.getElementById('editProfileForm');
    if (profileForm.checkValidity()) {
        updateSettingsFromForm();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        if (modal) modal.hide();
        showNotification('Profile updated successfully', 'success');
    } else {
        profileForm.reportValidity();
    }
}

// Backup functions
function createBackup() {
    const progressBar = document.getElementById('backupProgress');
    const backupBtn = document.querySelector('button[onclick="createBackup()"]');

    if (backupBtn) {
        backupBtn.disabled = true;
        backupBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Creating Backup...';
    }

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                if (progressBar) progressBar.style.width = '0%';
                if (backupBtn) {
                    backupBtn.disabled = false;
                    backupBtn.innerHTML = '<i class="fas fa-save me-1"></i>Backup Now';
                }
                showNotification('Backup completed successfully', 'success');
                settingsData.backup.lastBackup = 'Just now';

                // Update backup display
                const backupInfo = document.querySelector('.backup-status h6');
                if (backupInfo) {
                    backupInfo.textContent = 'Last Backup: Just now';
                }
            }, 1000);
        }
        if (progressBar) progressBar.style.width = progress + '%';
    }, 200);
}

// Security functions
function viewSecurityLogs() {
    const logContainer = document.getElementById('securityLog');
    const viewBtn = document.querySelector('button[onclick="viewSecurityLogs()"]');

    if (logContainer && viewBtn) {
        const isVisible = logContainer.style.display !== 'none';
        logContainer.style.display = isVisible ? 'none' : 'block';
        viewBtn.innerHTML = isVisible
            ? '<i class="fas fa-eye me-1"></i>View Logs'
            : '<i class="fas fa-eye-slash me-1"></i>Hide Logs';
    }
}

// Data management functions
function cleanupDatabase() {
    if (confirm('This will remove temporary files and optimize the database. Continue?')) {
        const cleanupBtn = document.querySelector('button[onclick="cleanupDatabase()"]');
        if (cleanupBtn) {
            cleanupBtn.disabled = true;
            cleanupBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Cleaning...';

            setTimeout(() => {
                cleanupBtn.disabled = false;
                cleanupBtn.innerHTML = '<i class="fas fa-broom me-1"></i>Clean Now';
                showNotification('Database cleanup completed', 'success');
            }, 3000);
        }
    }
}

function exportAllData() {
    const exportBtn = document.querySelector('button[onclick="exportAllData()"]');
    if (exportBtn) {
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Exporting...';

        setTimeout(() => {
            // Simulate data export
            const dataStr = JSON.stringify(settingsData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `greenwood_academy_settings_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);

            exportBtn.disabled = false;
            exportBtn.innerHTML = '<i class="fas fa-download me-1"></i>Export';
            showNotification('Settings data exported successfully', 'success');
        }, 2000);
    }
}

function startImport() {
    const fileInput = document.getElementById('importFile');
    const importType = document.getElementById('importType');

    if (!fileInput || !fileInput.files.length) {
        showNotification('Please select a file to import', 'error');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            console.log('Importing data:', data);

            const modal = bootstrap.Modal.getInstance(document.getElementById('importDataModal'));
            if (modal) modal.hide();

            showNotification(`${importType.value} data imported successfully`, 'success');
        } catch (error) {
            showNotification('Invalid file format. Please check your file and try again.', 'error');
        }
    };

    reader.readAsText(file);
}

// Email functions
function saveEmailConfig() {
    const form = document.getElementById('emailConfigForm');
    if (form.checkValidity()) {
        updateSettingsFromForm();
        const modal = bootstrap.Modal.getInstance(document.getElementById('emailConfigModal'));
        if (modal) modal.hide();
        showNotification('Email configuration saved successfully', 'success');
    } else {
        form.reportValidity();
    }
}

function testEmailConfig() {
    const testBtn = document.querySelector('button[onclick="testEmailConfig()"]');
    if (testBtn) {
        testBtn.disabled = true;
        testBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Testing...';

        setTimeout(() => {
            testBtn.disabled = false;
            testBtn.innerHTML = '<i class="fas fa-vial me-1"></i>Test Connection';

            // Simulate connection test
            const isSuccess = Math.random() > 0.3; // 70% success rate
            if (isSuccess) {
                showNotification('Email configuration test successful', 'success');
            } else {
                showNotification('Email configuration test failed. Please check your settings.', 'error');
            }
        }, 2000);
    }
}

function sendTestEmail() {
    const testBtn = document.querySelector('button[onclick="sendTestEmail()"]');
    if (testBtn) {
        testBtn.disabled = true;
        testBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Sending...';

        setTimeout(() => {
            testBtn.disabled = false;
            testBtn.innerHTML = '<i class="fas fa-paper-plane me-1"></i>Send Test';
            showNotification('Test email sent successfully', 'success');
        }, 1500);
    }
}

function manageEmailTemplates() {
    showNotification('Email template manager will open in a new window', 'info');
    // In a real application, this would open a template management interface
    console.log('Opening email template manager...');
}

function saveSignature() {
    const signature = document.getElementById('emailSignature').value;
    const includeSignature = document.getElementById('includeSignature').checked;

    settingsData.email.signature = signature;
    settingsData.email.includeSignature = includeSignature;

    const modal = bootstrap.Modal.getInstance(document.getElementById('signatureModal'));
    if (modal) modal.hide();

    showNotification('Email signature saved successfully', 'success');
}

// Advanced functions
function clearCache() {
    if (confirm('This will clear all cached data and may slow down the system temporarily. Continue?')) {
        const clearBtn = document.querySelector('button[onclick="clearCache()"]');
        if (clearBtn) {
            clearBtn.disabled = true;
            clearBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Clearing...';

            setTimeout(() => {
                clearBtn.disabled = false;
                clearBtn.innerHTML = '<i class="fas fa-trash me-1"></i>Clear Cache';
                showNotification('Cache cleared successfully', 'success');
            }, 2000);
        }
    }
}

function cacheSettings() {
    showNotification('Cache configuration panel will open', 'info');
    console.log('Opening cache settings...');
}

function downloadLogs() {
    const downloadBtn = document.querySelector('button[onclick="downloadLogs()"]');
    if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Preparing...';

        setTimeout(() => {
            // Simulate log file creation
            const logData = `System Logs - Generated on ${new Date().toISOString()}
            
[INFO] System initialized
[INFO] User authentication successful
[INFO] Settings loaded
[WARNING] Cache size approaching limit
[ERROR] Failed login attempt from unknown IP
[INFO] Backup completed successfully
[INFO] Settings saved by administrator
            `;

            const logBlob = new Blob([logData], { type: 'text/plain' });
            const url = URL.createObjectURL(logBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `system_logs_${new Date().toISOString().split('T')[0]}.txt`;
            link.click();
            URL.revokeObjectURL(url);

            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download me-1"></i>Download Logs';
            showNotification('System logs downloaded successfully', 'success');
        }, 1500);
    }
}

// Notification functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Desktop notification if enabled
    if (settingsData.notifications.desktop && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Greenwood Academy', {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl+S to save settings
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveAllSettings();
    }

    // Ctrl+R to reset (with confirmation)
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetToDefaults();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
        });
    }
});

// Auto-save functionality
let autoSaveTimer;
document.addEventListener('input', function (e) {
    if (settingsData.system.autoSave && (e.target.type === 'text' || e.target.type === 'email' || e.target.type === 'tel' || e.target.tagName === 'TEXTAREA')) {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            updateSettingsFromForm();
            console.log('Auto-saved settings');
        }, 2000);
    }
});

// Export settings functions for global access
window.settingsManager = {
    save: saveAllSettings,
    reset: resetToDefaults,
    export: exportAllData,
    getSettings: () => settingsData,
    showNotification: showNotification
};
