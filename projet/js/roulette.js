let numerosRouges = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

function couleurNumero(numero) {
  if (numero === 0) return 'vert';
  if (numerosRouges.includes(numero)) return 'rouge';
  return 'noir';
}

function calculerGainRoulette(numero, pari, choix, mise) {
  let gain = -mise;
  let couleur = couleurNumero(numero);

  if (pari === 'numero' && numero === choix) gain = mise * 35;
  if (pari === 'rouge' && couleur === 'rouge') gain = mise;
  if (pari === 'noir' && couleur === 'noir') gain = mise;

  if (numero !== 0) {
    if (pari === 'pair' && numero % 2 === 0) gain = mise;
    if (pari === 'impair' && numero % 2 !== 0) gain = mise;
  }

  return gain;
}

function lancerRoulette(evenement) {
  evenement.preventDefault(); 
  let mise = lireMise();
  if (mise === 0) return;

  let pari = document.getElementById('pari').value;
  let champNumero = document.getElementById('numero');
  let choix = Number(champNumero.value);

  if (pari === 'numero') {
    if (champNumero.value === '' || !Number.isInteger(choix) || choix < 0 || choix > 36) {
      afficherMessage('Choisissez un numéro entier entre 0 et 36.');
      return;
    }
  }

  let numero = Math.floor(Math.random() * 37);
  let couleur = couleurNumero(numero);
  let gain = calculerGainRoulette(numero, pari, choix, mise);
  let resultat = document.getElementById('resultat');
  resultat.textContent = numero;
  resultat.className = 'numero ' + couleur;

  terminerManche(gain, 'Numéro ' + numero + ' (' + couleur + ').');
}

function afficherChoixNumero() {
  let numeroChoisi = document.getElementById('pari').value === 'numero';
  document.getElementById('choix-numero').hidden = !numeroChoisi;
  document.getElementById('numero').disabled = !numeroChoisi;
}

document.getElementById('formulaire').addEventListener('submit', lancerRoulette);
document.getElementById('pari').addEventListener('change', afficherChoixNumero);
afficherChoixNumero();
