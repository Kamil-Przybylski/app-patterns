import * as Joi from 'joi';
import { IConfig } from './config.model';

export const configSchema = Joi.object<IConfig['db']>({
  type: Joi.string().required(),
  host: Joi.string(),
  port: Joi.number(),
  username: Joi.string().allow(''),
  password: Joi.string().allow(''),
  database: Joi.string().required(),
  synchronize: Joi.boolean().required(),
});
