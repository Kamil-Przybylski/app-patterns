import * as Joi from 'joi';
import { IConfig } from './config.model';

export const configSchema = Joi.object<IConfig>({
  jwt: Joi.object<IConfig['jwt']>({
    secret: Joi.string().required(),
    accessExpiresIn: Joi.string().required(),
    refreshExpiresIn: Joi.string().required(),
  }).required(),
}).required();
