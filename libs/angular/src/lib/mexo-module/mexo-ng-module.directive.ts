import {
  catchError,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import {
  ComponentRef,
  Directive,
  ErrorHandler,
  Input,
  NgModuleRef,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { loadEntity } from '@mexo/core';

import { complete } from '../operators/complete';
import { EntryPoint, MexoNgModule } from '../types/ng-module';
import { MexoNgCompilerService } from './mexo-ng-compiler.service';

@Directive({
  selector: '[mexoNgModule]',
  providers: [MexoNgCompilerService],
})
export class MexoNgModuleDirective implements OnDestroy {
  private name$ = new Subject<string | null>();
  private destroy$ = new Subject<void>();

  @Output()
  module: Observable<NgModuleRef<unknown> | null>;

  @Input('mexoNgModule')
  set name(moduleName: string | null) {
    this.ngZone.runOutsideAngular(() => this.name$.next(moduleName));
  }

  constructor(
    private ngZone: NgZone,
    private mzNgCompiler: MexoNgCompilerService,
    private errorHandler: ErrorHandler,
  ) {
    this.module = this.name$.pipe(
      tap(() => NgZone.assertNotInAngularZone()),
      switchMap((name) =>
        name
          ? this.loadModuleAndBootstrap(name).pipe(
              catchError((error) => {
                this.errorHandler.handleError(error);
                return of(null);
              }),
            )
          : of(null),
      ),
      map((componentRef) => componentRef?.injector.get(NgModuleRef) ?? null),
      shareReplay(1),
      takeUntil(this.destroy$),
    );

    this.module.subscribe();
  }

  private loadModuleAndBootstrap(
    name: string,
  ): Observable<ComponentRef<EntryPoint>> {
    return loadEntity<unknown, MexoNgModule>(name).pipe(
      switchMap((Module) =>
        this.mzNgCompiler.createEntryPointFromModule(Module),
      ),
      complete((componentRef) => this.destroyComponentAndModule(componentRef)),
    );
  }

  private destroyComponentAndModule<T extends EntryPoint = EntryPoint>(
    componentRef: ComponentRef<T>,
  ) {
    componentRef.destroy();
    componentRef.injector.get(NgModuleRef).destroy();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
