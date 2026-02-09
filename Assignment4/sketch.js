let img1, img2, img3;
let font1, font2, font3;
let music;
function preload() {
  music = loadSound("assets/The_Hampster_Dance.mp3");
  
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);

  img1 = loadImage("assets/Barny.png");
  img2 = loadImage("assets/Sheen.png");
  img3 = loadImage("assets/Jon.png");

  font1 = loadFont("assets/Pokemon.ttf");
  font2 = loadFont("assets/Panic.ttf");
  font3 = loadFont("assets/doctor_punk.otf");

  music.play();
}

function draw() {
  background(0);

  image(img1, width / 2 - 200, height / 2 - 100, 180, 180);
  image(img2, width / 2, height / 2 - 100, 180, 180);
  image(img3, width / 2 + 200, height / 2 - 100, 180, 180);

  textAlign(CENTER);
  textFont(font3, 42);
  fill("white");
  text("Choose", width / 2 - 200, height / 2 + 50);

  textFont(font2);
  text("Your", width / 2, height / 2 + 50);

  textFont(font1);
  text("Character!", width / 2 + 200, height / 2 + 50);

  textAlign(LEFT);
  textFont("Verdana", 12);
  text("The Hampster Dance song by Deidre LaCarte", 10, height - 20);
}
