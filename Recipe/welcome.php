<?php
include'connectdb.php';
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: login.php'); // If not logged in, redirect to login page
    exit();
}
echo "Welcome, " . $_SESSION['username'] . "<br>";

?>