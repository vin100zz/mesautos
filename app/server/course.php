<?php

$nom = $_REQUEST["nom"];
$annee = $_REQUEST["annee"];

$relPath = "../..";

$path = "img/course/" . $nom . "/" . $annee;

$files = scandir($relPath . "/" . $path);

function remove_array_item($array, $item) {
  $index = array_search($item, $array);
  if ($index !== false) {
    array_splice($array, $index, 1);
  }
  return $array;
}

$files = remove_array_item($files, '.');
$files = remove_array_item($files, '..');
$files = remove_array_item($files, '.git');
$files = remove_array_item($files, 'mini');

$course = array(
  "nom" => $nom,
  "annee" => $annee,
  "path" => $path,
  "photos" => $files
);

print json_encode($course, JSON_PRETTY_PRINT);

?>

