
// Finance Management System - Complete JavaScript
// Greenwood Academy Finance Management

// Global variables
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 12;
let financeData = [];
let filteredData = [];
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadFinanceData();
    setDefaultDates();
    initializeFilters();
    // Delay chart initialization to ensure DOM is ready
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

// Event Listeners Setup
function setupEventListeners() {
    // Sidebar toggle
    const toggleBtn = document.getElementById('toggleBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    // Search functionality
    const searchPayment = document.getElementById('searchPayment');
    if (searchPayment) {
        searchPayment.addEventListener('input', debounce(filterPayments, 300));
    }

    const searchTransaction = document.getElementById('searchTransaction');
    if (searchTransaction) {
        searchTransaction.addEventListener('input', debounce(filterTransactions, 300));
    }

    // Filter listeners
    const statusFilter = document.getElementById('statusFilter');
    const gradeFilter = document.getElementById('gradeFilter');

    if (statusFilter) statusFilter.addEventListener('change', filterPayments);
    if (gradeFilter) gradeFilter.addEventListener('change', filterPayments);

    // Filter chips
    const filterChips = document.querySelectorAll('.chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            filterPaymentsByTime(this.dataset.filter);
        });
    });

    // Form submissions
    setupFormListeners();
}

function setupFormListeners() {
    // Student search in payment modal
    const studentSearch = document.getElementById('studentSearch');
    if (studentSearch) {
        studentSearch.addEventListener('input', debounce(searchStudents, 300));
    }

    // Fee type change
    const feeType = document.getElementById('feeType');
    if (feeType) {
        feeType.addEventListener('change', updatePaymentAmount);
    }

    // Invoice grade change
    const invoiceGrade = document.getElementById('invoiceGrade');
    if (invoiceGrade) {
        invoiceGrade.addEventListener('change', updateInvoiceFees);
    }
}

// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');

    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
    toggleBtn.classList.toggle('shifted');
}

// Mock data for demonstration
function loadFinanceData() {
    financeData = [
        {
            id: 'STU001',
            name: 'Emma Thompson',
            grade: 5,
            feeType: 'Tuition Fee',
            amount: 1200,
            dueDate: '2025-05-30',
            status: 'paid',
            paymentDate: '2025-05-28',
            method: 'credit_card',
            transactionId: 'TXN001',
            image: './assets/image/std.jpg'
        },
        {
            id: 'STU002',
            name: 'James Wilson',
            grade: 3,
            feeType: 'Library Fee',
            amount: 150,
            dueDate: '2025-05-25',
            status: 'pending',
            paymentDate: null,
            method: null,
            transactionId: null,
            image: './assets/image/std.jpg'
        },
        {
            id: 'STU003',
            name: 'Sarah Davis',
            grade: 4,
            feeType: 'Transport Fee',
            amount: 300,
            dueDate: '2025-05-20',
            status: 'overdue',
            paymentDate: null,
            method: null,
            transactionId: null,
            image: './assets/image/std.jpg'
        },
        {
            id: 'STU004',
            name: 'Michael Brown',
            grade: 2,
            feeType: 'Lab Fee',
            amount: 75,
            dueDate: '2025-06-05',
            status: 'paid',
            paymentDate: '2025-05-20',
            method: 'bank_transfer',
            transactionId: 'TXN002',
            image: './assets/image/std.jpg'
        },
        {
            id: 'STU005',
            name: 'Lisa Garcia',
            grade: 6,
            feeType: 'Tuition Fee',
            amount: 1500,
            dueDate: '2025-06-01',
            status: 'partial',
            paymentDate: '2025-05-25',
            method: 'cash',
            transactionId: 'TXN003',
            image: './assets/image/std.jpg'
        }
    ];

    filteredData = [...financeData];
    renderPaymentTable();
    updateStatistics();
}

// Set default dates
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const paymentDate = document.getElementById('paymentDate');
    if (paymentDate) paymentDate.value = today;

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const invoiceDueDate = document.getElementById('invoiceDueDate');
    if (invoiceDueDate) invoiceDueDate.value = nextMonth.toISOString().split('T')[0];

    // Set date filters
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    if (dateFrom && dateTo) {
        const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        dateFrom.value = firstDay.toISOString().split('T')[0];
        dateTo.value = today;
    }
}

