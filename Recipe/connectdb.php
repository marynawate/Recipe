<?php
$servername = "localhost"; // Database host
$username = "root";        // Default MySQL username in XAMPP
$password = "";            // Default MySQL password in XAMPP
$dbname = "phoenix cusines"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
