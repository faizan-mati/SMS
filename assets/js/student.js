
// Complete student data array
const studentsData = [
    {
        id: 'STU001',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@email.com',
        phone: '+1-555-0101',
        dateOfBirth: '2010-05-15',
        gender: 'female',
        grade: '6',
        address: '123 Oak Street, Springfield, IL 62701',
        parentName: 'Robert Johnson',
        parentPhone: '+1-555-0102',
        parentEmail: 'robert.johnson@email.com',
        status: 'active',
        gpa: 3.8,
        attendance: 95,
        enrollmentDate: '2023-09-01',
       avatar: './assets/image/std.jpg',  
        subjects: [
            { name: 'Mathematics', grade: 'A', percentage: 92 },
            { name: 'Science', grade: 'A-', percentage: 88 },
            { name: 'English', grade: 'B+', percentage: 85 },
            { name: 'History', grade: 'A', percentage: 90 },
            { name: 'Art', grade: 'B', percentage: 82 }
        ]
    },
    {
        id: 'STU002',
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@email.com',
        phone: '+1-555-0201',
        dateOfBirth: '2009-08-22',
        gender: 'male',
        grade: '5',
        address: '456 Pine Avenue, Springfield, IL 62702',
        parentName: 'Mary Smith',
        parentPhone: '+1-555-0202',
        parentEmail: 'mary.smith@email.com',
        status: 'active',
        gpa: 3.5,
        attendance: 88,
        enrollmentDate: '2023-09-05',
       avatar: './assets/image/std.jpg',  
        subjects: [
            { name: 'Mathematics', grade: 'B+', percentage: 87 },
            { name: 'Science', grade: 'B', percentage: 84 },
            { name: 'English', grade: 'A-', percentage: 89 },
            { name: 'History', grade: 'B', percentage: 83 },
            { name: 'Art', grade: 'A', percentage: 91 }
        ]
    },
    {
        id: 'STU003',
        firstName: 'Carol',
        lastName: 'Davis',
        email: 'carol.davis@email.com',
        phone: '+1-555-0301',
        dateOfBirth: '2011-03-10',
        gender: 'female',
        grade: '4',
        address: '789 Elm Street, Springfield, IL 62703',
        parentName: 'James Davis',
        parentPhone: '+1-555-0302',
        parentEmail: 'james.davis@email.com',
        status: 'active',
        gpa: 3.9,
        attendance: 97,
        enrollmentDate: '2023-08-28',
       avatar: './assets/image/std.jpg',  
        subjects: [
            { name: 'Mathematics', grade: 'A', percentage: 94 },
            { name: 'Science', grade: 'A', percentage: 93 },
            { name: 'English', grade: 'A-', percentage: 89 },
            { name: 'History', grade: 'A+', percentage: 96 },
            { name: 'Art', grade: 'B+', percentage: 86 }
        ]
    },
    {
        id: 'STU004',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@email.com',
        phone: '+1-555-0401',
        dateOfBirth: '2008-11-18',
        gender: 'male',
        grade: '3',
        address: '321 Maple Drive, Springfield, IL 62704',
        parentName: 'Linda Wilson',
        parentPhone: '+1-555-0402',
        parentEmail: 'linda.wilson@email.com',
        status: 'pending',
        gpa: 3.2,
        attendance: 78,
        enrollmentDate: '2023-09-15',
       avatar: './assets/image/std.jpg',  
        subjects: [
            { name: 'Mathematics', grade: 'B-', percentage: 79 },
            { name: 'Science', grade: 'C+', percentage: 76 },
            { name: 'English', grade: 'B', percentage: 82 },
            { name: 'History', grade: 'C', percentage: 74 },
            { name: 'Art', grade: 'B+', percentage: 85 }
        ]
    },
    {
        id: 'STU005',
        firstName: 'Emma',
        lastName: 'Brown',
        email: 'emma.brown@email.com',
        phone: '+1-555-0501',
        dateOfBirth: '2012-01-25',
        gender: 'female',
        grade: '2',
        address: '654 Cedar Lane, Springfield, IL 62705',
        parentName: 'Michael Brown',
        parentPhone: '+1-555-0502',
        parentEmail: 'michael.brown@email.com',
        status: 'active',
        gpa: 3.7,
        attendance: 92,
        enrollmentDate: '2023-09-01',
       avatar: './assets/image/std.jpg',  
        subjects: [
            { name: 'Mathematics', grade: 'A-', percentage: 88 },
            { name: 'Science', grade: 'B+', percentage: 86 },
            { name: 'English', grade: 'A', percentage: 91 },
            { name: 'History', grade: 'B+', percentage: 87 },
            { name: 'Art', grade: 'A', percentage: 92 }
        ]
    },
    {
        id: 'STU006',
        firstName: 'Frank',
        lastName: 'Miller',
        email: 'frank.miller@email.com',
        phone: '+1-555-0601',
        dateOfBirth: '2013-07-08',
        gender: 'male',
        grade: '1',
        address: '987 Birch Road, Springfield, IL 62706',
        parentName: 'Susan Miller',
        parentPhone: '+1-555-0602',
        parentEmail: 'susan.miller@email.com',
        status: 'inactive',
        gpa: 2.8,
        attendance: 65,
        enrollmentDate: '2023-08-20',
       avatar: './assets/image/std.jpg',  
        subjects: [
            { name: 'Mathematics', grade: 'C', percentage: 72 },
            { name: 'Science', grade: 'C-', percentage: 68 },
            { name: 'English', grade: 'B-', percentage: 79 },
            { name: 'History', grade: 'C', percentage: 73 },
            { name: 'Art', grade: 'B', percentage: 81 }
        ]
    }
];

