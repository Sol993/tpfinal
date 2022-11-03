import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
    
export function match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
export function urlValidator(control: AbstractControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.me')) {
      return { urlValid: true };
    }
    return null;
  }

  export function ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
    if (control.value && control.value.length != 10) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }