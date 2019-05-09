<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>login to admin panel</title>
    <meta name='viewport', content='width=device-width, initial-scale=1, user-scalable=no'>
    <meta name='description', content='rcbxd blog'>
    <link rel='stylesheet', href='https://fonts.googleapis.com/css?family=Varela+Round|Raleway:400,500,700'>
    <link rel='stylesheet', href='https://use.fontawesome.com/releases/v5.8.1/css/all.css', integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf', crossorigin='anonymous'>
    <link rel='stylesheet', href='static/blog_style.css'>
    <script src='https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js'></script>
    <script src='https://unpkg.com/smoothscroll-anchor-polyfill'></script>
</head>
<body>
    <?php 
        $login = $_POST['login'];
        $password = $_POST['pass'];
        $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');
        $result = mysqli_query($connection, 'SELECT * FROM admins');
        
        while($a = mysqli_fetch_assoc($result)){
            if($a['login'] == $login && $a['password'] == $password){
                header('Location: http://blog.rcbxd.xyz/admin.php?name='. $a['name'] .'');
                die();
            }
            else {
                if($login != ''){
                    echo "incorrect password";
                }
            }
        }
        
        mysqli_close($connection);
    ?>
    <form action="login.php" method="POST">
        <label for="l">Your login: </label>
        <input type="login" name="login" id="l">
        <label for="p">Your password: </label>
        <input type="password" name="pass" id="p">
        <input type="submit">
    </form>
    
</body>