<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Логін</title>
    <script src="script.js"></script>
</head>
<body>
    <?php
    if (isset($_POST["login"])) {
        include("connectToDB.php");
        $username = $_POST["username"];
        $password = $_POST["password"];
        
        $cursor = $usersCollection->find(['username' => $username, 'password' => $password]);
        foreach ($cursor as $row) {
            $user = $row;
        }
        
        if (!$user) {
            echo "<div>Логін або пароль неправильний!</div>";
            echo "<br>";
        } else {
            session_start();
            $_SESSION["username"] = $username;
            header("Location: user.php");
            exit();
        }
    }
    ?>
    <form action="" method="post">
        <label for="username">Введіть ім'я користувача:</label>
        <input type="text" name="username" id="username" onchange="checkUserLogin()" required>
        <label for="password">Введіть пароль:</label>
        <input type="text" name="password" id="password" required>
        <input type="submit" name="login" value="Увійти">
    </form>
    <div id="loginErrorMsg"></div>
    <br>
    <a href="registration.php">Зареєструватися</a>
</body>
</html>