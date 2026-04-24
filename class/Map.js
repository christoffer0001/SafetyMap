class Map {
  constructor() {
    this.config = {
      radius: 25,
      maxOpacity: 0.8,
      minOpacity: 0.5,
      blur: 0.75,
      scaleRadius: false,
      useLocalExtrema: true,
      latField: "lat",
      lngField: "lng",
      valueField: "count",
    };

    let savedZoom = localStorage.getItem("zoomPref");
    this.zoomPref = savedZoom ? parseInt(savedZoom) : 14;

    // Create map inside of div (from html)
    this.map = L.map("map-canvas", {
      center: [56.44879, 9.396084],
      zoom: 6,
    });

    //In-build leaflet set view
    this.map.locate({setView: true, zoom: this.zoomPref});

    // Display base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    // Create heatmap layer
    this.heatmapLayer = new HeatmapOverlay(this.config).addTo(this.map);
  }

  display(info) {
    //Data set
    this.info = info;

    // Apply data to the heatmap overlay
    this.heatmapLayer.setData(this.info);
  }

  //Change zoom setting
  setZoom(zoomPref) {
    this.map.setZoom(zoomPref);
    localStorage.setItem("zoomPref", zoomPref);
  }
}
