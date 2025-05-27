 // Sample data for classes
        let classesData = [
            {
                id: 1,
                name: "Advanced Mathematics",
                subject: "Mathematics",
                grade: 5,
                teacher: { name: "Ms. Sarah Johnson", avatar:'./assets/image/teacher.jpg', },
                room: "Room 201",
                capacity: 25,
                enrolled: 23,
                schedule: { days: ["Monday", "Wednesday", "Friday"], time: "09:00 - 10:30" },
                status: "active",
                description: "Advanced mathematical concepts for Grade 5 students"
            },
            {
                id: 2,
                name: "Creative Writing",
                subject: "English",
                grade: 4,
                teacher: { name: "Mr. David Smith", avatar:'./assets/image/teacher.jpg', },
                room: "Room 102",
                capacity: 20,
                enrolled: 18,
                schedule: { days: ["Tuesday", "Thursday"], time: "10:00 - 11:30" },
                status: "active",
                description: "Develop creative writing skills through various exercises"
            },
            {
                id: 3,
                name: "Science Experiments",
                subject: "Science",
                grade: 6,
                teacher: { name: "Mrs. Emily Brown", avatar:'./assets/image/teacher.jpg', },
                room: "Science Lab 1",
                capacity: 15,
                enrolled: 15,
                schedule: { days: ["Monday", "Wednesday"], time: "14:00 - 15:30" },
                status: "full",
                description: "Hands-on science experiments and laboratory work"
            },
            {
                id: 4,
                name: "World History",
                subject: "History",
                grade: 5,
                teacher: { name: "Mr. Michael Davis", avatar:'./assets/image/teacher.jpg', },
                room: "Room 105",
                capacity: 30,
                enrolled: 22,
                schedule: { days: ["Tuesday", "Thursday", "Friday"], time: "11:00 - 12:00" },
                status: "active",
                description: "Explore world history from ancient civilizations to modern times"
            },
            {
                id: 5,
                name: "Art & Craft",
                subject: "Art",
                grade: 3,
                teacher: { name: "Ms. Lisa Wilson", avatar:'./assets/image/teacher.jpg', },
                room: "Art Studio",
                capacity: 18,
                enrolled: 12,
                schedule: { days: ["Monday", "Friday"], time: "13:00 - 14:30" },
                status: "active",
                description: "Creative art projects and craft activities"
            },
            {
                id: 6,
                name: "Physical Education",
                subject: "PE",
                grade: 2,
                teacher: { name: "Coach Thompson", avatar:'./assets/image/teacher.jpg', },
                room: "Gymnasium",
                capacity: 35,
                enrolled: 28,
                schedule: { days: ["Monday", "Wednesday", "Friday"], time: "15:00 - 16:00" },
                status: "active",
                description: "Physical fitness and sports activities"
            }
        ];

        let currentView = 'grid';
        let currentPage = 1;
        let itemsPerPage = 12;
        let filteredClasses = [...classesData];

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            renderClasses();
            updateClassCount();
        });

        function setupEventListeners() {
            // Sidebar toggle
            const toggleBtn = document.getElementById('toggleBtn');
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');

            if (toggleBtn) {
                toggleBtn.addEventListener('click', function() {
                    sidebar.classList.toggle('active');
                    mainContent.classList.toggle('shifted');
                    toggleBtn.classList.toggle('shifted');
                });
            }

            // Search functionality
            const searchInput = document.getElementById('searchClass');
            if (searchInput) {
                searchInput.addEventListener('input', debounce(filterClasses, 300));
            }

            // Filter functionality
            const gradeFilter = document.getElementById('gradeFilter');
            const subjectFilter = document.getElementById('subjectFilter');
            
            if (gradeFilter) gradeFilter.addEventListener('change', filterClasses);
            if (subjectFilter) subjectFilter.addEventListener('change', filterClasses);

            // Filter chips
            const filterChips = document.querySelectorAll('.chip');
            filterChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    filterChips.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    filterByChip(this.dataset.filter);
                });
            });

            // Schedule day selection
            const scheduleDays = document.querySelectorAll('.schedule-day');
            scheduleDays.forEach(day => {
                day.addEventListener('click', function() {
                    const checkbox = this.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                    this.classList.toggle('selected', checkbox.checked);
                });
            });
        }

        function renderClasses() {
            if (currentView === 'grid') {
                renderGridView();
            } else {
                renderListView();
            }
            renderPagination();
        }

        function renderGridView() {
            const container = document.getElementById('classesGrid');
            if (!container) return;

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const classesToShow = filteredClasses.slice(startIndex, endIndex);

            container.innerHTML = classesToShow.map(classItem => `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card class-card h-100" onclick="showClassDetails(${classItem.id})">
                        <div class="class-header">
                            <div class="class-status">
                                <span class="badge ${getStatusBadgeClass(classItem.status)}">${classItem.status}</span>
                            </div>
                            <div class="class-icon">
                                <i class="${getSubjectIcon(classItem.subject)}"></i>
                            </div>
                            <h5 class="mb-1">${classItem.name}</h5>
                            <p class="mb-0 opacity-75">Grade ${classItem.grade} • ${classItem.subject}</p>
                        </div>
                        <div class="card-body">
                            <div class="teacher-info mb-3">
                                <img src="${classItem.teacher.avatar}" alt="${classItem.teacher.name}" class="teacher-avatar">
                                <div>
                                    <strong>${classItem.teacher.name}</strong>
                                    <small class="text-muted d-block">${classItem.room}</small>
                                </div>
                            </div>
                            <div class="time-slot mb-3">
                                <i class="fas fa-clock me-2"></i>
                                <strong>${classItem.schedule.time}</strong>
                                <div class="text-muted small mt-1">${classItem.schedule.days.join(', ')}</div>
                            </div>
                            <div class="capacity-indicator mb-3">
                                <div class="progress-circle ${getCapacityColor(classItem.enrolled, classItem.capacity)}">
                                    ${Math.round((classItem.enrolled / classItem.capacity) * 100)}%
                                </div>
                                <div>
                                    <strong>${classItem.enrolled}/${classItem.capacity}</strong>
                                    <div class="text-muted small">Students</div>
                                </div>
                            </div>
                            <div class="d-flex gap-1">
                                <button class="btn btn-sm btn-outline-primary btn-action" onclick="event.stopPropagation(); editClass(${classItem.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-info btn-action" onclick="event.stopPropagation(); viewSchedule(${classItem.id})">
                                    <i class="fas fa-calendar"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-success btn-action" onclick="event.stopPropagation(); manageStudents(${classItem.id})">
                                    <i class="fas fa-users"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger btn-action" onclick="event.stopPropagation(); deleteClass(${classItem.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderListView() {
            const container = document.getElementById('classesTable');
            if (!container) return;

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const classesToShow = filteredClasses.slice(startIndex, endIndex);

            container.innerHTML = classesToShow.map(classItem => `
                <tr onclick="showClassDetails(${classItem.id})" style="cursor: pointer;">
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="class-icon me-3" style="width: 40px; height: 40px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                <i class="${getSubjectIcon(classItem.subject)}"></i>
                            </div>
                            <div>
                                <strong>${classItem.name}</strong>
                                <div class="text-muted small">${classItem.subject}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="teacher-info">
                            <img src="${classItem.teacher.avatar}" alt="${classItem.teacher.name}" class="teacher-avatar">
                            <div>
                                <strong>${classItem.teacher.name}</strong>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge bg-info">Grade ${classItem.grade}</span></td>
                    <td>
                        <div class="time-slot">
                            <strong>${classItem.schedule.time}</strong>
                            <div class="text-muted small">${classItem.schedule.days.join(', ')}</div>
                        </div>
                    </td>
                    <td><span class="badge bg-secondary">${classItem.room}</span></td>
                    <td>
                        <div class="capacity-indicator">
                            <div class="progress-circle ${getCapacityColor(classItem.enrolled, classItem.capacity)}">
                                ${Math.round((classItem.enrolled / classItem.capacity) * 100)}%
                            </div>
                            <div>
                                <strong>${classItem.enrolled}/${classItem.capacity}</strong>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge ${getStatusBadgeClass(classItem.status)}">${classItem.status}</span></td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-primary btn-action" onclick="event.stopPropagation(); editClass(${classItem.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-info btn-action" onclick="event.stopPropagation(); viewSchedule(${classItem.id})" title="Schedule">
                                <i class="fas fa-calendar"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-success btn-action" onclick="event.stopPropagation(); manageStudents(${classItem.id})" title="Students">
                                <i class="fas fa-users"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger btn-action" onclick="event.stopPropagation(); deleteClass(${classItem.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function renderPagination() {
            const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
            const paginationContainer = document.getElementById('pagination');
            if (!paginationContainer) return;

            let paginationHTML = '';

            // Previous button
            paginationHTML += `
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
                </li>
            `;

            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                    paginationHTML += `
                        <li class="page-item ${i === currentPage ? 'active' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                        </li>
                    `;
                } else if (i === currentPage - 3 || i === currentPage + 3) {
                    paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
                }
            }

            // Next button
            paginationHTML += `
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
                </li>
            `;

            paginationContainer.innerHTML = paginationHTML;
        }

        function toggleView(view) {
            currentView = view;
            currentPage = 1;

            // Update button states
            document.getElementById('gridView').classList.toggle('active', view === 'grid');
            document.getElementById('listView').classList.toggle('active', view === 'list');

            // Show/hide containers
            document.getElementById('gridViewContainer').style.display = view === 'grid' ? 'block' : 'none';
            document.getElementById('listViewContainer').style.display = view === 'list' ? 'block' : 'none';

            renderClasses();
        }

        function filterClasses() {
            const searchTerm = document.getElementById('searchClass')?.value.toLowerCase() || '';
            const gradeFilter = document.getElementById('gradeFilter')?.value || '';
            const subjectFilter = document.getElementById('subjectFilter')?.value || '';

            filteredClasses = classesData.filter(classItem => {
                const matchesSearch = classItem.name.toLowerCase().includes(searchTerm) ||
                                    classItem.subject.toLowerCase().includes(searchTerm) ||
                                    classItem.teacher.name.toLowerCase().includes(searchTerm);
                const matchesGrade = !gradeFilter || classItem.grade.toString() === gradeFilter;
                const matchesSubject = !subjectFilter || classItem.subject.toLowerCase().includes(subjectFilter);

                return matchesSearch && matchesGrade && matchesSubject;
            });

            currentPage = 1;
            renderClasses();
            updateClassCount();
        }

        function filterByChip(filter) {
            const now = new Date();
            const today = now.toLocaleDateString('en-US', { weekday: 'long' });

            switch (filter) {
                case 'all':
                    filteredClasses = [...classesData];
                    break;
                case 'today':
                    filteredClasses = classesData.filter(c => c.schedule.days.includes(today));
                    break;
                case 'full':
                    filteredClasses = classesData.filter(c => c.enrolled >= c.capacity);
                    break;
                case 'available':
                    filteredClasses = classesData.filter(c => c.enrolled < c.capacity);
                    break;
                case 'upcoming':
                    filteredClasses = classesData.filter(c => c.status === 'active');
                    break;
                default:
                    filteredClasses = [...classesData];
            }

            currentPage = 1;
            renderClasses();
            updateClassCount();
        }

        function clearFilters() {
            document.getElementById('searchClass').value = '';
            document.getElementById('gradeFilter').value = '';
            document.getElementById('subjectFilter').value = '';
            
            // Reset active chip
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            document.querySelector('.chip[data-filter="all"]').classList.add('active');

            filteredClasses = [...classesData];
            currentPage = 1;
            renderClasses();
            updateClassCount();
        }

        function changePage(page) {
            const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderClasses();
            }
        }

        function updateClassCount() {
            const countElement = document.getElementById('classCount');
            if (countElement) {
                countElement.textContent = filteredClasses.length;
            }
        }

        function getSubjectIcon(subject) {
            const icons = {
                'Mathematics': 'fas fa-calculator',
                'English': 'fas fa-book-open',
                'Science': 'fas fa-flask',
                'History': 'fas fa-landmark',
                'Art': 'fas fa-palette',
                'PE': 'fas fa-running'
            };
            return icons[subject] || 'fas fa-book';
        }

        function getStatusBadgeClass(status) {
            const classes = {
                'active': 'bg-success',
                'full': 'bg-warning',
                'inactive': 'bg-secondary',
                'pending': 'bg-info'
            };
            return classes[status] || 'bg-primary';
        }

        function getCapacityColor(enrolled, capacity) {
            const percentage = (enrolled / capacity) * 100;
            if (percentage >= 90) return 'bg-danger';
            if (percentage >= 75) return 'bg-warning';
            if (percentage >= 50) return 'bg-info';
            return 'bg-success';
        }

        function showClassDetails(classId) {
            const classItem = classesData.find(c => c.id === classId);
            if (!classItem) return;

            const modal = new bootstrap.Modal(document.getElementById('classDetailsModal'));
            const content = document.getElementById('classDetailsContent');

            content.innerHTML = `
                <div class="row">
                    <div class="col-md-8">
                        <div class="class-header mb-4" style="border-radius: 15px;">
                            <div class="class-icon">
                                <i class="${getSubjectIcon(classItem.subject)}"></i>
                            </div>
                            <h3 class="mb-2">${classItem.name}</h3>
                            <p class="mb-0 opacity-75">Grade ${classItem.grade} • ${classItem.subject}</p>
                        </div>
                        
                        <ul class="nav nav-tabs" id="classDetailsTabs" role="tablist">
                            <li class="nav-item">
                                <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview">Overview</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" id="students-tab" data-bs-toggle="tab" data-bs-target="#students">Students</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" id="schedule-tab" data-bs-toggle="tab" data-bs-target="#schedule">Schedule</button>
                            </li>
                        </ul>
                        
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="overview">
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <div class="room-info">
                                            <h6><i class="fas fa-door-open me-2"></i>Room Information</h6>
                                            <p><strong>Location:</strong> ${classItem.room}</p>
                                            <p><strong>Capacity:</strong> ${classItem.capacity} students</p>
                                            <p><strong>Currently Enrolled:</strong> ${classItem.enrolled} students</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="room-info">
                                            <h6><i class="fas fa-chalkboard-teacher me-2"></i>Teacher Information</h6>
                                            <div class="teacher-info">
                                                <img src="${classItem.teacher.avatar}" alt="${classItem.teacher.name}" class="teacher-avatar">
                                                <div>
                                                    <strong>${classItem.teacher.name}</strong>
                                                    <div class="text-muted small">${classItem.subject} Teacher</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <h6><i class="fas fa-info-circle me-2"></i>Description</h6>
                                    <p>${classItem.description}</p>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="students">
                                <div class="mt-3">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h6>Enrolled Students (${classItem.enrolled}/${classItem.capacity})</h6>
                                        <button class="btn btn-sm btn-primary">
                                            <i class="fas fa-user-plus me-1"></i>Add Student
                                        </button>
                                    </div>
                                    <div class="list-group">
                                        ${generateStudentList(classItem.enrolled)}
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="schedule">
                                <div class="mt-3">
                                    <h6><i class="fas fa-calendar me-2"></i>Weekly Schedule</h6>
                                    <div class="time-slot">
                                        <strong>Time:</strong> ${classItem.schedule.time}
                                    </div>
                                    <div class="schedule-grid mt-3">
                                        ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => `
                                            <div class="schedule-day ${classItem.schedule.days.includes(day) ? 'selected' : ''}">
                                                ${day}
                                                ${classItem.schedule.days.includes(day) ? '<i class="fas fa-check text-success"></i>' : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">Quick Actions</h6>
                            </div>
                            <div class="card-body">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-outline-primary" onclick="editClass(${classItem.id})">
                                        <i class="fas fa-edit me-2"></i>Edit Class
                                    </button>
                                    <button class="btn btn-outline-info" onclick="manageStudents(${classItem.id})">
                                        <i class="fas fa-users me-2"></i>Manage Students
                                    </button>
                                    <button class="btn btn-outline-success" onclick="exportClassData(${classItem.id})">
                                        <i class="fas fa-download me-2"></i>Export Data
                                    </button>
                                    <button class="btn btn-outline-warning" onclick="duplicateClass(${classItem.id})">
                                        <i class="fas fa-copy me-2"></i>Duplicate Class
                                    </button>
                                    <button class="btn btn-outline-danger" onclick="deleteClass(${classItem.id})">
                                        <i class="fas fa-trash me-2"></i>Delete Class
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card mt-3">
                            <div class="card-header">
                                <h6 class="mb-0">Class Statistics</h6>
                            </div>
                            <div class="card-body">
                                <div class="capacity-indicator mb-3">
                                    <div class="progress-circle ${getCapacityColor(classItem.enrolled, classItem.capacity)}">
                                        ${Math.round((classItem.enrolled / classItem.capacity) * 100)}%
                                    </div>
                                    <div>
                                        <strong>Enrollment Rate</strong>
                                        <div class="text-muted small">${classItem.enrolled} of ${classItem.capacity} seats filled</div>
                                    </div>
                                </div>
                                <hr>
                                <div class="text-center">
                                    <span class="badge ${getStatusBadgeClass(classItem.status)} fs-6">${classItem.status.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            modal.show();
        }

        function generateStudentList(count) {
            const studentNames = [
                'Emma Johnson', 'Liam Smith', 'Olivia Brown', 'Noah Davis', 'Ava Wilson',
                'Elijah Miller', 'Sophia Moore', 'Lucas Taylor', 'Isabella Anderson', 'Mason Thomas'
            ];
            
            return Array.from({length: Math.min(count, 10)}, (_, i) => `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img style="width: 50px; height: auto;" src="./assets/image/std.jpg" class="rounded-circle me-2" alt="Student">
                        <span>${studentNames[i] || `Student ${i + 1}`}</span>
                    </div>
                    <span class="badge bg-success">Active</span>
                </div>
            `).join('');
        }

        function saveClass() {
            const form = document.getElementById('addClassForm');
            const formData = new FormData(form);
            
            // Get selected days
            const selectedDays = Array.from(document.querySelectorAll('input[name="days"]:checked'))
                .map(cb => cb.value);

            if (selectedDays.length === 0) {
                alert('Please select at least one day for the class schedule.');
                return;
            }

            // Create new class object
            const newClass = {
                id: classesData.length + 1,
                name: document.getElementById('className').value,
                subject: document.getElementById('subject').options[document.getElementById('subject').selectedIndex].text,
                grade: parseInt(document.getElementById('grade').value),
                teacher: { 
                    name: document.getElementById('teacher').options[document.getElementById('teacher').selectedIndex].text,
                    avatar:'./assets/imateacherstd.jpg',
                },
                room: document.getElementById('room').options[document.getElementById('room').selectedIndex].text,
                capacity: parseInt(document.getElementById('capacity').value),
                enrolled: 0,
                schedule: { 
                    days: selectedDays.map(day => day.charAt(0).toUpperCase() + day.slice(1)),
                    time: `${document.getElementById('startTime').value} - ${document.getElementById('endTime').value}`
                },
                status: 'active',
                description: document.getElementById('description').value
            };

            // Add to data array
            classesData.push(newClass);
            filteredClasses = [...classesData];

            // Close modal and refresh display
            bootstrap.Modal.getInstance(document.getElementById('addClassModal')).hide();
            form.reset();
            
            // Reset schedule day selections
            document.querySelectorAll('.schedule-day').forEach(day => {
                day.classList.remove('selected');
                day.querySelector('input').checked = false;
            });

            renderClasses();
            updateClassCount();
            
            // Show success message
            showNotification('Class added successfully!', 'success');
        }

        function editClass(classId) {
            const classItem = classesData.find(c => c.id === classId);
            if (!classItem) return;

            // Populate form with existing data
            document.getElementById('className').value = classItem.name;
            document.getElementById('capacity').value = classItem.capacity;
            document.getElementById('description').value = classItem.description;

            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('addClassModal'));
            modal.show();

            showNotification('Edit functionality would be implemented here', 'info');
        }

function deleteClass(classId) {
            if (confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
                const index = classesData.findIndex(c => c.id === classId);
                if (index !== -1) {
                    classesData.splice(index, 1);
                    filteredClasses = [...classesData];
                    renderClasses();
                    updateClassCount();
                    showNotification('Class deleted successfully!', 'success');
                }
            }
        }

        function viewSchedule(classId) {
            const classItem = classesData.find(c => c.id === classId);
            if (!classItem) return;

            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-calendar me-2"></i>Schedule - ${classItem.name}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="schedule-details">
                                <h6><i class="fas fa-clock me-2"></i>Class Time</h6>
                                <p class="fs-5 text-primary">${classItem.schedule.time}</p>
                                
                                <h6><i class="fas fa-calendar-week me-2"></i>Days</h6>
                                <div class="schedule-grid mt-3">
                                    ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => `
                                        <div class="schedule-day ${classItem.schedule.days.includes(day) ? 'selected' : ''}">
                                            ${day}
                                            ${classItem.schedule.days.includes(day) ? '<i class="fas fa-check text-success"></i>' : ''}
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <hr>
                                <div class="row">
                                    <div class="col-6">
                                        <h6><i class="fas fa-door-open me-2"></i>Room</h6>
                                        <p>${classItem.room}</p>
                                    </div>
                                    <div class="col-6">
                                        <h6><i class="fas fa-user-graduate me-2"></i>Grade</h6>
                                        <p>Grade ${classItem.grade}</p>
                                    </div>
                                </div>
                                
                                <div class="teacher-info mt-3">
                                    <h6><i class="fas fa-chalkboard-teacher me-2"></i>Teacher</h6>
                                    <div class="d-flex align-items-center">
                                        <img src="${classItem.teacher.avatar}" alt="${classItem.teacher.name}" class="teacher-avatar me-2">
                                        <span>${classItem.teacher.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="editClass(${classId})">
                                <i class="fas fa-edit me-1"></i>Edit Schedule
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();

            modal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(modal);
            });
        }

        function manageStudents(classId) {
            const classItem = classesData.find(c => c.id === classId);
            if (!classItem) return;

            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-users me-2"></i>Manage Students - ${classItem.name}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row mb-3">
                                <div class="col-md-8">
                                    <div class="search-container">
                                        <i class="fas fa-search search-icon"></i>
                                        <input type="text" class="form-control" placeholder="Search students...">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-primary w-100">
                                        <i class="fas fa-user-plus me-1"></i>Add Student
                                    </button>
                                </div>
                            </div>
                            
                            <div class="capacity-indicator mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>Enrollment Status</span>
                                    <span class="text-primary">${classItem.enrolled}/${classItem.capacity}</span>
                                </div>
                                <div class="progress mt-2">
                                    <div class="progress-bar ${getCapacityColor(classItem.enrolled, classItem.capacity)}" 
                                         style="width: ${(classItem.enrolled / classItem.capacity) * 100}%"></div>
                                </div>
                            </div>
                            
                            <div class="students-list">
                                <h6>Enrolled Students (${classItem.enrolled})</h6>
                                <div class="list-group">
                                    ${generateStudentList(classItem.enrolled)}
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success">
                                <i class="fas fa-download me-1"></i>Export List
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();

            modal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(modal);
            });
        }

        function duplicateClass(classId) {
            const classItem = classesData.find(c => c.id === classId);
            if (!classItem) return;

            const newClass = {
                ...classItem,
                id: classesData.length + 1,
                name: `${classItem.name} (Copy)`,
                enrolled: 0,
                status: 'active'
            };

            classesData.push(newClass);
            filteredClasses = [...classesData];
            renderClasses();
            updateClassCount();
            showNotification('Class duplicated successfully!', 'success');
        }

        function exportClassData(classId) {
            const classItem = classesData.find(c => c.id === classId);
            if (!classItem) return;

            const data = {
                className: classItem.name,
                subject: classItem.subject,
                grade: classItem.grade,
                teacher: classItem.teacher.name,
                room: classItem.room,
                capacity: classItem.capacity,
                enrolled: classItem.enrolled,
                schedule: classItem.schedule,
                status: classItem.status,
                description: classItem.description
            };

            const jsonData = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${classItem.name.replace(/\s+/g, '_')}_data.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showNotification('Class data exported successfully!', 'success');
        }

        function exportData(format) {
            if (format === 'excel') {
                exportToExcel();
            } else if (format === 'pdf') {
                exportToPDF();
            }
        }

        function exportToExcel() {
            const data = filteredClasses.map(classItem => ({
                'Class Name': classItem.name,
                'Subject': classItem.subject,
                'Grade': classItem.grade,
                'Teacher': classItem.teacher.name,
                'Room': classItem.room,
                'Capacity': classItem.capacity,
                'Enrolled': classItem.enrolled,
                'Schedule Days': classItem.schedule.days.join(', '),
                'Schedule Time': classItem.schedule.time,
                'Status': classItem.status,
                'Description': classItem.description
            }));

            const csv = convertToCSV(data);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'classes_data.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showNotification('Classes data exported to Excel successfully!', 'success');
        }

        function exportToPDF() {
            const printContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2c3e50; margin-bottom: 10px;">Greenwood Academy</h1>
                        <h2 style="color: #3498db; margin-bottom: 5px;">Classes Report</h2>
                        <p style="color: #7f8c8d;">Generated on ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Summary</h3>
                        <div style="display: flex; justify-content: space-between; margin: 15px 0;">
                            <div>Total Classes: <strong>${filteredClasses.length}</strong></div>
                            <div>Active Classes: <strong>${filteredClasses.filter(c => c.status === 'active').length}</strong></div>
                            <div>Total Enrollments: <strong>${filteredClasses.reduce((sum, c) => sum + c.enrolled, 0)}</strong></div>
                        </div>
                    </div>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #3498db; color: white;">
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Class Name</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Subject</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Grade</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Teacher</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Room</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Capacity</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Enrolled</th>
                                <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredClasses.map(classItem => `
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${classItem.name}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${classItem.subject}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Grade ${classItem.grade}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${classItem.teacher.name}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${classItem.room}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${classItem.capacity}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${classItem.enrolled}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">
                                        <span style="padding: 4px 8px; border-radius: 4px; color: white; background-color: ${classItem.status === 'active' ? '#27ae60' : '#f39c12'};">
                                            ${classItem.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Classes Report - Greenwood Academy</title>
                    <style>
                        @media print {
                            body { margin: 0; }
                            @page { margin: 1cm; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();

            showNotification('PDF report generated successfully!', 'success');
        }

        function convertToCSV(data) {
            if (!data.length) return '';

            const headers = Object.keys(data[0]);
            const csvHeaders = headers.join(',');
            const csvRows = data.map(row => 
                headers.map(header => `"${row[header] || ''}"`).join(',')
            );

            return [csvHeaders, ...csvRows].join('\n');
        }

        function refreshData() {
            // Simulate data refresh
            showNotification('Data refreshed successfully!', 'info');
            renderClasses();
            updateClassCount();
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
            notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
            `;

            document.body.appendChild(notification);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }

        // Utility function for debouncing
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

        // Add some additional classes to make the data more realistic
        function addMoreSampleData() {
            const additionalClasses = [
                {
                    id: 7,
                    name: "Basic Programming",
                    subject: "Computer Science",
                    grade: 6,
                    teacher: { name: "Mr. James Wilson", avatar:'./assets/image/teacher.jpg', },
                    room: "Computer Lab",
                    capacity: 20,
                    enrolled: 18,
                    schedule: { days: ["Tuesday", "Thursday"], time: "13:00 - 14:30" },
                    status: "active",
                    description: "Introduction to programming concepts and basic coding"
                },
                {
                    id: 8,
                    name: "Music Fundamentals",
                    subject: "Music",
                    grade: 3,
                    teacher: { name: "Ms. Maria Garcia", avatar:'./assets/image/teacher.jpg', },
                    room: "Music Room",
                    capacity: 25,
                    enrolled: 20,
                    schedule: { days: ["Wednesday", "Friday"], time: "14:00 - 15:00" },
                    status: "active",
                    description: "Learn basic music theory and practice with instruments"
                },
                {
                    id: 9,
                    name: "Drama Club",
                    subject: "Drama",
                    grade: 4,
                    teacher: { name: "Mrs. Rachel Adams", avatar:'./assets/image/teacher.jpg', },
                    room: "Auditorium",
                    capacity: 30,
                    enrolled: 15,
                    schedule: { days: ["Monday", "Thursday"], time: "15:30 - 17:00" },
                    status: "active",
                    description: "Develop acting skills and prepare for school performances"
                },
                {
                    id: 10,
                    name: "Advanced Science",
                    subject: "Science",
                    grade: 6,
                    teacher: { name: "Dr. Robert Chen", avatar:'./assets/image/teacher.jpg', },
                    room: "Science Lab 2",
                    capacity: 18,
                    enrolled: 16,
                    schedule: { days: ["Tuesday", "Thursday", "Friday"], time: "10:30 - 12:00" },
                    status: "active",
                    description: "Advanced scientific concepts and complex experiments"
                }
            ];

            classesData.push(...additionalClasses);
            filteredClasses = [...classesData];
        }

        // Initialize additional data
        addMoreSampleData();