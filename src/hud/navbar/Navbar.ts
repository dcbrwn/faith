import Vue = require('vue');

require('./Navbar.scss');

export default Vue.extend({
  props: ['player'],
  template: require<JadeTemplate>('./Navbar.jade')()
});
