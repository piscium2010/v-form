const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        alias: {
            'v-form': path.join(__dirname, './src'),
        },
        modules: ['./node_modules','node_modules'],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|woff2|woff|eot|svg|ttf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    externals: {
        react: 'React',
        ['react-dom']: 'ReactDOM'
    }
}
