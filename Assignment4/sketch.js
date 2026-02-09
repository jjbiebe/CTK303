//let cars = new Array(100);
let cars = [];
let wifes = [];
let frogPos;
let state = 0;
let timer = (20 * 60);
let playOnce = 0;
let img1, img2, img3, img4, img5;
let l_img, w_img, m_img, g_img; 
let music1, music2, music3;
let s1, s2;
let count = 0;

function preload() {
  music1 = loadSound("assets/music.mp3");
  music2 = loadSound("assets/w_music.mp3");
  music3 = loadSound("assets/l_music.mp3");
  
  s1 = loadSound("assets/catch.mp3");
  s2 = loadSound("assets/ohno.mp3");
}

function setup() {
  rectMode(CENTER);
  imageMode(CENTER);
  
  l_img = loadImage("assets/lose.png");
  w_img = loadImage("assets/win.png");
  m_img = loadImage("assets/menu.png");
  g_img = loadImage("assets/bank.png");
  
  img1 = loadImage("assets/robert.png");
  img2 = loadImage("assets/the_wife.png");
  img3 = loadImage("assets/fish1.png");
  img4 = loadImage("assets/fish2.png");
  img5 = loadImage("assets/fish3.png");
  
  fishArray = [img3, img4, img5];
  
  createCanvas(960, 540).parent("game");
  rectMode(CENTER);
  for (let i = 0; i < 17; i++) {
     cars.push(new Car(random(fishArray))); // pushes onto an array called “cars”
  }
  
  for (let i = 0; i < 6; i++) {
     wifes.push(new Wife(img2)); // pushes onto an array called “wifes”
  }

  frogPos = createVector(width / 2, height / 2 - 100);
}

function draw() {
  switch(state){
    case 0: //menu state
      image(m_img, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
      if (!music1.isPlaying()) {
        music1.play();
        music3.pause();
        music2.pause();
      }
        playOnce = 0;
      break;
    case 1: //game state
      game();
      timer--;
      if (cars.length == 7) state = 3;
      if (timer <= 0) state = 2;
      if (!music1.isPlaying()) {
        music1.play();
        music3.pause();
        music2.pause();
      }
      break;
    case 2: //lose state
      image(l_img, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
      resetTheGame();
      if (!music3.isPlaying()) {
        music3.play();
        music1.pause();
        music2.pause();
      }
      if (!s2.isPlaying() && playOnce != 1) { //cheer can begin to play
        s2.play();
        playOnce = 1;
      }
      break;
    case 3: //win state
      image(w_img, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
      if (!music2.isPlaying()) {
        music2.play();
        music1.pause();
        music3.pause();
      }
      resetTheGame();
      break;
  }
}

function resetTheGame() {
  timer = (20 * 60);
  cars = [];
  wifes = [];
  count = 0;
  
  for (let i = 0; i < 17; i++) {
     cars.push(new Car(random(fishArray))); // pushes onto an array called “cars”
  }
  
    for (let i = 0; i < 6; i++) {
     wifes.push(new Wife(img2)); // pushes onto an array called “wifes”
  }
}

function game(){
  image(g_img, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  textSize(25);
  fill("white");
  text("Catches😀: " + count, 15, 30);
  text(int(round(timer / 60)) + ":Time left", width - 160, 30);
  for (let i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].move();

    if (cars[i].pos.dist(frogPos) < 50) {
      cars.splice(i, 1);
      count++;
      s1.play();
    }
  }
  
  for (let i = 0; i < wifes.length; i++) {
    wifes[i].display();
    wifes[i].move();

    if (wifes[i].pos.dist(frogPos) < 50) {
      state = 2;
    }
  }

  
  image(img1, frogPos.x, frogPos.y, 70, 70);

  checkForKeys();
}

function checkForKeys() {
  if (keyIsDown(65)) {
    frogPos.x -= 5;
  }
  if (keyIsDown(68)) {
    frogPos.x += 5;
  }
  if (keyIsDown(87)) {
    frogPos.y -= 5;
  }
  if (keyIsDown(83)) {
    frogPos.y += 5;
  }
}

function mouseReleased() {
  if (state == 0) state = 1;
  else if (state == 2 || state == 3) state = 0;
}

class Car {
  // The class's constructor and attributes
  constructor(img) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-3, 3), random(-3, 3));
    // this.r = random(255);
    // this.g = random(255);
    // this.b = random(255);
    // this.o = random(255);
    // this.size = random(10, 50);
    this.img = img;
  }

  // methods - these get called with a dot after the variable

  display() {
    // fill(this.r, this.g, this.b, this.o);
    // // textSize(this.size);
    // // text("EPIC", this.pos.x, this.pos.y);
    // rect(this.pos.x, this.pos.y, 50, 25);
    // ellipse(this.pos.x - 20, this.pos.y + 15, 15, 15);
    // ellipse(this.pos.x + 20, this.pos.y + 15, 15, 15);
    image(this.img, this.pos.x, this.pos.y, 50, 50);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    // if ((this.pos.x >= width - 25 && inc > 0) || (x <= 25 && inc < 0)) {
    //   inc = inc * -1;
    // }
  }
}

class Wife extends Car {
  // The class's constructor and attributes
  constructor(img) {
    super(img)
    // this.pos = createVector(random(width), random(height));
    // this.vel = createVector(random(-1, 1), random(-1, 1));
    // // this.r = random(255);
    // // this.g = random(255);
    // // this.b = random(255);
    // // this.o = random(255);
    // // this.size = random(10, 50);
    // this.img = img;
  }
}
