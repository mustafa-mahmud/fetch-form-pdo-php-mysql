<?php
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'fetch-form';
$dsn = "mysql:host=$host;dbname=$db";

try {
  $conn = new PDO($dsn, $user, $password);
  //set default fetch array mode
  $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
  //set default execute() mode
  $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

} catch (PDOException $e) {
  echo $e->getMessage();
}