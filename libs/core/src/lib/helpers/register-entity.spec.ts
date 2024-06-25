import { ApplicationMock } from '@mexo/core/testing';

import { entityOptionsRegistry } from '../registry';
import { preloadEntity } from './preload-entity';
import { registerEntity } from './register-entity';

jest.mock('./preload-entity', () => ({
  preloadEntity: jest.fn(),
}));

describe('registerEntity', () => {
  it('should register an app', async () => {
    expect.assertions(1);

    registerEntity({
      name: 'appMock',
      async load() {
        return ApplicationMock;
      },
    });

    expect(entityOptionsRegistry.get('appMock')).toEqual({
      name: 'appMock',
      load: expect.any(Function),
    });
  });

  it('should run preloadEntity when preload is true', async () => {
    expect.assertions(1);

    registerEntity({
      name: 'appMock',
      async load() {
        return ApplicationMock;
      },
      preload: true,
    });

    expect(preloadEntity).toHaveBeenCalledWith('appMock');
  });

  it('should not run preloadEntity when preload is false', async () => {
    expect.assertions(1);

    registerEntity({
      name: 'appMock',
      async load() {
        return ApplicationMock;
      },
      preload: false,
    });

    expect(preloadEntity).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
