import { ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { createApp } from '@mexo/angular/remote';

import { AppModule } from './app.module';

export const remoteAppBootstrap = createApp(
  (opts) =>
    platformBrowserDynamic()
      .bootstrapModule(AppModule, opts)
      .then((module) => module.injector.get(ApplicationRef)),
  'remote-app',
);
