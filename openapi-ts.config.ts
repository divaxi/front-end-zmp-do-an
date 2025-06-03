import { defaultPlugins } from "@hey-api/openapi-ts";

export default {
  input: "./swagger.json",
  output: {
    path: "./src/client/api",
    format: "prettier",
    lint: "eslint",
  },
  plugins: [
    ...defaultPlugins,
    "legacy/fetch",
    {
      enums: "typescript",
      name: "@hey-api/typescript",
    },
    {
      asClass: true,
      name: "@hey-api/sdk",
    },
  ],
};
