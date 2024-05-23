import { ApplicationRef, CompilerOptions, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';

import {
  Application,
  ApplicationConstructor,
  MexoLifecycleEvent,
  MexoMessageEvent,
} from '@mexo/core';

export const APP_NAME = new InjectionToken<string>('App name');
export const ROOT_SELECTOR = new InjectionToken<string>('Root selector');

// todo: очень грубая имплементация
export function createApp<
  TModule,
  Props extends Record<string, unknown> = Record<string, unknown>,
>(
  bootstrapFn: (props?: CompilerOptions) => Promise<ApplicationRef>,
  rootSelector: string,
): ApplicationConstructor {
  // todo: не хватает имплементации хуков, сообщений и навигации
  class AngularApp<
    T extends Record<string, unknown> = Props,
  > extends Application<T> {
    private router: Router | null = null;
    private ngModule: ApplicationRef | null = null;

    override destroy() {
      super.destroy();

      if (this.ngModule) {
        this.ngModule.destroy();
        this.ngModule = null;
      }

      this.emitHook(MexoLifecycleEvent.destroyed());
    }

    override async bootstrap(
      container: string | Element,
      props?: T,
    ): Promise<void> {
      const containerElement =
        typeof container === 'string'
          ? document.querySelector(container)
          : container;

      if (!containerElement) {
        throw new Error(`No container found for ${container}`);
      }

      const rootElement = document.createElement(rootSelector);

      containerElement.appendChild(rootElement);

      this.ngModule = await bootstrapFn(props);

      this.router = this.ngModule.injector.get(Router, null, {
        optional: true,
      });

      await super.bootstrap(container, props);

      this.emitHook(MexoLifecycleEvent.bootstrapped());
    }

    async navigate(url: string, _props: unknown | undefined): Promise<void> {
      if (this.router) {
        await this.router.navigateByUrl(url);
      }
    }

    async send(_msg: string | MexoMessageEvent): Promise<void> {
      //
    }
  }

  return AngularApp;
}
