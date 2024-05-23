import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { MexoHostModule } from '@mexo/angular/host';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      MexoHostModule.register({
        apps: [
          {
            name: 'ng-remote',
            load: () => import('ng-remote/App').then((m) => m.remoteBootstrap),
          },
        ],
      }),
    ),
  ],
};
