"use strict";
// (Must be loaded as a module or deferred script so that we don't have to worry about the "DOMContentLoaded" event)

// Setup for account form validation / submission
const submitButtonEl = document.querySelector('.form-submit-button');
const formEl = document.querySelector('.form');
const jsValidators = {
	'email': [(value) => hasEmailDomain(value, 'gmail.com', 'outlook.com')],
	'phone': [(value) => isWithinMaxLenWithoutSpaces(value, 11)]
};
setupFormValidation(formEl, submitButtonEl, jsValidators, submitForm)

/**
 * Submission handler (just logs the form values to the console and displays them in an alert)
 */
function submitForm() {
	console.info("Submitting form...");
	let alertStr = "Submitting form...\n";
	const formData = new FormData(formEl);
	for (const [fieldName, fieldValue] of formData.entries()) {
		const str = `${fieldName}: ${fieldValue}`;
		console.info(str);
		alertStr += str + "\n";
	}
	alert(alertStr);
}