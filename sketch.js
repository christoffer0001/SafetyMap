let map;
let dangerInfo;
let locations;
let iconBtns;

let updateInterval;

let mapInterval;

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
  iconBtns = new IconBtns(map, restartMapLoading); //Map class, restart function to map (with update intervavl)

  //Recive data from local storage, else no data yet.
  const unStringifiredOBJ = localStorage.getItem("dangerInfo") ? JSON.parse(localStorage.getItem("dangerInfo")) : [];
  dangerInfo = {
    data: unStringifiredOBJ,
  };

  map.display(dangerInfo);

  let tempUpdateInterval = parseFloat(localStorage.getItem("updateInterval"));
  updateInterval = tempUpdateInterval ? tempUpdateInterval : 0.5;

  restartMapLoading();
}

function draw() {
  background(255);
  iconBtns.display(barometerIcon, vennesymbolIcon, natteravnIcon, brugerprofilIcon);
}

//Inside function, so it can be called and restarted later
function startMapLoading() {
  mapInterval = setInterval(() => {
    if (dangerInfo.data.length == 0) return;
    map.display(dangerInfo);
    console.log("Update");
  }, updateInterval * 1000);
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

//When clicked submit, to update interval
function restartMapLoading() {
  clearInterval(mapInterval); // stop old interval
  startMapLoading(); // start new one
}
