export default Ember.Object.extend({
  arrivals: null,

  laterArrivals: function() {
    return this.get('arrivals').slice(1);
  }.property('arrivals.[]')
});
