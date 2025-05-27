
// Sample teacher data
const teachers = [
    {
        id: 'T001',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@greenwoodacademy.edu',
        phone: '(555) 123-4567',
        department: 'Mathematics',
        position: 'Head of Department',
        experience: 12,
        qualification: 'M.Sc Mathematics',
        status: 'active',
        employmentType: 'full-time',
        salary: 4800,
        rating: 4.6,
        joiningDate: '2016-01-20',
        specializations: 'Physics, Chemistry'
    },
    {
        id: 'T003',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@greenwoodacademy.edu',
        phone: '(555) 345-6789',
        department: 'English',
        position: 'Teacher',
        experience: 5,
        qualification: 'M.A English Literature',
        status: 'active',
        employmentType: 'full-time',
        salary: 4200,
        rating: 4.7,
        joiningDate: '2019-09-01',
        specializations: 'Literature, Creative Writing'
    },
    {
        id: 'T004',
        firstName: 'David',
        lastName: 'Thompson',
        email: 'david.thompson@greenwoodacademy.edu',
        phone: '(555) 456-7890',
        department: 'Physical Education',
        position: 'Teacher',
        experience: 6,
        qualification: 'B.P.Ed',
        status: 'part-time',
        employmentType: 'part-time',
        salary: 2800,
        rating: 4.5,
        joiningDate: '2018-03-15',
        specializations: 'Sports, Fitness Training'
    },
    {
        id: 'T005',
        firstName: 'Lisa',
        lastName: 'Wang',
        email: 'lisa.wang@greenwoodacademy.edu',
        phone: '(555) 567-8901',
        department: 'Arts',
        position: 'Teacher',
        experience: 4,
        qualification: 'M.F.A Visual Arts',
        status: 'active',
        employmentType: 'full-time',
        salary: 4000,
        rating: 4.9,
        joiningDate: '2020-08-10',
        specializations: 'Drawing, Painting, Sculpture'
    },
    {
        id: 'T006',
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.brown@greenwoodacademy.edu',
        phone: '(555) 678-9012',
        department: 'Social Studies',
        position: 'Senior Teacher',
        experience: 15,
        qualification: 'M.A History',
        status: 'active',
        employmentType: 'full-time',
        salary: 5200,
        rating: 4.4,
        joiningDate: '2009-07-01',
        specializations: 'World History, Geography'
    }
];

let currentPage = 1;
let itemsPerPage = 12;
let filteredTeachers = [...teachers];
let currentView = 'grid';

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    initializePage();
    setupEventListeners();
    renderTeachers();
});

function initializePage() {
    // Set sidebar active state
    document.querySelector('.nav-link[href="./teacher.html"]').classList.add('active');
}

function setupEventListeners() {
    // Toggle sidebar
    document.getElementById('toggleBtn').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleBtn = document.getElementById('toggleBtn');

        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
        toggleBtn.classList.toggle('shifted');
    });

    // Search functionality
    document.getElementById('searchTeacher').addEventListener('input', function () {
        filterTeachers();
    });

    // Filter dropdowns
    document.getElementById('departmentFilter').addEventListener('change', filterTeachers);
    document.getElementById('statusFilter').addEventListener('change', filterTeachers);

    // Filter chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function () {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            filterTeachers();
        });
    });
}

function filterTeachers() {
    const searchTerm = document.getElementById('searchTeacher').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const activeChip = document.querySelector('.chip.active').dataset.filter;

    filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.firstName.toLowerCase().includes(searchTerm) ||
            teacher.lastName.toLowerCase().includes(searchTerm) ||
            teacher.email.toLowerCase().includes(searchTerm) ||
            teacher.id.toLowerCase().includes(searchTerm) ||
            teacher.department.toLowerCase().includes(searchTerm);

        const matchesDepartment = !departmentFilter || teacher.department.toLowerCase().replace(/\s+/g, '-') === departmentFilter;
        const matchesStatus = !statusFilter || teacher.status === statusFilter;

        let matchesChip = true;
        if (activeChip === 'new-hires') {
            const joinDate = new Date(teacher.joiningDate);
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            matchesChip = joinDate > oneYearAgo;
        } else if (activeChip === 'senior') {
            matchesChip = teacher.experience >= 10;
        } else if (activeChip === 'high-rated') {
            matchesChip = teacher.rating >= 4.5;
        } else if (activeChip === 'birthday') {
            // For demo purposes, assume some teachers have birthdays this month
            matchesChip = ['T001', 'T003', 'T005'].includes(teacher.id);
        }

        return matchesSearch && matchesDepartment && matchesStatus && matchesChip;
    });

    currentPage = 1;
    renderTeachers();
    updateTeacherCount();
}

