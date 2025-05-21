/* eslint-disable */
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'arrow-parens': ['error', 'as-needed'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-case-declarations': 0,
        'no-extra-semi': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'no-multi-spaces': 'error',
        'no-trailing-spaces': ['error', { ignoreComments: true }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        'react/no-find-dom-node': 0,
        'react/display-name': [0, { ignoreTranspilerName: true }],
        semi: ['error', 'never'],
        'semi-spacing': ['error', { before: false, after: true }],
        'jsx-quotes': ['error', 'prefer-double']
    }
}
