import Location from "pdxbus/models/location";
import Arrival from "pdxbus/models/arrival";

// If you deploy your own version of this app into production,
// please use a different app ID. You can register with TriMet
// and get your own app ID here:
//
//   http://developer.trimet.org/appid/registration/
//

var APP_ID = "DCCA6AA121EA73D2C622BAB79";
var LOC_IDS = [6849, 6850, 10752];

function urlFor(resource) {
  return "http://developer.trimet.org/ws/V1/"+resource+"?json=true&appID="+APP_ID;
}

function arrivalsUrl(locations) {
  return urlFor('arrivals') + '&streetcar=true&locIDs=' + locations.join(',');
}

function locationsUrl(latitude, longitude) {
  return urlFor('stops') + '&ll=' + [latitude, longitude].join(',');
}

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('loadingPhase', 'position');

    this.location.getPosition()
      .then(function(position) {
        controller.set('loadingPhase', 'locations');
        var coords = position.coords;

        return $.getJSON(locationsUrl(coords.latitude, coords.longitude));
      })
      .then(normalizeLocations)
      .then(function(locations) {
        controller.set('model', locations);
        controller.set('loadingPhase', 'arrivals');

        var locIDs = locations.getEach('locid');
        return $.getJSON(arrivalsUrl(locIDs));
      })
      .then(function(data) {
        var locations = controller.get('model');

        loadArrivals(locations, data);
        controller.set('loadingPhase', null);
      });
  }
});

function normalizeLocations(data) {
  data = data.resultSet;

  var locations = data.location;

  return locations.map(function(location) {
    return Location.create(location);
  });
}

function loadArrivals(locations, data) {
  data = data.resultSet;

  var arrivals = data.arrival;
  var locationsByID = {};
  var queryTime = moment(data.queryTime);

  locations.forEach(function(location) {
    locationsByID[location.get('locid')] = location;
  });

  arrivals.forEach(function(arrival) {
    var location = locationsByID[arrival.locid];

    if (!location.get('arrivals')) {
      location.set('arrivals', []);
    }

    arrival.queryTime = queryTime;
    arrival = Arrival.create(arrival);

    location.get('arrivals').pushObject(arrival);
  });
}
