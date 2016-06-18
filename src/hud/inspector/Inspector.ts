import Vue = require('vue');

require('./Inspector.scss');

export default Vue.extend({
  props: ['entity'],
  template: require<JadeTemplate>('./Inspector.jade')()
});
