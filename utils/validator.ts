import { FormControl } from '@angular/forms';
import { contains } from './array';
import { ietfLanguageTags } from '..';

export function requiredList(control: FormControl) {  
  return Object.values(control.value).length > 0 ? null : {
    required: {
      valid: false
    }
  };
}

export function validateLanguage(control: FormControl) {
  return contains(ietfLanguageTags, control.value)  ? null : {
    validateLanguage: {
      valid: false
    }
  };
}
