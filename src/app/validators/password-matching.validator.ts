import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordMatching = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirmed');
  const errors = { passwordMatching: { notmatch: true } };
  if (password?.value === confirmPassword?.value) return null;
  confirmPassword?.setErrors(errors);
  return errors;
};
