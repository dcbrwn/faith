import Vue = require('vue');
import Engine from '../Engine';

import Inspector from './inspector/Inspector';
import Inventory from './inventory/Inventory';
import Navbar from './navbar/Navbar';
import ProgressBar from './progressBar/ProgressBar';

require('./hud.sass');

Vue.config.debug = false;

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
        'hud-inventory': Inventory,
        'hud-navbar': Navbar,
      },
    });
  }
}
