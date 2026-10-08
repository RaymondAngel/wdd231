import { readSaved, writeSaved } from './storage.mjs';
const grid = document.querySelector('#services');
const status = document.querySelector('#catalog-status');
const category = document.querySelector('#category');
const search = document.querySelector('#search');
const savedOnly = document.querySelector('#saved-only');
const dialog = document.querySelector('#service-dialog');
let services = [];
let saved = readSaved();
function render() {
  const query = search.value.trim().toLowerCase();
  const matches = services.filter(service =>
    (category.value === 'All' || service.category === category.value) &&
    (!savedOnly.checked || saved.includes(service.id)) &&
    `${service.name} ${service.description} ${service.audience}`.toLowerCase().includes(query));
  grid.replaceChildren();
  matches.forEach(service => {
    const card = document.createElement('article');
    card.className = 'card';
    // This JSON is authored locally; submitted form values never enter innerHTML.
    card.innerHTML = `<span class="tag">${service.category}</span><h2>${service.name}</h2>
      <p>${service.description}</p><dl><dt>Best for</dt><dd>${service.audience}</dd>
      <dt>Deliverable</dt><dd>${service.deliverable}</dd><dt>Business benefit</dt><dd>${service.benefit}</dd></dl>
      <div class="card-actions"><button type="button" class="button details">View details</button>
      <button type="button" class="button secondary save" aria-pressed="${saved.includes(service.id)}">${saved.includes(service.id) ? 'Saved' : 'Save'}</button></div>`;
    const details = card.querySelector('.details');
    details.setAttribute('aria-label', `View details: ${service.name}`);
    details.addEventListener('click', () => {
      document.querySelector('#dialog-title').textContent = service.name;
      document.querySelector('#dialog-description').textContent = service.description;
      document.querySelector('#dialog-example').textContent = service.example;
      document.querySelector('#dialog-deliverable').textContent = service.deliverable;
      document.querySelector('#dialog-contact').href = `contact.html?service=${encodeURIComponent(service.category)}`;
      dialog.showModal();
    });
    const save = card.querySelector('.save');
    save.setAttribute('aria-label', `Save service: ${service.name}`);
    save.addEventListener('click', () => {
      const selected = !saved.includes(service.id);
      saved = selected ? [...saved, service.id] : saved.filter(id => id !== service.id);
      const persisted = writeSaved(saved);
      if (savedOnly.checked) render();
      else { save.setAttribute('aria-pressed', String(selected)); save.textContent = selected ? 'Saved' : 'Save'; }
      status.textContent = `${service.name} ${selected ? 'saved' : 'removed'}. ${saved.length} saved services.${persisted ? '' : ' Browser storage is unavailable; selections last for this visit only.'}`;
    });
    grid.append(card);
  });
  status.textContent = `Showing ${matches.length} of ${services.length} services. ${saved.length} saved.`;
  if (!matches.length) { const message = document.createElement('p'); message.className = 'empty'; message.textContent = 'No services match. Try another category, clear your search, or turn off Saved only.'; grid.append(message); }
}
async function loadServices() {
  status.textContent = 'Loading services…';
  try {
    const response = await fetch('./data/services.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    services = await response.json();
    if (!Array.isArray(services) || !services.every(item => ['id','name','category','description','audience','deliverable','benefit','example'].every(key => typeof item[key] === 'string'))) throw new Error('Invalid service data');
    render();
  } catch (error) {
    status.textContent = 'Services could not be loaded. Please try again.';
    grid.replaceChildren();
    const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'button'; retry.textContent = 'Retry loading services';
    retry.addEventListener('click', loadServices); grid.append(retry);
    console.error('Service catalog:', error);
  }
}
category.addEventListener('change', render);
search.addEventListener('input', render);
savedOnly.addEventListener('change', render);
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
loadServices();
