import Ember from "ember";

function loadingPhaseProperty(phase) {
  return function() {
    return this.get('loadingPhase') === phase;
  }.property('loadingPhase');
}

export default Ember.ArrayController.extend({
  loadingPosition: loadingPhaseProperty('position'),
  loadingLocations: loadingPhaseProperty('locations'),
  loadingArrivals: loadingPhaseProperty('arrivals'),
});
