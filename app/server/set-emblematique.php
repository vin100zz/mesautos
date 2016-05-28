<?php

include_once "db.php";

$idDocument = $_REQUEST["id"];

// SQL
$idGamme = DBAccess::singleValue(
  "SELECT idGamme FROM documentGamme WHERE idDocumentGamme='$idDocument'"
);


DBAccess::exec
(
	"UPDATE documentGamme SET emblematique=0 WHERE idGamme='$idGamme'"
);
DBAccess::exec
(
  "UPDATE documentGamme SET emblematique=1 WHERE idDocumentGamme='$idDocument'"
);

$response = 'ok';

print json_encode($response, JSON_PRETTY_PRINT);


?>
