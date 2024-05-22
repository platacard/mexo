import { mockProvider } from '@ngneat/spectator';

import {
  Component,
  ComponentFactory,
  Injector,
  NgModule,
  NgModuleRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EntryPoint, MexoNgModule } from '../types/ng-module';
import { MexoNgCompilerService } from './mexo-ng-compiler.service';

@Component({ template: '' })
class MockComponent implements EntryPoint {}

@NgModule({})
class MockModule implements MexoNgModule {
  getEntryPoint(): Type<EntryPoint> {
    return MockComponent;
  }
}

describe('MexoNgCompilerService', () => {
  let service: MexoNgCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MexoNgCompilerService,
        mockProvider(ViewContainerRef, {
          clear: () => undefined,
          createComponent(
            componentFactory: ComponentFactory<unknown>,
            index: number,
            injector: Injector,
            projectableNodes: unknown[][],
            ngModule: NgModuleRef<unknown>,
          ) {
            return componentFactory.create(
              injector,
              projectableNodes,
              undefined,
              ngModule,
            );
          },
        }),
      ],
    });
    service = TestBed.inject(MexoNgCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create module', async () => {
    expect.assertions(1);

    const moduleRef = await service.createModule(MockModule);

    expect(moduleRef.instance).toBeInstanceOf(MockModule);
  });

  it('should create a module', async () => {
    expect.assertions(1);

    const moduleRef = await service.createModule(MockModule);

    expect(moduleRef.instance).toBeInstanceOf(MockModule);
  });

  it('should create an entry point', async () => {
    expect.assertions(1);

    const componentRef = await service.createEntryPoint(
      await service.createModule(MockModule),
    );

    expect(componentRef.instance).toBeInstanceOf(MockComponent);
  });

  it('should create an entry point from module', async () => {
    expect.assertions(1);

    const componentRef = await service.createEntryPointFromModule(MockModule);

    expect(componentRef.instance).toBeInstanceOf(MockComponent);
  });
});
