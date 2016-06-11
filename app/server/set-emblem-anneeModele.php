<?php

include_once "db.php";

$idDocument = $_REQUEST["id"];

// SQL
$idAnneeModele = DBAccess::singleValue(
  "SELECT idAnneeModele
  FROM documentGamme, gamme
  WHERE documentGamme.idGamme=gamme.idGamme AND idDocumentGamme='$idDocument'"
);


DBAccess::exec
(
	"UPDATE documentGamme
  SET emblem_anneeModele=0
  WHERE idGamme IN
    (
      SELECT idGamme
      FROM gamme
      WHERE idAnneeModele='$idAnneeModele'
    )"
);
DBAccess::exec
(
  "UPDATE documentGamme
  SET emblem_anneeModele=1
  WHERE idDocumentGamme='$idDocument'"
);

$response = 'ok';

print json_encode($response, JSON_PRETTY_PRINT);


?>
