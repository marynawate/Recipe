document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.querySelector('.container');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    signupLink.addEventListener('click', (event) => {
        event.preventDefault();
        container.classList.add("right-panel-active");
    });

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        container.classList.remove("right-panel-active");
    });

    // Signup Form Validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            let isValid = true;
            clearErrors();

            const usernameInput = signupForm.querySelector('[name="username"]');
            const emailInput = signupForm.querySelector('[name="email"]');
            const passwordInput = signupForm.querySelector('[name="password"]');

            // Username Validation
            if (!/^[a-zA-Z0-9_-]{3,16}$/.test(usernameInput.value)) {
                displayError('username-error', 'Username must be 3-16 characters, alphanumeric, dashes or underscores.');
                isValid = false;
            }

            // Email Validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                displayError('email-error', 'Invalid email format.');
                isValid = false;
            }

            // Password Validation
            const passwordStrength = checkPasswordStrength(passwordInput.value);
            if (passwordStrength < 3) { // Require at least a "good" password
                displayError('password-error', 'Password must be strong (at least 8 characters, mixed case, numbers, symbols).');
                isValid = false;
            }

            // Simulated Username Uniqueness Check (Replace with actual server-side check)
            if (isUsernameTaken(usernameInput.value)) {
                displayError('username-error', 'Username already taken.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                alert('Signup successful!'); // Replace with actual server-side processing
            }
        });
    }

    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            let isValid = true;
            clearErrors();

            const emailInput = loginForm.querySelector('[name="email"]');
            const passwordInput = loginForm.querySelector('[name="password"]');

            // Email Validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                displayError('email-error', 'Invalid email format.');
                isValid = false;
            }

            // Password Validation (Simpler for login)
            if (passwordInput.value.length < 6) {
                displayError('password-error', 'Password must be at least 6 characters.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                alert('Login successful!'); // Replace with actual server-side processing
            }
        });
    }

    // Helper Functions
    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (!errorElement) {
            const newErrorElement = document.createElement('p');
            newErrorElement.id = elementId;
            newErrorElement.classList.add('error');
            newErrorElement.textContent = message;
            newErrorElement.style.color = 'red';
            const inputElement = document.querySelector(`[name="${elementId.replace('-error', '')}"]`);
            inputElement.parentNode.insertBefore(newErrorElement, inputElement.nextSibling);

        } else {
            errorElement.textContent = message;
            errorElement.style.color = 'red';
        }

    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.color = '';
        }
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => {
            error.textContent = '';
            error.style.color = '';
        });
    }

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length > 7) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    }

    // Simulated Username Uniqueness Check (Replace with actual server-side check)
    function isUsernameTaken(username) {
        const takenUsernames = ['testuser', 'admin', 'example']; // Replace with actual database check
        return takenUsernames.includes(username);
    }
});