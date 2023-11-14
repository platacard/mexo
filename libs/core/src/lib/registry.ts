import {EntityRegistrationOptions} from './models/registration-options';
import {EntityConstructor} from './models/entity';

export class MicrozordRegistry<K, V> {
  private _map = new Map<K, V>();

  clear(): void {
    this._map.clear();
  }

  get<E extends V = V>(key: K): E | undefined {
    return this._map.get(key) as E;
  }

  set<E extends V = V>(key: K, value: E): void {
    this._map.set(key, value);
  }
}

export const entityOptionsRegistry = new MicrozordRegistry<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EntityRegistrationOptions<any>
>();

export const loadedEntityRegistry = new MicrozordRegistry<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EntityConstructor<any, any>
>();
