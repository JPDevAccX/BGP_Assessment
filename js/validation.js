"use strict";
// (Must be loaded as a script prior to "signup.js")

/**
 * Set up validation and submission handling for the given form element
 * 
 * @param {HTMLFormElement}    formEl          -- Form element to process
 * @param {HTMLButtonElement}  submitButtonEl  -- Form submission button element
 * @param {object}             jsValidators    -- Arrays of validation functions keyed by field name
 * @param {function}           submitCallback  -- Callback if validation passes 
 */
function setupFormValidation(formEl, submitButtonEl, jsValidators, submitCallback) {
	const formInputEls = formEl.querySelectorAll('input');
	submitButtonEl.addEventListener('click', () => {
		const errors = validateFormFields(formInputEls, jsValidators);
		if (errors) {
			displayErrors(errors);
		} else {
			submitCallback();
		}
	});

	formEl.addEventListener('input', (e) => {
		setValidationStatus(e.target, "");
	});
}

/**
 * Validate the given form input elements
 * Checks HTML5 validity status first then runs the specified javascript validation functions in turn
 * Note: We only return the first error for each field
 * 
 * @param   {NodeListOf<HTMLInputElement>}  formInputEls  -- Form input elements to check
 * @param   {object}                        jsValidators  -- Arrays of validation functions keyed by field name
 * @returns {object}                        errors        -- Error message for each invalid field, keyed by field name
 */
function validateFormFields(formInputEls, jsValidators) {
	const errors = {};
	for (const formInputEl of formInputEls) {
		const [fieldName, fieldValue] = [formInputEl.name, formInputEl.value];
		const validityState = formInputEl.validity;
		// Check the HTML5 validation state first as that covers the most basic rules
		if (!validityState.valid) {
			errors[fieldName] = formInputEl.dataset.validationerror;
		} else {
			// HTML5 validation passed so check against the javascript validators
			if (jsValidators[fieldName]) {
				for (const validatorFunc of jsValidators[fieldName]) {
					const error = validatorFunc(fieldValue);
					if (error) {
						errors[fieldName] = error;
						break; // (we only care about the first error)
					}
				}
			}
		}
	}
	return (Object.keys(errors).length > 0) ? errors : null;
}

/**
 * Display form-validation errors
 * 
 * @param {object} errors  -- Error message for each invalid field, keyed by field name
 */
function displayErrors(errors) {
	console.log("Form validation errors");
	for (const [fieldName, errorStr] of Object.entries(errors)) {
		const str = `${fieldName}: ${errorStr}`;
		console.log(str);
		const inputEl = document.querySelector(`input[name="${fieldName}"]`);
		setValidationStatus(inputEl, errorStr);
	}
}

/**
 * Set form input error status
 * 
 * @param {HTMLInputElement}  inputEl   -- Form input element
 * @param {string}            errorStr  -- Error message (empty string for none)
 */
function setValidationStatus(inputEl, errorStr) {
	inputEl.classList.toggle('validation-error-input', !!errorStr);
	const validationErrEl = inputEl.parentNode.querySelector('.validation-error');
	if (validationErrEl) {
		validationErrEl.innerText = errorStr ? "\u26A0 " + errorStr : "";
	}
}

// ============ Validation functions ============

/**
 * Validate that an e-mail address is in one of the allowed domains
 * 
 * @param  {string}       emailAddr   -- Email address to validate
 * @param  {...string}    domainList  -- List of allowed domains
 * @return {string|null}  errorStr    -- Error string if validation fails, otherwise null
 */
function hasEmailDomain(emailAddr, ...domainList) {
	for (const domain of domainList) {
		const re = "^.*@" + domain + "$";
		const regexp = new RegExp(re, "i");
		if (emailAddr.match(regexp)) {
			return null;
		}
	}
	return "Must be " + domainList.map(domain => "@" + domain).join(" or ");
}

/**
 * Validate that a string with all spaces removed doesn't exceed the maximum allowed length
 * 
 * @param  {string}       value     -- Value to validate
 * @param  {number}       maxLen    -- Maximum length with spaces removed
 * @return {string|null}  errorStr  -- Error string if validation fails, otherwise null
 */
function isWithinMaxLenWithoutSpaces(value, maxLen) {
	return (value.replaceAll(' ', '').length <= maxLen ? null : `Must be maximum of ${maxLen} characters`);
}