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
	
	$modeles[$id]['anneeModeles'] = DBAccess::query
	(
		"SELECT *
		FROM anneeModele
		WHERE idModele='$idModele'
		ORDER BY annee"
	);
	
	foreach($modeles[$id]['anneeModeles'] as $id => &$anneeModele)
	{
		$doc = DBAccess::singleRow(
			"SELECT *
			FROM documentGamme, gamme, anneeModele
			WHERE documentGamme.idGamme=gamme.idGamme
			  AND gamme.idAnneeModele=anneeModele.idAnneeModele
			  AND anneeModele.idAnneeModele='" . $anneeModele['idAnneeModele'] . "'"
			. "ORDER BY emblematique DESC"
		);
		
		if(isset($doc['idDocumentGamme'])) {
			$anneeModele['idDocumentGamme'] = $doc['idDocumentGamme'];
		}
	}
	
	$categories = DBAccess::query
	(
		"SELECT DISTINCT categorie
		FROM modele
		WHERE idMarque='$idMarque'
		ORDER BY categorie"
	);
}

$marque['modeles'] = $modeles;
$marque['docs'] = $documentsMarque;
$marque['categories'] = isset($categories) ? $categories : null;

$aText = "texte/marque/$idMarque.txt";
if(is_file($aText) && $desc = implode(file($aText)))
{
	//$marque['histo'] = utf8_encode($desc);
	$marque['histo'] = $desc;
}

print json_encode($marque, JSON_PRETTY_PRINT);


?>
