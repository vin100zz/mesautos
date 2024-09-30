<?php

include_once "db.php";

$idMarque = $_REQUEST["id"];

// SQL
$marque = DBAccess::singleRow
(
	"SELECT * FROM marque WHERE idMarque='$idMarque'"
);
$modeles = DBAccess::query
(
	"SELECT * FROM modele WHERE idMarque='$idMarque' ORDER BY ordre"
);
$documentsMarque = DBAccess::query
(
	"SELECT * FROM documentMarque WHERE idMarque='$idMarque' ORDER BY ordre"
);


foreach($modeles as $id => $modele)
{
	$idModele = $modele['idModele'];

	$modeles[$id]['idDocEmblematique'] = DBAccess::singleValue("
		SELECT idDocumentGamme
		FROM documentGamme, gamme, anneeModele
		WHERE documentGamme.idGamme=gamme.idGamme
		  AND gamme.idAnneeModele=anneeModele.idAnneeModele
			AND idModele='$idModele'
		ORDER BY emblem_modele DESC
	");
}


$marque['modeles'] = $modeles;
$marque['docs'] = $documentsMarque;
$marque['categories'] = isset($categories) ? $categories : null;

$text = "../../histo/marque/$idMarque.html";
if(is_file($text) && $desc = implode(file($text)))
{
	//$marque['histo'] = utf8_encode($desc);
	$marque['histo'] = $desc;
}

print json_encode($marque, JSON_PRETTY_PRINT);


?>
