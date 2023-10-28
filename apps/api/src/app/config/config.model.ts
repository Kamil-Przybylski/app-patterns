export interface IConfig {
  env: string;
  http: {
    host: string;
    prefix: string;
    port: number;
  };
}
