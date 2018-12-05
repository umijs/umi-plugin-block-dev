// ref:
// - https://umijs.org/plugin/develop.html
import { join } from 'path';

process.env.PAGES_PATH = 'src';

export default function (api) {
  const { paths } = api;

  api.modifyDefaultConfig(memo => {
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
