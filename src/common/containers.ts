import Vector2 from './Vector2';

export interface Container <T> {
  insert(item: T): boolean;
  remove(index: number): boolean;
  each(iterator: (item: T, index?: number, container?: Container<T>) => boolean | void): number;
  get(index: number): T;
  clear(): void;
  length(): number;
};

export interface VolumetricContainer<T> extends Container<T> {
  findNearPoint(center: Vector2, radius: number): T[];
}
