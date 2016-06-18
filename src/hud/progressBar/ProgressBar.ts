import Vue = require('vue');

require('./ProgressBar.scss');

export default Vue.extend({
  props: ['value'],
  template: require<JadeTemplate>('./ProgressBar.jade')()
});
