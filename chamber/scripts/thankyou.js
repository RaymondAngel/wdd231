const application = new URLSearchParams(window.location.search);
const membershipNames = new Map([
  ['np', 'NP Membership'], ['bronze', 'Bronze Membership'],
  ['silver', 'Silver Membership'], ['gold', 'Gold Membership']
]);
document.querySelectorAll('[data-field]').forEach((field) => {
  const key = field.dataset.field;
  const value = application.get(key);
  if (!value) return;
  if (key === 'membership') {
    field.textContent = membershipNames.get(value) || 'Unknown membership';
  } else if (key === 'timestamp') {
    const date = new Date(value);
    field.textContent = Number.isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleString(undefined, {
      dateStyle: 'long', timeStyle: 'long'
    });
  } else {
    // Treat query parameters as text, never HTML.
    field.textContent = value;
  }
});
