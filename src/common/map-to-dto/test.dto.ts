import { Expose } from 'class-transformer';

export class TestDto {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	email: string;
}
