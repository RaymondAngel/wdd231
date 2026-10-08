import { readSaved } from './storage.mjs';
const interest = document.querySelector('#service');
const requested = new URLSearchParams(location.search).get('service');
if ([...interest.options].some(option => option.value === requested)) interest.value = requested;
const count = readSaved().length;
document.querySelector('#saved-summary').textContent = count ? `You have ${count} saved services. Mention the ones you want to discuss in your project description.` : 'Not sure what to choose? Explore the services catalog and save ideas for later.';