// Initialize filters
function initializeFilters() {
    filteredData = [...financeData];
}

// Chart initialization with proper error handling
function initializeCharts() {
    try {
        initializeRevenueChart();
        initializePaymentChart();
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

function initializeRevenueChart() {
    const revenueCtx = document.getElementById('revenueChart');
    if (!revenueCtx) return;

    // Destroy existing chart if it exists
    if (charts.revenue) {
        charts.revenue.destroy();
    }

    charts.revenue = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue ($)',
                data: [85000, 92000, 88000, 95000, 98000, 102000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#3498db',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            return 'Revenue: $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function (value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializePaymentChart() {
    const paymentCtx = document.getElementById('paymentChart');
    if (!paymentCtx) return;

    // Destroy existing chart if it exists
    if (charts.payment) {
        charts.payment.destroy();
    }

    const paymentStats = calculatePaymentStats();

    charts.payment = new Chart(paymentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Pending', 'Overdue', 'Partial'],
            datasets: [{
                data: [
                    paymentStats.paid,
                    paymentStats.pending,
                    paymentStats.overdue,
                    paymentStats.partial
                ],
                backgroundColor: ['#27ae60', '#f39c12', '#e74c3c', '#3498db'],
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed * 100) / total).toFixed(1);
                            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                        }
                    }
                }
            },
            cutout: '60%',
            elements: {
                arc: {
                    borderWidth: 0
                }
            }
        }
    });
}

function calculatePaymentStats() {
    return {
        paid: financeData.filter(item => item.status === 'paid').length,
        pending: financeData.filter(item => item.status === 'pending').length,
        overdue: financeData.filter(item => item.status === 'overdue').length,
        partial: financeData.filter(item => item.status === 'partial').length
    };
}

// Filter functions
function filterPayments() {
    const searchTerm = document.getElementById('searchPayment')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const gradeFilter = document.getElementById('gradeFilter')?.value || '';

    filteredData = financeData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
            item.id.toLowerCase().includes(searchTerm) ||
            item.feeType.toLowerCase().includes(searchTerm);

        const matchesStatus = !statusFilter || item.status === statusFilter;
        const matchesGrade = !gradeFilter || item.grade.toString() === gradeFilter;

        return matchesSearch && matchesStatus && matchesGrade;
    });

    renderPaymentTable();
    updatePaymentCount();
}

function filterPaymentsByTime(timeFilter) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    switch (timeFilter) {
        case 'all':
            filteredData = [...financeData];
            break;
        case 'today':
            filteredData = financeData.filter(item =>
                item.paymentDate === todayStr
            );
            break;
        case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(today.getDate() - 7);
            filteredData = financeData.filter(item =>
                item.paymentDate && new Date(item.paymentDate) >= weekAgo
            );
            break;
        case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(today.getMonth() - 1);
            filteredData = financeData.filter(item =>
                item.paymentDate && new Date(item.paymentDate) >= monthAgo
            );
            break;
        case 'overdue':
            filteredData = financeData.filter(item => item.status === 'overdue');
            break;
    }

    renderPaymentTable();
    updatePaymentCount();
}

function filterTransactions() {
    const searchTerm = document.getElementById('searchTransaction')?.value.toLowerCase() || '';
    // Implementation for transaction filtering
    console.log('Filtering transactions:', searchTerm);
}

function clearFilters() {
    document.getElementById('searchPayment').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('gradeFilter').value = '';

    // Reset filter chips
    document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('active');

    filteredData = [...financeData];
    renderPaymentTable();
    updatePaymentCount();
}

// Render functions
function renderPaymentTable() {
    const tbody = document.getElementById('paymentsTable');
    if (!tbody) return;

    tbody.innerHTML = '';

    filteredData.forEach(payment => {
        const row = createPaymentRow(payment);
        tbody.appendChild(row);
    });
}