function renderTeachers() {
    if (currentView === 'grid') {
        renderGridView();
    } else {
        renderListView();
    }
    renderPagination();
}

function renderGridView() {
    const container = document.getElementById('teachersGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTeachers = filteredTeachers.slice(startIndex, endIndex);

    container.innerHTML = pageTeachers.map(teacher => `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="teacher-card">
                        <div class="teacher-avatar">
                            ${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}
                        </div>
                        <div class="text-center">
                            <div class="teacher-name">${teacher.firstName} ${teacher.lastName}</div>
                            <div class="teacher-position">${teacher.position}</div>
                            <span class="department-badge">${teacher.department}</span>
                        </div>
                        <div class="mt-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted">Experience:</small>
                                <span class="experience-badge">${teacher.experience} years</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted">Qualification:</small>
                                <small>${teacher.qualification}</small>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">Rating:</small>
                                <div>
                                    ${generateStars(teacher.rating)}
                                    <small class="ms-1">${teacher.rating}</small>
                                </div>
                            </div>
                        </div>
                        <div class="teacher-info">
                            <span class="status-badge status-${teacher.status}">
                                ${teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                            </span>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="viewTeacherDetails('${teacher.id}')">
                                        <i class="fas fa-eye me-2"></i>View Details
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="editTeacher('${teacher.id}')">
                                        <i class="fas fa-edit me-2"></i>Edit
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="viewSchedule('${teacher.id}')">
                                        <i class="fas fa-calendar me-2"></i>Schedule
                                    </a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item text-danger" href="#" onclick="deleteTeacher('${teacher.id}')">
                                        <i class="fas fa-trash me-2"></i>Delete
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
}

function renderListView() {
    const tbody = document.getElementById('teachersTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTeachers = filteredTeachers.slice(startIndex, endIndex);

    tbody.innerHTML = pageTeachers.map(teacher => `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="teacher-avatar me-3" style="width: 40px; height: 40px; font-size: 1rem;">
                                ${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}
                            </div>
                            <div>
                                <div class="fw-bold">${teacher.firstName} ${teacher.lastName}</div>
                                <small class="text-muted">${teacher.email}</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-light text-dark">${teacher.id}</span>
                    </td>
                    <td>
                        <span class="department-badge">${teacher.department}</span>
                        <br><small class="text-muted">${teacher.position}</small>
                    </td>
                    <td>
                        <span class="status-badge status-${teacher.status}">
                            ${teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                        </span>
                    </td>
                    <td>
                        <span class="experience-badge">${teacher.experience} years</span>
                    </td>
                    <td>
                        <div>
                            ${generateStars(teacher.rating)}
                            <small class="ms-1">${teacher.rating}</small>
                        </div>
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" onclick="viewTeacherDetails('${teacher.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-success" onclick="editTeacher('${teacher.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-info" onclick="viewSchedule('${teacher.id}')" title="Schedule">
                                <i class="fas fa-calendar"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="deleteTeacher('${teacher.id}')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }

    return stars;
}

function renderPagination() {
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
                </li>
            `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage || i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                        <li class="page-item ${i === currentPage ? 'active' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                        </li>
                    `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }

    // Next button
    paginationHTML += `
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
                </li>
            `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTeachers();
    }
}

function toggleView(view) {
    currentView = view;

    document.getElementById('gridView').classList.toggle('active', view === 'grid');
    document.getElementById('listView').classList.toggle('active', view === 'list');

    document.getElementById('gridViewContainer').style.display = view === 'grid' ? 'block' : 'none';
    document.getElementById('listViewContainer').style.display = view === 'list' ? 'block' : 'none';

    renderTeachers();
}

function updateTeacherCount() {
    document.getElementById('teacherCount').textContent = filteredTeachers.length;
}

function clearFilters() {
    document.getElementById('searchTeacher').value = '';
    document.getElementById('departmentFilter').value = '';
    document.getElementById('statusFilter').value = '';

    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('active');

    filterTeachers();
}

function refreshData() {
    // Simulate data refresh
    const btn = event.target;
    const icon = btn.querySelector('i');

    icon.classList.add('fa-spin');
    btn.disabled = true;

    setTimeout(() => {
        icon.classList.remove('fa-spin');
        btn.disabled = false;
        renderTeachers();
        showNotification('Data refreshed successfully!', 'success');
    }, 1000);
}

function saveTeacher() {
    const form = document.getElementById('addTeacherForm');
    const formData = new FormData(form);

    // Basic validation
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Simulate saving
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTeacherModal'));
    modal.hide();

    showNotification('Teacher added successfully!', 'success');

    // Reset form
    form.reset();
}

function viewTeacherDetails(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    const detailsContent = document.getElementById('teacherDetailsContent');
    detailsContent.innerHTML = `
                <div class="row">
                    <div class="col-md-4 text-center mb-4">
                        <div class="teacher-avatar mx-auto mb-3" style="width: 120px; height: 120px; font-size: 3rem;">
                            ${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}
                        </div>
                        <h4>${teacher.firstName} ${teacher.lastName}</h4>
                        <p class="text-muted">${teacher.position}</p>
                        <span class="status-badge status-${teacher.status}">
                            ${teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                        </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <strong>Employee ID:</strong><br>
                                <span class="badge bg-light text-dark">${teacher.id}</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Department:</strong><br>
                                <span class="department-badge">${teacher.department}</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Email:</strong><br>
                                ${teacher.email}
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Phone:</strong><br>
                                ${teacher.phone}
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Experience:</strong><br>
                                <span class="experience-badge">${teacher.experience} years</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Rating:</strong><br>
                                ${generateStars(teacher.rating)} ${teacher.rating}
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Qualification:</strong><br>
                                ${teacher.qualification}
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Employment Type:</strong><br>
                                ${teacher.employmentType.charAt(0).toUpperCase() + teacher.employmentType.slice(1)}
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Joining Date:</strong><br>
                                ${new Date(teacher.joiningDate).toLocaleDateString()}
                            </div>
                            <div class="col-md-6 mb-3">
                                <strong>Monthly Salary:</strong><br>
                                ${teacher.salary.toLocaleString()}
                            </div>
                            <div class="col-12 mb-3">
                                <strong>Specializations:</strong><br>
                                ${teacher.specializations.split(',').map(spec =>
        `<span class="qualification-tag">${spec.trim()}</span>`
    ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12">
                        <h6><i class="fas fa-chart-line me-2"></i>Performance Overview</h6>
                        <div class="row">
                            <div class="col-md-3 text-center">
                                <div class="stat-box primary">
                                    <h4>25</h4>
                                    <small>Classes Taught</small>
                                </div>
                            </div>
                            <div class="col-md-3 text-center">
                                <div class="stat-box success">
                                    <h4>450</h4>
                                    <small>Students Taught</small>
                                </div>
                            </div>
                            <div class="col-md-3 text-center">
                                <div class="stat-box warning">
                                    <h4>95%</h4>
                                    <small>Attendance Rate</small>
                                </div>
                            </div>
                            <div class="col-md-3 text-center">
                                <div class="stat-box danger">
                                    <h4>4.8</h4>
                                    <small>Avg. Rating</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    const modal = new bootstrap.Modal(document.getElementById('teacherDetailsModal'));
    modal.show();
}

function editTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    // Populate form with teacher data
    document.getElementById('firstName').value = teacher.firstName;
    document.getElementById('lastName').value = teacher.lastName;
    document.getElementById('email').value = teacher.email;
    document.getElementById('phone').value = teacher.phone;
    document.getElementById('department').value = teacher.department.toLowerCase().replace(/\s+/g, '-');
    document.getElementById('position').value = teacher.position.toLowerCase().replace(/\s+/g, '-');
    document.getElementById('qualification').value = teacher.qualification;
    document.getElementById('experience').value = teacher.experience;
    document.getElementById('salary').value = teacher.salary;
    document.getElementById('employmentType').value = teacher.employmentType;
    document.getElementById('joiningDate').value = teacher.joiningDate;
    document.getElementById('specializations').value = teacher.specializations;

    // Change modal title
    document.querySelector('#addTeacherModal .modal-title').innerHTML =
        '<i class="fas fa-user-edit me-2"></i>Edit Teacher';

    const modal = new bootstrap.Modal(document.getElementById('addTeacherModal'));
    modal.show();
}

function viewSchedule(teacherId) {
    showNotification('Schedule view feature coming soon!', 'info');
}

function deleteTeacher(teacherId) {
    if (confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
        const index = teachers.findIndex(t => t.id === teacherId);
        if (index > -1) {
            teachers.splice(index, 1);
            filterTeachers();
            showNotification('Teacher deleted successfully!', 'success');
        }
    }
}

function exportData(format) {
    showNotification(`Exporting data to ${format.toUpperCase()}...`, 'info');
    // Simulate export
    setTimeout(() => {
        showNotification(`Data exported to ${format.toUpperCase()} successfully!`, 'success');
    }, 1500);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Reset modal title when closed
document.getElementById('addTeacherModal').addEventListener('hidden.bs.modal', function () {
    document.querySelector('#addTeacherModal .modal-title').innerHTML =
        '<i class="fas fa-user-plus me-2"></i>Add New Teacher';
    document.getElementById('addTeacherForm').reset();
});
