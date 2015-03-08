import DS from "ember-data";

var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  desc: attr(),
  dir: attr(),
  lat: attr(),
  lng: attr(),

  arrivals: hasMany('arrival', { async: true }),

  laterArrivals: function() {
    return this.get('arrivals').slice(1);
  }.property('arrivals.[]')
});
