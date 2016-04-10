<?php

$annee = $_REQUEST["annee"];

$relPath = "../..";

$path = "img/salon/" . $annee;

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
$files = remove_array_item($files, 'mini');

$salon = array(
  "annee" => $annee,
  "path" => $path,
  "photos" => $files
);

print json_encode($salon, JSON_PRETTY_PRINT);

?>

