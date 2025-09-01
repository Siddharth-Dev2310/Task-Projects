import { ArgumentsHost, Catch, ExceptionFilter,HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpsExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException  , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    res
      .status(status)
      .json(
        {
          statusCode : status,
          timeStamp : new Date().toISOString(),
          path : req.url,
          message : exception.message,
        }
      )

  }
}
