/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./definitions.ts" />

import Faith from './Faith';
import Hud from './hud/Hud';

const faith = new Faith({
  canvasId: 'radar',
});

const hud = new Hud({
  containerId: 'hud',
  engine: faith
});

faith.start();
