/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 250; // x-positie van speler
var spelerY = 600; // y-positie van speler 
var vijandX = 1600; // x-positie van vijand
var vijandY = 750; // y-positie van vijand
var health = 100;  // health van speler
var bg;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(65)) { //Left
    spelerX = spelerX -15;
  }
  
  if (keyIsDown(87)) { //Up
      spelerY = spelerY -15;
  }
  
  if (keyIsDown(83)) { //Down
      spelerY = spelerY +15;
  }
  
  if (keyIsDown(68)) { //Right
      spelerX = spelerX +15;
  }
  
  // vijand 
  if (keyIsDown(37)) { //Left
    vijandX = vijandX -15;
  }

  if (keyIsDown(38)) { //Up
    vijandY = vijandY -15;
  }

  if (keyIsDown(40)) { //Down
    vijandY = vijandY +15;
  }

  if (keyIsDown(39)) { //Right
    vijandX = vijandX +15;
  }

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond weergeven
  image(img_bg, 0, 0); 
  // speler
  image(img_speler, spelerX, spelerY, img_speler.width * 3, img_speler.height * 5, 0, 0, 43, img_speler.height); // Eerste Ryu sprite
  image(img_speler, spelerX + 350, spelerY, img_speler.width * 6, img_speler.height * 5, 49, 0); // Tweede (punch) Ryu sprite
  
  // vijand
  fill("black");
  rect(vijandX - 30, vijandY - 25, 60, 50);
  // kogel

  // punten en health

};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

// Preload code in deze functie wordt één keer uitgevoerd voordat setup start
let img_bg;
let img_speler;
let img_vijand;
function preload() {
  img_bg = loadImage('arena.jpeg');
  img_speler = loadImage('ryu-2sprites.png');
  //img_vijand = loadImage('ken.png');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {

  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1920, 1040);
  background('blue');
  image(img_bg, 0, 0); // Geef achtergrond weer
  
  // Kleur de achtergrond blauw, zodat je het kunt zien
  //background('blue');
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
  }
}
