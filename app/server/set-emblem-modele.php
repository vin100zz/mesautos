<?php

include_once "db.php";

$idDocument = $_REQUEST["id"];

// SQL
$idModele = DBAccess::singleValue(
  "SELECT idModele
  FROM documentGamme, gamme, anneeModele
  WHERE documentGamme.idGamme=gamme.idGamme
    AND gamme.idAnneeModele = anneeModele.idAnneeModele
    AND idDocumentGamme='$idDocument'"
);


DBAccess::exec
(
	"UPDATE documentGamme
  SET emblem_modele=0
  WHERE idGamme IN
    (
      SELECT idGamme
      FROM gamme, anneeModele
      WHERE gamme.idAnneeModele = anneeModele.idAnneeModele
        AND idModele='$idModele'
    )"
);
DBAccess::exec
(
  "UPDATE documentGamme
  SET emblem_modele=1
  WHERE idDocumentGamme='$idDocument'"
);

$response = 'ok';

print json_encode($response, JSON_PRETTY_PRINT);


?>