function createPaymentRow(payment) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <div class="d-flex align-items-center">
                <img src="${payment.image}" alt="Student" class="rounded-circle me-3" width="40" height="40">
                <div>
                    <div class="fw-bold">${payment.name}</div>
                    <small class="text-muted">Grade ${payment.grade}</small>
                </div>
            </div>
        </td>
        <td><strong>${payment.id}</strong></td>
        <td>${payment.feeType}</td>
        <td><span class="amount-display ${getAmountClass(payment.status)}">$${payment.amount.toLocaleString()}</span></td>
        <td>${formatDate(payment.dueDate)}</td>
        <td><span class="payment-status-badge status-${payment.status}">${capitalizeFirst(payment.status)}</span></td>
        <td>
            <button class="btn btn-sm btn-outline-primary btn-action" onclick="viewPaymentDetails('${payment.id}')" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
            ${getActionButton(payment)}
        </td>
    `;
    return row;
}

function getAmountClass(status) {
    switch (status) {
        case 'paid': return 'amount-positive';
        case 'pending': return 'amount-warning';
        case 'overdue': return 'amount-negative';
        case 'partial': return 'amount-warning';
        default: return '';
    }
}

function getActionButton(payment) {
    switch (payment.status) {
        case 'paid':
            return `<button class="btn btn-sm btn-outline-success btn-action" onclick="printReceipt('${payment.id}')" title="Print Receipt">
                        <i class="fas fa-print"></i>
                    </button>`;
        case 'pending':
            return `<button class="btn btn-sm btn-outline-warning btn-action" onclick="sendReminder('${payment.id}')" title="Send Reminder">
                        <i class="fas fa-bell"></i>
                    </button>`;
        case 'overdue':
            return `<button class="btn btn-sm btn-outline-danger btn-action" onclick="escalatePayment('${payment.id}')" title="Escalate">
                        <i class="fas fa-exclamation-triangle"></i>
                    </button>`;
        default:
            return '';
    }
}

// Update functions
function updateStatistics() {
    const stats = calculateStatistics();

    // Update summary cards if they exist
    const summaryCards = document.querySelectorAll('.finance-summary-card h3');
    if (summaryCards.length >= 4) {
        summaryCards[0].textContent = '$' + stats.totalRevenue.toLocaleString();
        summaryCards[1].textContent = '$' + stats.outstandingFees.toLocaleString();
        summaryCards[2].textContent = '$' + stats.thisMonth.toLocaleString();
        summaryCards[3].textContent = stats.collectionRate + '%';
    }

    // Update stat boxes
    const statBoxes = document.querySelectorAll('.stat-box h3');
    if (statBoxes.length >= 4) {
        statBoxes[0].textContent = stats.paidStudents.toString();
        statBoxes[1].textContent = stats.pendingPayments.toString();
        statBoxes[2].textContent = stats.overduePayments.toString();
        statBoxes[3].textContent = stats.invoicesGenerated.toString();
    }
}

function calculateStatistics() {
    const totalRevenue = financeData
        .filter(item => item.status === 'paid')
        .reduce((sum, item) => sum + item.amount, 0);

    const outstandingFees = financeData
        .filter(item => item.status !== 'paid')
        .reduce((sum, item) => sum + item.amount, 0);

    const thisMonth = financeData
        .filter(item => {
            if (!item.paymentDate) return false;
            const paymentDate = new Date(item.paymentDate);
            const now = new Date();
            return paymentDate.getMonth() === now.getMonth() &&
                paymentDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, item) => sum + item.amount, 0);

    const paidCount = financeData.filter(item => item.status === 'paid').length;
    const totalCount = financeData.length;
    const collectionRate = totalCount > 0 ? ((paidCount / totalCount) * 100).toFixed(1) : 0;

    return {
        totalRevenue: totalRevenue + 1089850, // Adding base amount for demo
        outstandingFees: outstandingFees + 156240,
        thisMonth: thisMonth + 98450,
        collectionRate: parseFloat(collectionRate) + 88, // Adding base for demo
        paidStudents: paidCount + 1087,
        pendingPayments: financeData.filter(item => item.status === 'pending').length + 125,
        overduePayments: financeData.filter(item => item.status === 'overdue').length + 30,
        invoicesGenerated: 245
    };
}

function updatePaymentCount() {
    const countElement = document.getElementById('paymentCount');
    if (countElement) {
        countElement.textContent = filteredData.length.toLocaleString();
    }
}

// Modal functions
function searchStudents() {
    const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase();
    if (!searchTerm || searchTerm.length < 2) return;

    // Mock student search
    const students = [
        { id: 'STU001', name: 'Emma Thompson', grade: 5 },
        { id: 'STU002', name: 'James Wilson', grade: 3 },
        { id: 'STU003', name: 'Sarah Davis', grade: 4 },
        { id: 'STU004', name: 'Michael Brown', grade: 2 },
        { id: 'STU005', name: 'Lisa Garcia', grade: 6 }
    ];

    const matches = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm)
    );

    if (matches.length > 0) {
        const selectedStudentId = document.getElementById('selectedStudentId');
        if (selectedStudentId) {
            selectedStudentId.value = matches[0].id;
        }
    }
}

function updatePaymentAmount() {
    const feeType = document.getElementById('feeType')?.value;
    const paymentAmount = document.getElementById('paymentAmount');

    if (!feeType || !paymentAmount) return;

    const feeAmounts = {
        'tuition': 1200,
        'library': 150,
        'transport': 300,
        'lab': 100,
        'other': 0
    };

    paymentAmount.value = feeAmounts[feeType] || 0;
}

function updateInvoiceFees() {
    const grade = document.getElementById('invoiceGrade')?.value;
    if (!grade) return;

    // Update fee checkboxes based on grade
    const feeStructure = {
        1: { tuition: 1000, library: 100, transport: 250, lab: 50 },
        2: { tuition: 1100, library: 100, transport: 250, lab: 75 },
        3: { tuition: 1200, library: 120, transport: 280, lab: 100 },
        4: { tuition: 1300, library: 120, transport: 300, lab: 125 },
        5: { tuition: 1400, library: 150, transport: 320, lab: 150 },
        6: { tuition: 1500, library: 150, transport: 350, lab: 200 }
    };

    console.log('Updated fee structure for grade:', grade, feeStructure[grade]);
}

// Action functions
function savePayment() {
    const formData = {
        studentId: document.getElementById('selectedStudentId')?.value,
        feeType: document.getElementById('feeType')?.value,
        amount: parseFloat(document.getElementById('paymentAmount')?.value),
        method: document.getElementById('paymentMethod')?.value,
        date: document.getElementById('paymentDate')?.value,
        reference: document.getElementById('transactionReference')?.value,
        notes: document.getElementById('paymentNotes')?.value
    };

    if (!formData.studentId || !formData.feeType || !formData.amount || !formData.method) {
        showAlert('Please fill in all required fields', 'warning');
        return;
    }

    // Add to finance data
    const newPayment = {
        id: formData.studentId,
        name: getStudentName(formData.studentId),
        grade: getStudentGrade(formData.studentId),
        feeType: getFeeTypeName(formData.feeType),
        amount: formData.amount,
        dueDate: formData.date,
        status: 'paid',
        paymentDate: formData.date,
        method: formData.method,
        transactionId: 'TXN' + Date.now(),
        image: './assets/image/std.jpg'
    };

    financeData.push(newPayment);
    filteredData = [...financeData];

    renderPaymentTable();
    updateStatistics();
    updatePaymentCount();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('recordPaymentModal'));
    modal.hide();
    document.getElementById('recordPaymentForm').reset();

    showAlert('Payment recorded successfully!', 'success');
}

function generateInvoice() {
    const formData = {
        student: document.getElementById('invoiceStudent')?.value,
        grade: document.getElementById('invoiceGrade')?.value,
        dueDate: document.getElementById('invoiceDueDate')?.value,
        notes: document.getElementById('invoiceNotes')?.value
    };

    if (!formData.student || !formData.grade || !formData.dueDate) {
        showAlert('Please fill in all required fields', 'warning');
        return;
    }

    // Get selected fee types
    const selectedFees = [];
    if (document.getElementById('tuitionFee')?.checked) selectedFees.push('Tuition Fee');
    if (document.getElementById('libraryFee')?.checked) selectedFees.push('Library Fee');
    if (document.getElementById('transportFee')?.checked) selectedFees.push('Transport Fee');
    if (document.getElementById('labFee')?.checked) selectedFees.push('Lab Fee');

    console.log('Generating invoice for:', formData, 'Fees:', selectedFees);

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('generateInvoiceModal'));
    modal.hide();
    document.getElementById('generateInvoiceForm').reset();

    showAlert('Invoice generated successfully!', 'success');
}

function saveFeeType() {
    const formData = {
        name: document.getElementById('feeTypeName')?.value,
        description: document.getElementById('feeDescription')?.value,
        frequency: document.getElementById('feeFrequency')?.value,
        mandatory: document.getElementById('mandatoryFee')?.checked
    };

    if (!formData.name || !formData.frequency) {
        showAlert('Please fill in all required fields', 'warning');
        return;
    }

    console.log('Saving fee type:', formData);

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addFeeModal'));
    modal.hide();
    document.getElementById('addFeeForm').reset();

    showAlert('Fee type added successfully!', 'success');
}

// Action button functions
function viewPaymentDetails(studentId) {
    const payment = financeData.find(p => p.id === studentId);
    if (payment) {
        showAlert(`Viewing details for ${payment.name} (${studentId})`, 'info');
        console.log('Payment details:', payment);
    }
}

function printReceipt(studentId) {
    const payment = financeData.find(p => p.id === studentId);
    if (payment) {
        showAlert(`Printing receipt for ${payment.name}`, 'success');
        console.log('Printing receipt for:', payment);
    }
}

function sendReminder(studentId) {
    const payment = financeData.find(p => p.id === studentId);
    if (payment) {
        showAlert(`Reminder sent to ${payment.name}`, 'info');
        console.log('Sending reminder to:', payment);
    }
}

function escalatePayment(studentId) {
    const payment = financeData.find(p => p.id === studentId);
    if (payment) {
        showAlert(`Payment escalated for ${payment.name}`, 'warning');
        console.log('Escalating payment for:', payment);
    }
}

// Export functions
function exportPayments(format) {
    showAlert(`Exporting payments as ${format.toUpperCase()}`, 'info');
    console.log('Exporting payments:', format, filteredData);
}

function generateReport(type) {
    showAlert(`Generating ${type} report`, 'info');
    console.log('Generating report:', type);
}

function downloadFeeStructure() {
    showAlert('Downloading fee structure', 'info');
    console.log('Downloading fee structure');
}

// Utility functions
function refreshFinanceData() {
    showAlert('Refreshing financial data...', 'info');
    loadFinanceData();
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

function editFeeStructure(grade) {
    showAlert(`Editing fee structure for Grade ${grade}`, 'info');
    console.log('Editing fee structure for grade:', grade);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStudentName(studentId) {
    const students = {
        'STU001': 'Emma Thompson',
        'STU002': 'James Wilson',
        'STU003': 'Sarah Davis',
        'STU004': 'Michael Brown',
        'STU005': 'Lisa Garcia'
    };
    return students[studentId] || 'Unknown Student';
}

function getStudentGrade(studentId) {
    const grades = {
        'STU001': 5,
        'STU002': 3,
        'STU003': 4,
        'STU004': 2,
        'STU005': 6
    };
    return grades[studentId] || 1;
}

function getFeeTypeName(feeType) {
    const types = {
        'tuition': 'Tuition Fee',
        'library': 'Library Fee',
        'transport': 'Transport Fee',
        'lab': 'Lab Fee',
        'other': 'Other Fee'
    };
    return types[feeType] || 'Unknown Fee';
}

// Continuation of the Finance Management System JavaScript
// This continues from where your existing code left off

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${getAlertIcon(type)} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle',
        'danger': 'exclamation-triangle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle',
        'primary': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Enhanced fee structure management
function loadFeeStructure() {
    const feeStructureData = [
        { grade: 1, tuition: 1000, library: 100, transport: 250, lab: 50, total: 1400 },
        { grade: 2, tuition: 1100, library: 100, transport: 250, lab: 75, total: 1525 },
        { grade: 3, tuition: 1200, library: 120, transport: 280, lab: 100, total: 1700 },
        { grade: 4, tuition: 1300, library: 120, transport: 300, lab: 125, total: 1845 },
        { grade: 5, tuition: 1400, library: 150, transport: 320, lab: 150, total: 2020 },
        { grade: 6, tuition: 1500, library: 150, transport: 350, lab: 200, total: 2200 }
    ];

    renderFeeStructureTable(feeStructureData);
}

function renderFeeStructureTable(feeData) {
    const tbody = document.querySelector('#fee-structure table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    feeData.forEach(fee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>Grade ${fee.grade}</strong></td>
            <td>$${fee.tuition.toLocaleString()}</td>
            <td>$${fee.library.toLocaleString()}</td>
            <td>$${fee.transport.toLocaleString()}</td>
            <td>$${fee.lab.toLocaleString()}</td>
            <td><strong>$${fee.total.toLocaleString()}</strong></td>
            <td>
                <button class="btn btn-sm btn-outline-primary btn-action" onclick="editFeeStructure(${fee.grade})" title="Edit Fee Structure">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Enhanced transaction management
function loadTransactionHistory() {
    const transactions = [
        {
            id: 'TXN001',
            type: 'payment',
            student: 'Emma Thompson',
            description: 'Tuition Fee',
            amount: 1200,
            status: 'completed',
            date: '2025-05-28',
            method: 'credit_card'
        },
        {
            id: 'TXN002',
            type: 'payment',
            student: 'Michael Brown',
            description: 'Lab Fee',
            amount: 75,
            status: 'completed',
            date: '2025-05-20',
            method: 'bank_transfer'
        },
        {
            id: 'TXN003',
            type: 'refund',
            student: 'Michael Brown',
            description: 'Transport Fee Refund',
            amount: -100,
            status: 'processed',
            date: '2025-05-26',
            method: 'bank_transfer'
        },
        {
            id: 'TXN004',
            type: 'adjustment',
            student: 'Lisa Garcia',
            description: 'Scholarship Applied',
            amount: -200,
            status: 'applied',
            date: '2025-05-24',
            method: 'adjustment'
        }
    ];

    renderTransactionList(transactions);
}

function renderTransactionList(transactions) {
    const container = document.querySelector('#transactions .content-card');
    if (!container) return;

    // Keep the header and clear existing transactions
    const header = container.querySelector('h5');
    container.innerHTML = '';
    if (header) container.appendChild(header);

    transactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        container.appendChild(transactionElement);
    });
}

function createTransactionElement(transaction) {
    const div = document.createElement('div');
    div.className = 'transaction-item';

    const iconClass = getTransactionIcon(transaction.type);
    const colorClass = getTransactionColor(transaction.type);
    const amountClass = transaction.amount > 0 ? 'amount-positive' : 'amount-negative';
    const amountPrefix = transaction.amount > 0 ? '+' : '';

    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <div class="bg-${colorClass} rounded-circle p-2 me-3">
                    <i class="fas fa-${iconClass} text-white"></i>
                </div>
                <div>
                    <div class="fw-bold">${capitalizeFirst(transaction.type)} ${transaction.status === 'completed' ? 'Received' : capitalizeFirst(transaction.status)}</div>
                    <small class="text-muted">${transaction.student} - ${transaction.description}</small>
                </div>
            </div>
            <div class="text-end">
                <div class="amount-display ${amountClass}">${amountPrefix}$${Math.abs(transaction.amount).toLocaleString()}</div>
                <small class="text-muted">${formatRelativeTime(transaction.date)}</small>
            </div>
        </div>
    `;

    return div;
}

