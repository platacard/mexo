const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('../../package.json').dependencies;

module.exports = config => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,

  // then override your config.
  return {
    ...config,
    optimization: {
      splitChunks: false,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'remoteReact',
        filename: 'remoteEntry.js',
        exposes: {
          './remote-react-app': 'apps/remote-react/src/app/remote-react-app',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps['react'],
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
  };
};
