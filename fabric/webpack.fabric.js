const HtmlWebpackPlugin = require('html-webpack-plugin')
const dev = require('../webpack.dev')
const prod = require('../webpack.prod')
const merge = require('webpack-merge')

module.exports = env => {
    const common = env.NODE_ENV === 'production' ? prod : dev
    return merge(common, {
        entry: {
            app: './fabric/App.jsx'
        },
        externals: {
            "office-ui-fabric-react": 'Fabric'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Fabric form',
                filename: 'index.html',
                template: './fabric/index.html'
            })
        ]
    });
}