// Mandarly Demo - Classroom page logic
// Embeds the LCIC iframe with role-switching (student / teacher)

const LCIC_URLS = {
  student: 'https://class.qcloudclass.com/latest/index.html?userid=3DCtkuuSK67HsFHyQNwOyEpdnxO&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Nzg0MDI4MjYsImlhdCI6MTc3Nzc5ODAyNiwiaXNzIjoiOTcxVW9NNkNudFVobHNkd2xva0Y5bzYzV2I4YXFnQ0oiLCJzY2hvb2xfaWQiOjM0MTI1ODksInVzZXJfaWQiOiIzREN0a3V1U0s2N0hzRkh5UU53T3lFcGRueE8ifQ.MuMJcGK_q7GDQd3zsgkPuooNnNCUSVBnQduzAXWVrGw&classid=338399649',
  teacher: 'https://class.qcloudclass.com/latest/index.html?userid=3DCtkr2JAt3nMK4sTGUFklm9mqd&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Nzg0MDI4MjYsImlhdCI6MTc3Nzc5ODAyNiwiaXNzIjoiOTcxVW9NNkNudFVobHNkd2xva0Y5bzYzV2I4YXFnQ0oiLCJzY2hvb2xfaWQiOjM0MTI1ODksInVzZXJfaWQiOiIzREN0a3IySkF0M25NSzRzVEdVRmtsbTltcWQifQ.PZsQLPhQgyWoIpUwZvVjqVqRVmnDHsANWHjpjm-JXZs&classid=338399649'
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

    prejoin.hidden = true;
    stage.hidden = false;

    iframe.src = LCIC_URLS[state.role];
    iframe.addEventListener('load', () => {
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, { once: true });

    // Fallback: hide loader after 8s no matter what
    setTimeout(() => { loader.style.display = 'none'; }, 8000);
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

  // Reflect initial role on UI
  document.querySelectorAll('.role-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.role === state.role);
  });

  document.addEventListener('mandarly:locale-changed', () => {
    updateRoleTag();
    updateTeacherMeta();
  });
});
