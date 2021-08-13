<?php
require_once 'conn.php';

$data = json_decode(file_get_contents("php://input"));

if ($data) {
  $id = intval(strip_tags($data->id));
  $name = filter_var(strip_tags($data->name), FILTER_SANITIZE_STRING);
  $password = strip_tags($data->password);

  $sql = "UPDATE users SET name=:name,password=:password WHERE id=:id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(['id' => $id, 'name' => $name, 'password' => $password]);

  if ($stmt->rowCount()) {
    echo 'Update Successfully!';
  } else {
    echo 'Something went wrong!';
  }

}

?>