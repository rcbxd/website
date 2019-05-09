<?php
    $name = $_GET['name'];
    if($name == ''){
        header('Location: http://blog.rcbxd.xyz/login.php');
        die();
    }
    echo "welcome, " . $name;
?>