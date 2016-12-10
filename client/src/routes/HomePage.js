import React from 'react';
import { connect } from 'dva';

import styles from './HomePage.less';

const HomePage = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>NIHON <span>|</span> 日本</h1>
                <h3>digital learning</h3>
            </div>
        </div>
    );
};

export default connect()(HomePage);
