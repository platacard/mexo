import { Application } from '../../src/lib/models/application';
import { MexoMessageEvent } from '../../src/lib/models/events';
import { MexoLifecycleEvent } from '../../src/lib/models/lifecycle';

export class ApplicationMock extends Application<any> {
  navigate(_url: string, _props?: unknown): Promise<void> {
    return Promise.resolve(undefined);
  }

  send(_msg: string | MexoMessageEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}
