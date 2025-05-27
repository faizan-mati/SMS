
// Greenwood Academy Dashboard JavaScript
// Main dashboard functionality for school management system

// Sample data arrays (as defined in your HTML)
const recentActivities = [
    { icon: 'user-plus', type: 'success', title: 'New student enrollment', description: 'Sarah Johnson enrolled in Grade 5', time: '2 minutes ago' },
    { icon: 'graduation-cap', type: 'primary', title: 'Class completed', description: 'Mathematics Grade 6 class completed', time: '15 minutes ago' },
    { icon: 'exclamation-triangle', type: 'warning', title: 'Fee reminder sent', description: 'Payment reminders sent to 23 parents', time: '1 hour ago' },
    { icon: 'calendar-check', type: 'success', title: 'Event scheduled', description: 'Annual Sports Day scheduled for next month', time: '2 hours ago' },
    { icon: 'user-times', type: 'danger', title: 'Student absent', description: 'Mark Thompson marked absent today', time: '3 hours ago' },
    { icon: 'book', type: 'primary', title: 'Assignment submitted', description: '45 students submitted Science assignment', time: '4 hours ago' }
];

const notifications = [
    { id: 1, type: 'new', title: 'New admission application', description: 'Emma Wilson applied for Grade 3', time: '5 minutes ago' },
    { id: 2, type: 'new', title: 'Parent meeting request', description: 'Mr. Davis requested a meeting', time: '1 hour ago' },
    { id: 3, type: 'read', title: 'System maintenance scheduled', description: 'Scheduled for this weekend', time: '2 hours ago' },
    { id: 4, type: 'new', title: 'Fee payment received', description: 'RS.2,500 received from multiple parents', time: '3 hours ago' },
    { id: 5, type: 'read', title: 'Teacher evaluation completed', description: 'Q2 evaluations are ready', time: '1 day ago' }
];

const upcomingEventsData = [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2024-06-15', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Annual Sports Day', date: '2024-06-20', time: '9:00 AM', type: 'event' },
    { id: 3, title: 'Science Fair', date: '2024-06-25', time: '2:00 PM', type: 'academic' },
    { id: 4, title: 'Summer Break Begins', date: '2024-07-01', time: 'All Day', type: 'holiday' },
    { id: 5, title: 'Teacher Training Workshop', date: '2024-06-18', time: '3:00 PM', type: 'training' }
];



// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all dashboard components
    initializeDashboard();
    updateDateTime();
    setupEventListeners();
    populateRecentActivity();
    populateNotifications();
    populateUpcomingEvents();
    setupAnimations();

    // Update time every minute
    setInterval(updateDateTime, 60000);

    // Auto-refresh dashboard every 5 minutes
    setInterval(refreshDashboard, 300000);
});

// Initialize dashboard components
function initializeDashboard() {
    console.log('Greenwood Academy Dashboard Initialized');

    // Set today's date
    const today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const todayElement = document.getElementById('todayDate');
    if (todayElement) {
        todayElement.textContent = today.toLocaleDateString('en-US', options);
    }
    initializeAttendanceChart();
}

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const dateTimeString = now.toLocaleDateString('en-US') + ' ' + now.toLocaleTimeString('en-US', timeOptions);

    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Toggle sidebar for mobile
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('shifted');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('shifted');
            }
        }
    });

    // Responsive sidebar handling
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });
}

// Populate recent activity section
function populateRecentActivity() {
    const activityContainer = document.getElementById('recentActivity');
    if (!activityContainer) return;

    activityContainer.innerHTML = '';

    recentActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h6 class="mb-1">${activity.title}</h6>
                <p class="mb-1 text-muted">${activity.description}</p>
                <small class="text-muted"><i class="fas fa-clock me-1"></i>${activity.time}</small>
            </div>
        `;
        activityContainer.appendChild(activityItem);
    });
}

// Populate notifications
function populateNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;

    notificationsList.innerHTML = '';

    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.type}`;
        notificationItem.innerHTML = `
            <div class="d-flex align-items-start">
                <div class="notification-indicator ${notification.type === 'new' ? 'new' : ''}"></div>
                <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">${notification.title}</h6>
                    <p class="mb-1 text-muted small">${notification.description}</p>
                    <small class="text-muted">${notification.time}</small>
                </div>
                ${notification.type === 'new' ? '<div class="badge bg-primary rounded-pill">New</div>' : ''}
            </div>
        `;
        notificationsList.appendChild(notificationItem);
    });
}

