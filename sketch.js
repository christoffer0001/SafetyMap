let map;
let dangerInfo;
let locations;

function setup() {
  createCanvas(800, 120); // Size of canvas placed below #map-canvas
  background(200);

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

  //Repeat the display of danger-zones as heatmap
  setInterval(() => {
    map.display(dangerInfo);
    console.log(dangerInfo);
  }, 10000);
}

function draw() {}

function getPos() {
  locations.getLocation((pos) => {
    dangerInfo.data.push(pos);
  });
}
