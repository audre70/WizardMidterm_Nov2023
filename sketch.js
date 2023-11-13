/*
CREATIVE CODING MIDTERM PROJECT
Fall 2023 - Loveless

Title: Wizard's Magical Universe
By: Audrey Vo, 11/1

Description: A series of animations centered around a wizard and his environment. Makes use of sounds, buttons, as well as gif images. Animations feature ring of circles, perlin noise dynamic shapes, floating hearts, and trailing sparks/stars.


*/

var wizard; // wizard avatar image
var partySpell, hypnotizeSpell, sparksSpell, loveSpell; // store diff spells to initiate/terminate magic
var choices = ['party', 'hypnotize', 'sparks', 'love', 'pause magic'];
var b = []; // array to store buttons
var wizardCharacter;
let shape1, shape2; // vars for the hypnotize blobs
let hearts = []; // heart object to be populated

var kirbyMusic, hyruleMusic, cirnoMusic, revaliMusic;
var forest, space, bubblegum, sky; // gif backgrounds
var verve; // font store


function preload() {
  wizard = loadImage("wizard.gif"); // Source: https://www.pinterest.com/pin/721631540278890718/
  /* BACKGROUNDS */
  forest = loadImage("forest.gif"); // Source: https://www.reddit.com/r/PixelArt/comments/qqtq1k/forever/
  space = loadImage("spacey.gif"); // Source: https://www.artstation.com/artwork/vJ0mJ3
  bubblegum = loadImage("pinky.gif"); // Source: https://www.deviantart.com/yuekryss/art/Pink-Lake-Dimension-Pixel-Art-Landscape-Animated-914635672
  sky = loadImage("sky.gif"); // Source: https://dribbble.com/shots/3087645-Space-Pixel-Art-Animation
  
  verve = loadFont("VerveAlternate.ttf"); // https://www.dafont.com/verve.font
  
  kirbyMusic = loadSound("kirbys-return-remix.mp3");
  hyruleMusic = loadSound("hyrule-castle.mp3");
  cirnoMusic = loadSound("cirno-fortress.mp3");
  revaliMusic = loadSound("revalis-theme.mp3");
  /*
  [ Sources for mp3 files ]
  - "kirbys-return-remix.mp3" --> Kirby's Return to Dream Land, Bulby //www.youtube.com/watch?v=oMgQJEcVToY&list=PLzjkiYUjXuevVG0fTOX4GCTzbU0ooHQ-O
  - "hyrule-castle.mp3" --> 8bit Hyrule Castle, Loeder  https://www.youtube.com/watch?v=ySartfhYFAI
  - "cirno-fortress.mp3" --> Cirno Fortress Stage 2, HertzDevil  https://www.youtube.com/watch?v=TM14q3UHYSg&list=PLzjkiYUjXuevVG0fTOX4GCTzbU0ooHQ-O&index=9
  - "revailis-theme.mp3" Revali's theme 8bit, Loeder https://www.youtube.com/watch?v=Mf65RSEY4m4&list=PLjVTojiDW0-6u5oI24JhHeHDwz73Xzc22&index=8
  */
}

function setup() {
  createCanvas(500, 500);
  wizardCharacter = new Wizard();
  /* INITIATE SPELL INSTANCES */
  partySpell = new Spell();
  hypnotizeSpell = new Spell();
  sparksSpell = new Spell();
  loveSpell = new Spell();
  
  for (let i = 0; i < 5; i++) { // buttons reference from classwork https://editor.p5js.org/melodyloveless/sketches/R9Bi9Botb
    b[i] = createButton(choices[i]); // create a button
    b[i].mousePressed(() => { // event listeners to start/stop magic
      if (i === 0) { // party
        partySpell.generateColors(20);
        partySpell.start();
      } else { partySpell.stop();}
      if (i === 1) { // hypnotize
        shape1 = new NoisyBlob(270, 0.05);
        shape2 = new NoisyBlob(600, 0.09);
        hypnotizeSpell.start();
      } else { hypnotizeSpell.stop();}
      if (i === 2) { // sparks
        sparksSpell.start();
      } else { sparksSpell.stop();}
      if (i === 3) { // love
        loveSpell.start();
        let numHearts = 15; // number of hearts
        /* POPULATE HEART OBJECT WITH HEARTS DATA */
        for (let i = 0; i < numHearts; i++) {
          hearts.push({
            x: random(-width / 2, width / 2), // scatter horizontally
            y: random(-height / 2, height / 2), // scatter vertically
            speed: random(1, 4), // range of speed
            size: random(20, 50), // range of size
            image: loadImage('pixel-heart.png'), // Source: https://pixabay.com/illustrations/pixel-heart-heart-pixel-symbol-red-2779422/
          });
        }
      } else { loveSpell.stop();}
      if (i === 4) { // pause magic
        partySpell.stop();
        hypnotizeSpell.stop();
        sparksSpell.stop();
        loveSpell.stop();
      }
    });
  }
}