// Global variables
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 12;
let filteredStudents = [...studentsData];
let currentFilter = 'all';

// Initialize application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateStatistics();
    renderStudents();
    setupSidebar();
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchStudent').addEventListener('input', handleSearch);

    // Filter functionality
    document.getElementById('gradeFilter').addEventListener('change', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);

    // Filter chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function () {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            applyFilterChips();
        });
    });

    // Form submission
    document.getElementById('addStudentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveStudent();
    });

    // Sidebar toggle for mobile
    const toggleBtn = document.getElementById('toggleBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
}

function setupSidebar() {
    // Handle responsive sidebar
    function handleResize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleBtn = document.getElementById('toggleBtn');

        if (window.innerWidth >= 768) {
            sidebar.classList.add('active');
            mainContent.classList.add('shifted');
            if (toggleBtn) toggleBtn.classList.add('shifted');
        } else {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
            if (toggleBtn) toggleBtn.classList.remove('shifted');
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');

    sidebar.classList.toggle('active');

    if (window.innerWidth >= 768) {
        mainContent.classList.toggle('shifted');
        toggleBtn.classList.toggle('shifted');
    }
}

function updateStatistics() {
    const totalStudents = studentsData.length;
    const activeStudents = studentsData.filter(s => s.status === 'active').length;
    const pendingStudents = studentsData.filter(s => s.status === 'pending').length;
    const inactiveStudents = studentsData.filter(s => s.status === 'inactive').length;

    // Update the statistics in the DOM if elements exist
    const stats = document.querySelectorAll('.stat-box h3');
    if (stats.length >= 4) {
        stats[0].textContent = totalStudents.toLocaleString();
        stats[1].textContent = activeStudents.toLocaleString();
        stats[2].textContent = pendingStudents.toLocaleString();
        stats[3].textContent = inactiveStudents.toLocaleString();
    }

    // Update student count badge
    const countBadge = document.getElementById('studentCount');
    if (countBadge) {
        countBadge.textContent = filteredStudents.length.toLocaleString();
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredStudents = [...studentsData];
    } else {
        filteredStudents = studentsData.filter(student =>
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm) ||
            student.id.toLowerCase().includes(searchTerm) ||
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    renderStudents();
    updateStatistics();
}

function applyFilters() {
    const gradeFilter = document.getElementById('gradeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase().trim();

    filteredStudents = studentsData.filter(student => {
        const matchesSearch = searchTerm === '' ||
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm) ||
            student.id.toLowerCase().includes(searchTerm) ||
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm);

        const matchesGrade = gradeFilter === '' || student.grade === gradeFilter;
        const matchesStatus = statusFilter === '' || student.status === statusFilter;

        return matchesSearch && matchesGrade && matchesStatus;
    });

    currentPage = 1;
    renderStudents();
    updateStatistics();
}

function applyFilterChips() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    switch (currentFilter) {
        case 'all':
            filteredStudents = [...studentsData];
            break;
        case 'recent':
            filteredStudents = studentsData.filter(student => {
                const enrollmentDate = new Date(student.enrollmentDate);
                const daysDiff = (currentDate - enrollmentDate) / (1000 * 60 * 60 * 24);
                return daysDiff <= 30;
            });
            break;
        case 'birthday':
            filteredStudents = studentsData.filter(student => {
                const birthDate = new Date(student.dateOfBirth);
                return birthDate.getMonth() === currentMonth;
            });
            break;
        case 'outstanding':
            // Simulate outstanding fees filter
            filteredStudents = studentsData.filter(student =>
                Math.random() > 0.7 // Random simulation
            );
            break;
        case 'excellent':
            filteredStudents = studentsData.filter(student => student.gpa >= 3.5);
            break;
        default:
            filteredStudents = [...studentsData];
    }

    currentPage = 1;
    renderStudents();
    updateStatistics();
}

function clearFilters() {
    document.getElementById('gradeFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('searchStudent').value = '';

    // Reset active chip
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('active');
    currentFilter = 'all';

    filteredStudents = [...studentsData];
    currentPage = 1;
    renderStudents();
    updateStatistics();
}

function toggleView(view) {
    currentView = view;

    // Update button states
    document.getElementById('gridView').classList.toggle('active', view === 'grid');
    document.getElementById('listView').classList.toggle('active', view === 'list');

    // Show/hide containers
    document.getElementById('gridViewContainer').style.display = view === 'grid' ? 'block' : 'none';
    document.getElementById('listViewContainer').style.display = view === 'list' ? 'block' : 'none';

    renderStudents();
}

function renderStudents() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const studentsToShow = filteredStudents.slice(startIndex, endIndex);

    if (currentView === 'grid') {
        renderGridView(studentsToShow);
    } else {
        renderListView(studentsToShow);
    }

    renderPagination();
}

