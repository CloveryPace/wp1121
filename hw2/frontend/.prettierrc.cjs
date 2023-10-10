module.exports = {
  singleQuote: true,
  // jsxSingleQuote: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  importOrder: ["^react", "^next", "<THIRD_PARTY_MODULES>", "^@\\/", "^\\.\\/"],
  importOrderSeparation: true,
};
