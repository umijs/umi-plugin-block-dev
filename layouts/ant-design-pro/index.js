import React, { useState } from 'react';
import logo from './logo.svg';
import { BasicLayout, SettingDrawer } from '@ant-design/pro-layout';
import SelectLang from './SelectLang';

export default props => {
  const { children } = props;
  const [settings, changeSetting] = useState();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <React.Fragment>
      <BasicLayout
        collapsed={collapsed}
        logo={logo}
        {...props}
        {...settings}
        onCollapse={setCollapsed}
        rightContentRender={props => <SelectLang {...props} />}
      >
        {children}
      </BasicLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={settings => changeSetting(settings)}
      />
    </React.Fragment>
  );
};
