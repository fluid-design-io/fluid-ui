module.exports = {
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/display-name': 'off',
    'react/jsx-sort-props': ['warn', {
      multiline: 'last',
    }
    ],

    //#region  //*=========== Import Sort ===========
    'simple-import-sort/exports': 'warn',
    //#endregion  //*======== Import Sort ===========
  },
  ignorePatterns: ["ThemeContext.tsx", "src/plugin.js", "src/tinycolor.js"],
};
