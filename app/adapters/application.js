import DS from "ember-data";
import Ember from "ember";

export default DS.Adapter.extend({
  init: function() {
    this._super();
    this.arrivalFinds = [];
  },

  findQuery: function(store, type, query) {
    var coords = query.coords;
    return Ember.$.getJSON(locationsUrl(coords.latitude, coords.longitude));
  },

  findHasMany: function(store, record) {
    if (record.constructor.typeKey === 'location') {
      return this.findArrivalsFor(record);
    }
  },

  findArrivalsFor: function(record) {
    Ember.run.once(this, this.fetchArrivals);
    return new Ember.RSVP.Promise(resolve => {
      this.arrivalFinds.push([record, resolve]);
    });
  },

  fetchArrivals: function() {
    var arrivalFinds = this.arrivalFinds;
    this.arrivalFinds = [];

    var locations = arrivalFinds.map(i => i[0].get('id'));

    Ember.$.getJSON(arrivalsUrl(locations)).then(data => {
      var arrivalsByID = normalizeArrivals(data);

      arrivalFinds.forEach(tuple => {
        var location = tuple[0];
        var resolve = tuple[1];

        var arrivals = arrivalsByID[location.get('id')];
        resolve(arrivals || []);
      });
    });
  }
});

function normalizeArrivals(data) {
  data = data.resultSet;

  var arrivals = data.arrival;
  var arrivalsByID = {};

  arrivals.forEach(function(arrival) {
    var arrivalsForLoc = arrivalsByID[arrival.locid] || [];
    arrivalsForLoc.push(arrival);
    arrival.id = Ember.guidFor(arrival);
    arrival.location = arrival.locid;
    arrivalsByID[arrival.locid] = arrivalsForLoc;
  });

  return arrivalsByID;
}

var APP_ID = "DCCA6AA121EA73D2C622BAB79";

function urlFor(resource) {
  return "http://developer.trimet.org/ws/V1/"+resource+"?json=true&appID="+APP_ID;
}

function arrivalsUrl(locations) {
  return urlFor('arrivals') + '&streetcar=true&locIDs=' + locations.join(',');
}

function locationsUrl(latitude, longitude) {
  return urlFor('stops') + '&ll=' + [latitude, longitude].join(',') + "&feet=1500";
}
