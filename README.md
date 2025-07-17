Assessment details  
Required languages: HTML, CSS, JavaScript.  
I would like you to build a single HTML web page that consists of a header, body and footer.

Header  
I would like the header to consist of the following:
1. On the left-hand side a logo (can be any logo)
2. A search bar that sits centrally
3. On the right-hand side account Icon and a help icon
4. Underneath this will sit a horizontal navigation bar that has 5 options to choose from.

The styling of the header is up to you, but it needs to be responsive.  
Don’t worry about creating links, as this is just a test to see your creative flair and your HTML and CSS skills.

**I wasn't sure if the search bar had to be exactly centered.**  
**Instead I've spaced elements 1-3 equally as it's a little easier to make it responsive that way.**

Body  
This will consist of an account set up form, that when submitted will print the information below.  
The fields for the form are:
- Name
- Email Address
- Phone
- Postcode

I want you to place the submit button outside of this form and the action to be controlled by an onClick function.

**I've implemented this via addEventListener() rather than an "onClick" function per se.**  
**This is to improve separation of concerns and content-security-policy compatibility.**

The form must have the following validation:  
- The email field will only accept email addresses that end in “gmail.com” or “outlook.com”.
- The phone field only allows numbers and has a maximum of 11 digits.

**I've interpreted these requirements as follows:**  

**Name**
- **Can be left empty.**

**Email Address**  
- **Should end in "@gmail.com" or "@outlook.com" (so we wouldn't accept e.g. someone@bigmail.com).**
- **The above domain name check should be case insensitive**
- **Must be specified.**

**Phone**  
- **Allows spaces as well, only counting the digits.**
- **Can be left empty.**

**Postcode**
- **Can be left empty.**

**To better conform with the above requirements however I've added a normalisation step as well.**  
**(so e.g. the final phone number is stripped of the spaces).**

If either of these points fail, the form is not submitted, and an error message is shown explaining
why it failed.

**My preference is usually to do the validation in real-time and disable the submit button if any of the fields**  
**are invalid but it looks like the expectation here was to only validate when attempting to submit the form**  
**so that's how I've implemented it.**  

Footer  
I want you to keep the footer simple. It just needs to sit at the bottom of the page, regardless of the
size of the body.

**I found this a little bit ambiguous but have assumed that it needs to sit at the bottom of the viewport**  
**if the total content (header + main content + footer) is shorter than that.**

The footer will just contain a copyright message and the year is brought in
dynamically using todays date.
