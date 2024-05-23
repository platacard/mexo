import { NgModule, Type } from '@angular/core';

import { RemoteModuleComponent } from './remote-module.component';

@NgModule({
  declarations: [RemoteModuleComponent],
  exports: [RemoteModuleComponent],
})
export class RemoteModule {
  getEntryPoint(): Type<RemoteModuleComponent> {
    return RemoteModuleComponent;
  }
}
