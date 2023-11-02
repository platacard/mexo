/**
 * @type {import('@nx/webpack/src/utils/module-federation').ModuleFederationConfig}
 */
const config = {
  name: 'remote-react',
  exposes: {
    './remote-react-app': 'apps/remote-react/src/app/remote-react-app',
  },
};

module.exports = config;
