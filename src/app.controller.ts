import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly _appService: AppService) {}

	@Get('/hello')
	getHello(): string {
		return this._appService.getHello();
	}

	@Get()
	@Render('index')
	index() {
		return {
			users: [
				{ id: 1, name: 'John', email: 'john@example.com' },
				{ id: 2, name: 'John 1', email: 'john_1@example.com' },
				{ id: 3, name: 'John 2', email: 'john_2@example.com' },
				{ id: 4, name: 'John 3', email: 'john_3@example.com' },
			],
		};
	}
}
