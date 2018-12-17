# umi-plugin-block-dev

[![NPM version](https://img.shields.io/npm/v/umi-plugin-block-dev.svg?style=flat)](https://npmjs.org/package/umi-plugin-block-dev)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-block-dev.svg?style=flat)](https://npmjs.org/package/umi-plugin-block-dev)

A umi plugin for develop a umi block with umi

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-block-dev', options],
  ],
}
```

And you can use `create-umi` to create a umi block automatically:

```sh
$ yarn create umi --block
```

## Options

```js
{
  layout: 'ant-design-pro',
}
```

### env

- BLOCK_DEV_PATH: custom block preview path
- BLOCK_DEV_MOCK_UMI_REQUEST: package mock data to build result, for build static preview site

## LICENSE

MIT
