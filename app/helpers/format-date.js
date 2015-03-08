import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  if (!value) { return; }

  options = options.hash;

  var m = moment(value);
  var now = moment();

  if (options.utc) { m = m.utc(); }

  if (options.preventPast) {
    if (m.isBefore(now)) {
      m = now;
    }
  }

  if (options.fromNow) {
    options.from = now;
  }

  if (options.from) {
    return m.from(options.from, options.skipSuffix);
  } else {
    return m.format(options.format);
  }
});
