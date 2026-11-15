let solde = 1000;
let partieEnCours = false;
let sauvegardePossible = true;

try {
  let valeurSauvegardee = localStorage.getItem('cercle-solde');

  if (valeurSauvegardee !== null) {
    let nombre = Number(valeurSauvegardee);
    if (Number.isFinite(nombre) && nombre >= 0) {
      solde = nombre;
    }
  }
} catch (erreur) {
  sauvegardePossible = false;
}

function afficherSolde() {
  document.getElementById('solde').textContent = solde;

  let bouton = document.getElementById('recharger');
  bouton.disabled = solde >= 1 || partieEnCours;
}

function sauvegarderSolde() {
  try {
    localStorage.setItem('cercle-solde', String(solde));
  } catch (erreur) {
    sauvegardePossible = false;
  }

  if (!sauvegardePossible) {
    document.getElementById('sauvegarde').textContent =
      'Sauvegarde indisponible : le solde sera perdu en quittant la page.';
  }

  afficherSolde();
}

function afficherMessage(texte) {
  document.getElementById('message').textContent = texte;
}

function lireMise() {
  let mise = Number(document.getElementById('mise').value);

  if (!Number.isInteger(mise) || mise < 1 || mise > solde) {
    afficherMessage('La mise doit être un entier entre 1 et votre solde.');
    return 0;
  }

  return mise;
}

function terminerManche(gain, texte) {
  solde = solde + gain;
  partieEnCours = false;
  sauvegarderSolde();
  afficherMessage(texte + ' Bilan : ' + gain + ' jetons.');
}

function rechargerJetons() {
  if (solde < 1 && !partieEnCours) {
    solde = 1000;
    sauvegarderSolde();
  }
}

document.getElementById('recharger').addEventListener('click', rechargerJetons);
sauvegarderSolde();
