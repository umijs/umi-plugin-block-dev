import React, { useState } from 'react';
import logo from './logo.svg';
import { BasicLayout, SettingDrawer } from '@ant-design/pro-layout';
export default props => {
  const { children } = props;
  const [settings, changeSetting] = useState();
  return (
    <React.Fragment>
      <BasicLayout logo={logo} {...props} {...settings}>
        {children}
      </BasicLayout>
      <SettingDrawer onSettingChange={settings => changeSetting(settings)} />
    </React.Fragment>
  );
};
