import Ember from "ember";
import haversine from "pdxbus/utils/haversine-distance";

var alias = Ember.computed.alias,
    service = Ember.inject.service;

export default Ember.Component.extend({
  geolocation: service(),
  currentPosition: alias('geolocation.currentPosition'),

  lat: alias('location.lat'),
  lng: alias('location.lng'),

  distance: function() {
    var locationPosition = {
      latitude: this.get('location.lat'),
      longitude: this.get('location.lng')
    };

    var userPosition = this.get('currentPosition.coords');

    // Convert from miles to feet
    var distance = haversine(locationPosition, userPosition);
    var unit;

    if (distance < 0.1) {
      distance = Math.round(distance * 5280);
      unit = "ft";
    } else {
      distance = Math.round(distance * 100) / 100;
      unit = "mi";
    }

    return distance + " " + unit;
  }.property('lat', 'lng', 'currentPosition')
});
