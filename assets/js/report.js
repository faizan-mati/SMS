

// Sidebar Toggle
document.getElementById('toggleBtn').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
});

// Initialize Charts
document.addEventListener('DOMContentLoaded', function () {
    initializeCharts();
});

function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Overall Performance',
                data: [78, 81, 85, 83, 87],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Academic Performance Trend'
                }
            }
        }
    });

    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'Late'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: ['#27ae60', '#e74c3c', '#f39c12']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Attendance Distribution'
                }
            }
        }
    });

    // Grade Distribution Chart
    const gradeCtx = document.getElementById('gradeDistributionChart').getContext('2d');
    new Chart(gradeCtx, {
        type: 'bar',
        data: {
            labels: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
            datasets: [{
                label: 'Number of Students',
                data: [15, 28, 35, 42, 38, 25, 12, 5],
                backgroundColor: [
                    '#27ae60', '#2ecc71', '#3498db', '#5dade2',
                    '#f39c12', '#e67e22', '#e74c3c', '#c0392b'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Grade Distribution'
                }
            }
        }
    });

    // Subject Performance Chart
    const subjectCtx = document.getElementById('subjectPerformanceChart').getContext('2d');
    new Chart(subjectCtx, {
        type: 'radar',
        data: {
            labels: ['Mathematics', 'English', 'Science', 'Social Studies', 'Arts', 'Physical Ed'],
            datasets: [{
                label: 'Class Average',
                data: [85, 79, 82, 75, 88, 92],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)'
            }, {
                label: 'School Average',
                data: [80, 82, 78, 77, 85, 89],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Subject Performance Comparison'
                }
            }
        }
    });

    // Monthly Trends Chart
    const trendsCtx = document.getElementById('monthlyTrendsChart').getContext('2d');
    new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Performance',
                data: [75, 78, 80, 82, 79, 81, 85, 83, 87],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            }, {
                label: 'Attendance',
                data: [88, 90, 92, 89, 91, 93, 94, 92, 94],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Performance & Attendance Trends'
                }
            }
        }
    });
}

// Report Functions
function loadReportCategory(category) {
    showNotification(`Loading ${category} reports...`, 'info');
    // Implement category-specific report loading
}

function refreshReports() {
    showNotification('Reports refreshed successfully!', 'success');
    // Implement refresh functionality
}

function applyFilters() {
    const timeRange = document.getElementById('timeRange').value;
    const grade = document.getElementById('gradeFilter').value;
    const subject = document.getElementById('subjectFilter').value;

    showNotification('Filters applied successfully!', 'success');
    // Implement filter application
}

function generateReport() {
    showNotification('Report generation started...', 'info');
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('generateReportModal'));
    modal.hide();

    // Simulate report generation
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
    }, 3000);
}

function viewReport(id) {
    showNotification(`Opening report ${id}...`, 'info');
    // Implement report viewing
}

function downloadReport(id) {
    showNotification(`Downloading report ${id}...`, 'success');
    // Implement report download
}

function exportChart(format) {
    showNotification(`Exporting charts as ${format.toUpperCase()}...`, 'info');
    // Implement chart export
}

function viewAllReports() {
    showNotification('Loading all reports...', 'info');
    // Implement view all reports
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
                <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
                ${message}
                <button type="button" class="btn-close btn-close-white ms-2" onclick="this.parentElement.remove()"></button>
            `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        warning: 'exclamation-triangle',
        danger: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Auto-refresh data every 5 minutes
setInterval(() => {
    console.log('Auto-refreshing report data...');
    // Implement auto-refresh functionality
}, 300000);
