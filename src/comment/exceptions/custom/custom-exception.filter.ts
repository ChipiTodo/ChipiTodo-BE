import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpException } from './custom-exception';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    let errorCode = 'S999';
    let customMessage = '아직 정립되지 않은 에러입니다.';

    if (exception instanceof CustomHttpException) {
      errorCode = exception.getErrorCode();
      customMessage = exception.getCustomMessage();
    }

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        custom: {
          customMessage,
          errorCode,
        },
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        custom: {
          customMessage,
          errorCode,
        },
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
