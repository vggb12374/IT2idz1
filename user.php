<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Телефонна книга</title>
    <script src="script.js" defer></script>
</head>
<body onload="getStartNotes()">
    <?php
    session_start();
    $username = $_SESSION["username"];

    echo "<h3>Вітаємо, $username</h3>";

    if (isset($_POST["exit"])) {
        session_destroy();
        header("Location: index.php");
        exit();
    }
    ?>

    <form action="" method="post">
        <input type="submit" name="exit" id="exit" value="Вийти">
    </form>

    <br><br><br>

    <div>
        <input type="button" id="addNoteButton" value="Додати запис" onclick="addNote()">

        <span id="paramInfo" hidden>(Назви параметрів НЕ можуть повторюватись)</span>

        <input type="button" id="addFieldButton" value="Додати поле" onclick="addNoteField()" hidden>
        <input type="button" id="submitNote" value="Відправити" onclick="sendNote()" hidden>
    </div>

    <div>
        <h3 id="yourRecordsHeader"></h3>
        <div id="sortYourRecords"></div>
        <br>
        <div id="yourRecords"></div>
    </div>
</body>
</html>