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

var spelerX = 250; // x-positie van speler Ryu
var spelerY = 600; // y-positie van speler Ryu
var vijandX = 1550; // x-positie van vijand Ken
var vijandY = 600; // y-positie van vijand Ken
var healthSpeler = 100;  // health van speler Ryu
var healthVijand = 100;  // health van vijand Ken
var hit;
var botsing;
var bg;
var ryuScore = 0; // score van aantal overwinningen van Ryu
var kenScore = 0; // score van aantal overwinningen van Ken
//var img_ryuFace;
//var img_kenFace;

var ratio = 4; // vergrotings ratio van sprites
var flip = false; // flip sprite
var gameFrame = 0; // Eerste frame van het spel
const staggerFrames = 10; // aantal frames om te vertragen
var actionFrameRyu = 0; // frame nummer op moment van actie van Ryu
var actionFrameKen = 0; // frame nummer op moment van actie van Ken

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
            { x: 15, y: 20, width: 60, height: 100 },
            { x: 82, y: 20, width: 60, height: 100 },
            { x: 150, y: 20, width: 60, height: 100 },
            { x: 218, y: 20, width: 60, height: 100 },
            { x: 284, y: 20, width: 60, height: 100 },
            { x: 346, y: 20, width: 60, height: 100 }
        ]
    },
    punch: {
        loc: [
            { x: 16, y: 285, width: 66, height: 95 },
            { x: 88, y: 285, width: 95, height: 95 },
            { x: 188, y: 285, width: 66, height: 95 }
        ]
    },
    punchlong: {
        loc: [
            { x: 300, y: 285, width: 62, height: 95 },
            { x: 368, y: 285, width: 75, height: 95 },
            { x: 450, y: 285, width: 110, height: 95 },
            { x: 566, y: 285, width: 75, height: 95 },
            { x: 648, y: 285, width: 62, height: 95 }

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
            { x: 16, y: 420, width: 65, height: 95 },
            { x: 82, y: 420, width: 65, height: 95 },
            { x: 158, y: 420, width: 120, height: 95 },
            { x: 280, y: 420, width: 70, height: 95 },
            { x: 354, y: 420, width: 70, height: 95 }
        ]
    }
}


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

