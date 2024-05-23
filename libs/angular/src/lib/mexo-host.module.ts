import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { AppRegistrationOptions } from '@mexo/core';

import { MexoAppModule } from './mexo-app/mexo-app.module';
import { RegistryService } from './services/registry.service';
import { MEXO_APPS } from './tokens/mexo-apps';

export interface MexoHostModuleOptions {
  apps?: AppRegistrationOptions[];
}

@NgModule({
  exports: [MexoAppModule],
})
export class MexoHostModule {
  constructor(
    @Inject(MEXO_APPS) allApps: AppRegistrationOptions[][],
    registry: RegistryService,
  ) {
    allApps.forEach((apps) => registry.registerMany(apps));
  }

  static register({
    apps,
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
      ],
    };
  }
}
