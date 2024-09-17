
document.addEventListener("DOMContentLoaded", function () {
    // Lisätään kuuntelijat painikkeille
    document.getElementById("heita").addEventListener("click", heitaNoppaa);
    document.getElementById("lopeta").addEventListener("click", lopetaVuoro);
    document.getElementById("uusiPeli").addEventListener("click", uusiPeli);
});

let nimet = [];                                                                                                     // Tallentaa pelaajien nimet
let aktiivinenPelaaja = 1;                                                                                          // Aloitetaan pelaajasta 1
let pisteet = [0, 0, 0, 0, 0, 0];                                                                                   // Pisteet kaikille pelaajille (enintään 6 pelaajaa)
let tallennettuNimiLkm = 0;                                                                                         // Seuraa montako pelaajaa on tallentanut nimen
let kuluvanKierroksenPisteet = [0, 0, 0, 0, 0, 0];                                                                  // Kuluvan kierroksen pisteet
let tuplatHeitetty = 0;                                                                                             // Seuraa montako kertaa tuplat on heitetty


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
        console.error("Ei tarpeeksi pelaajia");
        return;                                                                                                     // Estetään noppaa heittämästä, jos pelaajia ei ole tarpeeksi
    }

    if (pisteet[aktiivinenPelaaja - 1] >= 100) {                                                                            // Jos pelaaja on jo voittanut
        document.getElementById("viesti").textContent = "Pelaaja " + nimet[aktiivinenPelaaja - 1] + " on jo voittanut!";    // Ilmoitetaan voitosta
        console.log("Peli on päättynyt");
        return;
    }

    let nopanNumero = Math.floor(Math.random() * 6) + 1;                                                            // Satunnainen numero 1-6
    let noppaKuva = "kuvat/dice_" + ["one", "two", "three", "four", "five", "six"][nopanNumero - 1] + ".png";

    let nopanNumero2 = Math.floor(Math.random() * 6) + 1;                                                            // Satunnainen numero 1-6
    let noppaKuva2 = "kuvat/dice_" + ["one", "two", "three", "four", "five", "six"][nopanNumero2 - 1] + ".png";
    console.log(nopanNumero, nopanNumero2);

    let noppaElementti = document.getElementById("noppaKuva");                                                      // Päivitetään nopan kuva
    noppaElementti.src = noppaKuva;
    let noppaElementti2 = document.getElementById("noppaKuva2");                                                    // Päivitetään toisen nopan kuva
    noppaElementti2.src = noppaKuva2;

    // Päivitetään viesti ja pisteet
    let viesti = document.getElementById("viesti");

    if (nopanNumero === 1 && nopanNumero2 != 1) {                                                                   // Jos ensimmäinen noppa on 1 ja toinen ei ole 1
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan kuluvan kierroksen pisteet
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1];
        let pelaajaNimi = nimet[aktiivinenPelaaja - 1];
        tuplatHeitetty = 0;
        vuoronVaihto();                                                                                             // Vaihdetaan vuoro
        viesti.textContent = pelaajaNimi + " heitti ykkösen - kierroksen pisteet nollataan ja vuoro vaihtuu";
        console.log("Ykkönen heitettiin, pisteet nollataan ja vuoro vaihtuu");

    } else if (nopanNumero2 === 1 && nopanNumero != 1) {                                                            // Jos toinen noppa on 1 ja ensimmäinen ei ole 1  
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan kuluvan kierroksen pisteet
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1];
        let pelaajaNimi = nimet[aktiivinenPelaaja - 1];
        tuplatHeitetty = 0;
        vuoronVaihto();                                                                                             // Vaihdetaan vuoro
        viesti.textContent = pelaajaNimi + " heitti ykkösen - kierroksen pisteet nollataan ja vuoro vaihtuu";
        console.log("Ykkönen heitettiin, vuoro vaihtuu");

    } else if (nopanNumero === 1 && nopanNumero2 === 1) {                                                           // Jos molemmat nopat ovat 1
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += 25;                                                      // Lisätään 25 pistettä kuluvan kierroksen pisteisiin
        tuplatHeitetty = 0;                                                                                         // Nollataan tuplalaskuri, tämä ei ole tavallinen tupla
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit kaksi ykköstä - saat 25 pistettä";
        console.log("Kaksi ykköstä heitettiin, lisätään 25 pistettä");

    } else if (nopanNumero === nopanNumero2) {                                                                      // Jos molemmat nopat ovat samoja
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += (nopanNumero + nopanNumero2) * 2;                        // Tuplat lasketaan kaksinkertaisena
        tuplatHeitetty++;                                                                                           // Lisätään tuplalaskuriin
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit tuplat - saat " + (nopanNumero + nopanNumero2) * 2 + " pistettä!";
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
        console.log("Tuplat heitettiin");

        // Tarkistetaan onko heitetty tuplat kolme kertaa peräkkäin
        if (tuplatHeitetty === 3) {
            kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                    // Jos tuplat on heitetty kolme kertaa, nollataan kierroksen pisteet
            viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit tuplat kolme kertaa - kierroksen pisteet nollataan ja vuoro vaihtuu!";
            vuoronVaihto();                                                                                         // Vaihdetaan vuoro
            console.log("Tuplat heitettiin kolme kertaa, kierroksen pisteet nollataan");
        }
    } else {                                                                                                        // Jos ei ole ykkösiä tai tuplia 
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += nopanNumero + nopanNumero2;                              // Lisätään nopan numerot kuluvan kierroksen pisteisiin
        tuplatHeitetty = 0;
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit " + (nopanNumero + nopanNumero2);
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
    }

    // Tarkistetaan, ylittääkö pelaajan kokonaispisteet 100
    if (pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] > 100) {
        document.getElementById("viesti").textContent = nimet[aktiivinenPelaaja - 1] + " on voittanut pelin!";
        console.log(nimet[aktiivinenPelaaja - 1] + " on voittanut pelin!");
        document.getElementById("heita").disabled = true;                                                           // Estetään nopan heittäminen voiton jälkeen
        return;
    }
}

