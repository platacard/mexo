import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { MexoHostModule } from '@mexo/angular';
import { Application, MexoLifecycleEvent } from '@mexo/core';

@Component({
  standalone: true,
  imports: [RouterModule, AsyncPipe, MexoHostModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  apps$ = new BehaviorSubject<string[]>(['ng-remote']);

  constructor(private cdr: ChangeDetectorRef) {}

  toggleApps(): void {
    this.apps$.next(this.apps$.value.length ? [] : ['ng-remote']);
  }

  appLoaded(event: Application<Record<string, unknown>> | null): void {
    console.log(`${event?.name}: loaded`);
  }

  appHook(event: MexoLifecycleEvent) {
    console.log(`${event.target?.name}: ${event.type}`);

    this.cdr.detectChanges();
  }
}
