import Ember from "ember";

export default Ember.Object.extend({
  arrivalTime: function() {
    if (this.get('isScheduled')) {
      return this.get('scheduled');
    } else {
      return this.get('estimated');
    }
  }.property('isScheduled', 'estimated', 'scheduled'),

  isScheduled: function() {
    return this.get('status') === 'scheduled';
  }.property('status')
});