function draw() {
  background(0, 15, 25);
  translate(width / 2, height / 2); // everything is based around center canvas.
  if (partySpell.active) { // PARTY
    image(space, 0, 0, width, height);
    if(kirbyMusic.isPlaying()===false){
      kirbyMusic.play();
    }
    partySpell.ring((frameCount / 7) % 25, 200); // middle ring
    partySpell.ring((frameCount / 10) % 10, 130); // inner ring
    partySpell.ring((frameCount / 6) % 25, 300); // outer
  } else { kirbyMusic.pause();}
  if (hypnotizeSpell.active) { // HYPNOTIZE
    image(sky, 0, 0, width, height);
    shape1.update();
    shape1.display();
    shape2.update();
    shape2.display();
    if(hyruleMusic.isPlaying()===false){
      hyruleMusic.play();
    }
  } else { hyruleMusic.pause();}
  if (sparksSpell.active) { // SPARKS
    image(forest, 0, 0, width, height);
    sparksSpell.sparkTrail(200,4);
    if(cirnoMusic.isPlaying()===false){
      cirnoMusic.play();
    }
  } else { cirnoMusic.pause();}
  if (loveSpell.active) { // LOVE
    image(bubblegum, 0, 0, width, height);
    for (let i = 0; i < hearts.length; i++) {
      drawHearts(hearts[i]);
    }
    if(revaliMusic.isPlaying()===false){
      revaliMusic.play();
    }
  } else { revaliMusic.pause();}
  if (!hypnotizeSpell.active && !partySpell.active && !loveSpell.active && !sparksSpell.active) { // title card
    textAlign(CENTER);
    textFont(verve);
    textSize(30);
    fill(122, 79, 121);
    push(); // to isolate noStroke to this
    noStroke();
    text("Pick a magic spell", 0, -110);
    text("for the wizard to cast", 0, -70);
    pop();
  }
  wizardCharacter.display(); // make sure wizard z-index in front of everything else.
}

class Wizard {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  display() {
    imageMode(CENTER);
    image(wizard, this.x, this.y, 100, 120);
  }
}

class Spell {
  constructor() {
    this.active = false;
    this.sparkStorage = [];
    this.angle = 0;
  }
  start() {
    this.active = true;
  }
  stop() {
    this.active = false;
  }

  /* METHODS FOR PARTY SPELL */
  generateColors(numColors) { // populate color array with some random rainbow colors.
    this.colors = [];
    for (let i = 0; i < numColors; i++) {
      this.colors.push(color(random(255), random(255), random(255)));
    }
  }
  /* CODE ADAPTED FROM "Ring of circles: in class - return values https://editor.p5js.org/melodyloveless/sketches/qIRth0Kdj" */
  circleSize(x) {
    return 30 - x * 2;
  }
  ring(numCircles, ringRadius) {
    noStroke();
    for (let i = 0; i < numCircles; i++) {
      push();
      let rotateThis = (TWO_PI * i) / numCircles;
      rotate(rotateThis);
      fill(random(this.colors));
      ellipse(ringRadius, 0, this.circleSize(numCircles) * 1.3);
      pop();
    }        
  }
  
  /* METHODS FOR SPARKS SPELL */
  sparkTrail (radius, spacing) { // adapted from classwork TrailingAnimation https://editor.p5js.org/audre70/sketches/nQ1OK2lmb
    /* calculate coordinates */
    let x = radius * cos(this.angle);
    let y = radius * sin(this.angle);
    this.sparkStorage.push([x, y]);
    for (let i = 0; i < this.sparkStorage.length; i += spacing) { // Skip points based on the spacing
      noStroke();
      fill(i * 10, 200, 150);
      let s = 30 * (i / this.sparkStorage.length); // size of trailing dot.
      star(this.sparkStorage[i][0], this.sparkStorage[i][1], s, s/2)
    }
    if (this.sparkStorage.length > 10 * spacing) { // Adjust this value to control the number of dots
      this.sparkStorage.shift();
    }
    this.angle += radians(3); // controls speed
  }
}

/* HYPNOTIZE SPELL */
class NoisyBlob { // inspired by a classmate's use of perlin noise. References Coding Train's code and corresponding video "Butterfly Generator" https://editor.p5js.org/codingtrain/sketches/tKBc2fP8r
  constructor(radius, xIncrement) {
    this.yNoise = 0;
    this.xNoise = 0;
    this.radius = radius; // radius of blob
    this.xIncrement = xIncrement;
  }
  update() {
    this.yNoise += 0.07; // UPDATES SHAPE FOR ANIMATION
  }
  display() {
    stroke(255);
    noFill();
    strokeWeight(1);
    let angleIncrement = PI / 500; 
    // determines how much angle changes each iteration of loop eg, how much quickly the noise changes from one vertex to the next accordingly to angle
    //can increase resolution by reducing it.
    this.xNoise = 0;
    beginShape(); // // create a shape that iterates through range of values between 0 and 2pi aka full circle
    for (let i = 0; i <= TWO_PI; i += angleIncrement) {
      let noisy = noise(this.xNoise, this.yNoise); // perlin noise
      let mappedRadius = map(noisy, 0, 1, 50, this.radius); // maps the noise value generated by noisy into a radius for the "circle"
      let x = mappedRadius * cos(i); // converts into normal coordinates from polar X val
      let y = mappedRadius * sin(i); // converts into normal coordinates from polar yVal
      this.xNoise += this.xIncrement;
      vertex(x, y); // add new vertex to the shape based on calculation
    }
    endShape(CLOSE);
  }
}

/* LOVE SPELL W/ FLOATING HEARTS */
function drawHearts(heart) {
  heart.y -= heart.speed; // float up
  if (heart.y < -height / 2 - heart.size) { // restart when off screen
    heart.y = height / 2;
    heart.x = random(-width / 2, width / 2);
  }
  image(heart.image, heart.x, heart.y, heart.size, heart.size);
}

function star(x, y, radius1, radius2) { // taken from p5.js reference https://p5js.org/examples/form-star.html
  let angle = TWO_PI / 7; // number of points on star
  let halfAngle = angle / 2.0; 
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}