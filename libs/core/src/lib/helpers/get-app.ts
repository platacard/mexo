import { Observable } from 'rxjs';

import { ApplicationConstructor } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { getEntity } from './get-entity';

export function getApp<T extends DefaultPropsType = DefaultPropsType>(
  appName: string,
): Observable<ApplicationConstructor<T> | null> {
  return getEntity(appName);
}
