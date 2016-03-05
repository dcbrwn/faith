/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./definitions.ts" />

import Engine from './Engine';
import Hud from './hud/Hud';

require('file?name=[name].[ext]!./index.html');

const engine = new Engine({
  canvasId: 'radar',
});

const hud = new Hud({
  containerId: 'hud',
  engine: engine
});

engine.start();
