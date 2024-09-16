
let nimet = [];                                                                                                     // Tallentaa pelaajien nimet
let aktiivinenPelaaja = 1;                                                                                          // Aloitetaan pelaajasta 1
let pisteet = [0, 0, 0, 0, 0, 0];                                                                                   // Pisteet kaikille pelaajille (enintään 6 pelaajaa)
let tallennettuNimiLkm = 0;                                                                                         // Seuraa montako pelaajaa on tallentanut nimen
let kuluvanKierroksenPisteet = [0, 0, 0, 0, 0, 0];                                                                  // Kuluvan kierroksen pisteet


function tallennaNimi(pelaajaNumero) {
    let nimi = document.getElementById("nimi" + pelaajaNumero).value;                                               // Haetaan pelaajan nimi
    if (nimi.trim() !== "") {                                                                                       // Tarkistetaan, että nimi ei ole tyhjä
        nimet[pelaajaNumero - 1] = nimi;                                                                            // Tallennetaan nimi taulukkoon
        document.getElementById("nimi" + pelaajaNumero).disabled = true;                                            // Estetään nimen muokkaus
        document.getElementById("nimi" + pelaajaNumero).style.backgroundColor = "black";                            // Vaihdetaan taustaväri
        document.getElementById("nimi" + pelaajaNumero).style.color = "white";                                      // Vaihdetaan tekstin väri
        document.getElementById("nimi" + pelaajaNumero).style.textAlign = "center";                                 // Keskitetään teksti
        tallennettuNimiLkm++;                                                                                       // Kasvatetaan tallennettujen nimien määrää
        if (tallennettuNimiLkm === 2) {                                                                             // Kun vähintään 2 pelaajaa on tallentanut nimen
            document.getElementById("viesti").textContent = "Peli voi alkaa! Pelaajan " + nimet[0] + " vuoro";      // Ilmoitetaan pelin alkamisesta
            aktiivinenPelaaja = 1;                                                                                  // Asetetaan ensimmäinen pelaaja aktiiviseksi
        }
    }
}

function heitaNoppaa() {
    if (tallennettuNimiLkm < 2) {
        document.getElementById("viesti").textContent = "Tarvitaan vähintään 2 pelaajaa, jotta peli voi alkaa!";
        return;                                                                                                     // Estetään noppaa heittämästä, jos pelaajia ei ole tarpeeksi
    }

    // Tarkistetaan onko joku heittänyt 100 pistettä
    if (pisteet.some(piste => piste >= 100)) {
        document.getElementById("viesti").textContent = "Peli on päättynyt! Voittaja: " + nimet[pisteet.indexOf(Math.max(...pisteet))];
        return;                                                                                                     // Jos on niin lopetetaan peli
    }

    let nopanNumero = Math.floor(Math.random() * 6) + 1;                                                            // Satunnainen numero 1-6
    let noppaKuva = "kuvat/dice_" + ["one", "two", "three", "four", "five", "six"][nopanNumero - 1] + ".png";

    let noppaElementti = document.getElementById("noppaKuva");
    noppaElementti.src = noppaKuva;                                                                                 // Päivitetään nopan kuva

    // Päivitetään viesti ja pisteet
    let viesti = document.getElementById("viesti");

    if (nopanNumero === 1) {    
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan vain kuluvan kierroksen pisteet
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1];        // Päivitetään kokonaispisteet
        viesti.textContent = nimet[aktiivinenPelaaja -1] + " heitti 1, kierroksen pisteet nollataan ja vuoro vaihtuu!";  // Ilmoitetaan, että pelaaja heitti 1:n
        vuoronVaihto();                                                                                             // Vaihdetaan vuoro
    } else {
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += nopanNumero;                                             // Lisätään nopan tulos kuluvan kierroksen pisteisiin
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1]; // Näytetään kokonaispisteet
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitti " + nopanNumero;
    }
}

function lopetaVuoroNappi() {
    lopetaVuoro();
}

function lopetaVuoro() {

    if (tallennettuNimiLkm < 2) {                                                                              // Tarkistetaan onko tarpeeksi pelaajia
        document.getElementById("viesti").textContent = "Tarvitaan vähintään 2 pelaajaa!";                     // Ilmoitetaan, jos ei ole
        return;
    }

    // Lisää kuluvan kierroksen pisteet kokonaispisteisiin
    pisteet[aktiivinenPelaaja - 1] += kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
    kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan kuluvan kierroksen pisteet

    let viesti = document.getElementById("viesti");

    // Tarkistetaan, voittaako pelaaja
    if (pisteet[aktiivinenPelaaja - 1] >= 100) {                                                                // Kun pelaaja voittaa saavuttaessaan 100 pistettä
        viesti.textContent = "Pelaaja " + nimet[aktiivinenPelaaja - 1] + " on voittaja! Pisteet: " + pisteet[aktiivinenPelaaja - 1];
        return;                                                                                                 // Lopetetaan peli
    }

    vuoronVaihto();
    viesti.textContent = "Pelaajan " + nimet[aktiivinenPelaaja - 1] + " vuoro";

}

function vuoronVaihto() {
    console.log("Vuoronvaihto");                                                                                        
    aktiivinenPelaaja++;                                                                                        // Siirrytään seuraavaan pelaajaan
    if (aktiivinenPelaaja > tallennettuNimiLkm) {
        aktiivinenPelaaja = 1;                                                                                  // Palataan ensimmäiseen pelaajaan, kun vuorot on käyty läpi
    }
}

function uusiPeli() {
    console.log("Uusi peli");
    nimet = [];                                                                                                 // Tyhjennetään nimet
    aktiivinenPelaaja = 1;                                                                                      // Aloitetaan pelaajasta 1
    pisteet = [0, 0, 0, 0, 0, 0];                                                                               // Nollataan pisteet
    tallennettuNimiLkm = 0;                                                                                     // Nollataan tallennettujen nimien määrä
    kuluvanKierroksenPisteet = [0, 0, 0, 0, 0, 0];                                                              // Nollataan kuluvan kierroksen pisteet

    // Tyhjennetään nimikentät
    for (let i = 1; i <= 6; i++) {
        document.getElementById("nimi" + i).value = "";
        document.getElementById("nimi" + i).disabled = false;
        document.getElementById("nimi" + i).style.backgroundColor = "white";
        document.getElementById("nimi" + i).style.color = "black";
        document.getElementById("nimi" + i).style.textAlign = "left";
    }

    // Tyhjennetään pisteet
    for (let i = 1; i <= 6; i++) {
        document.getElementById("pisteet" + i).textContent = "0";
    }

    // Tyhjennetään viesti
    document.getElementById("viesti").textContent = "Kirjoita pelaajien nimet ja aloita peli!";
    document.getElementById("noppaKuva").src = "kuvat/dice_one.png";                                            // Palautetaan nopan kuva
    document.getElementById("noppaKuva2").src = "kuvat/dice_one.png";                                           // Palautetaan toisen nopan kuva
}