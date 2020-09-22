class LifeCofPlugin {
    apply(compiler) {
        compiler.hooks.entryOption.tap('LifeCofPlugin', (args) => {
            
        })
    }
}

module.exports = LifeCofPlugin;