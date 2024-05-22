import { NgModule } from '@angular/core';

import { MexoNgModuleDirective } from './mexo-ng-module.directive';

@NgModule({
  declarations: [MexoNgModuleDirective],
  exports: [MexoNgModuleDirective],
})
export class MexoNgModuleModule {}
