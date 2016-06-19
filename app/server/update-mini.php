<?php

include_once "db.php";

$idModele = $_REQUEST["idModele"];
$mini = $_REQUEST["mini"];


// SQL
DBAccess::exec
(
  "UPDATE modele
  SET mini = '$mini'
  WHERE idModele = '$idModele'"
);

include_once "list-mini.php";


?>
