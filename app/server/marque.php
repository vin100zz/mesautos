<?php

include_once "db.php";

$idMarque = $_REQUEST["id"];

// SQL
$marque = DBAccess::querySingle
(
	"SELECT * FROM marque WHERE idMarque='$idMarque'"
);
$marques = DBAccess::query
(
	"SELECT * FROM marque ORDER BY nomMarque"
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
	
	$modeles[$id]['versions'] = DBAccess::query
	(
		"SELECT *
		FROM version
		WHERE idModele='$idModele'
		ORDER BY ordre, anneeModele"
	);
	
	foreach($modeles[$id]['versions'] as $id => &$version)
	{
		$doc = DBAccess::querySingle("SELECT * FROM documentVersion WHERE idVersion='" . $version['idVersion'] . "' AND (motCle='EMB' OR motCle='SUP')");
		
		if(isset($doc['idDocumentVersion'])) {
			$version['img'] = getImage("img/version/" . $doc['idDocumentVersion']);
		}
	}
	
	$aCategories = DBAccess::query
	(
		"SELECT DISTINCT categorie
		FROM modele
		WHERE idMarque='$idMarque'
		ORDER BY categorie"
	);
}

$marque['modeles'] = $modeles;
$marque['docs'] = $documentsMarque;
$marque['categories'] = isset($aCategories) ? $aCategories : null;

$aText = "texte/marque/$idMarque.txt";
if(is_file($aText) && $desc = implode(file($aText)))
{
	//$marque['histo'] = utf8_encode($desc);
	$marque['histo'] = $desc;
}

print json_encode($marque, JSON_PRETTY_PRINT);


?>
