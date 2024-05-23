import { MexoApp } from '@mexo/react/host';

import { Providers } from './providers';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <Providers>
      <div>
        <h1>Welcome to react-host!</h1>
      </div>

      <div>
        <MexoApp name={'ng-remote'} />
      </div>
    </Providers>
  );
}
