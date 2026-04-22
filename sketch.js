let testData;
let cfg;

function setup() {
  // Heatmap config
  cfg = {
    radius: 25,
    maxOpacity: 1,
    minOpacity: 0.5,
    blur: 0.75,
    scaleRadius: false,
    useLocalExtrema: true,
    latField: "lat",
    lngField: "lng",
    valueField: "count",
  };

  //Sample data ONLY
  testData = {
    max: 8,
    data: [
      {lat: 56.44879, lng: 9.396084, count: 8},
      {lat: 56.449, lng: 9.397, count: 6},
      {lat: 56.447, lng: 9.395, count: 7},
    ],
  };
}

function draw() {
  // Create map inside of div (from html)
  let map = L.map("map-canvas", {
    center: [56.44879, 9.396084],
    zoom: 13,
  });

  // Display base layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Heatmap layer
  let heatmapLayer = new HeatmapOverlay(cfg).addTo(map);

  // Apply data to the heatmap overlay
  heatmapLayer.setData(testData);
}
