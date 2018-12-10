import { join } from 'path';

export default {
  plugins: [
    [join(__dirname, '..', require('../package').main || 'index.js'), {
      layout: 'ant-design-pro',
    }],
  ],
  cssModulesExcludes: [
    // 这个 excludes 不写到插件里面是因为那样会导致 less 的语法也无法正确识别
    // 可能是 umi 插件体系的一个 bug，在插件中添加 node_modules 下的文件到 cssModulesExcludes 会导致连 less 的预发也无法识别
    join(__dirname, '../layouts/ant-design-pro/style.less'),
  ],
}
