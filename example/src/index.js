import styles from './index.css';
import { connect } from 'dva';

function Page(props) {
  return (
    <div className={styles.normal}>
      {props.test.text}
    </div>
  );
}

export default connect(({ test }) => ({
  test,
}))(Page);;
