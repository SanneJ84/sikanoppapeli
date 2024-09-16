
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
        console.log("ei tarpeeksi pelaajia");
        return;                                                                                                     // Estetään noppaa heittämästä, jos pelaajia ei ole tarpeeksi
    }

    // Tarkistetaan onko joku heittänyt 100 pistettä
    if (pisteet.some(piste => piste >= 100)) {
        document.getElementById("viesti").textContent = "Peli on päättynyt! Voittaja: " + nimet[pisteet.indexOf(Math.max(...pisteet))];
        console.log("Peli päättyi");
        return;                                                                                                     // Jos on niin lopetetaan peli
    }

    let nopanNumero = Math.floor(Math.random() * 6) + 1;                                                            // Satunnainen numero 1-6
    let noppaKuva = "kuvat/dice_" + ["one", "two", "three", "four", "five", "six"][nopanNumero - 1] + ".png";

    let nopanNumero2 = Math.floor(Math.random() * 6) + 1;                                                            // Satunnainen numero 1-6
    let noppaKuva2 = "kuvat/dice_" + ["one", "two", "three", "four", "five", "six"][nopanNumero2 - 1] + ".png";
    console.log(nopanNumero, nopanNumero2);

    
    let noppaElementti = document.getElementById("noppaKuva");
    noppaElementti.src = noppaKuva;                                                                                 // Päivitetään nopan kuva
    let noppaElementti2 = document.getElementById("noppaKuva2");                                                    // Päivitetään toisen nopan kuva
    noppaElementti2.src = noppaKuva2;                                                                               // Päivitetään nopan kuva


    // Päivitetään viesti ja pisteet
    let viesti = document.getElementById("viesti");

    if (nopanNumero === 1 && nopanNumero2 != 1) {                                                                   // Jos ensimmäinen noppa on 1 ja toinen ei ole 1
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan kuluvan kierroksen pisteet
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1];        // Päivitetään kokonaispisteet
        let pelaajaNimi = nimet[aktiivinenPelaaja - 1];                                                             // Tallennetaan pelaajan nimi ennen vuoron vaihtoa jotta voidaan käyttää viestissä 
        tuplatHeitetty = 0;                                                                                         // Nollataan tuplalaskuri
        vuoronVaihto();                                                                                             // Vaihdetaan vuoro
        viesti.textContent = pelaajaNimi + " heitti ykkösen - kierroksen pisteet nollataan ja vuoro vaihtuu";                  // Käytetään tallennettua nimeä
        console.log("Ykkönen heitettiin, pisteet nollataan ja vuoro vaihtuu");
    } else if (nopanNumero2 === 1 && nopanNumero != 1) {                                                            // Jos toinen noppa on 1 ja ensimmäinen ei ole 1  
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan kuluvan kierroksen pisteet
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1];        // Päivitetään kokonaispisteet
        let pelaajaNimi = nimet[aktiivinenPelaaja - 1];                                                             // Tallennetaan pelaajan nimi ennen vuoron vaihtoa jotta voidaan käyttää viestissä 
        tuplatHeitetty = 0;                                                                                         // Nollataan tuplalaskuri
        vuoronVaihto();                                                                                             // Vaihdetaan vuoro
        viesti.textContent = pelaajaNimi + " heitti ykkösen - kierroksen pisteet nollataan ja vuoro vaihtuu";                  // Käytetään tallennettua nimeä
        console.log("Ykkönen heitettiin, vuoro vaihtuu");
    } else if (nopanNumero === 1 && nopanNumero2 === 1) {                                                           // Jos molemmat nopat ovat 1
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += 25;                                                      // Lisätään 25 pistettä kuluvan kierroksen pisteisiin
        tuplatHeitetty = 0;                                                                                         // Nollataan tuplalaskuri, koska tämä ei ole tavallinen tupla
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1]; // Näytetään kokonaispisteet
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit kaksi ykköstä - saat 25 pistettä";
        console.log("Kaksi ykköstä heitettiin, lisätään 25 pistettä");
    } else if (nopanNumero === nopanNumero2) {                                                                      // Jos molemmat nopat ovat samoja
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += (nopanNumero + nopanNumero2) * 2;                        // Tuplat lasketaan kaksinkertaisena
        tuplatHeitetty++;                                                                                           // Lisätään tuplalaskuriin
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit tuplat - saat " + (nopanNumero + nopanNumero2) *2 + " pistettä!";
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
        console.log("Tuplat heitettiin");

        // Tarkistetaan onko heitetty tuplat kolme kertaa peräkkäin
        if (tuplatHeitetty === 3) {
            kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                    // Nollataan kuluvan kierroksen pisteet
            viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit tuplat kolme kertaa - kierroksen pisteet nollataan ja vuoro vaihtuu!";
            vuoronVaihto();                                                                                         // Vaihdetaan vuoro
            console.log("Tuplat heitettiin kolme kertaa, kierroksen pisteet nollataan");
        }
    } else {
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += nopanNumero + nopanNumero2;                              // Lisätään normaalit pisteet
        tuplatHeitetty = 0;                                                                                         // Nollataan tuplalaskuri
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitit " + (nopanNumero + nopanNumero2);
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
    }
}

function lopetaVuoroNappi() {
    lopetaVuoro();
}

function lopetaVuoro() {
    if (tallennettuNimiLkm < 2) {                                                                               // Jos pelaajia ei ole tarpeeksi
        document.getElementById("viesti").textContent = "Tarvitaan vähintään 2 pelaajaa!";                      // Ilmoitetaan tarvittavien pelaajien määrästä
        return;
    }

    // Lisää kuluvan kierroksen pisteet kokonaispisteisiin
    pisteet[aktiivinenPelaaja - 1] += kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];  
    kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                        // Nollataan kuluvan kierroksen pisteet

    let viesti = document.getElementById("viesti");

    // Tarkistetaan, voittaako pelaaja
    if (pisteet[aktiivinenPelaaja - 1] >= 100) {
        viesti.textContent = "Pelaaja " + nimet[aktiivinenPelaaja - 1] + " on voittaja! Pisteet: " + pisteet[aktiivinenPelaaja - 1];
        console.log("peli päättyi, voittaja: " + nimet[aktiivinenPelaaja - 1]);
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
    tuplatHeitetty = 0;                                                                                         // Nollataan tuplat laskuri

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