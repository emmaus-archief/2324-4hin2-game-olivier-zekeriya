/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
"use strict";

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 6;
var spelStatus = UITLEG;

// alle mogelijke actions van een speler
const idle = 0;
const PUNCH = 1;
const KICK = 2;
const HIGHKICK = 3;
var ryuAction = idle;
var kenAction = idle;

var spelerX = 250; // x-positie van speler
var spelerY = 600; // y-positie van speler 
var vijandX = 1300; // x-positie van vijand
var vijandY = 600; // y-positie van vijand
var health = 100;  // health van speler
var botsing;
var bg;

var ratio = 4; // vergrotings ratio van sprites
var gameFrame = 0; // Eerste frame van het spel
const staggerFrames = 30; // aantal frames vertragen

// Sprite objecten voor beide spelers met de locaties elke sprite in de sprite sheet per actie
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

// Animeer Sprite functie: img is spritesheet, sprite_name is naam uit dx en dy is doelpositie, sw en sh is breedte en hoogte enkele sprite uit source image, n is aantal sprites in reeks, ratio is vergrotingsfactor van sprites
function animeer_sprite(img, sprite_name, sprite_action, dx, dy, ratio) {
    let maxframes = eval(sprite_name + '.' + sprite_action + '.loc.length') // length is het totaal aantal frames van een sprite action
    let frame = Math.floor(gameFrame / staggerFrames) % maxframes; // bepaal frame nummer met vertragingsfactor

    // eval wordt gebruikt om de samengestelde naam van het object bestaande uit de functie parameters sprite_name en sprite_action te evalueren. Zonder eval zal JavaScript niet weten wat de waarde van het object is.
    // Voorbeeld object: ken.punch.loc[0].x geeft de x coordinaat van sprite Ken met action punch van de eerste frame (0).
    let sx = eval(sprite_name + '.' + sprite_action + '.loc[frame].x'); // x-positie van frame
    let sy = eval(sprite_name + '.' + sprite_action + '.loc[frame].y'); // y-positie van frame
    let sw = eval(sprite_name + '.' + sprite_action + '.loc[frame].width'); // width van frame
    let sh = eval(sprite_name + '.' + sprite_action + '.loc[frame].height'); // height van frame
    image(img, dx, dy, sw * ratio, sh * ratio, sx, sy, sw, sh);
    gameFrame++; // verhoog gameFrame met 1

}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
let snelheid_spelers = 5;
var beweegAlles = function() {
    // speler
    if (keyIsDown(65)) { //Left key A
        spelerX = spelerX - snelheid_spelers;
    }

    if (keyIsDown(68) && botsing === false) { //Right key D
        spelerX = spelerX + snelheid_spelers;
    }

    // vijand 
    if (keyIsDown(37) && botsing === false) { //Left arrow key
        vijandX = vijandX - snelheid_spelers;
    }

    if (keyIsDown(39)) { //Right arrow key
        vijandX = vijandX + snelheid_spelers;
    }

    // Ryu punch
    if (keyIsDown(81)) { // key Q
        ryuAction = PUNCH;
        //spelerX = spelerX + "punch?"
    }

    // Ryu highkick
    if (keyIsDown(69)) { // key E
        ryuAction = HIGHKICK;
    }

    // Ken punch
    if (keyIsDown(80)) { // key P
        kenAction = PUNCH;
        //spelerX = spelerX + "punch?"
    }

    // Ken highkick
    if (keyIsDown(79)) { // key O
        kenAction = HIGHKICK;
    }

    // Ryu niet laten lopen tijdens het aanvallen
    if (ryuAction === PUNCH) {
        snelheid_spelers = 0;
    } else{
        snelheid_spelers = 5;
    }

    // Ken niet laten lopen tijdens het aanvallen
    if (kenAction === PUNCH) {
        snelheid_spelers = 0;
    } else{
        snelheid_spelers = 5;
    }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
    // botsing Ryu punch
    if (ryuAction === PUNCH && vijandX - spelerX < 350) {
        botsing = true;
    } else if (ryuAction === HIGHKICK && vijandX - spelerX < 370) {
        botsing = true;
    } else {
        botsing = false;
    }

    if (botsing === true) {
        health = health - 34;
        spelerX = spelerX - 100;
        vijandX = vijandX + 125;
    }

    /* if (spelerX - vijandX < 225 && spelerX - vijandX > -225) {
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
    */
    // botsing highkick

    // update punten en health
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
    // achtergrond weergeven en verversen
    image(img_bg, 0, 0);

    if (ryuAction === HIGHKICK) {
        animeer_sprite(img_speler, "ryu", "highkick", spelerX, spelerY, ratio) // animeer highkick totdat alle frame zijn geweest.
        let actionframe = gameFrame;
        if (gameFrame = actionframe + ryu.highkick.loc.length) { // als alle frames zijn geweest, reset gameFrame
            ryuAction = idle;
        }
    } else if (ryuAction === PUNCH) {
        animeer_sprite(img_speler, "ryu", "punch", spelerX, spelerY, ratio) // animeer highkick totdat alle frame zijn geweest.
        let actionframe = gameFrame;
        if (gameFrame = actionframe + ryu.punch.loc.length) { // als alle frames zijn geweest, reset gameFrame
            ryuAction = idle;
        }
    } else {
        animeer_sprite(img_speler, "ryu", "idle", spelerX, spelerY, ratio) // Ryu
    }

    // Animeer Ken
    if (kenAction === HIGHKICK) {
        animeer_sprite(img_vijand, "ken", "highkick", vijandX, vijandY, ratio) // Ken
        let actionframe = gameFrame;
        if (gameFrame = actionframe + ken.highkick.loc.length) { // als alle frames zijn geweest, reset gameFrame
            kenAction = idle;
        }
    } else if (kenAction === PUNCH) {
        animeer_sprite(img_vijand, "ken", "punch", vijandX, vijandY, ratio) // Ken
        let actionframe = gameFrame;
        if (gameFrame = actionframe + ken.punch.loc.length) { // als alle frames zijn geweest, reset gameFrame
            kenAction = idle;
        }
    } else {
        animeer_sprite(img_vijand, "ken", "idle", vijandX, vijandY, ratio) // Ken
    }


    // aanvallen

    // punten en health
    if (health < 0) {
        spelStatus = GAMEOVER;
    }

     // health bar
    /* let currentHealth = maxHealth
    let healthbarWidth = 300;
    let healthbarHeight = 30;

    function draw() {
        background(220)
        drawHealthbar();

        function drawHealthbar() {
        let healthPercentage = currentHealth / maxHealth;
        let healthbarColor;

        if (currenthealth > 60) {
        healthBarColor = color(76, 175, 80); // green

        } else if (currentHealth > 30) {
        healthBarColor = color(255, 165, 0); // orange

        } else {
        healthBarColor = color(244, 67, 54); // red
        
        }

        fill(220);
        stroke(0);
        rect(50, 50, healthBarWidth * healthPercentage, healthbarHeight);

        } // code uit internet, moet nog aan werken
        
          
        


    } *
};
    

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