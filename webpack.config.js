'use strict';

// External Modules
const path = require('path');
const ignore = /(?:node_modules)$/;
const clone = require('clone');

// Browser
const BROWSER =
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
        filename: 'browser.js',
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

// Node
const NODE = clone(BROWSER);
NODE.target = 'node';
NODE.output.filename = 'index.js';

module.exports = [BROWSER, NODE];