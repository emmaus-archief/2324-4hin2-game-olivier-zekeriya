/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 6;
var spelStatus = UITLEG;

var spelerX = 250; // x-positie van speler
var spelerY = 600; // y-positie van speler 
var vijandX = 1300; // x-positie van vijand
var vijandY = 600; // y-positie van vijand
var health = 100;  // health van speler
var botsing;
var bg;

var ratio = 4; // vergrotings ratio van sprites
var gameFrame = 0;
const staggerFrames = 30; // aantal frames vertragen
const ryu =
{
    imagefilename: "ryu-spritesheet.png",
    idle: {
        loc: [
            { x: 7, y: 10, width: 60, height: 110 },
            { x: 94, y: 10, width: 60, height: 110 },
            { x: 184, y: 10, width: 60, height: 110 },
            { x: 280, y: 10, width: 60, height: 110 },
            { x: 367, y: 10, width: 60, height: 110 }
        ]
    },
    punch: {
        loc: [
            { x: 253, y: 269, width: 60, height: 94 },
            { x: 333, y: 268, width: 74, height: 95 },
            { x: 432, y: 268, width: 108, height: 94 }
        ]
    },
    kick: {
        loc: [
            { x: 12, y: 657, width: 60, height: 94 },
            { x: 95, y: 657, width: 48, height: 94 },
            { x: 167, y: 658, width: 80, height: 93 }
        ]
    },
    highkick: {
        loc: [
            { x: 600, y: 265, width: 90, height: 110 },
            { x: 680, y: 260, width: 90, height: 110 },
            { x: 775, y: 260, width: 120, height: 110 }
        ]
    }
}

const ken =
{
    imagefilename: "ken-spritesheet.png",
    idle: {
        loc: [
            { x: 1140, y: 20, width: 60, height: 100 },
            { x: 1206, y: 20, width: 60, height: 100 },
            { x: 1270, y: 20, width: 60, height: 100 },
            { x: 1335, y: 20, width: 60, height: 100 },
            { x: 1402, y: 20, width: 60, height: 100 },
            { x: 1470, y: 20, width: 60, height: 100 }
        ]
    },
    punch: {
        loc: [
            { x: 1268, y: 285, width: 95, height: 95 },
            { x: 1365, y: 285, width: 95, height: 95 }
        ]
    },
    kick: {
        loc: [
            { x: 1130, y: 420, width: 65, height: 95 },
            { x: 1200, y: 420, width: 65, height: 95 },
            { x: 1274, y: 420, width: 120, height: 95 },
            { x: 1395, y: 420, width: 70, height: 95 },
            { x: 1468, y: 420, width: 70, height: 95 }
        ]
    },
    highkick: {
        loc: [
            { x: 1130, y: 420, width: 65, height: 95 },
            { x: 1200, y: 420, width: 65, height: 95 },
            { x: 1274, y: 420, width: 120, height: 95 },
            { x: 1395, y: 420, width: 70, height: 95 },
            { x: 1468, y: 420, width: 70, height: 95 }
        ]
    }
}


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

// img is spritesheet, dx en dy is doelpositie, sw en sh is breedte en hoogte enkele sprite uit source image, n is aantal sprites in reeks, ratio is vergrotingsfactor van sprites
function animeer_sprite(img, sprite_name, sprite_action, dx, dy, ratio) {
    let maxframes = eval(sprite_name + '.' + sprite_action + '.loc.length') // het aantal frames van de sprite
    let frame = Math.floor(gameFrame / staggerFrames) % maxframes; // vertraging van frames

    let sx = eval(sprite_name + '.' + sprite_action + '.loc[frame].x'); // x-positie van sprite
    let sy = eval(sprite_name + '.' + sprite_action + '.loc[frame].y');
    let sw = eval(sprite_name + '.' + sprite_action + '.loc[frame].width');
    let sh = eval(sprite_name + '.' + sprite_action + '.loc[frame].height');
    image(img, dx, dy, sw * ratio, sh * ratio, sx, sy, sw, sh);
    gameFrame++;

}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
let snelheid_spelers = 5;
var beweegAlles = function() {
    // speler
    if (keyIsDown(65)) { //Left
        spelerX = spelerX - snelheid_spelers;
    }

    if (keyIsDown(68) && botsing === false) { //Right
        spelerX = spelerX + snelheid_spelers;
    }

    // vijand 
    if (keyIsDown(37) && botsing === false) { //Left
        vijandX = vijandX - snelheid_spelers;
    }

    if (keyIsDown(39)) { //Right
        vijandX = vijandX + snelheid_spelers;
    }

    // punch
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
    // botsing speler tegen vijand
    if (spelerX - vijandX < 225 && spelerX - vijandX > -225) {
        botsing = true;
    }
    else {
        botsing = false;
    }

    if (botsing === true) {
        health = health - 50;
        spelerX = 250;
        vijandX = 1300;
    }
    // botsing vuist of voet tegen vijand

    // update punten en health
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
    // achtergrond weergeven
    image(img_bg, 0, 0);

    animeer_sprite(img_speler, "ryu", "idle", spelerX, spelerY, ratio) // Ryu
    //animeer_sprite(img_speler, "ryu", "punch", 550, spelerY, ratio) // Ryu
    //animeer_sprite(img_speler, "ryu", "highkick", 1000, spelerY, ratio) // Ryu

    animeer_sprite(img_vijand, "ken", "idle", vijandX, vijandY, ratio) // Ken

    // aanvallen

    // punten en health
    if (health < 0) {
        spelStatus = GAMEOVER;
    }
};

var healthBar = function() { // health bar

    fill("red");
    rect(0, 0, health, 20);
}

var checkGameover = function() {
    // Check of HP 0 is
    return false;
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

// Preload code in deze functie wordt één keer uitgevoerd voordat setup start
let img_bg;
let img_speler;
let img_vijand;
function preload() {
    img_bg = loadImage('arena.jpeg');
    img_speler = loadImage(ryu.imagefilename);
    img_vijand = loadImage(ken.imagefilename);
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
    frameRate(60);
    // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
    createCanvas(1920, 1040);
    background('blue');
    image(img_bg, 0, 0); // Geef achtergrond weer
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    if (spelStatus === SPELEN) {
        beweegAlles();
        verwerkBotsing();
        tekenAlles();
        if (health <= 0) {
            spelStatus = GAMEOVER;
        }
    }
    if (spelStatus === GAMEOVER) {
        // teken game-over scherm
        textSize(100);
        fill('yellow');
        text('KO! PRESS SPACE TO START', 240, 520);
        if (keyIsDown(32)) {  // Spatie
            spelStatus = UITLEG;
        }
    }

    if (spelStatus === UITLEG) {
        // teken uitleg scherm
        textSize(80);
        fill('yellow');
        image(img_bg, 0, 0, 1920, 1040);
        animeer_sprite(img_speler, "ryu", "highkick", spelerX, spelerY, ratio) // Ryu
        animeer_sprite(img_vijand, "ken", "highkick", vijandX, vijandY, ratio) // ken
        text('PRESS V TO PLAY', 240, 120);
        text('Player one: A=left and D=right', 240, 320);

        if (keyIsDown(86)) {  // V
            spelerX = 250;
            vijandX = 1300;
            spelStatus = SPELEN;
            health = 100;
        }
    }
}
