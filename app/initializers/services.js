export default {
  name: 'services',
  initialize: function(container, application){
    application.inject('route', 'location', 'service:location');
  }
};
