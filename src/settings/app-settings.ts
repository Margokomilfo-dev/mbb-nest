export type EnvironmentVariable = { [key: string]: string | undefined };

export type EnvironmentsTypes = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';

export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}

  getEnv() {
    return this.env;
  }

  isProduction() {
    return this.env === 'PRODUCTION';
  }

  isStaging() {
    return this.env === 'STAGING';
  }

  isDevelopment() {
    return this.env === 'DEVELOPMENT';
  }
}

class APISettings {
  public readonly MONGO_URL: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.MONGO_URL =
      'mongodb+srv://admin:admin@mbb.s8xmj.mongodb.net/mbb?retryWrites=true&w=majority';
  }
}

export class AppSettings {
  constructor(public env: EnvironmentSettings, public api: APISettings) {}
}

const env = new EnvironmentSettings(
  (process.env.ENV || 'DEVELOPMENT') as EnvironmentsTypes,
);
const api = new APISettings(process.env);

export const appSettings = new AppSettings(env, api);
