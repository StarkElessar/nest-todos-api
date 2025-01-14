import { validate } from 'class-validator';
import { CreateUserRequestDto } from './create-user-request.dto';

describe('CreateUserRequestDto', () => {
	it('should validate correct data', async () => {
		const dto = new CreateUserRequestDto();
		dto.email = 'test@example.com';
		dto.name = 'John Doe';
		dto.password = 'password123';

		const errors = await validate(dto);
		expect(errors.length).toBe(0);
	});

	it('should return errors for invalid data', async () => {
		const dto = new CreateUserRequestDto();
		dto.email = 'invalid-email'; // Некорректный email
		dto.name = ''; // Пустое имя
		dto.password = '123'; // Слишком короткий пароль

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
	});
});
