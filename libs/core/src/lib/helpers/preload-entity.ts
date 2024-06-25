import { loadEntity } from './load-entity';

export function preloadEntity(name: string) {
  if (!window) {
    return;
  }

  const requestIdle = requestIdleCallback || setTimeout;

  requestIdle(() => {
    loadEntity(name);
  });
}
