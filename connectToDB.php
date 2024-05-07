<?php
require_once __DIR__ . "/vendor/autoload.php";
$usersCollection = (new MongoDB\Client)->mongodb_td->users;
$usersNotesCollection = (new MongoDB\Client)->mongodb_td->usersNotes;
?>