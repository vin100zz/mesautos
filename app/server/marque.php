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

/*
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
*/


// Optimisation : éviter le N+1 en récupérant d'un coup l'idDocumentGamme emblématique pour tous les modèles
$ids = array();
if (is_array($modeles)) {
    foreach ($modeles as $m) {
        if (isset($m['idModele'])) $ids[] = intval($m['idModele']);
    }
}

$modelesEmblemMap = array();
if (count($ids) > 0) {
    $idsList = implode(',', array_unique($ids));
    $sql = "SELECT adm.idModele, (SELECT idDocumentGamme\n        FROM documentGamme dg\n        JOIN gamme g ON dg.idGamme = g.idGamme\n        JOIN anneeModele am2 ON g.idAnneeModele = am2.idAnneeModele\n        WHERE am2.idModele = adm.idModele\n        ORDER BY dg.emblem_modele DESC\n        LIMIT 1) AS idDocEmblematique\n    FROM (SELECT DISTINCT idModele FROM anneeModele WHERE idModele IN ($idsList)) adm";

    $rows = DBAccess::query($sql);
    if (is_array($rows)) {
        foreach ($rows as $r) {
            // DBAccess::query peut retourner une clé numérique ou associative
            // assurer la conversion en string/int
            $key = isset($r['idModele']) ? $r['idModele'] : (isset($r[0]) ? $r[0] : null);
            $val = isset($r['idDocEmblematique']) ? $r['idDocEmblematique'] : (isset($r[1]) ? $r[1] : null);
            if ($key !== null) $modelesEmblemMap[$key] = $val;
        }
    }
}

// Appliquer la map aux modèles (s'il n'y a pas d'entrée, rester sur null)
if (is_array($modeles)) {
    foreach ($modeles as $id => $modele) {
        $idModele = isset($modele['idModele']) ? $modele['idModele'] : null;
        $modeles[$id]['idDocEmblematique'] = ($idModele !== null && isset($modelesEmblemMap[$idModele])) ? $modelesEmblemMap[$idModele] : null;
    }
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
