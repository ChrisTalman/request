'use strict';

// External Modules
const Path = require('path');

// Constants
const IGNORE = /(?:node_modules)$/;

// Config
module.exports =
{
    mode: 'development',
    entry: './src/index.ts',
    target: 'web',
    resolve:
    {
        extensions: ['.js', '.ts'],
        alias:
        {
            src: __dirname + '/src'
        }
    },
    output:
    {
        filename: 'index.js',
        path: Path.resolve(__dirname, './'),
        libraryTarget: 'umd',
		globalObject: 'this'
    },
    watch: true,
    module:
    {
        rules:
        [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: IGNORE
            }
        ]
    }
};