// ref:
// - https://umijs.org/plugin/develop.html
import { join, relative, dirname } from 'path';
import { existsSync, readdirSync } from 'fs';
import assert from 'assert';
import upperCamelCase from 'uppercamelcase';

if (!process.env.PAGES_PATH) {
  process.env.PAGES_PATH = 'src';
}

const layouts = ['ant-design-pro', 'ant-design-pro-user'];

function findGitDir(thePath) {
  if (thePath === '/') {
    return null;
  }
  const items = readdirSync(thePath);
  if (items.includes('.git')) {
    return thePath;
  } else {
    return findGitDir(dirname(thePath));
  }
}

export function getNameFromPkg(pkg) {
  if (!pkg.name) {
    return null;
  }
  return pkg.name.split('/').pop();
}

export default function(api, options = {}) {
  const { paths, debug } = api;
  const path = process.env.BLOCK_DEV_PATH || options.path || '/';
  const blockConfig = require(join(paths.cwd, 'package.json')).blockConfig;

  let subBlocks = [];

  if (blockConfig && blockConfig.dependencies) {
    debug('find dependencies in package.json');
    const gitRoot = findGitDir(paths.cwd);
    debug(`get gitRoot: ${gitRoot}`);
    if (gitRoot) {
      subBlocks = blockConfig.dependencies.map(d => {
        const subBlockPath = join(gitRoot, d);
        const subBlockConfig = require(join(subBlockPath, 'package.json'));
        const subBlockName = upperCamelCase(getNameFromPkg(subBlockConfig));
        return {
          name: subBlockName,
          path: subBlockPath,
        };
      });
    } else {
      throw new Error('Not find git root, can not use dependencies.');
    }
  }

  const mockUmiRequest =
    process.env.BLOCK_DEV_MOCK_UMI_REQUEST === 'true' ||
    options.mockUmiRequest ||
    false;
  api.modifyDefaultConfig(memo => {
    if (options.layout) {
      assert(
        layouts.includes(options.layout),
        `layout must be one of ${layouts.join(',')}`
      );
      const layout = join(__dirname, `../layouts/${options.layout}`);
      const pathToLayout = relative(paths.absPagesPath, layout);
      return {
        ...memo,
        routes: [
          {
            path: '/',
            component: pathToLayout,
            routes: [
              {
                path,
                ...options.menu,
                component: './',
                exact: false
              }
            ]
          }
        ],
        extraBabelIncludes: [layout].concat(subBlocks.map(b => b.path)),
      };
    }
    return {
      ...memo,
      routes: [
        {
          ...options.menu,
          path,
          component: './',
          exact: false
        }
      ]
    };
  });

  if (mockUmiRequest && existsSync(join(paths.absPagesPath, '_mock.js'))) {
    // build mock data to dist, for static block demo
    api.addEntryImportAhead({
      source: join(paths.absPagesPath, '_mock.js'),
      specifier: '__block_mock'
    });
    api.addEntryCodeAhead(`
      window.g_block_mock = __block_mock;
    `);
    api.chainWebpackConfig(webpackConfig => {
      webpackConfig.resolve.alias.set(
        'umi-request$',
        join(__dirname, 'mock-request.js')
      );
    });
  }

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set('@', join(paths.absSrcPath, '@'));
    subBlocks.forEach(b => {
      webpackConfig.resolve.alias.set(`./${b.name}`, join(b.path, 'src'));
    });
  });
}
