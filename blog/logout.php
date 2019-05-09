<?php 
    require 'session.php';
    unset($_SESSION['login']);
    header('Location: /index.php');
?>