function renderGridView(students) {
    const container = document.getElementById('studentsGrid');

    if (students.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-user-slash fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No students found</h5>
                <p class="text-muted">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = students.map(student => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card student-card h-100" onclick="viewStudentDetails('${student.id}')">
                <div class="card-body position-relative">
                    <div class="student-status">
                        <span class="badge bg-${getStatusColor(student.status)}">${student.status}</span>
                    </div>
                    <div class="text-center mb-3">
                        <img src="${student.avatar}" alt="${student.firstName}" class="student-avatar">
                        <h6 class="mt-2 mb-1">${student.firstName} ${student.lastName}</h6>
                        <small class="text-muted">${student.id}</small>
                    </div>
                    <div class="student-info">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">Grade:</small>
                            <span class="badge bg-primary">Grade ${student.grade}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">GPA:</small>
                            <span class="fw-bold text-${getGPAColor(student.gpa)}">${student.gpa}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <small class="text-muted">Attendance:</small>
                            <span class="fw-bold text-${getAttendanceColor(student.attendance)}">${student.attendance}%</span>
                        </div>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-primary btn-action flex-fill" onclick="editStudent('${student.id}'); event.stopPropagation();">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-info btn-action flex-fill" onclick="viewStudentDetails('${student.id}'); event.stopPropagation();">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger btn-action flex-fill" onclick="deleteStudent('${student.id}'); event.stopPropagation();">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderListView(students) {
    const tbody = document.getElementById('studentsTable');

    if (students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="fas fa-user-slash fa-2x text-muted mb-3"></i>
                    <div>
                        <h6 class="text-muted">No students found</h6>
                        <small class="text-muted">Try adjusting your search or filters</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr onclick="viewStudentDetails('${student.id}')" style="cursor: pointer;">
            <td>
                <div class="d-flex align-items-center">
                    <img src="${student.avatar}" alt="${student.firstName}" class="student-avatar me-3" style="width: 40px; height: 40px;">
                    <div>
                        <div class="fw-bold">${student.firstName} ${student.lastName}</div>
                        <small class="text-muted">${student.email}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-secondary">${student.id}</span></td>
            <td><span class="badge bg-primary">Grade ${student.grade}</span></td>
            <td><span class="badge bg-${getStatusColor(student.status)}">${student.status}</span></td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="attendance-indicator attendance-${getAttendanceStatus(student.attendance)}"></span>
                    <span class="text-${getAttendanceColor(student.attendance)}">${student.attendance}%</span>
                </div>
            </td>
            <td>
                <span class="grade-badge bg-${getGPAColor(student.gpa)} text-white">${student.gpa}</span>
            </td>
            <td>
                <div class="d-flex gap-1">
                    <button class="btn btn-sm btn-outline-primary" onclick="editStudent('${student.id}'); event.stopPropagation();" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info" onclick="viewStudentDetails('${student.id}'); event.stopPropagation();" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent('${student.id}'); event.stopPropagation();" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">
                    <i class="fas fa-chevron-left"></i>
                </a>
            </li>
        `;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
        } else if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `;
    }

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    renderStudents();

    // Scroll to top of student list
    document.querySelector('.content-card').scrollIntoView({ behavior: 'smooth' });
}

function saveStudent() {
    const form = document.getElementById('addStudentForm');
    const formData = new FormData(form);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'grade', 'parentName', 'parentPhone'];
    let isValid = true;

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.classList.add('is-invalid');
            isValid = false;
        } else {
            element.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // Generate new student ID
    const maxId = Math.max(...studentsData.map(s => parseInt(s.id.replace('STU', ''))));
    const newId = `STU${String(maxId + 1).padStart(3, '0')}`;

    // Create new student object
    const newStudent = {
        id: newId,
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        grade: document.getElementById('grade').value,
        address: document.getElementById('address').value.trim(),
        parentName: document.getElementById('parentName').value.trim(),
        parentPhone: document.getElementById('parentPhone').value.trim(),
        parentEmail: document.getElementById('parentEmail').value.trim(),
        status: 'active',
        gpa: 0.0,
        attendance: 0,
        enrollmentDate: new Date().toISOString().split('T')[0],
        avatar: `https://via.placeholder.com/60x60/3498db/ffffff?text=${document.getElementById('firstName').value.charAt(0)}${document.getElementById('lastName').value.charAt(0)}`,
        subjects: []
    };

    // Add to students array
    studentsData.push(newStudent);

    // Reset form and close modal
    form.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    modal.hide();

    // Refresh the display
    filteredStudents = [...studentsData];
    currentPage = 1;
    renderStudents();
    updateStatistics();

    // Show success message
    showNotification('Student added successfully!', 'success');
}

function editStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    // Populate form with existing data
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone || '';
    document.getElementById('dateOfBirth').value = student.dateOfBirth;
    document.getElementById('gender').value = student.gender;
    document.getElementById('grade').value = student.grade;
    document.getElementById('address').value = student.address || '';
    document.getElementById('parentName').value = student.parentName;
    document.getElementById('parentPhone').value = student.parentPhone;
    document.getElementById('parentEmail').value = student.parentEmail || '';

    // Change modal title and button
    document.querySelector('#addStudentModal .modal-title').innerHTML = '<i class="fas fa-user-edit me-2"></i>Edit Student';
    document.querySelector('#addStudentModal .btn-primary').innerHTML = '<i class="fas fa-save me-1"></i>Update Student';
    document.querySelector('#addStudentModal .btn-primary').setAttribute('onclick', `updateStudent('${studentId}')`);

    // Show modal
    new bootstrap.Modal(document.getElementById('addStudentModal')).show();
}

