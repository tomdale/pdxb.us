import Ember from "ember";
import Location from "pdxbus/models/location";
import Arrival from "pdxbus/models/arrival";

// If you deploy your own version of this app into production,
// please use a different app ID. You can register with TriMet
// and get your own app ID here:
//
//   http://developer.trimet.org/appid/registration/
//

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('loadingPhase', 'position');

      //.then(normalizeLocations)
      //.then(function(locations) {
        //controller.set('model', locations);
        //controller.set('loadingPhase', 'arrivals');

        //var locIDs = locations.getEach('locid').sort();
        //return $.getJSON(arrivalsUrl(locIDs));
      //})
      //.then(function(data) {
        //var locations = controller.get('model');

        //loadArrivals(locations, data);
        //controller.set('loadingPhase', null);
      //});
  }
});

function normalizeLocations(data) {
  data = data.resultSet;

  var locations = data.location;

  return locations.map(function(location) {
    return Location.create(location);
  });
}

