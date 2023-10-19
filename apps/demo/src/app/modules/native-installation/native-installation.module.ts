import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {tuiGenerateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {NativeInstallationComponent} from './native-installation.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(tuiGenerateRoutes(NativeInstallationComponent)),
  ],
  declarations: [NativeInstallationComponent],
  exports: [NativeInstallationComponent],
})
export class NativeInstallationModule {}
