import {defer, Observable} from 'rxjs';
import {Application} from '../models/application';
import {constructAndBootstrapApp} from './construct-and-bootstrap-app';

export function replaceApps<T extends Record<string, any> = Record<string, any>>(
  from: Application,
  to: string,
  props?: T,
): Observable<Application<T>> {
  return defer(() => {
    from.destroy();

    return constructAndBootstrapApp(to, from.container, props);
  });
}
