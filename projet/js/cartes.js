function creerPaquet() {
  let paquet = [];
  let symboles = ['♠', '♥', '♣', '♦'];

  for (let i = 0; i < symboles.length; i++) {
    for (let valeur = 2; valeur <= 14; valeur++) {
      paquet.push({ valeur: valeur, symbole: symboles[i] });
    }
  }

  return paquet;
}

function piocher(paquet) {
  let position = Math.floor(Math.random() * paquet.length);
  let carte = paquet[position];
  paquet.splice(position, 1);
  return carte;
}

function nomCarte(carte) {
  let nom = carte.valeur;

  if (carte.valeur === 11) nom = 'V';
  if (carte.valeur === 12) nom = 'D';
  if (carte.valeur === 13) nom = 'R';
  if (carte.valeur === 14) nom = 'A';

  return nom + ' ' + carte.symbole;
}

function creerCarteHTML(carte) {
  let element = document.createElement('span');
  element.className = 'carte';
  element.textContent = nomCarte(carte);

  if (carte.symbole === '♥' || carte.symbole === '♦') {
    element.classList.add('carte-rouge');
  }

  return element;
}

function afficherMain(id, main, nombreVisible) {
  let zone = document.getElementById(id);
  zone.textContent = '';

  for (let i = 0; i < main.length; i++) {
    if (i < nombreVisible) {
      zone.appendChild(creerCarteHTML(main[i]));
    } else {
      let dos = document.createElement('span');
      dos.className = 'carte carte-cachee';
      dos.textContent = '?';
      dos.setAttribute('aria-label', 'Carte cachée');
      zone.appendChild(dos);
    }
  }
}
