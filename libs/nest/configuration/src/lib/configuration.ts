import { readFileSync } from 'fs';
import * as Joi from 'joi';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { join } from 'path';

export const validateConfiguration = <T>(
  validationSchema: Joi.ObjectSchema<T>,
  config: T | undefined
): (() => Joi.ValidationResult<T>['value']) => {
  const { value, warning, error } = validationSchema.validate(config || {}, {
    allowUnknown: true,
  });

  if (error) {
    if (!config) console.error('Missing config file!');
    throw error;
  }
  if (warning) {
    console.warn(warning);
  }
  return () => value;
};

export const loadConfiguration = <T = { [name: string]: unknown }>(
  validationSchema: Joi.ObjectSchema<T>,
  configNames: string[]
): (() => Joi.ValidationResult<T>['value']) => {
  let config: T = {} as T;

  configNames.forEach((configName) => {
    const partConfig = yaml.load(
      readFileSync(
        join(
          __dirname,
          'config',
          `${configName}.${process.env['NODE_ENV']}.yaml`
        ),
        'utf8'
      )
    ) as T;
    config = _.assign(config, partConfig);
  });

  return validateConfiguration(validationSchema, config);
};
