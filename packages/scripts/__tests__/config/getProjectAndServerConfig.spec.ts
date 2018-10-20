import path from 'path';
import { getProjectAndServerConfig } from '../../src/config/getProjectAndServerConfig';

const pathToDummyRight = path.resolve(
	__dirname,
	'../helpers/dummyConfigRight.js'
);
const pathToDummyWrong = path.resolve(
	__dirname,
	'../helpers/dummyConfigWrong.js'
);
const validCwd = path.resolve(__dirname, '../helpers');

describe('getProjectAndServerConfig', () => {
	describe('for projectConfig', () => {
		test('throws error if file not found', () => {
			expect(() => {
				getProjectAndServerConfig(__dirname);
			}).toThrowError('not find project configuration');
		});
		test('throws error if module.exports not an object', () => {
			expect(() => {
				getProjectAndServerConfig(__dirname, {
					projectConfig: pathToDummyWrong,
					serverConfig: pathToDummyRight,
				});
			}).toThrow('Project configuration must export an object literal.');
		});
		test('works properly if module.exports is an object', () => {
			expect(() => {
				getProjectAndServerConfig(__dirname, {
					projectConfig: pathToDummyRight,
					serverConfig: pathToDummyRight,
				});
			}).not.toThrow();
		});
	});
	describe('for serverConfig', () => {
		test('throws error if file not found', () => {
			expect(() => {
				getProjectAndServerConfig(__dirname, {
					projectConfig: pathToDummyRight,
				});
			}).toThrowError('not find server configuration');
		});
		test('throws error if module.exports not an object', () => {
			expect(() => {
				getProjectAndServerConfig(__dirname, {
					projectConfig: pathToDummyRight,
					serverConfig: pathToDummyWrong,
				});
			}).toThrow('Server configuration must export an object literal.');
		});
		test('works properly if module.exports is an object', () => {
			expect(() => {
				getProjectAndServerConfig(__dirname, {
					projectConfig: pathToDummyRight,
					serverConfig: pathToDummyRight,
				});
			}).not.toThrow();
		});
	});
	test('looks for default file under cwd', () => {
		const {
			projectConfigPath,
			serverConfigPath,
		} = getProjectAndServerConfig(validCwd);
		expect(projectConfigPath).toBe(
			path.resolve(validCwd, 'wpackio.project.js')
		);
		expect(serverConfigPath).toBe(
			path.resolve(validCwd, 'wpackio.server.js')
		);
	});
});