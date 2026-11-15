// Blackjack français simplifié : aucune carte cachée pour le croupier.
// Il prend sa deuxième carte seulement quand le joueur a terminé.
// Variables de la manche en cours.
let paquet = [];
let mainJoueur = [];
let mainCroupier = [];
let miseActuelle = 0;

function calculerScore(main) {
  let total = 0;
  let nombreAs = 0;

  for (let i = 0; i < main.length; i++) {
    let valeur = main[i].valeur;

    if (valeur === 14) {
      total = total + 11;
      nombreAs++;
    } else if (valeur > 10) {
      total = total + 10;
    } else {
      total = total + valeur;
    }
  }

  // Si le total dépasse 21, un as peut passer de 11 à 1.
  while (total > 21 && nombreAs > 0) {
    total = total - 10;
    nombreAs--;
  }

  return total;
}

function afficherBlackjack() {
  afficherMain('main-joueur', mainJoueur, mainJoueur.length);
  document.getElementById('score-joueur').textContent = 'Votre total : ' + calculerScore(mainJoueur);

  if (partieEnCours) {
    afficherMain('main-croupier', mainCroupier, 1);
    document.getElementById('score-croupier').textContent = 'Une seule carte : la deuxième sera tirée après votre tour.';
  } else {
    afficherMain('main-croupier', mainCroupier, mainCroupier.length);
    document.getElementById('score-croupier').textContent = 'Total du croupier : ' + calculerScore(mainCroupier);
  }

  document.getElementById('distribuer').disabled = partieEnCours;
  document.getElementById('mise').disabled = partieEnCours;
  document.getElementById('tirer').disabled = !partieEnCours;
  document.getElementById('rester').disabled = !partieEnCours;
  afficherSolde();
}

function finirBlackjack(gain, texte) {
  terminerManche(gain, texte);
  afficherBlackjack();
}

function commencerBlackjack(evenement) {
  evenement.preventDefault();
  if (partieEnCours) return;

  miseActuelle = lireMise();
  if (miseActuelle === 0) return;

  // Six jeux de 52 cartes. Pour simplifier, le sabot est renouvelé à chaque manche.
  paquet = [];
  for (let i = 0; i < 6; i++) {
    paquet = paquet.concat(creerPaquet());
  }

  // Premier passage : une carte au joueur et une au croupier.
  // Deuxième passage : une carte au joueur seulement.
  mainJoueur = [piocher(paquet)];
  mainCroupier = [piocher(paquet)];
  mainJoueur.push(piocher(paquet));
  partieEnCours = true;
  afficherMessage('Mise : ' + miseActuelle + ' jetons. Tirer ou rester ?');

  // Avec un blackjack, le joueur a fini. Vérifier alors la main du croupier
  // avant de payer : il peut encore obtenir lui aussi un blackjack.
  if (calculerScore(mainJoueur) === 21) {
    rester();
  } else {
    afficherBlackjack();
  }
}

function tirerCarte() {
  if (!partieEnCours) return;
  mainJoueur.push(piocher(paquet));

  if (calculerScore(mainJoueur) > 21) {
    finirBlackjack(-miseActuelle, 'Vous dépassez 21.');
  } else if (calculerScore(mainJoueur) === 21) {
    rester();
  } else {
    afficherBlackjack();
  }
}

function rester() {
  if (!partieEnCours) return;

  // C'est seulement maintenant que le croupier prend sa deuxième carte.
  mainCroupier.push(piocher(paquet));
  let joueurNaturel = mainJoueur.length === 2 && calculerScore(mainJoueur) === 21;
  let croupierNaturel = mainCroupier.length === 2 && calculerScore(mainCroupier) === 21;

  // Un blackjack naturel est plus fort qu'un 21 obtenu avec trois cartes ou plus.
  if (joueurNaturel && croupierNaturel) {
    finirBlackjack(0, 'Deux blackjacks : égalité.');
    return;
  }
  if (croupierNaturel) {
    finirBlackjack(-miseActuelle, 'Blackjack du croupier.');
    return;
  }
  if (joueurNaturel) {
    finirBlackjack(miseActuelle * 1.5, 'Blackjack naturel !');
    return;
  }

  while (calculerScore(mainCroupier) < 17) {
    mainCroupier.push(piocher(paquet));
  }

  let joueur = calculerScore(mainJoueur);
  let croupier = calculerScore(mainCroupier);

  if (croupier > 21 || joueur > croupier) {
    finirBlackjack(miseActuelle, 'Vous gagnez !');
  } else if (joueur === croupier) {
    finirBlackjack(0, 'Égalité.');
  } else {
    finirBlackjack(-miseActuelle, 'Le croupier gagne.');
  }
}

document.getElementById('formulaire').addEventListener('submit', commencerBlackjack);
document.getElementById('tirer').addEventListener('click', tirerCarte);
document.getElementById('rester').addEventListener('click', rester);
