<?php

include_once "db.php";

// SQL
$aMarques = DBAccess::query
(
	"SELECT * FROM marque
	 WHERE idMarque <> 1129"
);

print json_encode($aMarques, JSON_PRETTY_PRINT);

?>

