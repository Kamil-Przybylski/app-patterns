import { FormGroup, FormControl } from '@angular/forms';

export type TFormGroup<T> = {
  [K in keyof T]: T[K] extends object ? FormGroup<TFormGroup<T[K]>> : FormControl<T[K]>;
};

export class FormUtils {}
