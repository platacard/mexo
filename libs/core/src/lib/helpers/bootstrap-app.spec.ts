import {registerApp} from './register-app';
import {Application} from '../models/application';
import {AppRegistrationOptions} from '../models/app-registration-options';
import {loadAppConstructor} from './load-app-constructor';
import {bootstrapApp} from './bootstrap-app';
import {appOptionsRegistry, loadedAppRegistry} from '../registry';
import {ApplicationMock} from '../../__mocks_/application.mock';

function clearRegistry() {
  loadedAppRegistry.clear();
  appOptionsRegistry.clear();
}

describe('bootstrapApp', () => {
  let options: AppRegistrationOptions;
  let loadFn: jest.SpiedFunction<AppRegistrationOptions['load']>;

  beforeEach(async () => {
    options = {
      name: 'appMock',
      load() {
        return ApplicationMock;
      },
    };

    loadFn = jest.spyOn(options, 'load');

    registerApp(options);
  });

  describe('An app is already loaded', () => {
    beforeEach(async () => {
      await loadAppConstructor('appMock').toPromise();
    });

    it("shouldn't load an app again", async () => {
      expect.assertions(1);

      await bootstrapApp('appMock', '#container').toPromise();

      expect(loadFn).toHaveBeenCalledTimes(1);
    });

    it('should bootstrap an app', async () => {
      expect.assertions(1);

      const app = await bootstrapApp('appMock', '#container').toPromise();

      expect(app).toBeInstanceOf(ApplicationMock);
    });
  });

  describe('An app is NOT loaded', () => {
    it('should load an app', async () => {
      expect.assertions(1);

      await bootstrapApp('appMock', '#container').toPromise();

      expect(loadFn).toHaveBeenCalledTimes(1);
    });

    it('should bootstrap an app', async () => {
      expect.assertions(1);

      const app = await bootstrapApp('appMock', '#container').toPromise();

      expect(app).toBeInstanceOf(Application);
    });
  });

  afterEach(() => {
    clearRegistry();
  });
});
