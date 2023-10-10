import {Application, MicrozordLifecycleEvent} from '@microzord/core';
import {ApplicationMock} from '@microzord/core/testing';
import {createDirectiveFactory, SpectatorDirective} from '@ngneat/spectator';
import {asapScheduler} from 'rxjs';
import {first} from 'rxjs/operators';
import {MicrozordHostModule} from '../microzord-host.module';
import {MicrozordAppDirective} from './microzord-app.directive';

describe('MicrozordAppDirective', () => {
  let spectator: SpectatorDirective<MicrozordAppDirective, {name: string}>;
  const createDirective = createDirectiveFactory({
    directive: MicrozordAppDirective,
    imports: [
      MicrozordHostModule.register({
        apps: [
          {
            name: 'name',
            load: () => ApplicationMock,
          },
        ],
      }),
    ],
  });

  beforeEach(async () => {
    spectator = createDirective(`<div [microzordApp]='name'></div>`, {
      hostProps: {
        name: 'name',
      },
    });
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should emit an application', async () => {
    expect.assertions(1);

    expect(
      await spectator.directive.application.pipe(first()).toPromise(),
    ).toBeInstanceOf(Application);
  });

  it('should emit an destroy event on app name change', async () => {
    expect.assertions(1);

    const event$ = spectator.directive.hook.pipe(first()).toPromise();
    spectator.setHostInput('name', '');

    const event = MicrozordLifecycleEvent.destroyed();
    event.target = expect.any(Application);

    const result = await event$;

    expect(result).toEqual(event);
  });

  it('should complete the subject when the directive is destroyed', async () => {
    expect.assertions(1);

    const app$ = spectator.directive.application.toPromise();

    asapScheduler.schedule(() => {
      spectator.directive.ngOnDestroy();
    });

    expect(await app$).toEqual(expect.any(Application));
  });
});
