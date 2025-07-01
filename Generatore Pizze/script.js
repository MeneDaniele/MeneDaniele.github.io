let ingredienti = {
    formaggio: [
        'mozzarella',
        'fontina',
        'scamorza',
        'bufala',
        'taleggio',
        'gorgonzola',
        'grana',
        'pecorino',
        'brie'
    ],
    verdure: [
        'peperoni',
        'melanzane',
        'cipolle',
        'pomodorini',
        'carciofi',
        'asparagi',
        'olive',
        'funghi',
        'capperi'
    ],
    proteine: [
        'pancetta',
        'prosciutto cotto',
        'prosciutto crudo',
        'speck',
        'bresaola',
        'lardo',
        'tonno',
        'calamari',
    ],
    aggiunte: [
        'nutella',
        'cozza',
        'marmellata'
    ],
    impasti: [
        'normale',
        'integrale',
        'senza glutine',
        'ai cereali',
        'al carbone'
    ]
}

// ARRAY INGREDIENTI, AGGIUNTA, IMPASTO
// let formaggi = [
//     'mozzarella',
//     'fontina',
//     'scamorza',
//     'bufala',
//     'taleggio',
//     'gorgonzola',
//     'grana',
//     'pecorino',
//     'brie'
// ];
// let verdure = [
//     'peperoni',
//     'melanzane',
//     'cipolle',
//     'pomodorini',
//     'carciofi',
//     'asparagi',
//     'olive',
//     'funghi',
//     'capperi'
// ];
// let proteina = [
//     'pancetta',
//     'prosciutto cotto',
//     'prosciutto crudo',
//     'speck',
//     'bresaola',
//     'lardo',
//     'tonno',
//     'calamari',
// ];
//
// let impasti = [
//     'normale',
//     'integrale',
//     'senza glutine',
//     'ai cereali',
//     'al carbone'
// ];
// let aggiunte = [
//     'nutella',
//     'cozza',
//     'marmellata'
// ];

function selezioneIngredienti(arrayIngredienti) {
    let ingredienteScelto = arrayIngredienti[Math.floor(Math.random() * arrayIngredienti.length)]
    return ingredienteScelto;
}

function generaIngredienti() {
    let formaggioRandom = selezioneIngredienti(ingredienti.formaggio);
    let verduraRandom = selezioneIngredienti(ingredienti.verdure);
    let proteinaRandom = selezioneIngredienti(ingredienti.proteine);
    let aggiunta = document.getElementById('ingredienti');
    aggiunta.innerHTML = `${formaggioRandom}, ${verduraRandom} e ${proteinaRandom}`;
}

function generaAggiunta(){
    let aggiuntaRandom = selezioneIngredienti(ingredienti.aggiunte);
    let aggiunta = document.getElementById('aggiunta');
aggiunta.innerHTML = aggiuntaRandom;
}

function generaImpasto() {
    let impastoRandom = selezioneIngredienti(ingredienti.impasti);
    let impastoTest = document.getElementById('impasto');
    impastoTest.innerHTML = impastoRandom;
}

function generaTutto() {
    generaIngredienti();
    generaAggiunta();
    generaImpasto();
}