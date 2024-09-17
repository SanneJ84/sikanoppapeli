document.addEventListener("DOMContentLoaded", function() {
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
function heitaNoppaa() {                                                                                            // Nopan heittäminen
    if (tallennettuNimiLkm < 2) {                                                                                   // Tarkistetaan, että vähintään 2 pelaajaa on tallentanut nimen
        document.getElementById("viesti").textContent = "Tarvitaan vähintään 2 pelaajaa, jotta peli voi alkaa!";
        console.error("Ei tarpeeksi pelaajia");
        return;
    }

    let nopanNumero = Math.floor(Math.random() * 6) + 1;                                                            // Arvotaan nopan numero väliltä 1-6
    let noppaKuva = "kuvat/dice_" + ["one", "two", "three", "four", "five", "six"][nopanNumero - 1] + ".png";       // Valitaan nopan kuva nopan numeron perusteella

    let noppaElementti = document.getElementById("noppaKuva");                                                      // Haetaan nopan kuva
    noppaElementti.src = noppaKuva;                                                                                 // Vaihdetaan nopan kuva

    let viesti = document.getElementById("viesti");

    if (nopanNumero === 1) {                                                                                                // Jos nopan numero on 1
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;                                                                // Nollataan kuluvan kierroksen pisteet
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1];                // Päivitetään pelaajan pisteet
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitti 1, kierroksen pisteet nollataan ja vuoro vaihtuu!";    // Ilmoitetaan tuloksesta
        console.log("Ykkönen heitetty, vuoro vaihtuu");                                                                     // Tulostetaan konsoliin tieto ykkösen heittämisestä
        vuoronVaihto();                                                                                                     // Vaihdetaan vuoro
    } else {
        kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] += nopanNumero;                                                     // Lisätään nopan numero kuluvan kierroksen pisteisiin
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];  // Päivitetään pelaajan pisteet
        viesti.textContent = nimet[aktiivinenPelaaja - 1] + " heitti " + nopanNumero;                                       // Ilmoitetaan tuloksesta
        console.log("Pelaaja " + aktiivinenPelaaja + " heitti " + nopanNumero);                                             // Tulostetaan konsoliin tieto nopan heittämisestä
    }

    // Tarkistetaan voitto
    if (pisteet[aktiivinenPelaaja - 1] + kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] >= 100) {  
        pisteet[aktiivinenPelaaja - 1] += kuluvanKierroksenPisteet[aktiivinenPelaaja - 1]; 
        document.getElementById("pisteet" + aktiivinenPelaaja).textContent = pisteet[aktiivinenPelaaja - 1]; 
        viesti.textContent = "Pelaaja " + nimet[aktiivinenPelaaja - 1] + " on voittaja! Pisteet: " + pisteet[aktiivinenPelaaja - 1];
        console.log("Peli päättyi");
        document.getElementById("heita").disabled = true;
        return;
    }
}

function lopetaVuoro() {                                                                                                                                                                           
    if (tallennettuNimiLkm < 2) {   
        document.getElementById("viesti").textContent = "Tarvitaan vähintään 2 pelaajaa!";
        return; 
    }

    pisteet[aktiivinenPelaaja - 1] += kuluvanKierroksenPisteet[aktiivinenPelaaja - 1];
    kuluvanKierroksenPisteet[aktiivinenPelaaja - 1] = 0;

    let viesti = document.getElementById("viesti");

    // Tarkistetaan voitto
    if (pisteet[aktiivinenPelaaja - 1] >= 100) {        
        viesti.textContent = "Pelaaja " + nimet[aktiivinenPelaaja - 1] + " on voittaja! Pisteet: " + pisteet[aktiivinenPelaaja - 1];
        document.getElementById("heita").disabled = true;
        return; 
    }

    vuoronVaihto();
    viesti.textContent = "Pelaajan " + nimet[aktiivinenPelaaja - 1] + " vuoro";
}

// Vuoron vaihto 
function vuoronVaihto() {
    console.log("Vuoronvaihto");
    aktiivinenPelaaja++;                                                                         
    if (aktiivinenPelaaja > tallennettuNimiLkm) {
        aktiivinenPelaaja = 1;                                                                    
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
    document.getElementById("heita").disabled = false; 

    for (let i = 1; i <= 6; i++) {
        document.getElementById("pisteet" + i).textContent = "0";   
    }
}