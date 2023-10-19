import {ModuleFederationConfig} from '@nx/webpack/src/utils/module-federation';

const config: ModuleFederationConfig = {
  name: 'remote',
  exposes: {
    './remote-module': 'apps/remote/src/app/remote-module.ts',
    './remote-app-bootstrap': 'apps/remote/src/app/remote-app-bootstrap.ts',
  },
};

module.exports = config;
