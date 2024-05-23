import { ApplicationMock } from '@mexo/core/testing';

import { getEntity } from './get-entity';
import { loadEntity } from './load-entity';
import { registerEntity } from './register-entity';

describe('getEntity', () => {
  beforeEach(async () => {
    registerEntity({
      name: 'appMock',
      async load() {
        return ApplicationMock;
      },
    });

    await loadEntity('appMock');
  });

  it('should return an app constructor', async () => {
    expect.assertions(1);

    const appConstructor = await getEntity('appMock');

    expect(appConstructor).toStrictEqual(ApplicationMock);
  });
});
