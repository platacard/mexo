import { MexoEvent } from './events';

export enum LifecycleEventTypes {
  bootstrapped = 'bootstrapped',
  destroyed = 'destroyed',
}

export class MexoLifecycleEvent extends MexoEvent {
  static isLifecycleEvent(event: MexoEvent): event is MexoLifecycleEvent {
    return (
      event &&
      event.constructor &&
      event.constructor.name === MexoLifecycleEvent.name
    );
  }

  static bootstrapped(): MexoLifecycleEvent {
    return new MexoLifecycleEvent(LifecycleEventTypes.bootstrapped);
  }

  static isBootstrappedEvent(event: MexoLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.bootstrapped;
  }

  static destroyed(): MexoLifecycleEvent {
    return new MexoLifecycleEvent(LifecycleEventTypes.destroyed);
  }

  static isDestroyedEvent(event: MexoLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.destroyed;
  }
}
