import {ModuleFederationConfig} from '@nx/webpack/src/utils/module-federation';

const config: ModuleFederationConfig = {
  name: 'remote-react',
  exposes: {
    './remote-react-app': 'apps/remote-react/src/app/remote-react-app',
  },
};

module.exports = config;
