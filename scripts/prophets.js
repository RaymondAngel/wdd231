// W02 Fetch API: fetch JSON, then render the prophets array as cards.
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const loadStatus = document.querySelector('#load_status');
const retryButton = document.querySelector('#retry_button');

const displayProphets = (prophets) => {
  cards.replaceChildren();
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');
    const birthDate = document.createElement('p');
    const birthPlace = document.createElement('p');
    const portraitMessage = document.createElement('p');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    portraitMessage.className = 'portrait-unavailable';
    portraitMessage.textContent = 'Portrait temporarily unavailable.';
    portraitMessage.hidden = true;
    portrait.addEventListener('error', () => {
      portrait.hidden = true;
      portraitMessage.hidden = false;
    });

    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);
    card.appendChild(portraitMessage);
    cards.appendChild(card);
  });
};

async function getProphetData() {
  loadStatus.textContent = 'Loading prophet records…';
  retryButton.hidden = true;
  cards.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(url);
    // fetch does not reject merely because the server returns HTTP 404/500.
    if (!response.ok) {
      throw new Error(`Prophet request failed: HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.prophets)) {
      throw new Error('The response must contain a prophets array.');
    }
    const fields = ['name', 'lastname', 'birthdate', 'birthplace', 'imageurl'];
    if (!data.prophets.every((prophet) => prophet && fields.every((field) => typeof prophet[field] === 'string' && prophet[field].trim()))) {
      throw new Error('A prophet record is missing required information.');
    }
    // console.table(data.prophets); // Temporary inspection; disabled after testing.
    displayProphets(data.prophets);
    loadStatus.textContent = data.prophets.length
      ? `${data.prophets.length} prophet records loaded.`
      : 'No prophet records are available.';
  } catch (error) {
    cards.replaceChildren();
    loadStatus.textContent = 'Unable to load prophet records. Check your connection and try again.';
    retryButton.hidden = false;
    console.error('Error fetching prophet data:', error);
  } finally {
    cards.setAttribute('aria-busy', 'false');
  }
}

retryButton.addEventListener('click', getProphetData);
// Call only after the const arrow function and all DOM references are initialized.
getProphetData();
