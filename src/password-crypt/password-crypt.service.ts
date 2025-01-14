import { type BinaryLike, scrypt, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordCryptService {
	private readonly _scryptAsync: (password: BinaryLike, salt: BinaryLike, byteLength: number) => Promise<Buffer>;

	constructor() {
		this._scryptAsync = promisify(scrypt);
	}

	public async toHash(password: string) {
		const salt = randomBytes(16).toString('hex');
		const buffer = await this._scryptAsync(password, salt, 64);
		return `${buffer.toString('hex')}.${salt}`;
	}

	public async toCompare(storedPassword: string, suppliedPassword: string) {
		const [hashedPassword, salt] = storedPassword.split('.');
		const buffer = await this._scryptAsync(suppliedPassword, salt, 64);
		return buffer.toString('hex') === hashedPassword;
	}
}
