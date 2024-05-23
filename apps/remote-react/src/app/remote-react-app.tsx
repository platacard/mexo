import { createApp } from '@mexo/react/remote';

import App from './app';

const remoteReactApp = createApp('remote-react-app', <App />);

export default remoteReactApp;
