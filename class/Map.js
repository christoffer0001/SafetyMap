class Map {
  constructor() {
    this.config = {
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

    // Create map inside of div (from html)
    this.map = L.map("map-canvas", {
      center: [56.44879, 9.396084],
      zoom: 16,
    });

    // Display base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
  }

  display(info) {
    //Sample data
    this.info = info;

    // Heatmap layer
    this.heatmapLayer = new HeatmapOverlay(this.config).addTo(this.map);

    // Apply data to the heatmap overlay
    this.heatmapLayer.setData(this.info);
  }
}
