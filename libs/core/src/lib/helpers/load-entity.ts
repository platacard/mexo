import { EntityConstructor } from '../models/entity';
import { EntityRegistrationOptions } from '../models/registration-options';
import { entityOptionsRegistry, loadedEntityRegistry } from '../registry';
import { getEntity } from './get-entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const entities = new Map<string, Promise<EntityConstructor<any, any>>>();

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

  const result = await loadEntityInternal(options);

  if (result) {
    loadedEntityRegistry.set(entityName, result);
  }

  return result;
}

function loadEntityInternal<T, K>({
  name,
  load,
}: EntityRegistrationOptions<EntityConstructor<T, K>>): Promise<
  EntityConstructor<T, K>
> {
  if (entities.get(name)) {
    return entities.get(name) as Promise<EntityConstructor<T, K>>;
  }

  const entity = load() as Promise<EntityConstructor<T, K>>;
  entities.set(name, entity);

  return entity;
}
