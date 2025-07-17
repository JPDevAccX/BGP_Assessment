"use strict";
/* === SIGNUP FORM HANDLING ===
(Must be loaded as a module or deferred script so that we don't have to worry about the "DOMContentLoaded" event)
*/

// Setup for account form normalisation / validation / submission
const submitButtonEl = document.querySelector('.form-submit-button');
const formEl = document.querySelector('.form');
const jsNormalisers = {
	'name': [(value) => value.trim()],
	'email': [(value) => convertEmailDomainToLC(value)],
	'phone': [(value) => removeAllSpaces(value, 11)],
	'postcode': [(value) => value.trim(), (value) => value.toUpperCase()]
};
const jsValidators = {
	'email': [(value) => endsIn(value, '@gmail.com', '@outlook.com')],
	'phone': [(value) => isMaxLen(value, 11)]
};
setupFormValidation(formEl, submitButtonEl, jsNormalisers, jsValidators, submitForm)

/**
 * Submission handler (just logs the form values to the console and displays them in an alert)
 * 
 * @param {object}  normalisedFormValues  -- Values after normalisation, keyed by field name
 */
function submitForm(normalisedFormValues) {
	console.info("Submitting form (with normalised values)...");
	let alertStr = "Submitting form (with normalised values)...\n";
	for (const [fieldName, fieldValue] of Object.entries(normalisedFormValues)) {
		const str = `${fieldName}: ${fieldValue}`;
		console.info(str);
		alertStr += str + "\n";
	}
	alert(alertStr);
}