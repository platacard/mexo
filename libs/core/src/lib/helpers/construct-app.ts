import { Application } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { AppRegistrationOptions } from '../models/registration-options';
import { entityOptionsRegistry } from '../registry';
import { loadApp } from './load-app';

export async function constructApp<
  T extends DefaultPropsType = DefaultPropsType,
>(appName: string): Promise<Application<T>> {
  const AppConstructor = await loadApp<T>(appName);

  return new AppConstructor(
    appName,
    entityOptionsRegistry.get<AppRegistrationOptions<T>>(appName)?.props,
  );
}
