import { NgModule, Type } from '@angular/core';

import { MexoNgModule } from '@mexo/angular';

import { RemoteModuleComponent } from './remote-module.component';

@NgModule({
  declarations: [RemoteModuleComponent],
  exports: [RemoteModuleComponent],
})
export class RemoteModule implements MexoNgModule<RemoteModuleComponent> {
  getEntryPoint(): Type<RemoteModuleComponent> {
    return RemoteModuleComponent;
  }
}
