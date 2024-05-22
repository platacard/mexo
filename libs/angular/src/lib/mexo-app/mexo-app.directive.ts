import {
  catchError,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import {
  Directive,
  ElementRef,
  ErrorHandler,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { NEVER, Observable, of, Subject } from 'rxjs';

import {
  Application,
  bootstrapApp,
  constructApp,
  MexoLifecycleEvent,
} from '@mexo/core';

import { complete } from '../operators/complete';

@Directive({
  selector: '[mexoApp]:not(ng-container)',
})
export class MexoAppDirective implements OnDestroy {
  @Output()
  hook: Observable<MexoLifecycleEvent>;

  @Output()
  application: Observable<Application | null>;

  @Input('mexoApp')
  set name(appName: string) {
    this.ngZone.runOutsideAngular(() => this.name$.next(appName));
  }

  private destroy$ = new Subject<void>();
  private name$ = new Subject<string>();

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private errorHandler: ErrorHandler,
  ) {
    const app$ = this.name$.pipe(
      tap(() => NgZone.assertNotInAngularZone()),
      switchMap((name) => (name ? constructApp(name) : of(null))),
      catchError((error) => this.handleError(error)),
      takeUntil(this.destroy$),
      shareReplay(1),
    );

    this.application = app$.pipe(
      complete((app) => {
        app?.destroy();
      }),
      switchMap((name) =>
        name
          ? bootstrapApp(name, this.elementRef.nativeElement).pipe(
              catchError((error) => this.handleError(error)),
            )
          : of(null),
      ),
      takeUntil(this.destroy$),
      shareReplay(1),
    );

    this.hook = app$.pipe(
      switchMap((app) =>
        app
          ? new Observable<MexoLifecycleEvent>((subscriber) =>
              app.onHook((event) => subscriber.next(event)),
            )
          : NEVER,
      ),
    );

    this.application.subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleError(error: unknown): Observable<null> {
    this.errorHandler.handleError(error);
    return of(null);
  }
}
