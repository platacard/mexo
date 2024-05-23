import { Application } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { bootstrapApp } from './bootstrap-app';
import { constructApp } from './construct-app';

export async function constructAndBootstrapApp<
  T extends DefaultPropsType = DefaultPropsType,
>(
  appName: string,
  selector: string | Element,
  props?: T,
): Promise<Application<T>> {
  const app = await constructApp<T>(appName);

  return bootstrapApp(app, selector, props);
}
