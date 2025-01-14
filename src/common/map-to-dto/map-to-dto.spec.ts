import { mapToDto } from './map-to-dto';
// Тестовый DTO-класс
import { TestDto } from './test.dto';

describe('mapToDto', () => {
	it('should map plain object to DTO instance', () => {
		const plainObject = {
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			password: 'secret', // Это поле не должно быть в DTO
		};

		const result = mapToDto(plainObject, TestDto);

		// Проверяем, что результат является экземпляром TestDto
		expect(result).toBeInstanceOf(TestDto);

		// Проверяем, что только нужные поля присутствуют
		expect(result).toEqual({
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
		});

		// Проверяем, что лишние поля отсутствуют
		expect(result).not.toHaveProperty('password');
	});

	it('should handle empty object', () => {
		const plainObject = {};

		const result = mapToDto(plainObject, TestDto);

		// Проверяем, что результат является экземпляром TestDto
		expect(result).toBeInstanceOf(TestDto);

		// Проверяем, что все поля отсутствуют
		expect(result).toEqual({});
	});

	it('should handle null or undefined', () => {
		const nullResult = mapToDto(null, TestDto);
		const undefinedResult = mapToDto(undefined, TestDto);

		// Проверяем, что функция корректно обрабатывает null и undefined
		expect(nullResult).toBeNull();
		expect(undefinedResult).toBeUndefined();
	});
});
