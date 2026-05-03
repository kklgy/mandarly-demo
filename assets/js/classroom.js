// Mandarly Demo - Classroom page logic
// Embeds the LCIC iframe with role-switching (student / teacher)

const LCIC_URLS = {
  student: 'https://class.qcloudclass.com/latest/index.html?userid=3DD2tZhPdSrA91s4y4XoVfTjHoN&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Nzg0MDczMzUsImlhdCI6MTc3NzgwMjUzNSwiaXNzIjoiOTcxVW9NNkNudFVobHNkd2xva0Y5bzYzV2I4YXFnQ0oiLCJzY2hvb2xfaWQiOjM0MTI1ODksInVzZXJfaWQiOiIzREQydFpoUGRTckE5MXM0eTRYb1ZmVGpIb04ifQ.GR-Bu1j-62B9GTUhdXoiOoo6axgmP7xaYHh31ByhVvw&classid=385166064',
  teacher: 'https://class.qcloudclass.com/latest/index.html?userid=3DD2tUOFytbZjJubhp9myuyoIRq&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Nzg0MDczMzUsImlhdCI6MTc3NzgwMjUzNSwiaXNzIjoiOTcxVW9NNkNudFVobHNkd2xva0Y5bzYzV2I4YXFnQ0oiLCJzY2hvb2xfaWQiOjM0MTI1ODksInVzZXJfaWQiOiIzREQydFVPRnl0YlpqSnViaHA5bXl1eW9JUnEifQ.l3Xh1T65CRKfj5gHl-v8hHO1kKuXOYocj81T2l7jDDc&classid=385166064'
};

const TEACHER_DISPLAY = {
  lily: { 'zh-CN': 'Lily 王 老师', 'en': 'Lily Wang' },
  emma: { 'zh-CN': 'Emma 张 老师', 'en': 'Emma Zhang' },
  anna: { 'zh-CN': 'Anna 李 老师', 'en': 'Anna Li' }
};

const state = {
  role: 'student',
  teacher: 'lily'
};

function getQueryParam(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function updateRoleTag() {
  const tag = document.getElementById('roleTag');
  if (!tag) return;
  const key = state.role === 'student' ? 'cls.role.studentTag' : 'cls.role.teacherTag';
  tag.textContent = window.MANDARLY_T(key);
}

function updateTeacherMeta() {
  const meta = document.getElementById('teacherMeta');
  if (!meta) return;
  const display = TEACHER_DISPLAY[state.teacher] || TEACHER_DISPLAY.lily;
  const teacherName = display[window.MANDARLY_LOCALE] || display['en'];
  const label = window.MANDARLY_LOCALE === 'zh-CN'
    ? `课堂:HSK 1 入门 · ${teacherName}`
    : `Class: HSK 1 Intro · ${teacherName}`;
  meta.textContent = label;
}

function setupRoleSwitch() {
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.role = btn.dataset.role;
      updateRoleTag();
    });
  });
}

function setupOpenInNewTab() {
  const btn = document.getElementById('openInNewTab');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const url = LCIC_URLS[state.role];
    window.open(url, '_blank', 'noopener');
  });
}

function setupEnterButton() {
  const btn = document.getElementById('enterBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const prejoin = document.getElementById('prejoin');
    const stage = document.getElementById('stage');
    const loader = document.getElementById('loader');
    const iframe = document.getElementById('lcicFrame');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    prejoin.hidden = true;
    stage.classList.add('is-active');
    if (fullscreenBtn) fullscreenBtn.hidden = false;

    iframe.src = LCIC_URLS[state.role];
    iframe.addEventListener('load', () => {
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, { once: true });

    setTimeout(() => { loader.style.display = 'none'; }, 8000);
  });
}

function setupFullscreen() {
  const btn = document.getElementById('fullscreenBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const stage = document.getElementById('stage');
    const iframe = document.getElementById('lcicFrame');
    if (!document.fullscreenElement) {
      const target = iframe.requestFullscreen ? iframe : stage;
      target.requestFullscreen().catch(() => {
        stage.requestFullscreen();
      });
    } else {
      document.exitFullscreen();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Read query params
  state.teacher = getQueryParam('teacher') || 'lily';
  state.role = getQueryParam('role') || 'student';

  window.MANDARLY_APPLY_I18N();
  updateRoleTag();
  updateTeacherMeta();
  setupRoleSwitch();
  setupOpenInNewTab();
  setupEnterButton();
  setupFullscreen();

  // Reflect initial role on UI
  document.querySelectorAll('.role-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.role === state.role);
  });

  document.addEventListener('mandarly:locale-changed', () => {
    updateRoleTag();
    updateTeacherMeta();
  });
});
