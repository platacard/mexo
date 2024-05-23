import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'ng-remote',
  exposes: {
    './App': 'apps/ng/remote/src/bootstrap-remote.ts',
  },
};

export default config;
