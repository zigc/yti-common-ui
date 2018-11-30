import { AbstractControl, ValidationErrors } from '@angular/forms';
import { contains } from './array';
import { ietfLanguageTags } from '..';

export function requiredList(control: AbstractControl): ValidationErrors | null {
  return Object.values(control.value).length > 0 ? null : {
    required: {
      valid: false
    }
  };
}

export function validateLanguage(control: AbstractControl): ValidationErrors | null {
  return contains(ietfLanguageTags, control.value) ? null : {
    validateLanguage: {
      valid: false
    }
  };
}

// TODO: This is just a starting point dummy pattern which should be replaced with something real, while continuing to accept
//  internationalized URLs, parameters, ports, etc.
export const httpOrHttpsUrlRegex = /^https?:\/\/\S+$/;
