import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export const rollupTypescript = (filePath, external = [], dtsExternal = []) => [
  {
    input: `./src/${filePath}.ts`,
    output: [
      {
        file: `./${filePath}.js`,
        format: filePath.includes("/node/") ? "cjs" : "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [typescript(), terser()],
    external,
  },
  {
    input: `./src/${filePath}.ts`,
    output: [{ file: `./${filePath}.d.ts`, format: "esm" }],
    plugins: [dts()],
    external: dtsExternal,
  },
];

export const rollupVue = (filePath, external = [], dtsExternal = []) => {
  const temp = filePath.split(".");
  const ext = temp.pop();
  const filename = temp.join(".");

  return [
    {
      input: `./src/${filePath}`,
      output: [
        {
          file: `./${filename}.js`,
          format: filePath.includes("/node/") ? "cjs" : "esm",
          sourcemap: true,
          exports: "named",
        },
      ],
      plugins: [typescript(), terser()],
      external,
    },
    ...(ext === "ts"
      ? [
          {
            input: `./src/${filePath}`,
            output: [{ file: `./${filePath}.d.ts`, format: "esm" }],
            plugins: [dts()],
            external: dtsExternal,
          },
        ]
      : []),
  ];
};
