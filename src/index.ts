import { BootOptions, createPlugin } from '@bluebase/core';

import Raven from 'raven-js';
import { VERSION } from './version';

export default createPlugin({
	key: 'plugin-senetry',
	name: 'Sentry Plugin',
	version: VERSION,

	description: 'A BlueBase plugin boilerplate!',

	defaultConfigs: {
		'plugin.sentry.url': null,
	},

	filters: {
		'bluebase.boot.end': (bootOptions: BootOptions, _ctx: any, BB) => {
			const url = BB.Configs.getValue('plugin.sentry.url');
			if (!url) {
				Raven.config(url).install();
			}
			return bootOptions;
		},
		'bluebase.logger.debug': (message: string, data: object) => {
			Raven.captureMessage(message, { logger: 'info', ...data });
			return message;
		},
		'bluebase.logger.error': (message: string, data: object) => {
			Raven.captureMessage(message, { logger: 'error', ...data });
			return message;
		},
		'bluebase.logger.info': (message: string, data: object) => {
			Raven.captureMessage(message, { logger: 'info', ...data });
			return message;
		},
		'bluebase.logger.log': (message: string, data: object) => {
			Raven.captureMessage(message, { logger: 'log', ...data });
			return message;
		},
		'bluebase.logger.warn': (message: string, data: object) => {
			Raven.captureMessage(message, { logger: 'warn', ...data });
			return message;
		},
	},
});
