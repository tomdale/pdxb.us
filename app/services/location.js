import Ember from "ember";

var geolocation;

// Detect if geolocation is available on the current device.
if ('geolocation' in navigator) {
  geolocation = navigator.geolocation;
}

export default Ember.Object.extend({
  /*
   * The maximumAge attribute indicates that the application is willing to
   * accept a cached position whose age is no greater than the specified time
   * in milliseconds. If maximumAge is set to 0, the implementation must
   * immediately attempt to acquire a new position. Setting the maximumAge to
   * Infinity causes the browser to return a cached position regardless of its
   * age. If an implementation does not have a cached position available whose
   * age is no greater than the specified maximumAge, then it must acquire a
   * new position object.
   *
   * See: http://www.w3.org/TR/geolocation-API/#position_options_interface
   */
  maximumAge: 1000,

  enableHighAccuracy: true,

  getPosition: function() {
    return new Ember.RSVP.Promise(function(res, rej) {
      if (!geolocation) {
        rej(new Error("Geolocation is not available either in this browser or on this device."));
        return;
      }

      geolocation.watchPosition(function(position) {
        res(position);
      });
    });
  }
});
