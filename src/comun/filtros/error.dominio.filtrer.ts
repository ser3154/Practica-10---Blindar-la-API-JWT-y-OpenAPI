import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ErrorDominio } from '../errores/error_dominio';

@Catch(ErrorDominio)
export class ErrorDominioFilter implements ExceptionFilter {
  catch(error: ErrorDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = error.codigo === 'CONFLICTO' ? 409 : 404;

    response.status(status).json({
      statusCode: status,
      message: error.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}