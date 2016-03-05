import Vue = require('vue');

require('./Navbar.sass');

export default Vue.extend({
  props: ['player'],
  template: require<JadeTemplate>('./Navbar.jade')()
});
