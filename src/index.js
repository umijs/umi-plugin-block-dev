// ref:
// - https://umijs.org/plugin/develop.html
import { join, relative } from 'path';

process.env.PAGES_PATH = 'src';

export default function (api, options = {}) {
  const { paths } = api;

  api.modifyDefaultConfig(memo => {
    if (options.layout) {
      const layout = join(__dirname, `../layouts/${options.layout}`);
      const pathToLayout = relative(paths.absPagesPath, layout);
      console.log(pathToLayout);
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
        extraBabelIncludes: [layout],
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
