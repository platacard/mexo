import { EntityRegistrationOptions } from '../models/registration-options';
import { entityOptionsRegistry } from '../registry';
import { preloadEntity } from './preload-entity';

export function registerEntity<
  T,
  K extends EntityRegistrationOptions<T> = EntityRegistrationOptions<T>,
>(options: K): void {
  entityOptionsRegistry.set(options.name, options);

  if (options.preload) {
    preloadEntity(options.name);
  }
}
