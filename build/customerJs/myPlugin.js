const {url, name} = require('../../config/static');

class MyPlugin {
    constructor() {
        this.startTime = Date.now();
        this.prevTimestamps = new Map();
        this.chunkVersions = {};
    }
    apply(compiler) {
        compiler.plugin('emit', function(compilation, callback) {
            // console.log(compilation.assets['index.html'], '-=-=-=-=-');
            if (compilation.assets['index.html']) { // 热更新时不会生成新的 assets
                let _html = `${compilation.assets['index.html'].source()}`;
                _html = _html.replace(/{title}/, name)
                    .replace(/{iconfont}/, `<script src="${url}" type="text/javascript"></script>`)
                compilation.assets['index.html'] = {
                    ...compilation.assets['index.html'],
                    source: function() {
                        return _html
                    }
                }
            }
            callback();
        }.bind(this));
    }
    
}
module.exports = MyPlugin; 