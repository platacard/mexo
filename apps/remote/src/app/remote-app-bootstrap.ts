import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { createApp } from '@mexo/angular/child';

import { AppModule } from './app.module';

export const remoteAppBootstrap = createApp(
  (opts) => platformBrowserDynamic().bootstrapModule(AppModule, opts),
  'remote-app',
);
