import CompositeOrder from './CompositeOrder';
import NavigationHelper from '../NavigationHelper';
import Asteroid from '../entities/Asteroid';
import Station from '../entities/Station';

export default class MineAndTradeOrder extends CompositeOrder {
  constructor(target: Asteroid) {
    super(CompositeOrder.Modes.LOOPING, [
    ]);
  }
}
