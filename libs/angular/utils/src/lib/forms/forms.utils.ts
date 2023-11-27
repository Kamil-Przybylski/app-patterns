import { FormControl } from '@angular/forms';

export type TFormGroup<T> = {
  [K in keyof T]: FormControl<T[K]>
};

export class FormUtils {}
