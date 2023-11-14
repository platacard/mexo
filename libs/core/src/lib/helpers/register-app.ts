import {DefaultPropsType} from '../models/default-props-type';
import {AppRegistrationOptions} from '../models/registration-options';
import {registerEntity} from './register-entity';

export function registerApp<T extends DefaultPropsType = DefaultPropsType>(
  options: AppRegistrationOptions<T>,
) {
  registerEntity(options);
}
