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
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/testlib/fileMock.ts',
	},
}