function updateStudent(studentId) {
    const studentIndex = studentsData.findIndex(s => s.id === studentId);
    if (studentIndex === -1) return;

    const form = document.getElementById('addStudentForm');

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'grade', 'parentName', 'parentPhone'];
    let isValid = true;

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.classList.add('is-invalid');
            isValid = false;
        } else {
            element.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // Update student object
    studentsData[studentIndex] = {
        ...studentsData[studentIndex],
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        grade: document.getElementById('grade').value,
        address: document.getElementById('address').value.trim(),
        parentName: document.getElementById('parentName').value.trim(),
        parentPhone: document.getElementById('parentPhone').value.trim(),
        parentEmail: document.getElementById('parentEmail').value.trim()
    };

    // Reset form and close modal
    form.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    modal.hide();

    // Reset modal to add mode
    document.querySelector('#addStudentModal .modal-title').innerHTML = '<i class="fas fa-user-plus me-2"></i>Add New Student';
    document.querySelector('#addStudentModal .btn-primary').innerHTML = '<i class="fas fa-save me-1"></i>Save Student';
    document.querySelector('#addStudentModal .btn-primary').setAttribute('onclick', 'saveStudent()');

    // Refresh the display
    applyFilters();
    showNotification('Student updated successfully!', 'success');
}

function deleteStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
        const index = studentsData.findIndex(s => s.id === studentId);
        studentsData.splice(index, 1);

        // Refresh the display
        applyFilters();
        showNotification('Student deleted successfully!', 'success');
    }
}

