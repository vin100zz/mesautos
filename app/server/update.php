<?php

include_once "db.php";

$status = array();

$aParams = json_decode($HTTP_RAW_POST_DATA, true);

function getParam($iParam)
{
	global $aParams;
	return isset($aParams[$iParam]) ? str_replace("'", "''", utf8_decode($aParams[$iParam])) : "";
}

$action = getParam("action");
$objet = getParam("objet");

if ($objet == "marque")
{
	$nomMarque = getParam("nomMarque");
	$pays = getParam("pays");
	$modeleOrder = $aParams["modeleOrder"];
	
	if ($action == "add")
	{
		$status['query'] = "INSERT INTO marque(nomMarque, pays) VALUES('$nomMarque', '$pays')";
	}	
	else
	{
		$idMarque = getParam("idMarque");
		$status['query'] = "UPDATE marque SET nomMarque='$nomMarque', pays='$pays' WHERE idMarque='$idMarque'";
		
		$pos = 0;
    foreach ($modeleOrder as $key) {
      DBAccess::exec("UPDATE modele SET ordre='$pos' WHERE idModele=$key");
      ++$pos;
    }
	}
}
else if ($objet == "modele")
{
	$nomModele = getParam("nomModele");
	$categorie = getParam("categorie");
	$debut = getParam("debut");
	$fin = getParam("fin");
	$cylindree_min = getParam("cylindree_min");
	$cylindree_max = getParam("cylindree_max");
	$puissance_min = getParam("puissance_min");
	$puissance_max = getParam("puissance_max");
	$production = getParam("production");
	$commentaire = getParam("commentaire");
	$idMarque = getParam("idMarque");
	$versionOrder = $aParams["versionOrder"];
	
	if ($action == "add")
	{
		$status['query'] = "INSERT INTO modele(nomModele, categorie, debut, fin, cylindree_min, cylindree_max, puissance_min, puissance_max, 
																					  production, commentaire, idMarque)
																		 VALUES('$nomModele', '$categorie', '$debut', '$fin', '$cylindree_min', '$cylindree_max', '$puissance_min', '$puissance_max',
																					  '$production', '$commentaire', '$idMarque')";
	}	
	else
	{
		$idModele = getParam("idModele");
		$status['query'] = "UPDATE modele
												 SET nomModele='$nomModele', categorie='$categorie', debut='$debut', fin='$fin', cylindree_min='$cylindree_min',
														 cylindree_max='$cylindree_max', puissance_min='$puissance_min', puissance_max='$puissance_max',
														 production='$production', commentaire='$commentaire', idMarque='$idMarque'
												 WHERE idModele = '$idModele'";
		
		$pos = 0;
    foreach ($versionOrder as $key) {
      DBAccess::exec("UPDATE version SET ordre='$pos' WHERE idVersion=$key");
      ++$pos;
    }
	}
}
else if ($objet == "gamme")
{
	$annee = getParam("annee");
	$type = getParam("type");
	$nom = getParam("nom");
	$idModele = getParam("idModele");

	$idAnneeModele = DBAccess::singleValue("SELECT idAnneeModele FROM anneeModele WHERE idModele='$idModele' AND annee='$annee'");
	if (!$idAnneeModele) {
		DBAccess::exec("INSERT INTO anneeModele(annee, idModele) VALUES ('$annee', '$idModele')");
		$idAnneeModele = DBAccess::getLastInsertedLastRow();
	}
	
	if ($action == "add")
	{
		$status['query'] = "INSERT INTO gamme(type, nom, idAnneeModele) VALUES('$type', '$nom', '$idAnneeModele')";
	}	
	else
	{
		$idGamme = getParam("idGamme");
		$status['query'] = "UPDATE gamme
												 SET type='$type', nom='$nom', idAnneeModele='$idAnneeModele'
												 WHERE idGamme = '$idGamme'";
	}
}
else if ($objet == "docMarque")
{
	$idMarque = getParam("idMarque");
	$ordre = getParam("ordre");
	$source = getParam("source");
	$date = getParam("date");
	$legende = getParam("legende");
	$motCle = getParam("motCle");
	
	if ($action == "add")
	{
		$status['query'] = "INSERT INTO documentMarque(idMarque, ordre, source, date, legende, motCle)
																		 VALUES('$idMarque', '$ordre', '$source', '$date', '$legende', '$motCle')";
	}	
	else
	{
		$idDocumentMarque = getParam("idDocumentMarque");
		$status['query'] = "UPDATE documentMarque
												 SET idMarque='$idMarque', ordre='$ordre', source='$source', date='$date', legende='$legende', motCle='$motCle'
												 WHERE idDocumentMarque = '$idDocumentMarque'";
	}
}
else if ($objet == "docGamme")
{
	$idGamme = getParam("idGamme");
	$source = getParam("source");
	$date = getParam("date");
	$legende = getParam("legende");
	$lien = getParam("lien");
  
	if ($action == "add")
	{
		$status['query'] = "INSERT INTO documentGamme(idGamme, source, date, legende, lien)
																		 VALUES('$idGamme', '$source', '$date', '$legende', '$lien')";
	}	
	else
	{
		$idDocumentGamme = getParam("idDocumentGamme");
		$status['query'] = "UPDATE documentGamme
												 SET idGamme='$idGamme', source='$source', date='$date', legende='$legende', lien='$lien'
												 WHERE idDocumentGamme = '$idDocumentGamme'";
	}
}

$status['result'] = DBAccess::exec( $status['query'] ) ? "ok" : "ko";

if ($action == "add")
{
	 if ($objet == "docMarque")
	 {
			$status['new'] = DBAccess::singleValue("SELECT max(idDocumentMarque) as id FROM documentMarque");
	 }
	 else if ($objet == "docGamme")
	 {
			$status['new'] = DBAccess::singleValue("SELECT max(idDocumentGamme) as id FROM documentGamme");
	 }
}	

print json_encode($status, JSON_PRETTY_PRINT);

?>