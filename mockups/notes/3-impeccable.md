# Méthodologie 3 — skill « impeccable » (pbakaus/impeccable 4.7.0)

La skill n'étant pas installée dans la session, elle a été clonée depuis GitHub et suivie à la lettre :
chargement du contexte par son lanceur (`impeccable context`), lecture des références de commande,
du « craft floor », puis contrôle par son détecteur (`impeccable detect`).

## Ce que la skill a décidé avant tout dessin

- **Contexte** : pas de PRODUCT.md ni de DESIGN.md, mais une implémentation visuelle existante.
  La directive `EXISTING_VISUAL_SYSTEM` fait du code actuel l'autorité visuelle pour un affinage.
- **Affinage, pas refonte** : la demande garde la disposition et trouve le thème « élégant et sobre ».
  Règle de la skill : *Refinement preserves; redesign replaces.* Les deux propositions **gardent l'identité
  Atelier** (crème, cartes blanches, terre cuite, Archivo, Plex Mono) au lieu d'inventer un nouveau monde.
- **Mode** : *Operate* (on consulte et on enrichit une collection). Couleur « Restrained », motion
  au service de l'état, rien qui fasse attendre.
- **Commandes** : la demande correspond à deux commandes de la skill. Chaque proposition en suit une :
  `colorize` (3A) et `delight` (3B). Le brief (« texture ou gradient ») prime sur les avertissements
  génériques de la skill : *The brief wins.*
- **Entretien** : la skill prévoit une question de confirmation. Le brief étant précis, elle n'a pas été posée ;
  le contexte produit a été déduit du code (substitution signalée dans le compte rendu).

## 3A · Atelier, colorize

**Retenue et intégrée** directement dans les feuilles de style de l'appli (`style/app.css`, `home.css`, `marque.css`,
`modele.css`, `search.css`). Le rendu de l'appli est identique au pixel près à celui de la maquette 3A.
Ajustements après essai : header global d'un kraft plus soutenu (`--band-2`) pour le distinguer de l'en-tête
des pages, et onglet actif en terre cuite pleine (l'onglet rose pâle ne ressortait qu'à 1,03:1 sur le bandeau).
Les maquettes lisent désormais une copie d'avant 3A (`mockups/base/`) pour que les propositions restent comparables.

Stratégie nommée avant d'éditer, comme l'exige `colorize` :

- **Température** : lumière chaude de fin d'après-midi dans un atelier.
- **Relation dominante** : une **seconde couche neutre** (en-tête et barre collante d'un ton kraft) au-dessus
  d'un plan de travail crème éclairé par le haut (dégradé). La structure passe par la couleur, plus par des filets.
- **Rôles** : terre cuite réservée à l'action et à la sélection ; **ambre** (déjà dans le logo) pour la position
  (« où suis-je » : lettres et décennies à l'écran) ; couleurs de catégories pour les données. Avant, la terre
  cuite servait à tout, y compris au survol et au repérage : elle perdait sa force.
- **Dosage** : la couleur possède deux régions (bandeau, lumière du plan) au lieu d'accents dispersés.
- **Surfaces du navigateur** (exigence du craft floor) : sélection de texte, curseur, `accent-color`,
  barre de défilement.

## 3B · Atelier, delight

Thèse (une phrase, comme l'exige `delight`) : *la collection est faite de documents d'époque, l'interface se
comporte donc comme du papier photo.* Le plus petit système qui la porte :

1. **Texture** (demandée par le brief) : un grain de papier fin sur le plan de travail uniquement,
   jamais sur les photos ni par-dessus le texte.
2. **Attente → révélateur** : pendant qu'une photo charge, son cadre montre un lent balayage sépia, comme une
   épreuve qui apparaît dans le bain, au lieu d'un aplat beige. Vrai : il disparaît dès que l'image est peinte ;
   jamais sur un cadre sans photo.
3. **Moment focal** : sur le mur des marques, la grande lettre de la section à l'écran se remplit d'encre
   (animation liée au défilement, couleur seulement) et se vide quand on la quitte. Elle prolonge un motif que le
   système possède déjà et double l'index A–Z. Amélioration progressive : sans support, les lettres restent
   comme aujourd'hui.

## Vérifications

Contrastes calculés (WCAG) et détecteur impeccable : voir `notes/3-impeccable-verifications.md`.
