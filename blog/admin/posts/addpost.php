<?php 
    
    require '../session.php';
    
    $name = $_SESSION['name'];
    
    if(!empty($name)){
        header('Location: ../login.php');
    }

    $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');
    
    $title = $_POST['title'];
    $body = $_POST['body'];
    
    $query = mysqli_query($connection, "INSERT INTO blog (title, body) VALUES ('" . $title . "', '" . $body . "')");
    mysqli_close($connection);
    header('Location: ../posts')
?>