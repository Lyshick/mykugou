module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://m.kugou.com/',
                changeOrigin: true,
                ws: true,
                pathRewrite: { '^/api': '' }
            },
            '/list/': {
                target: 'http://mobilecdn.kugou.com/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: { '^/list/': '' }
            }
        }
    },
    configureWebpack: {
        externals: {
            'vue': "Vue",
            'vant': 'vant',
            'axios': "axios"
        }
    },
    chainWebpack: config => {
        if (process.env.use_analyzer) {
            config.plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    },
}