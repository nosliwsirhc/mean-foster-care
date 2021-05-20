import { AbstractControl, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(matchingControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { mustMatch: boolean } | null => {
    return control.value !== matchingControl.value ? { mustMatch: true } : null;
  };
}
