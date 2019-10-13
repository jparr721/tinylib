import { Injectable } from '@nestjs/common';
import rpn from 'request-promise-native';
import { Response } from 'express';

@Injectable()
export class TinylibService {
  private nanokeyHost: string;
  private nanokeyDbName: string;
  private isInit: boolean = false;

  /* tslint:disable:max-classes-per-file */
  static NotInitializedError = class extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  };

  public init(nanokeyHost: string, nanokeyDbName: string): void {
    this.nanokeyHost  = `http://${nanokeyHost}/nanokey`;
    this.nanokeyDbName = nanokeyDbName;
    this.isInit = true;
  }

  private checkInit = () => {
    if (!this.isInit) {
      throw new TinylibService.NotInitializedError('Not intialized');
    }
  }

  public async addKey(key: string, value: string): Promise<boolean | void> {
    this.checkInit();
    const opts = {
      method: 'POST',
      uri: this.nanokeyHost,
      body: { key, value },
      json: true,
    };

    const resp = await rpn(opts);
    return !resp.failed ? true : false;
  }

  public async getKey(
    key: string,
    fuzzy: boolean = false,
    limit: number = -1,
  ): Promise<string> {
    this.checkInit();
    const opts = !fuzzy
      ? {
          method: 'GET',
          uri: `${this.nanokeyHost}/${key}`,
        }
      : {
          method: 'GET',
          uri: `${this.nanokeyHost}/fuzzy/${key}?limit=${limit}`,
        };

    const resp = await rpn(opts);

    return !resp.failed ? JSON.parse(resp).success : 'failed';
  }

  public async deleteKey(key: string): Promise<boolean> {
    this.checkInit();

    const opts = {
      method: 'DELETE',
      uri: `${this.nanokeyHost}/${key}`,
    };

    const resp = await rpn(opts);

    return !resp.failed ? true : false;
  }
}
