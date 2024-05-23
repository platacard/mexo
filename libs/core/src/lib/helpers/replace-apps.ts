import { Application } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { constructAndBootstrapApp } from './construct-and-bootstrap-app';

export async function replaceApps<
  T extends DefaultPropsType = DefaultPropsType,
>(from: Application, to: string, props?: T): Promise<Application<T>> {
  from.destroy();

  return constructAndBootstrapApp(to, from.container, props);
}
