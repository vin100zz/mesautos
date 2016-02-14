<?php

include_once "db.php";

$idModele = $_REQUEST["id"];

// SQL
$marque = DBAccess::querySingle
(
	"SELECT * FROM marque WHERE idMarque=(SELECT idMarque FROM modele WHERE idModele='$idModele')"
);
$modele = DBAccess::querySingle
(
	"SELECT * FROM modele WHERE idModele='$idModele'"
);
$versions = DBAccess::query
(
	"SELECT * FROM version WHERE idModele='$idModele'"
);
foreach($versions as $key => $version) {
	$versions[$key]['docs'] = DBAccess::query
	(
		"SELECT * FROM documentVersion WHERE idVersion='" . $version['idVersion'] . "' ORDER BY ordre"
	);
}

$aResponse = array();
$aResponse['marque'] = $marque;
$aResponse['modele'] = $modele;
$aResponse['versions'] = $versions;

print json_encode($aResponse, JSON_PRETTY_PRINT);


?>
