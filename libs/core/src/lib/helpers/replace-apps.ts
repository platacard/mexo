import {defer, Observable} from 'rxjs';
import {Application} from '../models/application';
import {constructAndBootstrapApp} from './construct-and-bootstrap-app';
import {DefaultPropsType} from '../models/default-props-type';

export function replaceApps<T extends DefaultPropsType = DefaultPropsType>(
  from: Application,
  to: string,
  props?: T,
): Observable<Application<T>> {
  return defer(() => {
    from.destroy();

    return constructAndBootstrapApp(to, from.container, props);
  });
}
