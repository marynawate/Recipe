<?php
session_start();
include 'connectdb.php';

// Check if form is submitted
if (isset($_POST['submit'])) {
    // Retrieve and sanitize input
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Prepare the SQL statement to retrieve user data
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND email = ?");
    $stmt->bind_param("ss", $username, $email);
    
 
    try{
        $stmt->execute();
    }catch(error){
        $error[] = 'Error registering user!';
    }
    $result = $stmt->get_result();
    // Execute the query
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;
    header('Location: welcome.php'); 
    exit();
    // Check if the user exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verify the hashed password
        if (password_verify($password, $row['password'])) {
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            header('Location: welcome.php'); 
            exit();
        } else {
            $error[] = 'Incorrect password!';
        }
    } else {
        $error[] = 'Incorrect username or email!';
    }

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
    <title> Log in</title>
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
    <div class="container">
        <div class="form-container">
            <div class="login-form">
                <form id="loginForm" action="login.php" method="POST">  
           <h2>Login</h2>
           <?php if (isset($error)) { foreach ($error as $err) { echo "<p style='color:red;'>$err</p>"; } } ?>
          <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        
         <label for="password">Password:</label>
         <input type="password" id="password" name="password" required>
         <button type="submit" name="submit">Login</button>
</form>
</body>
</html>
