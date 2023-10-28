import { readFileSync } from 'fs';
import * as Joi from 'joi';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const configuration = <T>(
  validationSchema: Joi.ObjectSchema<T>
): (() => Joi.ValidationResult<T>['value']) => {
  const config = yaml.load(
    readFileSync(
      join(__dirname, 'config', `${process.env['NODE_ENV']}.yaml`),
      'utf8'
    )
  ) as Record<string, T>;
  const { value, warning, error } = validationSchema.validate(config, {
    allowUnknown: true,
  });
  if (error) throw error;
  if (warning) console.warn(warning);
  return () => value;
};
