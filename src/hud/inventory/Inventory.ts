import Vue = require('vue');

require('./Inventory.scss');

export default Vue.extend({
  props: ['data'],
  template: require<JadeTemplate>('./Inventory.jade')()
});