// Animeer Sprite functie: img is spritesheet, sprite_name is naam uit dx en dy is doelpositie, sw en sh is breedte en hoogte enkele sprite uit source image, n is aantal sprites in reeks, ratio is vergrotingsfactor van sprites
function animeer_sprite(img, sprite_name, sprite_action, dx, dy, ratio, flip) {
    let maxframes = eval(sprite_name + '.' + sprite_action + '.loc.length') // length is het totaal aantal frames van een sprite action
    let frame = Math.floor(gameFrame / staggerFrames) % maxframes; // bepaal frame nummer met vertragingsfactor

    // eval wordt gebruikt om de samengestelde naam van het object bestaande uit de functie parameters sprite_name en sprite_action te evalueren. Zonder eval zal JavaScript niet weten wat de waarde van het object is.
    // Voorbeeld object: ken.punch.loc[0].x geeft de x coordinaat van sprite Ken met action punch van de eerste frame (0).
    let sx = eval(sprite_name + '.' + sprite_action + '.loc[frame].x'); // x-positie van frame
    let sy = eval(sprite_name + '.' + sprite_action + '.loc[frame].y'); // y-positie van frame
    let sw = eval(sprite_name + '.' + sprite_action + '.loc[frame].width'); // width van frame
    let sh = eval(sprite_name + '.' + sprite_action + '.loc[frame].height'); // height van frame
    if (flip === true) {
        push();
        scale(-1, 1); // flip sprite
        image(img, -dx - sw, dy, sw * ratio, sh * ratio, sx, sy, sw, sh);
        pop();
    } else {
        image(img, dx, dy, sw * ratio, sh * ratio, sx, sy, sw, sh);
    }
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
let snelheid_spelers = 5;
var beweegAlles = function() {
    // speler
    if (keyIsDown(65) && ryuAction === idle && spelerX > 0) { // Left key A. Niet lopen als er een actie actief is.
        spelerX = spelerX - snelheid_spelers;
    }

    if (keyIsDown(68) && botsing === false && ryuAction === idle) { // Right key D. Alleen lopen als er geen botsing is. Niet lopen als er een actie actief is.
        spelerX = spelerX + snelheid_spelers;
    }

    // vijand 
    if (keyIsDown(37) && botsing === false && kenAction === idle) { // Left arrow key. Alleen lopen als er geen botsing is. Niet lopen als er een actie actief is.
        vijandX = vijandX - snelheid_spelers;
    }

    if (keyIsDown(39) && kenAction === idle && vijandX < img_bg.width - 60) { // Right arrow key. Niet lopen als er een actie actief is.
        vijandX = vijandX + snelheid_spelers;
    }

    // Ryu punch
    if (keyIsDown(81)) { // key Q
        ryuAction = PUNCH;
        gameFrame = 0; // reset gameframe om animatie netjes te starten bij eerste sprite frame
        actionFrameRyu = gameFrame;
    }

    // Ryu highkick
    if (keyIsDown(69)) { // key E
        ryuAction = HIGHKICK;
        gameFrame = 0; // reset gameframe om animatie netjes te starten bij eerste sprite frame
        actionFrameRyu = gameFrame;
    }

    // Ken punch
    if (keyIsDown(80)) { // key P
        kenAction = PUNCH;
        gameFrame = 0; // reset gameframe om animatie netjes te starten bij eerste sprite frame
        actionFrameKen = gameFrame;
    }

    // Ken highkick
    if (keyIsDown(79)) { // key O
        kenAction = HIGHKICK;
        gameFrame = 0; // reset gameframe om animatie netjes te starten bij eerste sprite frame
        actionFrameKen = gameFrame;
    }
};

/**
 * Checkt hits
 * Updatet globale variabelen punten en health
 */
var verwerkHits = function() {
    // Hits Ryu en Ken voor punch of highkick
    if (ryuAction === PUNCH && vijandX - spelerX < 550) {
        hit = true;
        healthVijand = healthVijand - 10; // Ken 10 damage als Ryu puncht
    } else if (ryuAction === HIGHKICK && vijandX - spelerX < 550) {
        hit = true;
        healthVijand = healthVijand - 20; // Ken 20 damage als Ryu highkickt
    } else if (kenAction === PUNCH && vijandX - spelerX < 550) {
        hit = true;
        healthSpeler = healthSpeler - 10; // Ryu 10 damage als Ken puncht
    } else if (kenAction === HIGHKICK && vijandX - spelerX < 530) {
        hit = true;
        healthSpeler = healthSpeler - 20; // Ryu 20 damage als Ken highkickt
    } else {
        hit = false;
    }

    if (hit === true) {
        if (spelerX <= 100) {
            spelerX = 0;
        } else {
            spelerX = spelerX - 100;
        }
        if (vijandX >= img_bg.width - 100) {
             vijandX = img_bg.width;
        } else {
            vijandX = vijandX + 100;
        }
    }
};

/**
 * Checkt botsing tussen beide spelers
 */
var verwerkBotsing = function() {
    if (vijandX - spelerX < 410) {
        botsing = true;
    } else {
        botsing = false;
    }
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
    // achtergrond weergeven en verversen
    image(img_bg, 0, 0);

    // Animeer Ryu
    if (ryuAction === HIGHKICK) {
        animeer_sprite(img_speler, "ryu", "highkick", spelerX, spelerY, ratio) // animeer highkick frame
        if (gameFrame >= actionFrameRyu + ryu.highkick.loc.length * staggerFrames) { // alle frames zijn geweest, reset actie
            ryuAction = idle;
        }
    } else if (ryuAction === PUNCH) {
        animeer_sprite(img_speler, "ryu", "punch", spelerX, spelerY, ratio) // animeer highkick frame
        if (gameFrame >= actionFrameRyu + ryu.punch.loc.length * staggerFrames) { // alle frames  geweest, reset actie
            ryuAction = idle;
        }
    } else {
        animeer_sprite(img_speler, "ryu", "idle", spelerX, spelerY, ratio) // Ryu
    }

    // Animeer Ken
    if (kenAction === HIGHKICK) {
        animeer_sprite(img_vijand, "ken", "highkick", vijandX, vijandY, ratio, true) // Ken
        if (gameFrame >= actionFrameKen + ken.highkick.loc.length * staggerFrames) { // alle frames geweest, reset actie
            kenAction = idle;
        }
    } else if (kenAction === PUNCH) {
        animeer_sprite(img_vijand, "ken", "punchlong", vijandX, vijandY, ratio, true) // Ken met correctie naar links
        if (gameFrame >= actionFrameKen + ken.highkick.loc.length * staggerFrames) { // alle frames geweest, reset actie
            kenAction = idle;
        }
    } else {
        animeer_sprite(img_vijand, "ken", "idle", vijandX, vijandY, ratio, true) // Ken
    }
    
    // punten en health
    if (healthSpeler <= 0 || healthVijand <= 0) {
        spelStatus = GAMEOVER;
        if (healthSpeler <= 0) {
            kenScore++;
        } else {
            ryuScore++;
        }
    }
    
    // Achtergrond bar Ryu
    fill('black');
    rect(95, 195, 710, 40);

    // Achtergrond bar Ken
    fill('black');
    rect(1095, 195, 710, 40);

    // health bar Ryu
    var health_bar_width_ryu = healthSpeler * 7; // De grote van de balk is 600, omdat health = 100
    fill('red');
    if (healthSpeler <= 0) {
        health_bar_width_ryu = 0;
    }
    rect(100, 200, health_bar_width_ryu, 30);

    // health bar Ken
    var health_bar_width_ken = healthVijand * 7; // De grote van de balk is 600, omdat health = 100
    fill('red');
    if (healthVijand <= 0) {
        health_bar_width_ken = 0;
    }
    rect(1100, 200, health_bar_width_ken, 30);

};

var checkGameover = function() {
    // Check of HP 0 is
    return false;
}

var showScores = function() {
    // Tekent de score
    fill('#42f5c5');
    textSize(90);
    text("Ryu - " + ryuScore, 320, 135);
    text("Ken - " + kenScore, 1360, 135)
}
    
/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

// Preload code in deze functie wordt één keer uitgevoerd voordat setup start
let img_bg;
let img_speler;
let img_vijand;
let fontActOfRejection;
function preload() {
    img_bg = loadImage('arena.jpeg');
    img_speler = loadImage(ryu.imagefilename);
    img_vijand = loadImage(ken.imagefilename);
    //img_ryuFace = loadImage('ryu_face.png');
    //img_kenFace = loadImage('ken_face.png');
    fontActOfRejection = loadFont('Act_Of_Rejection.ttf');
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
    textFont(fontActOfRejection); // Stelt standaard font in
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
        verwerkHits();
        verwerkBotsing();
        tekenAlles();
        showScores();
    }
    if (spelStatus === GAMEOVER) {
        // teken game-over scherm
        showScores();
        fill('#009966');
        textSize(108);
        if (healthSpeler <= 0) {
            text('KO! KEN WINS!', 640, 120);
        } else {
            text('KO! RYU WINS!', 640, 120);
        }

        fill('#cadafb');
        textSize(84);
        text('PRESS SPACE TO START', 540, 480);
        if (keyIsDown(32)) {  // key SPATIE
            spelStatus = UITLEG;
        }
    }

    if (spelStatus === UITLEG) {
        // teken uitleg scherm
        image(img_bg, 0, 0, 1920, 1040);
        animeer_sprite(img_speler, "ryu", "idle", spelerX, spelerY, ratio, false) // Ryu
        animeer_sprite(img_vijand, "ken", "idle", vijandX, vijandY, ratio, true) // ken
        showScores();
        textSize(72);
        fill('yellow');
        text('PRESS V TO PLAY', 720, 100);

        fill('skyblue');
        textSize(40);
        text("Ryu: A is left and D is right", 220, 200);
        text('Ryu: Q is Punch and E is Highkick', 300, 280);
        text('Ken: Use arrows right and left', 1200, 200);
        text('Ken: O is Punch and P is Highkick', 1080, 280);

        if (keyIsDown(86)) {  // key V
            spelerX = 250;
            vijandX = 1550;
            spelStatus = SPELEN;
            healthSpeler = 100;
            healthVijand = 100;
            gameFrame = 0;
            actionFrameKen = 0;
            actionFrameRyu = 0;
        }
    }
    gameFrame++; // verhoog gameFrame met 1
}                         