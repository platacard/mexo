import { Inject, ModuleWithProviders, NgModule, Type } from '@angular/core';

import { AppRegistrationOptions, EntityRegistrationOptions } from '@mexo/core';

import { MexoAppModule } from './mexo-app/mexo-app.module';
import { MexoNgModuleModule } from './mexo-module/mexo-ng-module.module';
import { RegistryService } from './services/registry.service';
import { MEXO_APPS, MEXO_NG_MODULES } from './tokens/mexo-apps';
import { NgModuleRegistrationOptions } from './types/ng-module';

export interface MexoHostModuleOptions {
  apps?: AppRegistrationOptions[];
  modules?: EntityRegistrationOptions<Type<unknown>>[];
}

@NgModule({
  exports: [MexoAppModule, MexoNgModuleModule],
})
export class MexoHostModule {
  constructor(
    @Inject(MEXO_APPS) allApps: AppRegistrationOptions[][],
    @Inject(MEXO_NG_MODULES) allModules: NgModuleRegistrationOptions[][],
    registry: RegistryService,
  ) {
    allApps.forEach((apps) => registry.registerMany(apps));
    allModules.forEach((modules) => registry.registerMany(modules));
  }

  static register({
    apps,
    modules,
  }: MexoHostModuleOptions): ModuleWithProviders<MexoHostModule> {
    return {
      ngModule: MexoHostModule,
      providers: [
        apps
          ? {
              provide: MEXO_APPS,
              useValue: apps,
              multi: true,
            }
          : [],
        modules
          ? {
              provide: MEXO_NG_MODULES,
              useValue: modules,
              multi: true,
            }
          : [],
      ],
    };
  }
}
