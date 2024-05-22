import { Application } from './application';

export class MexoEvent {
  target: Application | null = null;
  constructor(public readonly type: string) {}
}

// todo: подумать над сообщениями
export class MexoMessageEvent extends MexoEvent {
  static isMessageEvent(event: MexoEvent): event is MexoMessageEvent {
    return (
      event &&
      event.constructor &&
      event.constructor.name === MexoMessageEvent.name
    );
  }
}

// todo: подумать над ивентами роутинга
export class MexoNavigationEvent extends MexoEvent {
  static isNavigationEvent(event: MexoEvent): event is MexoNavigationEvent {
    return (
      event &&
      event.constructor &&
      event.constructor.name === MexoNavigationEvent.name
    );
  }
}