function viewStudentDetails(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    const detailsContent = document.getElementById('studentDetailsContent');

    detailsContent.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="text-center mb-4">
                    <img src="${student.avatar}" alt="${student.firstName}" class="rounded-circle mb-3" style="width: 120px; height: 120px; object-fit: cover;">
                    <h4>${student.firstName} ${student.lastName}</h4>
                    <p class="text-muted">${student.id}</p>
                    <span class="badge bg-${getStatusColor(student.status)} fs-6">${student.status.toUpperCase()}</span>
                </div>
                
                <div class="parent-info">
                    <h6><i class="fas fa-users me-2"></i>Parent/Guardian Information</h6>
                    <div class="row">
                        <div class="col-12 mb-2">
                            <strong>Name:</strong> ${student.parentName}
                        </div>
                        <div class="col-12 mb-2">
                            <strong>Phone:</strong> ${student.parentPhone}
                        </div>
                        <div class="col-12 mb-2">
                            <strong>Email:</strong> ${student.parentEmail || 'Not provided'}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-8">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab">
                            <i class="fas fa-info-circle me-1"></i>Personal Info
                        </button>
                        <button class="nav-link" id="nav-academic-tab" data-bs-toggle="tab" data-bs-target="#nav-academic" type="button" role="tab">
                            <i class="fas fa-graduation-cap me-1"></i>Academic
                        </button>
                        <button class="nav-link" id="nav-attendance-tab" data-bs-toggle="tab" data-bs-target="#nav-attendance" type="button" role="tab">
                            <i class="fas fa-calendar-check me-1"></i>Attendance
                        </button>
                    </div>
                </nav>
                
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-info" role="tabpanel">
                        <div class="row mt-3">
                            <div class="col-md-6 mb-3">
                                <label class="fw-bold text-muted">Email:</label>
                                <p>${student.email}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="fw-bold text-muted">Phone:</label>
                                <p>${student.phone || 'Not provided'}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="fw-bold text-muted">Date of Birth:</label>
                                <p>${formatDate(student.dateOfBirth)}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="fw-bold text-muted">Gender:</label>
                                <p>${student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="fw-bold text-muted">Grade:</label>
                                <p><span class="badge bg-primary">Grade ${student.grade}</span></p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="fw-bold text-muted">Enrollment Date:</label>
                                <p>${formatDate(student.enrollmentDate)}</p>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="fw-bold text-muted">Address:</label>
                                <p>${student.address || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane fade" id="nav-academic" role="tabpanel">
                        <div class="academic-progress">
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="text-center">
                                        <h3 class="text-${getGPAColor(student.gpa)}">${student.gpa}</h3>
                                        <p class="text-muted">Current GPA</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="text-center">
                                        <div class="progress-ring">
                                            <svg class="progress-ring" width="60" height="60">
                                                <circle cx="30" cy="30" r="25" stroke="#e9ecef" stroke-width="4" fill="transparent"/>
                                                <circle cx="30" cy="30" r="25" stroke="${getGPAColorHex(student.gpa)}" stroke-width="4" fill="transparent"
                                                    stroke-dasharray="${2 * Math.PI * 25}" stroke-dashoffset="${2 * Math.PI * 25 * (1 - student.gpa / 4)}"/>
                                            </svg>
                                        </div>
                                        <p class="text-muted mt-2">Performance</p>
                                    </div>
                                </div>
                            </div>
                            
                            ${student.subjects && student.subjects.length > 0 ? `
                                <h6 class="mb-3">Subject Performance</h6>
                                ${student.subjects.map(subject => `
                                    <div class="subject-progress">
                                        <div class="d-flex justify-content-between mb-1">
                                            <span class="fw-bold">${subject.name}</span>
                                            <span class="badge bg-${getGradeColor(subject.grade)}">${subject.grade} (${subject.percentage}%)</span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar bg-${getGradeColor(subject.grade)}" 
                                                 style="width: ${subject.percentage}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            ` : '<p class="text-muted">No subject data available</p>'}
                        </div>
                    </div>
                    
                    <div class="tab-pane fade" id="nav-attendance" role="tabpanel">
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <div class="text-center">
                                    <h3 class="text-${getAttendanceColor(student.attendance)}">${student.attendance}%</h3>
                                    <p class="text-muted">Overall Attendance</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="text-center">
                                    <div class="progress" style="height: 20px;">
                                        <div class="progress-bar bg-${getAttendanceColor(student.attendance)}" 
                                             style="width: ${student.attendance}%">
                                            ${student.attendance}%
                                        </div>
                                    </div>
                                    <p class="text-muted mt-2">Attendance Rate</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <h6>Attendance Summary</h6>
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <div class="p-3 bg-success bg-opacity-10 rounded">
                                        <i class="fas fa-check-circle text-success fa-2x mb-2"></i>
                                        <h5 class="text-success">${Math.round(student.attendance * 1.8)}</h5>
                                        <small class="text-muted">Days Present</small>
                                    </div>
                                </div>
                                <div class="col-md-4 text-center">
                                    <div class="p-3 bg-danger bg-opacity-10 rounded">
                                        <i class="fas fa-times-circle text-danger fa-2x mb-2"></i>
                                        <h5 class="text-danger">${Math.round((100 - student.attendance) * 1.8)}</h5>
                                        <small class="text-muted">Days Absent</small>
                                    </div>
                                </div>
                                <div class="col-md-4 text-center">
                                    <div class="p-3 bg-warning bg-opacity-10 rounded">
                                        <i class="fas fa-clock text-warning fa-2x mb-2"></i>
                                        <h5 class="text-warning">${Math.round(Math.random() * 5)}</h5>
                                        <small class="text-muted">Late Arrivals</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Show modal
    new bootstrap.Modal(document.getElementById('studentDetailsModal')).show();
}

function exportData(format) {
    if (format === 'excel') {
        exportToExcel();
    } else if (format === 'pdf') {
        exportToPDF();
    }
}

function exportToExcel() {
    const data = filteredStudents.map(student => ({
        'Student ID': student.id,
        'First Name': student.firstName,
        'Last Name': student.lastName,
        'Email': student.email,
        'Phone': student.phone || '',
        'Date of Birth': student.dateOfBirth,
        'Gender': student.gender,
        'Grade': student.grade,
        'Status': student.status,
        'GPA': student.gpa,
        'Attendance': student.attendance + '%',
        'Parent Name': student.parentName,
        'Parent Phone': student.parentPhone,
        'Parent Email': student.parentEmail || '',
        'Address': student.address || '',
        'Enrollment Date': student.enrollmentDate
    }));

    // Create CSV content
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    showNotification('Excel export completed!', 'success');
}

function exportToPDF() {
    // Simple text-based PDF export simulation
    const content = filteredStudents.map(student =>
        `${student.id} - ${student.firstName} ${student.lastName} - Grade ${student.grade} - ${student.status}`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    showNotification('PDF export completed!', 'success');
}

function refreshData() {
    // Simulate data refresh
    showNotification('Data refreshed successfully!', 'info');

    // Add loading animation
    const refreshBtn = document.querySelector('.btn-outline-primary');
    const originalText = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Refreshing...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        renderStudents();
        updateStatistics();
    }, 1000);
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

// Helper functions
function getStatusColor(status) {
    switch (status) {
        case 'active': return 'success';
        case 'inactive': return 'danger';
        case 'pending': return 'warning';
        default: return 'secondary';
    }
}

function getGPAColor(gpa) {
    if (gpa >= 3.5) return 'success';
    if (gpa >= 3.0) return 'info';
    if (gpa >= 2.5) return 'warning';
    return 'danger';
}

function getGPAColorHex(gpa) {
    if (gpa >= 3.5) return '#27ae60';
    if (gpa >= 3.0) return '#3498db';
    if (gpa >= 2.5) return '#f39c12';
    return '#e74c3c';
}

function getAttendanceColor(attendance) {
    if (attendance >= 90) return 'success';
    if (attendance >= 80) return 'info';
    if (attendance >= 70) return 'warning';
    return 'danger';
}

function getAttendanceStatus(attendance) {
    if (attendance >= 90) return 'present';
    if (attendance >= 70) return 'late';
    return 'absent';
}

function getGradeColor(grade) {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'info';
    if (grade.includes('C')) return 'warning';
    return 'danger';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Additional utility functions
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function generateStudentReport(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    const report = {
        student: student,
        generatedDate: new Date().toISOString(),
        academicPerformance: student.subjects || [],
        attendanceRate: student.attendance,
        overallGPA: student.gpa,
        recommendations: generateRecommendations(student)
    };

    console.log('Student Report Generated:', report);
    return report;
}

function generateRecommendations(student) {
    const recommendations = [];

    if (student.attendance < 80) {
        recommendations.push('Improve attendance rate - consider meeting with parents');
    }

    if (student.gpa < 3.0) {
        recommendations.push('Academic support needed - consider tutoring services');
    }

    if (student.subjects && student.subjects.length > 0) {
        const lowPerformingSubjects = student.subjects.filter(s => s.percentage < 75);
        if (lowPerformingSubjects.length > 0) {
            recommendations.push(`Focus on improving: ${lowPerformingSubjects.map(s => s.name).join(', ')}`);
        }
    }

    if (student.gpa >= 3.5 && student.attendance >= 90) {
        recommendations.push('Excellent performance - consider advanced placement opportunities');
    }

    return recommendations;
}

// Initialize tooltips and popovers if Bootstrap is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchStudent').focus();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                bootstrap.Modal.getInstance(modal)?.hide();
            });
        }
    });
});

// Handle responsive table on mobile
function handleResponsiveTable() {
    const table = document.querySelector('.table-container table');
    if (table && window.innerWidth < 768) {
        table.classList.add('table-responsive');
    }
}

window.addEventListener('resize', handleResponsiveTable);

// Auto-save form data to prevent data loss
let formAutoSaveInterval;

function startAutoSave() {
    formAutoSaveInterval = setInterval(() => {
        const form = document.getElementById('addStudentForm');
        if (form) {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Save to memory (in a real app, this would be localStorage or server)
            window.tempFormData = data;
        }
    }, 30000); // Save every 30 seconds
}

