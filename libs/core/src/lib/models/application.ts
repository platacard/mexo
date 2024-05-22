import { DefaultPropsType } from './default-props-type';
import { EntityConstructor } from './entity';
import { MexoEvent, MexoMessageEvent, MexoNavigationEvent } from './events';
import { MexoLifecycleEvent } from './lifecycle';

export type Listener<T extends MexoEvent> = (event: T) => void;

export abstract class Application<
  T extends DefaultPropsType = DefaultPropsType,
> {
  isBootstrapped = false;
  isDestroyed = true;
  container: Element | string = '';

  protected readonly hook = new Set<Listener<MexoLifecycleEvent>>();
  protected readonly message = new Set<Listener<MexoMessageEvent>>();
  protected readonly navigationEvent = new Set<Listener<MexoNavigationEvent>>();

  constructor(
    public readonly name: string,
    public props?: T,
  ) {}

  onMessage(fn: Listener<MexoMessageEvent>): () => void {
    this.message.add(fn);

    return () => {
      this.message.delete(fn);
    };
  }

  emitMessage(event: MexoMessageEvent) {
    this.callListeners(this.message, event);
  }

  onRouteChange(fn: Listener<MexoNavigationEvent>): () => void {
    this.navigationEvent.add(fn);

    return () => {
      this.navigationEvent.delete(fn);
    };
  }

  emitRouteChange(event: MexoNavigationEvent) {
    this.callListeners(this.navigationEvent, event);
  }

  onHook(fn: Listener<MexoLifecycleEvent>): () => void {
    this.hook.add(fn);

    return () => {
      this.hook.delete(fn);
    };
  }

  emitHook(event: MexoLifecycleEvent) {
    this.callListeners(this.hook, event);
  }

  destroy() {
    this.emitHook(MexoLifecycleEvent.destroyed());

    this.hook.clear(); // todo: в этот поток перед комплитом нужен евент дестроя
    this.message.clear();
    this.navigationEvent.clear();

    this.isBootstrapped = false;
    this.isDestroyed = true;
  }

  async bootstrap(container: string | Element, _props?: T): Promise<void> {
    this.isBootstrapped = true;
    this.container = container;
  }

  abstract send(msg: string | MexoMessageEvent): Promise<void>;

  // todo: шо за пропс? Надо придумать
  abstract navigate(url: string, props?: unknown): Promise<void>;

  protected callListeners<K extends MexoEvent>(
    listeners: Set<Listener<K>>,
    event: K,
  ) {
    event.target = this;

    [...listeners].forEach((fn) => {
      fn(event);
    });
  }
}

export type ApplicationConstructor<
  T extends Record<string, unknown> = Record<string, unknown>,
> = EntityConstructor<T, Application<T>>;
