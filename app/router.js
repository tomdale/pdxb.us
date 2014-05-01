var Router = Ember.Router.extend({
  location: 'hash'
});

Router.map(function() {
  this.resource('nearby');
});

export default Router;
