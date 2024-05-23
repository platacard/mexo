import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';

import { createApp } from '@mexo/angular/remote';

import { appConfig } from './app/app.config';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';

export const remoteBootstrap = createApp(
  () => bootstrapApplication(RemoteEntryComponent, appConfig),
  'app-ng-remote-entry',
);
