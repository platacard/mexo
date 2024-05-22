import { ApplicationMock } from '@mexo/core/testing';

import { entityOptionsRegistry } from '../registry';
import { registerApp } from './register-app';

describe('registerApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      load() {
        return ApplicationMock;
      },
    });
  });

  it('should register an app', async () => {
    expect.assertions(1);

    expect(entityOptionsRegistry.get('appMock')).toEqual({
      name: 'appMock',
      load: expect.any(Function),
    });
  });
});