function getTransactionIcon(type) {
    const icons = {
        'payment': 'arrow-down',
        'refund': 'arrow-up',
        'adjustment': 'edit',
        'pending': 'clock'
    };
    return icons[type] || 'exchange-alt';
}

function getTransactionColor(type) {
    const colors = {
        'payment': 'success',
        'refund': 'danger',
        'adjustment': 'info',
        'pending': 'warning'
    };
    return colors[type] || 'primary';
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
}

// Enhanced export functionality
function exportPayments(format) {
    if (!filteredData || filteredData.length === 0) {
        showAlert('No data to export', 'warning');
        return;
    }

    switch (format.toLowerCase()) {
        case 'csv':
            exportToCSV();
            break;
        case 'excel':
            exportToExcel();
            break;
        case 'pdf':
            exportToPDF();
            break;
        default:
            showAlert('Unsupported export format', 'error');
    }
}

function exportToCSV() {
    const headers = ['Student ID', 'Student Name', 'Grade', 'Fee Type', 'Amount', 'Due Date', 'Status', 'Payment Date', 'Method'];
    const csvContent = [
        headers.join(','),
        ...filteredData.map(payment => [
            payment.id,
            `"${payment.name}"`,
            payment.grade,
            `"${payment.feeType}"`,
            payment.amount,
            payment.dueDate,
            payment.status,
            payment.paymentDate || 'N/A',
            payment.method || 'N/A'
        ].join(','))
    ].join('\n');

    downloadFile(csvContent, 'payments.csv', 'text/csv');
    showAlert('Payment data exported to CSV successfully!', 'success');
}

