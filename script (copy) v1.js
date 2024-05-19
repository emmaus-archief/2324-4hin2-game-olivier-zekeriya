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
var sprite_width2 = 66; // breedte van 1 sprite Ken
var sprite_height2 = 120; // hoogte van 1 sprite Ken
var sprite; // sprite nummer uit reeks van sprites
var vertragingsteller = 0; // compenseer framerate voor spite animatie



/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

// img is spritesheet, dx en dy is doelpositie, sw en sh is breedte en hoogte enkele sprite uit source image, n is aantal sprites in reeks, ratio is vergrotingsfactor van sprites
var animeer_sprite = function (img, dx, dy, sx, sy, sw, sh, n, ratio)
{ 
  sprite = Math.round(vertragingsteller) // afronden op gehele getallen voor sprites
  if (sprite === n) { // reset sprite en vertragingstelller
      sprite = 0;
      vertragingsteller = 0;
  }
  sx = sx + (sw * sprite); // x-positie van sprite
  image(img, dx, dy, sw * ratio, sh * ratio, sx, sy, sw, sh); 

  vertragingsteller += .05; // vertragingsteller ophogen voor volgende sprite

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
  
  //animeer_sprite(img_speler, spelerX, spelerY, 0, 0, 90, 110, 5, ratio) // Ryu
  //animeer_sprite(img_vijand, vijandX, vijandY, 1136, 0, 66, 120, 6, ratio) // Ken

  // Begin TEST met JSON
  sprite = Math.round(vertragingsteller) // afronden op gehele getallen voor sprites
  if (sprite === 5) { // reset sprite na 5
      sprite = 0;
      vertragingsteller = 0;
  }

  image(img_speler, spelerX, spelerY, sprite_width * ratio, sprite_height * ratio, sprite * sprite_width, 
  0, sprite_width, sprite_height); // Idle Ryu animatie
  
  vertragingsteller += .1; // vertragingsteller ophogen voor volgende sprite
  
  // Eind TEST met JSON

  /* 
  // Idle animatie
  sprite = Math.round(vertragingsteller) // afronden op gehele getallen voor sprites
  if (sprite === 5) { // reset sprite na 5
      sprite = 0;
      vertragingsteller = 0;
  }
  image(img_speler, spelerX, spelerY, sprite_width * ratio, sprite_height * ratio, sprite * sprite_width, 
  0, sprite_width, sprite_height); // Idle Ryu animatie
  
  let sx = (img_vijand.width - 410) + (sprite_width2 * sprite); // Begint bij eerste sprite op 410px van rechts voor Ken spritesheet
  
  image(img_vijand, vijandX, vijandY, sprite_width2 * ratio, sprite_height2 * ratio, sx , 0, 
  sprite_width2, sprite_height2); // Idle Ken animatie
  
  vertragingsteller += .1; // vertragingsteller ophogen voor volgende sprite
  */
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
let img_speler_spritemapping_json;
let img_vijand;
function preload() {
  img_bg = loadImage('arena.jpeg');
  img_speler = loadImage('ryu-spritesheet.png');
  img_vijand = loadImage('ken-spritesheet.png');
  img_speler_spritemapping_json = loadJSON('ryu-spritesheet.json'); // Laad spritesheet mapping JSON gemaakt met https://www.leshylabs.com/apps/sstool/

  let jsontest = img_speler_spritemapping_json[1]//.x
  console.log(jsontest);
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
    textSize(100);
    fill('yellow');
    text('KO! PRESS SPACE TO START', 240, 520);
    if (keyIsDown(32)) {  // Spatie
      spelStatus = UITLEG;
    }
  }

  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    textSize(100);
    fill('yellow');
    image(img_bg, 0, 0, 1920, 1040);
    image(img_speler, spelerX, spelerY, sprite_width * ratio, sprite_height * ratio, sprite *             
    sprite_width, 0, sprite_width, sprite_height);
    image(img_vijand, vijandX, vijandY, sprite_width2 * ratio, sprite_height2 * ratio, img_vijand.width - 410 + sprite_width2 * sprite , 0,               sprite_width2, sprite_height2);
    text('PRESS V TO PLAY', 240, 520);
    if (keyIsDown(86)) {  // V
      spelerX = 250;
      vijandX = 1300;
      spelStatus = SPELEN; 
    }
  }
}
