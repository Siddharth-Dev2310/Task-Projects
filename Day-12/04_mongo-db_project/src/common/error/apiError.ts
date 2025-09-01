import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = 'Something went wrong!',
    errors: any[] = [],
  ) {
    super(
      {
        success: false,
        statusCode,
        message,
        errors,
      },
      statusCode,
    );
  }
}
