<?php

include_once "db.php";

$aStatus = array();

$aParams = json_decode($HTTP_RAW_POST_DATA, true);

function getParam($iParam)
{
	global $aParams;
	return isset($aParams[$iParam]) ? str_replace("'", "''", utf8_decode($aParams[$iParam])) : "";
}

$action = getParam("action");
$objet = getParam("objet");

if($objet == "marque")
{
	$nomMarque = getParam("nomMarque");
	$pays = getParam("pays");
	$modeleOrder = $aParams["modeleOrder"];
	
	if($action == "add")
	{
		$aStatus['query'] = "INSERT INTO marque(nomMarque, pays) VALUES('$nomMarque', '$pays')";
	}	
	else
	{
		$idMarque = getParam("idMarque");
		$aStatus['query'] = "UPDATE marque SET nomMarque='$nomMarque', pays='$pays' WHERE idMarque='$idMarque'";
		
		$pos = 0;
    foreach ($modeleOrder as $key) {
      DBAccess::exec("UPDATE modele SET ordre='$pos' WHERE idModele=$key");
      ++$pos;
    }
	}
}
else if($objet == "modele")
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
  $miniModele = getParam("miniModele") == '1' ? 'Y' : 'N';
	
	if($action == "add")
	{
		$aStatus['query'] = "INSERT INTO modele(nomModele, categorie, debut, fin, cylindree_min, cylindree_max, puissance_min, puissance_max, 
																					  production, commentaire, idMarque, miniModele)
																		 VALUES('$nomModele', '$categorie', '$debut', '$fin', '$cylindree_min', '$cylindree_max', '$puissance_min', '$puissance_max',
																					  '$production', '$commentaire', '$idMarque', '$miniModele')";
	}	
	else
	{
		$idModele = getParam("idModele");
		$aStatus['query'] = "UPDATE modele
												 SET nomModele='$nomModele', categorie='$categorie', debut='$debut', fin='$fin', cylindree_min='$cylindree_min',
														 cylindree_max='$cylindree_max', puissance_min='$puissance_min', puissance_max='$puissance_max',
														 production='$production', commentaire='$commentaire', idMarque='$idMarque', miniModele='$miniModele'
												 WHERE idModele = '$idModele'";
		
		$pos = 0;
    foreach ($versionOrder as $key) {
      DBAccess::exec("UPDATE version SET ordre='$pos' WHERE idVersion=$key");
      ++$pos;
    }
    
	}
}
else if($objet == "version")
{
	$anneeModele = getParam("anneeModele");
	$type = getParam("type");
	$nom = getParam("nom");
	$idModele = getParam("idModele");
  $miniVersion = getParam("miniVersion") == '1' ? 'Y' : 'N';
	
	if($action == "add")
	{
		$aStatus['query'] = "INSERT INTO version(anneeModele, type, nom, idModele, miniVersion)
																		 VALUES('$anneeModele', '$type', '$nom', '$idModele', '$miniVersion')";
	}	
	else
	{
		$idVersion = getParam("idVersion");
		$aStatus['query'] = "UPDATE version
												 SET anneeModele='$anneeModele', type='$type', nom='$nom', idModele='$idModele', miniVersion='$miniVersion'
												 WHERE idVersion = '$idVersion'";
	}
}
else if($objet == "docMarque")
{
	$idMarque = getParam("idMarque");
	$ordre = getParam("ordre");
	$source = getParam("source");
	$date = getParam("date");
	$legende = getParam("legende");
	$motCle = getParam("motCle");
	
	if($action == "add")
	{
		$aStatus['query'] = "INSERT INTO documentMarque(idMarque, ordre, source, date, legende, motCle)
																		 VALUES('$idMarque', '$ordre', '$source', '$date', '$legende', '$motCle')";
	}	
	else
	{
		$idDocumentMarque = getParam("idDocumentMarque");
		$aStatus['query'] = "UPDATE documentMarque
												 SET idMarque='$idMarque', ordre='$ordre', source='$source', date='$date', legende='$legende', motCle='$motCle'
												 WHERE idDocumentMarque = '$idDocumentMarque'";
	}
}
else if($objet == "docVersion")
{
	$idVersion = getParam("idVersion");
	$ordre = getParam("ordre");
	$source = getParam("source");
	$date = getParam("date");
	$legende = getParam("legende");
	$motCle = getParam("motCle") == "1" ? "EMB" : "";
  
	if($action == "add")
	{
		$aStatus['query'] = "INSERT INTO documentVersion(idVersion, ordre, source, date, legende, motCle)
																		 VALUES('$idVersion', '$ordre', '$source', '$date', '$legende', '$motCle')";
	}	
	else
	{
		$idDocumentVersion = getParam("idDocumentVersion");
		$aStatus['query'] = "UPDATE documentVersion
												 SET idVersion='$idVersion', ordre='$ordre', source='$source', date='$date', legende='$legende', motCle='$motCle'
												 WHERE idDocumentVersion = '$idDocumentVersion'";
	}
}

$aStatus['result'] = DBAccess::exec( $aStatus['query'] ) ? "ok" : "ko";

if($action == "add")
{
	 if($objet == "docMarque")
	 {
			$aStatus['new'] = DBAccess::querySingle("SELECT max(idDocumentMarque) as id FROM documentMarque");
	 }
	 else if($objet == "docVersion")
	 {
			$aStatus['new'] = DBAccess::querySingle("SELECT max(idDocumentVersion) as id FROM documentVersion");
	 }
}	

print json_encode($aStatus, JSON_PRETTY_PRINT);

?>