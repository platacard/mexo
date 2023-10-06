import {NgModule, Type} from '@angular/core';
import {MicrozordNgModule} from '@microzord/angular';
import {RemoteModuleComponent} from './remote-module.component';

@NgModule({
  declarations: [RemoteModuleComponent],
  exports: [RemoteModuleComponent],
})
export class RemoteModule implements MicrozordNgModule<RemoteModuleComponent> {
  getEntryPoint(): Type<RemoteModuleComponent> {
    return RemoteModuleComponent;
  }
}
