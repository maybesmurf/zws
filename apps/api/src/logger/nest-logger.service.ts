import type {LoggerService as BaseLoggerService} from '@nestjs/common';
import {Injectable} from '@nestjs/common';
import type {Logger} from './interfaces/logger.interface';
import {LoggerService} from './logger.service';

@Injectable()
export class NestLogger implements BaseLoggerService {
	private readonly logger: Logger;

	constructor(loggerService: LoggerService) {
		this.logger = loggerService.createLogger().withTag('nest');
	}

	debug(...args: unknown[]) {
		const context = this.extractContext(args);

		if (context) {
			this.logger.debug(context, ...args.slice(0, -1));
		} else {
			// @ts-expect-error Consola typings are bad
			this.logger.debug(...args);
		}
	}

	error(...args: unknown[]) {
		const context = this.extractContext(args);

		if (context) {
			this.logger.error(context, ...args.slice(0, -1));
		} else {
			// @ts-expect-error Consola typings are bad
			this.logger.error(...args);
		}
	}

	warn(...args: unknown[]) {
		const context = this.extractContext(args);

		if (context) {
			this.logger.warn(context, ...args.slice(0, -1));
		} else {
			// @ts-expect-error Consola typings are bad
			this.logger.warn(...args);
		}
	}

	log(message: unknown, ...args: unknown[]) {
		const context = this.extractContext(args);

		if (context) {
			this.logger.withTag(context).log(message, ...args.slice(0, -1));
		} else {
			this.logger.log(message, ...args);
		}
	}

	private extractContext(args: unknown[]): string | undefined {
		if (args.length > 0) {
			const maybeContext = args.at(-1);

			if (typeof maybeContext === 'string') {
				return maybeContext;
			}
		}

		return undefined;
	}
}
