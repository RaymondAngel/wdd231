const spotlightContainer = document.querySelector('#member_spotlights');
const spotlightStatus = document.querySelector('#spotlight_status');
const spotlightRetry = document.querySelector('#spotlight_retry');

function selectSpotlights(members) {
  const eligible = members.filter((member) => [2, 3].includes(member.membership_level));
  // Fisher–Yates shuffle: select without duplicates and give each member an equal chance.
  for (let index = eligible.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [eligible[index], eligible[randomIndex]] = [eligible[randomIndex], eligible[index]];
  }
  return eligible.slice(0, 3);
}

function createSpotlight(member) {
  const card = document.createElement('article');
  card.className = 'member-card';
  const logo = document.createElement('img');
  logo.src = `images/${member.image}`;
  logo.alt = `${member.name} logo`;
  logo.width = 84;
  logo.height = 84;
  logo.loading = 'lazy';
  logo.className = 'member-image';
  const name = document.createElement('h3');
  name.textContent = member.name;
  const level = document.createElement('p');
  level.className = 'member-level';
  level.dataset.level = member.membership_level;
  level.textContent = member.membership_level === 3 ? 'Gold member' : 'Silver member';
  const address = document.createElement('address');
  address.textContent = member.address;
  const phone = document.createElement('p');
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:+1${member.phone.replace(/\D/g, '')}`;
  phoneLink.textContent = member.phone;
  phone.append(phoneLink);
  const website = document.createElement('a');
  website.href = member.website;
  website.className = 'member-website';
  website.textContent = 'Visit demo website';
  website.setAttribute('aria-label', `Visit demo website for ${member.name}`);
  card.append(logo, name, level, address, phone, website);
  return card;
}

async function loadSpotlights() {
  spotlightRetry.hidden = true;
  spotlightStatus.textContent = 'Loading member spotlights…';
  spotlightContainer.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Member data is unavailable.');
    const members = await response.json();
    if (!Array.isArray(members)) throw new Error('Invalid member data.');
    const selected = selectSpotlights(members);
    if (selected.length < 2) throw new Error('Not enough eligible members.');
    spotlightContainer.replaceChildren(...selected.map(createSpotlight));
    spotlightStatus.textContent = `${selected.length} gold and silver members featured.`;
  } catch {
    spotlightStatus.textContent = 'Member spotlights are unavailable. Please try again.';
    spotlightRetry.hidden = false;
  } finally {
    spotlightContainer.setAttribute('aria-busy', 'false');
  }
}

spotlightRetry.addEventListener('click', loadSpotlights);
loadSpotlights();
