// ref:
// - https://umijs.org/plugin/develop.html
import { join, relative } from 'path';
import assert from 'assert';

process.env.PAGES_PATH = 'src';

const layouts = ['ant-design-pro'];

export default function (api, options = {}) {
  const { paths } = api;

  api.modifyDefaultConfig(memo => {
    if (options.layout) {
      assert(layouts.includes(options.layout), `layout must be one of ${layouts.join(',')}`)
      const layout = join(__dirname, `../layouts/${options.layout}`);
      const pathToLayout = relative(paths.absPagesPath, layout);
      return {
        ...memo,
        routes: [{
          path: '/',
          component: pathToLayout,
          routes: [{
            path: '/',
            component: './',
          }],
        }],
        extraBabelIncludes: [
          layout,
        ],
        cssModulesExcludes: [
          join(layout, 'style.less'),
        ],
      };
    }
    return {
      ...memo,
      routes: [{
        path: '/',
        component: './',
      }],
    };
  });

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set('@', join(paths.absSrcPath, '@'));
  });
}
