<?php

include_once "db.php";

$action = $_REQUEST["action"];
$objet = $_REQUEST["objet"];

$result = array();

$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : "";

if ($action == "add")
{
	if ($objet == "modele" || $objet == "docMarque")
	{
		$result = DBAccess::singleRow
		(
			"SELECT *
			FROM marque
			WHERE idMarque='$id'"
		);
	}
	else if ($objet == "gamme")
	{
		$result = DBAccess::singleRow
		(
			"SELECT *
			FROM modele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idModele='$id'"
		);
	}
	else if ($objet == "docGamme")
	{
		$result = DBAccess::singleRow
		(
			"SELECT *
			FROM modele
			JOIN marque on marque.idMarque = modele.idMarque
			JOIN anneeModele on anneeModele.idModele = modele.idModele
			JOIN gamme on gamme.idAnneeModele = anneeModele.idAnneeModele
			WHERE idGamme='$id'"
		);
	}
}
else if ($action == "edit")
{
	if ($objet == "marque")
	{
		$result = DBAccess::singleRow
		(
			"SELECT *
			FROM marque
			WHERE idMarque='$id'"
		);
	}
	else if ($objet == "modele")
	{
		// meffi: colonnes 'debut' et 'fin' presentes dans Marque et Modele
		$result = DBAccess::singleRow
		(
			"SELECT marque.idMarque, nomMarque, idModele, nomModele, categorie, modele.debut, modele.fin, cylindree_min, cylindree_max, puissance_min, puissance_max, production, commentaire
			FROM modele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idModele='$id'"
		);
	}
	else if ($objet == "gamme")
	{
		$result = DBAccess::singleRow
		(
			"SELECT *
			FROM gamme
			JOIN anneeModele on gamme.idAnneeModele = anneeModele.idAnneeModele
			JOIN modele on anneeModele.idModele = modele.idModele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idGamme='$id'"
		);
	}
	else if ($objet == "docMarque")
	{
		$result = DBAccess::singleRow
		(
			"SELECT * FROM documentMarque WHERE idDocumentMarque='$id'"
		);
	}
	else if ($objet == "docGamme")
	{
		$result = DBAccess::singleRow
		(
			"SELECT *
			FROM documentGamme
			JOIN gamme on gamme.idGamme = documentGamme.idGamme
			JOIN anneeModele on gamme.idAnneeModele = anneeModele.idAnneeModele
			JOIN modele on anneeModele.idModele = modele.idModele
			JOIN marque on marque.idMarque = modele.idMarque
			WHERE idDocumentGamme='$id'"
		);
		$result['liens'] = DBAccess::query
		(
			"SELECT *
			FROM lienGamme
			WHERE lienGamme.idDocumentGamme = '$id'"
		);
	}
}


if ($objet == "marque")
{
	$result['liste_pays'] = DBAccess::query
	(
		"SELECT DISTINCT pays FROM marque ORDER BY pays"
	);
	 $result['modeles'] = DBAccess::query
  (
    "SELECT * FROM modele WHERE idMarque = $id ORDER BY ordre"
  );
}
else if ($objet == "modele")
{
	$result['liste_categories'] = DBAccess::query
	(
		"SELECT DISTINCT categorie FROM modele ORDER BY categorie"
	);
}
else if ($objet == "gamme")
{
	$result['liste_types'] = DBAccess::query
	(
		"SELECT DISTINCT type FROM gamme ORDER BY type"
	);
}
else if ($objet == "docGamme" || $objet == "docMarque")
{
	$result['liste_sources'] = DBAccess::query
	(
		"SELECT DISTINCT source
		 FROM
		 (SELECT DISTINCT source
		 FROM documentGamme
		 UNION
		 SELECT DISTINCT source
		 FROM documentMarque)
		 ORDER BY source"
	);
}


$result['action'] = $action;
$result['objet'] = $objet;

print json_encode($result, JSON_PRETTY_PRINT);

?>