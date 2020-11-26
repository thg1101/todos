module.exports = {
  // don't build sourcemaps for production, saves build time
  productionSourceMap: false,
  // global custom variable file, available in all vue files
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/_variables.scss";'
      }
    }
  }
}
