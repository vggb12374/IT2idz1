<?php
session_start();
$username = $_SESSION["username"];
include("connectToDB.php");

$param = $_GET["param"];
$value = $_GET["value"];

if ($param === "Обрати параметр") {
    $cursor = $usersNotesCollection->find(['username' => $username], ['projection' => ['_id' => 0, 'username' => 0]]);
} else {
    if ($value === "") {
        $cursor = $usersNotesCollection->find(['username' => $username, $param => ['$exists' => true]], ['projection' => ['_id' => 0, 'username' => 0]]);
    } else {
        $cursor = $usersNotesCollection->find(['username' => $username, $param => ['$regex' => new MongoDB\BSON\Regex($value, 'i')]], ['projection' => ['_id' => 0, 'username' => 0]]);
    }
}

$res = "";

foreach ($cursor as $row) {
    $res .= "<div>";
    $res .= "<input type='button' value='Редагувати' onclick='changeNote()'>";
    $res .= " ";
    $res .= "<input type='button' value='Видалити' onclick='deleteNote()'>";
    foreach ($row as $key => $value) {
        $res .= "<span> <strong>$key</strong><b>: </b><em>$value</em><b> ; </b></span>";
    }
    $res .= "<input type='button' value='Додати поле' onclick='addField()' hidden>";
    $res .= " ";
    $res .= "<input type='button' value='Зберегти зміни' onclick='applyNoteChanges()' hidden>";
    $res .= "</div>";
    $res .= "<br>";
}

echo $res;
?>