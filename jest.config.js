const configs = require('@bluebase/code-standards/jest.config');

const modules = ['react-native', 'react-router-native', '@sentry/react-native'].join('|');

module.exports = Object.assign(configs, {
	preset: 'react-native',
	transformIgnorePatterns: [`/node_modules/(?!${modules})`],
	setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
});
