import {ApplicationMock} from '@microzord/core/testing';
import {registerApp} from './register-app';
import {constructAndBootstrapApp} from './construct-and-bootstrap-app';
import {replaceApps} from './replace-apps';

describe('replaceApps', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock1',
      load() {
        return ApplicationMock;
      },
    });

    registerApp({
      name: 'appMock2',
      load() {
        return ApplicationMock;
      },
    });
  });

  it('should destroy the appMock1 app', async () => {
    expect.assertions(1);

    const app1 = await constructAndBootstrapApp('appMock1', '#').toPromise();
    if (!app1) {
      throw new Error('No app found');
    }

    await replaceApps(app1, 'appMock2').toPromise();

    expect(app1?.isDestroyed).toStrictEqual(true);
  });

  it('should bootstrap the appMock2 app', async () => {
    expect.assertions(1);

    const app1 = await constructAndBootstrapApp('appMock1', '#').toPromise();
    if (!app1) {
      throw new Error('No app found');
    }
    const app2 = await replaceApps(app1, 'appMock2').toPromise();

    expect(app2?.isBootstrapped).toStrictEqual(true);
  });
});
