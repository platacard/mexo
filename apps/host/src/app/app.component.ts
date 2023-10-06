import {Component} from '@angular/core';
import {Application, MicrozordLifecycleEvent} from '@microzord/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  moduleName$$ = new BehaviorSubject<string | null>('remote-module');
  apps$ = new BehaviorSubject<string[]>(['remote-app', 'remote-react']);

  appLoaded(event: Application<Record<string, unknown>> | null): void {
    console.log(event);
  }

  appHook(event: MicrozordLifecycleEvent) {
    console.log(event);
  }
}
