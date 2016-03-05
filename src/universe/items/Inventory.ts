import SimpleContainer from '../../common/SimpleContainer';
import Item from './Item';

interface InventoryOptions {
  name?: string,
  volume?: number,
};

export default class Inventory
extends SimpleContainer<Item>
{
  private volume: number;
  private name: string;

  constructor(options: InventoryOptions) {
    super();
    this.volume = options.volume || 100.0;
    this.name = options.name || 'Generic inventory';
  }

  getTotalVolume(): number {
    let volume = 0;
    this.each((item) => {
      volume += item.volume;
    });
    return volume;
  }

  getTotalMass(): number {
    let mass = 0;
    this.each((item) => {
      mass += item.mass;
    });
    return mass;
  }

  insert(item: Item): boolean {
    if (this.getTotalVolume() + item.volume > this.volume) {
      return false;
    }

    return super.insert(item);
  }

  pull(index: number): Item {
    if (index >= this.items.length) {
      return null;
    }

    const item = this.items[index];
    this.remove(index);
    return item;
  }

  findItem(itemId: string): number {
    const index = this.each((item) => {
      return item.id === itemId;
    });

    return index === this.length() ? -1 : index;
  }

  getSummary() {
    const summary = {};
    this.each((item) => {
      if (!summary[item.id]) {
        summary[item.id] = {
          name: item.name,
          count: 1,
        };
      } else {
        summary[item.id].count += 1;
      }
    });
    return summary;
  }
}
