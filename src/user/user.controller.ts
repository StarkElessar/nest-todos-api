import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';

@Controller('api/users')
export class UserController {
	private readonly _userService: UserService;

	constructor(userService: UserService) {
		this._userService = userService;
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	public async create(@Body() dto: CreateUserRequestDto) {
		const user = await this._userService.createUser(dto);
		return {
			message: 'User created successfully',
			user,
		};
	}
}
