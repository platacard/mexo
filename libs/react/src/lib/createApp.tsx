import { ReactElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

import {
  Application,
  ApplicationConstructor,
  MexoLifecycleEvent,
  MexoMessageEvent,
} from '@mexo/core';

export function createApp<P>(
  name: string,
  element: ReactElement<P>,
): ApplicationConstructor {
  class ReactApplication extends Application {
    private root: Root | undefined;
    async bootstrap(
      container: string | Element,
      props?: Record<string, unknown>,
    ) {
      container =
        typeof container === 'string'
          ? document.querySelector(container)!
          : container;

      this.root = createRoot(container);
      await super.bootstrap(container, props);

      this.root.render(element);
      //https://github.com/reactwg/react-18/discussions/5#discussioncomment-796012
      requestIdleCallback(() => {
        this.emitHook(MexoLifecycleEvent.bootstrapped());
      });
    }

    destroy() {
      super.destroy();

      if (this.root) {
        this.root.unmount();
      }
      this.container = '';

      this.emitHook(MexoLifecycleEvent.destroyed());
    }

    async navigate(_url: string, _props: unknown | undefined): Promise<void> {
      return undefined;
    }

    async send(_msg: string | MexoMessageEvent): Promise<void> {
      return undefined;
    }
  }

  document.dispatchEvent(
    new CustomEvent('mexo:load', {
      detail: { name, appConstructor: ReactApplication },
    }),
  );

  return ReactApplication;
}
