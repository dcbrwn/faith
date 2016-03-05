import Item from './items/Item';
import Inventory from './items/Inventory';
import Account from './Account';

class Rate {
  public sell: number;
  public buy: number;

  constructor(sell, buy) {
    this.sell = sell;
    this.buy = buy;
  }
}

export default class Stock {
  private inventory: Inventory = new Inventory({
    name: 'Goods storage',
    volume: 10000.0,
  });
  private rates: {[key: string]: Rate} = {};
  private account: Account = new Account({
    credits: 100000,
  });

  setRate(itemId: string, buy: number, sell: number): void {
    this.rates[itemId] = new Rate(buy, sell);
  }

  getRate(itemId: string): Rate {
    return this.rates[itemId];
  }

  forEachRate(func: (string, Rate) => boolean): void {
    for (let itemId in this.rates) {
      if (func(itemId, this.rates[itemId])) {
        return;
      }
    }
  }

  sell(itemId: string, buyerAccount: Account, buyerInventory: Inventory): boolean {
    const index = this.inventory.findItem(itemId);
    if (index === -1) {
      return false;
    }

    const cost = this.getRate(itemId).sell;
    if (!cost) {
      return false;
    }

    if (!buyerAccount.transfer(this.account, cost)) {
      return false;
    }

    const item = this.inventory.pull(index);
    buyerInventory.insert(item);
    return true;
  }

  buy(itemId: string, sellerAccount: Account, sellerInventory: Inventory): boolean {
    const cost = this.getRate(itemId).buy;
    if (!cost) {
      return false;
    }

    const index = sellerInventory.findItem(itemId);
    if (index === -1) {
      return false;
    }

    if (!this.account.transfer(sellerAccount, cost)) {
      return false;
    }

    const item = sellerInventory.pull(index);
    this.inventory.insert(item);
    return true;
  }
}
