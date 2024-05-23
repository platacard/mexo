import { ApplicationConstructor } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { getEntity } from './get-entity';

export async function getApp<T extends DefaultPropsType = DefaultPropsType>(
  appName: string,
): Promise<ApplicationConstructor<T> | null> {
  return getEntity(appName);
}
