import React from 'react';

import styles from './style.less';
import logo from './logo.svg';

export default (props) => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.logo}>
          <a href="/"><img src={logo} alt="logo" /><h1>Ant Design Pro</h1></a>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.topBar}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
