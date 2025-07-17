"use strict";
/* === GENERAL SITE CODE ===
(Must be loaded as a module or deferred script so that we don't have to worry about the "DOMContentLoaded" event)
*/

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

// Hamburger button handling
const headerBottomListEl = document.querySelector('.header-bottom ul');
document.addEventListener('click', (e) => {
	// Toggle if hamburger button clicked OR for any click if the menu is currently open
	if (e.target.closest('#hamburger_button') || !headerBottomListEl.classList.contains('mobile-closed')) {
		headerBottomListEl.classList.toggle('mobile-closed');
	}
});