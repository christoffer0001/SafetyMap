class Locations {
  constructor() {}

  getLocation(squareNr, callback) {
    //x.x.x = API position access. Thereafter using arrow function to take the position
    // and give it back to the former function (Pushing the position into the dangerInfo dataset)
    navigator.geolocation.getCurrentPosition((position) => {
      callback({lat: position.coords.latitude, lng: position.coords.longitude, count: squareNr});
    });
  }
}
