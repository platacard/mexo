import {
  Application,
  ApplicationConstructor,
  MicrozordLifecycleEvent,
  MicrozordMessageEvent,
} from '@microzord/core';
import {Root, createRoot} from 'react-dom/client';
import {ReactElement} from 'react';

export function createApp<P>(
  name: string,
  element: ReactElement<P>,
): ApplicationConstructor {
  class ReactApplication extends Application {
    private root: Root | undefined;
    async bootstrap(container: string | Element, props?: Record<string, unknown>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      this.root = createRoot(container);
      await super.bootstrap(container, props);

      this.root.render(element);
      //https://github.com/reactwg/react-18/discussions/5#discussioncomment-796012
      requestIdleCallback(() => {
        this.emitHook(MicrozordLifecycleEvent.bootstrapped());
      });
    }

    destroy() {
      super.destroy();

      if (this.root) {
        this.root.unmount();
      }
      this.container = '';

      this.emitHook(MicrozordLifecycleEvent.destroyed());
    }

    async navigate(_url: string, _props: unknown | undefined): Promise<void> {
      return undefined;
    }

    async send(_msg: string | MicrozordMessageEvent): Promise<void> {
      return undefined;
    }
  }

  document.dispatchEvent(
    new CustomEvent('microzord:load', {
      detail: {name, appConstructor: ReactApplication},
    }),
  );

  return ReactApplication;
}
