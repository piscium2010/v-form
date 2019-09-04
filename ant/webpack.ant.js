const HtmlWebpackPlugin = require('html-webpack-plugin');
const dev = require('../webpack.dev')
const prod = require('../webpack.prod')
const merge = require('webpack-merge')

module.exports = env => {
    const common = env.NODE_ENV === 'production' ? prod : dev
    return merge(common, {
        entry: {
            app: './ant/App.jsx'
        },
        externals: {
            antd: 'antd',
            moment: 'moment'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Ant form',
                filename: 'index.html',
                template: './ant/index.html'
            })
        ]
    });
}
