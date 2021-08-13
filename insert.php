<?php
require_once 'conn.php';

if (isset($_POST)) {
  $name = filter_var(strip_tags($_POST["insert-name"]), FILTER_SANITIZE_STRING);
  $password = strip_tags($_POST['insert-password']);

  $sql = "INSERT INTO users (name, password) VALUES (:name, :pass)";
  $stmt = $conn->prepare($sql);
  $stmt->execute(['name' => $name, 'pass' => $password]);

  if ($stmt->rowCount()) {
    echo 'Success Added';
  } else {
    echo 'Sorry someting went wrong!';
  }

}
?>