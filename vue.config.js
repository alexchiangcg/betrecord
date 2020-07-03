const webpack = require('webpack');
module.exports={
    configureWebpack: {
        performance: {
            hints: false
        },
        plugins: [
            new webpack.ProvidePlugin({

            }),
            // 分析程式檔案大小
            //new BundleAnalyzerPlugin()
        ],
        /*//忽略打包
        externals: {
            'jquery' : 'jQuery',
            'Popper':'Popper',
            'bootstrap':'bootstrap',
        }*/
    },

    // 开发服务配置 https://webpack.js.org/configuration/dev-server/
    devServer: {

        // 启动时打开浏览器
        open: true,

        // 打开浏览器时的路径
        openPage: '',

        // 服务端口
        port: 8093,

        // 设置代理
        proxy: null
    },


    publicPath: process.env.NODE_ENV === 'production' ? '/betrecord/' : '/' ,


    //build 出來的資料夾名稱
    outputDir: 'betrecord',

    pwa:{
        iconPaths: {
            favicon32: 'img/icons/favicon/favicon.ico',
            favicon16: 'img/icons/favicon/favicon.ico',
            appleTouchIcon: 'img/icons/favicon/favicon.ico',
            maskIcon: 'img/icons/favicon/favicon.ico',
            msTileImage: 'img/icons/favicon/favicon.ico'
        }
    }
}
