import DS from "ember-data";

export default DS.JSONSerializer.extend({
  extractArray: function(store, type, payload, id, requestType) {
    if (requestType !== 'findQuery') { return payload; }

    var resultSet = payload.resultSet;

    var extractedPayload = resultSet[type.typeKey];

    if (extractedPayload) {
      return extractedPayload.map(singlePayload => {
        return this.normalize(type, singlePayload);
      });
    }
  },

  normalize: function(type, payload) {
    if (type.typeKey === 'location') {
      payload.id = payload.locid;
      payload.links = { arrivals: 'fetched' };
    }
    return payload;
  }
});
