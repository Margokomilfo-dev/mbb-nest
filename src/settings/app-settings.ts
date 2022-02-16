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
  public readonly FRIEND_TOKEN: string;
  public readonly LABS_API_BASE_URL: string;
  public readonly MONGO_URL: string;
  public readonly MONGO_TEST_URL: string;
  public readonly EXCHANGE_NAME: string;
  public readonly RABBITMQ_URL: string;
  public readonly PUPPETEER_BASE_URL: string;

  constructor(private envVariables: EnvironmentVariable) {
    this.FRIEND_TOKEN = envVariables.FRIEND_TOKEN || '123';
    this.RABBITMQ_URL =
      envVariables.RABBITMQ_URL || 'amqp://guest:guest@3.65.73.47:5672';
    this.EXCHANGE_NAME = envVariables.EXCHANGE_NAME || 'IT_INCUBATOR';

    this.LABS_API_BASE_URL =
      envVariables.LABS_API_BASE_URL ||
      'https://labs-api.staging.it-kamasutra.com/api';

    this.PUPPETEER_BASE_URL =
      envVariables.PUPPETEER_BASE_URL ||
      'https://puppeteer-api.staging.it-kamasutra.com/api';

    this.MONGO_URL =
      envVariables.MONGO_URL ||
      'mongodb://zoom_service:2fALrxeTGYzkFXWg@3.69.103.174:27017/ZOOM_SERVICE?retryWrites=true&w=majority';
    this.MONGO_TEST_URL =
      envVariables.MONGO_TEST_URL ||
      'mongodb+srv://admin:admin@test.uuiga.mongodb.net/test?retryWrites=true&w=majority';
  }
}

export class AppSettings {
  constructor(
    public env: EnvironmentSettings,
    public api: APISettings,
    public logger: LoggerSettings,
    public zoomSettings: ZoomSettings,
  ) {}
}

export class LoggerSettings {
  public readonly HOST: string;
  public readonly URL_PATH: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.HOST = envVariables.LOGGER_HOST || 'logger.staging.it-incubator.ru';
    this.URL_PATH = envVariables.LOGGER_URL_PATH || 'api/logger/create';
  }
}

class ZoomSettings {
  public readonly ZOOM_BASE_URL: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.ZOOM_BASE_URL = envVariables.ZOOM_BASE_URL || 'https://api.zoom.us/v2';
  }
}

const env = new EnvironmentSettings(
  (process.env.ENV || 'DEVELOPMENT') as EnvironmentsTypes,
);
const api = new APISettings(process.env);
const zoomSettings = new ZoomSettings(process.env);
const logger = new LoggerSettings(process.env);

export const appSettings = new AppSettings(env, api, logger, zoomSettings);
