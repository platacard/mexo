import { EntityConstructor } from '../models/entity';
import { EntityRegistrationOptions } from '../models/registration-options';
import { entityOptionsRegistry, loadedEntityRegistry } from '../registry';
import { getEntity } from './get-entity';

export async function loadEntity<T, K>(
  entityName: string,
): Promise<EntityConstructor<T, K>> {
  const entity = await getEntity<T, K>(entityName);

  if (entity) {
    return entity;
  }

  const options =
    entityOptionsRegistry.get<
      EntityRegistrationOptions<EntityConstructor<T, K>>
    >(entityName);

  if (!options) {
    throw `Mexo entity "${entityName}" has not been registered. Check the spelling or register an app.`;
  }

  if (!options.load) {
    throw `Mexo entity "${entityName}" is registered but it has no "load" function. Please, provide it`;
  }

  const result = await options.load();

  if (result) {
    loadedEntityRegistry.set(entityName, result);
  }

  return result;
}
