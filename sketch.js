let map;
let dangerInfo;

function setup() {
  createCanvas(800, 800);

  map = new Map();
  map.display(dangerInfo);

  //Temp data for testing
  dangerInfo = {
    max: 8,
    data: [
      {lat: 56.44879, lng: 9.396084, count: 8},
      {lat: 56.449, lng: 9.397, count: 6},
      {lat: 56.447, lng: 9.395, count: 7},
    ],
  };
}

function draw() {}

//Repeat the display of danger-zones as heatmap
setInterval(() => {
  map.display(dangerInfo);
}, 500);
