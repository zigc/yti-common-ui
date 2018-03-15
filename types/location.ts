import {Localizable} from './localization';

export interface Location {
  localizationKey?: string;
  label?: Localizable;
  value?: string;
  route?: string[];
}
