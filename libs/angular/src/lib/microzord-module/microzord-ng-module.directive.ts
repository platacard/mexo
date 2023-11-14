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
import {Observable, of, Subject} from 'rxjs';
import {catchError, map, shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';
import {loadEntity} from '@microzord/core';
import {EntryPoint, MicrozordNgModule} from '../types/ng-module';
import {complete} from '../operators/complete';
import {MicrozordNgCompilerService} from './microzord-ng-compiler.service';

@Directive({
  selector: '[microzordNgModule]',
  providers: [MicrozordNgCompilerService],
})
export class MicrozordNgModuleDirective implements OnDestroy {
  private name$ = new Subject<string | null>();
  private destroy$ = new Subject<void>();

  @Output()
  module: Observable<NgModuleRef<unknown> | null>;

  @Input('microzordNgModule')
  set name(moduleName: string | null) {
    this.ngZone.runOutsideAngular(() => this.name$.next(moduleName));
  }

  constructor(
    private ngZone: NgZone,
    private mzNgCompiler: MicrozordNgCompilerService,
    private errorHandler: ErrorHandler,
  ) {
    this.module = this.name$.pipe(
      tap(() => NgZone.assertNotInAngularZone()),
      switchMap(name =>
        name
          ? this.loadModuleAndBootstrap(name).pipe(
              catchError(error => {
                this.errorHandler.handleError(error);
                return of(null);
              }),
            )
          : of(null),
      ),
      map(componentRef => componentRef?.injector.get(NgModuleRef) ?? null),
      shareReplay(1),
      takeUntil(this.destroy$),
    );

    this.module.subscribe();
  }

  private loadModuleAndBootstrap(name: string): Observable<ComponentRef<EntryPoint>> {
    return loadEntity<unknown, MicrozordNgModule>(name).pipe(
      switchMap(Module => this.mzNgCompiler.createEntryPointFromModule(Module)),
      complete(componentRef => this.destroyComponentAndModule(componentRef)),
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
