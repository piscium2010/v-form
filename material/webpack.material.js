const HtmlWebpackPlugin = require('html-webpack-plugin')
const dev = require('../webpack.dev')
const prod = require('../webpack.prod')
const merge = require('webpack-merge')

module.exports = env => {
    const common = env.NODE_ENV === 'production' ? prod : dev
    return merge(common, {
        entry: {
            app: './material/App.jsx'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Material form',
                filename: 'index.html',
                template: './material/index.html'
            })
        ],
        externals: {
            '@material-ui': 'MaterialUI'
        }
    });
}