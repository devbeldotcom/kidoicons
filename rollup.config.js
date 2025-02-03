import postcss from "rollup-plugin-postcss";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/js/kidoicons.js",
      format: "iife",
      name: "kidoicons",
      sourcemap: true,
    },
    {
      file: "dist/js/kidoicons.min.js",
      format: "iife",
      name: "kidoicons",
      plugins: [
        terser({
          compress: {
            drop_console: true,
            passes: 2,
          },
          mangle: {
            properties: {
              regex: /^_/,
            },
          },
          output: {
            comments: false,
            beautify: false,
          },
        }),
      ],
      sourcemap: true,
    },
    {
      file: "dist/js/kidoicons.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/js/kidoicons.esm.min.js",
      format: "esm",
      plugins: [
        terser({
          compress: {
            drop_console: true,
            passes: 2,
          },
          mangle: {
            properties: {
              regex: /^_/,
            },
          },
          output: {
            comments: false,
            beautify: false,
          },
        }),
      ],
      sourcemap: true,
    },
    {
      file: "dist/js/kidoicons.umd.js",
      format: "umd",
      name: "kidoicons",
      sourcemap: true,
    },
    {
      file: "dist/js/kidoicons.umd.min.js",
      format: "umd",
      name: "kidoicons",
      plugins: [
        terser({
          compress: {
            drop_console: true,
            passes: 2,
          },
          mangle: {
            properties: {
              regex: /^_/,
            },
          },
          output: {
            comments: false,
            beautify: false,
          },
        }),
      ],
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postcss({ extensions: [".css"] }),
  ],
};
