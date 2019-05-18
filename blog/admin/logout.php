<?php 
    require 'session.php';
    unset($_SESSION['login']);
    setcookie("login");
    setcookie("password");
    header('Location: /index.php');
?>