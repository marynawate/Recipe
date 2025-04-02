document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Basic Input Validation Function
        function validateInput(inputElement, errorMessageId, validationFunction, errorMessage) {
            inputElement.addEventListener('input', () => {
                if (!validationFunction(inputElement.value)) {
                    displayError(errorMessageId, errorMessage);
                } else {
                    clearError(errorMessageId);
                }
            });
        }

        // Name Validation (Only letters and spaces)
        validateInput(nameInput, 'name-error', (value) => /^[A-Za-z\s]+$/.test(value), 'Name must contain only letters and spaces.');

        // Name Uppercase Hint
        nameInput.addEventListener('input', () => {
            if (/[a-z]/.test(nameInput.value)) { // Check if there are any lowercase letters
                displayError('name-error', 'Name should be in uppercase.');
            } else {
                // Only clear the error if it was the uppercase error. Leave other errors
                if (document.getElementById('name-error').textContent === 'Name should be in uppercase.'){
                    clearError('name-error');
                }
            }
        });

        // Email Validation (Basic email format)
        validateInput(emailInput, 'email-error', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Invalid email format.');

        // Subject Validation (Selection required)
        subjectInput.addEventListener('change', () => {
            if (subjectInput.value === '') {
                displayError('subject-error', 'Please select a subject.');
            } else {
                clearError('subject-error');
            }
        });

        // Message Validation (Required, you can add length constraints if needed)
        messageInput.addEventListener('input', () => {
            if (messageInput.value === '') {
                displayError('message-error', 'Please enter a message.');
            } else {
                clearError('message-error');
            }
        });

        // Form Submission Validation
        contactForm.addEventListener('submit', (event) => {
            let isValid = true;
            clearErrors();

            if (!/^[A-Za-z\s]+$/.test(nameInput.value)) {
                displayError('name-error', 'Name must contain only letters and spaces.');
                isValid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                displayError('email-error', 'Invalid email format.');
                isValid = false;
            }
            if (subjectInput.value === '') {
                displayError('subject-error', 'Please select a subject.');
                isValid = false;
            }
            if (messageInput.value === '') {
                displayError('message-error', 'Please enter a message.');
                isValid = false;
            }
            if (/[a-z]/.test(nameInput.value)){
                displayError('name-error', 'Name should be in uppercase.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                alert('Form submitted!'); // Simple success message
            }
        });

        // Helper Functions
        function displayError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.color = 'red';
        }

        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = '';
            errorElement.style.color = '';
        }

        function clearErrors() {
            const errors = document.querySelectorAll('.error');
            errors.forEach(error => {
                error.textContent = '';
                error.style.color = '';
            });
        }
    }
});