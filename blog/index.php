<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>rcbxd's blog</title>
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

    $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');

    if($connection != true){
        header('Location: ./404');
    }

    echo '<h1 class="title">rcbxd\'s blog</h1>';
    echo '<a href="/admin" class="admin">Admin panel</a>';


    $result = mysqli_query($connection, "SELECT * FROM blog ORDER BY date DESC")

    ?>

    <ul class="posts">
        <?php
            while(($a = mysqli_fetch_assoc($result))){
                $phpdate = strtotime( $a['date'] );
                $normdate = date( 'Y-m-d H:i', $phpdate );
                echo '<li><form action="article.php">
                    <input type="hidden" value="' . $a['id'] . '" name="id">
                    <p class="blog_title">' . $a['title'] . '</p>
                    <p>posted on ' . $normdate . '</p>
                    <input type="submit" value="view post" class="view_btn">
                    </form></li><hr>';
            }
        ?>
    </ul>

</body>
</html>

