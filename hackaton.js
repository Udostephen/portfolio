// Smooth Scrolling for Navigation and Breadcrumbs
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 60, // Adding offset to ensure smooth scroll places the section nicely
            behavior: "smooth"
        });
    });
});

// Scroll Animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger animation when 20% of the section is visible
};

const fadeInSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // Adds the fade-in class when section is in view
        } else {
            entry.target.classList.remove('fade-in'); // Optionally, remove class when the section is not in view
        }
    });
};

const observer = new IntersectionObserver(fadeInSection, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Form Validation
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input, textarea');
form.addEventListener('submit', function (e) {
    let formValid = true;

    inputs.forEach(input => {
        if (input.required && !input.value.trim()) {
            formValid = false;
            input.style.border = '2px solid red'; // Highlight invalid fields
            showValidationMessage(input, 'This field is required');
        } else {
            input.style.border = '1px solid #ccc';
            hideValidationMessage(input);
        }
    });

    if (!formValid) {
        e.preventDefault();
    }
});

const showValidationMessage = (input, message) => {
    let validationMessage = input.nextElementSibling;

    if (!validationMessage || !validationMessage.classList.contains('validation-message')) {
        validationMessage = document.createElement('div');
        validationMessage.classList.add('validation-message');
        input.parentElement.appendChild(validationMessage);
    }

    validationMessage.textContent = message;
    validationMessage.style.color = 'red';
};

const hideValidationMessage = (input) => {
    const validationMessage = input.nextElementSibling;
    if (validationMessage && validationMessage.classList.contains('validation-message')) {
        validationMessage.remove();
    }
};

// Loading Spinner
const loadingSpinner = document.createElement('div');
loadingSpinner.classList.add('loading-spinner');
document.body.appendChild(loadingSpinner);

let isNavigating = false;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (isNavigating) return; // Prevent multiple clicks during navigation
        isNavigating = true;

        loadingSpinner.style.display = 'block'; // Show the loading spinner
        setTimeout(() => {
            loadingSpinner.style.display = 'none'; // Hide after a short delay (simulating content load)
            isNavigating = false;
        }, 1500); // Adjust time to simulate loading duration
    });
});
