import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {MicrozordHostModule} from '@microzord/angular';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
    HttpClientModule,
    MicrozordHostModule.register({
      modules: [
        {
          name: 'remote-module',
          load: () => import('remote/remote-module').then(m => m.RemoteModule),
        },
      ],
      apps: [
        {
          name: 'remote-app',
          props: {foo: 'bar'},
          load: () =>
            import('remote/remote-app-bootstrap').then(m => m.remoteAppBootstrap),
        },
        {
          name: 'remote-react',
          load: () => import('remoteReact/remote-react-app').then(x => x.default),
        },
      ],
    }),
  ],
  providers: [{provide: 'some-token', useValue: 'true'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
