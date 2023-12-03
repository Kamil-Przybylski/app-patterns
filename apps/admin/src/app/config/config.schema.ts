import * as Joi from 'joi';
import { IConfig } from './config.model';

export const configSchema = Joi.object<IConfig>({
  env: Joi.string().default('development'),
  http: Joi.object<IConfig['http']>({
    host: Joi.string().default('localhost'),
    prefix: Joi.string().default('admin'),
    port: Joi.number().required(),
  }).required(),
  tcp: Joi.object<IConfig['tcp']>({
    host: Joi.string().default('localhost'),
    port: Joi.number().required(),
  }).required(),
}).required();
