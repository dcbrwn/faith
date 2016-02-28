import Vue = require('vue');

require('./Inspector.sass');

export default Vue.extend({
  props: ['entity'],
  template: require<JadeTemplate>('./Inspector.jade')()
});
