# Méthodologie 3 — vérifications

## Détecteur impeccable (`impeccable detect`, rendu réel)

Pages rendues dans Chromium à 1440 × 900 sur quatre écrans (Marques, Marque, Modèle, Nouveautés 1967).
Nombre de signalements par règle. Le détecteur a aussi été passé, pour comparaison, sur l'existant et sur
les thèmes des deux autres méthodologies (non corrigés : ce n'est pas leur méthode).

| Thème | Contraste insuffisant | Texte < 11 px | Texte dégradé | Halo coloré | Fond crème | Autres* |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Actuel | 66 | 59 | – | – | 4 | 2 |
| 1A Papier chaud | 69 | 59 | 14 | – | – | 2 |
| 1B Reflets | 74 | 59 | 14 | 4 | – | 2 |
| 2A Prospectus | 69 | 59 | – | – | – | 2 |
| 2B Grand Palais | 69 | 59 | – | – | – | 2 |
| **3A colorize** | **0** | **0** | – | – | – | 2 |
| **3B delight** | **0** | **0** | – | – | 4 | 2 |

\* « Autres » : deux points de **disposition**, hors périmètre du brief, présents partout :
- la note de gamme dépasse 80 caractères par ligne (`max-width: 820px`) ;
- l'année et le drapeau des marques n'apparaissent qu'au survol (49 % du texte de la page Marques).

Le « fond crème » de 3B est assumé : c'est l'identité Atelier, que la skill impose de préserver lors d'un affinage
(*Refinement preserves*). 3A ne déclenche plus la règle parce que son fond est un dégradé.

Corrections mécaniques appliquées à 3A et 3B (le craft floor l'exige ; elles valent pour l'appli quelle que soit
la proposition retenue) :

| Défaut existant | Avant | Après |
| --- | --- | --- |
| Gris secondaire `--text-3` sur blanc | 3,67:1 | 5,71:1 |
| … sur le fond crème | 3,26:1 | 5,06:1 |
| … sur le bandeau kraft (3A) | 2,91:1 | 4,52:1 |
| Libellés des fiches (Date, Cylindrée…) | 10 px | 11 px |
| Initiales des logos manquants, placeholder de recherche | 1,6–2:1 | ≥ 4,5:1 |

Lors du premier passage, le bandeau kraft de 3A portait une ombre portée : le détecteur l'a lu comme une carte
contenant d'autres cartes (vignettes d'années-modèles). Ombre retirée, remplacée par un filet.

## Contrastes clés de 3A (WCAG)

| Paire | Ratio |
| --- | ---: |
| Texte principal sur bandeau kraft | 13,65:1 |
| Texte secondaire (`--text-2`) sur bandeau | 5,36:1 |
| Position (ambre `#6B4800` sur `#F5E1B0`) | 6,38:1 |
| Sélection (terre cuite sur rose pâle) | 4,95:1 |
| Blanc sur bouton principal | 4,74:1 |

## Rendu

Captures bureau (1440 × 900) et mobile (390 × 844) de chaque thème dans `mockups/shots/`. États vérifiés en plus
pour 3B : défilement (une ou deux lettres encrées selon les sections dans la bande de lecture) et chargement
des photos (`mockup.html?…&lent=9000`).