function exportToExcel() {
    // Mock Excel export - in real implementation, use libraries like SheetJS
    const data = filteredData.map(payment => ({
        'Student ID': payment.id,
        'Student Name': payment.name,
        'Grade': payment.grade,
        'Fee Type': payment.feeType,
        'Amount': payment.amount,
        'Due Date': payment.dueDate,
        'Status': payment.status,
        'Payment Date': payment.paymentDate || 'N/A',
        'Method': payment.method || 'N/A'
    }));

    console.log('Excel export data:', data);
    showAlert('Payment data exported to Excel successfully!', 'success');
}

function exportToPDF() {
    // Mock PDF export - in real implementation, use libraries like jsPDF
    console.log('PDF export data:', filteredData);
    showAlert('Payment data exported to PDF successfully!', 'success');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}

// Enhanced report generation
function generateReport(type) {
    const reportData = prepareReportData(type);

    switch (type) {
        case 'monthly':
            generateMonthlyReport(reportData);
            break;
        case 'collection':
            generateCollectionReport(reportData);
            break;
        case 'outstanding':
            generateOutstandingReport(reportData);
            break;
        default:
            showAlert('Unknown report type', 'error');
    }
}

function prepareReportData(type) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return {
        payments: financeData,
        dateRange: {
            start: new Date(currentYear, currentMonth, 1),
            end: new Date(currentYear, currentMonth + 1, 0)
        },
        type: type
    };
}

