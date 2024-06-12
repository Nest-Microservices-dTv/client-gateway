import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true); //Permite otras propiedades

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

const envsVars: EnvVars = value;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  port: envsVars.PORT,

  natsServers: envsVars.NATS_SERVERS,
};
