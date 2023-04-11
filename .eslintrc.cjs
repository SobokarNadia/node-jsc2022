module.exports = {
    extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "sort-exports"],
    root: true,
    rules: {
        "sort-exports/sort-exports": ["error", {"sortDir": "asc"}]
    }
};