function generateMonthlyReport(data) {
    const monthlyStats = calculateMonthlyStats(data.payments, data.dateRange);
    console.log('Monthly Report:', monthlyStats);
    showAlert('Monthly report generated successfully!', 'success');
}

function generateCollectionReport(data) {
    const collectionStats = calculateCollectionStats(data.payments);
    console.log('Collection Report:', collectionStats);
    showAlert('Collection report generated successfully!', 'success');
}

function generateOutstandingReport(data) {
    const outstandingPayments = data.payments.filter(p => p.status === 'overdue' || p.status === 'pending');
    console.log('Outstanding Report:', outstandingPayments);
    showAlert('Outstanding report generated successfully!', 'success');
}

function calculateMonthlyStats(payments, dateRange) {
    const monthlyPayments = payments.filter(payment => {
        if (!payment.paymentDate) return false;
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= dateRange.start && paymentDate <= dateRange.end;
    });

    return {
        totalPayments: monthlyPayments.length,
        totalAmount: monthlyPayments.reduce((sum, p) => sum + p.amount, 0),
        averagePayment: monthlyPayments.length > 0 ?
            monthlyPayments.reduce((sum, p) => sum + p.amount, 0) / monthlyPayments.length : 0,
        paymentMethods: monthlyPayments.reduce((acc, p) => {
            acc[p.method] = (acc[p.method] || 0) + 1;
            return acc;
        }, {})
    };
}

