<?php
session_start();
include 'connectdb.php';

// Check if form is submitted
if (isset($_POST['submit'])) {
    // Retrieve and sanitize input
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $password_hash = password_hash($password, PASSWORD_DEFAULT); // Hash the password

    // Prepare the SQL statement to insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password_hash);
    
    try{
        $stmt->execute();
    }catch(error){
        $error[] = 'Error registering user!';
    }

    // Execute the query
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;
    header('Location: login.php'); // Redirect to a welcome or dashboard page
    exit();


    // Close statement
    $stmt->close();
}

// Close database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="STYLES.css">
</head>
<body>
<header>
        <h1>Login</h1>
    </header>
    <nav>
        <a href="index.html">Home</a>
        <a href="recipes.html">Recipes</a>
        <a href="create-recipe.html">Create Recipe</a>
        <a href="signup.php">Sign Up</a>
        <a href="login.php">Log In</a>
        <a href="profile.php">Profile</a>
        <a href="contact.html">Contact Us</a>
    </nav>
    <div class="form-container">
<div class="signup-form">
                <form id="signupForm" action="signup.php" method="POST">
                    <h1>Hello, Friend!</h1>
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit" class="button">Signup</button>
                    <p class="message">Already registered? <a href="login.php" id="loginLink">Sign in</a></p>
                </form>
            </div>
        </div>
    </div>
    <script src="login-signup.js">
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
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        let username = signupForm.username.value.trim();
        let email = signupForm.email.value.trim();
        let password = signupForm.password.value.trim();

        let errors = [];

        // Username validation
        if (username === '') {
            errors.push('Username is required.');
        } else if (username.length < 3) {
            errors.push('Username must be at least 3 characters long.');
        }

        // Email validation
        if (email === '') {
            errors.push('Email is required.');
        } else if (!isValidEmail(email)) {
            errors.push('Invalid email format.');
        }

        // Password validation
        if (password === '') {
            errors.push('Password is required.');
        } else if (password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }

        if (errors.length > 0) {
            event.preventDefault(); // Prevent form submission
            displayErrors(errors);
        } else {
            // Clear any previous errors if validation passes
            clearErrors();
            //Display success alert
            alert("Signup successful!");
            // Optionally, you might want to redirect the user or perform other actions here:
            // window.location.href = "login.php"; // Redirect to login page
        }
    });

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayErrors(errors) {
        clearErrors(); // Clear previous errors before displaying new ones
        const formContainer = document.querySelector('.form-container');
        const errorList = document.createElement('ul');
        errorList.classList.add('error-list');

        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });

        formContainer.appendChild(errorList);
    }

    function clearErrors() {
        const existingErrorList = document.querySelector('.error-list');
        if (existingErrorList) {
            existingErrorList.remove();
        }
    }
});
    </script>
    
</body>
</html>