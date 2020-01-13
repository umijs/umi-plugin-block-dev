import React from 'react';
import { BasicLayout } from '@ant-design/pro-layout';

const Layout = ({ children }) => (
  <BasicLayout
    contentStyle={{
      minHeight: '100vh'
    }}
    menuRender={false}
    headerRender={false}
  >
    {children}
  </BasicLayout>
);

export default Layout;
