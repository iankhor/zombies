module.exports = {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/testlib/test-setup.js'],
	moduleNameMapper: {
		'^hooks/([^\\.]*)$': '<rootDir>/src/hooks/$1',
		'^components/([^\\.]*)$': '<rootDir>/src/components/$1',
		'^lib/([^\\.]*)$': '<rootDir>/src/lib/$1',
		'^testlib/([^\\.]*)$': '<rootDir>/testlib/$1',
		'^styles/([^\\.]*)$': '<rootDir>/src/styles/$1',
		'\\.(css|less)$': '<rootDir>/testlib/styleMock.ts',
	},
}
