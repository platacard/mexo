import { Application } from '../models/application';

export async function bootstrapApp<T extends Record<string, unknown>>(
  app: Application<T>,
  selector: string | Element,
  props?: T,
): Promise<Application<T>> {
  await app.bootstrap(selector, props);

  return app;
}
