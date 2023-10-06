import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RemoteModule} from './remote-module/remote-module.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RemoteModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
