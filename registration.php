<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Реєстрація</title>
    <script src="script.js"></script>
</head>
<body>
    <form action="" method="post">
        <label for="username">Введіть ім'я користувача:</label>
        <input type="text" name="username" id="username" onchange="checkUserRegister()" required>
        <label for="password">Введіть пароль:</label>
        <input type="text" name="password" id="password" required>
        <input type="submit" name="register" value="Зареєструватися">
    </form>
    <?php
    if (isset($_POST["register"])) {
        include("connectToDB.php");
        $username = $_POST["username"];
        $password = $_POST["password"];

        $cursor = $usersCollection->find(['username' => $username]);
        foreach ($cursor as $row) {
            $user = $row;
        }

        if ($user) {
            echo "<br>";
            echo "<div>Користувач з таким ім'ям вже зареєстрований!</div>";
        } else {
            $usersCollection->insertOne(['username' => $username, 'password' => $password]);
            header("Location: afterRegister.php");
            exit();
        }
    }
    ?>
    <div id="registerErrorMsg"></div>
</body>
</html>