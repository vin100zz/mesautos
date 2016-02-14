<?php

include_once "db.php";

$idMarque = $_REQUEST["id"];

// SQL
$aMarque = DBAccess::querySingle
(
	"SELECT * FROM marque WHERE idMarque='$idMarque'"
);
$aMarques = DBAccess::query
(
	"SELECT * FROM marque ORDER BY nomMarque"
);
$aModeles = DBAccess::query
(
	"SELECT * FROM modele WHERE idMarque='$idMarque' ORDER BY ordre"
);
$aDocumentsMarque = DBAccess::query
(
	"SELECT * FROM documentMarque WHERE idMarque='$idMarque' ORDER BY ordre"
);


foreach($aModeles as $aId => $aModele)
{
	$idModele = $aModele['idModele'];
	
	$aModeles[$aId]['versions'] = DBAccess::query
	(
		"SELECT *
		FROM version
		WHERE idModele='$idModele'
		ORDER BY ordre, anneeModele"
	);
	
	foreach($aModeles[$aId]['versions'] as $aId => &$aVersion)
	{
		$aDoc = DBAccess::querySingle("SELECT * FROM documentVersion WHERE idVersion='" . $aVersion['idVersion'] . "' AND (motCle='EMB' OR motCle='SUP')");
		
		if(isset($aDoc['idDocumentVersion']))
			$aVersion['img'] = getImage("img/version/" . $aDoc['idDocumentVersion']);
	}
	
	$aCategories = DBAccess::query
	(
		"SELECT DISTINCT categorie
		FROM modele
		WHERE idMarque='$idMarque'
		ORDER BY categorie"
	);
}

$aMarque['modeles'] = $aModeles;
$aMarque['docs'] = $aDocumentsMarque;
$aMarque['categories'] = isset($aCategories) ? $aCategories : null;

$aText = "texte/marque/$idMarque.txt";
if(is_file($aText) && $aDesc = implode(file($aText)))
{
	//$aMarque['histo'] = utf8_encode($aDesc);
	$aMarque['histo'] = $aDesc;
}

print json_encode($aMarque, JSON_PRETTY_PRINT);


?>
