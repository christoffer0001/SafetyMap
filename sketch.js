let map;
let dangerInfo;
let locations;
let iconBtns;

let barometerIcon, brugerprofilIcon, natteravnIcon, vennesymbolIcon;

function preload() {
  barometerIcon = loadImage("Assets/Barometer.png");
  brugerprofilIcon = loadImage("Assets/Brugerprofil.png");
  natteravnIcon = loadImage("Assets/Natteravn.png");
  vennesymbolIcon = loadImage("Assets/Vennesymbol.png");
}

function setup() {
  createCanvas(800, 120); // Size of canvas placed below #map-canvas

  map = new Map();
  locations = new Location();
  iconBtns = new IconBtns(map);

  //Recive data from local storage, else no data yet.
  const unStringifiredOBJ = localStorage.getItem("dangerInfo") ? JSON.parse(localStorage.getItem("dangerInfo")) : [];
  dangerInfo = {
    data: unStringifiredOBJ,
  };

  map.display(dangerInfo);

  //Repeat the display of danger-zones as heatmap every 0.5 seconds
  setInterval(() => {
    if (dangerInfo.data.length == 0) return;
    map.display(dangerInfo);
  }, 500);
}

function draw() {
  background(255);
  iconBtns.display(barometerIcon, vennesymbolIcon, natteravnIcon, brugerprofilIcon);
}

function getPos(squareNr) {
  //Arrow function with callback
  locations.getLocation(squareNr, (pos) => {
    dangerInfo.data.push(pos);
    const stringifiredOBJ = JSON.stringify(dangerInfo.data);
    localStorage.setItem("dangerInfo", stringifiredOBJ);
  }); //Recives the location and passes a function into the function,
  // which will run after the location has been found. This function pushes the position into the dangerInfo dataset.
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;

  iconBtns.clicked(x, y);
}
