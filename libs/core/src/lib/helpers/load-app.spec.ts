import { ApplicationMock } from '@mexo/core/testing';

import { loadApp } from './load-app';
import { registerApp } from './register-app';

describe('loadApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock1',
      async load() {
        return ApplicationMock;
      },
    });
  });

  it('should load an app constructor', async () => {
    expect.assertions(1);

    await loadApp('appMock1');

    expect(await loadApp('appMock1')).toStrictEqual(ApplicationMock);
  });
});
