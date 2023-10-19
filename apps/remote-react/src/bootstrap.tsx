import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/app';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element is not found');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
