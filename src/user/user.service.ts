import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PasswordCryptService } from '@/password-crypt/password-crypt.service';
import { mapToDto } from '@/common/map-to-dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly _prismaService: PrismaService,
		private readonly _passwordCrypt: PasswordCryptService,
	) {}

	public async createUser({ password, name, email }: CreateUserRequestDto) {
		const userExists = await this._prismaService.user.findUnique({ where: { email } });

		if (userExists) {
			throw new BadRequestException('User already exists');
		}

		const passwordHashed = await this._passwordCrypt.toHash(password);

		const user = this._prismaService.user.create({
			data: {
				name,
				email,
				passwordHash: passwordHashed,
			},
		});

		return mapToDto(user, UserResponseDto);
	}
}
