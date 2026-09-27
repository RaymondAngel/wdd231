// Record when the application opened, rather than the time of submission.
document.querySelector('#timestamp').value = new Date().toISOString();

document.querySelectorAll('[data-dialog]').forEach((link) => {
  const dialog = document.getElementById(link.dataset.dialog);
  link.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.showModal();
  });
  // Native dialogs support Escape and keep keyboard focus inside while open.
  dialog.addEventListener('close', () => link.focus());
});
