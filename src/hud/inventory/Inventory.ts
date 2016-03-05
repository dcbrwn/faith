import Vue = require('vue');

require('./Inventory.sass');

export default Vue.extend({
  props: ['data'],
  template: require<JadeTemplate>('./Inventory.jade')()
});
