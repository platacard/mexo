'use client';

import { loadRemoteModule, setRemoteDefinitions } from '@nx/angular/mf';

import { MexoHostProvider } from '@mexo/react/host';

setRemoteDefinitions({
  'ng-remote': 'http://localhost:4202/remoteEntry.mjs',
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MexoHostProvider
      apps={[
        {
          name: 'ng-remote',
          load: () =>
            loadRemoteModule('ng-remote', './App').then(
              (m) => m.remoteBootstrap,
            ),
        },
      ]}
    >
      {children}
    </MexoHostProvider>
  );
}
