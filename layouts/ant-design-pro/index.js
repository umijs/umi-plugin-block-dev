import React, { useState } from 'react';
import logo from './logo.svg';
import { BasicLayout } from '@ant-design/pro-layout';
export default props => {
  const { children } = props;
  const [settings, changeSetting] = useState();
  console.log(settings);
  return (
    <BasicLayout
      logo={logo}
      settings={settings}
      {...props}
      onChangeSetting={settings => changeSetting(settings)}
    >
      {children}
    </BasicLayout>
  );
};
