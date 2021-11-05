module.exports = {
    devServer: {
        proxy: "https://infinite-fjord-57052.herokuapp.com"
    },
    transpileDependencies: ['vuex-persist'],
    configureWebpack: {
        devtool: 'source-map'
      }
}