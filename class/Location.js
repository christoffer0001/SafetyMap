class Location {
  constructor() {}

  getLocation(callback) {
    navigator.geolocation.getCurrentPosition((position) => {
      let pos = {lat: position.coords.latitude, lng: position.coords.longitude, count: 1};
      callback(pos);
    });
  }
}
