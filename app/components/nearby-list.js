import Ember from 'ember';

export default Ember.Component.extend({
  geolocation: Ember.inject.service(),

  init: function() {
    this._super();
    this.get('geolocation').start();
    this.timer = setInterval(() => {
      Ember.run(this, this.updateArrivals);
    }, 30 * 1000);
  },

  updateArrivals: function() {
    var locations = this.get('locations');

    if (locations) {
      locations.forEach(location => {
        location.get('arrivals').reload();
      });
    }
  },

  currentPosition: Ember.computed.alias('geolocation.currentPosition'),

  currentPositionDidChange: function() {
    var position = this.get('currentPosition');

    this.store.find('location', position)
      .then(locations => {
        this.set('locations', locations);
      });
  }.observes('currentPosition'),

  loadingPhase: function() {
    if (!this.get('currentPosition')) {
      return 'Finding your location…';
    }
  }.property('currentPosition')
});
