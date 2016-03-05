import Item from './Item';

export class RocksChunk extends Item {
  public id: string = 'items.commons.rocksChunk';
  public name: string = 'Rocks chunk';
  public mass: number = 1.0;
  public volume: number = 1.0;
}

export class DerbisChunk extends Item {
  public id: string = 'items.commons.derbisChunk';
  public name: string = 'Derbis';
  public description: string = 'Technological garbage left after some disaster';
  public mass: number = 1.0;
  public volume: number = 1.0;
}
