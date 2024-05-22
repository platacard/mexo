import { switchMap, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { Application, ApplicationConstructor } from '../models/application';
import { DefaultPropsType } from '../models/default-props-type';
import { loadedEntityRegistry } from '../registry';
import { getApp } from './get-app';
import { loadEntity } from './load-entity';

export function loadApp<T extends DefaultPropsType = DefaultPropsType>(
  appName: string,
): Observable<ApplicationConstructor<T>> {
  return getApp<T>(appName).pipe(
    switchMap((appConstructor) =>
      appConstructor
        ? of(appConstructor).pipe(
            tap((applicationConstructor) =>
              loadedEntityRegistry.set(appName, applicationConstructor),
            ),
          )
        : loadEntity<T, Application<T>>(appName),
    ),
  );
}
