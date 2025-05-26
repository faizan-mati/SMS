        // Event Management System JavaScript
        let events = [];
        let currentView = 'grid';
        let currentPage = 1;
        const eventsPerPage = 12;
        let filteredEvents = [];

        // Sample Events Data
        const sampleEvents = [
            {
                id: 1,
                title: "Annual Science Fair",
                description: "Showcase of student science projects and experiments",
                date: "2024-12-15",
                startTime: "09:00",
                endTime: "15:00",
                type: "academic",
                location: "Main Auditorium",
                organizer: "Dr. Sarah Johnson",
                priority: "high",
                status: "upcoming",
                maxAttendees: 500,
                currentAttendees: 287,
                contactEmail: "science@greenwoodacademy.edu",
                contactPhone: "+1-555-0123",
                isPublic: true,
                requireRegistration: true
            },
            {
                id: 2,
                title: "Winter Sports Championship",
                description: "Inter-school basketball and volleyball tournaments",
                date: "2024-12-10",
                startTime: "08:00",
                endTime: "18:00",
                type: "sports",
                location: "Sports Complex",
                organizer: "Coach Mike Williams",
                priority: "medium",
                status: "ongoing",
                maxAttendees: 800,
                currentAttendees: 623,
                contactEmail: "sports@greenwoodacademy.edu",
                contactPhone: "+1-555-0124",
                isPublic: true,
                requireRegistration: false
            },
            {
                id: 3,
                title: "Cultural Heritage Day",
                description: "Celebration of diverse cultures with performances and exhibitions",
                date: "2024-12-20",
                startTime: "10:00",
                endTime: "16:00",
                type: "cultural",
                location: "School Courtyard",
                organizer: "Ms. Emily Chen",
                priority: "high",
                status: "upcoming",
                maxAttendees: 600,
                currentAttendees: 445,
                contactEmail: "cultural@greenwoodacademy.edu",
                contactPhone: "+1-555-0125",
                isPublic: true,
                requireRegistration: true
            },
            {
                id: 4,
                title: "Parent-Teacher Conference",
                description: "Individual meetings between parents and teachers",
                date: "2024-11-28",
                startTime: "13:00",
                endTime: "17:00",
                type: "meeting",
                location: "Classroom Building",
                organizer: "Principal Anderson",
                priority: "high",
                status: "completed",
                maxAttendees: 200,
                currentAttendees: 187,
                contactEmail: "admin@greenwoodacademy.edu",
                contactPhone: "+1-555-0126",
                isPublic: false,
                requireRegistration: true
            },
            {
                id: 5,
                title: "Christmas Carol Concert",
                description: "Annual holiday music performance by school choir and band",
                date: "2024-12-18",
                startTime: "19:00",
                endTime: "21:00",
                type: "celebration",
                location: "Main Auditorium",
                organizer: "Ms. Lisa Martinez",
                priority: "medium",
                status: "upcoming",
                maxAttendees: 400,
                currentAttendees: 312,
                contactEmail: "music@greenwoodacademy.edu",
                contactPhone: "+1-555-0127",
                isPublic: true,
                requireRegistration: false
            },
            {
                id: 6,
                title: "Digital Learning Workshop",
                description: "Training session for teachers on new educational technologies",
                date: "2024-12-05",
                startTime: "09:00",
                endTime: "12:00",
                type: "workshop",
                location: "Computer Lab",
                organizer: "IT Department",
                priority: "medium",
                status: "upcoming",
                maxAttendees: 50,
                currentAttendees: 38,
                contactEmail: "it@greenwoodacademy.edu",
                contactPhone: "+1-555-0128",
                isPublic: false,
                requireRegistration: true
            }
        ];

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            events = [...sampleEvents];
            filteredEvents = [...events];
            renderEvents();
            setupEventListeners();
            updateStatistics();
        });

        // Setup Event Listeners
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
            document.getElementById('searchEvent').addEventListener('input', filterEvents);
            document.getElementById('typeFilter').addEventListener('change', filterEvents);
            document.getElementById('statusFilter').addEventListener('change', filterEvents);

            // Filter chips
            document.querySelectorAll('.chip').forEach(chip => {
                chip.addEventListener('click', function() {
                    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    filterEventsByChip(this.dataset.filter);
                });
            });
        }

        // Filter Events
        function filterEvents() {
            const searchTerm = document.getElementById('searchEvent').value.toLowerCase();
            const typeFilter = document.getElementById('typeFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;

            filteredEvents = events.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                    event.description.toLowerCase().includes(searchTerm) ||
                                    event.location.toLowerCase().includes(searchTerm) ||
                                    event.organizer.toLowerCase().includes(searchTerm);
                
                const matchesType = !typeFilter || event.type === typeFilter;
                const matchesStatus = !statusFilter || event.status === statusFilter;

                return matchesSearch && matchesType && matchesStatus;
            });

            currentPage = 1;
            renderEvents();
            updateEventCount();
        }

        // Filter by chips
        function filterEventsByChip(filter) {
            const today = new Date();
            const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const thisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            switch(filter) {
                case 'all':
                    filteredEvents = [...events];
                    break;
                case 'today':
                    filteredEvents = events.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.toDateString() === today.toDateString();
                    });
                    break;
                case 'week':
                    filteredEvents = events.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate >= today && eventDate <= thisWeek;
                    });
                    break;
                case 'month':
                    filteredEvents = events.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.getMonth() === today.getMonth() && 
                               eventDate.getFullYear() === today.getFullYear();
                    });
                    break;
                case 'important':
                    filteredEvents = events.filter(event => event.priority === 'high');
                    break;
            }

            currentPage = 1;
            renderEvents();
            updateEventCount();
        }

        // Clear Filters
        function clearFilters() {
            document.getElementById('searchEvent').value = '';
            document.getElementById('typeFilter').value = '';
            document.getElementById('statusFilter').value = '';
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            document.querySelector('.chip[data-filter="all"]').classList.add('active');
            filteredEvents = [...events];
            currentPage = 1;
            renderEvents();
            updateEventCount();
        }

        // Toggle View
        function toggleView(view) {
            currentView = view;
            document.querySelectorAll('#gridView, #listView, #calendarView').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(view + 'View').classList.add('active');

            document.getElementById('gridViewContainer').style.display = view === 'grid' ? 'block' : 'none';
            document.getElementById('listViewContainer').style.display = view === 'list' ? 'block' : 'none';
            document.getElementById('calendarViewContainer').style.display = view === 'calendar' ? 'block' : 'none';

            if (view === 'calendar') {
                renderCalendar();
            } else {
                renderEvents();
            }
        }

        // Render Events
        function renderEvents() {
            if (currentView === 'grid') {
                renderGridView();
            } else if (currentView === 'list') {
                renderListView();
            }
            renderPagination();
        }

        // Render Grid View
        function renderGridView() {
            const container = document.getElementById('eventsGrid');
            const startIndex = (currentPage - 1) * eventsPerPage;
            const endIndex = startIndex + eventsPerPage;
            const pageEvents = filteredEvents.slice(startIndex, endIndex);

            container.innerHTML = pageEvents.map(event => `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card event-card h-100" onclick="showEventDetails(${event.id})">
                        <div class="event-status-badge event-${event.status}">
                            ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </div>
                        <div class="card-body">
                            <div class="event-date-box">
                                <div class="month">${formatEventMonth(event.date)}</div>
                                <div class="day">${formatEventDay(event.date)}</div>
                            </div>
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text text-muted small">${event.description.substring(0, 100)}...</p>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-clock me-2 text-primary"></i>
                                <small>${event.startTime} - ${event.endTime}</small>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                                <small>${event.location}</small>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-user me-2 text-primary"></i>
                                <small>${event.organizer}</small>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-${getTypeColor(event.type)}">${event.type}</span>
                                <span class="event-priority priority-${event.priority}">${event.priority.toUpperCase()}</span>
                            </div>
                            <div class="mt-2">
                                <div class="d-flex justify-content-between">
                                    <small>Attendees:</small>
                                    <small>${event.currentAttendees}/${event.maxAttendees}</small>
                                </div>
                                <div class="progress mt-1" style="height: 4px;">
                                    <div class="progress-bar" role="progressbar" 
                                         style="width: ${(event.currentAttendees / event.maxAttendees) * 100}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-sm btn-outline-primary btn-action" onclick="event.stopPropagation(); editEvent(${event.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-success btn-action" onclick="event.stopPropagation(); manageAttendees(${event.id})">
                                    <i class="fas fa-users"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-info btn-action" onclick="event.stopPropagation(); duplicateEvent(${event.id})">
                                    <i class="fas fa-copy"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger btn-action" onclick="event.stopPropagation(); deleteEvent(${event.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Render List View
        function renderListView() {
            const container = document.getElementById('eventsTable');
            const startIndex = (currentPage - 1) * eventsPerPage;
            const endIndex = startIndex + eventsPerPage;
            const pageEvents = filteredEvents.slice(startIndex, endIndex);

            container.innerHTML = pageEvents.map(event => `
                <tr onclick="showEventDetails(${event.id})" style="cursor: pointer;">
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <div class="event-date-box" style="width: 50px; height: 50px; padding: 8px;">
                                    <div class="month" style="font-size: 8px;">${formatEventMonth(event.date)}</div>
                                    <div class="day" style="font-size: 14px;">${formatEventDay(event.date)}</div>
                                </div>
                            </div>
                            <div>
                                <h6 class="mb-1">${event.title}</h6>
                                <small class="text-muted">${event.description.substring(0, 50)}...</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>${formatEventDate(event.date)}</div>
                        <small class="text-muted">${event.startTime} - ${event.endTime}</small>
                    </td>
                    <td>
                        <span class="badge bg-${getTypeColor(event.type)}">${event.type}</span>
                    </td>
                    <td>
                        <i class="fas fa-map-marker-alt me-1"></i>
                        ${event.location}
                    </td>
                    <td>
                        <span class="badge event-status-badge event-${event.status}">
                            ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                    </td>
                    <td>
                        <div>${event.currentAttendees}/${event.maxAttendees}</div>
                        <div class="progress mt-1" style="height: 4px;">
                            <div class="progress-bar" role="progressbar" 
                                 style="width: ${(event.currentAttendees / event.maxAttendees) * 100}%"></div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-primary btn-action" onclick="event.stopPropagation(); editEvent(${event.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-success btn-action" onclick="event.stopPropagation(); manageAttendees(${event.id})" title="Manage Attendees">
                                <i class="fas fa-users"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger btn-action" onclick="event.stopPropagation(); deleteEvent(${event.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Render Calendar View
        function renderCalendar() {
            const container = document.getElementById('calendarGrid');
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            // Update month display
            document.getElementById('currentMonth').textContent = 
                new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            // Generate calendar grid
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            let calendarHTML = '<div class="row text-center mb-2">';
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
                calendarHTML += `<div class="col"><strong>${day}</strong></div>`;
            });
            calendarHTML += '</div>';

            for (let week = 0; week < 6; week++) {
                calendarHTML += '<div class="row mb-2">';
                for (let day = 0; day < 7; day++) {
                    const dayNumber = week * 7 + day - firstDay + 1;
                    if (dayNumber > 0 && dayNumber <= daysInMonth) {
                        const dayEvents = events.filter(event => {
                            const eventDate = new Date(event.date);
                            return eventDate.getDate() === dayNumber && 
                                   eventDate.getMonth() === currentMonth && 
                                   eventDate.getFullYear() === currentYear;
                        });
                        
                        calendarHTML += `
                            <div class="col p-1">
                                <div class="border rounded p-2 h-100" style="min-height: 80px;">
                                    <div class="fw-bold">${dayNumber}</div>
                                    ${dayEvents.slice(0, 2).map(event => 
                                        `<div class="badge bg-${getTypeColor(event.type)} w-100 mb-1 text-truncate" 
                                              style="font-size: 8px;" title="${event.title}">${event.title}</div>`
                                    ).join('')}
                                    ${dayEvents.length > 2 ? `<div class="text-muted" style="font-size: 8px;">+${dayEvents.length - 2} more</div>` : ''}
                                </div>
                            </div>
                        `;
                    } else {
                        calendarHTML += '<div class="col p-1"><div class="p-2" style="min-height: 80px;"></div></div>';
                    }
                }
                calendarHTML += '</div>';
            }

            container.innerHTML = calendarHTML;
        }

        // Render Pagination
        function renderPagination() {
            const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
            const container = document.getElementById('pagination');
            
            if (totalPages <= 1) {
                container.innerHTML = '';
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
                if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                    paginationHTML += `
                        <li class="page-item ${i === currentPage ? 'active' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                        </li>
                    `;
                } else if (i === currentPage - 3 || i === currentPage + 3) {
                    paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
                }
            }

            // Next button
            paginationHTML += `
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
                </li>
            `;

            container.innerHTML = paginationHTML;
        }

        // Change Page
        function changePage(page) {
            const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderEvents();
            }
        }

        // Update Statistics
        function updateStatistics() {
            const total = events.length;
            const upcoming = events.filter(e => e.status === 'upcoming').length;
            const ongoing = events.filter(e => e.status === 'ongoing').length;
            const totalAttendees = events.reduce((sum, e) => sum + e.currentAttendees, 0);

            // Update stat boxes would go here - simplified for demo
        }

        // Update Event Count
        function updateEventCount() {
            document.getElementById('eventCount').textContent = filteredEvents.length;
        }

        // Show Event Details
        function showEventDetails(eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;

            const content = `
                <div class="row">
                    <div class="col-md-8">
                        <h3>${event.title}</h3>
                        <p class="text-muted">${event.description}</p>
                        
                        <div class="event-location">
                            <i class="fas fa-map-marker-alt me-2"></i>
                            <strong>Location:</strong> ${event.location}
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <h6><i class="fas fa-calendar me-2"></i>Event Details</h6>
                                <p><strong>Date:</strong> ${formatEventDate(event.date)}</p>
                                <p><strong>Time:</strong> ${event.startTime} - ${event.endTime}</p>
                                <p><strong>Type:</strong> <span class="badge bg-${getTypeColor(event.type)}">${event.type}</span></p>
                                <p><strong>Priority:</strong> <span class="event-priority priority-${event.priority}">${event.priority.toUpperCase()}</span></p>
                            </div>
                            <div class="col-md-6">
                                <h6><i class="fas fa-user me-2"></i>Contact Information</h6>
                                <p><strong>Organizer:</strong> ${event.organizer}</p>
                                <p><strong>Email:</strong> ${event.contactEmail}</p>
                                <p><strong>Phone:</strong> ${event.contactPhone}</p>
                            </div>
                        </div>
                        
                        <div class="mt-3">
                            <h6><i class="fas fa-users me-2"></i>Attendance</h6>
                            <div class="progress mb-2">
                                <div class="progress-bar" role="progressbar" 
                                     style="width: ${(event.currentAttendees / event.maxAttendees) * 100}%">
                                </div>
                            </div>
                            <p>${event.currentAttendees} of ${event.maxAttendees} attendees registered</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="event-date-box mb-3">
                            <div class="month">${formatEventMonth(event.date)}</div>
                            <div class="day">${formatEventDay(event.date)}</div>
                        </div>
                        
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="editEvent(${event.id})">
                                <i class="fas fa-edit me-2"></i>Edit Event
                            </button>
                            <button class="btn btn-success" onclick="manageAttendees(${event.id})">
                                <i class="fas fa-users me-2"></i>Manage Attendees
                            </button>
                            <button class="btn btn-info" onclick="duplicateEvent(${event.id})">
                                <i class="fas fa-copy me-2"></i>Duplicate Event
                            </button>
                            <button class="btn btn-warning" onclick="sendReminders(${event.id})">
                                <i class="fas fa-bell me-2"></i>Send Reminders
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('eventDetailsContent').innerHTML = content;
            new bootstrap.Modal(document.getElementById('eventDetailsModal')).show();
        }

        // Save Event
        function saveEvent() {
            const form = document.getElementById('addEventForm');
            const formData = new FormData(form);
            
            const newEvent = {
                id: events.length + 1,
                title: document.getElementById('eventTitle').value,
                description: document.getElementById('eventDescription').value,
                date: document.getElementById('eventDate').value,
                startTime: document.getElementById('startTime').value,
                endTime: document.getElementById('endTime').value,
                type: document.getElementById('eventType').value,
                location: document.getElementById('eventLocation').value,
                organizer: document.getElementById('eventOrganizer').value,
                priority: document.getElementById('eventPriority').value,
                status: 'upcoming',
                maxAttendees: parseInt(document.getElementById('maxAttendees').value) || 100,
                currentAttendees: 0,
                contactEmail: document.getElementById('contactEmail').value,
                contactPhone: document.getElementById('contactPhone').value,
                isPublic: document.getElementById('isPublic').checked,
                requireRegistration: document.getElementById('requireRegistration').checked
            };

            events.push(newEvent);
            filteredEvents = [...events];
            renderEvents();
            updateStatistics();
            updateEventCount();

            // Close modal and reset form
            bootstrap.Modal.getInstance(document.getElementById('addEventModal')).hide();
            form.reset();

            // Show success message
            showNotification('Event created successfully!', 'success');
        }

        // Helper Functions
        function formatEventDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        function formatEventMonth(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', { month: 'short' });
        }

        function formatEventDay(dateString) {
            return new Date(dateString).getDate();
        }

        function getTypeColor(type) {
            const colors = {
                academic: 'primary',
                sports: 'success',
                cultural: 'warning',
                meeting: 'info',
                celebration: 'danger',
                workshop: 'secondary',
                seminar: 'dark'
            };
            return colors[type] || 'primary';
        }

        // Action Functions
        function editEvent(eventId) {
            console.log('Edit event:', eventId);
            showNotification('Edit functionality would be implemented here', 'info');
        }

        function deleteEvent(eventId) {
            if (confirm('Are you sure you want to delete this event?')) {
                events = events.filter(e => e.id !== eventId);
                filteredEvents = filteredEvents.filter(e => e.id !== eventId);
                renderEvents();
                updateStatistics();
                updateEventCount();
                showNotification('Event deleted successfully!', 'success');
            }
        }

       function duplicateEvent(eventId) {
            const event = events.find(e => e.id === eventId);
            if (event) {
                const duplicated = {
                    ...event, 
                    id: events.length + 1, 
                    title: event.title + ' (Copy)',
                    currentAttendees: 0,
                    status: 'upcoming'
                };
                events.push(duplicated);
                filteredEvents = [...events];
                renderEvents();
                updateEventCount();
                showNotification('Event duplicated successfully!', 'success');
            }
        }

        function manageAttendees(eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;

            const attendeesModal = `
                <div class="modal fade" id="attendeesModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="fas fa-users me-2"></i>Manage Attendees - ${event.title}
                                </h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <div class="stat-box text-center">
                                            <h4>${event.currentAttendees}</h4>
                                            <p class="mb-0">Registered</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="stat-box text-center">
                                            <h4>${event.maxAttendees - event.currentAttendees}</h4>
                                            <p class="mb-0">Available</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="stat-box text-center">
                                            <h4>${event.maxAttendees}</h4>
                                            <p class="mb-0">Capacity</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mb-3">
                                    <div class="search-container flex-grow-1 me-3">
                                        <i class="fas fa-search search-icon"></i>
                                        <input type="text" class="form-control" placeholder="Search attendees...">
                                    </div>
                                    <button class="btn btn-success" onclick="addAttendee(${eventId})">
                                        <i class="fas fa-user-plus me-1"></i>Add Attendee
                                    </button>
                                </div>
                                <div class="table-container">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Registration Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="attendeesTable">
                                            <!-- Sample attendees data -->
                                            <tr>
                                                <td>John Smith</td>
                                                <td>john.smith@email.com</td>
                                                <td>Nov 15, 2024</td>
                                                <td><span class="badge bg-success">Confirmed</span></td>
                                                <td>
                                                    <button class="btn btn-sm btn-outline-danger" onclick="removeAttendee('john.smith@email.com')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="exportAttendees(${eventId})">
                                    <i class="fas fa-download me-1"></i>Export List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', attendeesModal);
            new bootstrap.Modal(document.getElementById('attendeesModal')).show();

            // Clean up modal after it's hidden
            document.getElementById('attendeesModal').addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
        }

        function addAttendee(eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;

            if (event.currentAttendees >= event.maxAttendees) {
                showNotification('Event is at maximum capacity!', 'warning');
                return;
            }

            // Simple prompt for demo - in real app would be a proper form
            const name = prompt('Enter attendee name:');
            const email = prompt('Enter attendee email:');
            
            if (name && email) {
                event.currentAttendees += 1;
                renderEvents();
                showNotification('Attendee added successfully!', 'success');
            }
        }

        function removeAttendee(email) {
            if (confirm('Remove this attendee from the event?')) {
                showNotification('Attendee removed successfully!', 'success');
            }
        }

        function sendReminders(eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;

            showNotification(`Sending reminders to ${event.currentAttendees} attendees...`, 'info');
            
            // Simulate sending process
            setTimeout(() => {
                showNotification('Reminders sent successfully!', 'success');
            }, 2000);
        }

        function exportEvents(format) {
            if (format === 'excel') {
                showNotification('Exporting events to Excel...', 'info');
                // In real implementation, would generate actual Excel file
                setTimeout(() => {
                    showNotification('Events exported to Excel successfully!', 'success');
                }, 1500);
            } else if (format === 'pdf') {
                showNotification('Exporting events to PDF...', 'info');
                // In real implementation, would generate actual PDF file
                setTimeout(() => {
                    showNotification('Events exported to PDF successfully!', 'success');
                }, 1500);
            }
        }

        function exportAttendees(eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;

            showNotification(`Exporting attendee list for "${event.title}"...`, 'info');
            setTimeout(() => {
                showNotification('Attendee list exported successfully!', 'success');
            }, 1500);
        }

        function refreshEvents() {
            showNotification('Refreshing events...', 'info');
            
            // Simulate refresh process
            setTimeout(() => {
                renderEvents();
                updateStatistics();
                showNotification('Events refreshed successfully!', 'success');
            }, 1000);
        }

        // Calendar navigation functions
        let currentCalendarDate = new Date();

        function previousMonth() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        }

        function nextMonth() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        }

        // Enhanced Calendar View
        function renderCalendar() {
            const container = document.getElementById('calendarGrid');
            const currentMonth = currentCalendarDate.getMonth();
            const currentYear = currentCalendarDate.getFullYear();
            
            // Update month display
            document.getElementById('currentMonth').textContent = 
                new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            // Generate calendar grid
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            let calendarHTML = '<div class="row text-center mb-2 fw-bold">';
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
                calendarHTML += `<div class="col border-bottom pb-2">${day}</div>`;
            });
            calendarHTML += '</div>';

            for (let week = 0; week < 6; week++) {
                calendarHTML += '<div class="row mb-1">';
                for (let day = 0; day < 7; day++) {
                    const dayNumber = week * 7 + day - firstDay + 1;
                    if (dayNumber > 0 && dayNumber <= daysInMonth) {
                        const dayEvents = filteredEvents.filter(event => {
                            const eventDate = new Date(event.date);
                            return eventDate.getDate() === dayNumber && 
                                   eventDate.getMonth() === currentMonth && 
                                   eventDate.getFullYear() === currentYear;
                        });
                        
                        const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, dayNumber).toDateString();
                        
                        calendarHTML += `
                            <div class="col p-1">
                                <div class="border rounded p-2 h-100 ${isToday ? 'bg-light border-primary' : ''}" 
                                     style="min-height: 100px; cursor: pointer;" 
                                     onclick="showDayEvents('${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${dayNumber.toString().padStart(2, '0')}')">
                                    <div class="fw-bold ${isToday ? 'text-primary' : ''}">${dayNumber}</div>
                                    ${dayEvents.slice(0, 3).map(event => 
                                        `<div class="badge bg-${getTypeColor(event.type)} w-100 mb-1 text-truncate" 
                                              style="font-size: 9px;" title="${event.title} (${event.startTime})">${event.title}</div>`
                                    ).join('')}
                                    ${dayEvents.length > 3 ? `<div class="text-muted" style="font-size: 8px;">+${dayEvents.length - 3} more</div>` : ''}
                                </div>
                            </div>
                        `;
                    } else {
                        calendarHTML += '<div class="col p-1"><div class="p-2" style="min-height: 100px;"></div></div>';
                    }
                }
                calendarHTML += '</div>';
            }

            container.innerHTML = calendarHTML;
        }

        function showDayEvents(date) {
            const dayEvents = filteredEvents.filter(event => event.date === date);
            
            if (dayEvents.length === 0) {
                showNotification('No events on this day', 'info');
                return;
            }

            const dayModal = `
                <div class="modal fade" id="dayEventsModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="fas fa-calendar-day me-2"></i>Events on ${formatEventDate(date)}
                                </h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="event-timeline">
                                    ${dayEvents.map(event => `
                                        <div class="timeline-item">
                                            <div class="timeline-marker">
                                                <i class="fas fa-${getEventIcon(event.type)}"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <div class="d-flex justify-content-between align-items-start">
                                                    <div>
                                                        <h6 class="mb-1">${event.title}</h6>
                                                        <p class="text-muted mb-2">${event.description}</p>
                                                        <div class="d-flex gap-3">
                                                            <small><i class="fas fa-clock me-1"></i>${event.startTime} - ${event.endTime}</small>
                                                            <small><i class="fas fa-map-marker-alt me-1"></i>${event.location}</small>
                                                            <small><i class="fas fa-users me-1"></i>${event.currentAttendees}/${event.maxAttendees}</small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex gap-1">
                                                        <span class="badge bg-${getTypeColor(event.type)}">${event.type}</span>
                                                        <span class="event-status-badge event-${event.status}">${event.status}</span>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <button class="btn btn-sm btn-outline-primary me-1" onclick="showEventDetails(${event.id})">
                                                        <i class="fas fa-eye me-1"></i>View
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-success me-1" onclick="editEvent(${event.id})">
                                                        <i class="fas fa-edit me-1"></i>Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-info" onclick="manageAttendees(${event.id})">
                                                        <i class="fas fa-users me-1"></i>Attendees
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', dayModal);
            new bootstrap.Modal(document.getElementById('dayEventsModal')).show();

            // Clean up modal after it's hidden
            document.getElementById('dayEventsModal').addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
        }

        function getEventIcon(type) {
            const icons = {
                academic: 'graduation-cap',
                sports: 'trophy',
                cultural: 'theater-masks',
                meeting: 'handshake',
                celebration: 'birthday-cake',
                workshop: 'tools',
                seminar: 'chalkboard-teacher'
            };
            return icons[type] || 'calendar';
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
            notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

            document.body.appendChild(notification);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
        }

        // Set today's date as default for new event form
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            if (document.getElementById('eventDate')) {
                document.getElementById('eventDate').value = today;
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + N to add new event
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                document.querySelector('[data-bs-target="#addEventModal"]').click();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.show');
                if (activeModal) {
                    bootstrap.Modal.getInstance(activeModal).hide();
                }
            }
        });

        // Auto-save form data (for new event form)
        const formInputs = ['eventTitle', 'eventDescription', 'eventLocation', 'eventOrganizer'];
        formInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', function() {
                    const formData = {};
                    formInputs.forEach(id => {
                        const el = document.getElementById(id);
                        if (el) formData[id] = el.value;
                    });
                    // In real app, save to localStorage or session storage
                    console.log('Auto-saving form data:', formData);
                });
            }
        });

        // Initialize tooltips for better UX
        document.addEventListener('DOMContentLoaded', function() {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
            const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });

        // Search with debounce for better performance
        let searchTimeout;
        document.getElementById('searchEvent').addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterEvents, 300);
        });

        console.log('Event Management System loaded successfully!');
