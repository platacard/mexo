import { Injectable } from '@angular/core';

import { AppRegistrationOptions, registerEntity } from '@mexo/core';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  registerMany(apps: ReadonlyArray<AppRegistrationOptions>) {
    apps.forEach((app) => this.register(app));
  }

  register(options: AppRegistrationOptions) {
    registerEntity(options);
  }
}