// Populate upcoming events
function populateUpcomingEvents() {
    const eventsContainer = document.getElementById('upcomingEvents');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';

    upcomingEventsData.slice(0, 4).forEach(event => {
        const eventDate = new Date(event.date);
        const today = new Date();
        const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="event-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">${event.title}</h6>
                    <p class="mb-0 text-muted small">
                        <i class="fas fa-clock me-1"></i>${event.time}
                    </p>
                    <small class="text-primary">${daysUntil > 0 ? `${daysUntil} days to go` : daysUntil === 0 ? 'Today' : 'Past event'}</small>
                </div>
                <div class="event-type-badge ${event.type}">
                    ${event.type}
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventItem);
    });
}

// Refresh dashboard function
function refreshDashboard() {
    console.log('Refreshing dashboard...');

    // Show loading indicator
    showLoadingIndicator();

    // Simulate API calls with setTimeout
    setTimeout(() => {
        // Update statistics with slight variations
        updateStatistics();

        // Refresh recent activities
        populateRecentActivity();

        // Refresh notifications
        populateNotifications();

        // Refresh upcoming events
        populateUpcomingEvents();

        // Update date/time
        updateDateTime();

        // Hide loading indicator
        hideLoadingIndicator();

        // Show success message
        showNotification('Dashboard refreshed successfully!', 'success');
    }, 1500);
}

// Update statistics with random variations
function updateStatistics() {
    const stats = [
        { element: '.stat-box.primary h2', baseValue: 1247, variation: 5 },
        { element: '.stat-box.success h2', baseValue: 89, variation: 2 },
        { element: '.stat-box.warning h2', baseValue: 156, variation: 3 }
    ];

    stats.forEach(stat => {
        const element = document.querySelector(stat.element);
        if (element) {
            const variation = Math.floor(Math.random() * stat.variation * 2) - stat.variation;
            const newValue = stat.baseValue + variation;
            element.textContent = newValue.toLocaleString();
        }
    });
}

// Chart period change function
// Updated attendance data with labels
const attendanceData = {
    week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [85, 92, 88, 95, 91, 89, 93]
    },
    month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [88, 91, 89, 93]
    },
    year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [89, 91, 88, 92, 90, 93, 91, 89, 92, 90, 94, 92]
    }
};

let attendanceChart = null;

// Initialize chart after DOMContentLoaded
function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;

    attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: attendanceData.week.labels,
            datasets: [{
                label: 'Attendance Rate (%)',
                data: attendanceData.week.data,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#4f46e5',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#4f46e5',
                    borderWidth: 1,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.y}% attendance`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Updated chart period change function
function changeChartPeriod(period) {
    console.log(`Changing chart period to: ${period}`);

    // Update active button
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update chart data
    if (attendanceChart) {
        const newData = attendanceData[period];
        attendanceChart.data.labels = newData.labels;
        attendanceChart.data.datasets[0].data = newData.data;
        attendanceChart.update('active');
    }
}

// Mark all notifications as read
function markAllAsRead() {
    notifications.forEach(notification => {
        notification.type = 'read';
    });

    populateNotifications();
    showNotification('All notifications marked as read', 'info');
}

// Show loading indicator
function showLoadingIndicator() {
    const refreshBtn = document.querySelector('button[onclick="refreshDashboard()"]');
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
    }
}

// Hide loading indicator
function hideLoadingIndicator() {
    const refreshBtn = document.querySelector('button[onclick="refreshDashboard()"]');
    if (refreshBtn) {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt me-1"></i>Refresh';
    }
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(toast);

    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    bsToast.show();

    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility function to simulate API calls
function simulateApiCall(endpoint, data = null) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API call to ${endpoint}`, data);
            resolve({ success: true, data: data });
        }, Math.random() * 1000 + 500);
    });
}

// Add event listeners for dropdown menu items
document.addEventListener('DOMContentLoaded', function () {
    // Profile link
    const profileLink = document.querySelector('a[href="#profile"]');
    if (profileLink) {
        profileLink.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Profile page - Feature coming soon!', 'info');
        });
    }

    // Settings link
    const settingsLink = document.querySelector('a[href="#settings"]');
    if (settingsLink) {
        settingsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Settings page - Feature coming soon!', 'info');
        });
    }

    // Logout link
    const logoutLink = document.querySelector('a[href="#logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                showNotification('Logging out...', 'info');
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 2000);
            }
        });
    }
});

// Performance monitoring
function monitorPerformance() {
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
}

// Call performance monitoring after page load
window.addEventListener('load', monitorPerformance);

// Export functions for global access (if needed)
window.dashboardFunctions = {
    refreshDashboard,
    changeChartPeriod,
    markAllAsRead,
    showNotification
};
