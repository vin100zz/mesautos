<?php

include_once "db.php";

$annee = $_REQUEST["annee"];

// SQL
$gammes = DBAccess::query
(
	"
	SELECT * FROM marque, modele, anneeModele, gamme
	WHERE marque.idMarque=modele.idMarque
	  AND modele.idModele=anneeModele.idModele
	  AND anneeModele.idAnneeModele=gamme.idAnneeModele
	  AND anneeModele.annee='$annee'
	"
);

foreach($gammes as $index => $gamme)
{
	$idGamme = $gamme['idGamme'];

	$gammes[$index]['idDocEmblematique'] = DBAccess::singleValue("
		SELECT idDocumentGamme
		FROM documentGamme, gamme
		WHERE documentGamme.idGamme=gamme.idGamme AND gamme.idGamme=$idGamme
		ORDER BY emblem_anneeModele DESC
	");
}

$res = array();
$res['annee'] = $annee;
$res['gammes'] = $gammes;

print json_encode($res, JSON_PRETTY_PRINT);

?>

