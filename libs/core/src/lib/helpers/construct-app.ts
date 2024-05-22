import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Application } from '../models/application';
import { AppRegistrationOptions } from '../models/registration-options';
import { entityOptionsRegistry } from '../registry';
import { loadApp } from './load-app';

export function constructApp<T extends Record<string, unknown>>(
  appName: string,
): Observable<Application<T>> {
  return loadApp<T>(appName).pipe(
    map(
      (AppConstructor) =>
        new AppConstructor(
          appName,
          entityOptionsRegistry.get<AppRegistrationOptions<T>>(appName)?.props,
        ),
    ),
  );
}
