export interface IConfig {
  env: string;
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
  };
}
