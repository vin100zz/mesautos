<?php

include_once "db.php";

// SQL
$marques = DBAccess::query
(
	"SELECT * FROM marque
	 WHERE idMarque <> 1129"
);

// salons
$path = "../../img/salon";

$files = scandir($path);

function remove_array_item($array, $item) {
  $index = array_search($item, $array);
  if ($index !== false) {
    array_splice($array, $index, 1);
  }
  return $array;
}

$files = remove_array_item($files, '.');
$files = remove_array_item($files, '..');
$files = remove_array_item($files, 'mini');

$res = array(
  "marques" => $marques,
  "salons" => $files
);

print json_encode($res, JSON_PRETTY_PRINT);

?>

