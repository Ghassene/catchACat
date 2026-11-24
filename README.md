# Attrape-Minou

Jeu 2D pour enfants de 5 à 10 ans : des chats sortent de leurs cachettes dans un jardin, on les touche pour leur lancer une balle et les ajouter à sa collection.

## Technologie

- HTML, CSS et JavaScript, sans framework
- Dessin 2D avec Canvas, sons générés avec Web Audio
- Tout le jeu tient dans `catchACat.html`

## Jouer

Ouvrir `catchACat.html` dans un navigateur, ou l'héberger (Netlify, GitHub Pages) et l'ajouter à l'écran d'accueil de l'iPhone depuis Safari.

## Feuille de route

1. Prototype jouable (fait)
2. Enrichir le jeu pour l'enfant : 8 décors (jardin, maison, chambre, forêt, usine à jouets, toit la nuit, nuages, backrooms), chats avec du caractère (malin, timide, chaton), 18 chats et 25 amis animaux (chien, cheval, hibou, renard, hamster, chacun en version normale et en 4 versions rares), dont le caracal, le tuxedo et 4 chats rares (Étoile, Poisson, Soleil, Multicolore), 5 chats mystérieux encore plus rares (Aigle, Ange, Glace, Saturne, Mystérieux), 10 chapeaux, accessoires et costumes à gagner (nœud, cache-oreilles, couronne, collier de perles, chapeau à écailles, chapeau de fête, pyjama, chapeau de magicien, costume de roi, costume lunaire) et musique de fond (fait)
3. Emballer le jeu avec Capacitor pour l'App Store et Google Play

## Appli Android (étape 3)

Le jeu est emballé en appli avec [Capacitor](https://capacitorjs.com/). Le fichier du jeu reste `catchACat.html` : la commande `npm run build` le copie dans `www/index.html` en remplaçant les polices Google par des polices locales, pour que l'appli marche sans internet.

- `assets/` : icône et écran de démarrage (régénérés avec `node tools/make-icons.cjs` puis `npx capacitor-assets generate --android`)
- `android/` : le projet Android généré par Capacitor
- `.github/workflows/android.yml` : à chaque envoi sur GitHub, un APK de test est construit automatiquement

### Installer l'APK de test sur un téléphone Android

1. Sur GitHub, onglet **Actions**, ouvrir la dernière exécution réussie de « Appli Android ».
2. En bas de la page, télécharger **attrape-minou-apk** (un fichier .zip contenant `attrape-minou.apk`).
3. Copier `attrape-minou.apk` sur le téléphone (ou télécharger le zip directement depuis le téléphone), puis l'ouvrir.
4. Le téléphone demande d'autoriser l'installation d'applications inconnues : accepter pour cette fois.

### Construire sur son ordinateur

Avec Node 22, Java 21 et Android Studio installés : `npm ci` puis `npm run apk`. L'APK se trouve dans `android/app/build/outputs/apk/debug/`.
