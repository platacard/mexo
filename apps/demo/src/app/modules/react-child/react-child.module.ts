import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {tuiGenerateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {ReactChildComponent} from './react-child.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(tuiGenerateRoutes(ReactChildComponent)),
  ],
  declarations: [ReactChildComponent],
  exports: [ReactChildComponent],
})
export class ReactChildModule {}
