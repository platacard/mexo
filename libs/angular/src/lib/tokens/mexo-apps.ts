import { InjectionToken } from '@angular/core';

import { AppRegistrationOptions } from '@mexo/core';

export const MEXO_APPS = new InjectionToken<AppRegistrationOptions[][]>(
  'Mexo apps',
  {
    factory: () => [],
  },
);
