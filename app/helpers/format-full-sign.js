import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(fullSign) {
  if (fullSign.substring(0,18) === "Portland Streetcar") {
    return fullSign.substring(19);
  }

  return fullSign;
});
