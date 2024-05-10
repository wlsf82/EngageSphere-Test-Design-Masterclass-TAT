import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
	eslintConfigPrettier,
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'commonjs' }
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	pluginJs.configs.recommended,
	pluginReactConfig,
	{
		rules: {
			'no-redeclare': 'off',
			'mocha/no-mocha-arrows': 'off',
			'mocha/no-setup-in-describe': 'off',
			quotes: ['error', 'single', { avoidEscape: true }],
			indent: ['error', 2, { SwitchCase: 0 }],
			'linebreak-style': ['error', 'unix'],
			semi: ['error', 'never'],
			'no-trailing-spaces': 'error'
		}
	}
]
