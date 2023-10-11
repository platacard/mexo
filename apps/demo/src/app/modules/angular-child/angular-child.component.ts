import {ChangeDetectionStrategy, Component} from '@angular/core';

const CODE = `import {createApp} from '@microzord/angular/child';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

export const myRemoteApp = createApp(
  opts => platformBrowserDynamic().bootstrapModule(AppModule, opts),
  'my-remote-app',
);
`;

@Component({
  selector: 'angular-child',
  templateUrl: 'angular-child.template.html',
  styleUrls: ['./angular-child.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularChildComponent {
  readonly code = CODE;
}
