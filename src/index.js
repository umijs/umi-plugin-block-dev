// ref:
// - https://umijs.org/plugin/develop.html
import { join, relative } from "path";
import { existsSync } from "fs";
import assert from "assert";

if (!process.env.PAGES_PATH) {
  process.env.PAGES_PATH = "src";
}

const layouts = ["ant-design-pro", "ant-design-pro-user"];

export default function(api, options = {}) {
  const { paths } = api;
  const path = process.env.BLOCK_DEV_PATH || options.path || "/";
  const mockUmiRequest =
    process.env.BLOCK_DEV_MOCK_UMI_REQUEST === "true" ||
    options.mockUmiRequest ||
    false;
  api.modifyDefaultConfig(memo => {
    if (options.layout) {
      assert(
        layouts.includes(options.layout),
        `layout must be one of ${layouts.join(",")}`
      );
      const layout = join(__dirname, `../layouts/${options.layout}`);
      const pathToLayout = relative(paths.absPagesPath, layout);
      return {
        ...memo,
        routes: [
          {
            path: "/",
            component: pathToLayout,
            routes: [
              {
                path,
                component: "./",
                exact: false
              }
            ]
          }
        ],
        extraBabelIncludes: [layout]
      };
    }
    return {
      ...memo,
      routes: [
        {
          path,
          component: "./",
          exact: false
        }
      ]
    };
  });

  if (mockUmiRequest && existsSync(join(paths.absPagesPath, "_mock.js"))) {
    // build mock data to dist, for static block demo
    api.addEntryImportAhead({
      source: join(paths.absPagesPath, "_mock.js"),
      specifier: "__block_mock"
    });
    api.addEntryCodeAhead(`
      window.g_block_mock = __block_mock;
    `);
    api.chainWebpackConfig(webpackConfig => {
      webpackConfig.resolve.alias.set(
        "umi-request$",
        join(__dirname, "mock-request.js")
      );
    });
  }

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set("@", join(paths.absSrcPath, "@"));
  });
}
