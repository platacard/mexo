import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { first } from 'rxjs/operators';

import { asapScheduler } from 'rxjs';

import { Application, MexoLifecycleEvent } from '@mexo/core';
import { ApplicationMock } from '@mexo/core/testing';

import { MexoHostModule } from '../mexo-host.module';
import { MexoAppDirective } from './mexo-app.directive';

describe('MexoAppDirective', () => {
  let spectator: SpectatorDirective<MexoAppDirective, { name: string }>;
  const createDirective = createDirectiveFactory({
    directive: MexoAppDirective,
    imports: [
      MexoHostModule.register({
        apps: [
          {
            name: 'name',
            load: async () => ApplicationMock,
          },
        ],
      }),
    ],
  });

  beforeEach(async () => {
    spectator = createDirective(`<div [mexoApp]='name'></div>`, {
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

    const event = MexoLifecycleEvent.destroyed();
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
