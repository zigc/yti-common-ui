import { AbstractControl, ValidationErrors } from '@angular/forms';
import { contains } from './array';
import { ietfLanguageTags } from '..';

export function requiredList(control: AbstractControl): ValidationErrors|null {
  return Object.values(control.value).length > 0 ? null : {
    required: {
      valid: false
    }
  };
}

export function validateLanguage(control: AbstractControl): ValidationErrors|null {
  return contains(ietfLanguageTags, control.value)  ? null : {
    validateLanguage: {
      valid: false
    }
  };
}
