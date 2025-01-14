import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { type NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

import { ExceptionsFilter } from './common/exceptions-filter';
import { AppModule } from './app.module';

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT', 4422);
	const viewsPath = resolve('views');

	app.use(cookieParser());
	app.enableCors({ origin: '*', credentials: true });
	app.setBaseViewsDir(viewsPath);
	app.setViewEngine('pug');
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
		}),
	);
	app.useGlobalFilters(new ExceptionsFilter());

	await app.listen(port, async () => {
		console.log(`Application is running on: http://localhost:${port}`);
	});
})();
