import { ApplicationMock } from '@mexo/core/testing';

import { getApp } from './get-app';
import { loadApp } from './load-app';
import { registerApp } from './register-app';

describe('getApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      load() {
        return ApplicationMock;
      },
    });

    await loadApp('appMock').toPromise();
  });

  it('should return an app constructor', async () => {
    expect.assertions(1);

    const appConstructor = await getApp('appMock').toPromise();

    expect(appConstructor).toStrictEqual(ApplicationMock);
  });
});
