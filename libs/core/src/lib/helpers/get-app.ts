import {Observable} from 'rxjs';
import {ApplicationConstructor} from '../models/application';
import {getEntity} from './get-entity';
import {DefaultPropsType} from '../models/default-props-type';

export function getApp<T extends DefaultPropsType = DefaultPropsType>(
  appName: string,
): Observable<ApplicationConstructor<T> | null> {
  return getEntity(appName);
}
