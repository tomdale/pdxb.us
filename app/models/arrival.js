import DS from "ember-data";

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  status: attr(),
  estimated: attr(),
  block: attr(),
  detour: attr(),
  dir: attr(),
  fullSign: attr(),
  shortSign: attr(),

  location: belongsTo('location'),

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
