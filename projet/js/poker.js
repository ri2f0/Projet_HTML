let paquet = [];
let mainJoueur = [];
let mainAdversaire = [];
let miseActuelle = 0;

function afficherPoker() {
  afficherMain('main-joueur', mainJoueur, 5);
  document.getElementById('combinaison').textContent = analyserMain(mainJoueur).nom;

  if (partieEnCours) {
    afficherMain('main-adversaire', mainAdversaire, 0);
  } else {
    afficherMain('main-adversaire', mainAdversaire, 5);
  }

  document.getElementById('distribuer').disabled = partieEnCours;
  document.getElementById('mise').disabled = partieEnCours;
  document.getElementById('echanger').disabled = !partieEnCours;

  for (let i = 0; i < 5; i++) {
    let choix = document.getElementById('carte-' + i);
    choix.disabled = !partieEnCours;
  }
  afficherSolde();
}

function commencerPoker(evenement) {
  evenement.preventDefault();
  if (partieEnCours) return;

  miseActuelle = lireMise();
  if (miseActuelle === 0) return;

  paquet = creerPaquet();
  mainJoueur = [];
  mainAdversaire = [];

  for (let i = 0; i < 5; i++) {
    mainJoueur.push(piocher(paquet));
    mainAdversaire.push(piocher(paquet));
    document.getElementById('carte-' + i).checked = false;
  }

  partieEnCours = true;
  afficherMessage('Cochez les numéros des cartes à remplacer, de gauche à droite.');
  afficherPoker();
}

function terminerPoker() {
  if (!partieEnCours) return;

  for (let i = 0; i < 5; i++) {
    if (document.getElementById('carte-' + i).checked) {
      mainJoueur[i] = piocher(paquet);
    }
  }

  let comparaison = comparerMains(mainJoueur, mainAdversaire);
  let gain = 0;
  let texte = 'Égalité.';

  if (comparaison === 1) {
    gain = miseActuelle;
    texte = 'Vous gagnez !';
  } else if (comparaison === -1) {
    gain = -miseActuelle;
    texte = 'L’adversaire gagne.';
  }

  texte += ' ' + analyserMain(mainJoueur).nom + ' contre ' + analyserMain(mainAdversaire).nom + '.';
  terminerManche(gain, texte);
  afficherPoker();
}

document.getElementById('formulaire').addEventListener('submit', commencerPoker);
document.getElementById('echanger').addEventListener('click', terminerPoker);
