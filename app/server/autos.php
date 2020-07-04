<?php

include_once "db.php";

function remove_array_item($array, $item) {
  $index = array_search($item, $array);
  if ($index !== false) {
    array_splice($array, $index, 1);
  }
  return $array;
}

function listDirectories($path) {
	$files = scandir($path);

	$files = remove_array_item($files, '.');
	$files = remove_array_item($files, '..');
	$files = remove_array_item($files, 'mini');

  return $files;
}

// SQL
$marques = DBAccess::query
(
	"SELECT * FROM marque
	 WHERE idMarque <> 1129"
);

$salons = listDirectories("../../img/salon");

$courseAnnees = array();
$courses = listDirectories("../../img/course");
foreach ($courses as $course) {
  $courseAnnees[$course] = listDirectories("../../img/course/" . $course);
}


$res = array(
  "marques" => $marques,
  "salons" => $salons,
  "courses" => $courseAnnees
);

print json_encode($res, JSON_PRETTY_PRINT);

?>

