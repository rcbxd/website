<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>login to admin panel</title>
    <meta name='viewport', content='width=device-width, initial-scale=1, user-scalable=no'>
    <meta name='description', content='login'>
    <link rel='stylesheet', href='https://use.fontawesome.com/releases/v5.8.1/css/all.css', integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf', crossorigin='anonymous'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
    <?php 
        require "session.php";
        $login = $_POST['login'];
        $password = $_POST['pass'];
        $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');
        $result = mysqli_query($connection, 'SELECT * FROM admins');
        
        if(empty($login) && empty($password) && isset($password) && isset($login)){
            echo '<div class="alert alert-danger" role="alert">The login field is requierd</div>';
            echo '<div class="alert alert-danger" role="alert">The password field is required</div>';
        }
    
        if(empty($login) && !empty($password) && isset($password) && isset($login)){
            echo '<div class="alert alert-danger" role="alert">The login field is requierd</div>';
        }
        if(empty($password) && !empty($login) && isset($password) && isset($login)){
            echo '<div class="alert alert-danger" role="alert">The password field is required</div>';
        }
        
        else if(!empty($login) && !empty($password)){
            while($a = mysqli_fetch_assoc($result)){
                if($a['login'] == $login && $a['password'] == $password){
                    $_SESSION['login'] = $login;
                    $_SESSION['remember_me'] = $_POST['remember'];
                    if(isset($_SESSION['remember_me'])){
                        setcookie("login", $login, time() + (86400 * 30), 'blog.rcbxd.xyz'); 
                        setcookie("password", $password, time() + (86400 * 30), 'blog.rcbxd.xyz'); 
                    }
                    header('Location: http://blog.rcbxd.xyz/admin/');
                    die();
                }
            }
            echo '<div class="alert alert-danger" role="alert">Incorrect password</div>';
        }
        
        mysqli_close($connection);
    ?>
    <div class="mt-5">
        <h1 class="mx-auto text-center" style="width: 80%">Log In to access the admin control panel</h1>
        <form action="login.php" method="POST" class="mx-auto align-middle" style="max-width: 90%" >
        <div class="form-group mt-4">
            <label for="l">Your login: </label>
            <input type="login" class="form-control" name="login" id="l">
        </div>
        <div class="form-group">   
            <label for="p">Your password: </label>
            <input type="password" class="form-control" name="pass" id="p">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="check" name="remember">
            <label class="form-check-label" for="check">Remember Me</label>
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
    </form>
    </div>
    
    
</body>
