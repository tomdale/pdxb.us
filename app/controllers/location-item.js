import Ember from "ember";
import haversine from "pdxbus/utils/haversine-distance";

export default Ember.ObjectController.extend({
  distance: function() {
    var locationPosition = {
      latitude: this.get('lat'),
      longitude: this.get('lng')
    };

    var userPosition = this.get('parentController.currentPosition');

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
  }.property('lat', 'lng', 'parentController.currentPosition')
});
