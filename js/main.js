"use strict";
// (Must be loaded as a module or deferred script so that we don't have to worry about the "DOMContentLoaded" event)

// Set the copyright year to the user's local date
document.getElementById('copyright_year').innerText = new Date().getFullYear();

// Placeholder insertion / removal
const elsWithPlaceholders = document.querySelectorAll('[placeholder]');
for (const el of elsWithPlaceholders) {
	el.dataset.placeholder = el.placeholder;
	el.addEventListener('focus', () => {
		el.placeholder = "";
	});
	el.addEventListener('blur', () => {
		el.placeholder = el.dataset.placeholder;
	});
}