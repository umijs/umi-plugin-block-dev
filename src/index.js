// ref:
// - https://umijs.org/plugin/develop.html
import { join } from 'path';

export default function (api) {
  const { paths } = api;

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      routes: [{
        path: '/',
        component: '../src/index',
      }],
    };
  });

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias
      .set('@', join(paths.absSrcPath, '@'));
  });
}
