import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'microzord-remote-module',
  templateUrl: './remote-module.component.html',
  styleUrls: ['./remote-module.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteModuleComponent {
  counter = 1;

  click(): void {
    this.counter++;
  }
}
