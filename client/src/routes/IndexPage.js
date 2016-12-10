import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu } from 'antd';

import LeftMenu from '../components/navigation/LeftMenu.js';
import styles from './IndexPage.less';

function IndexPage(props) {
    return (
        <div className={styles.wrapper}>
            <LeftMenu location={props.location} />
            <div className={styles.body}>
                {props.children}
            </div>
        </div>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
