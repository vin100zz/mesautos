<?php

include_once "db.php";

set_time_limit(0);

function sqlproof ($str) {
	return str_replace("'", "''", utf8_decode($str));
}

/*

// SQL
$versions = DBAccess::query
(
	"SELECT * FROM version ORDER BY idModele, anneeModele "
);

$currentIdModele = null;
$currentAnneeModele = null;

foreach ($versions as $id => $version)
{
	if ($version["idModele"] == $currentIdModele) {
		
		if ($version["anneeModele"] == $currentAnneeModele) {
			insertGamme($version, $insertedIdAnneeModele);
		} else {
			$currentAnneeModele = $version["anneeModele"];

			insertAnneeModele($version);

			$insertedIdAnneeModele = DBAccess::getLastInsertedLastRow();
			insertGamme($version, $insertedIdAnneeModele);
		}

	} else {
		$currentIdModele = $version["idModele"];
		$currentAnneeModele = $version["anneeModele"];

		insertAnneeModele($version);

		$insertedIdAnneeModele = DBAccess::getLastInsertedLastRow();

		insertGamme($version, $insertedIdAnneeModele);
	}	
}

function insertAnneeModele ($version) {
	$anneeModele = sqlproof($version["anneeModele"]);
	$idModele = $version["idModele"];
	$query = "INSERT INTO anneeModele (annee, idModele) VALUES ('$anneeModele', '$idModele')";

	print($query . '<br/>');
	DBAccess::exec($query);
}

function insertGamme ($version, $idAnneeModele) {
	$type = sqlproof($version["type"]);
	$nom = sqlproof($version["nom"]);
	$query = "INSERT INTO gamme (type, nom, idAnneeModele) VALUES ('$type', '$nom', '$idAnneeModele')";

	print($query . '<br/>');
	DBAccess::exec($query);
}

*/


$docs = DBAccess::query
(
	"SELECT *
	FROM a_supprimer_documentVersion, a_supprimer_version
	WHERE a_supprimer_documentVersion.idVersion = a_supprimer_version.idVersion AND idModele=4
");

foreach ($docs as $id => $doc)
{
	$idDocumentVersion = $doc["idDocumentVersion"];

	$idModele = $doc["idModele"];
	$anneeModele = sqlproof($doc["anneeModele"]);
	$gamme = sqlproof($doc["type"]);
	$nomGamme = sqlproof($doc["nom"]);

	$ordre = sqlproof($doc["ordre"]);
	$source = sqlproof($doc["source"]);
	$date = sqlproof($doc["date"]);
	$legende = sqlproof($doc["legende"]);

	$idGamme = DBAccess::singleValue
	(
		"SELECT idGamme
		FROM gamme, anneeModele
		WHERE gamme.idAnneeModele = anneeModele.idAnneeModele
			AND annee = '$anneeModele'
			AND (type='$gamme' AND (nom<>'' AND nom='$nomGamme'))
			AND idModele = '$idModele'
	");

	if (!$idGamme) {
		$idGamme = DBAccess::singleValue
		(
			"SELECT idGamme
			FROM gamme, anneeModele
			WHERE gamme.idAnneeModele = anneeModele.idAnneeModele
				AND annee = '$anneeModele'
				AND (type='$gamme' AND nom='')
				AND idModele = '$idModele'
		");

		if (!$idGamme) {
			$idGamme = DBAccess::singleValue
			(
				"SELECT idGamme
				FROM gamme, anneeModele
				WHERE gamme.idAnneeModele = anneeModele.idAnneeModele
					AND annee = '$anneeModele'
					AND type='$gamme'
					AND idModele = '$idModele'
			");

			if (!$idGamme) {
				$idGamme = DBAccess::singleValue
				(
					"SELECT idGamme
					FROM gamme, anneeModele
					WHERE gamme.idAnneeModele = anneeModele.idAnneeModele
						AND annee = '$anneeModele'
						AND nom='$nomGamme'
						AND idModele = '$idModele'
				");
			}
		}
	}


	$query = "INSERT INTO documentGamme (idDocumentGamme, idGamme, ordre, source, date, legende) VALUES ('$idDocumentVersion', '$idGamme', '$ordre', '$source', '$date', '$legende')";

	print($query . '<br/>');
	//DBAccess::exec($query);
}



?>
