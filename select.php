<?php
require_once 'conn.php';

if (isset($_GET)) {
  $sql = "SELECT * FROM users";
  $stmt = $conn->prepare($sql);
  $stmt->execute();

  if ($stmt->rowCount()) {
    $res = $stmt->fetchAll();
    $data = json_encode($res);

    echo $data;
  } else {
    echo 'There is no row';
  }
}

?>