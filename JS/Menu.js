// Grab the elements from the HTML by their IDs

const menu       = document.getElementById('menu');
const dropdown   = document.getElementById('dropdown');
const historyBtn = document.getElementById('history-btn');
const subdropdown = document.getElementById('subdropdown');

// Hamburger toggle
menu.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('open');
  dropdown.classList.toggle('open');
});

// History submenu toggle
historyBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  historyBtn.classList.toggle('open');
  subdropdown.classList.toggle('open');
});

// Click anywhere else to close all menus
document.addEventListener('click', () => {
  menu.classList.remove('open');
  dropdown.classList.remove('open');
  historyBtn.classList.remove('open');
  subdropdown.classList.remove('open');
});

// =====================
// THEME TOGGLE LOGIC
// =====================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const themeText   = document.getElementById('theme-text');
const screenshot  = document.getElementById('screenshot');

function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark');
    themeToggle.checked   = true;
    // BUG FIX: themeIcon.textContent was never set in the old version,
    // so the icon span always stayed blank regardless of theme.
    themeIcon.textContent = '';
    themeText.textContent = 'Dark Mode';
    if (screenshot) screenshot.src = '/BearMetal Website/Gallery/Other/3606LogoDark.png';
  } else {
    document.body.classList.remove('dark');
    themeToggle.checked   = false;
    themeIcon.textContent = '';
    themeText.textContent = 'Light Mode';
    if (screenshot) screenshot.src = '/BearMetal Website/Gallery/Other/3606Logo.png';
  }
}

// Restore saved preference on page load
applyTheme(localStorage.getItem('theme') === 'dark');

// Save preference when toggled
themeToggle.addEventListener('change', (e) => {
  const isDark = e.target.checked;
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Prevent theme row click from closing the dropdown
document.getElementById('theme-row').addEventListener('click', (e) => {
  e.stopPropagation();
});