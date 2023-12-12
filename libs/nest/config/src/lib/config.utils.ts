import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as Joi from 'joi';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ConfigKey } from './config-root.keys';

const validateConfig = <T>(
  validationSchema: Joi.ObjectSchema<T>,
  config: T | undefined,
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

const getConfig = <T = { [name: string]: unknown }>(configName: string): T => {
  return yaml.load(
    readFileSync(
      join(__dirname, 'config', `${configName}.${process.env['NODE_ENV']}.yaml`),
      'utf8',
    ),
  ) as T;
};

export const loadConfig = <T = { [name: string]: unknown }>(
  validationSchema: Joi.ObjectSchema<T>,
  configName: string,
): (() => Joi.ValidationResult<T>['value']) => {
  const config = getConfig<T>(configName);
  return validateConfig(validationSchema, config);
};

export const configFactory = <T>(validationSchema: Joi.ObjectSchema<T>, configKey: ConfigKey) => {
  const configName = configKey.toLowerCase();
  return registerAs(configName, () => loadConfig(validationSchema, configName)()[configName]);
};
