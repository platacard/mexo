import {Observable} from 'rxjs';
import {ApplicationConstructor} from './application';
import {DefaultPropsType} from './default-props-type';

export interface EntityRegistrationOptions<T> {
  name: string;
  load: () => Observable<T> | PromiseLike<T> | T;
}

export interface AppRegistrationOptions<T extends DefaultPropsType = DefaultPropsType>
  extends EntityRegistrationOptions<ApplicationConstructor<T>> {
  props?: T;
}
