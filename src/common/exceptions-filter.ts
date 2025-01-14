import { ArgumentsHost, type ExceptionFilter as IExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionsFilter implements IExceptionFilter {
	public catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		console.log(`[Error]: ${exception instanceof Error ? exception.stack : ''} | url: ${request.url}`);

		if (exception instanceof HttpException) {
			const exceptionResult = exception.getResponse();
			const status = exception.getStatus();
			let resData: string | object | null;

			if (typeof exceptionResult === 'string') {
				resData = {
					message: exceptionResult,
					statusCode: status,
				};
			} else {
				resData = { ...exceptionResult };
			}

			return response.status(exception.getStatus()).send(resData);
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
	}
}
