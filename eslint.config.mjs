import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier"; // Giữ comment nếu không dùng eslint-plugin-prettier

export default [
  // 1. Global ignores
  {
    ignores: [
      "node_modules/",
      "dist/",
      "www/", // ZMP build output
      ".husky/",
      ".vscode/",
      "src/components/ui/",
      "src/client/api",
      "postcss.config.cjs",
      "tailwind.config.cjs",
      ".prettierrc.cjs",
      "vite.config.mts",
      "components.json",
      "zmp-cli.json",
      "app-phongkham-config.json",
      "app-phongkham-config-expample.json",
    ],
  },

  // 2. Base JavaScript rules
  pluginJs.configs.recommended,

  // 3. TypeScript rules
  ...tseslint.configs.recommended,

  // 4. React rules (applied only to src files)
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ...pluginReactConfig,
    languageOptions: {
      ...pluginReactConfig.languageOptions,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: { react: { version: "detect" } },
  },

  // 5. React Hooks rules (applied only to src files)
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: { "react-hooks": pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // 6. Prettier compatibility (TẮT các quy tắc ESLint xung đột với Prettier - LUÔN ĐỂ CUỐI CÙNG trong phần rules)
  eslintConfigPrettier,

  // 7. Custom project rules (applied only to src files)
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      // Bỏ comment nếu dùng eslint-plugin-prettier
      prettier: pluginPrettier,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Không cần thiết với JSX transform mới
      // Đổi 'warn' thành 'error' để báo lỗi thay vì cảnh báo
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "prettier/prettier": "error", // Comment dòng này nếu KHÔNG dùng eslint-plugin-prettier
      // Thêm các quy tắc tùy chỉnh khác ở đây
    },
  },
];
