function compterValeurs(main) {
  let compte = [];
  for (let valeur = 0; valeur <= 14; valeur++) {
    compte[valeur] = 0;
  }
  for (let i = 0; i < main.length; i++) {
    compte[main[i].valeur]++;
  }
  return compte;
}

function analyserMain(main) {
  let compte = compterValeurs(main);
  let valeurs = [];
  let groupes = [];
  let paires = 0;
  let brelan = false;
  let carre = false;

  for (let valeur = 14; valeur >= 2; valeur--) {
    if (compte[valeur] > 0) valeurs.push(valeur);
    if (compte[valeur] === 2) paires++;
    if (compte[valeur] === 3) brelan = true;
    if (compte[valeur] === 4) carre = true;
  }

  for (let quantite = 4; quantite >= 1; quantite--) {
    for (let valeur = 14; valeur >= 2; valeur--) {
      if (compte[valeur] === quantite) groupes.push(valeur);
    }
  }

  let couleur = true;
  for (let i = 1; i < main.length; i++) {
    if (main[i].symbole !== main[0].symbole) couleur = false;
  }

  let suite = false;
  let sommetSuite = valeurs[0];
  if (valeurs.length === 5) {
    if (valeurs[0] - valeurs[4] === 4) suite = true;
    // Cas particulier : A, 5, 4, 3, 2 est une suite au 5.
    if (valeurs.join(',') === '14,5,4,3,2') {
      suite = true;
      sommetSuite = 5;
    }
  }

  let resultat = { nom: 'Carte haute', force: 0, departage: groupes };

  if (suite && couleur) {
    resultat.nom = 'Quinte flush';
    resultat.force = 8;
    resultat.departage = [sommetSuite];
  } else if (carre) {
    resultat.nom = 'Carré';
    resultat.force = 7;
  } else if (brelan && paires === 1) {
    resultat.nom = 'Full';
    resultat.force = 6;
  } else if (couleur) {
    resultat.nom = 'Couleur';
    resultat.force = 5;
    resultat.departage = valeurs;
  } else if (suite) {
    resultat.nom = 'Suite';
    resultat.force = 4;
    resultat.departage = [sommetSuite];
  } else if (brelan) {
    resultat.nom = 'Brelan';
    resultat.force = 3;
  } else if (paires === 2) {
    resultat.nom = 'Double paire';
    resultat.force = 2;
  } else if (paires === 1) {
    resultat.nom = 'Paire';
    resultat.force = 1;
  }

  return resultat;
}

function comparerMains(mainJoueur, mainAdversaire) {
  let joueur = analyserMain(mainJoueur);
  let adversaire = analyserMain(mainAdversaire);

  if (joueur.force > adversaire.force) return 1;
  if (joueur.force < adversaire.force) return -1;

  for (let i = 0; i < joueur.departage.length; i++) {
    if (joueur.departage[i] > adversaire.departage[i]) return 1;
    if (joueur.departage[i] < adversaire.departage[i]) return -1;
  }
  return 0;
}
