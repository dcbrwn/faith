import Vue = require('vue');

require('./ProgressBar.sass');

export default Vue.extend({
  props: ['value'],
  template: require<JadeTemplate>('./ProgressBar.jade')()
});
