import { ApiProperty } from '@nestjs/swagger';

export enum ResultCode {
  Success = 0,
  Error = 1,
}

export class ErrorMessage {
  constructor(readonly message: string, readonly field: string | null = null) {}
}

export class Result<T = null> {
  constructor(
    public resultCode: ResultCode,
    public messages: ErrorMessage[],
    public data?: T,
  ) {}
}

export class BaseEntity {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  __v: number;
}
