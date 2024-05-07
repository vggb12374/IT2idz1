<?php
session_start();
$username = $_SESSION["username"];
include("connectToDB.php");

$startNote = [];
$newNote = [];

$startUserNote = [
    "username" => $username
];

$i = 0;

foreach ($_GET as $startNoteKey => $startNoteValue) {
    $startUserNote[$startNoteKey] = $startNoteValue;

    $startNote[$i] = $startNoteKey;
    $startNote[$i + 1] = $startNoteValue;
    $i += 2;
}

$i = 0;

foreach ($_POST as $newNoteKey => $newNoteValue) {
    $newNote[$i] = $newNoteKey;
    $newNote[$i + 1] = $newNoteValue;
    $i += 2;
}

$note = [];

for ($i = 0; $i < count($newNote); $i++) { 
    if ($startNote[$i] == $newNote[$i]) {
        $note[$i] = $startNote[$i];
    } else {
        $note[$i] = $newNote[$i];
    }
}

$newUserNote = [
    "username" => $username
];

for ($i = 0; $i < count($note); $i++) { 
    $newUserNote[$note[$i]] = $note[$i + 1];
    $i++;
}

$cursor = $usersNotesCollection->replaceOne($startUserNote, $newUserNote);

$cursor = $usersNotesCollection->find(['username' => $username], ['projection' => ['_id' => 0, 'username' => 0]]);

class yourRecords {
    public $sort;
    public $note;
}

$res = new yourRecords();

$res -> note = "";

$sortArray = [];

foreach ($cursor as $row) {
    $res -> note .= "<div>";
    $res -> note .= "<input type='button' value='Редагувати' onclick='changeNote()'>";
    $res -> note .= " ";
    $res -> note .= "<input type='button' value='Видалити' onclick='deleteNote()'>";

    foreach ($row as $key => $value) {
        $res -> note .= "<span> <strong>$key</strong><b>: </b><em>$value</em><b> ; </b></span>";

        $sortArray[] = $key;
    }

    $res -> note .= "<input type='button' value='Додати поле' onclick='addField()' hidden>";
    $res -> note .= " ";
    $res -> note .= "<input type='button' value='Зберегти зміни' onclick='applyNoteChanges()' hidden>";
    $res -> note .= "</div>";
    $res -> note .= "<br>";
}

for ($i = 0; $i < count($sortArray) - 1; $i++) { 
    for ($j = $i + 1; $j < count($sortArray); $j++) { 
        if ($sortArray[$i] === $sortArray[$j]) {
            $sortArray[$j] = 0;
        }
    }
}

$res -> sort = "<span>Відсортувати за параметром: </span>";
$res -> sort .= "<select id='selectParam' onchange='sortNotes()'>";
$res -> sort .= "<option>Обрати параметр</option>";

for ($i = 0; $i < count($sortArray); $i++) {
    if ($sortArray[$i] !== 0) {
        $res -> sort .= "<option>$sortArray[$i]</option>";
    }
}

$res -> sort .= "</select>";
$res -> sort .= " ";
$res -> sort .= "<span id='sortByValue' hidden>Відсортувати за значенням: </span>";
$res -> sort .= "<input type='text' id='inputValue' oninput='sortNotes()' hidden>";

echo json_encode($res);
?>