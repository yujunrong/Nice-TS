const path = require('path');
module.exports = [{
    entry: './src/GameMain.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'output')
    },
    externals: {
        csharp: 'commonjs2 csharp',
	    puerts: 'commonjs2 puerts',
    },
    devtool: 'source-map',
    mode: 'production'
}];