const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack() {
        return {
            resolve: {
                fallback: {
                    assert: require.resolve("assert"),
                },
            },
        }
    },

})