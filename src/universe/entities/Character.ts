import Inventory from '../items/Inventory';
import Account from '../Account';
import Entity from './Entity';

interface CharacterOptions {
  name: string,
};

export default class Character extends Entity {
  public account: Account;
  public inventory: Inventory;
  private name: string;

  constructor(options: CharacterOptions) {
    super();
    this.name = options.name;
  }

  getName() {
    return this.name;
  }

  getProperty() {
  }
}
