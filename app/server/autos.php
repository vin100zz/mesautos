<?php

include_once "db.php";

// SQL
$marques = DBAccess::query
(
	"SELECT * FROM marque
	 WHERE idMarque <> 1129"
);

print json_encode($marques, JSON_PRETTY_PRINT);

?>

