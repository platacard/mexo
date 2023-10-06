import {createApp} from '@microzord/angular/child';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

export const remoteAppBootstrap = createApp(
  opts => platformBrowserDynamic().bootstrapModule(AppModule, opts),
  'remote-app',
);
