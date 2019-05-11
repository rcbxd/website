<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name='viewport', content='width=device-width, initial-scale=1, user-scalable=no'>
    <link rel='stylesheet', href='https://fonts.googleapis.com/css?family=Varela+Round|Raleway:400,500,700'>
    <link rel='stylesheet', href='https://use.fontawesome.com/releases/v5.8.1/css/all.css', integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf', crossorigin='anonymous'>
    <link rel='stylesheet', href='static/blog_style.css'>
    <script src='https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js'></script>
    <script src='https://unpkg.com/smoothscroll-anchor-polyfill'></script>
    <?php
        $id = $_GET['id'];

        $connection = mysqli_connect('127.0.0.1:3306', 'u334366972_rbcxd', 'GFWVm7da4d99', 'u334366972_test');

        $result = mysqli_query($connection, 'SELECT title FROM blog WHERE id = ' . $id . '');

        $te = mysqli_fetch_assoc($result);

        echo '<title>' . $te['title'] . '</title>';
    
echo "</head>";
echo "<body>";

    $ip     = $_SERVER['REMOTE_ADDR']; 
    $json   = file_get_contents( 'http://smart-ip.net/geoip-json/' . $ip); 

    $ipData = json_decode( $json, true);

    if ($ipData['timezone']) {
        $tz = new DateTimeZone( $ipData['timezone']);
        $now = new DateTime($te['date'], $tz); 
    } else {
   
    }

    echo $now;

    echo '<h1 class="title">' . $te['title'] . '</h1>';

    $result = mysqli_query($connection, 'SELECT * FROM blog WHERE id = ' . $id . '');

    $article = mysqli_fetch_assoc($result);

    $views = $article['views']+1;

    echo '<h2 class="data">' . $views . ' views. </h2>';

    $phpdate = strtotime( $article['date'] );
    $normdate = date( 'Y-m-d H:i', $phpdate );

    echo '<h2 class="data">Posted on ' . $normdate . '.</h2>';

    echo '<p class="article">' . $article['body'] . '</p>';

    echo '<img src="' . $article['imgpath'] . '" class="image">';

    $query = "UPDATE blog SET views = " . $views . " WHERE id = " . $id;
    mysqli_query($connection, $query);

    mysqli_close($connection);

    ?>

</body>
</html>

