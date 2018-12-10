import React from 'react';

import styles from './style.less';
import logo from './logo.svg';

export default (props) => {
  const { children } = props;
  return (
    <div className="umi-block-dev">
      <div className="side-bar">
        <div className="logo">
          <a href="/"><img src={logo} alt="logo" /><h1>Ant Design Pro</h1></a>
        </div>
      </div>
      <div className="right">
        <div className="top-bar"></div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
