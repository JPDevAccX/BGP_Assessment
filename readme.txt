Assessment details

Required languages: HTML, CSS, JavaScript.
I would like you to build a single HTML web page that consists of a header, body and footer.
Header
I would like the header to consist of the following:
1. On the left-hand side a logo (can be any logo)
2. A search bar that sits centrally
3. On the right-hand side account Icon and a help icon
4. Underneath this will sit a horizontal navigation bar that has 5 options to choose from.
The styling of the header is up to you, but it needs to be responsive. Don’t worry about creating
links, as this is just a test to see your creative flair and your HTML and CSS skills.

> I wasn't sure whether a hamburger menu was expected on mobile.
> As the items still reasonably fit even down to 320px I decided against adding one.

Body
This will consist of an account set up form, that when submitted will print the information below.
The fields for the form are:
• Name
• Email Address
• Phone
• Postcode
I want you to place the submit button outside of this form and the action to be controlled by an
onClick function.

> I've implemented this via addEventListener() rather than an "onClick" function per se.
> This is to improve separation of concerns and to avoid problems if a content-security-policy is later added.

The form must have the following validation:
• The email field will only accept email addresses that end in “gmail.com” or “outlook.com”.
• The phone field only allows numbers and has a maximum of 11 digits.

> I've interpreted these requirements as follows:
> Email address:
>> Is case insensitive (as they're normally treated as such by mail servers)
>> Should end in "@gmail.com" or "@outlook.com" (so we wouldn't accept e.g. someone@bigmail.com)
> Phone number:
>> Allows spaces as well, only counting the digits (also assumes the backend would accept that too)
>> Can be left empty

If either of these points fail, the form is not submitted, and an error message is shown explaining
why it failed.

> My preference is usually to do the validation in real-time and disable the submit button if any of the fields
> are invalid but it looks like the expectation here was to only validate when attempting to submit the form
> so that's how I've implemented it.

Footer
I want you to keep the footer simple. It just needs to sit at the bottom of the page, regardless of the
size of the body.

> I found this a bit ambiguous but have assumed that it needs to sit at the bottom of the viewport if the
> total content (header + body + footer) is shorter than that.

The footer will just contain a copyright message and the year is brought in
dynamically using todays date.