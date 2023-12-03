export interface IConfig {
  env: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
