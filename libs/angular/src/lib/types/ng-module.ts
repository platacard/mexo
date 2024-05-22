import { Type } from '@angular/core';

import { EntityRegistrationOptions } from '@mexo/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EntryPoint {
  //
}

export interface MexoNgModule<T extends EntryPoint = EntryPoint> {
  getEntryPoint(): Type<T>;
}

export type NgModuleRegistrationOptions = EntityRegistrationOptions<
  Type<MexoNgModule>
>;
