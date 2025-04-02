<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: profile.html'); // If not logged in, redirect to login page
    exit();
}

echo "Welcome, " . $_SESSION['username'] . "<br>";
echo "Email: " . $_SESSION['email'] . "<br>";
?>

<a href="logout.php">Logout</a>
