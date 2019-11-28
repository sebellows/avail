import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
// import { terser } from 'rollup-plugin-terser';
// import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';

// const testBuild = {
//   plugins: [
//     resolve(),
//     commonjs({
//       namedExports: {
//         'chai': ['assert'],
//       },
//     }),
//     typescript({
//       tsconfig: 'test/tsconfig.json',
//       useTsconfigDeclarationDir: true
//     }),
//     copy({
//       'test/index.html': 'test-build/index.html',
//     }),
//   ],
//   input: ['test/index.ts'],
//   output: {
//     dir: 'test-build',
//     format: 'esm'
//   },
// };

// const esm = {
//   plugins: [typescript({ useTsconfigDeclarationDir: true })],
//   input: ['lib/index.ts'],
//   output: [{
//     dir: 'build/esm/',
//     format: 'esm',
//     entryFileNames: '[name].js',
//     chunkFileNames: '[name].js',
//   }, {
//     dir: 'build/cjs/',
//     format: 'cjs',
//     entryFileNames: '[name].js',
//     chunkFileNames: '[name].js',
//   }],
// };

export default {
    input: ['lib/index.ts'],
    output: [
        {
            dir: 'build/esm/',
            format: 'esm',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        },
        {
            dir: 'build/cjs/',
            format: 'cjs',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        resolve({ preferBuiltins: true }),
        typescript({ useTsconfigDeclarationDir: true }),
        // terser({ compress: { ecma: 6 } })
    ],
};
