<?php
    $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');
    
    $login = $_POST['login'];
    $name = $_POST['name'];
    $pass = $_POST['pass'];
    
    $query = mysqli_query($connection, "INSERT INTO admins (login, password, name) VALUES ('". $login ."', '" . $pass . "', '" . $name . "')");
    
    mysqli_close($connection);
    header('Location: ../admin');
    die();
?>