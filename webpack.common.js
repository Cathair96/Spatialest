const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        EnergyOnlineTS: './TypeScript/EnergyOnline/index.ts',
        ChangeTS: './TypeScript/Change/index.ts',
        GlobalsTS: './TypeScript/Globals/index.ts',
        EnergyOnlineCSS: './Styles/SCSS/EnergyOnline/EnergyOnline.scss',
        ChangeCSS: './Styles/SCSS/COS/Change.scss',
    },
    output: {
        filename: 'scripts/[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-optional-chaining',
                    ],
                    presets: [
                        // "@babel/preset-react",
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    ie: '11',
                                },
                                modules: false,
                            },
                        ],
                        ['@babel/preset-typescript'],
                    ],
                },
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            outputPath: 'font',
                            publicPath: '/dist/font',
                            limit: 4096,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|svg|png|gif)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                        publicPath: '/dist/img',
                    },
                },
            },
        ],
    },
    externals: {
        $: 'jQuery',
        jquery: 'jQuery',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name]-[id].css',
            ignoreOrder: false,
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                sourceMap: true,
            }),
        ],
    },
};
