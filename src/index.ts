import * as Sentry from '@sentry/react-native';

import { VERSION } from './version';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	key: 'plugin-senetry',
	name: 'Sentry Plugin',
	version: VERSION,

	description: 'Sends BlueBase Logger messages to Sentry',

	filters: {
		'bluebase.logger.debug': (message: string, data: object) => {
			Sentry.withScope(scope => {
				scope.setLevel(Sentry.Severity.Debug);
				scope.setExtras(data);
				Sentry.captureException(message);
			});
			return message;
		},

		'bluebase.logger.error': (message: string, data: object) => {
			Sentry.withScope(scope => {
				scope.setLevel(Sentry.Severity.Error);
				scope.setExtras(data);
				Sentry.captureException(message);
			});
			return message;
		},

		'bluebase.logger.info': (message: string, data: object) => {
			Sentry.withScope(scope => {
				scope.setLevel(Sentry.Severity.Info);
				scope.setExtras(data);
				Sentry.captureException(message);
			});
			return message;
		},

		'bluebase.logger.log': (message: string, data: { params: any[] }) => {
			Sentry.withScope(scope => {
				scope.setLevel(Sentry.Severity.Log);
				scope.setExtras(data);
				Sentry.captureMessage(message);
			});
			return message;
		},

		'bluebase.logger.warn': (message: string, data: object) => {
			Sentry.withScope(scope => {
				scope.setLevel(Sentry.Severity.Warning);
				scope.setExtras(data);
				Sentry.captureException(message);
			});
			return message;
		},
	},
});
