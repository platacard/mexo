import { ApplicationMock } from '@mexo/core/testing';

import { getApp } from './get-app';
import { loadApp } from './load-app';
import { registerApp } from './register-app';

describe('getApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      async load() {
        return ApplicationMock;
      },
    });

    await loadApp('appMock');
  });

  it('should return an app constructor', async () => {
    expect.assertions(1);

    const appConstructor = await getApp('appMock');

    expect(appConstructor).toStrictEqual(ApplicationMock);
  });
});
