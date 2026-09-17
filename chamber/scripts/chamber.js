// Behavior shared by every chamber page.
const menuButton = document.querySelector('#menu_button');
const primaryNavigation = document.querySelector('#primary_navigation');
const desktopView = window.matchMedia('(min-width: 700px)');

function setMenuOpen(open) {
  primaryNavigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  menuButton.textContent = open ? 'Close ×' : 'Menu ☰';
}

document.documentElement.classList.add('menu-enabled');
menuButton.hidden = false;
menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});
desktopView.addEventListener('change', () => setMenuOpen(false));
document.querySelector('#current_year').textContent = new Date().getFullYear();
document.querySelector('#last_modified').textContent = `Last modified: ${document.lastModified}`;
