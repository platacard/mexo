import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { first } from 'rxjs/operators';

import { Component, NgModule, NgModuleRef, Type } from '@angular/core';

import { MexoHostModule } from '../mexo-host.module';
import { EntryPoint, MexoNgModule } from '../types/ng-module';
import { MexoNgModuleDirective } from './mexo-ng-module.directive';

@Component({ template: '', selector: 'mock-component' })
class MockComponent implements EntryPoint {}

@NgModule({})
class MockModule implements MexoNgModule {
  getEntryPoint(): Type<EntryPoint> {
    return MockComponent;
  }
}

describe('MexoModuleDirective', () => {
  let spectator: SpectatorDirective<
    MexoNgModuleDirective,
    {
      name: string;
    }
  >;
  const createDirective = createDirectiveFactory({
    directive: MexoNgModuleDirective,
    imports: [
      MexoHostModule.register({
        modules: [
          {
            name: 'name',
            load: () => MockModule,
          },
        ],
      }),
    ],
  });

  beforeEach(async () => {
    spectator = createDirective(`<div [mexoNgModule]='name'></div>`, {
      hostProps: {
        name: 'name',
      },
    });
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should destroy the previously created app', async () => {
    expect.assertions(2);

    const moduleRef = await spectator.directive.module
      .pipe(first())
      .toPromise();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const destroySpy = jest.spyOn(moduleRef!, 'destroy');

    spectator.setHostInput('name', '');
    const newModuleRef = await spectator.directive.module
      .pipe(first())
      .toPromise();

    expect(newModuleRef).toBeNull();
    expect(destroySpy).toBeCalledTimes(1);
  });

  it('should complete the subject when the directive is destroyed', async () => {
    expect.assertions(1);

    const module = spectator.directive.module.toPromise();

    spectator.directive.ngOnDestroy();

    expect(await module).toEqual(expect.any(NgModuleRef));
  });
});
