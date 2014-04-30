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
  return "http://developer.trimet.org/ws/V1/"+resource+"?locIDs="+LOC_IDS.join(',')+"&json=true&appID="+APP_ID;
}

export default Ember.Route.extend({
  model: function() {
    return $.getJSON(urlFor('arrivals'))
      .then(normalizeData);
  }
});

function normalizeData(data) {
  data = data.resultSet;

  var arrivals = data.arrival;
  var locations = data.location;
  var locationsByID = {};

  locations.forEach(function(location) {
    locationsByID[location.locid] = location;
  });

  var queryTime = moment(data.queryTime);

  arrivals.forEach(function(arrival) {
    var location = locationsByID[arrival.locid];

    if (!location.arrivals) {
      location.arrivals = [];
    }

    arrival = Arrival.create(arrival);

    location.arrivals.push(arrival);

    arrival.queryTime = queryTime;
  });


  locations = locations.map(function(location) {
    location.queryTime = queryTime;
    return Location.create(location);
  });

  return locations;
}