function stopAutoSave() {
    if (formAutoSaveInterval) {
        clearInterval(formAutoSaveInterval);
    }
}

// Start auto-save when modal opens
document.getElementById('addStudentModal').addEventListener('shown.bs.modal', startAutoSave);
document.getElementById('addStudentModal').addEventListener('hidden.bs.modal', stopAutoSave);

// Performance optimization: Virtual scrolling for large datasets
function implementVirtualScrolling() {
    if (filteredStudents.length > 100) {
        itemsPerPage = 20; // Increase items per page for better performance
    } else {
        itemsPerPage = 12; // Default items per page
    }
}
// Call performance optimization
document.addEventListener('DOMContentLoaded', implementVirtualScrolling);

// Advanced Search Functionality
function initializeAdvancedSearch() {
    const searchInput = document.getElementById('searchStudent');
    let searchTimeout;

    // Debounced search for better performance
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performAdvancedSearch(this.value);
        }, 300);
    });
}

function performAdvancedSearch(query) {
    if (!query.trim()) {
        filteredStudents = [...studentsData];
        renderStudents();
        return;
    }

    const searchTerms = query.toLowerCase().split(' ');

    filteredStudents = studentsData.filter(student => {
        const searchableFields = [
            student.firstName.toLowerCase(),
            student.lastName.toLowerCase(),
            student.email.toLowerCase(),
            student.id.toLowerCase(),
            student.parentName.toLowerCase(),
            student.parentPhone,
            student.address?.toLowerCase() || '',
            `${student.firstName} ${student.lastName}`.toLowerCase(),
            `grade ${student.grade}`,
            student.status.toLowerCase()
        ];

        return searchTerms.every(term =>
            searchableFields.some(field => field.includes(term))
        );
    });

    currentPage = 1;
    renderStudents();
    updateSearchResults(query);
}

function updateSearchResults(query) {
    const resultCount = filteredStudents.length;
    const searchResultsElement = document.getElementById('searchResults');

    if (searchResultsElement) {
        if (query.trim()) {
            searchResultsElement.innerHTML = `
                        <div class="alert alert-info alert-sm">
                            <i class="fas fa-search me-2"></i>
                            Found ${resultCount} student${resultCount !== 1 ? 's' : ''} matching "${query}"
                            <button type="button" class="btn btn-sm btn-outline-primary ms-2" onclick="clearSearch()">
                                Clear Search
                            </button>
                        </div>
                    `;
            searchResultsElement.style.display = 'block';
        } else {
            searchResultsElement.style.display = 'none';
        }
    }
}

function clearSearch() {
    document.getElementById('searchStudent').value = '';
    filteredStudents = [...studentsData];
    currentPage = 1;
    renderStudents();
    updateSearchResults('');
}

// Bulk Operations
let selectedStudents = new Set();

function initializeBulkOperations() {
    // Add select all functionality
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', toggleSelectAll);
    }

    // Update bulk action buttons visibility
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('student-checkbox')) {
            updateBulkActionButtons();
        }
    });
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const studentCheckboxes = document.querySelectorAll('.student-checkbox');

    studentCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        if (selectAllCheckbox.checked) {
            selectedStudents.add(checkbox.value);
        } else {
            selectedStudents.delete(checkbox.value);
        }
    });

    updateBulkActionButtons();
}

function updateBulkActionButtons() {
    const bulkActionsContainer = document.getElementById('bulkActions');
    const selectedCount = selectedStudents.size;

    if (bulkActionsContainer) {
        if (selectedCount > 0) {
            bulkActionsContainer.innerHTML = `
                        <div class="alert alert-primary d-flex justify-content-between align-items-center">
                            <span><i class="fas fa-check-circle me-2"></i>${selectedCount} student${selectedCount > 1 ? 's' : ''} selected</span>
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-primary" onclick="bulkExport()">
                                    <i class="fas fa-download me-1"></i>Export
                                </button>
                                <button class="btn btn-outline-info" onclick="bulkStatusUpdate()">
                                    <i class="fas fa-edit me-1"></i>Update Status
                                </button>
                                <button class="btn btn-outline-warning" onclick="bulkSendMessage()">
                                    <i class="fas fa-envelope me-1"></i>Send Message
                                </button>
                                <button class="btn btn-outline-danger" onclick="bulkDelete()">
                                    <i class="fas fa-trash me-1"></i>Delete
                                </button>
                                <button class="btn btn-secondary" onclick="clearSelection()">
                                    <i class="fas fa-times me-1"></i>Clear
                                </button>
                            </div>
                        </div>
                    `;
            bulkActionsContainer.style.display = 'block';
        } else {
            bulkActionsContainer.style.display = 'none';
        }
    }
}

function bulkExport() {
    const selectedStudentData = studentsData.filter(student =>
        selectedStudents.has(student.id)
    );

    const csvContent = generateCSVContent(selectedStudentData);
    downloadCSV(csvContent, `selected_students_${new Date().toISOString().split('T')[0]}.csv`);

    showNotification(`Exported ${selectedStudents.size} students successfully!`, 'success');
}

function bulkStatusUpdate() {
    const modal = createBulkStatusModal();
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
}

function createBulkStatusModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-edit me-2"></i>Update Status for ${selectedStudents.size} Students
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="bulkStatus" class="form-label">New Status:</label>
                                <select class="form-select" id="bulkStatus">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="executeBulkStatusUpdate()">
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            `;
    return modal;
}

function executeBulkStatusUpdate() {
    const newStatus = document.getElementById('bulkStatus').value;
    let updatedCount = 0;

    studentsData.forEach(student => {
        if (selectedStudents.has(student.id)) {
            student.status = newStatus;
            updatedCount++;
        }
    });

    // Close modal and refresh display
    document.querySelector('.modal.show .btn-close').click();
    renderStudents();
    clearSelection();

    showNotification(`Updated status for ${updatedCount} students to ${newStatus}`, 'success');
}

function bulkSendMessage() {
    const modal = createMessageModal();
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
}

function createMessageModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-envelope me-2"></i>Send Message to ${selectedStudents.size} Students
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="messageForm">
                                <div class="mb-3">
                                    <label for="messageType" class="form-label">Message Type:</label>
                                    <select class="form-select" id="messageType" required>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="notification">In-App Notification</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="messageSubject" class="form-label">Subject:</label>
                                    <input type="text" class="form-control" id="messageSubject" required>
                                </div>
                                <div class="mb-3">
                                    <label for="messageContent" class="form-label">Message Content:</label>
                                    <textarea class="form-control" id="messageContent" rows="5" required 
                                              placeholder="Enter your message here..."></textarea>
                                    <div class="form-text">
                                        Available variables: {firstName}, {lastName}, {grade}, {parentName}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sendToParents">
                                        <label class="form-check-label" for="sendToParents">
                                            Also send to parents/guardians
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="sendBulkMessage()">
                                <i class="fas fa-paper-plane me-1"></i>Send Message
                            </button>
                        </div>
                    </div>
                </div>
            `;
    return modal;
}

function sendBulkMessage() {
    const messageType = document.getElementById('messageType').value;
    const subject = document.getElementById('messageSubject').value;
    const content = document.getElementById('messageContent').value;
    const sendToParents = document.getElementById('sendToParents').checked;

    if (!subject || !content) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Simulate sending messages
    let successCount = 0;
    const selectedStudentData = studentsData.filter(student =>
        selectedStudents.has(student.id)
    );

    selectedStudentData.forEach(student => {
        const personalizedContent = content
            .replace('{firstName}', student.firstName)
            .replace('{lastName}', student.lastName)
            .replace('{grade}', student.grade)
            .replace('{parentName}', student.parentName);

        // Simulate message sending (in real app, this would be API calls)
        console.log(`Sending ${messageType} to ${student.email}:`, {
            subject,
            content: personalizedContent,
            sendToParents
        });

        successCount++;
    });

    // Close modal and show success
    document.querySelector('.modal.show .btn-close').click();
    clearSelection();

    showNotification(`${messageType.toUpperCase()} sent to ${successCount} students successfully!`, 'success');
}

function bulkDelete() {
    if (confirm(`Are you sure you want to delete ${selectedStudents.size} students? This action cannot be undone.`)) {
        let deletedCount = 0;

        // Filter out selected students
        const remainingStudents = studentsData.filter(student => {
            if (selectedStudents.has(student.id)) {
                deletedCount++;
                return false;
            }
            return true;
        });

        // Update the main data array
        studentsData.length = 0;
        studentsData.push(...remainingStudents);

        // Refresh display
        filteredStudents = [...studentsData];
        clearSelection();
        renderStudents();
        updateStatistics();

        showNotification(`Deleted ${deletedCount} students successfully!`, 'success');
    }
}

function clearSelection() {
    selectedStudents.clear();
    document.querySelectorAll('.student-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
    }
    updateBulkActionButtons();
}

// Advanced Analytics and Reporting
function generateAnalyticsReport() {
    const analytics = {
        totalStudents: studentsData.length,
        statusBreakdown: getStatusBreakdown(),
        gradeDistribution: getGradeDistribution(),
        performanceMetrics: getPerformanceMetrics(),
        attendanceStats: getAttendanceStats(),
        recentEnrollments: getRecentEnrollments(),
        birthdayReminders: getBirthdayReminders()
    };

    displayAnalytics(analytics);
    return analytics;
}

function getStatusBreakdown() {
    return studentsData.reduce((acc, student) => {
        acc[student.status] = (acc[student.status] || 0) + 1;
        return acc;
    }, {});
}

function getGradeDistribution() {
    return studentsData.reduce((acc, student) => {
        const grade = `Grade ${student.grade}`;
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {});
}

function getPerformanceMetrics() {
    const gpas = studentsData.map(s => s.gpa).filter(gpa => gpa > 0);
    return {
        averageGPA: (gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length).toFixed(2),
        highPerformers: studentsData.filter(s => s.gpa >= 3.5).length,
        atRiskStudents: studentsData.filter(s => s.gpa < 2.5).length
    };
}

function getAttendanceStats() {
    const attendanceRates = studentsData.map(s => s.attendance);
    return {
        averageAttendance: (attendanceRates.reduce((sum, rate) => sum + rate, 0) / attendanceRates.length).toFixed(1),
        excellentAttendance: studentsData.filter(s => s.attendance >= 95).length,
        poorAttendance: studentsData.filter(s => s.attendance < 80).length
    };
}

function getRecentEnrollments() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return studentsData.filter(student =>
        new Date(student.enrollmentDate) >= thirtyDaysAgo
    ).length;
}

function getBirthdayReminders() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const nextMonth = (currentMonth + 1) % 12;

    return studentsData.filter(student => {
        const birthMonth = new Date(student.dateOfBirth).getMonth();
        return birthMonth === currentMonth || birthMonth === nextMonth;
    });
}

function displayAnalytics(analytics) {
    const modal = createAnalyticsModal(analytics);
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
}

