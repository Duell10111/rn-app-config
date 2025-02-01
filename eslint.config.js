import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default tseslint.config(
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        ignores: [
            "**/dist/",
            "**/*.{js,mjs,cjs}",
        ],
    }
);
