export default {
  singleQuote: true,
  trailingComma: "none",
  endOfLine: "lf",
  printWidth: 100,
  tabWidth: 4,
  useTabs: false,
  semi: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        bracketSameLine: true,
        printWidth: 250,
      },
    },
  ],
};
