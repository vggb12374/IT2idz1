<?php
include("connectToDB.php");
$username = $_GET["username"];

$cursor = $usersCollection->find(['username' => $username]);
foreach ($cursor as $row) {
    echo $row["username"];
}
?>