/* ============================================
   KODARA ACADEMY - Main Application
   ============================================ */

class KodaraApp {
  constructor() {
    this.data = null;
    this.currentPage = 'course';
    this.currentCourse = null;
    this.currentLesson = null;
    this.adminAuthenticated = false;
    this.editingCourse = null;
    this.editingLesson = null;
    this.adminView = 'dashboard';
    this.adminEditingCourseId = null;
    this.progress = {};
    this.actionStates = {};
    this.init();
  }

  async init() {
    await this.loadData();
    this.loadProgress();
    this.parseRoute();
    window.addEventListener('hashchange', () => this.parseRoute());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      }
    });
  }

  async loadData() {
    try {
      const res = await fetch('data/courses.json');
      this.data = await res.json();
    } catch (e) {
      console.error('Failed to load data:', e);
      this.data = { courses: [] };
    }
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('kodara_progress');
      if (saved) this.progress = JSON.parse(saved);
      const actions = localStorage.getItem('kodara_actions');
      if (actions) this.actionStates = JSON.parse(actions);
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('kodara_progress', JSON.stringify(this.progress));
      localStorage.setItem('kodara_actions', JSON.stringify(this.actionStates));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }

  parseRoute() {
    const hash = window.location.hash.slice(1);
    const parts = hash ? hash.split('/') : [];

    if (parts[0] === 'admin') {
      this.currentPage = 'admin';
      if (parts[1]) this.adminView = parts[1];
      if (parts[2]) this.adminEditingCourseId = parts[2];
    } else if (parts[0] === 'course' && parts[1]) {
      this.currentPage = 'course';
      this.currentCourse = this.data.courses.find(c => c.id === parts[1]);
      if (this.currentCourse) {
        const lessonId = parts[2] || this.currentCourse.lessons[0]?.id;
        this.currentLesson = this.currentCourse.lessons.find(l => l.id === lessonId) || this.currentCourse.lessons[0];
      }
    } else {
      this.currentPage = 'course';
      this.currentCourse = this.data.courses[0];
      if (this.currentCourse) {
        this.currentLesson = this.currentCourse.lessons[0];
      }
    }

    this.render();
    window.scrollTo(0, 0);
  }

  navigate(hash) {
    window.location.hash = hash;
  }

  render() {
    const app = document.getElementById('app');
    if (this.currentPage === 'admin') {
      app.innerHTML = this.renderAdmin();
    } else {
      app.innerHTML = this.renderNavbar() + this.renderCourseDetail() + this.renderFooter();
    }
    this.bindEvents();
  }

  /* ============================================
     SVG ICONS
     ============================================ */

  icons = {
    arrowRight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    arrowLeft: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    clock: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    grip: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
    dashboard: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="5" x="3" y="14" rx="1"/><rect width="7" height="9" x="14" y="10" rx="1"/></svg>',
    courses: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    logout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    checklist: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
  };

  /* ============================================
     NAVBAR
     ============================================ */

  renderNavbar() {
    return `
      <nav class="navbar">
        <div class="navbar-inner">
          <a class="navbar-logo" href="#" onclick="event.preventDefault(); app.navigate('')">
            <span class="logo-dot"></span>
            Kodara
          </a>
          <button class="btn-go-to-app" onclick="app.navigate('admin')">Go to App</button>
        </div>
      </nav>
    `;
  }

  /* ============================================
     FOOTER
     ============================================ */

  renderFooter() {
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-logo">
            <span class="logo-dot"></span>
            Kodara
          </div>
          <span class="footer-copyright">&copy; ${new Date().getFullYear()} Kodara</span>
        </div>
      </footer>
    `;
  }

  /* ============================================
     COURSE DETAIL / LESSON VIEW
     ============================================ */

  renderCourseDetail() {
    if (!this.currentCourse || !this.currentLesson) {
      return '<div class="empty-state">No courses available</div>';
    }

    const course = this.currentCourse;
    const lesson = this.currentLesson;
    const courseProgress = this.progress[course.id] || {};
    const completedCount = Object.values(courseProgress).filter(Boolean).length;
    const totalLessons = course.lessons.length;
    const progressPct = totalLessons > 0 ? (completedCount / totalLessons * 100) : 0;
    const videoEmbed = this.getVideoEmbed(lesson.videoUrl);
    const isCompleted = courseProgress[lesson.id] || false;

    return `
      <section class="course-detail">
        <div class="course-detail-layout">
          <div class="lesson-sidebar">
            <select class="course-selector" onchange="app.navigate('course/' + this.value)">
              ${this.data.courses.map(c => `
                <option value="${c.id}" ${c.id === course.id ? 'selected' : ''}>${c.title}</option>
              `).join('')}
            </select>
            <div class="sidebar-section-title">Lessons</div>
            <ul class="lesson-list">
              ${course.lessons.map((l, i) => {
                const isActive = l.id === lesson.id;
                const isLessonCompleted = (this.progress[course.id] || {})[l.id] || false;
                return `
                  <li class="lesson-item ${isActive ? 'active' : ''} ${isLessonCompleted ? 'completed' : ''}" onclick="app.navigate('course/${course.id}/${l.id}')">
                    <span class="lesson-number">${isLessonCompleted ? this.icons.check : i + 1}</span>
                    <div class="lesson-info">
                      <div class="lesson-title">${l.title}</div>
                      <div class="lesson-duration">${l.duration}</div>
                    </div>
                  </li>
                `;
              }).join('')}
            </ul>
            <div class="progress-section">
              <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
              </div>
              <div class="progress-text">${completedCount} of ${totalLessons} completed</div>
            </div>
          </div>
          <div class="lesson-main">
            <div class="video-player">
              ${videoEmbed}
            </div>
            <div class="lesson-header">
              <div>
                <h1 class="lesson-active-title">${lesson.title}</h1>
                <p class="lesson-active-subtitle">${lesson.subtitle}</p>
              </div>
              <button class="btn-complete ${isCompleted ? 'completed' : ''}" onclick="app.markComplete('${course.id}', '${lesson.id}')">
                ${isCompleted ? this.icons.check + ' Completed' : 'Mark as Complete'}
              </button>
            </div>
            ${this.renderActionChecklist(course.id, lesson)}
            <div class="lesson-content">
              ${lesson.content}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderActionChecklist(courseId, lesson) {
    if (!lesson.actionItems || lesson.actionItems.length === 0) return '';

    const checkedCount = lesson.actionItems.filter(item => {
      const key = `${courseId}_${lesson.id}_${item.id}`;
      return this.actionStates[key];
    }).length;

    return `
      <div class="action-checklist">
        <div class="action-checklist-header">
          ${this.icons.checklist}
          <span class="action-checklist-title">Action Items</span>
          <span class="action-checklist-count">${checkedCount}/${lesson.actionItems.length}</span>
        </div>
        ${lesson.actionItems.map(item => {
          const key = `${courseId}_${lesson.id}_${item.id}`;
          const checked = this.actionStates[key] || false;
          return `
            <label class="action-item ${checked ? 'checked' : ''}" for="${key}">
              <input type="checkbox" id="${key}" ${checked ? 'checked' : ''} onchange="app.toggleActionItem('${courseId}', '${lesson.id}', '${item.id}')">
              <span class="action-checkbox"></span>
              <span class="action-label">${item.label}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  }

  getVideoEmbed(url) {
    if (!url) return '<div class="video-placeholder">No video available</div>';

    let match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) {
      return `<iframe src="https://www.youtube.com/embed/${match[1]}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    }

    match = url.match(/vimeo\.com\/(\d+)/);
    if (match) {
      return `<iframe src="https://player.vimeo.com/video/${match[1]}" allowfullscreen></iframe>`;
    }

    match = url.match(/wistia\.com\/medias\/([a-zA-Z0-9]+)/);
    if (match) {
      return `<iframe src="https://fast.wistia.net/embed/iframe/${match[1]}" allowfullscreen></iframe>`;
    }

    return `<iframe src="${url}" allowfullscreen></iframe>`;
  }

  markComplete(courseId, lessonId) {
    if (!this.progress[courseId]) this.progress[courseId] = {};
    this.progress[courseId][lessonId] = !this.progress[courseId][lessonId];
    this.saveProgress();
    this.render();
  }

  toggleActionItem(courseId, lessonId, actionId) {
    const key = `${courseId}_${lessonId}_${actionId}`;
    this.actionStates[key] = !this.actionStates[key];
    this.saveProgress();
    const checkbox = document.getElementById(key);
    const item = checkbox?.closest('.action-item');
    if (item) {
      item.classList.toggle('checked', this.actionStates[key]);
    }
    const checklist = item?.closest('.action-checklist');
    if (checklist) {
      const total = checklist.querySelectorAll('.action-item').length;
      const checked = checklist.querySelectorAll('.action-item.checked').length;
      const countEl = checklist.querySelector('.action-checklist-count');
      if (countEl) countEl.textContent = `${checked}/${total}`;
    }
  }

  /* ============================================
     ADMIN
     ============================================ */

  renderAdmin() {
    if (!this.adminAuthenticated) {
      return this.renderAdminLogin();
    }
    return this.renderAdminLayout();
  }

  renderAdminLogin() {
    return `
      <div class="admin-login">
        <div class="admin-login-box">
          <h1>Kodara Admin</h1>
          <p>Enter the admin password to access the dashboard.</p>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="admin-password" placeholder="Enter password" onkeypress="if(event.key==='Enter')app.adminLogin()">
          </div>
          <div class="form-error" id="login-error" style="display:none;"></div>
          <button class="btn-full" onclick="app.adminLogin()" style="margin-top: 16px;">Sign In</button>
        </div>
      </div>
    `;
  }

  adminLogin() {
    const pw = document.getElementById('admin-password').value;
    if (pw === this.data.adminPassword) {
      this.adminAuthenticated = true;
      this.adminView = 'dashboard';
      this.render();
    } else {
      const err = document.getElementById('login-error');
      err.textContent = 'Invalid password. Please try again.';
      err.style.display = 'block';
    }
  }

  renderAdminLayout() {
    return `
      <div class="admin-layout">
        <div class="admin-sidebar">
          <div class="admin-sidebar-logo">Kodara</div>
          <div class="admin-sidebar-label">Admin Panel</div>
          <div class="admin-nav-item ${this.adminView === 'dashboard' ? 'active' : ''}" onclick="app.setAdminView('dashboard')">
            ${this.icons.dashboard} Dashboard
          </div>
          <div class="admin-nav-item ${this.adminView === 'courses' ? 'active' : ''}" onclick="app.setAdminView('courses')">
            ${this.icons.courses} Courses
          </div>
          <div class="admin-nav-item" onclick="app.adminAuthenticated=false; app.navigate('');">
            ${this.icons.logout} Logout
          </div>
          <div class="admin-nav-item" style="margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-top: 24px;" onclick="app.navigate('')">
            ${this.icons.arrowLeft} Back to Site
          </div>
        </div>
        <div class="admin-main">
          ${this.adminView === 'dashboard' ? this.renderAdminDashboard() : ''}
          ${this.adminView === 'courses' ? this.renderAdminCourses() : ''}
          ${this.adminView === 'lessons' ? this.renderAdminLessons() : ''}
        </div>
      </div>
      ${this.renderAdminModals()}
    `;
  }

  setAdminView(view) {
    this.adminView = view;
    this.render();
  }

  renderAdminDashboard() {
    const totalStudents = this.data.courses.reduce((sum, c) => sum + c.students, 0);
    const totalLessons = this.data.courses.reduce((sum, c) => sum + c.lessons.length, 0);

    return `
      <div class="admin-header">
        <h1>Dashboard</h1>
      </div>
      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-label">Total Courses</div>
          <div class="stat-value">${this.data.courses.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Students</div>
          <div class="stat-value">${totalStudents.toLocaleString()}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Lessons</div>
          <div class="stat-value">${totalLessons}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Avg. Completion</div>
          <div class="stat-value">78%</div>
          <div class="stat-change">+12% this month</div>
        </div>
      </div>
      <div class="admin-card">
        <div class="admin-card-header">
          <h2>Recent Courses</h2>
          <button class="btn-admin" onclick="app.setAdminView('courses')">View All ${this.icons.arrowRight}</button>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Difficulty</th>
              <th>Lessons</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.courses.slice(0, 4).map(c => `
              <tr>
                <td><strong>${c.title}</strong></td>
                <td><span class="badge badge-${c.difficulty}">${c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1)}</span></td>
                <td>${c.lessons.length}</td>
                <td>${c.students.toLocaleString()}</td>
                <td class="actions">
                  <button class="action-btn edit" onclick="app.openEditCourse('${c.id}')">Edit</button>
                  <button class="action-btn edit" onclick="app.openLessonManager('${c.id}')">Lessons</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderAdminCourses() {
    return `
      <div class="admin-header">
        <h1>Manage Courses</h1>
        <button class="btn-admin" onclick="app.openNewCourse()">
          ${this.icons.plus} New Course
        </button>
      </div>
      <div class="admin-card">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Difficulty</th>
              <th>Category</th>
              <th>Lessons</th>
              <th>Students</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.courses.map(c => `
              <tr>
                <td><strong>${c.title}</strong><br><span style="font-size:12px;color:var(--text-muted)">${c.subtitle.slice(0, 50)}...</span></td>
                <td><span class="badge badge-${c.difficulty}">${c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1)}</span></td>
                <td>${c.tags.slice(0, 2).join(', ')}</td>
                <td>${c.lessons.length}</td>
                <td>${c.students.toLocaleString()}</td>
                <td>${c.duration}</td>
                <td class="actions">
                  <button class="action-btn edit" onclick="app.openEditCourse('${c.id}')">Edit</button>
                  <button class="action-btn edit" onclick="app.openLessonManager('${c.id}')">Lessons</button>
                  <button class="action-btn delete" onclick="app.deleteCourse('${c.id}')">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderAdminLessons() {
    const course = this.data.courses.find(c => c.id === this.adminEditingCourseId);
    if (!course) return '<p>Course not found</p>';

    return `
      <div class="admin-header">
        <h1>
          <span style="color: var(--text-muted); font-weight: 500; cursor: pointer;" onclick="app.setAdminView('courses')">Courses</span>
          <span style="color: var(--text-muted); margin: 0 8px;">/</span>
          ${course.title} — Lessons
        </h1>
        <button class="btn-admin" onclick="app.openNewLesson('${course.id}')">
          ${this.icons.plus} Add Lesson
        </button>
      </div>
      <div class="admin-card">
        <div class="admin-card-header">
          <h2>Lesson Order (drag to reorder)</h2>
        </div>
        <ul class="draggable-lessons" id="lesson-sort-list">
          ${course.lessons.sort((a, b) => a.order - b.order).map(l => `
            <li class="draggable-lesson" draggable="true" data-lesson-id="${l.id}" data-course-id="${course.id}">
              <span class="drag-handle">${this.icons.grip}</span>
              <span class="lesson-order">${l.order}</span>
              <span class="lesson-name">${l.title}</span>
              <span style="font-size: 12px; color: var(--text-muted);">${l.duration}</span>
              <div class="actions">
                <button class="action-btn edit" onclick="app.openEditLesson('${course.id}', '${l.id}')">Edit</button>
                <button class="action-btn delete" onclick="app.deleteLesson('${course.id}', '${l.id}')">Delete</button>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  /* ============================================
     ADMIN MODALS
     ============================================ */

  renderAdminModals() {
    return `
      <div class="modal-overlay" id="course-modal" onclick="if(event.target===this)app.closeModal('course-modal')">
        <div class="modal">
          <div class="modal-header">
            <h2 id="course-modal-title">New Course</h2>
            <button class="modal-close" onclick="app.closeModal('course-modal')">${this.icons.x}</button>
          </div>
          <form onsubmit="event.preventDefault(); app.saveCourse();">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="course-title" required>
            </div>
            <div class="form-group">
              <label class="form-label">Subtitle</label>
              <input type="text" class="form-input" id="course-subtitle">
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" id="course-description" rows="3"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Difficulty</label>
                <select class="form-select" id="course-difficulty">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Duration</label>
                <input type="text" class="form-input" id="course-duration" placeholder="e.g. 3h 15m">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma separated)</label>
              <input type="text" class="form-input" id="course-tags" placeholder="AI, Automation, Scaling">
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-admin-outline" onclick="app.closeModal('course-modal')">Cancel</button>
              <button type="submit" class="btn-admin">Save Course</button>
            </div>
          </form>
        </div>
      </div>

      <div class="modal-overlay" id="lesson-modal" onclick="if(event.target===this)app.closeModal('lesson-modal')">
        <div class="modal">
          <div class="modal-header">
            <h2 id="lesson-modal-title">New Lesson</h2>
            <button class="modal-close" onclick="app.closeModal('lesson-modal')">${this.icons.x}</button>
          </div>
          <form onsubmit="event.preventDefault(); app.saveLesson();">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="lesson-title" required>
            </div>
            <div class="form-group">
              <label class="form-label">Subtitle</label>
              <input type="text" class="form-input" id="lesson-subtitle-input">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Video URL (YouTube, Vimeo, or Wistia)</label>
                <input type="text" class="form-input" id="lesson-video-url" placeholder="https://www.youtube.com/watch?v=...">
              </div>
              <div class="form-group">
                <label class="form-label">Duration</label>
                <input type="text" class="form-input" id="lesson-duration" placeholder="e.g. 25:30">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Content</label>
              <div class="editor-toolbar">
                <button type="button" onclick="document.execCommand('bold')"><strong>B</strong></button>
                <button type="button" onclick="document.execCommand('italic')"><em>I</em></button>
                <button type="button" onclick="document.execCommand('formatBlock', false, 'h2')">H2</button>
                <button type="button" onclick="document.execCommand('formatBlock', false, 'h3')">H3</button>
                <button type="button" onclick="document.execCommand('insertUnorderedList')">List</button>
                <button type="button" onclick="document.execCommand('formatBlock', false, 'blockquote')">Quote</button>
              </div>
              <div class="editor-content" contenteditable="true" id="lesson-content-editor"></div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-admin-outline" onclick="app.closeModal('lesson-modal')">Cancel</button>
              <button type="submit" class="btn-admin">Save Lesson</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  openModal(id) {
    document.getElementById(id)?.classList.add('open');
  }

  closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
    this.editingCourse = null;
    this.editingLesson = null;
  }

  openNewCourse() {
    this.editingCourse = null;
    document.getElementById('course-modal-title').textContent = 'New Course';
    document.getElementById('course-title').value = '';
    document.getElementById('course-subtitle').value = '';
    document.getElementById('course-description').value = '';
    document.getElementById('course-difficulty').value = 'beginner';
    document.getElementById('course-duration').value = '';
    document.getElementById('course-tags').value = '';
    this.openModal('course-modal');
  }

  openEditCourse(courseId) {
    const course = this.data.courses.find(c => c.id === courseId);
    if (!course) return;
    this.editingCourse = courseId;
    this.render();
    setTimeout(() => {
      document.getElementById('course-modal-title').textContent = 'Edit Course';
      document.getElementById('course-title').value = course.title;
      document.getElementById('course-subtitle').value = course.subtitle;
      document.getElementById('course-description').value = course.description;
      document.getElementById('course-difficulty').value = course.difficulty;
      document.getElementById('course-duration').value = course.duration;
      document.getElementById('course-tags').value = course.tags.join(', ');
      this.openModal('course-modal');
    }, 50);
  }

  saveCourse() {
    const title = document.getElementById('course-title').value;
    const subtitle = document.getElementById('course-subtitle').value;
    const description = document.getElementById('course-description').value;
    const difficulty = document.getElementById('course-difficulty').value;
    const duration = document.getElementById('course-duration').value;
    const tags = document.getElementById('course-tags').value.split(',').map(t => t.trim()).filter(Boolean);

    if (this.editingCourse) {
      const course = this.data.courses.find(c => c.id === this.editingCourse);
      if (course) {
        course.title = title;
        course.subtitle = subtitle;
        course.description = description;
        course.difficulty = difficulty;
        course.duration = duration;
        course.tags = tags;
        course.category = [difficulty, ...(tags.some(t => t.toLowerCase() === 'featured') ? ['featured'] : [])];
      }
    } else {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      this.data.courses.push({
        id,
        title,
        subtitle,
        description,
        thumbnail: '',
        difficulty,
        category: [difficulty],
        tags,
        duration,
        lessonCount: 0,
        moduleCount: 1,
        date: new Date().toISOString().split('T')[0],
        popular: false,
        students: 0,
        lessons: []
      });
    }

    this.closeModal('course-modal');
    this.render();
  }

  deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.data.courses = this.data.courses.filter(c => c.id !== courseId);
      this.render();
    }
  }

  openLessonManager(courseId) {
    this.adminEditingCourseId = courseId;
    this.adminView = 'lessons';
    this.render();
  }

  openNewLesson(courseId) {
    this.editingLesson = null;
    this.adminEditingCourseId = courseId;
    this.render();
    setTimeout(() => {
      document.getElementById('lesson-modal-title').textContent = 'New Lesson';
      document.getElementById('lesson-title').value = '';
      document.getElementById('lesson-subtitle-input').value = '';
      document.getElementById('lesson-video-url').value = '';
      document.getElementById('lesson-duration').value = '';
      document.getElementById('lesson-content-editor').innerHTML = '';
      this.openModal('lesson-modal');
    }, 50);
  }

  openEditLesson(courseId, lessonId) {
    const course = this.data.courses.find(c => c.id === courseId);
    const lesson = course?.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    this.editingLesson = lessonId;
    this.adminEditingCourseId = courseId;
    this.render();
    setTimeout(() => {
      document.getElementById('lesson-modal-title').textContent = 'Edit Lesson';
      document.getElementById('lesson-title').value = lesson.title;
      document.getElementById('lesson-subtitle-input').value = lesson.subtitle;
      document.getElementById('lesson-video-url').value = lesson.videoUrl;
      document.getElementById('lesson-duration').value = lesson.duration;
      document.getElementById('lesson-content-editor').innerHTML = lesson.content;
      this.openModal('lesson-modal');
    }, 50);
  }

  saveLesson() {
    const course = this.data.courses.find(c => c.id === this.adminEditingCourseId);
    if (!course) return;

    const title = document.getElementById('lesson-title').value;
    const subtitle = document.getElementById('lesson-subtitle-input').value;
    const videoUrl = document.getElementById('lesson-video-url').value;
    const duration = document.getElementById('lesson-duration').value;
    const content = document.getElementById('lesson-content-editor').innerHTML;

    if (this.editingLesson) {
      const lesson = course.lessons.find(l => l.id === this.editingLesson);
      if (lesson) {
        lesson.title = title;
        lesson.subtitle = subtitle;
        lesson.videoUrl = videoUrl;
        lesson.duration = duration;
        lesson.content = content;
      }
    } else {
      const order = course.lessons.length + 1;
      const maxId = course.lessons.reduce((max, l) => {
        const num = parseInt(l.id.replace('lesson-', '')) || 0;
        return Math.max(max, num);
      }, 0);
      course.lessons.push({
        id: `lesson-${maxId + 1}`,
        title,
        subtitle,
        videoUrl,
        duration,
        order,
        content
      });
      course.lessonCount = course.lessons.length;
    }

    this.closeModal('lesson-modal');
    this.render();
  }

  deleteLesson(courseId, lessonId) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      const course = this.data.courses.find(c => c.id === courseId);
      if (course) {
        course.lessons = course.lessons.filter(l => l.id !== lessonId);
        course.lessons.forEach((l, i) => l.order = i + 1);
        course.lessonCount = course.lessons.length;
        this.render();
      }
    }
  }

  /* ============================================
     EVENT BINDING
     ============================================ */

  bindEvents() {
    const list = document.getElementById('lesson-sort-list');
    if (list) {
      let dragItem = null;

      list.querySelectorAll('.draggable-lesson').forEach(item => {
        item.addEventListener('dragstart', (e) => {
          dragItem = item;
          item.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });

        item.addEventListener('dragend', () => {
          item.classList.remove('dragging');
          dragItem = null;
          const courseId = item.dataset.courseId;
          const course = this.data.courses.find(c => c.id === courseId);
          if (course) {
            const items = list.querySelectorAll('.draggable-lesson');
            items.forEach((el, i) => {
              const lid = el.dataset.lessonId;
              const lesson = course.lessons.find(l => l.id === lid);
              if (lesson) lesson.order = i + 1;
            });
            this.render();
          }
        });

        item.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          const dragging = list.querySelector('.dragging');
          if (dragging && dragging !== item) {
            const rect = item.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;
            if (e.clientY < mid) {
              list.insertBefore(dragging, item);
            } else {
              list.insertBefore(dragging, item.nextSibling);
            }
          }
        });
      });
    }
  }
}

const app = new KodaraApp();
