import { switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Application } from '../models/application';
import { bootstrapApp } from './bootstrap-app';
import { constructApp } from './construct-app';

export function constructAndBootstrapApp<
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  appName: string,
  selector: string | Element,
  props?: T,
): Observable<Application<T>> {
  return constructApp<T>(appName).pipe(
    switchMap((app) => bootstrapApp(app, selector, props)),
  );
}
