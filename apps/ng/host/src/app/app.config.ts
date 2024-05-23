import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { loadRemoteModule, setRemoteDefinitions } from '@nx/angular/mf';

import { MexoHostModule } from '@mexo/angular/host';

import { appRoutes } from './app.routes';

setRemoteDefinitions({
  'ng-remote': 'http://localhost:4202/remoteEntry.mjs',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      MexoHostModule.register({
        apps: [
          {
            name: 'ng-remote',
            load: () =>
              loadRemoteModule('ng-remote', './App').then(
                (m) => m.remoteBootstrap,
              ),
          },
        ],
      }),
    ),
  ],
};
