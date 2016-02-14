<?php

include_once "db.php";

$action = $_REQUEST["action"];
$objet = $_REQUEST["objet"];

$aResult = array();

$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : "";

if($action == "add")
{
	if($objet == "modele" || $objet == "docMarque")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM marque
			WHERE idMarque='$id'"
		);
	}
	else if($objet == "version")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM modele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idModele='$id'"
		);
	}
	else if($objet == "docVersion")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM modele
			JOIN marque on marque.idMarque = modele.idMarque
			JOIN version on version.idModele = modele.idModele
			WHERE idVersion='$id'"
		);
	}
}
else if($action == "edit")
{
	if($objet == "marque")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM marque
			WHERE idMarque='$id'"
		);
	}
	else if($objet == "modele")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM modele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idModele='$id'"
		);
	}
	else if($objet == "version")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM version
			JOIN modele on version.idModele = modele.idModele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idVersion='$id'"
		);
	}
	else if($objet == "docMarque")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT * FROM documentMarque WHERE idDocumentMarque='$id'"
		);
	}
	else if($objet == "docVersion")
	{
		$aResult = DBAccess::querySingle
		(
			"SELECT *
			FROM documentVersion
			JOIN version on version.idVersion = documentVersion.idVersion
			JOIN modele on version.idModele = modele.idModele
      JOIN marque on marque.idMarque = modele.idMarque
			WHERE idDocumentVersion='$id'"
		);
	}
}


if($objet == "marque")
{
	$aResult['liste_pays'] = DBAccess::query
	(
		"SELECT DISTINCT pays FROM marque"
	);
	 $aResult['modeles'] = DBAccess::query
  (
    "SELECT * FROM modele WHERE idMarque = $id ORDER BY ordre"
  );
}
else if($objet == "modele")
{
	$aResult['liste_categories'] = DBAccess::query
	(
		"SELECT DISTINCT categorie FROM modele ORDER BY categorie"
	);
	$aResult['versions'] = DBAccess::query
  (
    "SELECT * FROM version WHERE idModele = $id ORDER BY ordre, anneeModele"
  );
}
else if($objet == "version")
{
	$aResult['liste_types'] = DBAccess::query
	(
		"SELECT DISTINCT type FROM version ORDER BY type"
	);
}
else if($objet == "docVersion" || $objet == "docMarque")
{
	$aResult['liste_sources'] = DBAccess::query
	(
		"SELECT DISTINCT source
		 FROM
		 (SELECT DISTINCT source
		 FROM documentVersion
		 UNION
		 SELECT DISTINCT source
		 FROM documentMarque)
		 ORDER BY source"
	);
}


$aResult['action'] = $action;
$aResult['objet'] = $objet;

print json_encode($aResult, JSON_PRETTY_PRINT);

?>