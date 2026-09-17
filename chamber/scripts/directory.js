const membersUrl = 'data/members.json';
const memberDirectory = document.querySelector('#member_directory');
const directoryStatus = document.querySelector('#directory_status');
const gridButton = document.querySelector('#grid_view');
const listButton = document.querySelector('#list_view');
const retryButton = document.querySelector('#retry_button');
const membershipLabels = { 1: 'Member', 2: 'Silver member', 3: 'Gold member' };

function setDirectoryView(view) {
  memberDirectory.classList.toggle('is-list', view === 'list');
  gridButton.setAttribute('aria-pressed', String(view === 'grid'));
  listButton.setAttribute('aria-pressed', String(view === 'list'));
}

function validateMembers(members) {
  if (!Array.isArray(members) || members.length < 7) {
    throw new Error('The directory requires at least seven member records.');
  }
  const images = new Set();
  const stringFields = ['name', 'address', 'phone', 'website', 'image', 'category', 'description'];
  members.forEach((member) => {
    if (!member || !stringFields.every((field) => typeof member[field] === 'string' && member[field].trim())) {
      throw new Error('A member is missing required information.');
    }
    if (![1, 2, 3].includes(member.membership_level)) {
      throw new Error('Membership levels must be the numbers 1, 2, or 3.');
    }
    if (new URL(member.website).protocol !== 'https:') {
      throw new Error('Member websites must use HTTPS.');
    }
    if (!/^[a-z0-9_]+\.(svg|png|jpe?g|webp)$/.test(member.image) || images.has(member.image)) {
      throw new Error('Each member needs a distinct, valid image filename.');
    }
    images.add(member.image);
  });
}

const displayMembers = (members) => {
  memberDirectory.replaceChildren();
  members.forEach((member) => {
    const card = document.createElement('article');
    card.className = 'member-card';
    const image = document.createElement('img');
    image.className = 'member-image';
    image.setAttribute('src', `images/${member.image}`);
    image.setAttribute('alt', `${member.name} illustrative business icon`);
    image.setAttribute('width', '84');
    image.setAttribute('height', '84');
    image.setAttribute('loading', 'lazy');
    const imageNote = document.createElement('p');
    imageNote.className = 'portrait-note';
    imageNote.textContent = 'Business image unavailable.';
    imageNote.hidden = true;
    image.addEventListener('error', () => {
      image.hidden = true;
      imageNote.hidden = false;
    });
    const name = document.createElement('h2');
    name.textContent = member.name;
    const category = document.createElement('p');
    category.className = 'member-category';
    category.textContent = member.category;
    const level = document.createElement('span');
    level.className = 'member-level';
    level.setAttribute('data-level', member.membership_level);
    level.textContent = membershipLabels[member.membership_level];
    const address = document.createElement('address');
    address.textContent = member.address;
    const phone = document.createElement('p');
    phone.className = 'member-phone';
    const phoneLink = document.createElement('a');
    phoneLink.setAttribute('href', `tel:+1${member.phone.replace(/\D/g, '')}`);
    phoneLink.textContent = member.phone;
    phone.appendChild(phoneLink);
    const description = document.createElement('p');
    description.className = 'member-description';
    description.textContent = member.description;
    const website = document.createElement('a');
    website.className = 'member-website';
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener noreferrer');
    website.setAttribute('aria-label', `${member.name} demo website (opens in a new tab)`);
    website.textContent = 'Demo website ↗';
    [image, name, category, level, address, phone, description, website, imageNote].forEach((element) => card.appendChild(element));
    memberDirectory.appendChild(card);
  });
};

async function getMemberData() {
  directoryStatus.textContent = 'Loading chamber members…';
  retryButton.hidden = true;
  memberDirectory.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`Member request failed: HTTP ${response.status}`);
    }
    const members = await response.json();
    validateMembers(members);
    displayMembers(members);
    directoryStatus.textContent = `${members.length} members in the directory.`;
  } catch (error) {
    memberDirectory.replaceChildren();
    directoryStatus.textContent = 'Unable to load members. Please check your connection and try again.';
    retryButton.hidden = false;
    console.error('Error loading chamber members:', error);
  } finally {
    memberDirectory.setAttribute('aria-busy', 'false');
  }
}

gridButton.addEventListener('click', () => setDirectoryView('grid'));
listButton.addEventListener('click', () => setDirectoryView('list'));
retryButton.addEventListener('click', getMemberData);
getMemberData();
