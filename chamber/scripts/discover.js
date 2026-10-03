import { attractions } from '../data/attractions.mjs';

export function visitMessage(previous, now) {
  if (!Number.isFinite(previous) || previous <= 0 || previous > now) {
    return 'Welcome! Let us know if you have any questions.';
  }
  const days = Math.floor((now - previous) / 86400000);
  return days < 1 ? 'Back so soon! Awesome!' : `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
}

const now = Date.now();
const message = document.querySelector('#visit_message');
try {
  message.textContent = visitMessage(Number(localStorage.getItem('california-city-discover-last-visit')), now);
  localStorage.setItem('california-city-discover-last-visit', String(now));
} catch {
  message.textContent = visitMessage(null, now);
}

const gallery = document.querySelector('#discover_gallery');
const dialog = document.querySelector('#attraction_dialog');
let activeButton;
for (const [index, item] of attractions.entries()) {
  const card = document.createElement('article');
  card.className = 'discover-card';
  const heading = document.createElement('h2');
  heading.textContent = item.name;
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  Object.assign(image, { src: item.image, alt: item.alt, width: 300, height: 200, loading: index === 0 ? 'eager' : 'lazy', decoding: 'async' });
  figure.append(image);
  const address = document.createElement('address');
  address.textContent = item.address;
  const description = document.createElement('p');
  description.textContent = item.description;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button';
  button.textContent = 'Learn more';
  button.setAttribute('aria-label', `Learn more about ${item.name}`);
  button.addEventListener('click', () => {
    activeButton = button;
    document.querySelector('#dialog_heading').textContent = item.name;
    document.querySelector('#dialog_details').textContent = item.details;
    document.querySelector('#dialog_address').textContent = item.address;
    document.querySelector('#dialog_source').href = item.url;
    dialog.showModal();
  });
  card.append(heading, figure, address, description, button);
  gallery.append(card);
}
dialog.addEventListener('close', () => activeButton?.focus());
document.querySelector('#gallery_status').textContent = 'Eight places to explore in California City and nearby Kern County.';
