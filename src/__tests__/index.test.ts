import * as Sentry from '@sentry/react-native';

import { BlueBase } from '@bluebase/core';
import Plugin from '../index';

jest.mock('@sentry/react-native');
// import wait from 'waait';

describe('Plugin Sentry Test', () => {
	beforeEach(() => {
		// jest.clearAllMocks();
		// jest.restoreAllMocks();
		// jest.resetAllMocks();
	});

	test('Plugin should be correctly registered', async () => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		expect(BB.Plugins.has('plugin-senetry')).toBeTruthy();
	});

	test('debug', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.debug('debug', { foo: 'bar' });

		setTimeout(() => {
			const calls = (Sentry.withScope as jest.Mock).mock.calls;
			const cb = calls[calls.length - 1][0];

			const scope = {
				setExtras: jest.fn(),
				setLevel: jest.fn(),
			};

			cb(scope);

			expect(Sentry.captureException).toHaveBeenLastCalledWith('debug');
			expect(scope.setLevel).toHaveBeenLastCalledWith(Sentry.Severity.Debug);
			expect(scope.setExtras).toHaveBeenLastCalledWith({ params: [{ foo: 'bar' }] });
			done();
		});
	});

	test('error', async done => {
		jest.clearAllMocks();
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.error('error', { foo: 'bar' });

		setTimeout(() => {
			const cb = (Sentry.withScope as jest.Mock).mock.calls[0][0];

			const scope = {
				setExtras: jest.fn(),
				setLevel: jest.fn(),
			};

			cb(scope);

			expect(Sentry.captureException).toHaveBeenLastCalledWith('error');
			expect(scope.setLevel).toHaveBeenLastCalledWith(Sentry.Severity.Error);
			expect(scope.setExtras).toHaveBeenLastCalledWith({ params: [{ foo: 'bar' }] });
			done();
		});
	});

	test('info', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.info('info', { foo: 'bar' });

		setTimeout(() => {
			const calls = (Sentry.withScope as jest.Mock).mock.calls;
			const cb = calls[calls.length - 1][0];

			const scope = {
				setExtras: jest.fn(),
				setLevel: jest.fn(),
			};

			cb(scope);

			expect(Sentry.captureException).toHaveBeenLastCalledWith('info');
			expect(scope.setLevel).toHaveBeenLastCalledWith(Sentry.Severity.Info);
			expect(scope.setExtras).toHaveBeenLastCalledWith({ params: [{ foo: 'bar' }] });
			done();
		});
	});

	test('log', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.log('log', { foo: 'bar' });

		setTimeout(() => {
			const calls = (Sentry.withScope as jest.Mock).mock.calls;
			const cb = calls[calls.length - 1][0];

			const scope = {
				setExtras: jest.fn(),
				setLevel: jest.fn(),
			};

			cb(scope);

			expect(Sentry.captureMessage).toHaveBeenLastCalledWith('log');
			expect(scope.setLevel).toHaveBeenLastCalledWith(Sentry.Severity.Log);
			expect(scope.setExtras).toHaveBeenLastCalledWith({ params: [{ foo: 'bar' }] });
			done();
		});
	});

	test('warn', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.warn('warn', { foo: 'bar' });

		setTimeout(() => {
			const calls = (Sentry.withScope as jest.Mock).mock.calls;
			const cb = calls[calls.length - 1][0];

			const scope = {
				setExtras: jest.fn(),
				setLevel: jest.fn(),
			};

			cb(scope);

			expect(Sentry.captureException).toHaveBeenLastCalledWith('warn');
			expect(scope.setLevel).toHaveBeenLastCalledWith(Sentry.Severity.Warning);
			expect(scope.setExtras).toHaveBeenLastCalledWith({ params: [{ foo: 'bar' }] });
			done();
		});
	});
});
