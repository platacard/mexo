import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Application, MicrozordLifecycleEvent} from '@microzord/core';
import {BehaviorSubject} from 'rxjs';
import {TuiAlertService} from '@taiga-ui/core';

@Component({
  selector: 'host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  moduleName$$ = new BehaviorSubject<string | null>('remote-module');
  apps$ = new BehaviorSubject<string[]>(['remote-app', 'remote-react']);

  constructor(private cdr: ChangeDetectorRef, private alertService: TuiAlertService) {}

  toggleApps(): void {
    this.apps$.next(this.apps$.value.length ? [] : ['remote-app', 'remote-react']);
  }

  appLoaded(event: Application<Record<string, unknown>> | null): void {
    console.log(`${event?.name}: loaded`);
  }

  appHook(event: MicrozordLifecycleEvent) {
    console.log(`${event.target?.name}: ${event.type}`);
    this.alertService
      .open(event.type, {
        hasIcon: false,
        label: event.target?.name,
        status: 'info',
      })
      .subscribe();
    this.cdr.detectChanges();
  }
}
