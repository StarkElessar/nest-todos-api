import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

/**
 * Преобразует объект в экземпляр DTO.
 * @param dtoClass Класс DTO, в который нужно преобразовать объект.
 * @param plainObject Объект, который нужно преобразовать.
 * @returns Экземпляр DTO.
 * */
export function mapToDto<T, V>(plainObject: V, dtoClass: ClassConstructor<T>): T {
	return plainToInstance(dtoClass, plainObject, {
		// Исключаем поля, не помеченные @Expose()
		excludeExtraneousValues: true,
	});
}
