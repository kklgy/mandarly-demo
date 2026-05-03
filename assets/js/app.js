// Mandarly Demo - Home page logic

const TEACHERS = [
  {
    id: 'lily',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    rating: '4.9',
    lessons: 213,
    price: '$12'
  },
  {
    id: 'emma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
    rating: '4.8',
    lessons: 156,
    price: '$10'
  },
  {
    id: 'anna',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop',
    rating: '5.0',
    lessons: 89,
    price: '$15'
  }
];

function renderTeachers() {
  const grid = document.getElementById('teacherGrid');
  if (!grid) return;
  const T = window.MANDARLY_T;

  grid.innerHTML = TEACHERS.map(t => `
    <div class="teacher-card">
      <div class="teacher-cover">
        <div class="teacher-avatar" style="background-image: url('${t.avatar}')"></div>
        <div class="teacher-online">${T('teacher.online')}</div>
      </div>
      <div class="teacher-body">
        <div class="teacher-name-row">
          <h3 class="teacher-name">${T('teacher.' + t.id + '.name')}</h3>
          <div class="teacher-rating"><strong>★ ${t.rating}</strong> · ${t.lessons} ${T('teacher.lessons')}</div>
        </div>
        <div class="teacher-tags">
          <span class="teacher-tag">${T('teacher.' + t.id + '.tag1')}</span>
          <span class="teacher-tag">${T('teacher.' + t.id + '.tag2')}</span>
          <span class="teacher-tag">${T('teacher.' + t.id + '.tag3')}</span>
        </div>
        <p class="teacher-bio">${T('teacher.' + t.id + '.bio')}</p>
        <div class="teacher-foot">
          <div class="teacher-price">${t.price} <small>/ 30min</small></div>
          <a href="classroom.html?teacher=${t.id}" class="btn btn-primary btn-sm">${T('teacher.bookBtn')}</a>
        </div>
      </div>
    </div>
  `).join('');
}

function setupLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  const updateBtn = () => {
    btn.textContent = window.MANDARLY_LOCALE === 'zh-CN' ? 'EN' : '中';
  };
  updateBtn();
  btn.addEventListener('click', () => {
    window.MANDARLY_TOGGLE_LOCALE();
    updateBtn();
    renderTeachers();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  window.MANDARLY_APPLY_I18N();
  renderTeachers();
  setupLangToggle();
});
