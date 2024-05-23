import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-ng-remote-entry',
  template: `
    <h1>Ng Remote Entry</h1>
    <div>
      {{ count() }}

      <button (click)="count.set(count() + 1)">Increment</button>
    </div>
  `,
})
export class RemoteEntryComponent {
  count = signal(0);
}
