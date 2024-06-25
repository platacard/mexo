import { ApplicationMock } from '@mexo/core/testing';

import { EntityRegistrationOptions } from '../models/registration-options';
import { loadEntity } from './load-entity';
import { registerEntity } from './register-entity';

describe('loadEntity', () => {
  beforeEach(async () => {
    registerEntity({
      name: 'appMock1',
      async load() {
        return ApplicationMock;
      },
    });

    registerEntity({
      name: 'appMock2',
      load: undefined,
    } as unknown as EntityRegistrationOptions<unknown>);

    registerEntity({
      name: 'appMock3',
      async load() {
        return ApplicationMock;
      },
    });

    registerEntity({
      name: 'appMock4',
      load() {
        return Promise.resolve(ApplicationMock);
      },
    });
  });

  it('should load an entity constructor', async () => {
    expect.assertions(3);

    await loadEntity('appMock1');

    expect(await loadEntity('appMock1')).toStrictEqual(ApplicationMock);
    expect(await loadEntity('appMock3')).toStrictEqual(ApplicationMock);
    expect(await loadEntity('appMock4')).toStrictEqual(ApplicationMock);
  });

  it('should throw an error when trying to load an unregistered entity', async () => {
    expect.assertions(1);

    await expect(loadEntity('unregistered')).rejects.toEqual(
      `Mexo entity "unregistered" has not been registered. Check the spelling or register an app.`,
    );
  });

  it('should throw an error when options does not have the load function', async () => {
    expect.assertions(1);

    await expect(loadEntity('appMock2')).rejects.toEqual(
      `Mexo entity "appMock2" is registered but it has no "load" function. Please, provide it`,
    );
  });

  it('should run the load function only once', async () => {
    expect.assertions(1);

    const load = jest.fn(() => Promise.resolve(ApplicationMock));

    registerEntity({
      name: 'appMock5',
      load,
    });

    await loadEntity('appMock5');
    await loadEntity('appMock5');

    expect(load).toHaveBeenCalledTimes(1);
  });
});
