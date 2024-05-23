import { NgModule } from '@angular/core';

import { MexoAppDirective } from './mexo-app.directive';

@NgModule({
  declarations: [MexoAppDirective],
  exports: [MexoAppDirective],
})
export class MexoAppModule {}
