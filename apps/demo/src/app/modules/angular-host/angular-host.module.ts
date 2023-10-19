import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {tuiGenerateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {AngularHostComponent} from './angular-host.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(tuiGenerateRoutes(AngularHostComponent)),
  ],
  declarations: [AngularHostComponent],
  exports: [AngularHostComponent],
})
export class AngularHostModule {}
