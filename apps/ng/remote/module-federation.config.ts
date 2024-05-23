import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'ng-remote',
  exposes: {
    './Routes': 'apps/ng/remote/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
