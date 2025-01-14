import { Module } from '@nestjs/common';
import { PasswordCryptService } from './password-crypt.service';

@Module({
	exports: [PasswordCryptService],
	providers: [PasswordCryptService],
})
export class PasswordCryptModule {}
