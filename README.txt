France Casino
Projet de programmation web réalisé à l’EFREI par Jean-Baptiste Richard et Nohlan Riffault.

France Casino propose trois mini-jeux avec des jetons fictifs : un blackjack simplifié, une roulette et un poker à cinq cartes.
Technologies utilisées
- HTML pour structurer les pages.
- CSS pour la mise en forme.
- JavaScript pour le fonctionnement des jeux et la gestion du solde.
Organisation du projet
- html/ : accueil, pages des jeux et page À propos.
- css/style.css : présentation du site.
- js/commun.js : gestion du solde, des mises et de la recharge.
- js/cartes.js : création des cartes, tirage et affichage.
- js/combinaisons.js : analyse et comparaison des mains de poker.
- js/blackjack.js, js/roulette.js, js/poker.js : fonctionnement des jeux.
- txt/ : sujet du projet.
Lancer le site
1. Ouvrir le dossier du projet dans Visual Studio Code.
2. Utiliser un serveur local, par exemple l’extension Live Server.
3. Ouvrir html/index.html avec ce serveur.
Jouer dans un seul onglet pour éviter les incohérences de solde.
Fonctionnement
Le joueur commence avec 1 000 jetons. Le solde est partagé entre les jeux et sauvegardé dans le navigateur grâce à localStorage.

La mise doit être un nombre entier, supérieur ou égal à 1 et inférieur ou égal au solde disponible. Une recharge à 1 000 jetons est possible lorsque le solde est inférieur à 1, en dehors d’une manche.

Seul le solde est sauvegardé. Quitter une manche avant son résultat l’annule sans modifier le solde.
Les jeux
Blackjack français simplifié
Le joueur cherche à battre le croupier sans dépasser 21. Il peut tirer une carte ou rester. Le croupier reçoit sa deuxième carte après le tour du joueur et tire jusqu’à atteindre au moins 17.

Une victoire ordinaire rapporte la mise en gain net. Un blackjack naturel gagnant rapporte 1,5 fois la mise. Le jeu ne propose ni assurance, ni doublement, ni séparation des paires.
Roulette
Le joueur peut miser sur une couleur, une parité ou un numéro entre 0 et 36.

Un pari gagnant sur une couleur ou une parité rapporte la mise en gain net. Un numéro exact rapporte 35 fois la mise. Le zéro fait perdre les paris sur la couleur et la parité.
Poker à cinq cartes
Le joueur et l’adversaire reçoivent cinq cartes. Le joueur peut échanger une fois les cartes de son choix. L’adversaire conserve ses cartes de départ.

Les deux mains sont ensuite comparées. Une victoire rapporte la mise en gain net, une défaite la retire et une égalité ne modifie pas le solde.
Ressources
Une assistance de ChatGPT a été utilisée pour comprendre le code et corriger des erreurs.

Ce projet est pédagogique : les jetons sont fictifs et aucun argent réel n’est utilisé.