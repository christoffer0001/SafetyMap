let map;
let dangerInfo;
let locations;

let barometer, brugerprofil, natteravn, vennesymbol;

let barometerClicked;

function preload() {
  barometer = loadImage("Assets/Barometer.png");
  brugerprofil = loadImage("Assets/Brugerprofil.png");
  natteravn = loadImage("Assets/Natteravn.png");
  vennesymbol = loadImage("Assets/Vennesymbol.png");
}

function setup() {
  createCanvas(800, 120); // Size of canvas placed below #map-canvas

  map = new Map();
  locations = new Location();

  //Temp data for testing
  dangerInfo = {
    data: [],
  };

  map.display(dangerInfo);

  //Repeat the display of danger-zones as heatmap every 10 seconds
  setInterval(() => {
    if (dangerInfo.data.length == 0) return;
    map.display(dangerInfo);
  }, 1000);

  //Makes the logoes be there from the start
  barometerClicked = false;
}

function draw() {
  background(255);
  if (barometerClicked == false) {
    //Showw icons if non has been clicked
    image(barometer, 0, 0, width / 4, height);
    image(vennesymbol, (1.05 * width) / 4, -height / 6.67, width / 4, height * 1.4);
    image(natteravn, (2.1 * width) / 4, -height / 20, width / 5, height);
    image(brugerprofil, (3.15 * width) / 4, 0, width / 6, height);
  } else {
    //If "Barometer" has been clicked, show numbers ranking from 1-10
    for (let i = 0; i < 10; i++) {
      if (i <= 3) {
        fill(100, 255, 100);
      } else if (i > 3 && i <= 6) {
        fill(255, 255, 0);
      } else {
        fill(255, 0, 0);
      }
      let sizeText = width / 20;
      textSize(sizeText);
      rect((width / 10) * i, height / 50, width / 10, height * 0.96);

      fill(0);
      text(i + 1, (width / 10) * i + width / 20 - sizeText / 3, height / 2 + sizeText / 3);
    }
  }
}

function getPos(squareNr) {
  //Arrow function with callback
  locations.getLocation((pos) => dangerInfo.data.push(pos), squareNr); //Recives the location and passes a function into the function,
  // which will run after the location has been found. This function pushes the position into the dangerInfo dataset.
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;

  if (x < 0 && x > width && y < 0 && y > height) return;
  if (barometerClicked) {
    let squareNr;
    for (let i = 0; i < 10; i++) {
      let rectX = (width / 10) * i;
      let rectW = width / 10;

      if (x >= rectX && x <= rectX + rectW) {
        squareNr = i + 1;
        barometerClicked = false;
        getPos(squareNr);
      }
    }
  } else {
    if (x > 0 && x < width / 4) {
      //Barometer
      barometerClicked = true;
    } else if (x > (1.05 * width) / 4 && x < (1.05 * width) / 4 + width / 4) {
      //Ven kontakt
    } else if (x > (2.1 * width) / 4 && x < (2.1 * width) / 4 + width / 5) {
      //Natteravn
    } else if (x > (3.15 * width) / 4 && x < (3.15 * width) / 4 + width / 6) {
      //Profil
    }
  }
}
