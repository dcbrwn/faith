import Vue = require('vue');
import Faith from '../Faith';

import Inspector from './inspector/Inspector';
import ProgressBar from './progressBar/ProgressBar';

require('./hud.sass');

Vue.config.debug = true;

export default class Hud {
  private container;

  constructor(options) {
    Vue.component('hud-progress-bar', ProgressBar);

    this.container = new Vue({
      el: '#' + options.containerId,
      template: require<JadeTemplate>('./hud.jade')(),
      data: {
        radar: options.engine.radar,
      },
      components: {
        'hud-inspector': Inspector,
      },
    });
  }
}
