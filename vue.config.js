module.exports = {
    devServer: {
        proxy: "https://sniperbot.botrex.net"
    },
    transpileDependencies: ['vuex-persist'],
    configureWebpack: {
        devtool: 'source-map'
      }
}