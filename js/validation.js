"use strict";
/* === NORMALISATION AND VALIDATION ===
(Must be loaded as a script prior to "signup.js")
*/

/**
 * Set up validation and submission handling for the given form element
 * 
 * @param {HTMLFormElement}    formEl          -- Form element to process
 * @param {HTMLButtonElement}  submitButtonEl  -- Form submission button element
 * @param {object}             jsNormalisers   -- Arrays of normalisation funcs, keyed by field name
 * @param {object}             jsValidators    -- Arrays of validation funcs keyed by field name
 * @param {function}           submitCallback  -- Callback if validation passes 
 */
function setupFormValidation(formEl, submitButtonEl, jsNormalisers, jsValidators, submitCallback) {
	const formInputEls = formEl.querySelectorAll('input');
	submitButtonEl.addEventListener('click', () => {
		const normalisedFormValues = normaliseFormFields(formInputEls, jsNormalisers);
		const errors = validateFormFields(formInputEls, normalisedFormValues, jsValidators);
		if (errors) {
			displayErrors(errors);
		} else {
			submitCallback(normalisedFormValues);
		}
	});

	formEl.addEventListener('input', (e) => {
		setValidationStatus(e.target, "");
	});
}

/**
 * Get normalised values for the given form input elements
 * 
 * @param   {NodeListOf<HTMLInputElement>}  formInputEls          -- Form input elements to process
 * @param   {object}                        jsNormalisers         -- Arrays of normalisation funcs, keyed by field name
 * @returns {object}                        normalisedFormValues  -- Values after normalisation, keyed by field name
 */
function normaliseFormFields(formInputEls, jsNormalisers) {
	const normalisedFormValues = {};
	for (const formInputEl of formInputEls) {
		const [fieldName, fieldValue] = [formInputEl.name, formInputEl.value];
		normalisedFormValues[fieldName] = fieldValue ;

		// Process field value with each normalisation function in turn
		for (const normaliserFunc of jsNormalisers[fieldName] ?? []) {
			normalisedFormValues[fieldName] = normaliserFunc(normalisedFormValues[fieldName]) ;
		}
	}
	return normalisedFormValues ;
}

/**
 * Validate the given form input elements
 * Checks HTML5 validity status first then runs the specified javascript validation functions in turn
 * Note: We only return the first error for each field
 * 
 * @param   {NodeListOf<HTMLInputElement>}  formInputEls          -- Form input elements to check
 * @param   {object}                        normalisedFormValues  -- Values after normalisation, keyed by field name
 * @param   {object}                        jsValidators          -- Arrays of validation funcs, keyed by field name
 * @returns {object}                        errors                -- Error for each invalid field, keyed by field name
 */
function validateFormFields(formInputEls, normalisedFormValues, jsValidators) {
	const errors = {};
	for (const formInputEl of formInputEls) {
		const fieldName = formInputEl.name ;
		const validityState = formInputEl.validity;
		// Check the HTML5 validation state first as that covers the most basic rules
		if (!validityState.valid) {
			errors[fieldName] = formInputEl.dataset.validationerror;
		} else {
			// HTML5 validation passed so check against the javascript validators
			if (jsValidators[fieldName]) {
				const fieldValue = normalisedFormValues[fieldName] ;
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

// ============ Normalisation functions ============

/**
 * Normalise the domain name to lowercase in the given email address
 * 
 * @param  {string}  emailAddr  -- Email address to normalise
 * @return {string}  emailAddr  -- Address after normalisation
 */
function convertEmailDomainToLC(emailAddr) {
	const segs = emailAddr.split('@');
	if (segs.length < 2) return emailAddr ;
	return segs.slice(0, segs.length - 1).join('@') + '@' + (segs[segs.length - 1].toLowerCase()) ;
}

/**
 * Remove all spaces in the given string
 * 
 * @param  {string}  value  -- String to process
 * @return {string}  value  -- String with all spaces removed
 */
function removeAllSpaces(value) {
	return value.replaceAll(' ', '');
}

// ============ Validation functions ============

/**
 * Validate that a string ends in one of a set of postfixes
 * 
 * @param  {string}       value        -- String to validate
 * @param  {...string}    postfixList  -- List of allowed postfixes
 * @return {string|null}  errorStr     -- Error string if validation fails, otherwise null
 */
function endsIn(value, ...postfixList) {
	for (const postfix of postfixList) {
		const re = postfix + "$";
		const regexp = new RegExp(re);
		if (value.match(regexp)) {
			return null;
		}
	}
	return "Must end in " + postfixList.join(" or ");
}

/**
 * Validate that a string doesn't exceed the maximum allowed length
 * 
 * @param  {string}       value     -- String to validate
 * @param  {number}       maxLen    -- Maximum length
 * @return {string|null}  errorStr  -- Error string if validation fails, otherwise null
 */
function isMaxLen(value, maxLen) {
	return (value.length <= maxLen) ? null : `Must be maximum of ${maxLen} characters`;
}