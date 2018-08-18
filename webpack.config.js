'use strict';

// External Modules
const path = require('path');
const NodeExternals = require('webpack-node-externals');
const ignore = /(?:node_modules)$/;

// Browser
const BROWSER =
{
    mode: 'development',
    entry:
    {
        browser: './src/Browser/index.ts'
    },
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
        path: path.resolve(__dirname, './build/browser')
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
    },
	externals:
	[
		NodeExternals()
	]
};

// Node
const NODE =
{
    mode: 'development',
    entry:
    {
        node: './src/Node/index.ts'
    },
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
        path: path.resolve(__dirname, './build/node')
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
    },
	externals:
	[
		NodeExternals()
	]
};

module.exports = [BROWSER, NODE];