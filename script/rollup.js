import typescript from "@rollup/plugin-typescript";
import rollupCopy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import styles from "rollup-plugin-styles";

export const rollupTypescript = (
  filePath,
  { external = [], dtsExternal = [], useStyle = false, copy = [] } = {}
) => [
  {
    input: `./src/${filePath}.ts`,
    output: [
      {
        file: `./${filePath}.js`,
        format: filePath.startsWith("node/") ? "cjs" : "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      typescript(),
      ...(useStyle ? [styles()] : []),
      terser(),
      ...(copy.length
        ? [
            rollupCopy({
              targets: copy.map((item) =>
                typeof item === "string"
                  ? { src: `./src/${item}`, dest: item }
                  : { src: `./src/${item[0]}`, dest: item[1] }
              ),
            }),
          ]
        : []),
    ],
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
