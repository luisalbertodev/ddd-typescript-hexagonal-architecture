module.exports = {
  extends: ["eslint-config-codely/typescript"],
  rules: {
    "no-console": "warn",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // Asegúrate de que coincida con tu configuración de Prettier
        parser: "typescript"
      }
    ]
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"]
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "warn"
      }
    }
  ]
};
