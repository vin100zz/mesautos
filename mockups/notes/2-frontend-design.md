# Méthodologie 2 — skill « frontend-design »

La skill demande : ancrer les choix dans le sujet, poser un plan compact (couleurs, typo, mise en page, principes),
le confronter aux « réflexes par défaut » des pages générées, puis construire et s'autocritiquer sur captures.
Une seule audace par proposition, tout le reste calme.

## Sujet, public, rôle

- **Sujet** : une encyclopédie automobile personnelle — marques, modèles, années-modèles, et surtout des
  *documents d'époque* (prospectus, pages de revues, photos de Salon).
- **Public** : un passionné qui consulte et enrichit sa collection.
- **Rôle de l'interface** : présenter des archives sans leur voler la vedette.

Vocabulaire du sujet exploré : prospectus imprimés en offset (trames, tons directs, défauts de repérage),
Salon de l'Automobile au Grand Palais (verrière, structure métallique « vert réséda »), carte grise (guilloché),
tableaux de bord à perlage, bleu de France des voitures de course, cartes routières.

## Contrainte du brief

Disposition figée : seules couleurs, fonds, textures, ombres, filets et effets changent. La typo (Archivo + Plex Mono)
est conservée, car en changer modifierait les métriques donc la mise en page.

## Revue du premier jet

Premier réflexe : « crème + grain + halo terracotta ». C'est exactement le cliché n° 1 listé par la skill
(fond crème proche de #F4F1EA, accent terre cuite) — et c'est déjà, à peu de chose près, le thème actuel.
**Révision** : les deux propositions quittent le couple crème/terre cuite et tirent leur palette du sujet.
Les autres clichés relevés dans l'existant (étiquettes mono en capitales, méta « A · B ») touchent le texte
et la disposition : hors périmètre, je les laisse.

## 2A · Prospectus (impression offset)

| Rôle | Nom | Hex |
| --- | --- | --- |
| Fond | Papier couché | `#F3F2EE` |
| Texte | Encre | `#1A2230` |
| Accent | Bleu imprimeur | `#24509A` |
| Ton direct | Jaune | `#F2B33D` |
| Trame | Gris trame | `#C9CED6` |

- **Audace unique** : les grandes lettres du mur des marques, imprimées en deux tons directs légèrement
  hors repérage (bleu sur jaune, en multiplication), comme un prospectus des années 60.
- **Texture** : une trame de points qui se dégrade depuis le coin haut droit, comme la tranche d'un aplat imprimé.
- **Calme ailleurs** : cartes blanches à filet encre très fin plutôt qu'ombres floues (rendu « papier imprimé »),
  boutons à plat en bleu, jaune réservé aux marques (étoiles, surlignage de recherche).

## 2B · Grand Palais (le Salon sous la verrière)

| Rôle | Nom | Hex |
| --- | --- | --- |
| Fond | Pierre | `#EEECE6` |
| Lumière | Verrière | `#DCE7E3` |
| Accent | Réséda | `#4D6B5B` |
| Rehaut | Laiton | `#B98A3E` |
| Texte | Encre | `#1F2622` |

- **Audace unique** : en haut de l'écran, la verrière vue d'en dessous — un treillis fin de nervures en perspective
  qui fuit vers l'horizon et se dissout dans la lumière. Fixe, discret, derrière l'en-tête dépoli.
- **Couleurs** : le vert réséda de la charpente du Grand Palais remplace la terre cuite ; le laiton réchauffe
  (emblèmes, année courante).
- **Calme ailleurs** : cartes pierre claire, ombres verdâtres très douces, aucun effet au survol en plus de l'existant.

## Autocritique (après captures)

Voir les notes en fin de chaque fichier CSS.

- **2A** : la trame couvrait d'abord tout le haut de l'écran et gênait la lecture de l'en-tête (lettres grisées
  de l'index, lien « Mes autos à moi ») ; ramenée dans le coin et allégée. Retiré un liseré CMJN sous l'en-tête :
  un accessoire de trop.
- **2B** : le treillis en perspective CSS (pseudo-élément transformé) se lisait comme des rayons de lumière
  sur le contenu et disparaissait sous l'en-tête dépoli. Remplacé par une verrière dessinée en SVG, peinte
  en fond fixe sous la page *et* sous les en-têtes (jonction invisible, sans flou), puis allégée de moitié.
