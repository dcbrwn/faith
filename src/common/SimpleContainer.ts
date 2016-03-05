import { Container } from './containers';

export default class SimpleContainer<T>
implements Container<T>
{
  protected items: T[] = [];

  insert(item: T): boolean {
    this.items.push(item);
    return true;
  }

  remove(index: number): boolean {
    if (index >= this.items.length) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }

  each(iterator: (T, number, Container) => boolean | void): number {
    let index = 0;
    for (let len = this.items.length; index < len; index += 1) {
      if (iterator(this.items[index], index, this)) {
        break;
      }
    }
    return index;
  }

  get(index: number): T {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  length(): number {
    return this.items.length;
  }
}
