import { Application, ApplicationConstructor } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { loadedEntityRegistry } from '../registry';
import { getApp } from './get-app';
import { loadEntity } from './load-entity';

export async function loadApp<T extends DefaultPropsType = DefaultPropsType>(
  appName: string,
): Promise<ApplicationConstructor<T>> {
  const appConstructor = await getApp<T>(appName);

  if (appConstructor) {
    loadedEntityRegistry.set(appName, appConstructor);

    return appConstructor;
  }

  return loadEntity<T, Application<T>>(appName);
}
