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
const UITLEG = 6;
var spelStatus = SPELEN;

var spelerX = 250; // x-positie van speler
var spelerY = 600; // y-positie van speler 
var vijandX = 1300; // x-positie van vijand
var vijandY = 560; // y-positie van vijand
var health = 100;  // health van speler
var botsing;
var bg;
var ratio = 4; // vergrotings ratio van sprites

var sprite_width = 90; // breedte van 1 sprite Ryu
var sprite_height = 110; // hoogte van 1 sprite Ryu
let sprite_width2 = 66; // breedte van 1 sprite Ken
let sprite_height2 = 120; // hoogte van 1 sprite Ken
var sprite; // sprite nummers van 1 t/m 5
var vertragingsteller = 0; // compenseer framerate voor spite animatie


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

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
    
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond weergeven
  image(img_bg, 0, 0); 

  // Idle animatie
  sprite = Math.round(vertragingsteller) // afronden op gehele getallen voor sprites
  if (sprite === 5) { // reset sprite na 5
      sprite = 0;
      vertragingsteller = 0;
  }
  image(img_speler, spelerX, spelerY, sprite_width * ratio, sprite_height * ratio, sprite * sprite_width, 0, sprite_width, sprite_height); // Idle Ryu animatie
  let sx = (img_vijand.width - 410) + (sprite_width2 * sprite); // Begint bij eerste sprite op 410px van rechts voor Ken spritesheet
  image(img_vijand, vijandX, vijandY, sprite_width2 * ratio, sprite_height2 * ratio, sx , 0, sprite_width2, sprite_height2); // Idle Ken animatie
  
  vertragingsteller += .1; // vertragingsteller ophogen voor volgende sprite

  // aanvallen

  // punten en health

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
  img_speler = loadImage('ryu-spritesheet.png');
  img_vijand = loadImage('ken-spritesheet.png');
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

  if (spelStatus === UITLEG) {
  // teken uitleg scherm
  
  }
}
