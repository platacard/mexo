import {ModuleFederationConfig} from '@nx/webpack/src/utils/module-federation';

const config: ModuleFederationConfig = {
  name: 'host',
  remotes: ['remote', ['remote-react', 'http://localhost:4203/remoteEntry.js']],
};

module.exports = config;
