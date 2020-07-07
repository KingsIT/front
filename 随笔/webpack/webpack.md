#### antd 按需加载，实现原理


#### webpack externals 用法

#### tree shaking 原理
  - 基于 ES6 的静态引用，tree shaking 通过扫描所有 ES6 的 export，找出被 import 的内容并添加到最终代码中。 webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理。
   - 所有 import 标记为 /* harmony import */
   - 被使用过的 export 标记为 /* harmony export ([type]) */，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等。
   - 没被使用过的 import 标记为 /* unused harmony export [FuncName] */，其中 [FuncName] 为 export 的方法名称
   - webpack tree shaking 只处理顶层内容，例如类和对象内部都不会再被分别处理
   - concatenateModule webpack 默认配置，将所有 js 打入到同一个闭包