function calculateCollectionStats(payments) {
    const total = payments.length;
    const collected = payments.filter(p => p.status === 'paid').length;
    const pending = payments.filter(p => p.status === 'pending').length;
    const overdue = payments.filter(p => p.status === 'overdue').length;

    return {
        totalStudents: total,
        collectedPayments: collected,
        pendingPayments: pending,
        overduePayments: overdue,
        collectionRate: total > 0 ? ((collected / total) * 100).toFixed(2) : 0,
        totalCollected: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
        totalOutstanding: payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0)
    };
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load additional data
    setTimeout(() => {
        loadFeeStructure();
        loadTransactionHistory();
    }, 200);

    // Setup additional event listeners
    setupAdvancedEventListeners();
});

function setupAdvancedEventListeners() {
    // Date range filters for transactions
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    const transactionType = document.getElementById('transactionType');

    if (dateFrom && dateTo && transactionType) {
        [dateFrom, dateTo, transactionType].forEach(element => {
            element.addEventListener('change', filterTransactionsByDate);
        });
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function filterTransactionsByDate() {
    const fromDate = document.getElementById('dateFrom')?.value;
    const toDate = document.getElementById('dateTo')?.value;
    const type = document.getElementById('transactionType')?.value;

    console.log('Filtering transactions:', { fromDate, toDate, type });
    // Implementation for filtering transactions by date and type
    loadTransactionHistory(); // Reload with filters applied
}

function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + R for refresh
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        refreshFinanceData();
    }

    // Ctrl/Cmd + P for new payment
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('recordPaymentModal'));
        modal.show();
    }

    // Ctrl/Cmd + I for new invoice
    if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
        event.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('generateInvoiceModal'));
        modal.show();
    }
}

