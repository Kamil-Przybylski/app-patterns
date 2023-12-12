export interface IConfig {
  env: string;
  http: {
    host: string;
    prefix: string;
    port: number;
    cors?: boolean;
  };
  tcp: {
    host: string;
    port: number;
  };
}