function createAnalyticsModal(analytics) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-chart-bar me-2"></i>Analytics Dashboard
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-3 mb-4">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <h3 class="text-primary">${analytics.totalStudents}</h3>
                                            <p class="card-text">Total Students</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-4">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <h3 class="text-success">${analytics.performanceMetrics.averageGPA}</h3>
                                            <p class="card-text">Average GPA</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-4">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <h3 class="text-info">${analytics.attendanceStats.averageAttendance}%</h3>
                                            <p class="card-text">Avg Attendance</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-4">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <h3 class="text-warning">${analytics.recentEnrollments}</h3>
                                            <p class="card-text">New This Month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Status Distribution</h6>
                                    <div class="mb-3">
                                        ${Object.entries(analytics.statusBreakdown).map(([status, count]) => `
                                            <div class="d-flex justify-content-between mb-2">
                                                <span class="badge bg-${getStatusColor(status)} me-2">${status}</span>
                                                <span>${count} students</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <h6>Grade Distribution</h6>
                                    <div class="mb-3">
                                        ${Object.entries(analytics.gradeDistribution).map(([grade, count]) => `
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>${grade}</span>
                                                <span>${count} students</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            ${analytics.birthdayReminders.length > 0 ? `
                                <div class="alert alert-info">
                                    <h6><i class="fas fa-birthday-cake me-2"></i>Upcoming Birthdays</h6>
                                    ${analytics.birthdayReminders.slice(0, 5).map(student => `
                                        <div>${student.firstName} ${student.lastName} - ${formatDate(student.dateOfBirth)}</div>
                                    `).join('')}
                                    ${analytics.birthdayReminders.length > 5 ? `<small>... and ${analytics.birthdayReminders.length - 5} more</small>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" onclick="exportAnalytics()">
                                <i class="fas fa-download me-1"></i>Export Report
                            </button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
    return modal;
}

function exportAnalytics() {
    const analytics = generateAnalyticsReport();
    const reportContent = `
Student Management System - Analytics Report
Generated: ${new Date().toLocaleString()}

OVERVIEW
========
Total Students: ${analytics.totalStudents}
Average GPA: ${analytics.performanceMetrics.averageGPA}
Average Attendance: ${analytics.attendanceStats.averageAttendance}%
Recent Enrollments (30 days): ${analytics.recentEnrollments}

STATUS BREAKDOWN
===============
${Object.entries(analytics.statusBreakdown).map(([status, count]) =>
        `${status.toUpperCase()}: ${count} students`).join('\n')}

GRADE DISTRIBUTION
=================
${Object.entries(analytics.gradeDistribution).map(([grade, count]) =>
            `${grade}: ${count} students`).join('\n')}

PERFORMANCE METRICS
==================
High Performers (GPA ≥ 3.5): ${analytics.performanceMetrics.highPerformers}
At-Risk Students (GPA < 2.5): ${analytics.performanceMetrics.atRiskStudents}

ATTENDANCE STATISTICS
====================
Excellent Attendance (≥95%): ${analytics.attendanceStats.excellentAttendance}
Poor Attendance (<80%): ${analytics.attendanceStats.poorAttendance}

${analytics.birthdayReminders.length > 0 ? `
UPCOMING BIRTHDAYS
=================
${analytics.birthdayReminders.map(student =>
                `${student.firstName} ${student.lastName} - ${formatDate(student.dateOfBirth)}`).join('\n')}
` : ''}
            `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    showNotification('Analytics report exported successfully!', 'success');
}

// Data Import/Export Utilities
function generateCSVContent(students) {
    const headers = [
        'Student ID', 'First Name', 'Last Name', 'Email', 'Phone',
        'Date of Birth', 'Gender', 'Grade', 'Status', 'GPA', 'Attendance',
        'Parent Name', 'Parent Phone', 'Parent Email', 'Address', 'Enrollment Date'
    ];

    const rows = students.map(student => [
        student.id,
        student.firstName,
        student.lastName,
        student.email,
        student.phone || '',
        student.dateOfBirth,
        student.gender,
        student.grade,
        student.status,
        student.gpa,
        student.attendance + '%',
        student.parentName,
        student.parentPhone,
        student.parentEmail || '',
        student.address || '',
        student.enrollmentDate
    ]);

    return [headers, ...rows].map(row =>
        row.map(field => `"${field}"`).join(',')
    ).join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function () {
    initializeAdvancedSearch();
    initializeBulkOperations();

    // Add analytics button to dashboard
    const analyticsBtn = document.createElement('button');
    analyticsBtn.className = 'btn btn-outline-info me-2';
    analyticsBtn.innerHTML = '<i class="fas fa-chart-bar me-1"></i>Analytics';
    analyticsBtn.onclick = generateAnalyticsReport;

    const toolbarActions = document.querySelector('.toolbar-actions');
    if (toolbarActions) {
        toolbarActions.insertBefore(analyticsBtn, toolbarActions.firstChild);
    }
});

// Keyboard shortcuts enhancement
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + A to select all visible students
    if ((e.ctrlKey || e.metaKey) && e.key === 'a' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = true;
            toggleSelectAll();
        }
    }

    // Ctrl/Cmd + D to deselect all
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        clearSelection();
    }

    // Ctrl/Cmd + R to generate report
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        generateAnalyticsReport();
    }
});

// Auto-refresh data every 30 seconds (optional)
function startAutoRefresh() {
    setInterval(() => {
        // In a real application, this would fetch fresh data from the server
        updateStatistics();
        console.log('Data auto-refreshed:', new Date().toLocaleTimeString());
    }, 30000);
}
