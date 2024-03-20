import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import terser from "@rollup/plugin-terser";

const tailwindConfig = require("./tailwind.config.js");
export default [
  {
    input: "lib/index.js",
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
      },

      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ browser: true }),
      commonjs(),
      postcss({
        extensions: [".css"],
        plugins: [tailwindcss(tailwindConfig)],
      }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