function lopetaVuoro() {
    if (tallennettuNimiLkm < 2) {                                                                                   // Jos pelaajia ei ole tarpeeksi
        document.getElementById("viesti").textContent = "Tarvitaan vähintään 2 pelaajaa!";                          // Ilmoitetaan tarvittavien pelaajien määrästä
        return;
    }

    pisteet[aktiivinenPelaaja - 1] += kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
    kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;

    let viesti = document.getElementById("viesti");

    // Tarkistetaan, voittaako pelaaja
    if (pisteet[aktiivinenPelaaja - 1] >= 100) {
        viesti.textContent = "Pelaaja " + nimet[aktiivinenPelaaja - 1] + " on voittaja! Pisteet: " + pisteet[aktiivinenPelaaja - 1];
        console.log("peli päättyi, voittaja: " + nimet[aktiivinenPelaaja - 1]);
        return;
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

// Uuden pelin aloittaminen, nollataan kaikki arvot
function uusiPeli() {
    console.log("Uusi peli");
    nimet = [];
    aktiivinenPelaaja = 1;
    pisteet = [0, 0, 0, 0, 0, 0];
    tallennettuNimiLkm = 0;
    kuluvanKierroksenPisteet = [0, 0, 0, 0, 0, 0];
    tuplatHeitetty = 0;

    for (let i = 1; i <= 6; i++) {
        document.getElementById("nimi" + i).value = "";
        document.getElementById("nimi" + i).disabled = false;
        document.getElementById("nimi" + i).style.backgroundColor = "white";
        document.getElementById("nimi" + i).style.color = "black";
        document.getElementById("nimi" + i).style.textAlign = "left";
    }

    for (let i = 1; i <= 6; i++) {
        document.getElementById("pisteet" + i).textContent = "0";
    }

    document.getElementById("viesti").textContent = "Kirjoita pelaajien nimet ja aloita peli!";
    document.getElementById("noppaKuva").src = "kuvat/dice_one.png";
    document.getElementById("noppaKuva2").src = "kuvat/dice_one.png";
    document.getElementById("heita").disabled = false;
}