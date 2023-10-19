import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {tuiGenerateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {ReactInstallationComponent} from './react-installation.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(tuiGenerateRoutes(ReactInstallationComponent)),
  ],
  declarations: [ReactInstallationComponent],
  exports: [ReactInstallationComponent],
})
export class ReactInstallationModule {}
