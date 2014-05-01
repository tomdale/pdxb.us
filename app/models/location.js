export default Ember.Object.extend({
  init: function() {
    var arrivals = [];
    arrivals.isLoading = true;

    this.set('arrivals', arrivals);
  },
  arrivals: null,

  laterArrivals: function() {
    return this.get('arrivals').slice(1);
  }.property('arrivals.[]')
});
