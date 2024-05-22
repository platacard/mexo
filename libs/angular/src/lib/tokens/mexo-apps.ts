import { InjectionToken } from '@angular/core';

import { AppRegistrationOptions } from '@mexo/core';

import { NgModuleRegistrationOptions } from '../types/ng-module';

export const MEXO_APPS = new InjectionToken<AppRegistrationOptions[][]>(
  'Mexo apps',
  {
    factory: () => [],
  },
);

export const MEXO_NG_MODULES = new InjectionToken<
  NgModuleRegistrationOptions[][]
>('Mexo Angular modules', {
  factory: () => [],
});
