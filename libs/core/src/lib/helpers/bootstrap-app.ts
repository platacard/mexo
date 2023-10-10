import {defer, Observable, of} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';
import {Application} from '../models/application';

export function bootstrapApp<T extends Record<string, unknown>>(
  app: Application<T>,
  selector: string | Element,
  props?: T,
): Observable<Application<T>> {
  return of(app).pipe(
    switchMap(app => defer(() => app.bootstrap(selector, props)).pipe(mapTo(app))),
  );
}
