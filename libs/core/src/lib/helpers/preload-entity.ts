import { loadEntity } from './load-entity';

export function preloadEntity(name: string) {
  if (!window) {
    return;
  }

  const loadEntityFn = () => {
    loadEntity(name);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadEntityFn);
  } else {
    setTimeout(loadEntityFn);
  }
}
