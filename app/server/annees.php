<?php

include_once "db.php";

// Années pour lesquelles au moins une gamme existe
$annees = DBAccess::singleColumn
(
	"SELECT DISTINCT annee FROM anneeModele ORDER BY annee"
);

$res = array();
foreach ($annees as $annee) {
	if (preg_match('/^\d{4}$/', $annee)) {
		$res[] = intval($annee);
	}
}

print json_encode(array("annees" => $res), JSON_PRETTY_PRINT);

?>
