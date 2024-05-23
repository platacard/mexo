import { Observable } from 'rxjs';

import { ApplicationConstructor } from './application';
import { DefaultPropsType } from './default-props-type';

export interface EntityRegistrationOptions<T> {
  name: string;
  load: () => PromiseLike<T>;
}

export interface AppRegistrationOptions<
  T extends DefaultPropsType = DefaultPropsType,
> extends EntityRegistrationOptions<ApplicationConstructor<T>> {
  props?: T;
}
