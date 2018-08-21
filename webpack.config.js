'use strict';

// External Modules
const path = require('path');
const ignore = /(?:node_modules)$/;

// Config
const CONFIG =
{
    mode: 'development',
    entry: './src/index.ts',
    target: 'node',
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
        path: path.resolve(__dirname, './'),
        libraryTarget: 'umd'
    },
    watch: true,
    module:
    {
        rules:
        [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: ignore
            }
        ]
    }
};

module.exports = CONFIG;