// Auto-refresh functionality
let autoRefreshInterval;

function startAutoRefresh(intervalMinutes = 5) {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }

    autoRefreshInterval = setInterval(() => {
        refreshFinanceData();
        console.log('Auto-refreshed finance data');
    }, intervalMinutes * 60 * 1000);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
}

// Enhanced validation functions
function validatePaymentForm() {
    const requiredFields = [
        'selectedStudentId',
        'feeType',
        'paymentAmount',
        'paymentMethod',
        'paymentDate'
    ];

    const errors = [];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            errors.push(`${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        }
    });

    const amount = parseFloat(document.getElementById('paymentAmount')?.value);
    if (amount <= 0) {
        errors.push('Payment amount must be greater than 0');
    }

    if (errors.length > 0) {
        showAlert(errors.join(', '), 'danger');
        return false;
    }

    return true;
}

function validateInvoiceForm() {
    const requiredFields = ['invoiceStudent', 'invoiceGrade', 'invoiceDueDate'];
    const errors = [];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            errors.push(`${fieldId.replace('invoice', '').toLowerCase()} is required`);
        }
    });

    // Check if at least one fee type is selected
    const feeTypes = ['tuitionFee', 'libraryFee', 'transportFee', 'labFee'];
    const selectedFees = feeTypes.filter(feeId => document.getElementById(feeId)?.checked);

    if (selectedFees.length === 0) {
        errors.push('At least one fee type must be selected');
    }

    if (errors.length > 0) {
        showAlert(errors.join(', '), 'danger');
        return false;
    }

    return true;
}

// Performance optimization
function optimizeTableRendering() {
    const tbody = document.getElementById('paymentsTable');
    if (!tbody) return;

    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();

    filteredData.forEach(payment => {
        const row = createPaymentRow(payment);
        fragment.appendChild(row);
    });

    tbody.innerHTML = '';
    tbody.appendChild(fragment);
}

// Error handling and logging
function logError(error, context = '') {
    console.error(`[Finance System Error] ${context}:`, error);
    showAlert('An error occurred. Please try again.', 'danger');
}

function handleAsyncError(promise, context = '') {
    return promise.catch(error => {
        logError(error, context);
        throw error;
    });
}

// Initialize auto-refresh on app start
setTimeout(() => {
    startAutoRefresh(5); // Auto-refresh every 5 minutes
}, 1000);
