import { join } from 'path';

export default {
  plugins: [
    [join(__dirname, '..', require('../package').main || 'index.js'), {
      layout: 'ant-design-pro',
    }],
    ['umi-plugin-react', {
      dva: true,
      locale: true,
      antd: true,
    }],
  ],
}
