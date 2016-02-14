<?php

include_once "db.php";

// SQL
$marques = DBAccess::query
(
	"SELECT * FROM marque"
);
$modeles = DBAccess::query
(
	"SELECT * FROM modele
	JOIN marque ON modele.idMarque = marque.idMarque"
);

$response = array();
$response['marques'] = $marques;
$response['modeles'] = $modeles;

print json_encode($response, JSON_PRETTY_PRINT);


?>
