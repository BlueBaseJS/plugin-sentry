import { BlueBase } from '@bluebase/core';
import Plugin from '../index';
import Raven from 'raven-js';

const url = '';
describe('Plugin Sentry Test', () => {
	test('Plugin should be correctly registered', async () => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		expect(BB.Plugins.has('plugin-senetry')).toBeTruthy();
	});

	test('Url test', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		BB.Configs.register('plugin.sentry.url', 'https://google.com');

		await BB.boot();

		setTimeout(() => {
			expect(Raven.config(url).install()).toBeFalsy();
			done();
		});
	});
	test('Log', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.log('log');

		setTimeout(() => {
			expect(Raven.captureMessage).toBeCalled();
			done();
		});
	});
	test('Info', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.info('info');

		setTimeout(() => {
			expect(Raven.captureMessage).toBeCalled();
			done();
		});
	});
	test('Warn', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.warn('warn');

		setTimeout(() => {
			expect(Raven.captureMessage).toBeCalled();
			done();
		});
	});
	test('Error', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.error('error');

		setTimeout(() => {
			expect(Raven.captureMessage).toBeCalled();
			done();
		});
	});

	test('Debug', async done => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		await BB.boot();

		BB.Logger.debug('debug');

		setTimeout(() => {
			expect(Raven.captureMessage).toBeCalled();
			done();
		});
	});
});
