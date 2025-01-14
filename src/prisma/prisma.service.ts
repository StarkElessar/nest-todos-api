import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@db/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	public async onModuleDestroy() {
		await this.$disconnect();
	}

	public async onModuleInit() {
		await this.$connect();
	}
}
