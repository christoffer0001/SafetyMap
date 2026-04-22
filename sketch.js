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
  background(255);

  map = new Map();
  locations = new Location();

  //Temp data for testing
  dangerInfo = {
    data: [
      {lat: 56.44879, lng: 9.396084, count: 1},
      {lat: 56.449, lng: 9.397, count: 1},
      {lat: 56.447, lng: 9.395, count: 1},
    ],
  };

  map.display(dangerInfo);

  //Repeat the display of danger-zones as heatmap every 10 seconds
  setInterval(() => {
    map.display(dangerInfo);
    console.log(dangerInfo);
  }, 10000);

  //Makes the logoes be there from the start
  barometerClicked = false;
}

function draw() {
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

function getPos() {
  //Arrow function with callback
  locations.getLocation((pos) => dangerInfo.data.push(pos)); //Recives the location and passes a function into the function, which will run after the location has been found. This function pushes the position into the dangerInfo dataset.
}
