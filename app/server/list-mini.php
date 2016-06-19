<?php

include_once "db.php";

// SQL
$marques = DBAccess::query
(
  "SELECT * FROM marque WHERE collectionne_mini='Y' ORDER BY nomMarque"
);

foreach($marques as $id => $marque)
{
  $idMarque = $marque['idMarque'];

  $marques[$id]['modeles'] = DBAccess::query("
    SELECT *
    FROM modele
    WHERE idMarque='$idMarque'
    ORDER BY nomModele
  ");
}

$res = array('marques' => $marques);

print json_encode($res, JSON_PRETTY_PRINT);


?>
