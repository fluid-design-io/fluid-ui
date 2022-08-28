module.exports = {
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/display-name': 'off',

    //#region  //*=========== Unused Import ===========
    '@typescript-eslint/no-unused-vars': 'off',
    //#endregion  //*======== Unused Import ===========

    //#region  //*=========== Import Sort ===========
    'simple-import-sort/exports': 'warn',
    //#endregion  //*======== Import Sort ===========
  },
  ignorePatterns: ["ThemeContext.tsx", "src/plugin.js"],
};
