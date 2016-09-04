import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import memory from 'rollup-plugin-memory';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import fs from 'fs';

var babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8')); // eslint-disable-line

export default {
    entry: 'src/index.js',
    exports: 'default',
    plugins: [
        json(),
        memory({
            path: 'src/index',
            contents: "export { default } from './index'"
        }),
        babel({
            babelrc: false,
            presets: ['es2015-minimal-rollup'].concat(babelRc.presets.slice(1)),
            plugins: babelRc.plugins,
            exclude: 'node_modules/**'
        }),
        // cjs({
        //     exclude: 'node_modules/process-es6/**',
        //     include: [
        //         'node_modules/fbjs/**',
        //         'node_modules/object-assign/**',
        //         'node_modules/react/**',
        //         'node_modules/react-dom/**'
        //     ]
        // }),
        // resolve({
        //     jsnext: true,
        //     main: true
        // })
    ],
};
