module.exports = {
  singleQuote: true,
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '^react',
    '^(@angular/localize/(.*)|zone.js/(.*))$',
    '',
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(@angular/(.*)|rxjs)$',
    '^(@nx/(.*))$',
    '',
    `^@(mexo)/(.*)$`,
    '',
    '^@(steppe-ui|admin-hub|diftech|ngx-bridges|toolhub)/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['decorators-legacy', 'typescript', 'jsx'],
  overrides: [
    {
      files: ['*.md'],
      options: {
        proseWrap: 'always',
        printWidth: 80,
      },
    },
  ],
};
