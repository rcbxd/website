<?php

    require '../session.php';

    $name = $_SESSION['name'];
    
    if(!empty($name)){
        header('Location: ../login.php');
    }

    if(isset($_POST['post'])){
        $post = $_POST['post'];
        $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');
        $query = mysqli_query($connection, 'DELETE FROM blog WHERE title = "' . $post . '"');
        mysqli_close($connection);
        header("Location: ./");
    }
    
    
    

?>