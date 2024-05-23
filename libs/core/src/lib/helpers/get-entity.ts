import { EntityConstructor } from '../models/entity';
import { loadedEntityRegistry } from '../registry';

export async function getEntity<T, K>(
  entityName: string,
): Promise<EntityConstructor<T, K> | null> {
  return loadedEntityRegistry.get(entityName) || null;
}
