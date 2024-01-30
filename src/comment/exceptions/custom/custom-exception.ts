import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  private errorCode: string;
  private customMessage: string;

  constructor(
    response: string | object,
    status: HttpStatus,
    errorCode: string,
    customMessage: string,
  ) {
    super(response, status);
    this.errorCode = errorCode;
    this.customMessage = customMessage;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getCustomMessage(): string {
    return this.customMessage;
  }
}
