import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Application} from '../models/application';
import {entityOptionsRegistry} from '../registry';
import {loadApp} from './load-app';
import {AppRegistrationOptions} from '../models/registration-options';

export function constructApp<T extends Record<string, unknown>>(
  appName: string,
): Observable<Application<T>> {
  return loadApp<T>(appName).pipe(
    map(
      AppConstructor =>
        new AppConstructor(
          appName,
          entityOptionsRegistry.get<AppRegistrationOptions<T>>(appName)?.props,
        ),
    ),
  );
}
