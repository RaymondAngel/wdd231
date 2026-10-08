const params = new URLSearchParams(location.search);
const fields = ['name','email','company','service','message'];
const submitted = params.get('consent') === 'yes' && fields.filter(key => key !== 'company').every(key => params.get(key)?.trim());
document.querySelector('#result-heading').textContent = submitted ? 'Your inquiry preview' : 'No completed inquiry to display';
document.querySelector('#result-intro').textContent = submitted ? 'Review the details you entered below. This course demonstration has not sent your information to the business.' : 'Complete the contact form to see your inquiry details here.';
document.querySelector('#inquiry-details').hidden = !submitted;
fields.forEach(key => { document.querySelector(`[data-field="${key}"]`).textContent = params.get(key)?.trim() || 'Not provided'; });
